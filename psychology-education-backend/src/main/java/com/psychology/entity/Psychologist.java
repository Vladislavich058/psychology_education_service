package com.psychology.entity;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "psychologists")
@JsonView({Views.RecordsView.class, Views.CoursesView.class})
public class Psychologist implements Serializable {

	static final long serialVersionUID = 2699273903057643335L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;

	@Column(nullable = false)
	String name;

	@Column(nullable = false)
	String surname;

	@Column(nullable = false)
	String lastname;

	@Column(nullable = false)
	String phone;

	@OneToOne(cascade = CascadeType.ALL)
	User user;

	@OneToOne(cascade = CascadeType.ALL)
	Photo photo;
	
	@JsonIgnore
	@OneToMany(mappedBy = "psychologist", cascade = CascadeType.ALL)
	List<Favourite> favourites;
	
	@JsonIgnore
	@OneToMany(mappedBy = "psychologist", cascade = CascadeType.ALL)
	List<Review> reviews;
	
	@JsonIgnore
	@OneToMany(mappedBy = "psychologist", cascade = CascadeType.ALL)
	List<Record> records;
	
	@JsonIgnore
	@OneToMany(mappedBy = "psychologist", cascade = CascadeType.ALL)
	List<Progress> progresses;

}
