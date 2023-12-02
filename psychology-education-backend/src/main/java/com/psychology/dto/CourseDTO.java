package com.psychology.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CourseDTO {
	
	Long id;
	
	@NotBlank
	String name;

	@NotBlank
	String description;
}
