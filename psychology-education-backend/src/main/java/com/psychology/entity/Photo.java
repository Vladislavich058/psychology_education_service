package com.psychology.entity;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonView;
import com.psychology.views.Views;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@Table(name = "photos")
@JsonView({Views.RecordsView.class, Views.CoursesView.class})
public class Photo implements Serializable {

	static final long serialVersionUID = 3679956076539574955L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;

	@Column(nullable = false)
	String name;

	@Column(nullable = false)
	String uri;

	@Column(nullable = false)
	Long size;
}
