package com.hex.test.controller;

import com.hex.test.dto.JobRequestDto;
import com.hex.test.dto.JobResponseDto;
import com.hex.test.service.JobService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/jobs")
public class JobController
{
    private final JobService jobService;

    @PostMapping("/add")
    public void add(@Valid @RequestBody JobRequestDto jobRequestDto, Principal principal)
    {
        String username= principal.getName();
        jobService.add(jobRequestDto,username);
    }
    @GetMapping("/allJobs")
    public List<JobResponseDto> getAll(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size)
    {
        return jobService.getAll(page,size);
    }
}
