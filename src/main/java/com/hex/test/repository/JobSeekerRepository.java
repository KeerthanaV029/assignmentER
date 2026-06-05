package com.hex.test.repository;

import com.hex.test.Mapper.JobSeekerMapper;
import com.hex.test.model.JobSeeker;
import com.hex.test.service.JobService;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobSeekerRepository extends JpaRepository<JobSeeker, Integer>
{
    JobSeeker findByUserUsername(String name);
}
