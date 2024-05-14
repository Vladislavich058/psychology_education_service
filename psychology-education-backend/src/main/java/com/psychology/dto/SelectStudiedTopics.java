package com.psychology.dto;

import java.time.LocalDateTime;

public interface SelectStudiedTopics {
    Long getId();

    String getDescription();

    String getName();

    LocalDateTime getDate_time();
}
