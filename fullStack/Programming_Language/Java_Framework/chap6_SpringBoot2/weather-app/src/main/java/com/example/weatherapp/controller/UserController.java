package com.example.weatherapp.controller;

import com.example.weatherapp.entity.User;
import com.example.weatherapp.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * @author xueshuo
 * @create 2023-01-05 11:10 am
 */
@RestController
@RequiredArgsConstructor
public class UserController {
//    private List<User> users = new ArrayList<>();

    // if 'final', you have to instantiate userService using constructor first or @RequiredArgsConstructor (作用和new 一样)
    public final UserService userService;


    /**
     * GET by Path Variable
     * @param id
     * @return
     */
    @GetMapping("/user/{id}")           // extension of RequestMapping using request method: Get
    public User getUser(@PathVariable int id){      // @PathVariable 声明id是一个Path variable, 从url中找到它作为函数的输入
        return new User(id, "user@test.com", "password", -1);
    }

    /**
     * GET by Request Parameter, with Cache Control
     * @param email
     * @return
     */
    @GetMapping("/user")
    public User getUserByParameter(@NotBlank @RequestParam String email, final HttpServletResponse response){

        String value = CacheControl.maxAge(10, TimeUnit.SECONDS).getHeaderValue();
        response.addHeader(HttpHeaders.CACHE_CONTROL, value);
//        response.addHeader("Cache_Control", value);   // don't use magic String! avoid typo

        return new User(111, email, "password", 23);
    }


    /**
     * POST by request body
     * @param user
     * @return
     */
    @PostMapping("/users")
    @ResponseStatus(HttpStatus.CREATED)     // 指定http status为201
    public User createUser(@Valid @RequestBody User user){
        return new User(user.getId()+100, user.getEmail(), user.getPassword() , user.getAge());
    }
}
