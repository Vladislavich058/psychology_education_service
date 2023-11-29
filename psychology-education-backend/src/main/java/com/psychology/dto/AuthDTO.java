package com.psychology.dto;

public record AuthDTO(String accessToken, String type, Integer id, String email, String role) {

}
