package com.payroll.controller;

import com.payroll.exception.ResourceNotFoundException;
import com.payroll.model.Employee;
import com.payroll.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*
 * In controller if you are creating REST APIs
 * then add
 * @RestController annotation which is a combo of
 * @Controller & @ResponseBody
 * But if you are using this controller to load java UI(jsp or Thymeleaf)
 * then use only @Controller
 * */
@RestController
@AllArgsConstructor
public class EmployeeController
{
        private final EmployeeService employeeService;
        //retrieve all data
        @GetMapping("/api/employee/getall")
        public List<Employee> getAll()
        {
            return employeeService.getAll();
        }
        //insert into db
        @PostMapping("/api/employee/insert")
        public void addEmployee(@RequestBody Employee employee)
        {
                employeeService.addEmployee(employee);
        }
        //get by id
        @GetMapping("/api/employee/getById/{id}")
        public ResponseEntity<Object> getById(@PathVariable int id)
        {
                try {
                        Employee employee= employeeService.getById(id);
                        return ResponseEntity
                                .ok(employee);
                }catch(ResourceNotFoundException e)
                {
                        return ResponseEntity
                                .badRequest()
                                .body(e.getMessage());
                }

        }
        @DeleteMapping("api/employee/delete/{id}")
        public ResponseEntity<Object> deleteById(@PathVariable int id)
        {
                try {
                        employeeService.deleteById(id);
                        return ResponseEntity
                                .ok()
                                .build();
                } catch (ResourceNotFoundException e)
                {
                        return ResponseEntity
                                .badRequest()
                                .body(e.getMessage());
                }
        }

        @PutMapping("api/employee/update/{id}")
        public ResponseEntity<Object> update(@PathVariable int id, @RequestBody Employee newemployee)
        {

                try {


                        employeeService.update(id, newemployee);
                        return ResponseEntity
                                .ok().build();
                }
                catch (ResourceNotFoundException e)
                {
                        return ResponseEntity
                                .badRequest().body(e.getMessage());
                }

        }


}

