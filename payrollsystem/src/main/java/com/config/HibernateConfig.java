package com.config;


import com.model.Department;
import com.model.Employee;
import com.model.Role;
import com.model.User;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;


    public class HibernateConfig
    {
        private static SessionFactory sessionFactory;

        public static SessionFactory getSessionFactory()
        {
            if(sessionFactory == null){
                Configuration configuration = new Configuration();
                configuration.setProperty("hibernate.connection.url", "jdbc:mysql://localhost:3306/pms?createDatabaseIfNotExist=true");
                configuration.setProperty("hibernate.connection.username", "root");
                configuration.setProperty("hibernate.connection.password", "februvary");
                configuration.setProperty("hibernate.connection.driver_class", "com.mysql.cj.jdbc.Driver");

                configuration.setProperty("hibernate.dialect","org.hibernate.dialect.MySQLDialect");
                configuration.setProperty("hibernate.hbm2ddl.auto", "update");

                configuration.addAnnotatedClass(Department.class);
                configuration.addAnnotatedClass(Employee.class);
                configuration.addAnnotatedClass(Role.class);
                configuration.addAnnotatedClass(User.class);


                return  configuration.buildSessionFactory();
            }
            return sessionFactory;
        }

        public static void closeFactory(){
            sessionFactory.close();
        }
    }

