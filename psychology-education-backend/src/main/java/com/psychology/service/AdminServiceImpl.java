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
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import com.psychology.dto.*;
import com.psychology.entity.Record;
import com.psychology.entity.*;
import com.psychology.exception.CourseAlreadyExistsException;
import com.psychology.exception.NotFoundException;
import com.psychology.exception.UserAlreadyExistsException;
import com.psychology.mapper.CourseMapper;
import com.psychology.mapper.PsychologistMapper;
import com.psychology.mapper.TopicMapper;
import com.psychology.repository.*;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    PsychologistRepository psychologistRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    PsychologistMapper psychologistMapper;

    @Autowired
    PhotoService photoService;

    @Autowired
    CourseRepository courseRepository;

    @Autowired
    TopicRepository topicRepository;

    @Autowired
    CourseMapper courseMapper;

    @Autowired
    TopicMapper topicMapper;

    @Autowired
    RecordRepository recordRepository;

    @Autowired
    ProgressRepository progressRepository;

    @Autowired
    ReviewRepository reviewRepository;

    @Override
    public Iterable<Psychologist> getPsychologists() {
        return psychologistRepository.findAll();
    }

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
    public Topic getTopicById(Long id) throws NotFoundException {
        return topicRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Topic with id " + id + " not found!"));
    }

    @Override
    public Long deleteCourse(Long id) throws NotFoundException {
        if (courseRepository.findById(id).isEmpty()) {
            throw new NotFoundException("Course with id " + id + " not found!");
        }
        courseRepository.deleteById(id);
        return id;
    }

    @Override
    public Long deleteTopic(Long id) throws NotFoundException {
        if (topicRepository.findById(id).isEmpty()) {
            throw new NotFoundException("Topic with id " + id + " not found!");
        }
        topicRepository.deleteById(id);
        return id;
    }

    @Override
    public Long deletePsychologist(Long id) throws NotFoundException {
        if (psychologistRepository.findById(id).isEmpty()) {
            throw new NotFoundException("Psychologist with id " + id + " not found");
        }
        psychologistRepository.deleteById(id);
        return id;
    }

    @Transactional
    @Override
    public Psychologist addPsychologist(PsychologistDTO psychologistDTO, MultipartFile file)
            throws UserAlreadyExistsException, IOException {
        if (userRepository.findByEmail(psychologistDTO.getUser().getEmail()).isPresent()) {
            throw new UserAlreadyExistsException(
                    "User with email: " + psychologistDTO.getUser().getEmail() + " already exists!");
        }
        Photo photo = null;
        if (file != null) {
            photo = photoService.uploadFile(file);
        }
        Psychologist newPsychologist = psychologistMapper.toPsychologist(psychologistDTO);
        newPsychologist.setPhoto(photo);
        newPsychologist.getUser().setRole("psychologist");
        newPsychologist.getUser().setPassword(passwordEncoder.encode(newPsychologist.getUser().getPassword()));
        return psychologistRepository.save(newPsychologist);
    }

    @Transactional
    @Override
    public Course addCourse(CourseDTO courseDTO, MultipartFile file) throws CourseAlreadyExistsException, IOException {
        if (courseRepository.findByName(courseDTO.getName()).isPresent()) {
            throw new CourseAlreadyExistsException("Course with name '" + courseDTO.getName() + "' already exists!");
        }
        Photo photo = photoService.uploadFile(file);
        Course newCourse = courseMapper.toCourse(courseDTO);
        newCourse.setPhoto(photo);
        newCourse.setCreatedDate(LocalDateTime.now());
        return courseRepository.save(newCourse);
    }

    @Override
    public Course addTopic(Long courseId, TopicDTO topicDTO) throws NotFoundException {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new NotFoundException("Course with id " + courseId + " not found!"));
        course.addTopic(topicMapper.toTopic(topicDTO));
        return courseRepository.save(course);
    }

    @Transactional
    @Override
    public Course updateCourse(CourseDTO courseDTO, MultipartFile file)
            throws CourseAlreadyExistsException, IOException {
        if (courseRepository.findByNameAndIdNot(courseDTO.getName(), courseDTO.getId()).isPresent()) {
            throw new CourseAlreadyExistsException("Course with name '" + courseDTO.getName() + "' already exists!");
        }
        Photo photo = photoService.uploadFile(file);
        Course newCourse = courseMapper.toCourse(courseDTO);
        newCourse.setPhoto(photo);
        newCourse.setCreatedDate(LocalDateTime.now());
        return courseRepository.save(newCourse);
    }

    @Override
    public Topic updateTopic(TopicDTO topicDTO, Long id) throws NotFoundException {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Course with id " + id + " not found!"));
        Topic updateTopic = topicMapper.toTopic(topicDTO);
        updateTopic.setCourse(course);
        return topicRepository.save(updateTopic);
    }

    @Override
    public Iterable<Record> getRecords() {
        return recordRepository.findAll(Sort.by("id"));
    }

    @Override
    public Record activateRecord(Long id) throws NotFoundException {
        Record record = recordRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Record with id " + id + " not found!"));
        record.setStatus("activate");
        return recordRepository.save(record);
    }

    @Override
    public Record blockRecord(Long id) throws NotFoundException {
        Record record = recordRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Record with id " + id + " not found!"));
        record.setStatus("block");
        return recordRepository.save(record);
    }

    @Transactional
    @Override
    public List<ProgressAnaliticDTO> getProgressAnalitic(Long id) throws NotFoundException {
        List<SelectProgress> psychologistProgresses = progressRepository.getProgressByPsychologistId(id);
        List<ProgressAnaliticDTO> progressAnaliticDTOs = new ArrayList<>();
        for (SelectProgress selectProgress : psychologistProgresses) {
            Course course = courseRepository.findById(selectProgress.getCourse()).orElseThrow(
                    () -> new NotFoundException("Course with id " + selectProgress.getCourse() + " not found!"));
            progressAnaliticDTOs.add(ProgressAnaliticDTO.builder().xValue(course.getName())
                    .yValue(selectProgress.getCount() / (float) course.getTopics().size()).build());
        }

        return progressAnaliticDTOs;
    }

    @Override
    public List<SelectCourseRating> getCoursesRating() {
        return reviewRepository.getCourseRating();
    }

    @Override
    public Resource getProgressReport(Long id) throws NotFoundException, IOException {
        Psychologist psychologist = psychologistRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Psychologist with id " + id + " not found!"));
        List<SelectProgress> psychologistProgresses = progressRepository.getProgressByPsychologistId(id);

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(out);

        PdfDocument pdfDocument = new PdfDocument(writer);
        Document document = new Document(pdfDocument);
        pdfDocument.addNewPage();

        PdfFont fontRegular = PdfFontFactory.createFont("./fonts/WixMadeforDisplay-Regular.ttf", "cp1251");
        PdfFont fontBold = PdfFontFactory.createFont("./fonts/WixMadeforDisplay-Bold.ttf", "cp1251");
        PdfFont fontSemiBold = PdfFontFactory.createFont("./fonts/WixMadeforDisplay-SemiBold.ttf", "cp1251");

        Paragraph logo = new Paragraph("PSYCHOANALITIC.BY");
        logo.setTextAlignment(TextAlignment.RIGHT);
        logo.setFontSize(20);
        logo.setFont(fontRegular);

        Paragraph certificate = new Paragraph("Отчет о пройденных курасах");
        certificate.setFont(fontBold);
        certificate.setTextAlignment(TextAlignment.CENTER);
        certificate.setFontSize(25);

        Paragraph fio = new Paragraph(String.format("%s %s %s",
                psychologist.getSurname(), psychologist.getName(), psychologist.getLastname()));
        fio.setFont(fontSemiBold);
        fio.setTextAlignment(TextAlignment.CENTER);
        fio.setFontSize(20);

        Table table = new Table(UnitValue.createPercentArray(2)).useAllAvailableWidth();
        Paragraph courseHeader = new Paragraph("Название курса");
        courseHeader.setFont(fontBold);
        Paragraph progressHeader = new Paragraph("Прогресс, %");
        progressHeader.setFont(fontBold);
        table.addCell(courseHeader);
        table.addCell(progressHeader);

        for (SelectProgress selectProgress : psychologistProgresses) {
            Course course = courseRepository.findById(selectProgress.getCourse()).orElseThrow(
                    () -> new NotFoundException("Course with id " + selectProgress.getCourse() + " not found!"));
            Paragraph courseName = new Paragraph(course.getName());
            courseName.setFont(fontRegular);
            Paragraph progress = new Paragraph(selectProgress.getCount() / (float) course.getTopics().size() * 100 + "");
            progress.setFont(fontRegular);
            table.addCell(courseName);
            table.addCell(progress);
        }

        document.add(logo);
        document.add(certificate);
        document.add(fio);
        document.add(table);

        document.close();
        return new ByteArrayResource(out.toByteArray());
    }

}
