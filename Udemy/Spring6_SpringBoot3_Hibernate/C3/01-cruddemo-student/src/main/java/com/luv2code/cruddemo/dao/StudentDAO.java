package com.luv2code.cruddemo.dao;

import com.luv2code.cruddemo.entity.Student;

import java.util.List;

/**
 * @author xueshuo
 * @create 2023-08-09 10:40 am
 */
public interface StudentDAO {
    void save(Student theStudent);

    Student findById(Integer id);
    List<Student> findAll();
    List<Student> findByLastName(String theLastName);

    void update(Student theStudent);
    int updateAllStudentLastName(String newName);

    void delete(Integer id);
    int deleteAll();

}
