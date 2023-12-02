package com.psychology.mapper;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

import com.psychology.dto.PsychologistDTO;
import com.psychology.entity.Psychologist;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.FIELD, uses = UserMapper.class)
public interface PsychologistMapper {
	Psychologist toPsychologist(PsychologistDTO psychologistDTO);
}
