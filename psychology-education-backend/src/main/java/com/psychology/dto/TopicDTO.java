package com.psychology.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TopicDTO {
	
	Long id;

	@NotBlank
	String name;
	
	@NotBlank
	String description;
}
