package com.psychology.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.psychology.dto.AuthDTO;
import com.psychology.dto.PsychologistDTO;
import com.psychology.dto.UserDTO;
import com.psychology.entity.Psychologist;
import com.psychology.entity.User;
import com.psychology.exception.NotFoundException;
import com.psychology.exception.UserAlreadyExistsException;

public interface LoginService {
	AuthDTO logIn(UserDTO userDTO);

	Psychologist getCurrentUser(User user) throws NotFoundException;

	AuthDTO updateCurrentUser(User user, PsychologistDTO psychologistDTO, MultipartFile file)
			throws UserAlreadyExistsException, IOException;
}
