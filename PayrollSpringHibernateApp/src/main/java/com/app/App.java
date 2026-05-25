package com.app;

import com.app.Exceptions.ResourceNotFoundException;
import com.app.config.AppConfig;
import com.app.dao.AuthDao;
import com.app.dao.EmployeeDao;
import com.app.daoImpl.AuthDaoImpl;
import com.app.daoImpl.EmployeeDaoImpl;
import com.app.enums.Role;
import com.app.model.Employee;
import com.app.model.User;
import jakarta.persistence.NoResultException;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.util.List;
import java.util.Scanner;

public class App {

    public static void main(String[] args) {

        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
        Scanner sc = new Scanner(System.in);
        EmployeeDao employeeDao=context.getBean(EmployeeDao.class);
        AuthDao authDao = context.getBean(AuthDaoImpl.class);
        System.out.println("__________PAYROLL SYSTEM LOGIN_________");
        System.out.println("Enter Username: ");
        String username = sc.next();
        System.out.println("Enter Password:");
        String pass = sc.next();
        try {
            User user = authDao.login(username, pass);
            switch (user.getRole().toString()) {
                case "ADMIN":
                    System.out.println("______________WELCOME " + username + " ______________");
                    while (true) {
                        System.out.println("1.Add Employee");
                        System.out.println("2.View all Employees");
                        System.out.println("3.Update Employee");
                        System.out.println("4.Delete Employee");
                        System.out.println("5.Search Employee by id");
                        System.out.println("0.Exit");
                        int ch = sc.nextInt();
                        sc.nextLine();
                        switch (ch) {
                            case 1:
                                System.out.println("Enter Employee Name: ");
                                String name = sc.next();
                                System.out.println("Enter Employee Department: ");
                                String department = sc.next();
                                System.out.println("Enter Employee Email:");
                                String email = sc.next();
                                System.out.println("Enter Employee Salary:");
                                double salary = sc.nextDouble();
                                System.out.println("Create Employee Username:");
                                String u = sc.next();
                                System.out.println("Set password:");
                                String p = sc.next();
                                User newuser = new User();
                                newuser.setUsername(u);
                                newuser.setPassword(p);
                                newuser.setRole(Role.EMPLOYEE);
                                Employee emp = new Employee(name, department, email, salary);
                                emp.setName(name);
                                emp.setDepartment(department);
                                emp.setEmail(email);
                                emp.setSalary(salary);
                                emp.setUser(newuser);
                                employeeDao.addEmployee(emp);
                                System.out.println("Employee Added Successfully");
                                break;
                            case 2:
                                List<Employee> employees = employeeDao.getAllEmployees();
                                for (Employee e : employees)
                                    System.out.println(e);
                                break;
                            case 3:
                                try {
                                    System.out.println("Enter Employee ID:");
                                    int id = sc.nextInt();
                                    Employee employee = employeeDao.getEmployeeById(id);
                                    System.out.println("Existing Employee Record");
                                    System.out.println(employee);
                                    System.out.println("Enter values for update..");
                                    System.out.println("Enter New Department:");
                                    String department1 = sc.next();
                                    System.out.println("Enter New Salary:");
                                    double salary1 = sc.nextDouble();
                                    System.out.println("Enter New Email:");
                                    String email1 = sc.next();
                                    employee.setDepartment(department1);
                                    employee.setSalary(salary1);
                                    employee.setEmail(email1);
                                    employeeDao.updateEmployee(employee);
                                    System.out.println("Employee Updated Successfully");
                                } catch (ResourceNotFoundException e) {
                                    System.out.println(e.getMessage());
                                }
                                break;
                            case 4:
                                System.out.println("Enter Employee ID to delete:");
                                try {
                                    int deleteId = sc.nextInt();
                                    employeeDao.deleteEmployee(deleteId);
                                    System.out.println("Employee Deleted");
                                } catch (ResourceNotFoundException e) {
                                    System.out.println(e.getMessage());
                                }
                                break;
                            case 5:
                                System.out.println("Enter Employee ID to dispplay:");
                                try {
                                    int searchId = sc.nextInt();
                                    Employee foundEmp = employeeDao.getEmployeeById(searchId);
                                    System.out.println(foundEmp);
                                } catch (ResourceNotFoundException e) {
                                    System.out.println(e.getMessage());
                                }
                                break;
                            case 0:
                                System.out.println("Exiting...");
                                System.exit(0);
                            default:
                                System.out.println("INVALID CHOICE");
                                break;
                        }
                    }
            }
        }
        catch(NoResultException e)
        {
            System.out.println("Invalid Credentials");
        }
    }
}