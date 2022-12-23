跳转:

IDEA
+ [chap0 IDEA的使用](./chap0/readme.md)

Basics
+ [chap3 Java basics](./chap3/README.md) 

OOB 与 模块化
+ [chap4 Object & Class](./chap4/README.md)
+ [chap5 Inheritance & Polymorph](./chap5/readme.md) 
+ [chap6 Interface, lambda & inner class ](./chap6/readme.md)

异常与debug
+ [chap7 Exception, assertion, log](./chap7/readme.md) 

Java进阶内容
+ [chap8 Generics & reflection](./chap8/readme.md)
+ [chap9 集合与常用类](./chap9/readme.md)
+ [chap12 并发](./chap12/readme.md) 

Java用户界面
+ [chap10 GUI]()
+ [chap11 Swing]()


Stream, I/O stream见JavaCore2

---



# 学习资料

+ JDK是最好的参考资料 (docs.oracle.com)
  + 查文档时可以用ctrl+f来筛选关键字 
+ google & stackoverflow
+ https://www.baeldung.com/
+ 推荐书籍: thinking in java, effective java(recommended, canva面试必备), head first design patterns, code complete, refactoring
+ 最好搜英文文档

---

# 学习方法
+ [阅读Java联机API文档](https://docs.oracle.com/en/java/javase/18/)  
当使用的类不是定义在基本java.lang包中时， 一定要使用import指令导入相应的包  
例如读取System.in, 需要import java.util包, 来使用[Scanner类](https://docs.oracle.com/en/java/javase/18/docs/api/java.base/java/util/Scanner.html) , 你可以查看它的定义, method之类的说明

先集中精力学习java的面向对象特性, 有精力了再去学C++ primer plus
学习语言还是要集中精力快速, 慢慢磨不好
但是学计算机基础你可以慢慢磨

---

# IDE相关

+ VScode中安装Java
    Java in Visual Studio Code
    visual studio code - Configuring Java Extension Pack in Remote WSL on VSCode - Stack Overflow
    在WSL中安装JDK: sudo apt install default-jdk
    Install Open JDK on WSL (kontext.tech)
  + 自定义模板
  File>preferences>configure snippet编辑自定义模板代码
+ Intellij (IDEA)
  + 用intellij IDE, 在file > project structure > JDK来选择JDk版本, 选择了JDK之后你的电脑上才能跑java
  + 安装junit 5测试框架
  + 使用gradle 7来进行项目管理 
    + [start with gradle](https://www.jetbrains.com/help/idea/getting-started-with-gradle.html#add_code)
    + [intall intellij idea on ubuntu](https://linuxhint.com/install-intellij-idea-on-ubuntu-20-04/)

--- 
# configure class path in VSCode:
左下java projects --> 点击... --> configure class path

之后cd到指定的class path, 再用javac 和java来编译运行program

[VSCode document：java project manager](https://code.visualstudio.com/docs/java/java-project)

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


