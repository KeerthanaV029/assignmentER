package com.hex.test.service;

import com.hex.test.Mapper.AuthMapper;
import com.hex.test.Mapper.EmployerMapper;
import com.hex.test.Mapper.JobSeekerMapper;
import com.hex.test.dto.UserRegisterDto;
import com.hex.test.enums.Role;
import com.hex.test.model.Employer;
import com.hex.test.model.JobSeeker;
import com.hex.test.model.User;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthService
{

    private final AuthMapper authMapper;
    private final EmployerMapper employerMapper;
    private final JobSeekerMapper jobSeekerMapper;
    private final UserService userService;
    private final EmployerService employerService;
    private final JobSeekerService jobSeekerService;
    private final PasswordEncoder passwordEncoder;
    public void registerUser(@Valid UserRegisterDto userRegisterDto)
    {
        User user = authMapper.mapDtoToEntity(userRegisterDto);
        user.setPassword(passwordEncoder.encode(userRegisterDto.password()));
        userService.save(user);
        if(user.getRole()== Role.EMPLOYER)
        {
            Employer employer= employerMapper.mapDtoToEntity(userRegisterDto);
            employerService.save(employer);
        }
        if(user.getRole()==Role.SEEKER)
        {
            JobSeeker jobSeeker= jobSeekerMapper.mapDtoToEntity(userRegisterDto);
            jobSeekerService.save(jobSeeker);
        }
    }
}
