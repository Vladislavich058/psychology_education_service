package com.psychology.entity;

import java.io.Serializable;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import com.psychology.views.Views;

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
@Table(name = "progresses")
@JsonView({Views.RecordsView.class, Views.CoursesView.class})
public class Progress implements Serializable {
	
	private static final long serialVersionUID = -5814460043220534610L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	
	@ManyToOne
	@JoinColumn(name = "psychologist_id", nullable = false)
	Psychologist psychologist;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "topic_id", nullable = false)
	Topic topic;

	LocalDateTime dateTime;
}
