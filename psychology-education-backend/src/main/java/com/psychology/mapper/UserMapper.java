package com.psychology.mapper;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

import com.psychology.dto.UserDTO;
import com.psychology.entity.User;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.FIELD)
public interface UserMapper {
	User toUser(UserDTO userDTO);

	UserDTO toUserDTO(User user);
}
