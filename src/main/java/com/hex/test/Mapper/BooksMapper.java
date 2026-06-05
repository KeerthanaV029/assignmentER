package com.hex.test.Mapper;

import com.hex.test.dto.BookResponseDto;
import com.hex.test.model.Book;
import org.springframework.stereotype.Component;

@Component
public class BooksMapper
{
    public BookResponseDto mapEntityToDto(Book book)
    {
        return new BookResponseDto(book.getId(),
                book.getTitle(),
                book.getAuthor().getName(),
                book.getAuthor().getEmail());
    }
}
