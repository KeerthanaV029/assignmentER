package com.hex.test.Mapper;

import com.hex.test.dto.UserRegisterDto;
import com.hex.test.model.User;
import org.springframework.stereotype.Component;

@Component
public class AuthMapper
{

    public User mapDtoToEntity(UserRegisterDto userRegisterDto)
    {
        User user= new User();
        user.setUsername(userRegisterDto.username());
        user.setPassword(userRegisterDto.password());
        user.setRole(userRegisterDto.role());
        return user;
    }
}
