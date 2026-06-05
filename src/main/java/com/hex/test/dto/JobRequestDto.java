package com.hex.test.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record JobRequestDto(
        @NotBlank(message = "cannot be blank")
        String title,
        @NotBlank(message = "cannot be blank")
        String description,
        String location,
        @NotNull(message = "cannot be null")
        double salary
) {
}
