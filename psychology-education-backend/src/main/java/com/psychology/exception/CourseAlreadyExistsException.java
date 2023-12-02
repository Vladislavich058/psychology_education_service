package com.psychology.exception;

public class CourseAlreadyExistsException extends Exception {

	private static final long serialVersionUID = -5719924055565042224L;

	public CourseAlreadyExistsException(String mes) {
		super(mes);
	}
}
