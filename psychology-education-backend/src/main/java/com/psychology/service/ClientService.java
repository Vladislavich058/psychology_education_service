package com.psychology.service;

import com.psychology.entity.Course;
import com.psychology.entity.Favourite;
import com.psychology.entity.Progress;
import com.psychology.entity.User;
import com.psychology.exception.NotFoundException;
import com.psychology.entity.Record;
import com.psychology.entity.Topic;

public interface ClientService {
	
	Iterable<Course> getCourses();
	
	Course getCourseById(Long id) throws NotFoundException;
	
	Topic getTopicById(Long id) throws NotFoundException;
	
	Favourite addFavouriteCourse(Long id, User user) throws NotFoundException;
	
	Record addRecord(Long id, User user) throws NotFoundException;
	
	Progress addProgress(Long id, User user) throws NotFoundException;

	Long deleteFavouriteCourse(Long id, User user) throws NotFoundException;
}
