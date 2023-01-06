package com.example.weatherapp.service;

import jakarta.annotation.Resource;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

/**
 * @author xueshuo
 * @create 2023-01-06 9:26 am
 */

@SpringBootTest
class DemoPropertiesTest {
    @Resource
    private DemoProperties demoProperties;          // 用到时自动被实例化
    @Test
    void getClassName() {
        assertEquals("JavaSpringBoot", demoProperties.getClassName());
    }

    @Test
    void getDescription() {
        assertEquals("description", demoProperties.getDescription());
    }
}