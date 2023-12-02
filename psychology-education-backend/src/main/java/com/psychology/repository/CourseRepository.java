package com.psychology.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.psychology.entity.Course;

@RepositoryRestResource(exported = false)
public interface CourseRepository extends JpaRepository<Course, Long> {
	Optional<Course> findByName(String name);

	Optional<Course> findByNameAndIdNot(String name, Long id);
}
