package com.psychology.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.psychology.entity.Topic;

@RepositoryRestResource(exported = false)
public interface TopicRepository extends JpaRepository<Topic, Long> {
}
