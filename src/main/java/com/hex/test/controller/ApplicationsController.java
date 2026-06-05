package com.hex.test.controller;

import com.hex.test.dto.ApplicationResponseDto;
import com.hex.test.service.ApplicationService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/applications")
public class ApplicationsController
{
    private final ApplicationService applicationService;
    @PostMapping("/apply/{jobId}")
    public void applyJob(@PathVariable int jobId, Principal principal)
    {
        String username= principal.getName();
        applicationService.applyJob(jobId,username);
    }

    @GetMapping("/my-applications")
    public List<ApplicationResponseDto> getMyApplications(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size,Principal principal)
    {
        String username= principal.getName();
        return applicationService.getMyApplications(page, size, username);
    }

}
