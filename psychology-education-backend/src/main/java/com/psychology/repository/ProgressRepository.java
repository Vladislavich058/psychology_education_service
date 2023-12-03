package com.psychology.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.psychology.dto.SelectProgress;
import com.psychology.entity.Progress;

@RepositoryRestResource(exported = false)
public interface ProgressRepository extends JpaRepository<Progress, Long> {
	List<Progress> findByPsychologistId(Long id);

	@Query(nativeQuery = true, value = "SELECT count(topic_id), course_id as course\n" + "	FROM progresses\n"
			+ "	inner join topics on progresses.topic_id=topics.id\n" + "	where psychologist_id=?1\n"
			+ "	group by topics.course_id\n" + "	")
	List<SelectProgress> getProgressByPsychologistId(Long id);
}
