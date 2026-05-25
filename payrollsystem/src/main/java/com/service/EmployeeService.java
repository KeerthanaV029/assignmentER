package com.service;

import com.exception.ResourceNotFoundException;
import com.model.Employee;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.util.List;

public class EmployeeService {
    private final Session session;
    public EmployeeService(Session session)
    {
        this.session=session;
    }

    public void addEmployee(Employee employee)
    {
        Transaction tx = session.beginTransaction();
        session.persist(employee);
        tx.commit();
    }
    public List<Employee> getAllEmployees()
    {
        List<Employee> list= session
                .createQuery("from Employee", Employee.class)
                .list();
        return list;
    }
    public Employee getEmployeeById(int id)
    {
        Employee employee = session.get(Employee.class, id);
        if(employee == null)
            throw new ResourceNotFoundException("Employee ID Invalid");
        return employee;
    }
    public void deleteEmployee(int id)
    {
        Employee employee = session.get(Employee.class, id);
        if(employee == null)
            throw new ResourceNotFoundException("Employee ID Invalid");

        Transaction tx = session.beginTransaction();
        session.delete(employee);
        tx.commit();
    }

    // UPDATE
    public void updateEmployee(int id, double newSalary)
    {
        Employee employee = session.get(Employee.class, id);
        if(employee == null)
            throw new ResourceNotFoundException("Employee ID Invalid");

        Transaction tx = session.beginTransaction();
        employee.setBaseSalary(newSalary);
        session.update(employee);
        tx.commit();
    }
    public Employee getEmployeeByUsername(String username)
    {
        String query = "from Employee e where e.user.username = :username";
        return session.createQuery(query, Employee.class)
                .setParameter("username", username)
                .uniqueResult();
    }
}
