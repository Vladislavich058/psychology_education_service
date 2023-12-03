package com.psychology.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.psychology.dto.ReviewDTO;
import com.psychology.entity.Course;
import com.psychology.entity.Favourite;
import com.psychology.entity.Progress;
import com.psychology.entity.Psychologist;
import com.psychology.entity.Record;
import com.psychology.entity.Review;
import com.psychology.entity.Topic;
import com.psychology.entity.User;
import com.psychology.exception.NotFoundException;
import com.psychology.mapper.ReviewMapper;
import com.psychology.repository.CourseRepository;
import com.psychology.repository.FavouriteRepository;
import com.psychology.repository.ProgressRepository;
import com.psychology.repository.PsychologistRepository;
import com.psychology.repository.RecordRepository;
import com.psychology.repository.ReviewRepository;
import com.psychology.repository.TopicRepository;

import jakarta.transaction.Transactional;

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
		return progressRepository.save(Progress.builder().topic(topic).psychologist(psychologist).build());
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
