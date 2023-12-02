package com.psychology.entity;

import java.io.Serializable;

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
@Table(name = "favourites")
@JsonView({Views.RecordsView.class, Views.CoursesView.class})
public class Favourite implements Serializable {
	
	private static final long serialVersionUID = -5765960614533619458L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	
	@ManyToOne
	@JoinColumn(name = "psychologist_id", nullable = false)
	Psychologist psychologist;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "course_id", nullable = false)
	Course course;
}
