package com.psychology.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.psychology.dto.CourseDTO;
import com.psychology.dto.PsychologistDTO;
import com.psychology.dto.TopicDTO;
import com.psychology.entity.Course;
import com.psychology.entity.Psychologist;
import com.psychology.entity.Record;
import com.psychology.entity.Topic;
import com.psychology.exception.CourseAlreadyExistsException;
import com.psychology.exception.NotFoundException;
import com.psychology.exception.UserAlreadyExistsException;

public interface AdminService {
	Iterable<Psychologist> getPsychologists();

	Iterable<Course> getCourses();
	
	Iterable<Record> getRecords();
	
	Record activateRecord(Long id) throws NotFoundException;
	
	Record blockRecord(Long id) throws NotFoundException;
	
	Course getCourseById(Long id) throws NotFoundException;
	
	Topic getTopicById(Long id) throws NotFoundException;

	Long deletePsychologist(Long id) throws NotFoundException;

	Long deleteCourse(Long id) throws NotFoundException;

	Long deleteTopic(Long id) throws NotFoundException;

	Psychologist addPsychologist(PsychologistDTO psychologistDTO, MultipartFile file)
			throws UserAlreadyExistsException, IOException;

	Course addCourse(CourseDTO courseDTO, MultipartFile file) throws CourseAlreadyExistsException, IOException;
	
	Course addTopic(Long courseId, TopicDTO topicDTO) throws NotFoundException;
	
	Course updateCourse(CourseDTO courseDTO, MultipartFile file) throws CourseAlreadyExistsException, IOException;

	Topic updateTopic(TopicDTO topicDTO, Long id) throws NotFoundException;
}
