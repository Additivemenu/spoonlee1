package com.example.weatherapp.entity;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;

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

    @Max(value = 200, message = "age cannot be bigger than 200")
    @Min(value = 0, message = "age canno be smaller than 0")
    @NonNull
    private Integer age;            // by default: null
}
