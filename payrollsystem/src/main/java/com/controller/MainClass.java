package com.controller;

import com.config.HibernateConfig;
import com.exception.InvalidUserException;
import com.exception.ResourceNotFoundException;
import com.model.Department;
import com.model.Employee;
import com.model.User;
import com.service.AuthService;
import com.service.EmployeeService;
import jakarta.persistence.NoResultException;
import org.hibernate.Session;

import java.time.LocalDate;
import java.util.List;
import java.util.Scanner;

public class MainClass
{
    public static void main(String[] args)
    {
        Session session= HibernateConfig.getSessionFactory().openSession();
        Scanner sc= new Scanner(System.in);

        AuthService authService= new AuthService(session);
        EmployeeService employeeService = new EmployeeService(session);

        System.out.println("...........PAYROLL SYSTEM LOGIN...........");
        System.out.println("Enter Username:");
        String username=sc.next();
        System.out.println("Enter Password:");
        String pass=sc.next();
        try {
            User user = authService.login(username, pass);
            switch (user.getRole().getRoleType().toString()) {
                case "ADMIN":
                    System.out.println("............ADMIN MENU...........");
                    while (true) {
                        System.out.println("1.Add Employee");
                        System.out.println("2.View all Employee");
                        System.out.println("3.View Employee by ID");
                        System.out.println("4.Delete Employee");
                        System.out.println("5.Update Employee");
                        System.out.println("0.EXIT");
                        System.out.println("Enter Choice:");
                        int cha = sc.nextInt();
                        if (cha == 0)
                            break;
                        switch (cha)
                        {
                            case 1:
                                Employee employee= new Employee();
                                sc.nextLine();
                                System.out.println("Enter First Name:");
                                employee.setFirstName(sc.nextLine());
                                System.out.println("Enter Last Name:");
                                employee.setLastName(sc.nextLine());
                                System.out.println("Enter Phone number:");
                                employee.setPhone(sc.nextLine());
                                System.out.println("Enter Address:");
                                employee.setAddress(sc.nextLine());
                                System.out.println("Enter DOB (yyyy-mm-dd):");
                                employee.setDob(LocalDate.parse(sc.nextLine()));
                                System.out.println("Enter Joining Date (yyyy-mm-dd):");
                                employee.setJoiningDate(LocalDate.parse(sc.nextLine()));
                                System.out.println("Enter Designation:");
                                employee.setDesignation(sc.nextLine());
                                System.out.println("Enter Base Salary:");
                                employee.setBaseSalary(sc.nextDouble());
                                System.out.println("Enter Department ID:");
                                int deptId = sc.nextInt();
                                Department department = session.get(Department.class, deptId);
                                employee.setDepartment(department);
                                System.out.println("Enter User ID:");
                                int userId = sc.nextInt();
                                User empUser = session.get(User.class, userId);
                                employee.setUser(empUser);
                                employeeService.addEmployee(employee);
                                System.out.println("Employee Added Successfully");
                                break;
                            case 2:
                                List<Employee> employees=employeeService.getAllEmployees();
                                for(Employee e:employees)
                                    System.out.println(e);
                                break;
                            case 3:
                                System.out.println("Enter Employee ID:");
                                int empId = sc.nextInt();
                                try
                                {
                                    Employee emp = employeeService.getEmployeeById(empId);
                                    System.out.println(emp);
                                }
                                catch(ResourceNotFoundException e)
                                {
                                    System.out.println(e.getMessage());
                                }
                                break;
                            case 4:
                                System.out.println("Enter Employee ID to Delete:");
                                int deleteId=sc.nextInt();
                                try
                                {
                                    employeeService.deleteEmployee(deleteId);
                                    System.out.println("Employee Deleted!");
                                }
                                catch(ResourceNotFoundException e)
                                {
                                    System.out.println(e.getMessage());
                                }
                                break;
                            case 5:
                                System.out.println("Enter Employee ID:");
                                int updateId=sc.nextInt();
                                System.out.println("Enter New Salary:");
                                double salary=sc.nextDouble();
                                try
                                {
                                    employeeService.updateEmployee(updateId, salary);
                                    System.out.println("Employee Updated Successfully");
                                }
                                catch(ResourceNotFoundException e)
                                {
                                    System.out.println(e.getMessage());
                                }
                                break;
                            default:
                                System.out.println("Invalid Choice");
                        }
                    }
                    break;
                case "HR":
                    System.out.println("............HR MENU...........");
                    while(true)
                    {
                        System.out.println("1.View all Employees");
                        System.out.println("2.View Employee by ID");
                        System.out.println("0.EXIT");
                        int chr=sc.nextInt();
                        if (chr==0)
                            break;
                        switch(chr)
                        {
                            case 1:
                                List<Employee> employees=employeeService.getAllEmployees();
                                for(Employee e:employees)
                                {
                                    System.out.println(e);
                                }
                                break;
                            case 2:
                                System.out.println("Enter Employee ID:");
                                int empId=sc.nextInt();
                                try
                                {
                                    Employee employee=employeeService.getEmployeeById(empId);
                                    System.out.println(employee);
                                }
                                catch(ResourceNotFoundException e)
                                {
                                    System.out.println(e.getMessage());
                                }
                                break;
                            default:
                                System.out.println("Invalid Choice");
                        }
                    }
                    break;
                case "EMPLOYEE":
                    System.out.println("............EMPLOYEE MENU...........");
                    while (true)
                    {
                        System.out.println("1.View my Profile");
                        System.out.println("0.EXIT");
                        int che=sc.nextInt();
                        if(che==0)
                            break;
                        switch(che)
                        {
                            case 1:
                                Employee employee=employeeService.getEmployeeByUsername(username);
                                System.out.println(employee);
                                break;
                            default:
                                System.out.println("Invalid Choice");
                        }
                    }
                    break;
            }
            }
            catch(NoResultException e)
            {
                System.out.println("Invalid credentials!");
            }
        sc.close();
        session.close();
    }
}
