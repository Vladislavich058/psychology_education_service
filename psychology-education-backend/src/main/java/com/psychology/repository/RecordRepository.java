package com.psychology.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.psychology.entity.Record;

@RepositoryRestResource(exported = false)
public interface RecordRepository extends JpaRepository<Record, Long>{

}
