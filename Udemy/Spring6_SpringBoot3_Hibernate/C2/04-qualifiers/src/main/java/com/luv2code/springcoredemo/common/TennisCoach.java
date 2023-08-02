package com.luv2code.springcoredemo.common;

import org.springframework.stereotype.Component;

/**
 * @author xueshuo
 * @create 2023-08-02 10:57 pm
 */
@Component
public class TennisCoach implements Coach{
    @Override
    public String getDailyWorkOut() {
        return "TennisCoach: practice your backhand volley";
    }
}
