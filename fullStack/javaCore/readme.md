_JavaCore I Java基础知识_

+ [阅读Java联机API文档](https://docs.oracle.com/en/java/javase/18/)  
当使用的类不是定义在基本java.lang包中时， 一定要使用import指令导入相应的包  
例如读取System.in, 需要import java.util包, 来使用[Scanner类](https://docs.oracle.com/en/java/javase/18/docs/api/java.base/java/util/Scanner.html) , 你可以查看它的定义, method之类的说明


# Chapter 3 Java基本程序设计结构

## 3.6 字符串String
### 3.6.1 子串

### 3.6.2 拼接

### 3.6.3 不可变字符串

### 3.6.4 检测字符串是否相等

### 3.6.5 空串与Null串

### 3.6.6 码点与代码单元

### 3.6.7 String API

### 3.6.8 阅读联机API文档

### 3.6.9 构建字符串 


## 3.7 输入输出




## 3.10 数组Array
### 3.10.1 数组声明
[arrayAnnouncing](chap3/arrayJava.java)
> 数组是用来存储同一类型值的集合. 
>+ 数组长度不要求是常量, 但一旦数组长度指定便无法更改(使用arrayList动态扩容).  
>+ Java中允许长度为0的数组(注意长度为0的数组不同于null数组)

> 数组的声明方式:
>+ 方式1: 
>```java
>   int arr = new int[100];//内存中开辟一个可以容纳100个int数值的空间存放数组arr
>```
>> int型数组元素初始化为0
>> Boolean型数组元素初始化为false
>> String型数组元素初始化为null
>+ 方式2: 在{}中枚举元素, 无需指定数组长度
>+ 方式3: 用匿名数组快速初始化旧数组

### 3.10.2 访问数组元素
略

### 3.10.3 for each loop
```Java
for(int element:arr)
    System.out.println(element);
```
打印数组arr的每一个元素, 一个元素占一行. 读作"循环arr中的每一个元素"
+ 更简洁不宜错
+ 但不如for循环效率高, 不如for循环灵活(for each只能遍历每一个元素)

### 3.10.4 数组拷贝
[arrayCopy](chap3/arrayJava.java)
>+ 方式1: 拷贝数组变量  
>  新旧变量同时引用内存中的同一数组, 一变都变

>+ 方式2: Arrays.copyOf()
>  直接开辟新的内存来存储新的数组, 新旧数组各自独立

### 3.10.5 命令行参数
[arrayCommandLine](chap3/arrayCommandLine.java)
```java
public static void main(String[] args)
```
中的String[] args 其实是一个string array, 用来接收命令行的输入

### 3.10.6 数组排序
[arraySort](chap3/arraySorting.java)
Arrays.sort() 使用快速排序法(QuickSort)排序

### 3.10.7 多维数组
先跳过,
java实际上没有多维数组, 实际上只是"数组的数组"

### 3.10.8 不规则数组
紧跟多维数组, 先跳过

# Chapter 4 对象与类
## 4.1 面向对象程序设计概述


## 4.2 使用预定义类


## 4.3 用户自定义类
[customize_class](chap4/code3_1_employeeTest.java)
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
