package com.example.weatherapp.service;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * @author xueshuo
 * @create 2023-01-06 9:21 am
 */
@Component
@ConfigurationProperties(prefix = "com.fiona.demo")
@Data
public class DemoProperties {
    private String className;
    private String description;
}

// 方法二:
//@Component
//@Data
//public class DemoProperties {
//    @Value("${com.fiona.demo.className}")
//    private String className;
//
//    @Value("${com.fiona.demo.description}")
//    private String description;
//}


