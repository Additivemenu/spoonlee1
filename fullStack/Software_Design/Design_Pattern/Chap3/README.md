创建型模式: 如何创建对象




# 1. :full_moon: 单例模式 (Singleton)
28-38

所谓类的单例设计模式，就是采取一定的方法保证在整个的软件系统中，对某个类只能存在一个对象实例，并且该类只提供一个取得其对象实例的方法(静态方法)。

> 比如Hibernate的SessionFactory，它充当数据存储源的代理，并负责创建Session 对象。SessionFactory并不是轻量级的，一般情况下，一个项目通常只需要一个 SessionFactory就够，这是就会使用到单例模式。



单例模式有8种方式

1. 饿汉式(静态常量)
2. 饿汉式(静态代码块)
3. 懒汉式(线程不安全)
4. 懒汉式(线程安全，同步方法) 
5. 懒汉式(线程安全，同步代码块) 
6. 双重检查
7. 静态内部类
8. 枚举



## 1.1 饿汉式

### 静态常量

29

步骤如下:

1) 构造器私有化 (防止外部可以 new )
2) 类的内部创建私有的自身的对象
3) 向外暴露一个静态的公共方法 getInstance( )

```java
public class SingletonTest01 {

    public static void main(String[] args) {
        Singleton instance = Singleton.getInstance();
        Singleton instance1 = Singleton.getInstance();

        System.out.println(instance == instance1);      // true
        System.out.println("instance.hashCOde = " + instance.hashCode());
        System.out.println("instance1.hashCOde = " + instance1.hashCode());
    }
}

// 饿汉式 (静态变量)
class Singleton{
    // step1: 构造器私有化, 外部不能new
    private Singleton(){

    }

    // step2: 本类内部创建对象实例
    private final static Singleton instance = new Singleton();

    // step3: 对外提供一个公有的静态方法, 返回实例对象
    public static Singleton getInstance(){
        return instance;
    }
}
```



优缺点说明:

1. 优点:这种写法比较简单，就是在类装载的时候就完成实例化。避免了线程同 步问题。
2. 缺点:在类装载的时候就完成实例化，没有达到Lazy Loading的效果。如果从始至终从未使用过这个实例，则会造成内存的浪费
3. 这种方式基于classloder机制避免了多线程的同步问题，不过，instance在类装载时就实例化，在单例模式中大多数都是调用getInstance方法， 但是导致类装载的原因有很多种，因此不能确定有其他的方式(或者其他的静态方法)导致类 装载，这时候初始化instance就没有达到lazy loading的效果

结论: 这种单例模式可用，可能造成内存浪费





### 静态代码块

30

```java
public class SingletonTest02 {

    public static void main(String[] args) {
        Singleton instance = Singleton.getInstance();
        Singleton instance1 = Singleton.getInstance();

        System.out.println(instance == instance1);      // true
        System.out.println("instance.hashCOde = " + instance.hashCode());
        System.out.println("instance1.hashCOde = " + instance1.hashCode());
    }
}

// 饿汉式 (静态代码块)
class Singleton{
    // step1: 构造器私有化, 外部不能new
    private Singleton(){

    }

    // step2: 本类内部创建对象实例
    private static Singleton instance;
    // 在静态代码块中创建单例对象
    static {
        instance = new Singleton();
    }

    // step3: 对外提供一个公有的静态方法, 返回实例对象
    public static Singleton getInstance(){
        return instance;
    }
}
```

优缺点说明:

这种方式和上面的方式其实类似，只不过将类实例化的过程放在了静态代码块 中，也是在类装载的时候，就执行静态代码块中的代码，初始化类的实例。优 缺点和上面是一样的。

结论:这种单例模式可用，但是可能造成内存浪费



## 1.2 懒汉式

### 线程不安全



```java
public class SingletonTest03 {
    public static void main(String[] args) {
        System.out.println("lazy mode, 线程不安全");
        Singleton instance = Singleton.getInstance();
        Singleton instance1 = Singleton.getInstance();

        System.out.println(instance == instance1);      // true
        System.out.println("instance.hashCOde = " + instance.hashCode());
        System.out.println("instance1.hashCOde = " + instance1.hashCode());
    }
}

class Singleton{

    private static Singleton instance;
		
  	// 构造器私有化, 外部不能new
    private Singleton(){

   	}

    // 对外提供一个public static method, 当该方法被用到时, 才去创建instance
    // 即懒汉式
    public static Singleton getInstance(){
        if(instance == null){
            instance = new Singleton();
        }
        return instance;
    }

}
```



优缺点说明:

1. 起到了Lazy Loading的效果，但是只能在单线程下使用。
2. 如果在多线程下，一个线程进入了if (singleton == null)判断语句块，还未来得及往下执行，另一个线程也通过了这个判断语句，这时便会产生多个实例。所以 在多线程环境下不可使用这种方式
3. 结论:在实际开发中，不要使用这种方式.



### 线程安全, 同步方法

32

```java
```

看到这里





### 线程安全, 同步代码块

33





## 1.3 DoubleCheck

34



## 1.4 静态内部类

35



## 1.5 枚举

36






# 2. :moon: 工厂方法模式 (Factory Method)
39-44

## 简单工厂模式





## 工厂方法模式






# 3. 抽象工厂模式 (Abstract Factory)
45-48






# 4. 原型模式 (Prototype)
49-54





# 5. :moon: 建造者模式 (Builder)
55-59