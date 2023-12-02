package com.psychology.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDTO {
	
	Long id;

	@NotBlank
	private String email;

	@NotBlank
	private String password;
}
