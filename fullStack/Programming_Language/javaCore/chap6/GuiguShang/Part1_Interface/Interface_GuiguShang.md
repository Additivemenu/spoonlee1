Interface

:computer: [尚硅谷: 抽象类 341-347](https://www.bilibili.com/video/BV1Kb411W75N?p=343&vd_source=c6866d088ad067762877e4b6b23ab9df)

:computer: [尚硅谷: 接口 348-358 ](https://www.bilibili.com/video/BV1Kb411W75N?p=350&vd_source=c6866d088ad067762877e4b6b23ab9df)

:computer: [尚硅谷: 内部类 359-363](https://www.bilibili.com/video/BV1Kb411W75N?p=361&vd_source=c6866d088ad067762877e4b6b23ab9df)


尚硅谷第6章: 面向对象(下): static, main语法, 代码块, final 以及下面的三个知识点

---

# Part1 Abstract class

用abstract关键字来修饰一个类，这个类叫做抽象类。
+ 用abstract来修饰一个方法，该方法叫做抽象方法。 
+ 抽象方法:只有方法的声明，没有方法的实现。以分号结束:
比如:public abstract void talk();
+ 含有抽象方法的类必须被声明为抽象类。

:bangbang: 注意:
+ **抽象类不能被实例化, 抽象类是用来被<u>继承</u>的**. abstract 与 inheritance, polymorph有着天然的关联性
  + 抽象类的子类必须重 写父类的抽象方法，并提供方法体。若没有重写全部的抽象方法，仍为抽象类。
+ 不能用abstract修饰变量、代码块、构造器
+ 不能用abstract修饰私有方法、静态方法、final的方法、final的类。 原因如下:
  + private method (父类中的抽象方法总是要被其后代重写的， 如果有抽象方法为私有的, 那么后代类就没法重写抽象父类中的抽象方法了, 那抽象方法就失去了它的意义)
  + static method ( A static method belongs to class not to object instance thus it cannot be overridden or implemented in a child class. So there is no use of making a static method as abstract.) "abstract" means: "Implements no functionality", and "static" means: "There is functionality even if you don't have an object instance". And that's a logical contradiction.
  + final class, final method (如果可以修饰, 那当前的抽象类就不能被继承了， 定义抽象类就没有意义了; 抽象类就是鼓励你去提供子类, final class禁止提供子类, abstract与final是死对头 )
+ 抽象类也可以定义构造器, 尽管它自己不能实例化, 但是它的子类可以用super()来调用它的构造器
+ 抽象类中可以没有抽象方法(比如UniMelb Java final project里我们的BaseProgram, 我们只是不想实例化BaseProgram但想让它的子类Program继承它内部的读文件的实现方法), 但抽象方法一定包含在抽象类里





## 抽象类的应用场景

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





抽象性的练习

344

见Practice



## 创建抽象类的匿名子类对象

345

主要为了省事, 抽象类不能实例化, 想要实例化必须实现其中的抽象方法.  我们可以现成地提供抽象类里的抽象方法的实现, 然后实例化它.

```java
public static void main(String[] args) {
    // 创建匿名子类的匿名对象 --------------
    // talk() 和 breath()是抽象类Person中的仅有两个抽象方法
    System.out.println("创建匿名子类的匿名对象 ");
    method1(new Person(){
        @Override
        public void talk() {
          System.out.println("创建匿名子类的匿名对象: I am Iron man!");
        }
        @Override
        public void breath() {
          System.out.println("创建匿名子类的匿名对象: take a deep breath");
        }
    });
}

public static void method1(Person p){
        p.breath();
        p.eat();
        p.walk();
        p.talk();
}
```







## 模版方法的设计模式及应用场景

346

多态的应用:模板方法设计模式(TemplateMethod)

+ 当功能内部一部分实现是确定的，一部分实现是不确定的。这时可以 把不确定的部分暴露出去，让子类去实现。

+ 换句话说，在软件开发中实现一个算法时，整体步骤很**<u>*固定、通用*</u>**， 这些步骤已经在父类中写好了。但是某些部分***<u>易变</u>***，**易变部分可以抽象出来**，供不同子类实现.  这就是一种模板模式。

:gem: demo:

```java
abstract class Template{

    // 计算某段代码执行所需要花费的时间
    // 利用到模版方法的设计模式
    public void  spendTime(){
        long start = System.currentTimeMillis();

        code();     // ********不确定的, 易变的部分, 钩子方法, 哪个子类调用, 就使用哪个子类重写的方法*********

        long end = System.currentTimeMillis();

        System.out.println("time spent is "+ (end - start));
    }
  
    public abstract void code();
}

class SubTemplate extends Template{
    @Override
    public void code(){
        // 求1000 以内所有的质数
        for(int i = 2; i <= 1000; i++){
            boolean isFlag = true;
            for(int j = 2; j <= Math.sqrt(i); j++){
                if(i % j == 0){
                    isFlag = false;
                    break;
                }
            }

            if(isFlag){
                System.out.println(i);
            }
        }
    }
}
```



模板方法设计模式是编程中经常用得到的模式。各个框架、类库中都有他的 影子，比如常见的有:

+ 数据库访问的封装
+ Junit单元测试 

+ JavaWeb的Servlet中关于doGet/doPost方法调用  Hibernate中模板程序
+ Spring中JDBCTemlate、HibernateTemplate等



:gem: 抽象类课后练习

见 Intellij package: practice2







# Part2 Interface

348 













# Part3 Inner class
359

开发中用的相对较少, 了解即可