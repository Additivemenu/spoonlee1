:computer: [尚硅谷第15章: Java反射 634-663 ](https://www.bilibili.com/video/BV1Kb411W75N?p=636&vd_source=c6866d088ad067762877e4b6b23ab9df)

---
框架里面大量用到反射, 对于这个章节, 先会写代码再去理解

# 1. Java反射机制概述 --- 准动态语言特性

634

**Reflection**(反射)是被视为*<u>动态语言</u>*的关键，反射机制允许程序<u>**在运行时**</u>借助于**Reflection API**取得任何类的内部信息，并能直接操作任意对象的内部属性及方法.

加载完类之后，在堆内存的方法区中就产生了一个Class类型的对象(一个 类只有一个Class对象)，这个对象就包含了完整的类的结构信息。我们可 以通过这个对象看到类的结构。这个对象就像一面镜子，透过这个镜子看 到类的结构，所以，我们形象的称之为: 反射.

正常方式: `import package` ---> `class: new constructor()` ----> `get instance`

反射方式: `instance`  ---> `getClass()`  ---> `get pacakge name`

 

Java反射机制提供的功能: 

+ 在运行时判断任意一个对象所属的类

+ 在运行时构造任意一个类的对象 

+ 在运行时判断任意一个类所具有的成员变量和方法 

+ 在运行时获取泛型信息 

+ 在运行时调用任意一个对象的成员变量和方法 

+ 在运行时处理注解

+ 生成动态代理 (Spring中会重点讲解)



反射相关的主要API

+ java.lang.Class:代表一个类
+ java.lang.reflect.Method:代表类的方法
+ java.lang.reflect.Field:代表类的成员变量
+ java.lang.reflect.Constructor:代表类的构造器	



---

1. **动态语言** 是一类在运行时可以改变其结构的语言:例如新的函数、对象、甚至代码可以
    被引进，已有的函数可以被删除或是其他结构上的变化。通俗点说就是在运 行时代码可以根据某些条件改变自身结构。 

  主要动态语言:Object-C、C#、JavaScript、PHP、Python、Erlang。

2. **静态语言** 与动态语言相对应的，运行时结构不可变的语言就是静态语言。如Java、C、 C++。

    :bangbang: Java不是动态语言，但Java可以称之为“准动态语言”。即Java有一定的动态性，我们可以利用反射机制、字节码操作获得类似动态语言的特性。 Java的动态性让编程的时候更加灵活!




# 2. :full_moon: 理解Class类并获取Class实例

635-









# 3. 类的加载与ClassLoader的理解

642-









# 4. :full_moon: 创建运行时类的对象

645-







# 5. 获取运行时类的完整结构

647-





# 6. :full_moon: 调用运行时类的指定结构

654-





# 7. 反射的应用: 动态代理

660-

后面讲Spring时会再次讲解
