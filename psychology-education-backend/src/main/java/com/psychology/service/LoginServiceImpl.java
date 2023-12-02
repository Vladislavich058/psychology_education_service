package com.psychology.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.psychology.dto.AuthDTO;
import com.psychology.dto.PsychologistDTO;
import com.psychology.dto.UserDTO;
import com.psychology.entity.Photo;
import com.psychology.entity.Psychologist;
import com.psychology.entity.User;
import com.psychology.exception.NotFoundException;
import com.psychology.exception.UserAlreadyExistsException;
import com.psychology.jwt.JwtUtils;
import com.psychology.mapper.PsychologistMapper;
import com.psychology.mapper.UserMapper;
import com.psychology.repository.PsychologistRepository;
import com.psychology.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class LoginServiceImpl implements LoginService {

	@Autowired
	UserMapper userMapper;

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	PsychologistRepository psychologistRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	PsychologistMapper psychologistMapper;

	@Autowired
	PhotoService photoService;

	@Autowired
	JwtUtils jwtUtils;

	@Override
	public AuthDTO logIn(UserDTO userDTO) {
		Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(userDTO.getEmail(), userDTO.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);

		User userDetails = (User) authentication.getPrincipal();
		String role = userDetails.getAuthorities().stream().map(item -> item.getAuthority()).findFirst().get();
		return new AuthDTO(jwt, "Bearer", userDetails.getId(), userDetails.getEmail(), role);
	}

	@Override
	public Psychologist getCurrentUser(User user) throws NotFoundException {
		return psychologistRepository.findByUserId(user.getId())
				.orElseThrow(() -> new NotFoundException("Psychologist with user id = " + user.getId() + " not found"));
	}

	@Transactional
	@Override
	public AuthDTO updateCurrentUser(User user, PsychologistDTO psychologistDTO, MultipartFile file)
			throws UserAlreadyExistsException, IOException {
		if (userRepository.findByEmailAndIdNot(psychologistDTO.getUser().getEmail(), user.getId()).isPresent()) {
			throw new UserAlreadyExistsException(
					"User with email = " + psychologistDTO.getUser().getEmail() + " already exists");
		}
		Photo photo = null;
		if (file != null) {
			photo = photoService.uploadFile(file);
		}
		Psychologist updatePsychologist = psychologistMapper.toPsychologist(psychologistDTO);
		updatePsychologist.setPhoto(photo);
		updatePsychologist.getUser().setRole("psychologist");
		updatePsychologist.getUser().setPassword(passwordEncoder.encode(updatePsychologist.getUser().getPassword()));
		psychologistRepository.save(updatePsychologist);
		return logIn(new UserDTO(null, psychologistDTO.getUser().getEmail(), psychologistDTO.getUser().getPassword()));
	}
}
