# 0. Overview
These are personal notes referring to UniMelb Java week 8 learning materials

# 1. Introduction to exception handling
 
Java exception handling facilities are used when the invocation of a method may cause something exceptional to occur.

**Throwing an exception:** Java library software (or programmer-defined code) provides a mechanism that signals when something unusual happens.  
**Handling the exception:** In another place in the program, the programmer must provide code that deals with the exceptional case.  

# 2. try-throw-catch
 The basic way of handling exceptions in Java consists of the try-catch mechanism. 
 

## 2.1 try

The try block contains the code for the basic algorithm.  It tells what to do when everything goes smoothly.  It can also contain code that throws an exception if something unusual happens, and is caught by the catch block.

### :full_moon:2.1.1 try-throw-catch mechanism 
 
When a try block is executed, either one of below cases can happen:

1. No exception is thrown in the try block.
– The code in the try block is executed to the end of the block
– The catch block is skipped
– The execution continues with the code placed after the catch block

2. An exception is thrown in the try block and caught in the catch block
– The rest of the code in the try block is skipped
– Control is transferred to a following catch block (in simple cases)
– The thrown object is plugged in for the catch block parameter (see 2.3)
– The code in the catch block is executed
– The code that follows that catch block is executed (if any)


## 2.2 catch

The code inside the try block is executed as normal.  If something goes wrong in any of the standard library methods inside the block, an exception will be generated.  _When this happens, the execution of the try block stops, and the catch block is executed._  

The variable e contains information about the error that occurred. This e is called the **catch block parameter**.  It does two things: 
+ It specifies the type of thrown exception object that the catch block can catch (e.g., an Exception class object above).

+ It provides a name (for the thrown object that is caught) on which it can operate in the catch block. Note: The identifier e is often used by convention, but any non-keyword identifier can be used.

**The catch block has only one parameter.  A catch block looks like a method definition that has _a parameter of type Exception class_, but it is not really a method definition.**

In some cases, it is possible to recover from an exception.  For example, if it was caused by a bad choice by the user then it is possible to ask for another choice.

```java
// demo
class Main {
public static void main (String[] args) {
    // . . . 
    try
    {
        // Something that may fail
    }
    catch(Exception e)  // catch block is actually not a method
    {
        String message = e.getMessage();
        System.out.println("Exception: " + message);
        System.exit(1);
    }
    // ...
}
}
```


## 2.3 throw

Often, you will want to report a problem, even if none of the library routines throws an exception.   This is done by the throw command.

```java
class Main {
    public static void main (String[] args) {
        // . . . 
        try
        {
            //. . .
            throw new Exception("StringArgument"); // When the throw statement occurs, the try block stops.
            //. . .
        }
        catch(Exception e)
        {
            String message = e.getMessage();
            System.out.println(message);
            System.exit(1);
        }
        ///. . .
    }
}
```

:question: only allow 1 throw statement in try block?

**Instead of calling a method, a throw statement calls a catch block. Whenever an exception is thrown, it should ultimately be handled (or caught) by some catch block.**

Recall that the catch block only takes one parameter, typically an Exception. The above code only passes a string to the Exception constructor.  That is enough to print an error message and exit, but not enough to allow the code to try to recover.  Using polymorphism, you can create a class derived from Exception, to contain as much additional information as you like.


### 2.3.1 Using the getMessage Method

Every exception has a String instance variable that contains some message. This string typically identifies the reason for the exception.

In the previous example, "StringArgument" is an argument to the Exception constructor.

This is the string used for the value of the string instance variable of exception e.  Therefore, the method call e.getMessage() returns this string.


# 3. Exception classes

There are more exception classes than just the single class Exception.

+ There are more exception classes in the standard Java libraries

+ New exception classes can be defined like any other class

All predefined exception classes have the following properties:

+ There is a constructor that takes a single argument of type String.

+ The class has an accessor method getMessage that can recover the string given as an argument to the constructor when the exception object was created.

All programmer-defined exception classes must be derived from the class Exception its descendants.

## 3.1 Exception Classes from Standard Packages

### 3.1.1 base exception class
The predefined exception class Exception is the root class for all exceptions. Every exception class is a descendent class of the class Exception.



The class Exception is in the java.lang package, and so requires no import statement.

### 3.1.2 predefined derived exception classes
Numerous predefined exception classes are included in the standard packages that come with Java. For example:

+ IOException

+ NoSuchMethodException

+ FileNotFoundException

Many exception classes must be imported in order to use them.

```shell
import java.io.IOException;
```

## 3.2 Defining Exception Classes

A throw statement can throw an exception object of any exception class.

Instead of using a predefined class, exception classes can be programmer-defined
+ These can be tailored to carry the precise kinds of  information needed in the catch block
+ A different type of exception can be defined to identify each different exceptional situation

Constructors are the most important members to define in an exception class
+ They must behave appropriately with respect to the variables and methods inherited from the base class
+ Often, there are no other members, except those inherited from the base class


The following exception class performs these basic tasks only:

```java
class Main {
    public static void main(String[] args) {
        try{
           double c = 9.0/0; 
           throw new DivisionByZeroException();  // non argument constructor
        }
        catch(DivisionByZeroException e){
            String message = e.getMessage();
            System.out.println(message);
            System.exit(1);
        }
    }
}

class DivisionByZeroException extends Exception {
    public DivisionByZeroException() {
        super("Error: divisor cannot be Zero");
    }

    public DivisionByZeroException(String message) {
        super(message);
    }
}
```

The two most important things about an exception object are 
+ Its type (i.e., exception class) and 
+ The message it carries.
  + The message is sent along with the exception object as an instance variable. Furthermore, this message can be recovered with the accessor method getMessage, so that the catch block can use the message.

### 3.2.1 Programmer-Defined Exception Class Guidelines

A programmer-defined exception class must be a derived class of an already existing exception class.

The exception class should allow for the fact that the method getMessage is inherited.   For all predefined exception classes, getMessage returns the string that is passed to its constructor as an argument, or it will return a default string if no argument is used with the constructor.

At least two constructors should be defined:

+ A constructor that takes a string argument and begins with a call to super, which takes the string argument.

+ A no-argument constructor that includes a call to super with a default string as the argument.

Often more constructors will be provided, to pass additional information. For instance, to take types other than String as the argument.


## 3.3 Other message types

An exception class constructor can be defined that takes an argument of any other type. 

It would store its value in an instance variable.  It would need to define accessor methods for this instance variable.

```java
class Main {
    public static void main(String[] args) {
        
    }
}

class BadNumberException extends Exception {
    private int badNumber;

    // Accessor
    public int getBadNumber () {
        return badNumber;
    }

    // new constructor taking integer ----------------
    public BadNumberException (int number) {
        super("Bad number");
        badNumber = number;   // take other type of argument as instance variable
    }

    // Standard constructors------------------------
    public BadNumberException () {
        super ("Bad number");
        badNumber = -1;
    }

    public BadNumberException (String message) {
        super(message);
        badNumber = -1;
    }

}
```

# 4. Multiple catch block

A try block can potentially throw any number of  exception values, and they can be of differing types.

In any one execution of a try block, at most one exception can be thrown (since a throw statement ends the execution of the try block).  However, different types of exception values can be thrown on different executions of the try block.

Different types of exceptions can be caught by placing more than one catch block after a try block.

Any number of catch blocks can be included, but they must be placed in the correct order. When an exception is thrown in a try block, the catch blocks are examined in order.  The first one that matches the type of the exception thrown is the one that is executed.

> tip: Catch the more specific exception first (i.e., catch a descendant class before an ancestor).

## e.g.

```java
// code with no issues
class Main {
    public static void main (String[] args) {
        try {
            double a = 1.0/0.0;
        }
        catch (ArithmeticException e) {
            System.out.println("Well done");
        }
        catch (Exception e) {
            System.out.println("Try again");
        }
    }
}
```

Because an ArithmeticException is a descendant of Exception, if you place catch (Exception e) before catch(ArithmeticException) in the code, all ArithmeticException will be caught by the first catch block before ever reaching the second block.  The catch block for ArithmeticException will never be used.  (Ed refuses even to compile this code.) So catch the more specific exception first.

# 5. Throwing exceptions from methods
The greatest value of exceptions is when we don't know enough of the context to be able to handle the situation.  For example, if we divide by 0, should we replace the answer by a very large number and continue, or should we tell the calling method to choose a different set of parameters and call again?

Because of this, it is common to want to throw an exception in a method, but not catch it in the same method.

In such cases, the program using the method should enclose the method invocation in a try block, and catch the exception in a catch block that follows.  The method that throws the exception would not surround the throw by try and catch blocks.

## 5.1 Methods throws without catching
However, the method that throws without catching has to include a throws clause in its header (不然编译时会报错), 这是在提示程序员后续代码必须有catch语句来接收被throw的Exception. 

The reason is that, if a method can throw an exception but does not catch it, it must provide a warning to the callers.  The process of including an exception class in a throws clause is called **declaring the exception.** 

```java
class Main {
    // method throws but without catching --> heading: throw Exception
    // the code calling this method must handle Exception threw by this method using catching
    static private int dangerMethod () throws Exception {
        throw new Exception ("Error from dangerMethod");
    }

    // --------------------------------------
    static public void caller () {
        int a;
        try {
            a = dangerMethod ();
        } catch (Exception e) {         // handle Exception threw by dangerMethod with catching
            System.out.println(e.getMessage());
        }
    }

    // ----------------------------------------
    // method throws without catching --> heading: throw Exception
    static public void caller1 () throws Exception {
        int a = dangerMethod ();
    }

    // ==============================================
    static public void main (String[] args) {
        try {
            caller();
        } catch (Exception e) {
            System.out.println ("Main caught from caller");
        }

        try {
            caller1();
        } catch (Exception e) {     // handle Exception threw by caller1() with catching
            System.out.println ("Main caught from caller1");
        }
    }
}
```

In the above example, any method that calls dangerMethod (in this case caller and  caller1) must deal with the exception.  

caller()在自己的函数内部catch了Exception threw by dangerMethod(),
对于caller1()我们则是在主函数中另加了catch来handle Exception threw by dangerMethod(). 但不管怎样, 在代码中, 如果有throw, 就必须要有catch来接盘.

If a method throws an exception and does not catch it, then the method invocation ends immediately. (Well, Almost immediately; we'll meet the finally block in the next slide.)

If a method can throw more than one type of exception, then separate the exception types by commas:

```java
public void aMethod() throws AnException, AnotherException
```

# 6. Advanced topics
...