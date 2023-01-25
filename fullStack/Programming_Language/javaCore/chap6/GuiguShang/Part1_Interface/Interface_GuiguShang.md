Interface

:computer: [尚硅谷: 抽象类 341-347](https://www.bilibili.com/video/BV1Kb411W75N?p=343&vd_source=c6866d088ad067762877e4b6b23ab9df)

:computer: [尚硅谷: 接口 348-358 ](https://www.bilibili.com/video/BV1Kb411W75N?p=350&vd_source=c6866d088ad067762877e4b6b23ab9df)

:computer: [尚硅谷: 内部类 359-363](https://www.bilibili.com/video/BV1Kb411W75N?p=361&vd_source=c6866d088ad067762877e4b6b23ab9df)


尚硅谷第6章: 面向对象(下): static, main语法, 代码块, final 以及下面的三个知识点

---

# Abstract class

用abstract关键字来修饰一个类，这个类叫做抽象类。
+ 用abstract来修饰一个方法，该方法叫做抽象方法。 
+ 抽象方法:只有方法的声明，没有方法的实现。以分号结束:
比如:public abstract void talk();
+ 含有抽象方法的类必须被声明为抽象类。

:bangbang: 注意:
+ **抽象类不能被实例化, 抽象类是用来被继承的**
  + 抽象类的子类必须重 写父类的抽象方法，并提供方法体。若没有重写全部的抽象方法，仍为抽象类。
+ 不能用abstract修饰变量、代码块、构造器
+ 不能用abstract修饰私有方法、静态方法、final的方法、final的类。 原因如下:
  + private method (父类中的抽象方法总是要被其后代重写的， 如果有抽象方法为私有的, 那么后代类就没法重写抽象父类中的抽象方法了),
  + static method ( A static method belongs to class not to object instance thus it cannot be overridden or implemented in a child class. So there is no use of making a static method as abstract.) "abstract" means: "Implements no functionality", and "static" means: "There is functionality even if you don't have an object instance". And that's a logical contradiction.
  + final class, final method (如果可以修饰, 那当前的抽象类就不能被继承了， 定义抽象类就没有意义了; 抽象类就是鼓励你去提供子类, final class禁止提供子类, abstract与final是死对头 )

---
抽象的应用场景
Rogue游戏中: 
```java
abstract class Player(
    private int intelligence;
    private int strength;

    public abstract void attack();      // beacuse we don't know specific behaviour of attack at the moment
)

class mage extends Player{
    @Overwrite
    public void attack(){
        System.out.print("attack is " + intelligence);
    }
}

class warrior extends Player{
    @Overwrite
    public void attack(){
        System.out.print("attack is " + strength);
    }
}


```







# Interface





# Inner class
开发中用的相对较少