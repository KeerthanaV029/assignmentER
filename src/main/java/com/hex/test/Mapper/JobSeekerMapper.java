package com.hex.test.Mapper;

import com.hex.test.dto.UserRegisterDto;
import com.hex.test.model.JobSeeker;
import org.springframework.stereotype.Component;

@Component
public class JobSeekerMapper
{
    public JobSeeker mapDtoToEntity(UserRegisterDto userRegisterDto)
    {
        JobSeeker jobSeeker= new JobSeeker();
        jobSeeker.setName(userRegisterDto.name());
        jobSeeker.setResumeSummary(userRegisterDto.resumeSummary());
        return jobSeeker;
    }
}
