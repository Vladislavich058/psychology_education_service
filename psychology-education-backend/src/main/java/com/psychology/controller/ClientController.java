package com.psychology.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.psychology.dto.ReviewDTO;
import com.psychology.entity.Course;
import com.psychology.entity.Favourite;
import com.psychology.entity.Progress;
import com.psychology.entity.Record;
import com.psychology.entity.Review;
import com.psychology.entity.Topic;
import com.psychology.entity.User;
import com.psychology.exception.NotFoundException;
import com.psychology.service.ClientService;
import com.psychology.views.Views;

import jakarta.validation.Valid;

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

}
