[TOC]

---

These are personal notes referring to UniMelb Java Week8 learning material

# 1.Interfaces (接口)
在Java中, interface is not class, 而是对希望符合这个Interface的class的**一组需求**. 通常, interface的名字是一个形容词, 如Comparable, Cloneable...表示是否能够实现某种功能, 有时是一个名词, 如Comparator


## 1.1 :moon: interface的性质


An interface specifies a set of methods that any class that implements the interface **must** have.

- **能有的:** 
  - method headings (自动设置为public)
  - constant definitions (自动设置为public static final)
  ```java
  public interface Powered extends Moveable{
    double milesPerGallon();    // method heading
    double SPEED_LIMIT = 95;    // a public static final constants
  }
  ```
- **不能有的:** 
  - any instance variables 
  - any complete method definitions(except default method)

提供实例字段和方法的实现都应该由实现Interface的那个class来完成; 因此可以将interface看作是没有实例字段的abstract class, 但interface不是class, 它们有很重要的区别:
+ 无法使用new来实例化interface
  ```java
    x = new Comparable();    // error
  ```
+ 每个class只能有1个超类, 但是却可以implements多个interface; 这也是为什么我们需要interface的原因, 一个class无法继承多个abstract class
  + C++允许一个class继承多个class, 即multiple inheritance. 但Java则不允许这么做, 因为multiple inheritance会让语言很复杂. 
+ abstract class可以有instance variable和一部分method的实现, 而interface中不能有instance variable和具体的method实现(除了default method)
  ```java
    public interface Comparable<T>{
      default int compareTo(T other){return 0;} // by default, all elements are the same
    }
  ```
---

+ `instanceof` 检查一个对象是否implement某个特定interface
  ```java
  if(anObject instanceof Comparable){...}
  ```
+ interface可以被扩展
  ```java
  public interface Moveable{
    void move (double x, double y);  // only method heading
  }

  public interface Powered extends Moveable{
    double milePerGallon();     // only method heading
  }
  ```


:gem: e.g. The Ordered interface

```java
/**
 For objects o1 and o2 of the class, we should have
  o1.follows(o2) == o2.precedes(o1)
  However, neither the compiler nor run-time system will ensure this.
  It is only advisory to the programmer implementing the interface to make sure that the Object satisfy such property
*/
public interface Ordered {
    public boolean precedes (Object other);     // don't forget the semicolon
    public boolean follows (Object other);
}
```

## 1.2 :full_moon:Implementing an interface

To implement an interface, a concrete class (non-abstract class) must do two things:


为了让某个class实现一个interface:
+ step1: 在class的声明中写上implements interface...
+ step2: 在class中定义具体的interface中提到的**所有**方法

### e.g.1

Note the use of Object as the parameter type in the following examples.

[Demo: implement_interface](UniMelb/implementInterface_eg.java)


### 1.2.1 Abstract classes implementing interfaces

+ Abstract classes may implement one or more interfaces.  Any method headings given in the interface that are not given definitions are made into abstract methods.

+ A concrete class must have definitions for all the method headings given in the abstract class and the interface.  Notice in the following example that the concrete class doesn't need to redefine the method precedes, because it is already defined in the abstract class.

[Demo: abstract class implementing interfaces](UniMelb/abstractClass_impleInterf.java)



## 1.4 The comparable interface

> JavaCore1 p235 待看

即给object排序 (前提是given class implements comparable interface)

The standard way of testing if an object is "less than" an object of the same time is the Comparable interface.

The Comparable interface is in the java.lang package, and so is automatically available to any program. It has only the following method heading that must be implemented:

```sql
public int compareTo(Object other);
```

It is the programmer's responsibility to follow the semantics of the Comparable interface when implementing it.

The method compareTo must return:
+ A negative number if the calling object "comes before" _the parameter other_
+ A zero if the calling object "equals" _the parameter other_
+ A positive number if the calling object "comes after" _the parameter other_
+ If _the parameter other_ is not of the same type as the class being defined, then a ClassCastException should be thrown.

### 1.4.1 Semantics

> The "semantics" of code refers to what the code "means".  It is contrasted with "syntax", which refers to what code is "valid".

The semantics of compareTo are stated above, in terms of "comes before" and "comes after".  But what do these actually mean?

Almost any reasonable notion of "comes before" is acceptable.  For example:

+ the standard less-than relations on numbers (used by types Double, Integer, etc.)

+ lexicographic (词典的) ordering on strings (used by String; as governed by the locale)

+ case-sensitive ordering of strings

+ case-insensitive ordering of strings

+ lexicographic ordering of tuples (元组) (e.g. (A,B) < (C,D) if A<C or (A == C and B < D) )

+ ordering Person by age, or by date of birth, or by surname, or by given name

The relationship "comes after" is just the reverse of "comes before".

### 1.4.2 Example application: sorting

The following example reworks the SelectionSort class from Programming with arrays in week 6 (Chapter 6 of the text book).

The new version, GeneralizedSelectionSort, includes a method that can sort any partially filled array whose base type implements the Comparable interface.  It contains appropriate indexOfSmallest and interchange methods as well.

>Note: both the Double and String classes implement the Comparable interface.  Interfaces apply to classes only.  **A primitive type (e.g., double) cannot implement an interface.**


[Demo: comparable Class](UniMelb/ComparableDemo.java)

The core code in this demo:

```java
if (a[index].compareTo(min) < 0) { // "if a[index] is less than min" , the core of this code!
...
}
```


+ Exercise: Identify where the Comparable interface is important -- either used, or an object implementing that interface is created, if the program actually uses the interface on that object.

+ Excercise: Define a memorySize class that stores a string of the form "<digits><multiplier>", where <digits> is a string consisting of one or more digits in the range 0-9, and <multiplier> is empty, 'k', 'M', 'G', 'T', 'P', 'ki', 'Mi', 'Gi', 'Ti' or 'Pi'.  A multiplier of 'k' multiplies the number represented by <digits> by 1000.  A multiplier of 'ki' multiplies by 1024.  A multiplier of 'M' multiplies by 10^6.  A multiplier of 'Mi' multiplies by (1024)^2 etc..  Define compareTo correctly so that, for example,  1 < 1020k < 1000ki.

  + Use your class to sort    10, 2, 1005, 9k, 8ki, 7M, 6G, 5Mi, 40G.

+ Advanced: Modify memorySize to store not only the string but also the integer represented by the string, so that compareTo can simply compare two integers.  Time the two versions and compare their run times.

+ Exercise: Identify where automatic boxing is used.  Identify where automatic unboxing is used.  Where the  for(...;...;...) form of loops is used, explain why a for-each is not suitable.

### 1.4.3 Example application: searching
It is common to want to find an item in a sorted list.  The most efficient way to do this is a binary search: Check if the item in the middle of the list is greater than or less than the item we are searching for.  If it is less, then we continue searching the right half of the list.  If it is more, we search the left half.  Since this only requires greater-that / less-than / equal to comparison, we can write generic code to search for an item of any class that implements Comparable.

This ability to write generic code is important for writing complex software without having to have very repetitive code, and is one of the strengths of object oriented programming.



## 1.6 :full_moon:Inconsistent interface (interfaces 冲突)

> JavaCore1 P231 解决默认方法冲突 待看

In Java, a class can have only one base class.  This prevents any inconsistencies arising from different definitions having the same method heading.

In addition, a class may implement any number of interfaces.  Since interfaces do not have method bodies, the above problem cannot arise.

### 1.6.1 Problem

However, there are other types of inconsistencies that can arise. When a class implements two interfaces:

+ One type of inconsistency will occur if the interfaces have constants with the same name, but with different values.

+ Another type of inconsistency will occur if the interfaces contain methods with the same name and signature but different return types

If a class definition implements two inconsistent interfaces, then that is an error, and the class definition is illegal.

### 1.6.2 Problem

Another more subtle problem is that both interfaces can have the same method heading but with different intended semantics.

+ For example, a method same can be intended in one interface to return true if two objects have equal value (like equals) and in the other interface be intended to return true if two references refer to the same object (like ==).  A class implementing  boolean same (Object o) will satisfy the required syntax of both interfaces (i.e., it will be legal), but will probably cause unintended behaviour.

+ Alternatively, an interface could capture the idea of partial ordering.  For example, (a,b) < (c,d) if a<c and b<d,  (a,b) > (c,d) if a>c and b>d, but they are "incomparable" otherwise.  If a programmer carelessly required a method compareTo of this class to return 0 for incomparable pairs, then a class implementing both this interface and Comparable would run into trouble in a binary search.  (What trouble?) For this reason, it is good practice not to reuse the names of methods of standard java interfaces.  If in doubt, search the web for the name you are considering and see if you find it in an existing interface.


# 2. lambda
动机: 在java中传递代码块并不是容易的事情, 你不能直接传递代码块. 因为java是面向对象的编程语言, 要想传递代码块, 我们所以必须先构造一个对象, 这个对象的类需要有一个方法包含所需要的代码块.

lambda表达式正是为了能够更方便地传递代码块而被发明的, 它就像函数式变成那样可以使得代码块之后被执行一次或多次. 

基本语法:
像JS中的箭头函数
```java
(para1, para2) -> expressions     // 这个整体我们成为lambda表达式
```

## 2.1 functional interface
对于**只有一个抽象方法(abstract method)**的接口(interface), 需要这种接口的对象时, 可以提供一个lambda表达式. 这种**只有一个抽象方法**的接口成为**函数式接口(functional interface)**


:gem: e.g.1
考虑Arrays.sort(), 它的第二个argument是一个Comparator实例, Comparator就是函数式接口. 所以我们可以提供一个lambda表达式, 更加简洁:

```java
Arrays.sort(words, (first, second) -> first.length()-second.length());
```
**最好把lambda表达式看作一个函数, 而不是一个对象.**

## 2.2 method reference


## 2.3 constructor reference
