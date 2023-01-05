package com.example.weatherapp.entity;

import jakarta.validation.constraints.NotBlank;
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
    @NotBlank(message = "email cannot be blank")
    private String email;
    @NotBlank(message = "password cannot be blank")
    private String password;
}
