package com.payroll.service;

import com.payroll.exception.ResourceNotFoundException;
import com.payroll.model.Employee;
import com.payroll.repository.EmployeeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class EmployeeService
{
    private final EmployeeRepository employeeRepository;
    public List<Employee> getAll()
    {
     return employeeRepository.findAll();
    }

    public void addEmployee(Employee employee)
    {
        employeeRepository.save(employee);
    }
    public Employee getById(int id)
    {
        return employeeRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Invalid ID given"));
    }

    public void deleteById(int id)
    {
        getById(id);
        employeeRepository.deleteById(id);
    }

    public void update(int id, Employee newemployee)
    {
        Employee existingemployee= getById(id);
        existingemployee.setEmail(newemployee.getEmail());
        existingemployee.setSalary(newemployee.getSalary());
        existingemployee.setDepartment(newemployee.getDepartment());
        existingemployee.setEmpName(newemployee.getEmpName());
        employeeRepository.save(existingemployee);
    }
}
