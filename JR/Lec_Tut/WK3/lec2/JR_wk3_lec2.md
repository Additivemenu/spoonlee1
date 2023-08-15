Java

+ 用intellij IDE, 在file > project structure > JDK来选择JDk版本, 选择了JDK之后你的电脑上才能跑java
+ 安装junit 5测试框架
+ 使用gradle 7来进行项目管理


:book: [start with gradle](https://www.jetbrains.com/help/idea/getting-started-with-gradle.html#add_code)


:book: [intall intellij idea on ubuntu](https://linuxhint.com/install-intellij-idea-on-ubuntu-20-04/)

---

[Java lesson1](https://github.com/australiaitgroup/full-stack-bootcamp-wiki/blob/main/%E5%85%A8%E6%A0%88%E7%8F%AD17%E6%9C%9F%E7%AC%94%E8%AE%B0/Java%E6%96%B9%E5%90%91/Lecture%2014%20Java%20Basic%201.md)

正式开始 19:39-

# backend roadmap 19:39-
what is backend development?

commercial product的开发历程
+ 分布式开发, 集中式管理; 学校里的作业仅仅停留在local development
+ UAT: user acceptance test
+ 从test/integration往右, 都上云端了

road map 19:56-20:24

课程安排偏前端
+ 澳洲junior backend职位很少, 澳洲full stack也主要偏前端, 匠人的课程也偏前端
+ 现阶段先精通一个方向, 现阶段想要精通两个方向不现实


# java basics 20:24-


Java road map 20:30

Development environment 20:40 :star: 再看看
+ 编码规范
+ IDE的一些有用功能

how does Java work? :star: 再看看 


java 参考资料 20:54- 
+ JDK是最好的参考资料 (docs.oracle.com)
  + 查文档时可以用ctrl+f来筛选关键字 
+ google & stackoverflow
+ https://www.baeldung.com/
+ 推荐书籍: thinking in java, effective java(recommended, canva面试必备), head first design patterns, code complete, refactoring
+ 最好搜英文文档

## variable and types 20:58-


## Array 20:59

+ Effective java: prefer list over array     
  + e.g. array中数据类型和声明不匹配, fail at runtime
  + list中数据类型和声明不匹配, won't compile 

## conditions 21:07-
control flow



operators

## class 21:14-
+ effective java: always override hashCode when you override equals


## method 21:31
+ Access modifier: public private protected
  + effective javaL minimise the accessibility of classes and members

## String 21:37-
+ immutable: 创建出来之后便不能够改动了
+ effective java: be ware the performance of string concatenation(连接)
+ regular expression (正则表达式)

## Java collections 21:42
面试常考: linkedlist vs. arraylist 区别?

Map
+ effective java Item64: refer to objects by their interface

# java 进阶内容

## 序列化(serializable)和反序列化 21:49
:book: **javacore2 chap2**

I/O操作相关, 网络传输, 数据库读写

+ 序列化: 将对象以二进制的形式保存在硬盘上或进行网络传输
+ 反序列化: 将二进制的文件/数据转化为对象读取

## Java 8 Lambda 21:53-
A lambda expression is like syntactic sugar for an anonymous class with one method whose type is inferred. However, it will have enormous implications for simplifying development
+ 类似JS中的匿名函数


## Java 8 optional class 21:57 :star: 再看, 没太明白
:book: **javaCore2 chap1**

optional class in the java.util package for avoiding null return values (and thus NullPointerException)

```java
// e.g.
...

// 有点像JS的array.map(), 可以减少if, else的书写
return ...
```

## Java 8 stream 22:11-22:41 :star:
:book: **JavaCore2 chap1**

采用类似SQL的语法对数据集合进行运算, 可以有效地减少for loop, if else...
.filter() .sort()  .map()


```java
e.g.
```


+ effective java item 46: prefer side-effect-free functions in streams
+ effective java item 47: prefer collections to stream as a return type
##