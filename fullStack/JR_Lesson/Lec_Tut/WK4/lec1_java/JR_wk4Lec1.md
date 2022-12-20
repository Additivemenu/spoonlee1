java basics

# Exception handling PPT 6min-26min
+ 商业级项目中, exception handling可能达到40%以上

:gem: problem within e.g. https://docs.oracle.com/javase/tutorial/essential/exceptions/tryResourceClose.html

+ 如果br.close() throws IOException, 那么fr.close()可能无法被执行到, fr有可能被泄露
  + effective java item9: Prefer try-with-resources to try-finally


Throwable类: Error, Exception两个子类
+ RuntimeException: 不必捕获
+ checked Exception: 必须做exception handing
  + 如 IOException, ClassNotFoundException 

做正确的Exception handing1234
+ 核心是: 在合适的层级处理异常. 多写代码, 慢慢体会吧

# Log (日志) 26min-
> javaCore1 chap7

+ In production, do not use System.out as log tool
+ Use log configuration 
  + suggest to use slf4j 

# OOP 36min-
这些八股记住, 面试有可能会问

克制使用inheritance

# Abstract class and interface 48min-
> 作业: abstract class vs. interface

functional interface
```java
@FunctionalInterface
public interface Foo {
  String method(String string);
}
private String add(String string, Foo foo) {
  return foo.method(string);
}
public String tryFunction() {
  Foo foo = parameter -> parameter + " from lambda";
  return add("Message", foo);
}
```

+ `Predicate` https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/function/Predicate.html

e.g. person class
+ `Supplier` functional interface
+ `Consumer` functional interface
+ `Function` functional interface  docs.oracle.com自己查
+ `BiFunction`


# Tips 1h07min-
Effective Java: item17, 18, 59

# unit test 1h13min-1h37min
为什么unit test?
- 保证代码质量, 但也不能100%保证没有bug, 还有另外的test
- 方便代码重构

图解释 https://www.youtube.com/watch?v=URSWYvyc42M
+ query: e.g. get()
+ command: e.g. set()

# SOLID principles 1h37min-
背下来, 需要一个过程来理解
+ single responsibility
+ Open/closed
+ Liskov substitution
+ Interface segregation 
+ Dependency inversion

# practice 1h42min-
作业的common issues

refactoring Bottles.java code
+ 用IntStream来写verses()

2h15min-