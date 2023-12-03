package com.psychology.mapper;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

import com.psychology.dto.ReviewDTO;
import com.psychology.entity.Review;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.FIELD)
public interface ReviewMapper {
	Review toReview(ReviewDTO reviewDTO);
}
