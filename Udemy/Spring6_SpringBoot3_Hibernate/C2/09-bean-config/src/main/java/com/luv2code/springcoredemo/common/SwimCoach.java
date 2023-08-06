package com.luv2code.springcoredemo.common;

import org.springframework.context.annotation.Bean;

/**
 * @author xueshuo
 * @create 2023-08-06 9:30 pm
 */

// not using @Component
public class SwimCoach implements Coach{

    public SwimCoach() {
        System.out.println("In constructor: " + getClass().getSimpleName());
    }

    @Override
    public String getDailyWorkOut() {
        return "SwimCoach: Swim 1000 meters as a warm up";
    }
}
