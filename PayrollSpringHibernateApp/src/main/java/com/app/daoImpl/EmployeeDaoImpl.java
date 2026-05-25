package com.app.daoImpl;

import com.app.Exceptions.ResourceNotFoundException;
import com.app.dao.EmployeeDao;
import com.app.model.Employee;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public class EmployeeDaoImpl  implements EmployeeDao
{

        @PersistenceContext
        private EntityManager entityManager;

        @Override
        public void addEmployee(Employee employee)
        {
            entityManager.persist(employee);
        }

        @Override
        public List<Employee> getAllEmployees()
        {

            TypedQuery<Employee> query = entityManager.createQuery("select e from Employee e", Employee.class);
            return query.getResultList();
        }

        @Override
        public Employee getEmployeeById(int id)
        {
            Employee employee = entityManager.find(Employee.class, id);
            if( employee == null)
                throw new ResourceNotFoundException("Invalid id given..");
            return employee;
        }

        @Override
        public void updateEmployee(Employee employee)
        {
            entityManager.merge(employee);
        }

        @Override
        public void deleteEmployee(int id)
        {
            Employee employee = entityManager.find(Employee.class, id);
            if(employee == null)
                throw new ResourceNotFoundException("Invalid id given..");
            entityManager.remove(employee);
        }
}
