package com.hex.test.service;

import com.hex.test.Mapper.BooksMapper;
import com.hex.test.dto.BookResponseDto;
import com.hex.test.model.Book;
import com.hex.test.repository.BooksRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class BooksService
{

    private final BooksRepository booksRepository;
    private final BooksMapper booksMapper;

    public List<BookResponseDto> getBooksByAuthor(int page, int size, String username)
    {
        Pageable pageable= PageRequest.of(page,size);
        List<Book> list = booksRepository.getBooksByAuthor(username, pageable).getContent();
        return list.stream()
                .map(booksMapper :: mapEntityToDto)
                .toList();
    }
}
