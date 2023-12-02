package com.psychology.entity;

import java.io.Serializable;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import com.psychology.views.Views;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "records")
public class Record implements Serializable {
	
	private static final long serialVersionUID = 1588709481572755091L;

	@JsonView({Views.RecordsView.class, Views.CoursesView.class})
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	
	@JsonView({Views.RecordsView.class, Views.CoursesView.class})
	@ManyToOne
	@JoinColumn(name = "psychologist_id", nullable = false)
	Psychologist psychologist;
	
	@JsonView(Views.RecordsView.class)
	@ManyToOne
	@JoinColumn(name = "course_id", nullable = false)
	Course course;
	
	@JsonView({Views.RecordsView.class, Views.CoursesView.class})
	@Column(nullable = false)
	String status;
	
	@JsonView({Views.RecordsView.class, Views.CoursesView.class})
	@Column(nullable = false)
	LocalDateTime createdDateTime;
	
}
