package com.psychology.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.psychology.dto.ReviewDTO;
import com.psychology.dto.SelectStudiedTopics;
import com.psychology.entity.Record;
import com.psychology.entity.*;
import com.psychology.exception.NotFoundException;
import com.psychology.service.ClientService;
import com.psychology.views.Views;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/client")
public class ClientController {

    @Autowired
    ClientService clientService;

    @JsonView(Views.CoursesView.class)
    @GetMapping("/courses")
    public Iterable<Course> getCourses() {
        return clientService.getCourses();
    }

    @JsonView(Views.CoursesView.class)
    @GetMapping("/courses/{id}")
    public Course getCourseById(@PathVariable Long id) throws NotFoundException {
        return clientService.getCourseById(id);
    }

    @GetMapping("/topics/{id}")
    public Topic getTopicById(@PathVariable Long id) throws NotFoundException {
        return clientService.getTopicById(id);
    }

    @JsonView(Views.CoursesView.class)
    @GetMapping("/courses/favourites/{id}")
    public Favourite addFavouriteCourse(@PathVariable Long id, @AuthenticationPrincipal User user)
            throws NotFoundException {
        return clientService.addFavouriteCourse(id, user);
    }

    @JsonView(Views.CoursesView.class)
    @PutMapping("/reviews/{id}")
    public Review addReview(@PathVariable Long id, @AuthenticationPrincipal User user,
                            @Valid @RequestBody ReviewDTO reviewDTO) throws NotFoundException {
        return clientService.addReview(id, user, reviewDTO);
    }

    @JsonView(Views.CoursesView.class)
    @GetMapping("/courses/records/{id}")
    public Record addRecord(@PathVariable Long id, @AuthenticationPrincipal User user) throws NotFoundException {
        return clientService.addRecord(id, user);
    }

    @JsonView(Views.CoursesView.class)
    @GetMapping("/courses/progress/{id}")
    public Progress addProgress(@PathVariable Long id, @AuthenticationPrincipal User user) throws NotFoundException {
        return clientService.addProgress(id, user);
    }

    @JsonView(Views.CoursesView.class)
    @DeleteMapping("/courses/favourites/{id}")
    public Long deleteFavouriteCourse(@PathVariable Long id, @AuthenticationPrincipal User user)
            throws NotFoundException {
        return clientService.deleteFavouriteCourse(id, user);
    }

    @GetMapping("/courses/studiedTopics/{id}")
    public List<SelectStudiedTopics> getStudiedTopics(@PathVariable Long id, @AuthenticationPrincipal User user)
            throws NotFoundException {
        return clientService.getStudiedTopics(id, user);
    }

    @GetMapping("/courses/certificate/{id}")
    public ResponseEntity<Resource> getCertificate(@PathVariable Long id, @AuthenticationPrincipal User user)
            throws NotFoundException, IOException {
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, ContentDisposition.attachment().filename("Certificate_" + user.getId() + ".pdf").build().toString())
                .contentType(MediaType.parseMediaType("application/pdf"))
                .body(clientService.getCertificate(id, user));
    }
}
