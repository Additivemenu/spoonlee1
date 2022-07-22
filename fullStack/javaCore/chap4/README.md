# Chapter 4 对象与类
## 4.1 面向对象程序设计概述
> 重要OOP概念:
>+ 类(class): 构造对象的模板或蓝图.
> 由类构造(construct)对象的过程称为创建类的实例(instance). 类即注模, 对象即铸造的模型.
>>+ 实例字段(instance field): 对象中的数据.
>>+ 方法(method): 操作数据的过程.
>>+ 对象当前状态(state):作为一个类的实例, 特定对象都有一组特定的实例字段, 这些值的集合就是这个对象的当前状态.
>+ 封装(encapsulation):将数据和行为组合在一个包中, 并对对象的使用者隐藏具体的实现方式.
>+ 继承(inheritance)

> 对象的三个特性:
>+ 行为(behavior): 由可调用方法定义
>+ 状态(state): 必须通过调用方法改变
>+ 标识(identity): 每个对象都有一个唯一标识
> 这三个特性之间相互影响. e.g. 对象的状态会影响到其行为(订单状态为"已付款", 那么此时就应该禁用"付款"行为)

> 类与类之间的关系
>+ 依赖dependence("uses-a"): 如果一个类的方法使用或操纵另一个类的对象, 就说一个类依赖于另一个类;应尽可能将相互依赖的类降至最少.
>+ 聚合aggregation("has-a"): 意味着类A的对象包含类B的对象.
>+ 继承 inheritance("is-a"): 一般来讲, 如果类A扩展类B, 类A不但包含从类B继承的方法, 还会有一些额外的功能.
>+ 可以使用UML(Unified Modelling Language)绘制类图来描述类之间的关系
## 4.2 使用预定义类

> 对象与对象变量
>+ 构造对象
>  **想要使用对象, 首先必须构造对象, 并对其初始状态, 然后对对象应用方法**
>>+ 在Java中, 使用构造器(constructor)构造新实例. 构造器的名字应和类名相同.例如想构造一个Date对象, 需要在构造器前加上new操作符:
>> ```Java
>> new Date(); // 构造了一个新的对象, 它被初始化为当前的日期和时间
>> ```
>+ 复用构造的对象-对象变量
>  通常会希望复用构造的对象, 此时需要将构造的对象放在对象变量里:
> ```Java
> Date birthday = new Date();
> ```

> 注意事项
>1. **注意一定要区分对象和对象变量!!!**
>```JAVA
>Date deadline;
>```
>例如上述代码定义了一个对象变量deadline, 它可以引用Date类型的对象,但deadline本身并不是一个对象! **对象变量并没有包含一个对象, 而是引用内存中的对象.** 在Java中, 任何对象变量的值都是对存储在另外一个地方的某个对象的引用.

>2. **注意一定要先初始化对象变量, 才能对其使用方法**
>不同于C, 在Java中如果未初始化指针(引用)，运行时系统会直接报错,而不是产生一个随机的结果
>>+ 引用新构造的对象
>>```JAVA
>> deadline=new Date();
>>```
>>+ 引用已有的对象 
>>两个对象变量将引用内存中的同一个对象
>>```JAVA
>> deadline=birthday;
>>```
>3. **new操作符返回值也是一个引用**
>>```JAVA
>> Date deadline = new Date();
>>```
>> 表达式new Date()构造了一个Date类型的对象, 它的值是对新创建对象的一个引用. 而这个引用存储在对象变量deadline中.
>4. **所有的Java对象都存储在堆中.当一个对象包含另一个对象变量时,它只是包含另一个堆对象的指针.**


### 4.2.2 Java类库中的LocalDate类
[Java_Date](code2_2_localdate.java)
标准Java类库分别包含了两个类: 
+ 表示时间点的Date类
+ 用日历表示法表示日期的LocalDate类

具体内容先跳过

### 4.2.3 更改器方法与访问器方法
[calender_demo](code2_3_demo.java)

>重要概念
>+ 更改器方法(mutator method): 更改对象状态的方法
>+ 访问器方法(accessor method): 只访问对象而不修改对象状态的方法

具体内容先跳过


## 4.3 用户自定义类
[employeeSalaryManagement](code3_1_employeeTest.java)

在Java中, 最简单的类定义形式为:
```Java
class ClassName{
    field1;
    field2;
    ...
    constructor1;
    constructor2;
    ...
    method1;
    method2;
    ...
}

```

### 基于上面的demo分析(4.3.2- 4.3.8)

1. **概览**  
demo中包含两个类: Employee类和带有public修饰符的EmployeeTest类（包含了main方法）. 当编译这段source code时, 编译器将在目录下创建两个类文件: 1) EmployeeTest.class; 2) Employee.class. 在命令行中键入 javac EmployeeTest.java则会编译EmployeeTest及其用到的类

2. **public与private修饰符**
+ public: Employee类中的方法都被标记为public,这意味着任何类的任何方法都可以调用这些方法.
+ private: Employee类中的字段都标记为了private, 这意味着只有Employee类自身的方法能够访问访问这些实例字段,而其他类的方法则不能读写这些字段.
  
3. **关于构造器**
demo中的Employee类的第二部分关于constructor的定义:
```java
    // define constructor-----------------------------------------
    public Employee(String n, double s, int year, int month, int day){ // remember these parameters are inputs, not actual class property

        //name = Objects.requireNonNullElse(n, "unknown"); // name might be null, 这里我们采用"宽容法"    
        
        //----"严格法"----------
        Objects.requireNonNull(n, "the name cannot be null"); 
        name = n;
        //--------------
        salary = s;
        hireDay = LocalDate.of(year, month, day);
    }
```
注意到:
+ 构造器与类名相同
+ 每个类可以有一个以上的构造器
+ 构造器可以有0个,1个或多个参数
+ 构造器可以没有返回值
+ **构造器总是伴随着new操作符一起调用**
+ **注意:不要在构造器中定义与实例字段同名的局部变量**
 以防止这些局部变量遮蔽(shadow)同名的实例字段.例如以下构造器中声明了局部变量name和salary， 这与Employee类的实例字段重名了.
 ```Java
 public Employee(String n, double s, ...){
 String name = n //error
 double salary = s; // error
}
 ```

## 4.4 静态字段与静态方法
解释static修饰符的含义
### 4.4.1 静态字段
>+ 如果将一个字段定义为static, **每个类**只有一个这样的字段;
>+ 对于非静态的实例字段, **每个对象**都有一个自己的副本
> (静态字段也叫类字段, "静态"是延续了C++的叫法并无实际含义)


```Java
class Employee{
    private static int nexId = 1;
    private int id;
}
```
上面的代码表示, 每一个Employee对象都有一个自己的字段, 但这个类的所有实例都共享一个nextId字段.