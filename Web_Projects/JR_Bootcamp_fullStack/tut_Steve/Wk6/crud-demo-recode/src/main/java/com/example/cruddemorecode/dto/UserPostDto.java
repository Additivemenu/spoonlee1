package com.example.cruddemorecode.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * @author xueshuo
 * @create 2023-01-25 11:36 am
 */
@Getter
@Setter
@ToString
@Builder
public class UserPostDto {
    private String name;
    private String email;
    private String password;

}
