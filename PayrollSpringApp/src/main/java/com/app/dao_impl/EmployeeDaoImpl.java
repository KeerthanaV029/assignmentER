package com.app.dao_impl;

import com.app.Exception.ResourceNotFoundException;
import com.app.dao.EmployeeDao;
import com.app.model.Employee;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class EmployeeDaoImpl implements EmployeeDao
{

    private final JdbcTemplate jdbcTemplate;

    public EmployeeDaoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void insert(Employee employee)
    {
        String sql= "Insert into employee (name,email,department,salary) values (?,?,?,?)";
        jdbcTemplate.update(sql,employee.getName(),employee.getEmail(),employee.getDepartment(),employee.getSalary());
        System.out.println("..........Employee Added!..........");
    }

    @Override
    public List<Employee> getAll()
    {
        String sql="Select * from employee";
        return jdbcTemplate.query(sql,mapper());
    }

    @Override
    public Employee getById(int id)
    {
        String sql=" Select * from employee where id=?";
        return jdbcTemplate.queryForObject(sql,mapper(),id);
    }

    @Override
    public void deleteById(int id)
    {
        String sql= "Delete from employee where id= ?";
        int num_rows = jdbcTemplate.update(sql,id);
        if(num_rows==0)
            throw new ResourceNotFoundException("Invalid employee ID");

        System.out.println("..........Employee-"+id+" deleted..........");

    }
    @Override
    public void update(Employee employee, int id)
    {
        String sql= "Update employee set salary=? where id=?";
        jdbcTemplate.update(sql,employee.getSalary(),id );
        System.out.println("Record Updated");
    }
    private RowMapper<Employee> mapper()
    {
        return (rs, rnum) -> {
            return new Employee(
                    rs.getInt("id"), rs.getString("name"),
                    rs.getString("email"),
                    rs.getString("department"),
                    rs.getDouble("salary"));
        };
    }
}
