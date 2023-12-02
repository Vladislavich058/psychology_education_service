package com.psychology.mapper;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

import com.psychology.dto.CourseDTO;
import com.psychology.entity.Course;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.FIELD, uses = TopicMapper.class)
public interface CourseMapper {
	Course toCourse(CourseDTO courseDTO);
}
