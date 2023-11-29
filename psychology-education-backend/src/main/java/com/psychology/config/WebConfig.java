package com.psychology.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.psychology.entity.User;
import com.psychology.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class WebConfig implements CommandLineRunner {

	@Autowired
	UserRepository userRepository;

	@Autowired
	PasswordEncoder encoder;

	@Override
	public void run(String... args) throws Exception {
		if (userRepository.findAll().isEmpty()) {
			userRepository.save(
					User.builder().email("admin@mail.ru").password(encoder.encode(("admin"))).role("admin").build());
			userRepository.save(User.builder().email("psycho1@mail.ru").password(encoder.encode(("psychology")))
					.role("psychology").build());
			userRepository.save(User.builder().email("psycho1.ru").password(encoder.encode(("psychology")))
					.role("psychology").build());
		}

	}

}
