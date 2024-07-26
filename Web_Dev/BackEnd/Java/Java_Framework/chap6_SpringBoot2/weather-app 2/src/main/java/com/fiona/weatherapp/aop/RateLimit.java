package com.fiona.weatherapp.aop;

import org.aspectj.lang.ProceedingJoinPoint;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * @author xueshuo
 * @create 2023-02-13 1:12 pm
 */

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface RateLimit {


}
