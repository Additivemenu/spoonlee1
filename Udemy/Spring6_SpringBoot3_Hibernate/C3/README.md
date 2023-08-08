3





Database Access with Hibernate / JPA CRUD



# Abstract 





# Hibernate / JPA overview



What is Hibernate https://hibernate.org/orm/

A middleware (Facade) that connect Java Spring application with database, to allow developer to do declarative  stuff on database

+ It handles all of the low-level SQL

+ It minimizes the amount of JDBC code you have to develop

+ Hibernate provides the Object-to-Relational Mapping (ORM)

  + ORM: The developer defines (declares) mapping between Java class & database table

    ![](./Src_md/ORM1.png)



What is JPA?

Jakarta Persistence Api (JPA)... previously known as *Java Persistence API*

+ Standard API for Object-to-Relational-Mapping (ORM)
+ Note it is just a specification that defines a set of interfaces, it requires an implementation to be usbale

There are many implementions of JPA, Hinernate is the most popular one. Check more JPA-Vendor implementations at https://en.wikipedia.org/wiki/Jakarta_Persistence





Benefit of using JPA (polymorphism)

+ By having a standard API, you are not locked to vendor's implementation
+ Maintain portable, flexible code by coding to JPA spec (interfaces)
+ Can theoretically switch vendor implmentation
  + protected variation principle



## Hibernate/JPA & JDBC

How does Hinernate / JPA relate to JDBC? 

Hibernate / JPA uses JDBC  in the background for all database communications

(就像 React 和 JS DOM 的关系一样)



![](./Src_md/JPAJDBC1.png)





# Hands on

## Set up

62-67 

### Set up Devenvironment: MySQL

In this course, we use MySQL database. It has 2 components:

+ MySQL Database Server
  + It is the main engine of the database. It stores data for the database and supports CRUD features on the data
+ MySQL Workbench
  + It is a client GUI for interacting with the database. 
  + It can create database schemas and tables 
  + execute queries to retrieve data
  + Perform insert, updates and deletes on data
  + Handle administrative functions such as creating users



MySQL Database Server download:

https://dev.mysql.com/downloads/mysql/

MySQL Workbench download:

https://dev.mysql.com/downloads/workbench/



### Set up database table

利用MySQL Workbench 创建自己的Database Server ( 有自己的ip和port number) with specified username & password, 再利用这个database connection和sql script创建table



### Set up SpringBoot project

65-67

In SpringBoot, Hibernate is the default implementation of JPA.

+ **EntityManager** is main component for creating queries etc ...
+ **EntityManager** is from Jakarta Persistence API (JPA)



Based on configs, SpringBoot will automatically create the beans : 

+ **DataSource**, **EntityManager**

You can then inject these into your app, for example your DAO



And SpringBoot will automatically configure your data source for you based on entries from Maven pom file

+ JDBC Driver: mysql-connector-j
+ Spring Data(ORM): spring-boot-starter-data-jpa

SpringBoot will also read DB connection info from application.properties file



:gem: demo

starter.spring.io 添加dependency

+ MySQL Driver

+ Spring Data JPA



SpringBoot Application 

+ **mmandLineRunner**: This is a functional interface with a single method `run(String... args)`. When a bean of type `CommandLineRunner` is present in the context, its `run` method will be called by the Spring Boot framework after the application context is loaded. This gives you an opportunity to execute some logic after the entire Spring context is up and running but before the main method completes.

In the example below, the `commandLineRunner` bean simply prints "hello world!" to the console after the Spring context is initialized.

```java
@SpringBootApplication
public class CruddemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(CruddemoApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(String[] args){	// executed after the Spring beans have been loaded
    
    // lambda expression
		return runner -> {
			System.out.println("hello world!");
		};
    
//		// lambda expression is equivalent to below
//		return new CommandLineRunner() {
//			@Override
//			public void run(String... args) throws Exception {
//				System.out.println("hello world!");
//			}
//		};
	}

}
```

application.properties

+ 注意别打错字了!

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/student_tracker
spring.datasource.username=springstudent
spring.datasource.password=springstudent

# Turn off the Spring Boot banner
spring.main.banner-mode=off

# Reduce logging level. Set logging level to warn
#logging.level.root=warn
```



by running application, you can see logging:

```terminal
2023-08-08T21:59:51.122+10:00  INFO 34915 --- [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Starting...
2023-08-08T21:59:51.255+10:00  INFO 34915 --- [           main] com.zaxxer.hikari.pool.HikariPool        : HikariPool-1 - Added connection com.mysql.cj.jdbc.ConnectionImpl@6abdec0e
2023-08-08T21:59:51.256+10:00  INFO 34915 --- [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Start completed.
```

which indicates the database server is successfully connected by the SpringBoot application









## JPA Annotations

68, 69

Continuing the content from set up

这里就是在Java里利用JPA Annotation声明式地写对应MySQL record的类, 其实很多和database相关的code我们都是在backend写的, 而不是直接打开MySQL server 去写, <u>我们的目的是让backend去访问database server!</u> 

As mentioned, Hibernate is the default JPA implementation in SpringBoot. 



### **Entity Class**

The Java class that is mapped to a database table

+ at a minimun, the Entity class 
  + Must be annoted with `@Entity`
  + Must have a public or protected no-argument constructor
    + the class can have other constructors

:bangbang: in Java, if you

+ don't decalre any constructors, Java will provide a no-argument constructor for free
+ do declare any constrcutors other than a no-agurment constrctor, Java will not provide a no-argument construtor for free
  + you need to explicitly define a no-argument constructor

![](./Src_md/ORM1.png)



![](./Src_md/jpa_entity1.png)

Actually, the use of `@Column` is optional

+ If not specified, the column name is the same name as Java field

+ In general, I don’t recommend this approach
  + If you refactor the Java code, then it will not match existing database columns This is a breaking change and you will need to update database column

Same applies to `@Table`, database table name is same as the class



### **Primary Key**

+ cannot be null

MySQL - Auto Increment

```sql
CREATE TABLE student (
  id int NOT NULL AUTO_INCREMENT, # PK should be NOT NULL!
  first_name varchar(45) DEFAULT NULL,
  last_name varchar(45) DEFAULT NULL,
  email varchar(45) DEFAULT NULL,
  PRIMARY KEY (id)
)
```



```java
@Entity 
@Table(name="student") 
public class Student {
  
  @Id
  @GeneratedValue(strategy=GenerationType.IDENTITY)		// 对应 auto increment
  @Column(name="id")
  private int id;
  ...
}
```

ID Generation Strategies

| Name                                      | Description                                                  |
| ----------------------------------------- | ------------------------------------------------------------ |
| GenerationType.AUTO                       | Pick an appropriate strategy for the particular database     |
| GenerationType.IDENTITY     (recommended) | Assign primary keys using database identity column           |
| GenerationType.SEQUEENCE                  | Assign primary keys using a database sequence                |
| GenerationType.TABLE                      | Assign primary keys using an underlying database table to ensure uniqueness |

You can  also define your own CUSTOM generation strategy

+ create implementation of org.hibernate.id.IdentifierGenerator
+ and override the method: public Serializable generate(...)



### :gem: Demo

the entity class: Student

```java
import jakarta.persistence.*;


/**
 * @author xueshuo
 * @create 2023-08-08 10:23 pm
 */

@Entity 
@Table(name="student")
public class Student {
    // define fields
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;
    
    @Column(name="first_name")
    private String firstName;

    @Column(name="last_name")
    private String lastName;

    @Column(name="email")
    private String email;
    
    
    // define constructors
    public Student() {
    }

    public Student(String firstName, String lastName, String email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    // define getters/setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    // define toString() method
    @Override
    public String toString() {
        return "Student{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
```





# CRUD using JPA

同理, 目的是在backend写API来让backend 去 访问 database server. backend 相当于是client 访问database 的Facade



## Save a Java Object with JPA

看到这里







## Read obj with JPA







## Queryt obj with JPA





## Update obj with JPA





## Delete obj with JPA





## Create Database table from Java code



