package com.psychology.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.psychology.entity.Progress;

@RepositoryRestResource(exported = false)
public interface ProgressRepository extends JpaRepository<Progress, Long> {

}
