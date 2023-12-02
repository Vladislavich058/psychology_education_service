package com.psychology.exception;

public class UserAlreadyExistsException extends Exception {

	private static final long serialVersionUID = -5719924055565042224L;

	public UserAlreadyExistsException(String mes) {
		super(mes);
	}
}
