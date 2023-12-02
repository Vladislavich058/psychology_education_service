package com.psychology.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.psychology.entity.Psychologist;

@RepositoryRestResource(exported = false)
public interface PsychologistRepository extends JpaRepository<Psychologist, Long> {
	Optional<Psychologist> findByUserId(Long id);
}
