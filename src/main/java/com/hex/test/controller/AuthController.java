package com.hex.test.controller;

import com.hex.test.dto.TokenDto;
import com.hex.test.dto.UserRegisterDto;
import com.hex.test.model.User;
import com.hex.test.service.AuthService;
import com.hex.test.utility.JwtUtility;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@AllArgsConstructor
@RequestMapping("/api/auth")
public class AuthController
{
    private final JwtUtility jwtUtility;
    private final AuthService authService;
    @GetMapping("/login")
    public TokenDto login(Principal principal)
    {
        String username = principal.getName();
        String token = jwtUtility.generateToken(username);
        return new TokenDto(username,token);
    }

    @PostMapping("/register")
    public void registerUser(@Valid @RequestBody UserRegisterDto userRegisterDto)
    {
        authService.registerUser(userRegisterDto);
    }
}
