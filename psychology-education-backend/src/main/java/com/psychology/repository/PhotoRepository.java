package com.psychology.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.psychology.entity.Photo;

@RepositoryRestResource(exported = false)
public interface PhotoRepository extends JpaRepository<Photo, Integer> {

}
