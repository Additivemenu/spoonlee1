package com.example.weatherapp.controller;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * @author xueshuo
 * @create 2023-01-05 3:13 pm
 */
@SpringBootTest         // 如果要用MockMvc必须得写这个Annotation
class HelloWorldControllerTest {

    private MockMvc mockMvc;

    @BeforeEach         // set up before each test runs
    void setUp(){
        mockMvc = MockMvcBuilders.standaloneSetup(new HelloWorldController()).build();
    }

    @Test
    void helloWorld() throws Exception {
        //这些方法都来自于MockMvc including print(), status()...
        mockMvc.perform(MockMvcRequestBuilders.get("/hello?name=shawn"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string("Hello Worldshawn"));       // check if result is expected
    }
}