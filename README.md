# Payroll Management System

A full-stack Payroll Management System for managing employee, attendance, leave, and payroll operations. This repository contains multiple implementations developed while building the project—from core Java through Spring Boot, Hibernate/JPA, Spring Security, and a React frontend.

## 📌 Project Overview

The system manages employee, attendance, leave, and payroll information end-to-end, with secure authentication and role-based access for HR, Manager, and Employee users.

The repository is organized into several modules representing different stages and implementations of the project as it evolved.

## ✨ Features

- Employee, attendance, leave, and payroll management
- Secure authentication and role-based access using Spring Security and JWT
- RESTful APIs backed by a normalized MySQL database using Hibernate/JPA
- Responsive dashboards for HR, Manager, and Employee users
- React frontend integrated with the Spring Boot backend
- Payroll generation based on attendance and salary policies

## 🛠️ Technologies Used

- Java
- Spring Boot
- Spring Security
- Hibernate / JPA
- React
- MySQL
- JWT
- Maven

## 📂 Project Structure

```text
PayrollManagementSystem/
│
├── PayrollSpringApp/
│   └── Spring-based implementation
│
├── PayrollSpringHibernateApp/
│   └── Spring and Hibernate/JPA implementation
│
├── payroll/
│   └── Payroll-related application files
│
├── payrollsystem/
│   └── Payroll system implementation
│
└── ERdiag.V.1-PAYROLL_MANAGEMENT_SYSTEM.png
    └── Entity Relationship Diagram
```
Database Design

The repository includes an Entity Relationship Diagram (ER Diagram) representing the database structure of the Payroll Management System.

The ER diagram can be found in the repository as ERdiag.V.1-PAYROLL_MANAGEMENT_SYSTEM.png.

⚙️ Getting Started
Prerequisites

Make sure you have the following installed:

Java JDK
Node.js and npm (for the React frontend)
Maven
MySQL
An IDE such as IntelliJ IDEA, Eclipse, or Spring Tool Suite
Installation
Clone the repository:
git clone https://github.com/KeerthanaV029/PayrollManagementSystem.git
Navigate to the project directory:
cd PayrollManagementSystem
Open the backend module you want to run in your preferred IDE.
Configure your MySQL database connection details.
Create the required database and tables.
Update the database configuration in the application.
Build and run the Spring Boot backend.
For the React frontend, navigate to the frontend directory and install the dependencies:
npm install
Start the React application:
npm start
🎯 Learning Outcomes

Working on this project provided hands-on experience with:

Java and Spring Boot application development
Spring Security and JWT-based authentication
Hibernate and JPA
Building RESTful APIs
React frontend development and API integration
Database integration and relational database design
Entity Relationship Diagrams
Role-based access control

👩‍💻 Author: Keerthana Venkatesan
GitHub: KeerthanaV029
