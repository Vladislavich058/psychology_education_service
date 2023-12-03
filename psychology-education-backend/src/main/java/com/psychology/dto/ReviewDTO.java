package com.psychology.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ReviewDTO {
	@NotBlank
	String message;

	@NotNull
	Short stars;
}
