package com.luv2code.springcoredemo.common;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

/**
 * @author xueshuo
 * @create 2023-04-24 8:15 am
 */
@Component  // mark the class as a Spring bean, the class will become candidates for dependency injection
@Scope(ConfigurableBeanFactory.SCOPE_SINGLETON)
public class CricketCoach implements Coach{

    public CricketCoach() {
        System.out.println("In constructor: " + getClass().getSimpleName());
    }



    @Override
    public String getDailyWorkOut() {
        return "CricketCoach: Practice fast bowling for 15 min now --" ;
    }
}
