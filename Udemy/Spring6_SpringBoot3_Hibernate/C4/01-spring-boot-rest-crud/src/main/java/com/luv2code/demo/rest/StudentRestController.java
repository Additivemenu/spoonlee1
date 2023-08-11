package com.luv2code.demo.rest;

import com.luv2code.demo.entity.Student;
import jakarta.annotation.PostConstruct;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * @author xueshuo
 * @create 2023-08-11 8:56 pm
 */
@RestController
@RequestMapping("/api")
public class StudentRestController {

    // define a field; Load the field with data; do it only once
    private List<Student> theStudents;

    // define @PostConstruct to load the student data ... only once!
    @PostConstruct
    public void loadData(){
        theStudents = new ArrayList<>();
        theStudents.add(new Student("Poornima", "Patel"));
        theStudents.add(new Student("Mario", "Rossi"));
        theStudents.add(new Student("Mary", "Smith"));
    }

    // define endpoint for "/students" - return a list of students
    @GetMapping("/students")
    public List<Student> getStudent(){
        return theStudents;
    }

    // define endpoint for "students/{studentId}" - return student at index
    @GetMapping("students/{studentId}")
    public Student getStudent(@PathVariable int studentId){     // by default variable name should match

        // check the studentId again list size
        if ((studentId >= theStudents.size() || (studentId < 0))){
            throw new StudentNotFoundException("Student id not found -" + studentId);       // throws exception, but also need handler
        }

        return theStudents.get(studentId);
    }

    // Add an exception handler using @ExceptionHandler
    // Spring will automatically put the exception thrown that matching with the argument of this method
    @ExceptionHandler
    public ResponseEntity<StudentErrorResponse> handleException(StudentNotFoundException exc){

        // create a studentErrorResponse
        StudentErrorResponse error = new StudentErrorResponse();
        error.setStatus(HttpStatus.NOT_FOUND.value());
        error.setMessage(exc.getMessage());
        error.setTimeStamp(System.currentTimeMillis());

        // return a ResponseEntity
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);       // jackson will automatically convert this to JSON
    }

    // add another exception handler ... to catch any exception (catch all)
    @ExceptionHandler
    public ResponseEntity<StudentErrorResponse> handleException(Exception exc){

        // create a studentErrorResponse
        StudentErrorResponse error = new StudentErrorResponse();
        error.setStatus(HttpStatus.BAD_REQUEST.value());
        error.setMessage(exc.getMessage());
        error.setTimeStamp(System.currentTimeMillis());

        // return a ResponseEntity
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }


}
