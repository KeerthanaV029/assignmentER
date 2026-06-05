package com.hex.test.service;

import com.hex.test.model.JobSeeker;
import com.hex.test.repository.JobSeekerRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class JobSeekerService
{
    private final JobSeekerRepository jobSeekerRepository;
    public JobSeeker save(JobSeeker jobSeeker)
    {
        return jobSeekerRepository.save(jobSeeker);
    }
    public JobSeeker getByUsername(String name)
    {
        return jobSeekerRepository.findByUserUsername(name);
    }
}
