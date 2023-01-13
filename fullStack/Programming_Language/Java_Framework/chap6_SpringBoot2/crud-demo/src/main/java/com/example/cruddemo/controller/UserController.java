package com.example.cruddemo.controller;

import com.example.cruddemo.dto.UserPostDto;
import com.example.cruddemo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author xueshuo
 * @create 2023-01-13 8:50 pm
 */
@RestController
@RequestMapping("users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping
    public String createUser(@RequestBody UserPostDto userPostDto){
        System.out.println(userPostDto);
        userService.createUser(userPostDto);  // pass userPostDto to serService
        return "User created";
    }

}
