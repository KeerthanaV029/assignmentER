package com.hex.test.controller;

import com.hex.test.dto.BookResponseDto;
import com.hex.test.service.BooksService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/books")
public class BooksController
{
    private final BooksService booksService;

    @GetMapping("/byAuthorname")
    public List<BookResponseDto> getBooksByAuthor(@RequestParam(defaultValue = "0")  int page,@RequestParam(defaultValue = "10") int size, Principal principal)
    {
        String username= principal.getName();
        return booksService.getBooksByAuthor(page, size, username);
    }

}
