package com.example.weatherapp.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author xueshuo
 * @create 2023-01-05 10:56 am
 */
@RestController     // 表示controller class下的方法都以JSON格式输出
public class HelloWorldController {
    @RequestMapping("/hello")
    public String helloWorld(String name){
        return "Hello World" + name;
    }
}
