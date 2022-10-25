# 1. Introduction to generics and generic classes

[Tutorial: geeksforgeeks](https://www.geeksforgeeks.org/generics-in-java/)

and 3 demo on Ed

[Demo: unit hospital](UniMelb/GameHospital/GameProgram.java)

## 1.1 why generics
Beginning with version 5.0, Java allows class and method definitions that include parameters for types. Such definitions are called generics. 

Generic programming with a type parameter enables code to be written that applies to any class.

## 1.2 example: T
```java
class SampleInteger {
    private Integer data;

    public void setData (Integer newData) {
        data = newData;
    }

    public Integer getData () {
        return data;
    }
}
```

```java
class SampleDouble {
    private Double data;

    public void setData (Double newData) {
        data = newData;
    }

    public Double getData () {
        return data;
    }
}
```

Imagine we wanted to do the same thing again with Byte, Short, Long etc..  Then imagine that we want to modify a method.   We would have to make changes in many parts of the code.  We might even forget some, leading to inconsistent behaviour between different classes.

We can avoid this by writing the code once, and letting the compiler make multiple versions for us.  That is what generics do.  Here is a generic class that replaces the two above classes.

```java
class Sample<T> {
    private T data;

    public void setData (T newData) {
        data = newData;
    }

    public T getData () {
        return data;
    }
}
```

Here, T is a parameter for a type, and <T> tells the compiler that this is a generic method, parameterized by type T.

## 1.3 Generic class and method

**Generic classes and methods** have a **type parameter** (a.k.a type variable).  

A **type parameter** can have any reference type (i.e., any class type) plugged in for the type parameter. When a specific type is plugged in, this produces a specific class type or method.

> Traditionally, a single uppercase letter is used for a type parameter, but any non-keyword identifier may be used.
> Conventional choices are
> + E: Element (e.g., ArrayList)
> + K: Key (e.g., HashMap<K, V>)
> + V: Value
> + N: Number
> + T: Type
> + S, U, V, and so on: Second, third, and fourth types

A class that is defined with a parameter for a type is called a **generic class** or a **parameterized class**.

The type parameter is included in angle brackets after the class name in the class definition heading.

The type parameter can be used like other types used in the definition of a class (e.g., instance variable declarations, method parameters).

## 1.4 Instantiation
A class definition with a type parameter is stored in a file and compiled just like any other class.

Once a parameterized class is compiled, it can be used like any other class. However, the class type plugged in for the type parameter must be specified before it can be used in a program. Doing this is said to instantiate the generic class. For instance:

```java
Sample<Double> object = new Sample<Double>();
```

> Tip:  There are many pitfalls that can be encountered  when using type parameters.
> Compiling with the -Xlint option will provide more informative diagnostics of any problems or potential problems in the code, including warnings
> ```shell
> javac –Xlint Sample.java
> ```

# 2. Pitfalls of type parameter
+ A Type Parameter Cannot Be Used Everywhere a Type Name Can Be Used

    Within the definition of a parameterized class definition, there are places where an ordinary class name would be allowed, but a type parameter is not allowed.

    In particular, **the type parameter cannot be used in simple expressions using new to create a new object.**

    For instance, the type parameter cannot be used as a constructor name or like a constructor:
    ```java
    T object = new T();
    T[] a = new T[10];
    ```

    [Resource: generic array](https://www.baeldung.com/java-generic-array)
    [Resource: generic array2](https://www.softwaretestinghelp.com/java-generic-array/)

+ An Instantiation of a Generic Class Cannot be an Array Base Type
    Arrays such as the following are illegal:
    ```java
    Pair<String>[] a = new Pair<String>[10];
    ```
    Although this is a reasonable thing to want to do, it is not allowed because of the way that Java implements generic classes.

    However, we can store these types in a generic Object array.  When retrieving them, we must cast them back to the desired type:
    ```java
    Object[] a = new Object [10];
    a[0] = new Pair<String>(10, 20);
    Pair<String> c = (Pair<String>) a[0];
    ```

+ A Generic Class Cannot Be an Exception Class
    It is not permitted to create a generic class with Exception, Error, Throwable, or any descendent class of Throwable.

    A generic class cannot be created whose objects are throwable:
    ```java
    public class GEx<T> extends Exception
    ```
    The above example will generate a compiler error message.


# 3. Multiple type parameters
A generic class definition can have any number of type parameters.

Multiple type parameters are listed in angle brackets just as in the single type parameter case, but are separated by commas.  In this case, the rule of single-letter parameters is frequently broken; different types represented by the same letter are distinguished by a digit after the letter.

```java
public class TwoTypePair<T1, T2> {
    private T1 first;
    private T2 second;

    public TwoTypePair() {
        first = null;
        second = null;
    }

    public TwoTypePair(T1 firstItem, T2 secondItem) {
        first = firstItem;
        second = secondItem;
    }

    public void setFirst(T1 newFirst) {
        first = newFirst;
    }

    public void setSecond(T2 newSecond) {
        second = newSecond;
    }

    public T1 getFirst () {
        return first;
    }

    public T2 getSecond () {
        return second;
    }

    public String toString () {
        return ("first: " + first.toString() + "\n"
              + "second: " + second.toString());
    }

    public boolean equals (Object otherObject) {
        if (otherObject == null
                || getClass() != otherObject.getClass()) {
            return false;
        } else {
            TwoTypePair<t1, T2> otherPair =
                (TwoTypePair<T1, T2>)otherObject;
                    // The first  equals is the equals of T1.
                    // The second equals is the equals of T2.
            return (first.equals(otherPair.first)
                 && second.equals(otherPair.second));
        }
    }
}
```

# 4. Bounds for type parameters

即限定type parameters的作用范围

Sometimes it makes sense to restrict the possible types that can be plugged in for a type parameter T.

For instance, to ensure that only classes that implement the Comparable interface are plugged in for T, define a class as follows:
```java
public class RClass<T extends Comparable>
```
"extends Comparable" serves as a bound on the type parameter T. Any attempt to plug in a type for T which does not implement the Comparable interface will result in a compiler error message.


A bound on a type may be a class name (rather than an interface name). Then only descendent classes of the bounding class may be plugged in for the type parameters

```java
public class ExClass<T extends Class1>
```

A bounds expression may contain multiple interfaces and up to one class (just the same as a class can implement multiple interfaces and extend up to one class).

If there is more than one type parameter, the syntax is as follows:
```java
public class Two<T1 extends Class1, T2 extends Class2 & Comparable>
```

```java
public class Pair<T extends Comparable> {
    private T first;
    private T second;

    public T max() {
        if (first.compareTo(second) <= 0) {
            return first;
        else
            return second;
        }
    }
}
```

Tip: Generic interfaces
An interface can have one or more type parameters.

The details and notation are the same as they are for classes with type parameters.

# 5. Generic methods (advanced)
When a generic class is defined, the type parameter can be used in the definitions of the methods for that generic class.

In addition, a **generic method** can be defined that has its own type parameter that is not the type parameter of any class.

A generic method can be a member of an ordinary class or a member of a generic class that has some other type parameter. The type parameter of a generic method is local to that method, not to the class.

The type parameter must be placed (in angle brackets) after all the modifiers, and before the returned type
```java
public static <T> T genMethod(T[] a)
```

When one of these generic methods is invoked, the method name is prefaced with the type to be plugged in, enclosed in angle brackets.

```java
String s = NonG.<String>genMethod(c);
```

```java
public class Utility {
    public static <T> T getMidPoint(T[] a) {
        return a[a.length/2];
    }

    public static <T> T getFirst(T[] a) {
        return a[0];
    }

    public static <T1, T2> boolean isSameClass(T1 a, T2 b) {
        return (a.getClass() == b.getClass());
    }
}
```

# 6. Inheritance with generic classes
A generic class can be defined as a derived class of an ordinary class or of another generic class.

As in ordinary classes, an object of the subclass type would also be of the superclass type.