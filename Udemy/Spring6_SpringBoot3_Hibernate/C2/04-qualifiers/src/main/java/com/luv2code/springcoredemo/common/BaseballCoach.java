package com.luv2code.springcoredemo.common;

import org.springframework.stereotype.Component;

/**
 * @author xueshuo
 * @create 2023-08-02 10:56 pm
 */
@Component
public class BaseballCoach implements Coach{
    @Override
    public String getDailyWorkOut() {
        return "BaseballCoach: spring 30 min in batting practice";
    }
}
