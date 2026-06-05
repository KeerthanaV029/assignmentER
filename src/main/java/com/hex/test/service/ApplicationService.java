package com.hex.test.service;

import com.hex.test.Mapper.ApplicationMapper;
import com.hex.test.dto.ApplicationResponseDto;
import com.hex.test.model.Application;
import com.hex.test.model.Job;
import com.hex.test.model.JobSeeker;
import com.hex.test.repository.ApplicationRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ApplicationService {
    private final JobService jobService;
    private final JobSeekerService jobSeekerService;
    private final ApplicationRepository applicationRepository;
    private final ApplicationMapper applicationMapper;

    public void applyJob(int jobId, String username)
    {
        Application application= new Application();
        Job job= jobService.getById(jobId);
        JobSeeker jobSeeker= jobSeekerService.getByUsername(username);
        application.setJob(job);
        application.setJobSeeker(jobSeeker);
        applicationRepository.save(application);
    }

    public List<ApplicationResponseDto> getMyApplications(int page, int size, String username)
    {
        Pageable pageable= PageRequest.of(page,size);
        List<Application> list= applicationRepository.getMyApplications(username,pageable).getContent();
        return list.stream()
                .map(applicationMapper :: mapEntityToDto)
                .toList();
    }
}
