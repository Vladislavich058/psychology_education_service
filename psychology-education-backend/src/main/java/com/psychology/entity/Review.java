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
@Table(name = "reviews")
@JsonView({Views.RecordsView.class, Views.CoursesView.class})
public class Review implements Serializable {
	
	private static final long serialVersionUID = -4535736858819427471L;
	
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
	
	@Column(nullable =  false)
	String message;
	
	@Column(nullable = false)
	Short stars;
	
	@Column(nullable = false)
	LocalDateTime createDateTime;
}
