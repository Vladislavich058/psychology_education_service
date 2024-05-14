package com.psychology.service;

import com.psychology.dto.ReviewDTO;
import com.psychology.dto.SelectStudiedTopics;
import com.psychology.entity.Record;
import com.psychology.entity.*;
import com.psychology.exception.NotFoundException;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.util.List;

public interface ClientService {

    Iterable<Course> getCourses();

    Course getCourseById(Long id) throws NotFoundException;

    Topic getTopicById(Long id) throws NotFoundException;

    Favourite addFavouriteCourse(Long id, User user) throws NotFoundException;

    Review addReview(Long id, User user, ReviewDTO reviewDTO) throws NotFoundException;

    Record addRecord(Long id, User user) throws NotFoundException;

    Progress addProgress(Long id, User user) throws NotFoundException;

    Long deleteFavouriteCourse(Long id, User user) throws NotFoundException;

    Resource getCertificate(Long courseId, User user) throws NotFoundException, IOException;

    List<SelectStudiedTopics> getStudiedTopics(Long courseId, User user) throws NotFoundException;
}
