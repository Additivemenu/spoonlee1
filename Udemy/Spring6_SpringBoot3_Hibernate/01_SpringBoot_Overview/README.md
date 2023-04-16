# intro 

6



Building a traditional Spring application is really HARD!!!

Q: Which JAR dependencies do I need?
Q: How do I set up configuration (xml or Java)?

Q: How do I install the server? (Tomcat, JBoss etc...)

And that's JUST the basics for getting started



**Spring Boot Solution**

Make it easier to get started with Spring development Minimize the amount of manual configuration

Perform auto-configuration based on props files and JAR classpath Help to resolve dependency conflicts (Maven or Gradle)
 Provide an embedded HTTP server so you can get started quickly

Tomcat, Jetty, Undertow, ...



**Spring Boot and Spring**

Spring Boot uses Spring behind the scenes 

Spring Boot simply makes it easier to use Spring





**Spring Initializr**

```
http://start.spring.io
```

Quickly create a starter Spring Boot project 

Select your dependencies 

Creates a Maven/Gradle project

Import the project into your IDE 

Eclipse, IntelliJ, NetBeans etc ...



**Spring Boot Embedded Server**

Provide an embedded HTTP server so you can get started quickly 

+ Tomcat, Jetty, Undertow, ...

No need to install a server separately

mycoolapp.jar 里就包含了application code AND server code



**Running Spring Boot Apps**

Spring Boot apps can be run standalone (includes embedded server) 

Run the Spring Boot app from the IDE or command-line

```
> java -jar mycoolapp.jar
```



**Deploying Spring Boot Apps**

Spring Boot apps can also be deployed in the traditional way 

Deploy **Web Application Archive (WAR) file** to an external server:

+ Tomcat, JBoss, WebSphere etc ...

![springboot3_deploy](./Src_md/springboot3_deploy.png)





## Q & A

Q: Does Spring Boot replace Spring MVC, Spring REST etc ...?

No. Instead, Spring Boot actually uses those technologies

<img src="./Src_md/springboot_use_springtech.png" alt="springboot_use_springtech" style="zoom:50%;" />



Q: Does Spring Boot run code faster than regular Spring code?

No. Behind the scenes, Spring Boot uses same code of Spring Framework Remember, Spring Boot is about making it easier to get started. Minimizing configuration etc ...





# Hands-on

## Spring Boot initialzer

10-



**Quick Word on Maven**

When building your Java project, you may need additional JAR files For example: Spring, Hibernate, Commons Logging, JSON etc...

One approach is to download the JAR files from each project web site Manually add the JAR files to your build path / classpath



**Maven Solution**

Tell Maven the projects you are working with (dependencies) Spring, Hibernate etc ....

Maven will go out and download the JAR files for those projects for you

And Maven will make those JAR files available during compile/run

Think of Maven as your friendly helper / personal shopper :-)



**Development Process**

https://start.spring.io

+ Configure our project at Spring Initializr website
  + choose latest release version, avoid 'snapshot' version since they are beta
  + here we use maven project
  + as an inital build, we just select `spring web` as dependencies

+ Download the zip file
+ Unzip the file
+ Import the project into our IDE
  + run spring boot application :smile: just like usual in JR course





## Spring Boot - create a REST controller

8

新建package: rest,  然后创建如下class

```java
@RestController
public class FunRestController {
    
    // expose '/' that return "hello world"
    @GetMapping("/")
    public String sayHello(){
        return "hello world!";
    }
    
}
```

启动application, 这时访问`localhost:8080/ `就显示"hello world!"了



# Spring Framework overview

9, 10

[spring offical ](https://spring.io/)

**Why Spring?** Simplify Java Enterprise Development



**Goals of Spring**

+ Lightweight development with Java POJOs (Plain-Old-Java-Objects) 

+ Dependency injection to promote loose coupling

+ Declarative programming with Aspect-Oriented-Programming (AOP)

+ Minimize boilerplate Java code



`Core Container`: Factory for creating beans and manage bean dependencies. 

Container 内包含:

+ Beans
+ Core
+ SpEL
+ Context
+ ...



`Infrastructure`

AOP: Aspect Oriented Programming, Add functionality to objects declaratively.

+ Logging, security, transactions, etc...



该看10了

`Data Access Layer`: communicating with database

+  JDBC: Spring JDBC Helper Clsses, reduces your JDBC code by 50%
+ ORM: Object to Relational Mapping, Integration with Hibernate and JPA
+ Transactions: 
+ RXM
+ JMS

