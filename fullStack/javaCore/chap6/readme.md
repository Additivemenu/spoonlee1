# 1.Interfaces

An interface is essentially a set of methods that a class promises to implement.

It is something like an extreme case of an abstract class. However, an interface is not a class. It is a type that can be satisfied by any class that "implements" the interface (i.e., defines the required methods).

## 1.1 Define an interface

The syntax for defining an interface is similar to that of defining a class, except the word interface is used in place of class.

An interface specifies a set of methods that any class that implements the interface **must** have.

- It contains method headings and constant definitions only.

- It contains no instance variables nor any complete method definitions

> Motivation of using interface
> Note: Some languages (like C++) allow one class to be derived from two or more different base classes. This multiple inheritance is not allowed in Java. Instead, Java's way of approximating multiple inheritance is through interfaces.
>
> Example: Given a base class Vehicle, we may want to make classes AirPlane, Boat and Car. But what if a vehicle is both an airplane and a boat? Instead, we could define interfaces Flyable and Floatable, and create a class like Seaplane which extends Vehicle, but also implements the Flyable and Floatable interfaces.

### Public methods

**An interface and all of its method headings should be declared public: they cannot be given private, protected, or package access.**

When a class implements an interface, it must make all the methods in the interface public (just as a derived class cannot give a more restrictive permission to any overridden method).

Because an interface is a type, a method may be written with a parameter of an interface type. That parameter will accept as an argument an object of any class that implements the interface.

### Example: The Ordered interface

```java
public interface Ordered {
    public boolean precedes (Object other);     // don't forget the semicolon

    /**
     For objects o1 and o2 of the class, we should have
     o1.follows(o2) == o2.precedes(o1)
     However, neither the compiler nor run-time system will ensure this.
     It is only advisory to the programmer implementing the interface.
    */
    public boolean follows (Object other);
}
```

## 1.2 Implementing an interface

To implement an interface, a concrete class (non-abstract class) must do two things:

- It must include the phrase

  ```java
  implements Interface_Name
  ```

  at the start of the class definition. If more than one interface is implemented, each is listed, separated by commas.

- The class **must implement all** the method headings listed in the definition(s) of the interfaces(s).

### e.g.

Note the use of Object as the parameter type in the following examples.

[Demo: implement_interface](UniMelb/implementInterface_eg.java)
