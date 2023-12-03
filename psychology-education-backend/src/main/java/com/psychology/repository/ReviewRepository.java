package com.psychology.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.psychology.dto.SelectCourseRating;
import com.psychology.entity.Review;

@RepositoryRestResource(exported = false)
public interface ReviewRepository extends JpaRepository<Review, Long> {

	@Query(nativeQuery = true, value = "SELECT avg(stars) as yValue, name as xValue\n" + "	FROM reviews\n"
			+ "	inner join courses on reviews.course_id=courses.id\n" + "	group by name")
	List<SelectCourseRating> getCourseRating();
}
