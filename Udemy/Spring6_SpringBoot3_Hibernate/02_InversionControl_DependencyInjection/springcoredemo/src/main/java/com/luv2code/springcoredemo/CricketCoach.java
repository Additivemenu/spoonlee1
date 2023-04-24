package com.luv2code.springcoredemo;

import org.springframework.stereotype.Component;

/**
 * @author xueshuo
 * @create 2023-04-24 8:15 am
 */
@Component  // mark the class as a Spring bean, the class will become candidates for dependency injection
public class CricketCoach implements Coach{
    @Override
    public String getDailyWorkOut() {
        return "Practice fast bowling for 15 min!!!!!";
    }
}
