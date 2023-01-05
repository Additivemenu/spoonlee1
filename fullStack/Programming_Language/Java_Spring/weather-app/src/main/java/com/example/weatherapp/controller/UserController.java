package com.example.weatherapp.controller;

import com.example.weatherapp.entity.User;
import org.springframework.web.bind.annotation.*;

/**
 * @author xueshuo
 * @create 2023-01-05 11:10 am
 */
@RestController
public class UserController {
    @GetMapping("/user/{id}")           // extension of RequestMapping using request method: Get
    public User getUser(@PathVariable int id){      // @PathVariable 声明id是一个Path variable, 从url中找到它作为函数的输入
        return new User(id, "user@test.com", "password");
    }

    @PostMapping("/users")
    public User createUser(@RequestBody User user){
        return new User(user.getId()+100, user.getEmail(),user.getPassword() );
    }
}
