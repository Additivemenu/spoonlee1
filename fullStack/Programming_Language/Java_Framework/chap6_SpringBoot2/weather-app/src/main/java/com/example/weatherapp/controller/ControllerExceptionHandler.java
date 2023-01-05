package com.example.weatherapp.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingRequestValueException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.util.stream.Collectors;


/**
 * @author xueshuo
 * @create 2023-01-05 4:54 pm
 */
@Slf4j
@RestControllerAdvice
public class ControllerExceptionHandler {

    /**
     * 用来处理MissingRequestValueException, HttpMessageNotReadableException
     * @param exception
     * @return
     */
    @ExceptionHandler({MissingRequestValueException.class, HttpMessageNotReadableException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleBadRequestInput(Exception exception) {
        return new ErrorResponse(HttpStatus.BAD_REQUEST.value(), exception.getMessage());
    }

    /**
     * 用来处理MethodArgumentNotValidException
     * @param exception
     * @return
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)         // 400
    public ErrorResponse handleBadRequest(MethodArgumentNotValidException exception) {
        //log.error(exception.getMessage(), exception);
        return new ErrorResponse(HttpStatus.BAD_REQUEST.value(),
                exception.getFieldErrors().stream()
                                          .map(e -> e.getDefaultMessage())
                                          .collect(Collectors.joining(";")));
    }

    /**
     * 用来处理general exception
     * @param exception
     * @return
     */
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)  // 500
    public ErrorResponse handleException(Exception exception) {

        log.error(exception.getMessage(), exception);
        return new ErrorResponse(500, exception.getMessage());
    }
}










//@Slf4j
//@RestControllerAdvice
//public class ControllerExceptionHandler {
//
//    /**
//     * 用来处理MethodArgumentNotValidException
//     * @param exception
//     * @return
//     */
//    @ExceptionHandler(MethodArgumentNotValidException.class)
//    @ResponseStatus(HttpStatus.BAD_REQUEST)         // 400
//    public ErrorResponse handleBadRequest(MethodArgumentNotValidException exception, WebRequest request){
//
//        return new ErrorResponse(HttpStatus.BAD_REQUEST.value(),
//                exception.getFieldError().stream().map(e -> e.getDefaultMessage()).collect(Collectors.joining("")));
//    }
//
//    /**
//     * 用来处理general exception
//     * @param exception
//     * @return
//     */
//    @ExceptionHandler(Exception.class)
//    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
//    public ErrorResponse handleException(Exception exception){
//        log.error(exception.getMessage(), exception);       // 遇到exception, 不能只log exception的第一个参数, 要把step tree log下来.
//
//        return new ErrorResponse(500, exception.getMessage());
//    }
//
//
//
//}
