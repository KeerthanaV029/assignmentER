package com.hex.test.repository;

import com.hex.test.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BooksRepository extends JpaRepository<Book, Integer>
{
    @Query("""
          select b from Book b where b.author.user.username=?1
          """)
    Page<Book> getBooksByAuthor(String name, Pageable pageable);

}
