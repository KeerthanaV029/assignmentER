package com.hex.test.Mapper;

import com.hex.test.dto.JobRequestDto;
import com.hex.test.dto.JobResponseDto;
import com.hex.test.model.Job;
import org.springframework.stereotype.Component;

@Component
public class JobMapper
{
    public Job mapDtoEntity(JobRequestDto jobRequestDto)
    {
        Job job= new Job();
        job.setTitle(jobRequestDto.title());
        job.setDescription(jobRequestDto.description());
        job.setLocation(jobRequestDto.location());
        job.setSalary(jobRequestDto.salary());
        return job;
    }
    public JobResponseDto mapEntityToDto(Job job)
    {
        return new JobResponseDto(job.getId(),
                                    job.getTitle(),
                                    job.getLocation(),
                                    job.getSalary(),
                                    job.getEmployer().getCompanyName());
    }
}
