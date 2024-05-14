package com.psychology.repository;

import com.psychology.dto.SelectProgress;
import com.psychology.dto.SelectStudiedTopics;
import com.psychology.entity.Progress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(exported = false)
public interface ProgressRepository extends JpaRepository<Progress, Long> {
    @Query(nativeQuery = true, value = "select topics.id, topics.description, topics.name, progresses.date_time \n" +
            "from progresses\n" +
            "inner join topics on progresses.topic_id=topics.id\n" +
            "where psychologist_id = ?1 and course_id = ?2\n")
    List<SelectStudiedTopics> getTopicsByPsychologistIdAndCourseId(Long psychologistId, Long courseId);

    @Query(nativeQuery = true, value = "SELECT count(topic_id), course_id as course\n"
            + "	FROM progresses\n"
            + "	inner join topics on progresses.topic_id=topics.id\n"
            + "	where psychologist_id=?1\n"
            + "	group by topics.course_id\n")
    List<SelectProgress> getProgressByPsychologistId(Long id);
}
