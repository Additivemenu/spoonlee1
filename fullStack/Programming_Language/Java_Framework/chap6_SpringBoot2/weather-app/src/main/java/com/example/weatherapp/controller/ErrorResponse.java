package com.example.weatherapp.controller;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author xueshuo
 * @create 2023-01-05 4:55 pm
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorResponse {
    private int code;           // 取值http status的取值
    private String message;
    //private String details;
}
