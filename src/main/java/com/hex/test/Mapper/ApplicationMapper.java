package com.hex.test.Mapper;

import com.hex.test.dto.ApplicationResponseDto;
import com.hex.test.model.Application;
import org.springframework.stereotype.Component;

@Component
public class ApplicationMapper
{
    public ApplicationResponseDto mapEntityToDto(Application application)
    {
        return new ApplicationResponseDto(application.getId(),
                                            application.getAppliedAt(),
                                            application.getJob().getTitle(),
                                            application.getJob().getEmployer().getCompanyName());
    }

}
