JR17-22-9-25 lec



接上节Database SQL的课



# Introduction to JPA



ORM



JPA







# hands-on 12min-

## 准备工作

打开上次的weather-app (fullstack/...../springboot2/weather-app2)

打开对应docker database和pgadmin

Build.gradle放入Spring data jpa依赖

```gradle
implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
runtimeOnly 'org.postgresql:postgresql'
implementation 'org.flywaydb:flyway-core'
```

接着配置好resource > application.yml

```yml
spring:
  datasource:  		# 注意database的数据要和docker.compose.yml中的匹配
    driver-class-name: org.postgresql.Driver
    url: jdbc:postgresql://localhost:15432/postgres?currentSchema=weather			
    username: postgres
    password: admin
  flyway:
    enabled: true
    schemas: weather
  jpa:
    properties:
      hibernate:
        default_schema: weather
        jdbc:
          time_zone: UTC
    show-sql: true
```



19-20min intellij注入环境变量 了解即可, 用到在学 (不知道这个这节课不受影响)



## run application 21min-

Run application, 正常没报错

可以看到jpa启动起来的日志提示信息





创建Weather entity 25min-

```java
package com.fiona.weatherapp.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;     // Spring data jpa enabled
import java.time.OffsetDateTime;

/**
 * @author xueshuo
 * @create 2023-01-30 9:36 pm
 */
@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "weather")        // refer to database table: "weather"
public class Weather {
    @Id         // PK
    @GeneratedValue( strategy = GenerationType.IDENTITY)        // auto-generation strategy
    @Column(name = "id", updatable = false, nullable = false)       // constraint
    private Long id;

    @Column(nullable = false)
    private String city;
    @Column(nullable = false)
    private String country;
    @Column
    private String description;
    @Column
    private OffsetDateTime updatedTime;
}
```

其中用的多的Spring-data-jpa enabled annotation:

@Entity

@Table( )

@Id

@GeneratedValue( strategy = GenerationType.IDENTITY)

@Column



一些注意事项 https://www.jpa-buddy.com/blog/lombok-and-jpa-what-may-go-wrong/， lombok和Spring-data-jpa一起用有的地方会冲突

- Avoid using `@EqualsAndHashCode` and `@Data` with JPA entities;
- Always exclude lazy attributes when using `@ToString`;
- Don’t forget to add `@NoArgsConstructor` to entities with `@Builder` or `@AllArgsConstructor`.





一个错误示例 33min-

看到这里



