package com.psychology.repository;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.psychology.entity.Psychologist;
import com.psychology.entity.User;

@DataJpaTest
public class PsychologistRepositoryTest {

	@Autowired
	PsychologistRepository psychologistRepository;

	@Test
	void savePsychologistTest() {
		psychologistRepository.save(Psychologist.builder().name("name").surname("suraname").lastname("lastname")
				.phone("+3751122333")
				.user(User.builder().email("email@mail.ru").password("pass").role("psychologist").build()).build());
		assertThat(psychologistRepository.findById(1L).isPresent()).isTrue();
	}

	@Test
	void deletePsychologistTest() {
		psychologistRepository.deleteById(1L);
		assertThat(psychologistRepository.findById(1L).isEmpty()).isTrue();
	}

}
