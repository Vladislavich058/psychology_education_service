package com.psychology.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonView;
import com.psychology.dto.CourseDTO;
import com.psychology.dto.ProgressAnaliticDTO;
import com.psychology.dto.PsychologistDTO;
import com.psychology.dto.SelectCourseRating;
import com.psychology.dto.TopicDTO;
import com.psychology.entity.Course;
import com.psychology.entity.Psychologist;
import com.psychology.entity.Record;
import com.psychology.entity.Topic;
import com.psychology.exception.CourseAlreadyExistsException;
import com.psychology.exception.NotFoundException;
import com.psychology.exception.UserAlreadyExistsException;
import com.psychology.service.AdminService;
import com.psychology.views.Views;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    AdminService adminService;

    @GetMapping("/psychologists")
    public Iterable<Psychologist> getPsychologists() {
        return adminService.getPsychologists();
    }

    @JsonView(Views.CoursesView.class)
    @GetMapping("/courses")
    public Iterable<Course> getCourses() {
        return adminService.getCourses();
    }

    @JsonView(Views.CoursesView.class)
    @GetMapping("/courses/{id}")
    public Course getCourseById(@PathVariable Long id) throws NotFoundException {
        return adminService.getCourseById(id);
    }

    @JsonView(Views.RecordsView.class)
    @GetMapping("/records")
    public Iterable<Record> getRecords() {
        return adminService.getRecords();
    }

    @JsonView(Views.RecordsView.class)
    @GetMapping("/records/activate/{id}")
    public Record activateRecord(@PathVariable Long id) throws NotFoundException {
        return adminService.activateRecord(id);
    }

    @JsonView(Views.RecordsView.class)
    @GetMapping("/records/block/{id}")
    public Record blockRecord(@PathVariable Long id) throws NotFoundException {
        return adminService.blockRecord(id);
    }

    @GetMapping("/topics/{id}")
    public Topic getTopicById(@PathVariable Long id) throws NotFoundException {
        return adminService.getTopicById(id);
    }

    @GetMapping("/analitics/psychologist/{id}")
    public List<ProgressAnaliticDTO> getPsychologistAnalitic(@PathVariable Long id) throws NotFoundException {
        return adminService.getProgressAnalitic(id);
    }

    @GetMapping("/analitics/courses")
    public List<SelectCourseRating> getCoursesRating() {
        return adminService.getCoursesRating();
    }

    @DeleteMapping("/psychologists/{id}")
    public Long deletePsychologist(@PathVariable Long id) throws NotFoundException {
        return adminService.deletePsychologist(id);
    }

    @DeleteMapping("/courses/{id}")
    public Long deleteCourse(@PathVariable Long id) throws NotFoundException {
        return adminService.deleteCourse(id);
    }

    @DeleteMapping("/topics/{id}")
    public Long deleteTopic(@PathVariable Long id) throws NotFoundException {
        return adminService.deleteTopic(id);
    }

    @PostMapping("/psychologists")
    public Psychologist addPsychologist(@RequestPart("psychologist") @Valid PsychologistDTO psychologistDTO,
                                        @RequestPart("photo") MultipartFile photo) throws UserAlreadyExistsException, IOException {
        return adminService.addPsychologist(psychologistDTO, photo);
    }

    @PostMapping("/courses")
    public Course addCourse(@RequestPart("course") @Valid CourseDTO courseDTO,
                            @RequestPart("photo") MultipartFile photo) throws CourseAlreadyExistsException, IOException {
        return adminService.addCourse(courseDTO, photo);
    }

    @PutMapping("/topics/{id}")
    public Course addTopic(@PathVariable Long id, @Valid @RequestBody TopicDTO topicDTO) throws NotFoundException {
        return adminService.addTopic(id, topicDTO);
    }

    @PatchMapping("/courses")
    public Course updateCourse(@RequestPart("course") @Valid CourseDTO courseDTO,
                               @RequestPart("photo") MultipartFile photo) throws CourseAlreadyExistsException, IOException {
        return adminService.updateCourse(courseDTO, photo);
    }

    @PatchMapping("/topics/{id}")
    public Topic updateTopic(@Valid @RequestBody TopicDTO topicDTO, @PathVariable Long id) throws NotFoundException {
        return adminService.updateTopic(topicDTO, id);
    }

    @GetMapping("/report/{id}")
    public ResponseEntity<Resource> getProgressReport(@PathVariable Long id) throws NotFoundException, IOException {
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, ContentDisposition.attachment().filename("ProgressReport_" + id + ".pdf").build().toString())
                .contentType(MediaType.parseMediaType("application/pdf"))
                .body(adminService.getProgressReport(id));
    }
}
