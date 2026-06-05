package com.hex.test.repository;

import com.hex.test.model.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job,Integer>
{
    @Override
    Page<Job> findAll(Pageable pageable);
}
