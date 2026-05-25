package com.app.dao;

import com.app.model.Employee;

import java.util.List;

public interface EmployeeDao
{
    void insert(Employee employee);
    List<Employee> getAll();
    Employee getById(int id);
    void deleteById(int id);
    void update(Employee employee, int id);
}
