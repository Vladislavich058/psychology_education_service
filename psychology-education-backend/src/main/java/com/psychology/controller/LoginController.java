package com.psychology.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.psychology.dto.AuthDTO;
import com.psychology.dto.UserDTO;
import com.psychology.service.LoginService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/")
public class LoginController {
	@Autowired
	LoginService loginService;

	@PostMapping("/login")
	public AuthDTO logIn(@Valid @RequestBody UserDTO userDTO) {

		return loginService.logIn(userDTO);
	}
}
