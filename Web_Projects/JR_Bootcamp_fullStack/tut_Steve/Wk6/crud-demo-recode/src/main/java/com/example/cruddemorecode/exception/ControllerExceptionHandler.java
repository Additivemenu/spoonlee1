package com.example.cruddemorecode.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * @author xueshuo
 * @create 2023-01-26 11:26 am
 */
@RestControllerAdvice   // 监视Controller, 如果controller里的方法报了异常的化, 做如下处理
@Slf4j      // enable log
public class ControllerExceptionHandler {


    @ExceptionHandler(value = {ResourceNotFoundException.class})        // 如果controller里报了ResourceNotFoundException, handle it (back-end terminal will not show Exception message)
    @ResponseStatus(HttpStatus.NOT_FOUND)           // 让前台返回信息中HttpStatus为404
    public String handleResourceNotFoundException(ResourceNotFoundException e){
        // log.info(e.getMessage(), e);

        return e.getMessage();            // 返回该值直接到前台
    }
}
