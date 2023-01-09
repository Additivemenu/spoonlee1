package com.example.weatherapp.controller;

import com.example.weatherapp.entity.User;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * @author xueshuo
 * @create 2023-01-05 11:10 am
 */
@RestController
public class UserController {
    private List<User> users = new ArrayList<>();

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
     * GET by Request Parameter
     * @param email
     * @return
     */
    @GetMapping("/user")
    public User getUserByParameter(@NotBlank @RequestParam String email){
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
