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





## Spring Boot "Hello World" 

8

create a REST controller

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





`Data Access Layer`: communicating with database

+  **JDBC**: Spring JDBC Helper Clsses, reduces your JDBC code by 50%
+ **ORM**: Object to Relational Mapping, Integration with `Hibernate` and `JPA`
+ **Transactions**: Add transaction support. Make heavy use of AOP behind the scenes
+ **OXM**
+  **JMS**: Java Message Service. 
   +  for sending async messages to a Message Broker. Spring provides helper classes for JMS




`Web Layer`: All web related classes, home of the Spring MVC framework

+ **Servlet:** 
+ **WebSocket:**
+ **Web:**



`Infrastructure`: Java agents to remotely monitor your app with JMX (Java Management Extension) 

+ AOP
+ Aspects
+ Instrumentation
+ Messaging



`Test`: Spring supports Test-Driven-Development (TDD). Mock objects and out-of-container testing

+ **Unit test:**
+ **Integration test:**
+ **Mock objects:**



# Spring Projects

11-

**What Are Spring “Projects”**

Additional <u>Spring **modules**</u> built-on top of the core Spring Framework 

Only use what you need ...

+ Spring Cloud, Spring Data

+ Spring Batch, Spring Security 
+ Spring Web Services, Spring LDAP *others ...*



spring.io > project, you will see all these modules.  每个module都能单独出个课



## Maven

**What is Maven?**

+ Maven is a Project Management tool
+ Most popular use of Maven is for build management and dependencies 



**What Problems Does Maven Solve?**

+ When building your Java project, you may need additional JAR files For example: Spring, Hibernate, Commons Logging, JSON etc...

+ One approach is to download the JAR files from each project web site 
+ Manually add the JAR files to your build path / classpath



**Maven Solution**

+ Tell Maven the projects you are working with (dependencies) Spring, Hibernate etc ....

+ Maven will go out and download the JAR files for those projects for you

+ And Maven will make those JAR files available during compile/run

+ Think of Maven as your friendly helper / personal shopper :-)



![](./Src_md/Maven1.png)



**Handling JAR Dependencies**

When Maven retrieves a project dependency. It will also download supporting dependencies. For example: Spring depends on commo ns-logging ... Maven will handle this for us automagically



**Building and Running**

When you build and run your app ... Maven will handle class / build path for you. Based on config file, Maven will add JAR files accordingly



**Standard Directory Structure**

13-

+ Normally when you join a new project
  + Each development team dreams up their own directory structure 
  + Not ideal f or new comers and not standardized

+ Maven solves this problem by providing a standard directory structure



![](./Src_md/maven_structure.png)

+ pom.xml: maven configuration file



**Standard Directory Structure Benefits**

+ Most major IDEs have built-in support for Maven
  +  Eclipse, IntelliJ, NetBeans etc
  + IDEs can easily read/import Maven projects

+ Maven projects are portable

  + Developers can easily share projects between IDEs

  + No need to fight about which IDE is the best LOL!



**Advantages of Maven**

+ Dependency Management
  + Maven will find JAR files for you 	
  + No more missing JARs
+ Building and Running your Project
  + No more build path / classpath issues 

+ Standard directory structure



Once you learn Maven, you can join a new project and be productive You can build and run a project with minimal local configuration



### Maven key concepts

14

pom.xml: Project Object Model file, the Configuration file for your project



pom.xml 一般结构:

```xml
project meta data: project name, version etc. Output file type: JAR, WAR,...


dependencies: List of projects we depend on: SPring, Hibernate, etc ...


plug-ins: Additional custom tasks to run: generate JUnit test reports etc...
```

e.g.

```xml
<project ...> 
  
  <modelVersion>4.0.0</modelVersion>
	<groupId>com.luv2code</groupId> 
  <artifactId>mycoolapp</artifactId> 
  <version>1.0.FINAL</version> 
  <packaging>jar</packaging>
	<name>mycoolapp</name>
  
<dependencies> 
  <dependency>
		<groupId>org.junit.jupiter</groupId> 
    <artifactId>junit-jupiter</artifactId> 
    <version>5.9.1</version> 		
    <scope>test</scope>
	</dependency> 
</dependencies>
  
<!-- add plugins for customization -->
  
  
</project>
```



Project Coordinates uniquely identify a project

Project Coordinates - Elements

| Name Description** | Description                                                  |
| ------------------ | ------------------------------------------------------------ |
| Group ID           | Name of company, group, or organization.  Convention is to use reverse domain name: **com.luv2code** |
| Artifact ID        | Name for this project: **mycoolapp**                         |
| Version            | A specific release version like: **1.0, 1.6, 2.0 ** If project is under active development then: **1.0-SNAPSHOT** |

e.g. of project coordinates

```xml
<groupId>com.luv2code</groupId> 
<artifactId>mycoolapp</artifactId> 
<version>1.0.FINAL</version>
```

```xml
<groupId>org.springframework</groupId> 
<artifactId>spring-context</artifactId> 
<version>6.0.0</version>
```

```xml
<groupId>org.hibernate.orm</groupId> 
<artifactId>hibernate-core</artifactId> 
<version>6.1.4.Final</version>
```

Adding dependencies

```xml
<project ...> 
  ...
	<dependencies>
		<dependency> 
      <groupId>org.springframework</groupId> 
      <artifactId>spring-context</artifactId> 
      <version>6.0.0</version>
		</dependency>
    
		<dependency> 
    	<groupId>org.hibernate.orm</groupId> 
    	<artifactId>hibernate-core</artifactId> 
      <version>6.1.4.Final</version>
  	</dependency> 
    ...

	</dependencies> 
</project>
```



Dependency coordination

To add given dependency project, we need

+ **Group ID**, **Artifact ID**

+ **Version** is optional ...

+ Best practice for DevOps is to include the version (repeatable builds) 

May see this referred to as: **GAV:  G**roup ID, **A**rtifact ID and **V**ersion



**How to Find Dependency Coordinates**

+ Option 1: Visit the project page (spring.io, hibernate.org etc) 
+ Option 2: Visit http://search.maven.org (<u>easiest approach</u>) 



## SpringBoot project files

15-16

Spring Initializr created a Maven project for us



### mvnw

**mvnw** allows you to run a Maven project

+ No need to have Maven installed or present on your path

+ If correct version of Maven is NOT found on your computer 
  + **Automatically downloads** correct versionand runs Maven Two files are provided

<img src="./Src_md/mvnw.png" style="zoom:50%;" />

+ **mvnw.cmd** for MS Windows 

+ **mvnw.sh** for Linux/Mac

If you already have Maven installed on your computer previously, then you can ignore/delete the **mvnw** filesJust use Maven as you normally would



### Spring Boot Maven plugin

```xml
<!-->To package executable jar or war archive, Can also easily run the app<-->	
	<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
			</plugin>
		</plugins>
	</build>
```





### Application Properties

By default, Spring Boot will load properties from: **application.properties**

It is created by Spring Initializr. Empty at the beginning

```properties
# configure server port
server.port=8484

# configure my customizing props
coach.name=Mickey Mouse
team.name=The Mouse Crew
```

read data from properties file

```java
@RestController
public class FunRestController {
  @Value("${coach.name}")
  private String coachName;
  @Value("${team.name}")
  private String teamName;
  ...
}
```



Static

<img src="./Src_md/static_content.png" style="zoom:50%;" />



:bangbang: WARNING:

Do not use the **src/main/webapp** directory if your application is packaged as a JAR.

Although this is a standard Maven directory, it works only with WAR packaging. It is silently ignored by most build tools if you generate a JAR.



Template

<img src="./Src_md/template.png" style="zoom:50%;" />



# SpringBoot starters

17-

看到这里!
