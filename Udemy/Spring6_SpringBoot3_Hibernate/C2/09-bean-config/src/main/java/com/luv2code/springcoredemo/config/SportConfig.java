package com.luv2code.springcoredemo.config;

import com.luv2code.springcoredemo.common.Coach;
import com.luv2code.springcoredemo.common.SwimCoach;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author xueshuo
 * @create 2023-08-06 9:36 pm
 */
@Configuration
public class SportConfig {
    @Bean("aquatic")             // specify bean id
    public Coach swimCoach(){    // the bean id defaults to the method name!
        return new SwimCoach();
    }

}
