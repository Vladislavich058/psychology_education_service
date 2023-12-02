package com.psychology.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.psychology.entity.Favourite;

@RepositoryRestResource(exported = false)
public interface FavouriteRepository extends JpaRepository<Favourite, Long> {
	void deleteByPsychologistUserIdAndCourseId(Long userId, Long courseId);

	Optional<Favourite> findByPsychologistUserIdAndCourseId(Long userId, Long courseId);
}
