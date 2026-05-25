package com.payroll.repository;


import com.payroll.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee,Integer>
{
    /*
     * In controller if you are creating REST APIs
     * then add
     * @RestController annotation which is a combo of
     * @Controller & @ResponseBody
     * But if you are using this controller to load java UI(jsp or Thymeleaf)
     * then use only @Controller
     * */
}
