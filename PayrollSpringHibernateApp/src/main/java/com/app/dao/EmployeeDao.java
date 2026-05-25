package com.app.dao;

import com.app.model.Employee;

import java.util.List;

public interface EmployeeDao
{
        void addEmployee(Employee employee);
        List<Employee> getAllEmployees();
        Employee getEmployeeById(int id);
        void updateEmployee(Employee employee);
        void deleteEmployee(int id);
}
