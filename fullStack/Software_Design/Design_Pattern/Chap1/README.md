设计模式中的七大设计原则
05-22

# 1. 七大设计原则概述

设计模式的目的:
编写软件过程中，程序员面临着来自 耦合性，内聚性以及可维护性，可扩展性，重用性，灵活性 等多方面的挑战，设计模式是为了让程序(软件)，具有更好的

+ 代码重用性 
   + 相同功能的代码，不用多次编写
+ 可读性
  + 编程规范性,便于其他程序员的阅读和理解
+ 可扩展性 
  + 当需要增加新的功能时，非常的方便，称为可维护
+ 可靠性 
  + 当我们增加新的功能后，对原来的功能没有影响
+ 根本目的是最终使程序呈现**高内聚，低耦合**的特性

SOLID 原则



# 2. 设计模式七大原则

七大原则作为23种设计模式的指导思想




## 2.1 单一职责原则 (Single Responsibility Principle)
06-07

对类来说的，即一个类应该只负责一项职责。如类A负责两个不同职责:职责1，职责2。 当职责1需求变更而改变A时，可能造成职责2执行错误，所以需要将类A的粒度分解为 A1，A2



### case study

方式一 不遵守单一职责原则

```java
public class SingleResponsibility1 {
    public static void main(String[] args) {
        Vehicle vehicle = new Vehicle();
        vehicle.run("motor cycle");
        vehicle.run("car");

        vehicle.run("plane");
    }
}

// 交通工具类
// 方式一:
// 1. 在方式一的run()方法中, 违反了单一职责原则
// 2. 解决方案: 根据交通工具运行的方式不同, 将Vehicle分解为不同的类
class Vehicle{
    public void run(String vehicle){
        System.out.println(vehicle + "runs on the road");
    }

}
```

方式二 严格遵守单一职责原则

```java
public class SingleResponsibility2 {

    public static void main(String[] args) {
        RoadVehicle roadVehicle = new RoadVehicle();
        roadVehicle.run("motor cycle");
        roadVehicle.run("car");

        AirVehicle airVehicle = new AirVehicle();
        airVehicle.run("plane");
    }
}

/**
 * 分析:
 * 方案二遵守了单一职责原则
 * 但是这样做的改动很大, 即需要将类分解, 同时修改客户端
 * 改进: 直接修改Vehicle类, 改动的代码比较少
 *
 */

class RoadVehicle{
    public void run(String vehicle){
        System.out.println(vehicle + " runs on the road");
    }
}


class AirVehicle{
    public void run(String vehicle){
        System.out.println(vehicle + " flies in the air");
    }
}

class WaterVehicle{
    public void run(String vehicle){
        System.out.println(vehicle + " runs on the water");
    }
}
```

方式三 部分遵守单一职责原则

```java
public class SingleResponsibility3 {
    public static void main(String[] args) {
        Vehicle2 vehicle2 = new Vehicle2();
        vehicle2.run("car");
        vehicle2.runAir("plane");
        vehicle2.runWater("ship");
    }
}

/**
 * 方式三的分析:
 * 1. 这种修改方法没有对原来的类做大的修改, 只是增加了方法
 * 2. 这里虽然没有在类的级别上遵守单一职责原则, 但是在方法级别上, 仍然是遵守了单一职责原则
 */

class Vehicle2{
    public void run(String vehicle){
        System.out.println(vehicle + "runs on the road");
    }

    public void runAir(String vehicle){
        System.out.println(vehicle + "runs in the air");
    }

    public void runWater(String vehicle){
        System.out.println(vehicle + "runs on the water");
    }
}
```



### 单一职责原则总结

1. 降低类的复杂度，一个类只负责一项职责。

2. 提高类的可读性，可维护性

3. 降低变更引起的风险

4. 通常情况下，我们应当遵守单一职责原则

   + 只有逻辑足够简单，才可以在代码级违反单一职责原则 (换句话说, 逻辑越是复杂的代码, 越应该遵守单一职责原则)

   + 只有类中方法数量足够少，可以在方法级别保持单一职责原则 (换句话说, 如果类中方法众多, 你还是得把这个类拆成好几个类来使得每个类中的方法足够少, 使其能够在方法级别保持单一职责原则.)




## 2.2 接口隔离原则 (Interface Segregation Principle)
08-10

该看这个了





## 2.3 依赖倒转原则 (Dependency Inversion Principle)
11-13





## 2.4 里氏替换原则 (Liskov Substitution Principle)
14-15





## 2.5 开闭原则 (Open Close Principle)
16-18






## 2.6 迪米特原则 (Demeter Principle)
19-21






## 2.7 合成复用原则 (Composite Reuse Principle)
22