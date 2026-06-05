package com.hex.test.dto;

public record BookResponseDto(
        int bookId,
        String title,
        String authorName,
        String authorEmail
) {
}
