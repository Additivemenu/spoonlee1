_JavaCore I Java基础知识_
先在这里做笔记, 然后据此再画Xmind,根据Xmind来做referencing, 以后遇到不理解的再返回教科书查看复习.

+ [阅读Java联机API文档](https://docs.oracle.com/en/java/javase/18/)  
当使用的类不是定义在基本java.lang包中时， 一定要使用import指令导入相应的包  
例如读取System.in, 需要import java.util包, 来使用[Scanner类](https://docs.oracle.com/en/java/javase/18/docs/api/java.base/java/util/Scanner.html) , 你可以查看它的定义, method之类的说明

---
先集中精力学习java的面向对象特性, 有精力了再去学C++ primer plus
学习语言还是要集中精力快速，慢慢磨不好
但是学计算机基础你可以慢慢磨
 **VScode中安装Java**
Java in Visual Studio Code
visual studio code - Configuring Java Extension Pack in Remote WSL on VSCode - Stack Overflow
在WSL中安装JDK: sudo apt install default-jdk
Install Open JDK on WSL (kontext.tech)
 **自定义模板**
File>preferences>configure snippet编辑自定义模板代码


---

+ [chapter3](chap3/README.md)

+ [chapter4](chap4/README.md)

+ [chapter5](chap5/README.md)





--- 

# debugging

**1. Tracing Variables**

**2. Using Assertions**

An assertion is a sentence that says (asserts) something about the state of a program. An assertion must be either true or false, and should be true if a program is working properly. Assertions can be placed in a program as comments:

```java
assert Boolean_Expression;
```

If assertion checking is turned on and the Boolean_Expression evaluates to false, the program terminates and outputs an assertion failed error message. Otherwise, the program finishes execution normally.

[Demo: assertTest](assertTesting.java)

By default, all programs run with assertion checks turned off. That is why you must explicitly enable assertion checking by typing the following in terminal:

```shell
$ java -enableassertions assertTesting
```