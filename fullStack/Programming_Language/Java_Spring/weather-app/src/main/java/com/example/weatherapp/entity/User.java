package com.example.weatherapp.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author xueshuo
 * @create 2023-01-05 11:11 am
 */
@Data
@AllArgsConstructor
public class User {
    private int id;
    private String email;
    private String password;
}
