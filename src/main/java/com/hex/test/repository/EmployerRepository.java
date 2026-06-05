package com.hex.test.repository;

import com.hex.test.model.Employer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployerRepository extends JpaRepository<Employer, Integer>
{
    Employer findByUserUsername(String userUsername);
}
