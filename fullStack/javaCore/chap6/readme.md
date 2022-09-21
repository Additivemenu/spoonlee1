# 0. Overview
These are personal notes referring to UniMelb Java Week8 learning material

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
  + Abstract class implementing the interface can just give an abstract method.

### e.g.1

Note the use of Object as the parameter type in the following examples.

[Demo: implement_interface](UniMelb/implementInterface_eg.java)


### 1.2.1 Abstract classes implementing interfaces

+ Abstract classes may implement one or more interfaces.  Any method headings given in the interface that are not given definitions are made into abstract methods.

+ A concrete class must have definitions for all the method headings given in the abstract class and the interface.  Notice in the following example that the concrete class doesn't need to redefine the method precedes, because it is already defined in the abstract class.

[Demo: abstract class implementing interfaces](UniMelb/abstractClass_impleInterf.java)

## 1.3 Derived interface

Like classes, an interface may be derived from a base interface.  This is called extending the interface.  The derived interface must include the phrase
```java
extends BaseInterfaceName
```

A concrete class that implements a derived interface must have definitions for any methods in the derived interface as well as any methods in the base interface.

## 1.4 The comparable interface

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

## 1.5 Defined constants in interfaces

Although an interface cannot contain any member variables, it can contain defined constants in addition to or instead of method headings.

**Any variables defined in an interface must be public, static, and final.** Because this is understood, Java allows these modifiers to be omitted.

Any class that implements the interface has access to these defined constants.

## 1.6 Inconsistent interface