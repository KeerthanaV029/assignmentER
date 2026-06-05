package com.hex.test.service;

import com.hex.test.Mapper.JobMapper;
import com.hex.test.dto.JobRequestDto;
import com.hex.test.dto.JobResponseDto;
import com.hex.test.exceptions.ResourceNotFoundException;
import com.hex.test.model.Employer;
import com.hex.test.model.Job;
import com.hex.test.repository.JobRepository;
import lombok.AllArgsConstructor;
import org.antlr.v4.runtime.RecognitionException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

@Service
@AllArgsConstructor
public class JobService
{
    private final EmployerService employerService;
    private final JobMapper jobMapper;
    private final JobRepository jobRepository;


    public void add(JobRequestDto jobRequestDto, String username)
    {
        Employer employer= employerService.getByUsername(username);
        Job job = jobMapper.mapDtoEntity(jobRequestDto);
        job.setEmployer(employer);
        jobRepository.save(job);
    }

    public List<JobResponseDto> getAll(int page, int size)
    {
        Pageable pageable= PageRequest.of(page,size);
        List<Job> list= jobRepository.findAll(pageable).getContent();
        return list.stream()
                .map(jobMapper::mapEntityToDto)
                .toList();
    }
    public Job getById(int id)
    {
        return jobRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("invalid job Id"));
    }
}
