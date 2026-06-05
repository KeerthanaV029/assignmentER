package com.hex.test.dto;

import com.hex.test.enums.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UserRegisterDto(
        @NotNull(message = "username required")
        @NotBlank(message = "username required")
        String username,
        @NotNull(message = "password required")
        @NotBlank(message = "password required")
        String password,
        Role role,

        String company_name,

        String name,
        String resumeSummary
) {
}
