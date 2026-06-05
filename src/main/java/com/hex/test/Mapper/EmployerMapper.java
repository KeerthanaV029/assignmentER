package com.hex.test.Mapper;

import com.hex.test.dto.UserRegisterDto;
import com.hex.test.model.Employer;
import jakarta.persistence.Column;
import org.springframework.stereotype.Component;

@Component
public class EmployerMapper
{
    public Employer mapDtoToEntity(UserRegisterDto userRegisterDto)
    {
        Employer employer= new Employer();
        employer.setCompanyName(userRegisterDto.company_name());
        return employer;
    }
}
