package com.app;

import com.app.Exception.ResourceNotFoundException;
import com.app.config.AppConfig;
import com.app.dao.EmployeeDao;
import com.app.dao_impl.EmployeeDaoImpl;
import com.app.model.Employee;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.dao.EmptyResultDataAccessException;

import java.util.Scanner;

public class App
{
    public static void main( String[] args)
    {
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
        Scanner sc= new Scanner(System.in);
        EmployeeDao employeeDao= context.getBean(EmployeeDaoImpl.class);
        while(true)
        {
            System.out.println("________________________");
            System.out.println("1.Add EMPLOYEE");
            System.out.println("2.View all EMPLOYEE ");
            System.out.println("3.View all EMPLOYEE by id");
            System.out.println("4.Delete EMPLOYEE by id");
            System.out.println("5.Update existing EMPLOYEE");
            System.out.println("0.Exit");
            System.out.println("________________________");
            int ch=sc.nextInt();
            if(ch==0)
            {
                System.out.println("______EXITED______");
                break;
            }
            switch(ch)
            {
                case 1:
                    Employee employee= new Employee();
                    System.out.println("Add EMPLOYEE: ");
                    System.out.println("Enter name:");
                    sc.nextLine();
                    employee.setName(sc.nextLine());
                    System.out.println("Enter email:");
                    employee.setEmail(sc.nextLine());
                    System.out.println("Enter department:");
                    employee.setDepartment(sc.nextLine());
                    System.out.println("Enter Salary:");
                    employee.setSalary(sc.nextDouble());
                    employeeDao.insert(employee);
                    break;
                case 2:
                    employeeDao.getAll().forEach(System.out::println);
                    break;
                case 3:
                    System.out.println("Enter Employee ID to fetch details: ");
                    int id = sc.nextInt();
                    try
                    {
                        Employee employee1 = employeeDao.getById(id);
                        System.out.println(employee1);
                    }
                    catch(EmptyResultDataAccessException e){
                        System.out.println("Invalid Employee ID");
                    }
                    break;

                case 4:
                    System.out.println("Enter Employee ID to delete");
                    int id1 = sc.nextInt();
                    employeeDao.deleteById(id1);
                    break;
                case 5:
                    System.out.println("Enter Employee id to update:");
                    int id2=sc.nextInt();
                    try
                    {
                        Employee employee2 = employeeDao.getById(id2);
                        System.out.println("Current record of Employee - " + id2 + " is: ");
                        System.out.println(employee2);
                        System.out.println("Update record Employee Salary:");
                        sc.nextLine();
                        employee2.setSalary(sc.nextDouble());
                        employeeDao.update(employee2,id2);
                    }
                    catch (ResourceNotFoundException e)
                    {
                        System.out.println("Invalid id");
                    }
                    break;
            }
        }
        sc.close();
        context.close();
    }
}
