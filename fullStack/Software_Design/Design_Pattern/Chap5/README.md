行为型模式: 类或对象如何交互, 如何划分职责, 从而更好地完成任务




# 1. :moon: 模版方法模式 (Template Method)
96-100

UniMelb week 10 https://refactoring.guru/design-patterns/template-method



# 2. 命令模式 (Command)
101-105


# 3. 访问者模式 (Visitor)
106-110

# 4. :moon: 迭代器模式 (Iterator)
111-116

# 5. :moon: 观察者模式 (Observer)
117-122

UniMelb week 10 https://refactoring.guru/design-patterns/observer



# 6. 中介者模式 (Mediator)
123-126 

# 7. 备忘录模式 (Memento)
127-130

# 8. 解释器模式 (Interpreter)
131-135

# 9. 状态模式 (State)
136-139

# 10. :moon: 策略模式 (Strategy)
140-144

UniMelb week10 https://refactoring.guru/design-patterns/strategy





鸭子问题

编写鸭子项目，具体要求如下:

1) 有各种鸭子(比如 野鸭、北京鸭、水鸭等， 鸭子有各种行为，比如 叫、飞行等) 
2) 显示鸭子的信息



传统实现方式: 继承 + 重写方法

<img src="./Src_md/strategy1.png" style="zoom:50%;" />



传统的方式实现的问题分析和解决方案

1) 其它鸭子，都继承了Duck类，所以fly让所有子类都会飞了，这是不正确的, 比如ToyDuck并不会飞
2) 上面说的1的问题，其实是继承带来的问题:对类的局部改动，尤其超类的局部改动，会影响其他部分。会有溢出效应

3) 为了改进1问题，我们可以通过覆盖fly方法来解决=>覆盖解决
4) 问题又来了，如果我们有一个玩具鸭子ToyDuck, 这样就需要ToyDuck去覆盖Duck的所有实现的方法 => 解决思路 策略模式 (strategy pattern)



## 基本介绍

+ 策略模式(Strategy Pattern)中，定义算法族，分别封装起来，让他们之间可以 互相替换，此模式让算法的变化独立于使用算法的客户

+ 这算法体现了几个设计原则，
  + 把变化的代码从不变的代码中分离出来; 
  + `面向接口编程`而不是面向具体类(定义了策略接口);
  + 多用组合/聚合， 少用继承(客户通过组合方式使用策略)。



<img src="./Src_md/strategy2.png" style="zoom:50%;" />

说明:从上图可以看到，客户context 有成员变量strategy或者其他的策略接口 ,至于需要使用到哪个策略，我们可以在构造器中指定.



## 代码实现

142

该看这个了





## ArrayList 源码







# 11. :moon: 责任链模式 (Chain of Responsibility)
145-149













