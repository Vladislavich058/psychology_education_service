package com.psychology.entity;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonView;
import com.psychology.views.Views;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "courses")
public class Course implements Serializable {

	static final long serialVersionUID = 7648525831129858001L;
	
	@JsonView({Views.RecordsView.class, Views.CoursesView.class})
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;

	@JsonView({Views.RecordsView.class, Views.CoursesView.class})
	@Column(nullable = false)
	String name;

	@JsonView({Views.RecordsView.class, Views.CoursesView.class})
	@Column(nullable = false)
	LocalDateTime createdDate;

	@JsonView({Views.RecordsView.class, Views.CoursesView.class})
	@Column(nullable = false, columnDefinition = "text")
	String description;

	@JsonView({Views.RecordsView.class, Views.CoursesView.class})
	@OneToOne(cascade = CascadeType.ALL)
	Photo photo;

	@JsonView({Views.RecordsView.class, Views.CoursesView.class})
	@OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
	List<Topic> topics;

	@JsonView({Views.RecordsView.class, Views.CoursesView.class})
	@OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
	List<Favourite> favourites;
	
	@JsonView(Views.CoursesView.class)
	@OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
	List<Record> records;

	public void addTopic(Topic topic) {
		if (topic != null) {
			if (topics == null) {
				topics = new ArrayList<>();
			}
			topics.add(topic);
			topic.setCourse(this);
		}
	}
}
