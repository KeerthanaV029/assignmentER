package com.app.model;

import jakarta.persistence.*;

@Entity
public class Employee
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false)
    private String name;

    private String department;
    @Column(nullable = false, unique = true)
    private String email;

    private double salary;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")a
    private User user;

    public Employee() {
    }

    public Employee(String name, String department, String email, double salary)
    {
        this.name = name;
        this.department = department;
        this.email = email;
        this.salary = salary;
    }

    public Employee(int id, String name, String department, String email, double salary, User user) {
        this.id = id;
        this.name = name;
        this.department = department;
        this.email = email;
        this.salary = salary;
        this.user = user;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", department='" + department + '\'' +
                ", email='" + email + '\'' +
                ", salary=" + salary +
                ", user=" + user.getUsername() +
                '}';
    }
}
