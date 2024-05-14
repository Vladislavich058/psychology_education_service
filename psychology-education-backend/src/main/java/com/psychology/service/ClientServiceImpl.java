package com.psychology.service;

import com.itextpdf.kernel.colors.DeviceRgb;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.geom.Rectangle;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.pdf.canvas.PdfCanvas;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.properties.TextAlignment;
import com.psychology.dto.ReviewDTO;
import com.psychology.dto.SelectStudiedTopics;
import com.psychology.entity.Record;
import com.psychology.entity.*;
import com.psychology.exception.NotFoundException;
import com.psychology.mapper.ReviewMapper;
import com.psychology.repository.*;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Slf4j
@Service
public class ClientServiceImpl implements ClientService {

    @Autowired
    CourseRepository courseRepository;

    @Autowired
    PsychologistRepository psychologistRepository;

    @Autowired
    FavouriteRepository favouriteRepository;

    @Autowired
    RecordRepository recordRepository;

    @Autowired
    TopicRepository topicRepository;

    @Autowired
    ProgressRepository progressRepository;

    @Autowired
    ReviewRepository reviewRepository;

    @Autowired
    ReviewMapper reviewMapper;

    @Override
    public Iterable<Course> getCourses() {
        return courseRepository.findAll(Sort.by("id"));
    }

    @Override
    public Course getCourseById(Long id) throws NotFoundException {
        return courseRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Course with id " + id + " not found!"));
    }

    @Override
    public Favourite addFavouriteCourse(Long id, User user) throws NotFoundException {
        Psychologist psychologist = psychologistRepository.findByUserId(user.getId())
                .orElseThrow(() -> new NotFoundException("Psychologist with user id " + user.getId() + " not found!"));
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Course with id " + id + " not found!"));
        return favouriteRepository.save(Favourite.builder().course(course).psychologist(psychologist).build());
    }

    @Transactional
    @Override
    public Long deleteFavouriteCourse(Long id, User user) throws NotFoundException {
        if (favouriteRepository.findByPsychologistUserIdAndCourseId(user.getId(), id).isEmpty()) {
            throw new NotFoundException(
                    "Favourite course with user id " + user.getId() + " and course id " + id + " not found!");
        }
        favouriteRepository.deleteByPsychologistUserIdAndCourseId(user.getId(), id);
        return id;
    }

    @Override
    public Resource getCertificate(Long courseId, User user) throws IOException, NotFoundException {
        Psychologist psychologist = psychologistRepository.findByUserId(user.getId())
                .orElseThrow(() -> new NotFoundException("Psychologist with user id " + user.getId() + " not found!"));
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new NotFoundException("Course with id " + courseId + " not found!"));
        List<SelectStudiedTopics> studiedTopics = progressRepository.getTopicsByPsychologistIdAndCourseId(psychologist.getId(), courseId);
        LocalDateTime releaseDate = studiedTopics.stream().map(SelectStudiedTopics::getDate_time).sorted().toList().getLast();

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(out);

        PdfDocument pdfDocument = new PdfDocument(writer);
        pdfDocument.setDefaultPageSize(PageSize.A4.rotate());

        Document document = new Document(pdfDocument);

        pdfDocument.addNewPage();
        PdfCanvas pdfCanvas = new PdfCanvas(pdfDocument, 1);

        DeviceRgb borderColor = new DeviceRgb(255, 226, 231);
        pdfCanvas.setStrokeColor(borderColor);
        pdfCanvas.setLineWidth(20);

        Rectangle pageSize = pdfDocument.getDefaultPageSize();
        pdfCanvas.rectangle(pageSize.getLeft(), pageSize.getBottom(), pageSize.getWidth(), pageSize.getHeight());
        pdfCanvas.stroke();

        PdfFont fontRegular = PdfFontFactory.createFont("./fonts/WixMadeforDisplay-Regular.ttf", "cp1251");
        PdfFont fontBold = PdfFontFactory.createFont("./fonts/WixMadeforDisplay-Bold.ttf", "cp1251");
        PdfFont fontSemiBold = PdfFontFactory.createFont("./fonts/WixMadeforDisplay-SemiBold.ttf", "cp1251");

        Paragraph logo = new Paragraph("PSYCHOANALITIC.BY");
        logo.setTextAlignment(TextAlignment.RIGHT);
        logo.setFontSize(20);
        logo.setFont(fontRegular);

        Paragraph certificate = new Paragraph("CЕРТИФИКАТ");
        certificate.setFont(fontBold);
        certificate.setFontColor(borderColor);
        certificate.setTextAlignment(TextAlignment.CENTER);
        certificate.setFontSize(40);
        certificate.setMarginTop(100);

        Paragraph numberAndDate = new Paragraph(String.format("№ %d от %s г.", user.getId(),
                releaseDate.format(DateTimeFormatter.ofPattern("dd.MM.yyyy"))));
        numberAndDate.setTextAlignment(TextAlignment.CENTER);
        numberAndDate.setFont(fontRegular);
        numberAndDate.setMarginTop(-20);

        Paragraph fio = new Paragraph(String.format("%s %s %s",
                psychologist.getSurname(), psychologist.getName(), psychologist.getLastname()));
        fio.setFont(fontSemiBold);
        fio.setTextAlignment(TextAlignment.CENTER);
        fio.setFontSize(20);

        Paragraph description = new Paragraph("Об успешном прохождении курса «" + course.getName() + "»");
        description.setTextAlignment(TextAlignment.CENTER);
        description.setFont(fontRegular);
        description.setFontSize(16);
        description.setMarginTop(-10);

        document.add(logo);
        document.add(certificate);
        document.add(numberAndDate);
        document.add(fio);
        document.add(description);

        document.close();
        return new ByteArrayResource(out.toByteArray());
    }

    @Override
    public List<SelectStudiedTopics> getStudiedTopics(Long courseId, User user) throws NotFoundException {
        Psychologist psychologist = psychologistRepository.findByUserId(user.getId())
                .orElseThrow(() -> new NotFoundException("Psychologist with user id " + user.getId() + " not found!"));
        return progressRepository.getTopicsByPsychologistIdAndCourseId(psychologist.getId(), courseId);
    }

    @Override
    public Record addRecord(Long id, User user) throws NotFoundException {
        Psychologist psychologist = psychologistRepository.findByUserId(user.getId())
                .orElseThrow(() -> new NotFoundException("Psychologist with user id " + user.getId() + " not found!"));
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Course with id " + id + " not found!"));
        return recordRepository.save(Record.builder().course(course).psychologist(psychologist).status("waiting")
                .createdDateTime(LocalDateTime.now()).build());
    }

    @Override
    public Topic getTopicById(Long id) throws NotFoundException {
        return topicRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Topic with id " + id + " not found!"));
    }

    @Override
    public Progress addProgress(Long id, User user) throws NotFoundException {
        Psychologist psychologist = psychologistRepository.findByUserId(user.getId())
                .orElseThrow(() -> new NotFoundException("Psychologist with user id " + user.getId() + " not found!"));
        Topic topic = topicRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Topic with id " + id + " not found!"));
        return progressRepository.save(Progress.builder().topic(topic).psychologist(psychologist).dateTime(LocalDateTime.now()).build());
    }

    @Override
    public Review addReview(Long id, User user, ReviewDTO reviewDTO) throws NotFoundException {
        Psychologist psychologist = psychologistRepository.findByUserId(user.getId())
                .orElseThrow(() -> new NotFoundException("Psychologist with user id " + user.getId() + " not found!"));
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Course with id " + id + " not found!"));
        Review newReview = reviewMapper.toReview(reviewDTO);
        newReview.setCourse(course);
        newReview.setPsychologist(psychologist);
        newReview.setCreateDateTime(LocalDateTime.now());
        return reviewRepository.save(newReview);
    }

}
