package com.psychology.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PsychologistDTO {
	
	Long id;
	
	@NotBlank
	private String name;
	
	@NotBlank
	private String surname;
	
	private String lastname;
	
	@NotBlank
	private String phone;
	
	@NotNull
	private UserDTO user;
}
