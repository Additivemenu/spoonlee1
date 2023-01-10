package com.example.weatherapp.service;

import com.example.weatherapp.entity.User;
import org.springframework.stereotype.Service;

/**
 * @author xueshuo
 * @create 2023-01-10 3:57 pm
 */
@Service
public class UserService {
    public User getUser(String email){
        return new User(111, email, "password", 10);
    }



}
