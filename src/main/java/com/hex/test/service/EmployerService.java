package com.hex.test.service;

import com.hex.test.model.Employer;
import com.hex.test.repository.EmployerRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmployerService
{
    private final EmployerRepository employerRepository;
    public Employer save(Employer employer)
    {
        return employerRepository.save(employer);
    }
    public Employer getByUsername(String name)
    {
        return employerRepository.findByUserUsername(name);
    }
}
