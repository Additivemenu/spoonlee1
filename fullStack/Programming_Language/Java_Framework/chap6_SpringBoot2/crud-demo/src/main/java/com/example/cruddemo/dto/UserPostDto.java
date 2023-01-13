package com.example.cruddemo.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * @author xueshuo
 * @create 2023-01-13 8:56 pm
 */
@Getter
@Setter
@ToString
public class UserPostDto {
    private String name;
    private String email;
    private String password;

}
