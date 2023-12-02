package com.psychology.dto;

public record AuthDTO(String accessToken, String type, Long id, String email, String role) {

}
