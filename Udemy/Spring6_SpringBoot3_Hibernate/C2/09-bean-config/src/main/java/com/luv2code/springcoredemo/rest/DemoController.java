package com.luv2code.springcoredemo.rest;

import com.luv2code.springcoredemo.common.Coach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author xueshuo
 * @create 2023-04-24 8:17 am
 */
@RestController
public class DemoController {
    // define a private field for dependency
    private Coach myCoach;

    @Autowired
    public DemoController(@Qualifier("aquatic") Coach myCoach) {      // TrackCoach is marked with @Primary
        System.out.println("In constructor: " + getClass().getSimpleName());
        this.myCoach = myCoach;
    }

    @GetMapping("/dailyworkout")
    public String getDailyWorkout(){
        return myCoach.getDailyWorkOut();
    }

}
