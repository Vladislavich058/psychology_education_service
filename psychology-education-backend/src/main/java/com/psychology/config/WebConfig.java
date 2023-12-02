package com.psychology.config;

import java.time.LocalDateTime;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.psychology.entity.Course;
import com.psychology.entity.Photo;
import com.psychology.entity.Psychologist;
import com.psychology.entity.Topic;
import com.psychology.entity.User;
import com.psychology.exception.NotFoundException;
import com.psychology.repository.CourseRepository;
import com.psychology.repository.PsychologistRepository;
import com.psychology.repository.TopicRepository;
import com.psychology.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class WebConfig implements CommandLineRunner {

	@Autowired
	UserRepository userRepository;

	@Autowired
	PsychologistRepository psychologistRepository;

	@Autowired
	CourseRepository courseRepository;

	@Autowired
	TopicRepository topicRepository;

	@Autowired
	PasswordEncoder encoder;

	@Override
	public void run(String... args) throws Exception {
		if (userRepository.findAll().isEmpty()) {
			userRepository.save(
					User.builder().email("admin@mail.ru").password(encoder.encode("admin")).role("admin").build());
		}

		if (psychologistRepository.findAll().isEmpty()) {
			psychologistRepository
					.saveAll(Arrays.asList(
							Psychologist.builder().name("Ксения").surname("Лешкевич").lastname("Валерьевна")
									.phone("+375291234567")
									.photo(Photo.builder().name("ksusha").size(10L)
											.uri("http://localhost:8080/images/ksusha.jpg").build())
									.user(User.builder().email("psycho1@mail.ru")
											.password(encoder.encode("psychologist")).role("psychologist").build())
									.build(),
							Psychologist.builder().name("Анна").surname("Круглей").lastname("Александровна")
									.phone("+375291234567")
									.user(User.builder().email("psycho2@mail.ru")
											.password(encoder.encode("psychologist")).role("psychologist").build())
									.build()));
		}

		if (courseRepository.findAll().isEmpty()) {
			courseRepository.saveAll(Arrays.asList(
					Course.builder().name("Вводный курс").description("Данный курс служит вводным в психологию")
							.photo(Photo.builder().name("psycho").size(10L)
									.uri("http://localhost:8080/images/psycho.jpg").build())
							.createdDate(LocalDateTime.now()).topics(null).build(),
					Course.builder().name("Детская психология").description("Данный курс описывает детскую психологию")
							.photo(Photo.builder().name("detpsycho").size(10L)
									.uri("http://localhost:8080/images/detpsycho.jpeg").build())
							.createdDate(LocalDateTime.now()).topics(null).build()));
			Course course1 = courseRepository.findById(1L)
					.orElseThrow(() -> new NotFoundException("Course with id 1 not found!"));
			Course course2 = courseRepository.findById(2L)
					.orElseThrow(() -> new NotFoundException("Course with id 2 not found!"));
			topicRepository.saveAll(Arrays.asList(Topic.builder().name("Что такое психология?").description(
					"<p><strong>Психология — это слово происходящее от греческого​ psyche​ — душа и​ logos​ — учение.</strong></p><p>Получается, что это наука, изучающая психические процессы, возникающие в результате постоянного воздействия объективного мира, социальной среды на человека и животных. (Определение взято с ресурса​ wikipedia.org), а говоря проще, это наука о человеке и окружающем его мире. Как и большинство наук, она родилась из самой древней научной отрасли — философии. Психология является одновременно одной из самых древних и одной из самых молодых наук. Духовной предтечей психологии стали многие науки древности, однако исходная точка формирования современного научного подхода относится к 1879 году.</p>")
					.course(course1).build(),
					Topic.builder().name("Кто такие психологи?").description(
							"<p>Психолог — это специально обученный человек, который имеет высшее образование в этой отрасли. В зависимости от квалификации и специализации он может работать с разными возрастными группами, а также с различными сферами человеческой жизни — семейной, деловой, учебной, спортивной. Для эффективного выполнения своей деятельности ему необходимо регулярно развиваться и знать больше, чем того предполагает его профессия.</p>")
							.course(course1).build(),
					Topic.builder().name("Если я пойду к психологу он мне точно поможет?").description(
							"<p>Если вы решились пойти на прием к психологу, это не дает вам 100% гарантию решения вашего запроса. Обманщики?! Шарлатаны?! Спросите вы, но нет. Мы уже с вами знаем, что у психолога нет универсальных пилюль для разрешения сложностей Клиента. Все зависит не только от специалиста, но и от обратившегося к нему человека. Готов ли он в данный момент, и на протяжении неопределенного периода времени, работать над собой и прилагать собственные усилия для решения своей проблемы или нет.</p>")
							.course(course1).build(),
					Topic.builder().name("Итог").description(
							"<p>Подводя итоги, давайте соберем все мысли воедино. Психология — наука о внутреннем и внешнем мире человек, а точнее о взаимодействии между ними. Специалисты этого направления и рады бы знать заклинания, и по взмаху волшебной палочки решать все мировые проблемы, но пока это невозможно, и для эффективной работы им необходимы не только знания и личный опыт, но и полное содействие Клиента. Психолог — помощник, а не тот, кто сделает все за нас.</p>")
							.course(course1).build(),
					Topic.builder().name("Что такое детская психология?").description(
							"<p><a href=\"https://ru.wikipedia.org/wiki/%D0%94%D0%B5%D1%82%D1%81%D0%BA%D0%B0%D1%8F_%D0%BF%D1%81%D0%B8%D1%85%D0%BE%D0%BB%D0%BE%D0%B3%D0%B8%D1%8F\">Детская психология</a> – это сложное и многогранное понятие, наука, включающая в себя подробности функционирования детской психики разных возрастов. Во время изучения детей, принадлежащих к разным возрастным группам, происходит определение и уточнение закономерностей их психического развития, их поведения, реакции на типичные ситуации.</p>")
							.course(course2).build(),
					Topic.builder().name("Что изучает эта наука?").description(
							"<p>Детская психология, как наука, изучает психологические взаимосвязи и развивающиеся здесь процессы, протекающие у ребенка, изменяющиеся в ходе его взросления. Они отличаются, меняются вместе с возрастом ребенка. Психология, изучающая особенности поведения ребенка, считается отдельной ветвью науки. Она изучает подсознательный и сознательный тип развития детского организма.</p>")
							.course(course2).build(),
					Topic.builder().name("Задачи и цели").description(
							"<p><a href=\"https://www.instagram.com/explore/tags/%D0%B4%D0%B5%D1%82%D1%81%D0%BA%D0%B0%D1%8F%D0%BF%D1%81%D0%B8%D1%85%D0%BE%D0%BB%D0%BE%D0%B3%D0%B8%D1%8F/\">Детская психология</a> является самостоятельной отраслью общей психологии. Она занимается изучением особенностей внутреннего состояния ребенка, тщательно рассматривает то, как его психика изменяется с течением возраста, начиная от рождения и до совершеннолетия.</p><p>В науке детской психологии есть место тесной взаимосвязи с разными дисциплинами:<br>\n"
									+ "1. педагогические основы;<br>\n" + "2. морфология возрастного вида;<br>\n"
									+ "3. физиологические процессы;<br>\n" + "4. психология общего вида.</p>")
							.course(course2).build(),
					Topic.builder().name("Заключение").description(
							"<p>Каждый ребенок является самостоятельной личностью, психическое состояние которого изучается и регулируется детской психологией. Дети отличаются друг от друга физиологическими и психологическими особенностями. Чтобы дитя развивалось гармонично, важно не пытаться его переделать, важно учитывать темперамент и характер малыша, только с этой позиции подходить к его обучению. Только при соблюдении этих простых условий из малыша вырастет здоровая и гармоничная личность.</p>")
							.course(course2).build()));
		}

	}

}
