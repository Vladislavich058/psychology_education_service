package com.psychology.service;

import com.psychology.dto.AuthDTO;
import com.psychology.dto.UserDTO;

public interface LoginService {
	AuthDTO logIn(UserDTO userDTO);
}
