package com.fiona.weatherapp.aop;

import lombok.RequiredArgsConstructor;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

/**
 * @author xueshuo
 * @create 2023-02-13 1:09 pm
 */

@Aspect
@Component
//@RequiredArgsConstructor
public class RateLimitAspect {

    @Around("@annotation(RateLimit)")
    public Object exceedingLimit (ProceedingJoinPoint jointPoint) throws Throwable{
        // TODO: implement logics codes

        return jointPoint.proceed();
    }
}
