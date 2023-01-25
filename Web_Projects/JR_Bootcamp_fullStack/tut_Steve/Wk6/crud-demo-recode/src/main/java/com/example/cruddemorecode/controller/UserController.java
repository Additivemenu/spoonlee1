package com.example.cruddemorecode.controller;

import com.example.cruddemorecode.dto.UserGetDto;
import com.example.cruddemorecode.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.example.cruddemorecode.dto.UserPostDto;

/**
 * @author xueshuo
 * @create 2023-01-25 11:25 am
 */
@RestController
@RequestMapping("users")    // URL中跟着/api/v1的成分
@RequiredArgsConstructor    // for UserService
public class UserController {
    private final UserService userService;  // controller要调用service, 以传递数据 不要在controller调用repository

    // 接收URL作为输入， 然后进行一系列操作
    @PostMapping        // 接URL中/api/v1/users
    public String createUser(@RequestBody UserPostDto userPostDto){
        System.out.println(userPostDto);
        userService.createUser(userPostDto);
        return "User create";
    }

    @GetMapping("/{userId}")     // 接URL中/api/v1/users
    public UserGetDto getUser(@PathVariable Long userId){
        UserGetDto userGetDto = userService.getUser(userId);
        return userGetDto;
    }

}
