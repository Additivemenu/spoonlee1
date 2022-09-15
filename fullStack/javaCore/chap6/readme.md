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

