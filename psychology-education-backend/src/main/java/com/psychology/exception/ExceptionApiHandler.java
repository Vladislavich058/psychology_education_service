package com.psychology.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.psychology.dto.ErrorDTO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class ExceptionApiHandler {


	@ExceptionHandler(UsernameNotFoundException.class)
	public ResponseEntity<ErrorDTO> usernameNotFoundException(UsernameNotFoundException exception) {
		log.error(exception.getMessage());
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorDTO(exception.getMessage()));
	}

	@ExceptionHandler(NotFoundException.class)
	public ResponseEntity<ErrorDTO> notFoundException(NotFoundException exception) {
		log.error(exception.getMessage());
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorDTO(exception.getMessage()));
	}

	@ExceptionHandler(BadCredentialsException.class)
	public ResponseEntity<ErrorDTO> badCredentialsException(BadCredentialsException exception) {
		log.error(exception.getMessage());
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorDTO("Неверные данные!"));
	}
	
}
