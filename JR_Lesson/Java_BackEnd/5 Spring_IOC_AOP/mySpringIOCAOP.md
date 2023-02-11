JR17 2022-09-27

Spring IOC & AOP

本节课偏原理, 需要设计模式的知识

不懂的话也可以做P3



# Intro

Dependency Insersion Principle

核心思想是面向接口编程, 细节应该依赖抽象. 见Design Pattern chapter1的笔记



## Inversion of Dependency (IoC)

Inversion of Control is a principle in software engineering and IoC enables a frameworkto take control of the flow of a program and make calls to our custom code. To enablethis, frameworks use abstractions with additional behaviour built in. If we want to add our own behaviour, we need to extend the classes of the framework or plugin our own classes.

The advantages of this architecture are:

+ decoupling the execution of a task from its implementation

+ making it easier to switch between different implementations

+ greater modularity of a program

+ greater ease in testing a program by isolating a component or mocking itsdependencies and allowing components to communicate through contracts

IoC 主要的作用就是解耦各个组件，让高层模块不依赖底层模块，而是让两者依赖接口和抽象来实现。Ioc的思想最核心的地方在于，资源不由使用资源的双方管理，而由不使用资源的第三方管理，这可以带来很多好处。

+ 资源集中管理，实现资源的可配置和易管理。
+ 降低了使用资源双方的依赖程度，也就是我们说的耦合



## Dependency Injection (DI) 14min-

Dependency injection is a pattern (there are many other patterns to do so) through which to implement IoC, where the controlbeing inverted is the setting of object’s dependencies.

The act of connecting objects with other objects, or “injecting” objects into other objects,is done by an assembler rather than by the objects themselves.

<img src="./Src_md/IOC1.png" width=60%>

```java
// 耦合度较高
public class Store {    
    private Item item;      
    public Store() {        
      item = new ItemImpl1();       		// 只能注入ItemImpl1这个实现类
    }
}

// 耦合度比上面的低
public class Store {   
    private Item item;    
    public Store(Item item) {       
      this.item = item;    						// 注入Item接口的实现类 
    }
}

public interface Item{
  ...
}
```



Downside of DI: management of dependencies is inconvenient

```java
public class Main {
    public static void main(String[] args) {
      MyClass4 myClass4 = new MyClass4();
      MyClass3 myClass3 = new MyClass3();
      // If we want to add another dependency to MyClass2 (e.g. myClass5), we have to change the code by ourselves.
      MyClass2 myClass2 = new MyClass2(myClass3, myClass4);
      MyClass1 myClass1 = new MyClass1(myClass2);
      myClass1.doSomething();
    }
}
```



A more convenient way to combat downside of DI: 

:star: DI  & IOC work together

With IoC, the dependencies are managed by the container, and the programmer is relieved ofthat burden.

Using annotations like `@Autowired`, the container is asked to inject a dependencywhere it is needed, and the programmers do not need to create/manage those dependencies bythemselves.

```java
public class MyClass2 {
  @Autowired
  private MyClass3 myClass3;
  
  @Autowired
  private MyClass4 myClass4;
  
  public void doSomething(){
    myClass3.doSomething();
    myClass4.doSomething();}
}
```



## Spring开发的策略 20min-

Spring最根本的使命：简化Java开发。 为了降低Java开发的复杂性，Spring采取以下4种关键策略：

+ 基于POJO(plain old java object)的轻量级和最小侵入性编程

+ 通过dependence injection, interface oriented 实现松耦合

+ 基于切面和惯例进行声明式编程

+ 通过切面和模版减少样板示代码



# :moon: Spring中的IoC 24min-

IoC（Inversion of Control，控制倒转），是spring的核心，贯穿始终。

**所谓IoC，对于spring框架来说，就是由spring来负责控制对象的生命周期和对象间的关系。**所有的类都会在**spring容器**中登记，告诉spring你是个什么，你需要什么，然后spring会在系统运行到适当的时候，把你要的东⻄主动给你，同时也把你交给其他需要你的东⻄。

所有的类的创建、销毁都由 spring来控制，也就是说控制对象生存周期的不再是引用它的对象，而是spring。对于某个具体的对象而言，以前是它控制其他对象，现在是所有对象都被spring控制，所以这叫控制反转。

>  前面我们提到:
>
> Ioc的思想最核心的地方在于，资源不由使用资源的双方管理，而由不使用资源的第三方(这里指Spring)管理，这可以带来很多好处。
>
> + 资源集中管理，实现资源的可配置和易管理。
>
> + 降低了使用资源双方的依赖程度，也就是我们说的耦合



**IoC 容器**需要具备两个基本的功能：

+ 通过描述管理 Bean，包括发布和获取 Bean
+  通过描述完成 Bean 之间的依赖关系



## The Spring IoC Container

Spring中将**IoC容器**管理的对象称为Bean，这个和JavaBean并没有什么关系。。

+ `BeanFactory`接口：在 Spring 的定义中，它要求所有的 IoC 容器都需要实现接口BeanFactory，它是一个顶级容器接口。Bean工厂，借助于配置文件能够实现对JavaBean的配置和管理，用于向使用者提供Bean的实例。

+ `ApplicationContext`接口：ApplicationContext构建在BeanFactory基础之上，提供了更多的实用功能。 在现实中我们使用的大部分Spring IoC 容器是 ApplicationContext 接口的实现类



## 通过扫描装配Bean 30min-

如果一个个的 Bean 使用注解`@Bean` 注入 Spring IoC 容器中，很麻烦。

Spring 允许我们进行扫描装配 Bean 到 IoC 容器中，对于扫描装配而言使用的注解是

+ `@Component` : 标明哪个类被扫描进入 Spring IoC 容器
+ `@ComponentScan`:  标明采用何种策略去扫描装配 Bean。自动扫描和application同路径下的package. 策略分为:
  + Constructor-based dependency injection
  + Setter-based dependency injection
  + Field-based dependecny injection



### Constructor-Based DependencyInjection 34min-

the container will invoke a constructor with argumentseach representing a dependency we want to set.

```java
@Configurationpublic 
class AppConfig {     
  @Bean    
  public Item item1() {        
    return new ItemImpl1();    
  }     
  @Bean    
  public Store store() {        
    return new Store(item1());    
  }
}
```

+ The `@Configuration` annotation indicates that theclass is a source of bean definitions. Also, we canadd it to multiple configuration classes.

+ The `@Bean` annotation is used on a method todefine a bean. 
  + If we don’t specify a custom name,the bean name will default to the method name.

For a bean with the default singleton scope, Springfirst checks if a cached instance of the beanalready exists and only creates a new one if itdoesn’t. If we’re using the prototype scope, thecontainer returns a new bean instance for eachmethod call. :question: 这单例模式?

看到36min- 回去看单例模式





### Setter-Based DependencyInjection









### Field-Based DependencyInjection





## Autowired注解