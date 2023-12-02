package com.psychology.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.psychology.dto.AuthDTO;
import com.psychology.dto.PsychologistDTO;
import com.psychology.dto.UserDTO;
import com.psychology.entity.Psychologist;
import com.psychology.entity.User;
import com.psychology.exception.NotFoundException;
import com.psychology.exception.UserAlreadyExistsException;
import com.psychology.service.LoginService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class LoginController {
	@Autowired
	LoginService loginService;

	@PostMapping("/login")
	public AuthDTO logIn(@Valid @RequestBody UserDTO userDTO) {

		return loginService.logIn(userDTO);
	}

	@GetMapping("/current-user")
	public Psychologist getCurrentUser(@AuthenticationPrincipal User user) throws NotFoundException {
		return loginService.getCurrentUser(user);
	}

	@PatchMapping("/current-user")
	public AuthDTO updateCurrentUser(@AuthenticationPrincipal User user,
			@RequestPart("psychologist") @Valid PsychologistDTO psychologistDTO,
			@RequestPart("photo") MultipartFile photo) throws UserAlreadyExistsException, IOException {

		return loginService.updateCurrentUser(user, psychologistDTO, photo);
	}
}
