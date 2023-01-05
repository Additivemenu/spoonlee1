package com.example.weatherapp.controller;

import com.example.weatherapp.entity.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * @author xueshuo
 * @create 2023-01-05 3:36 pm
 */
@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired          // 表示spring会自动初始化以下instance variable
    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
    }


    @Test
    void createUser() throws Exception {
        User testUser = new User(123, "test@test.com", "password");
        ObjectMapper objectMapper = new ObjectMapper();
        System.out.println(objectMapper.writeValueAsString(testUser));  // {"id":123,"email":"test@test.com","password":"password"}


        // 注意转移字符
        String userContent = "{\"id\":111,\"email\":\"a@test.com\",\"password\":\"password\"}";
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/users")
                        .content(userContent)
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isCreated())         // http status is expected to be 201
                .andExpect(jsonPath("$.id").value("211"))
                .andExpect(jsonPath("$.email").value("a@test.com"))
                .andExpect(jsonPath("$.password").value("password"))
                ;
    }
}