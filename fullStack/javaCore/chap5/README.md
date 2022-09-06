UniMelb Java

# inheritance
Inheritance is the process by which a new class is created from another class.

+ The new class is called a derived/child/sub class
+ The original class is called the base/parent/super class

A derived class automatically has all the instance variables and methods that the base class has (except those with private or package scope), and it can have additional methods and/or instance variables as well.

![](Src/employee_hier.png)

```java
    class Employee { // base class
        int employeeNumber;
    }

    class HourlyEmmployee extends Employee { // derived class
        double hourlyRate;
    }
```

2. Overriding a method definition

    Overriding a method is much more powerful than just defining a new method.  It can also change the behaviour of other methods that haven't been overridden.  This is called **polymorphism**, and will be discussed more later in this lesson.

   ```java
        class Main {
        void sayHello () {
            System.out.println("Hello, World!");
        }

        void sayHelloHello () {
            sayHello();
            sayHello();
            System.out.println();
        }

        static public void main (String[] args) {
            new Main   ().sayHelloHello();
            new Chinese().sayHelloHello(); 

            Main zh = new Chinese();
            zh.sayHelloHello(); 
        }
    }

    class Chinese extends Main {
        @Override
        void sayHello () {
            System.out.println("你好、世界!");
        }
    }
   ```
    Results
   ```shell
    Hello, World!
    Hello, World!

    你好、世界!
    你好、世界!

    你好、世界!
    你好、世界!
   ```

    In the above example, the function sayHelloHello called the function sayHello.  When the derived class overrode sayHello, it changed the behaviour of sayHelloHello, because the overridden form was called instead.

    **This allows the base class to describe a general procedure for doing things, and the derived classes to specify details that are different for different cases.**

3. Pitfall: Overriding vs Overloading

    + **Overridden**: the new method definition given in the derived class has the same "signature".  That is, the exact same number and types of parameters as in the base class.

    + **Overloading**: When a method in a derived class has a different signature from the method in the base class
      + Note that when the derived class overloads the original method, it still inherits the original method from the base class as well.
  
    ```java
        class Main {
            public static void main (String[] args) {
            }
        }

        class Child extends Main {
            public static void main (String[] args) {
                // This overrides the main class
            }

            public static void main (int i) {
                // This overloads main
            }
        }
    ```

4. Multiple types and permissions