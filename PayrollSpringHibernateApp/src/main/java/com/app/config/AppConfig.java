package com.app.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;
import java.util.Properties;

@Configuration
@ComponentScan(basePackages="com.app")
@EnableTransactionManagement
public class AppConfig
{
    @Bean
    public DataSource getDBConnection()
    {
        DriverManagerDataSource dataSource= new DriverManagerDataSource();
        dataSource.setUrl("jdbc:mysql://localhost:3306/payrollspringhibdb");
        dataSource.setUsername("root");
        dataSource.setPassword("februvary");
        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        return dataSource;
    }
    @Bean
    public LocalContainerEntityManagerFactoryBean getEntityManagerFactory(DataSource dataSource)
    {
        LocalContainerEntityManagerFactoryBean emfb= new LocalContainerEntityManagerFactoryBean();
        emfb.setDataSource(dataSource);
        emfb.setPackagesToScan("com.app.model");
        emfb.setJpaVendorAdapter(new HibernateJpaVendorAdapter());
        Properties properties= new Properties();
        properties.setProperty("hibernate.dialect", "org.hibernate.dialect.MySQLDialect");
        properties.setProperty("hibernate.hbm2ddl.auto", "update");
        emfb.setJpaProperties(properties);
        return emfb;
    }
    @Bean
    public JpaTransactionManager jpaTransactionManager(LocalContainerEntityManagerFactoryBean emfb)
    {
        JpaTransactionManager transactionManager= new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(emfb.getObject());
        return transactionManager;
    }
}
