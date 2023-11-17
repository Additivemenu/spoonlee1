References

:bangbang::book: [spring 官网](https://spring.io/)

:bangbang: [spring 全家桶文档](https://spring.io/projects/spring-boot)

+ 一手的spring全家桶文档与学习资料

:book: [spring boot github](https://github.com/spring-projects/spring-boot)

https://www.luv2code.com

Contents:
+ Spring6
+ SpringBoot3
+ Hebernate & JPA
+ Spring security 
+ Maven

don't have to watch LEGACY videos

:book: [本课程 github: code materials](https://github.com/darbyluv2code/spring-boot-3-spring-6-hibernate-for-beginners)

:bangbang: 本课程似乎并不包含unit test, API management tool, database migration, 分页查找, 分布式, docker .. 只是作为SpringBoot的入门课程.



:book: 进阶课程: microservice and Spring cloud

https://www.udemy.com/course/microservices-with-spring-boot-and-spring-cloud/



---



NEW- course hours: 31h

本课程主要集中于使用Spring Data JPA去结合SQL database

但其实还有Spring Data MongoDB, Spring Data Redis...



Basics

| Class                      | Topic                                                        | Description                           |
| -------------------------- | ------------------------------------------------------------ | ------------------------------------- |
| [1](./C1/README.md)        | SpringBoot3 quick start                                      |                                       |
| :star: [2](./C2/README.md) | Inversion of Control & dependency injection                  | @Component, <br/>@Bean                |
| :star: [3](./C3/README.md) | Database Access with Hibernate / JPA CRUD <BR> :bangbang: 对1个sql table 的CRUD | CURD with JPA <br/>DAO, EntityManager |

REST 

+ 主要就是针对一个HTTP request 的 service. Request 只能由client 发起, 如果做服务器主动push给client的功能需要新的API e.g. Web Socket

| Class                              | Topic             | Description |
| ---------------------------------- | ----------------- | ----------- |
| :star: [4](./C4/README.md)         | REST CRUD APIs    |             |
| [5](./C5/README.md) 先跳过security | REST API Security |             |

Spring MVC

| Class                              | Topic                                  | Description |
| ---------------------------------- | -------------------------------------- | ----------- |
| [6](./C6/README.md)                | Spring MVC Introduction with Thymeleaf |             |
| [7](./C7/README.md)                | Spring MVC CRUD                        |             |
| [8](./C8/README.md) 先跳过security | Spring MVC Security                    |             |

Advanced 

| Class                 | Topic                                                        | Description                                                  |
| --------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| [9](./C9/README.md)   | JPA/Hibernate Advanced Mappings <br> :bangbang: 对多个sql table的CRUD | @OneToOneMapping <br/>@OneToManyMapping <br/>@ManyToManyMapping |
| [10](./C10/README.md) | AOP                                                          |                                                              |

