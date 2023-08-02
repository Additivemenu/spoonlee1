package com.luv2code.springcoredemo.common;

import org.springframework.stereotype.Component;

/**
 * @author xueshuo
 * @create 2023-08-02 10:59 pm
 */
@Component
public class TrackCoach implements  Coach{
    @Override
    public String getDailyWorkOut() {
        return "TrackCoach: run a hard 5k!";
    }
}
