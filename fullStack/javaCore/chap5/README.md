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
    1. An object of a derived class has multiple types. It has the type of the derived class, but it also has the type of the base class -- and all ancestor classes.

        ```JAVA
        class Main {
            public static void main (String[] args) {
                Main var = new Child (); // In particular, it can be assigned to a variable of any of its ancestor classes.
            }
        }

        class Child extends Main {
        }
        ```

    2. That is the motivation for **covariant return types** introduced in Java 5.0.

    + If a method returns a primitive type (int, double, ...) or an array, then the overriding method must return the same type.

    + However, if the return type is a class type, then the returned type may be changed to that of any descendant class of the return type. (The reason for it to be a descendant is so that code written for the original function will still receive an object of a type it can handle.)
    
        ```JAVA
        // An example of covariant return types is:

        public class BaseClass {
            // method in base class
            public Employee getSomeone (int someKey) {

            }
        }

        class DerivedClass extends BaseClass {
            // overridden method
            public HourlyEmployee getSomeone(int SomeKey) {

            }
        }
        ```

    3. Changing the access Permission of an Overridden Method

        即如果ancestor class的一个方法是permissive的, 其子代class的对应overridden method也应该是permissive的

        + The access permission of an overridden method can be changed from, say, protected in the base class to public (or some other more permissive access) in the derived class.

        + However, the access permission of an overridden method must be at least as accessible as method in the base class.  Again, this is so that any code written for the base class can still be used with the derived class.

        Example:
        ```java
        // Given the following method header in a base case:
        protected void doSomething()

        // The following method header is valid in a derived class:
        public void doSomething()

        // However, the opposite is not valid------------------------------------
        // Given the following method header in a base case:
        public void doSomething()

        // The following method header is not valid in a derived class:
        private void doSomething()        // illegal

        ```

5. Preventing overriding and inheritance
   
    + If the modifier **final** is placed before the definition of a **method**, then that method may not be redefined in a derived class.

    + If the modifier **final** is placed before the definition of a **class**, then that class may not be used as a base class to derive other classes.


    ```java
    class Main {
        final static public void main (String[] args) {
        }
    }

    final class Major extends Main {
        static public void main (String[] args) { // error: you cannot overridden a final method
        }
    }

    class Minor extends Major { // error: you cannot extend a fina class

    }
    ```

6. Constructors
    1. The super constructor
        **A derived class uses a constructor from the base class to initialize all the data inherited from the base class.** 因为a derived class的构造器不能访问base class的私有字段.

        In order to invoke a constructor from the base class, it uses a special syntax.  **The parent's class (and in particular, the parent class's constructor) is called "super". You can regard 'super' as the name of parent class, as a constructor has the same name of its class**

        ```java
        public derivedClass(int p1, int p2, double p3)
        {
            super(p1, p2);        // call parent's constructor whose parameters is (int, int)
            instanceVariable = p3;
        }
        ```

        There are some rules that apply to the super constructor:
        + A call to the base class constructor can never use the name of the base class, but uses the keyword super instead

        + A call to super must always be the first action taken in a constructor definition

        + An instance variable cannot be used as an argument to super.

        > Note: If a derived class constructor does not include an invocation of super, then the no-argument constructor of the base class will automatically be invoked.  This can result in an error if the base class has not defined a no-argument constructor. Since the inherited instance variables should be initialized, and the base class constructor is designed to do that, _then an explicit call to super should always be used_.
   2. Using super to access an overridden method
        Within the definition of a method of a derived class, the base class version of an overridden method of the base class can still be invoked.  Simply preface the method name with super and a dot
        ```java
        public String toString()
        {
            return (super.toString() + "$" + wageRate);
        }
        ```

        However, using an object of the derived class outside of its class definition, there is no way to invoke the base class version of an overridden method.

        If you think of super as being the name of the parent class, then this syntax corresponds to the syntax for calling static methods.  Similarly, using super as a constructor corresponds to the fact that a constructor is normally called by the class name.
        
        <br>

        > Note: super这种用法只refer to 上一层parent!  
        > It is only valid to use super to invoke a method from a direct parent.  Repeating super will not invoke a method from some other ancestor class. 
        > For example, if the Employee class were derived from the class Person, and the HourlyEmployee class were derived form the class Employee, it would not be possible to invoke the toString method of the Person class within a method of the HourlyEmployee class
        > ```java
        > super.super.toString() // ILLEGAL!
        > ```

        As explained at [super](https://www.geeksforgeeks.org/accessing-grandparents-member-in-java-using-super/), using super within an overriding method effectively bypasses the behaviour of the class you are defining, which is up to you.  However, you shouldn't be allowed to bypass the behaviour of the class you are derived from.  For example, the implementer of that class should be able to derive it from a different base class.
        
        :question:???what???

    3. The this constructor
        Within the definition of a constructor for a class, ==this== can be used as a name for invoking another constructor **in the same class**. The same restrictions on how to use a call to super apply to the this constructor. 在这里可以把this当作derived class name, 毕竟constructor和class同名.

        <br>

        If it is necessary to include a call to both super and this, the call using this must be made first, and then the constructor that is called must call super as its first action: 
   
        ```java
        // base class =========================================
        class Main { 
            // field-----------------------------------
            int value;

            // constructor-----------------------------
            Main () {
                
            }

            // methods---------------------------------
            static public void main (String[] args) {
            }
        }

        // derived class =======================================
        class Child extends Main {
            // fields-------------------------------
            int another;

            // Constructor--------------------------
            // Explicit-value constructor---
            Child (int i) {
                super(); // call Main()
                another = i;
            }

            // Non-argument constructor---
            Child () {
                // the call using this must be made first
                this(1);  // call Child(int)
            }
        }
        ```

        <br>
  
        Often, a no-argument constructor uses this to invoke an explicit-value constructor.

        ```java
        // No-argument constructor (invokes explicit-value constructor using this and default arguments):
        public HourlyEmployee()
        {
            this("No name", new Date(), 0, 0); // calls below explicit-value constructor
        }
        // Explicit-value constructor (receives default values):
        public HourlyEmployee(String theName, Date theDate, double theWageRate, double theHours){
            ...
        }

        ```

7. Practice
    [Demo: Enhanced String Tokenizer](UniMelb/EnhancedStringTokenizer.java)