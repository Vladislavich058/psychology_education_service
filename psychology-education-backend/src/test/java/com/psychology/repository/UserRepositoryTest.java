package com.psychology.repository;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.psychology.entity.User;

@DataJpaTest
public class UserRepositoryTest {
	
	@Autowired
	UserRepository userRepository;

	@Test
	void saveUser() {
		userRepository.save(User.builder().email("mail@mail.ru").password("password")
				.role("psychologist").build());
		assertThat(userRepository.findByEmail("mail@mail.ru").isPresent()).isTrue();
	}

	@Test
	void deleteUser() {
		userRepository.deleteByEmail("user@user.com");
		assertThat(userRepository.findByEmail("user@user.com").isEmpty()).isTrue();
	}
}
