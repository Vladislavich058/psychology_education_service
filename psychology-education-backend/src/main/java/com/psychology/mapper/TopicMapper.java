package com.psychology.mapper;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

import com.psychology.dto.TopicDTO;
import com.psychology.entity.Topic;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.FIELD)
public interface TopicMapper {
	Topic toTopic(TopicDTO topicDTO);
}
