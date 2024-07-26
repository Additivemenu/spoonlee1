package com.horstmann.corejava;

// program list 4.7 on page139

// the classes in this file are part of this package
import java.time.*;

// import statements come after the package statement

public class Employee {

    // step1: field-----------------------------------------------------------------------
    private String name;
    private double salary;
    private LocalDate hireDay;

    // step2: constructor------------------------------------------------------------------
    public Employee(String name, double salary, int year, int month, int day){
        this.name = name;
        this.salary = salary;
        hireDay = LocalDate.of(year, month, day);
    }

    // step3: methods-----------------------------------------------------------------------
    public String getName(){
        return name;
    }

    public double getSalary(){
        return salary;
    }

    public LocalDate getHireDay(){
        return hireDay;
    }

    public void raiseSalary(double byPercent){
        double raise = salary * byPercent /100;
        salary += raise;
    }
}
