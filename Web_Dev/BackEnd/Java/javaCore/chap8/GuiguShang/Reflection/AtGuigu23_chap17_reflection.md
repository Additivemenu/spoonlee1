#  第17章_反射机制

讲师：尚硅谷-宋红康（江湖人称：康师傅）

官网：[http://www.atguigu.com](http://www.atguigu.com/)

:computer: [宋红康2023新版Java： 反射 187-193](https://www.bilibili.com/video/BV1Rx4y1V745?p=187&vd_source=c6866d088ad067762877e4b6b23ab9df)

***

## 本章专题与脉络

![第3阶段：Java高级应用-第17章](images/第3阶段：Java高级应用-第17章.png)

***

## 1. 反射(Reflection)的概念

187

### 1.1 反射的出现背景

Java程序中，所有的对象都有两种类型：`编译时类型`和`运行时类型`，而很多时候对象的编译时类型和运行时类型`不一致`。 e.g.

```java
Object obj = new String("hello");   // 编译时是Object类型, 运行时是String类型

obj.getClass()
```

:gem: e.g. 某些变量或形参的声明类型是Object类型，但是程序却需要调用该对象运行时类型的方法，该方法不是Object中的方法，那么如何解决呢？

解决这个问题，有两种方案：

+ 方案1：polymorphsm downcast ---> 在编译和运行时都完全知道类型的具体信息，在这种情况下，我们可以直接先使用`instanceof`运算符进行判断，再利用强制类型转换符将其转换成运行时类型的变量即可。

+ :star: 方案2：reflection ---> 编译时根本无法预知该对象和类的真实信息，程序只能依靠`运行时信息`来发现该对象和类的真实信息，这就必须使用反射。

  

:gem: 见intellij > class01-reflection-example

```java



```



```java
通过使用反射前后的例子对比, 回答:

1. 面向对象中创建对象, 调用指定的结构(field, method)等功能, 可以用反射也可以不用反射, 区别在哪里?

不使用反射, 我们需要考虑封装性, 出了Person类后， 就不能调用Person类中的private结构
使用反射, 我们可以调用运行时类中的任意构造器, 属性, 方法 (包括private结构)

2. 以前创建对象并调用方法的方式, 与现在学的通过反射创建对象并调用方法的方式对比的话, 哪种用的多？场景是什么?

从我们作为coder开发者的角度来讲, 我们开发中主要是为了完成业务代码, 对于相关的对象, 方法的调用都是确定的,
所以我们使用非反射的方式多一些.

因为反射体现了动态性 (可以在运行时动态的获取对象所属的类, 动态的调用相关方法), 所以我们在设计框架时,
会大量的使用反射. 意味着如果需要学习框架的源码， 就需要学习反射.

框架 = 注解 + 反射 + 设计模式

3. 单例模式的饿汉式和懒汗式中, 我们需要私有化类的构造器以防止类在外部被实例化。 此时通过反射, 可以创建
单例模式中类的多个对象吗?

是的!

4. 通过反射, 可以调用类中私有的结构, 是否与面向对象的封装性矛盾?是不是Java语言设计的Bug？

不存在Bug的!

封装性体现的是是否建议类内部API的问题. 比如, private修饰的结构, 意味着不建议调用
反射体现的是, 我们能否调用的问题. 因为类的完整结构都完整地加载到了内存中， 我们就有能力去调用类中的任何结构.
```



### 1.2 反射概述

188

Reflection（反射）是被视为`动态语言`的关键，反射机制允许程序在`运行期间`借助于Reflection API取得任何类的内部信息，并能直接操作任意对象的内部属性及方法。

>  在业务代码中, 反射用的相对较少, 但是框架为了提高适用性则大量使用反射

加载完类之后，在*堆内存的方法区*中就产生了一个Class类型的对象（一个类只有一个Class对象），这个对象就包含了完整的类的结构信息。我们可以通过这个对象看到类的结构。`这个对象就像一面镜子，透过这个镜子看到类的结构，所以，我们形象的称之为：反射。`

>  e.g. 以前我们是类的对象调用类的结构(属性, 方法, 构造器), 使用反射后, 看起来则是是类的结构(属性, 方法, 构造器)调用类的对象 

<img src="images/image-20220417161529285.png" alt="image-20220417161529285" style="zoom:80%;" />

**从内存加载上看反射：**

![image-20220524101448625](images/image-20220524101448625.png)



### 1.3  Java反射机制研究及应用

Java反射机制提供的功能：

- 在运行时判断任意一个对象所属的类
- 在运行时构造任意一个类的对象
- 在运行时判断任意一个类所具有的成员变量和方法
- 在运行时获取泛型信息
- 在运行时调用任意一个对象的成员变量和方法
- :star: 在运行时处理注解 (框架要用到)
- :star: 生成动态代理 (框架要用到)



### 1.4 反射相关的主要API



```java
java.lang.Class：//代表一个类
java.lang.reflect.Method：//代表类的方法
java.lang.reflect.Field：//代表类的成员变量
java.lang.reflect.Constructor：//代表类的构造器
// ....
```







### 1.5 :moon: 反射的优缺点

**优点：**

- 提高了Java程序的灵活性和扩展性，`降低了耦合性`(实现了程序和数据的分离, 程序可以专注写逻辑)，提高`自适应`能力

- 允许程序创建和控制任何类的对象，无需提前`硬编码`目标类,

**缺点：**

- 反射的`性能较低`。
  - 反射机制主要应用在对灵活性和扩展性要求很高的系统框架上

- 反射会`模糊`程序内部逻辑，`可读性较差`。

:bangbang: 平时开发中, 我们开发者使用的并不多， 主要是在框架的底层使用



## 2.  理解Class类并获取Class实例

188 7min-



要想`解剖`一个类，必须先要获取到该类的Class对象。而剖析一个类或用反射解决具体的问题就是使用相关API:

- java.lang.Class
- java.lang.reflect.

Class对象是反射的根源: 

```java
针对于编写好的.java源文件进行编译(使用javac.exe), 会生成一个或多个.class字节码文件. 

接着, 我么使用java.exe命令对指定的.class文件进行解释运行, 这个解释运行的过程中, 我们需要将.class字节码文件加载 (使用类的加载器)到内存中(存放在方法区). 加载到内存中好的.class文件对应的结构即为Class的一个实例.
```





### 2.1 理解Class

#### 2.1.1 理论上

在Object类中定义了以下的方法，此方法将被所有子类继承：

```java
public final Class getClass()
```

以上的方法返回值的类型是一个Class类，此类是Java反射的源头，实际上所谓反射从程序的运行结果来看也很好理解，即：可以通过对象反射求出类的名称。

<img src="images/image-20220417162559217.png" alt="image-20220417162559217" style="zoom:80%;" />

对象照镜子后可以得到的信息：某个类的属性、方法和构造器、某个类到底实现了哪些接口。对于每个类而言，JRE 都为其保留一个不变的 Class 类型的对象。一个 Class 对象包含了特定某个结构(class/interface/enum/annotation/primitive type/void/[])的有关信息。

- Class本身也是一个类
- Class 对象只能由系统建立对象
- 一个加载的类在 JVM 中只会有一个Class实例 
- 一个Class对象对应的是一个加载到JVM中的一个.class文件
- 每个类的实例都会记得自己是由哪个 Class 实例所生成
- 通过Class可以完整地得到一个类中的所有被加载的结构 
- Class类是Reflection的根源，针对任何你想动态加载、运行的类，唯有先获得相应的Class对象



#### 2.1.2 内存结构上

<img src="images/image-20220514180100176.png" alt="image-20220514180100176" style="zoom:80%;" />

说明：上图中字符串常量池在JDK6中存储在方法区；JDK7及以后，存储在堆空间。



### 2.2 :moon: 获取Class类的实例(四种方法)

+ 方式1：要求编译期间已知类型

前提：若已知具体的类，通过类的class属性获取，该方法最为安全可靠，程序性能最高

实例：

```java
Class clazz = String.class;
```

+ 方式2：获取对象的运行时类型 (硬编码方式)

前提：已知某个类的实例，调用该实例的getClass()方法获取Class对象

实例：

```java
Class clazz = "www.atguigu.com".getClass();
```

+ :star: 方式3：可以获取编译期间未知的类型 (最能体现反射的动态性, 因而用的最多)

前提：已知一个类的全类名，且该类在类路径下，可通过Class类的静态方法forName()获取，可能抛出ClassNotFoundException

用的最多, 最能体现反射提供的'动态'特性, 因为类名可以以String变量的形式传入forName(), 而方式1,2类名都写死了. 

:bangbang: 获取Class类实例的过程, 是先load指定类, 如果类已经load到内存了, 就不会再次load而是直接去获取内存中的Class实例

实例：

```java
Class clazz = Class.forName("java.lang.String");
```

+ 方式4：其他方式(不做要求)

前提：可以用系统类加载对象或自定义加载器对象加载指定路径下的类型

实例：

```java
ClassLoader cl = this.getClass().getClassLoader();
Class clazz4 = cl.loadClass("类的全类名");
```

再举例：

```java
public class GetClassObject {
    @Test
    public void test01() throws ClassNotFoundException{
        Class c1 = GetClassObject.class;
        GetClassObject obj = new GetClassObject();
        Class c2 = obj.getClass();
        Class c3 = Class.forName("com.atguigu.classtype.GetClassObject");
        Class c4 = ClassLoader.getSystemClassLoader().loadClass("com.atguigu.classtype.GetClassObject");

        System.out.println("c1 = " + c1);
        System.out.println("c2 = " + c2);
        System.out.println("c3 = " + c3);
        System.out.println("c4 = " + c4);

        System.out.println(c1 == c2);
        System.out.println(c1 == c3);
        System.out.println(c1 == c4);
    }
}
```



### 2.3 哪些类型可以有Class对象

简言之，所有Java类型！

（1）class：外部类，成员(成员内部类，静态内部类)，局部内部类，匿名内部类
（2）interface：接口
（3）[]：数组
（4）enum：枚举
（5）annotation：注解@interface
（6）primitive type：基本数据类型
（7）void

举例：

```java
Class c1 = Object.class;        // class
Class c2 = Comparable.class;    // interface
Class c3 = String[].class;      // class
Class c4 = int[][].class;       // array
Class c5 = ElementType.class;
Class c6 = Override.class;      // Annotation
Class c7 = int.class;           // primitive
Class c8 = void.class;
Class c9 = Class.class;

int[] a = new int[10];
int[] b = new int[100];
Class c10 = a.getClass();
Class c11 = b.getClass();
// 只要元素类型与维度(不是长度!)一样，就是同一个Class
System.out.println(c10 == c11);		// true
```



### 2.4 Class类的常用方法

| **方法名**                                         | **功能说明**                                                 |
| -------------------------------------------------- | ------------------------------------------------------------ |
| static  Class forName(String  name)                | 返回指定类名  name  的  Class  对象                          |
| Object  newInstance()                              | 调用缺省构造函数，返回该Class对象的一个实例                  |
| getName()                                          | 返回此Class对象所表示的实体（类、接口、数组类、基本类型或void）名称 |
| Class  getSuperClass()                             | 返回当前Class对象的父类的Class对象                           |
| Class  [] getInterfaces()                          | 获取当前Class对象的接口                                      |
| ClassLoader  getClassLoader()                      | 返回该类的类加载器                                           |
| Class  getSuperclass()                             | 返回表示此Class所表示的实体的超类的Class                     |
| Constructor[]  getConstructors()                   | 返回一个包含某些Constructor对象的数组                        |
| Field[]  getDeclaredFields()                       | 返回Field对象的一个数组                                      |
| Method  getMethod(String  name,Class … paramTypes) | 返回一个Method对象，此对象的形参类型为paramType              |

举例：

```java
String str = "test4.Person";
Class clazz = Class.forName(str);

Object obj = clazz.newInstance();

Field field = clazz.getField("name");
field.set(obj, "Peter");
Object name = field.get(obj);
System.out.println(name);

//注：test4.Person是test4包下的Person类
```





## 3. 类的加载与ClassLoader的理解

189-

主要是了解, 更多细节在JVM的课程中

JVM基本流程讲解



### 3.1 类的生命周期

类在内存中完整的生命周期：加载-->使用-->卸载。其中加载过程又分为：装载、链接、初始化三个阶段。

![image-20220417173459849](images/image-20220417173459849.png)

### 3.2 类的加载过程

当程序主动使用某个类时，如果该类还未被加载到内存中，系统会通过加载、链接、初始化三个步骤来对该类进行初始化。如果没有意外，JVM将会连续完成这三个步骤，所以有时也把这三个步骤统称为类加载。

<img src="images/image-20220417171411631.png" alt="image-20220417171411631" style="zoom: 50%;" />

类的加载又分为三个阶段：

+ step1: **装载（Loading）**

将类的class文件读入内存，并为之创建一个java.lang.Class对象。此过程由类加载器完成。 此时就有Class的实例了

+ step2: **链接（Linking）**

  + 验证Verify：确保加载的类信息符合JVM规范，例如：以cafebabe(16进制的字节码文件中)开头，没有安全方面的问题。

  + 准备Prepare：正式为类变量（即类的静态变量）分配内存并`设置类变量默认初始值`的阶段，这些内存都将在方法区中进行分配。
    + 注意运行类的实例的内存在你new时才会被分配, 这里我们只是加载运行时类, 只处理和类相关的信息

  + 解析Resolve：虚拟机常量池内的*符号引用*（常量名）替换为*直接引用*（地址）的过程。

+ step3: **初始化（Initialization）**

  - 执行`类构造器<clinit>()方法`的过程。
    - `类构造器<clinit>()方法`是由编译期自动收集类中所有类变量的赋值动作和静态代码块中的语句合并产生的。（类构造器是构造类信息的，不是构造该类对象的构造器）


  - 当初始化一个类的时候，如果发现其父类还没有进行初始化，则需要先触发其父类的初始化。


  - 虚拟机会保证一个`类的<clinit>()方法`在多线程环境中被正确加锁和同步。




### 3.3 类加载器（classloader)

189 16min-

<img src="images/image-20220417173647473.png" alt="image-20220417173647473" style="zoom:67%;" />



#### 3.3.1 类加载器的作用

即我们在类的加载过程中的step1 loading阶段用到的, 其作用是 **将class文件字节码内容加载到内存中，并将这些静态数据转换成方法区的运行时数据结构，然后在堆中生成一个代表这个类的java.lang.Class对象，作为方法区中类数据的访问入口。**

类缓存：标准的JavaSE类加载器可以按要求查找类，但一旦某个类被加载到类加载器中，它将维持加载（缓存）一段时间。不过JVM垃圾回收机制可以回收这些Class对象。

<img src="images/image-20220417173616344.png" alt="image-20220417173616344" style="zoom: 80%;" />

#### 3.3.2 类加载器的分类(JDK8为例)

做了解, JDK9之后就变了

JVM支持两种类型的类加载器，分别为`引导类加载器（Bootstrap ClassLoader）`和`自定义类加载器（User-Defined ClassLoader）`。

从概念上来讲，自定义类加载器一般指的是程序中由开发人员自定义的一类类加载器，但是Java虚拟机规范却没有这么定义，而是将所有派生于抽象类ClassLoader的类加载器都划分为自定义类加载器。无论类加载器的类型如何划分，在程序中我们最常见的类加载器结构主要是如下情况：



ClassLoader主要分为两种

```java
> BootstrapClassLoader: 引导类加载器, 启动类加载器
  	使用C/C++语言编写, 不能通过Java代码获取其实例
  	负责加载Java核心库 (JAVA_HOME/jre/lib/rt.jar或sun.boot.class.path路径下的内容)。用于提供JVM自身需要的类。
> 继承于CLassLoader的类加载器:
	> ExtensionClassLoader: 扩展类加载器
  > SystemClassLoader/ApplicationClassLoader: 系统类加载器/应用程序加载器
    	> 我们自定义的类, 默认使用的类的加载器
 	> UserClassLoader: 用户自定义加载器
    	> 实现应用隔离 (同一个类在一个应用程序中可以加载多份); 还可以实现对字节码文件的加密
```



---

:bangbang: 注意下图中箭头并不是表示OO中继承的意思!  但是我们依然会说, ApplicationClasssLoader的父类加载器是ExtensionClassLoader

```java
class ClassLoader{
  ClassLoader parent;		// 这里的parent并不是OO中的父类的意思
  public CLassLoader(ClassLoader parent){
    this.parent = parent;
  }
}

// 测试代码
ClassLoader loader0 = new ClssLoader();
ClassLoader loader1 = new ClssLoader(loader0);		//  其实loader0只是loader1的某个方法的参数
// 此时我们就把loader0 叫做loader1的父类加载器, 其实loader0只是loader1的某个方法的参数

```

之所以这样是因为`双亲委派机制`, 当一个.class过来时, 先从Application ClassLoader进入, 往上抛至BootStrap ClassLoader, 然后再依次往下传递, 符合责任的ClassLoader会去加载这个class. 这样可以保证Java的核心库不被篡改

<img src="images/image-20220417173819953.png" alt="image-20220417173819953" style="zoom:80%;" />



下图可见ExtClassLoader和AppClassLoader是平级兄弟关系

![image-20220417174032702](images/image-20220417174032702.png)

---





**（1）启动类加载器（引导类加载器，Bootstrap ClassLoader）**

- 这个类加载使用`C/C++语言`实现的，嵌套在JVM内部。获取它的对象时往往返回null
- 它用来加载Java的核心库（JAVA_HOME/jre/lib/rt.jar或sun.boot.class.path路径下的内容）。用于提供JVM自身需要的类。
- 并不继承自java.lang.ClassLoader，没有父加载器。
- 出于安全考虑，Bootstrap启动类加载器只加载包名为java、javax、sun等开头的类
- 加载扩展类和应用程序类加载器，并指定为他们的父类加载器。



**（2）扩展类加载器（Extension ClassLoader）**

- Java语言编写，由sun.misc.Launcher$ExtClassLoader实现。
- 继承于ClassLoader类
- 父类加载器为启动类加载器
- 从java.ext.dirs系统属性所指定的目录中加载类库，或从JDK的安装目录的jre/lib/ext子目录下加载类库。如果用户创建的JAR放在此目录下，也会自动由扩展类加载器加载。



**（3）应用程序类加载器（系统类加载器，AppClassLoader）**

- java语言编写，由sun.misc.Launcher$AppClassLoader实现
- 继承于ClassLoader类
- 父类加载器为扩展类加载器
- 它负责加载环境变量classpath或系统属性 java.class.path 指定路径下的类库 
- 应用程序中的类加载器默认是系统类加载器。
- 它是用户自定义类加载器的默认父加载器
- 通过ClassLoader的getSystemClassLoader()方法可以获取到该类加载器



**（4）用户自定义类加载器（了解）**

- 在Java的日常应用程序开发中，类的加载几乎是由上述3种类加载器相互配合执行的。在必要时，我们还可以自定义类加载器，来定制类的加载方式。
- 体现Java语言强大生命力和巨大魅力的关键因素之一便是，Java开发者可以自定义类加载器来实现类库的动态加载，加载源可以是本地的JAR包，也可以是网络上的远程资源。
- 同时，自定义加载器能够实现`应用隔离`，例如 Tomcat，Spring等中间件和组件框架都在内部实现了自定义的加载器，并通过自定义加载器隔离不同的组件模块。这种机制比C/C++程序要好太多，想不修改C/C++程序就能为其新增功能，几乎是不可能的，仅仅一个兼容性便能阻挡住所有美好的设想。
- 自定义类加载器通常需要继承于ClassLoader。





#### 3.3.3 查看某个类的类加载器对象

189 26min- Hands-on  

老师是在JDK8下演示的, 但是JDK9之后ClassLoader的架构就变了, 这里只做了解即可, 具体Intellij中老师的代码就不展示了. 具体见JVM课程

（1）获取默认的系统类加载器

```java
ClassLoader classloader = ClassLoader.getSystemClassLoader();
```

（2）查看某个类是哪个类加载器加载的

```java
// 得到exer2.ClassloaderDemo这个Class实例的ClassLoader
ClassLoader classloader = Class.forName("exer2.ClassloaderDemo").getClassLoader();

//如果是根加载器加载的类，则会得到null
ClassLoader classloader1 = Class.forName("java.lang.Object").getClassLoader();
```

（3）获取某个类加载器的父加载器

```java
ClassLoader parentClassloader = classloader.getParent();
```



:gem: 示例代码：

```java
package com.atguigu.loader;

import org.junit.Test;

public class TestClassLoader {
    @Test
    public void test01(){
        ClassLoader systemClassLoader = ClassLoader.getSystemClassLoader();
        System.out.println("systemClassLoader = " + systemClassLoader);
    }

    @Test
    public void test02()throws Exception{
        ClassLoader c1 = String.class.getClassLoader();
        System.out.println("加载String类的类加载器：" + c1);

        ClassLoader c2 = Class.forName("sun.util.resources.cldr.zh.TimeZoneNames_zh").getClassLoader();
        System.out.println("加载sun.util.resources.cldr.zh.TimeZoneNames_zh类的类加载器：" + c2);

        ClassLoader c3 = TestClassLoader.class.getClassLoader();
        System.out.println("加载当前类的类加载器：" + c3);
    }

    @Test
    public void test03(){
        ClassLoader c1 = TestClassLoader.class.getClassLoader();
        System.out.println("加载当前类的类加载器c1=" + c1);

        ClassLoader c2 = c1.getParent();
        System.out.println("c1.parent = " + c2);

        ClassLoader c3 = c2.getParent();
        System.out.println("c2.parent = " + c3);

    }
}
```



#### 3.3.4 :moon: 使用ClassLoader获取流

189 46min-



关于类加载器的一个主要方法：getResourceAsStream(String str):获取类路径下的指定文件的输入流

```java

InputStream in = null;
in = this.getClass().getClassLoader().getResourceAsStream("exer2\\test.properties");
System.out.println(in);

```

举例：

方式一: IO 流的方式来读取配置文件

```java
// IO 流的方式来读取配置文件
@Test
public void test4() throws IOException {
    Properties pros = new Properties();

    /// 读取的文件的默认的路径为:当前module下
    FileInputStream is = new FileInputStream(new File("info.properties"));

    pros.load(is);

    String name = pros.getProperty("name");
    String password = pros.getProperty("password");
    System.out.println(name + ", " + password);
}
```

方式二: 类加载器的方式读取配置文件

```java
//需要掌握如下的代码
// 类加载器的方式读取配置文件

@Test
public void test5() throws IOException {
    Properties pros = new Properties();
    //方式1：此时默认的相对路径是当前的module
//        FileInputStream is = new FileInputStream("info.properties");
//        FileInputStream is = new FileInputStream("src//info1.properties");

    //方式2：使用类的加载器
    //此时默认的相对路径是当前module的src目录, JDK17改了默认路径在main > resource那里
    InputStream is = ClassLoader.getSystemClassLoader().getResourceAsStream("info1.properties");


    pros.load(is);

    //获取配置文件中的信息
    String name = pros.getProperty("name");
    String password = pros.getProperty("password");
    System.out.println("name = " + name + ", password = " + password);
}
```



## 4. 反射的基本应用

190 0min- 

见包class03_reflectionApplication



有了Class对象，能做什么？

### 4.1 :full_moon: 应用1：创建运行时类的对象 (两种方式)

190 0min- 



```java
作为应用频率最高的反射应用, 创建运行时类主要有两种方式:
方式一:  调用Class实例的方法newInstance()  // deprecated
方式二: 通过构造器对象来实例化			// preferred
```



这是反射机制应用最多的地方。创建运行时类的对象有两种方式：

**方式1：直接调用Class对象的newInstance()方法**

```java
@Test
    public void test1() throws InstantiationException, IllegalAccessException {
        Class clazz = Person.class;

        // 创建Person类的实例
        Person per = (Person) clazz.newInstance();	// deprecated, 一般不用这种方式
        // 实际上还是调用Person的空参构造器, 如果Person类中没有空参构造器, throw InstantiationException
        // 如果Person类中空参构造器的权限不够, throw IllegalAccessException

        System.out.println(per);
    }
```

要 求:

+ 运行时类必须提供一个无参数的构造器。否则 throw InstantiationException
+ 类的构造器的访问权限需要足够。否则 throw IllegalAccessException

思考题

```java
1.3 回忆: JavaBean中要求给当前类提供一个public的空参构造器, 有什么用?
    场景一: 子类对象在实例化时, 子类的构造器的首行默认调用父类空参构造器. 
    场景二: 在反射当中, 经常用于创建运行时类的对象. 那么我们要求各个运行时类都提供一个空参构造器, 便于我们编写运行时类对象的代						 码,提高通用性
  
1.4 在 jdk9中, newInstance() 被标识为deprecated, 应该替换为什么结构?
    通过Constructor类调用newInstance()
  
```

11min- 更改intellj module 使用的JDK版本



:star: **方式2：通过获取构造器对象来进行实例化**

方式一的步骤：

1）获取该类型的Class对象  2）调用Class对象的newInstance()方法创建对象

方式二的步骤：

1）通过Class类的getDeclaredConstructor(Class … parameterTypes)取得本类的指定形参类型的构造器
2）向构造器的形参中传递一个对象数组进去，里面包含了构造器中所需的各个参数。
3）通过Constructor实例化对象。

> 如果构造器的权限修饰符修饰的范围不可见，也可以调用setAccessible(true)

示例代码：

```java
package com.atguigu.reflect;

import org.junit.Test;

import java.lang.reflect.Constructor;

public class TestCreateObject {
    @Test
    public void test1() throws Exception{
//        AtGuiguClass obj = new AtGuiguClass();//编译期间无法创建

        Class<?> clazz = Class.forName("com.atguigu.ext.demo.AtGuiguClass");
        //clazz代表com.atguigu.ext.demo.AtGuiguClass类型
        //clazz.newInstance()创建的就是AtGuiguClass的对象
        Object obj = clazz.newInstance();
        System.out.println(obj);
    }

    @Test
    public void test2()throws Exception{
        Class<?> clazz = Class.forName("com.atguigu.ext.demo.AtGuiguDemo");
        //java.lang.InstantiationException: com.atguigu.ext.demo.AtGuiguDemo
        //Caused by: java.lang.NoSuchMethodException: com.atguigu.ext.demo.AtGuiguDemo.<init>()
        //即说明AtGuiguDemo没有无参构造，就没有无参实例初始化方法<init>
        Object stu = clazz.newInstance();
        System.out.println(stu);
    }

    @Test
    public void test3()throws Exception{
        //(1)获取Class对象
        Class<?> clazz = Class.forName("com.atguigu.ext.demo.AtGuiguDemo");
        /*
         * 获取AtGuiguDemo类型中的有参构造
         * 如果构造器有多个，我们通常是根据形参【类型】列表来获取指定的一个构造器的
         * 例如：public AtGuiguDemo(String title, int num)
         */
        //(2)获取构造器对象
        Constructor<?> constructor = clazz.getDeclaredConstructor(String.class,int.class);

        //(3)创建实例对象
        // T newInstance(Object... initargs)  这个Object...是在创建对象时，给有参构造的实参列表
        Object obj = constructor.newInstance("尚硅谷",2022);
        System.out.println(obj);
    }
}
```





### 4.2 应用2：获取运行时类的完整结构信息

190 17min-

认识到, 只需要给定我一个运行时类名, 我就可以知道它的完整结构的信息

可以获取：包、修饰符、类型名、父类（包括泛型父类）、父接口（包括泛型父接口）、成员（属性、构造器、方法）、注解（类上的、方法上的、属性上的).

```Java
主要分为两部分
  1) (了解)获取运行时类的内部结构1: 所有属性, 所有方法
  2) (熟悉)获取运行时类的内部结构2: 所有构造器, 父类， 接口, 包, 带范型的父类, 父类的范型等
  
康师傅: 这里的方法涉及到的很多, 但是不需要你去全部记忆, 有像chatGPT这样的工具或者自己积累这些方法的使用, 用到的时候查就行. 作为程序员, 真正的价值体现在于你进入公司之后对于业务的把控, 对于业务所需要的技术架构的掌握. 
```



#### 4.2.0 相关API

```java
//1.实现的全部接口 -------------------------------
public Class<?>[] getInterfaces()   
//确定此对象所表示的类或接口实现的接口。 

//2.所继承的父类 -------------------------------
public Class<? Super T> getSuperclass()
//返回表示此 Class 所表示的实体（类、接口、基本类型）的父类的 Class。

//3.全部的构造器 -------------------------------
public Constructor<T>[] getConstructors()
//返回此 Class 对象所表示的类的所有public构造方法。
public Constructor<T>[] getDeclaredConstructors()
//返回此 Class 对象表示的类声明的所有构造方法。

//Constructor类中：
//取得修饰符: 
public int getModifiers();
//取得方法名称: 
public String getName();
//取得参数的类型：
public Class<?>[] getParameterTypes();

//4.全部的方法 -------------------------------
public Method[] getDeclaredMethods()
//返回此Class对象所表示的类或接口的全部方法
public Method[] getMethods()  
//返回此Class对象所表示的类或接口的public的方法

//Method类中：
public Class<?> getReturnType()
//取得全部的返回值
public Class<?>[] getParameterTypes()
//取得全部的参数
public int getModifiers()
//取得修饰符
public Class<?>[] getExceptionTypes()
//取得异常信息

//5.全部的Field -------------------------------
public Field[] getFields() 
//返回此Class对象所表示的类或接口的public的Field。
public Field[] getDeclaredFields() 
//返回此Class对象所表示的类或接口的全部Field。

//Field方法中：
public int getModifiers()
//以整数形式返回此Field的修饰符
public Class<?> getType()  
//得到Field的属性类型
public String getName()  
//返回Field的名称。

//6. Annotation相关 -------------------------------
get Annotation(Class<T> annotationClass) 
getDeclaredAnnotations() 

//7.泛型相关 -------------------------------
//获取父类泛型类型：
Type getGenericSuperclass()
//泛型类型：ParameterizedType
//获取实际的泛型类型参数数组：
getActualTypeArguments()

//8.类所在的包
Package getPackage() 
```



#### 4.2.1 获取所有的属性及相关细节

```java
package com.atguigu.java2;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;

import org.junit.Test;

import com.atguigu.java1.Person;

public class FieldTest {
	
	@Test
	public void test1(){
		
		Class clazz = Person.class;
		//getFields():获取到运行时类本身及其所有的父类中声明为public权限的属性
//		Field[] fields = clazz.getFields();
//
//		for(Field f : fields){
//			System.out.println(f);
//		}
		
		//getDeclaredFields():获取当前运行时类中声明的所有属性
		Field[] declaredFields = clazz.getDeclaredFields();
		for(Field f : declaredFields){
			System.out.println(f);
		}
	}
	
	//权限修饰符  变量类型  变量名
	@Test
	public void test2(){
		Class clazz = Person.class;
        Field[] declaredFields = clazz.getDeclaredFields();
        for(Field f : declaredFields){
            //1.权限修饰符
            /*
         	* 0x是十六进制
         	* PUBLIC           = 0x00000001;  1    1
         	* PRIVATE          = 0x00000002;  2	10
         	* PROTECTED        = 0x00000004;  4	100
         	* STATIC           = 0x00000008;  8	1000
         	* FINAL            = 0x00000010;  16	10000
         	* ...
         	*
         	* 设计的理念，就是用二进制的某一位是1，来代表一种修饰符，整个二进制中只有一位是1，其余都是0
         	*
         	* mod = 17          0x00000011
         	* if ((mod & PUBLIC) != 0)  说明修饰符中有public
         	* if ((mod & FINAL) != 0)   说明修饰符中有final
         	*/
            int modifier = f.getModifiers();
            System.out.print(Modifier.toString(modifier) + "\t");

//            //2.数据类型
            Class type = f.getType();
            System.out.print(type.getName() + "\t");
//
//            //3.变量名
            String fName = f.getName();
            System.out.print(fName);
//
            System.out.println();
        }
	}
}

```



#### 4.2.2 获取所有的方法及相关细节

24min-

```java
package com.atguigu.java2;

import java.lang.annotation.Annotation;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;

import org.junit.Test;

import com.atguigu.java1.Person;

public class MethodTest {

	@Test
	public void test1() {

		Class clazz = Person.class;
       //getMethods():获取到运行时类本身及其所有的父类中声明为public权限的方法
       Method[] methods = clazz.getMethods();

       	for(Method m : methods){
       		System.out.println(m);
		 		}

			// getDeclaredMethods():获取当前运行时类中声明的所有方法
      Method[] declaredMethods = clazz.getDeclaredMethods();
      for (Method m : declaredMethods) {
        	System.out.println(m);
      }
      //
	}

	// 注解信息
	// 权限修饰符 返回值类型 方法名(形参类型1 参数1,形参类型2 参数2,...) throws 异常类型1,...{}
	@Test
	public void test2() {
		Class clazz = Person.class;
		Method[] declaredMethods = clazz.getDeclaredMethods();
		for (Method m : declaredMethods) {
			// 1.获取方法声明的注解
			Annotation[] annos = m.getAnnotations();
			for (Annotation a : annos) {
				System.out.println(a);
			}

			// 2.权限修饰符
			System.out.print(Modifier.toString(m.getModifiers()) + "\t");

			// 3.返回值类型
			System.out.print(m.getReturnType().getName() + "\t");

			// 4.方法名
			System.out.print(m.getName());
			System.out.print("(");
			// 5.形参列表
			Class[] parameterTypes = m.getParameterTypes();
			if (!(parameterTypes == null && parameterTypes.length == 0)) {
				for (int i = 0; i < parameterTypes.length; i++) {

					if (i == parameterTypes.length - 1) {
						System.out.print(parameterTypes[i].getName() + " args_" + i);
						break;
					}

					System.out.print(parameterTypes[i].getName() + " args_" + i + ",");
				}
			}

			System.out.print(")");

			// 6.抛出的异常
			Class[] exceptionTypes = m.getExceptionTypes();
			if (exceptionTypes.length > 0) {
				System.out.print("throws ");
				for (int i = 0; i < exceptionTypes.length; i++) {
					if (i == exceptionTypes.length - 1) {
						System.out.print(exceptionTypes[i].getName());
						break;
					}
					System.out.print(exceptionTypes[i].getName() + ",");
				}
			}
			System.out.println();
		}
	}
}

```



#### 4.2.3 取其他结构(构造器、父类、接口、包、注解等)

31min-

```java
package com.atguigu.java2;

import com.atguigu.java1.Person;
import org.junit.Test;

import java.lang.annotation.Annotation;
import java.lang.reflect.Constructor;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;

/**
 * @author 尚硅谷-宋红康
 * @create 2020 下午 2:47
 */
public class OtherTest {

    /*
    	获取当前类中的所有的构造器
     */
    @Test
    public void test1(){
        Class clazz = Person.class;
        Constructor[] cons = clazz.getDeclaredConstructors();
        for(Constructor c :cons){
            System.out.println(c);
        }
    }
    /*
    	获取运行时类的父类
     */
    @Test
    public void test2(){
        Class clazz = Person.class;
        Class superclass = clazz.getSuperclass();
        System.out.println(superclass);//class com.atguigu.java1.Creature
    }
    /*
    	获取运行时类的所在的包
     */
    @Test
    public void test3(){
        Class clazz = Person.class;
        Package pack = clazz.getPackage();
        System.out.println(pack);

    }
    /*
    	获取运行时类的注解
     */
    @Test
    public void test4(){
        Class clazz = Person.class;
        Annotation[] annos = clazz.getAnnotations();
        for (Annotation anno : annos) {

            System.out.println(anno);
        }

    }

    /*
    	获取运行时类所实现的接口
     */
    @Test
    public void test5(){
        Class clazz = Person.class;
        Class[] interfaces = clazz.getInterfaces();
        for (Class anInterface : interfaces) {

            System.out.println(anInterface);
        }

    }
    /*
    	获取运行时类的带泛型的父类
     */
    @Test
    public void test6(){
        Class clazz = Person.class;
        Type genericSuperclass = clazz.getGenericSuperclass();
        System.out.println(genericSuperclass);//com.atguigu.java1.Creature<java.lang.String>
    }
}

```



##### 4.2.4 获取泛型父类信息（选讲）

基于4.2.3获取运行时类的带范型父类, 我们进一步去获取其中的父类的范型

示例代码获取泛型父类信息：

```java
/* Type：
 * （1）Class
 * （2）ParameterizedType   
 * 		例如：Father<String,Integer>
 * 			ArrayList<String>
 * （3）TypeVariable
 * 		例如：T，U,E,K,V
 * （4）WildcardType
 * 		例如：
 * 		ArrayList<?>
 * 		ArrayList<? super 下限>
 * 		ArrayList<? extends 上限>
 * （5）GenericArrayType
 * 		例如：T[]
 * 	
 */
public class TestGeneric {
	public static void main(String[] args) {
		//需求：在运行时，获取Son类型的泛型父类的泛型实参<String,Integer>
		
		//（1）还是先获取Class对象
		Class clazz = Son.class;//四种形式任意一种都可以
		
		//（2）获取泛型父类
//		Class sc = clazz.getSuperclass();
//		System.out.println(sc);
		/*
		 * getSuperclass()只能得到父类名，无法得到父类的泛型实参列表
		 */
		Type type = clazz.getGenericSuperclass();
		
		// Father<String,Integer>属于ParameterizedType
		ParameterizedType pt = (ParameterizedType) type;
		
		//（3）获取泛型父类的泛型实参列表
		Type[] typeArray = pt.getActualTypeArguments();
		for (Type type2 : typeArray) {
			System.out.println(type2);
		}
	}
}
//泛型形参：<T,U>
class Father<T,U>{
	
}
//泛型实参：<String,Integer>
class Son extends Father<String,Integer>{
	
}
```



##### 4.2.5 获取内部类或外部类信息（选讲）

public Class<?>[] getClasses()：返回所有公共内部类和内部接口。包括从超类继承的公共类和接口成员以及该类声明的公共类和接口成员。

public Class<?>[] getDeclaredClasses()：返回 Class 对象的一个数组，这些对象反映声明为此 Class 对象所表示的类的成员的所有类和接口。包括该类所声明的公共、保护、默认（包）访问及私有类和接口，但不包括继承的类和接口。

public Class<?> getDeclaringClass()：如果此 Class 对象所表示的类或接口是一个内部类或内部接口，则返回它的外部类或外部接口，否则返回null。

Class<?> getEnclosingClass() ：返回某个内部类的外部类

```java
	@Test
	public void test5(){
		Class<?> clazz = Map.class;
		Class<?>[] inners = clazz.getDeclaredClasses();
		for (Class<?> inner : inners) {
			System.out.println(inner);
		}
		
		Class<?> ec = Map.Entry.class;
		Class<?> outer = ec.getDeclaringClass();
		System.out.println(outer);
	}
```

#### 4.2.6 小 结

1. 在实际的操作中，取得类的信息的操作代码，并不会经常开发。

2. 一定要熟悉java.lang.reflect包的作用，反射机制。



### 4.3 :full_moon: 应用3：调用运行时类的指定结构

191 

```java
使用频率仅次于应用1 创建运行时类的对象
  调用属性: // 用的比较少, 因为一般方法我们提供getter, setter
  调用方法: // 用的最多
  调用构造器
```





#### 4.3.1 调用指定的属性

191 0min-



在反射机制中，可以直接通过Field类操作类中的属性，通过Field类提供的set()和get()方法就可以完成设置和取得属性内容的操作。

```java
// 一般步骤为：

// step1 获取运行类对应的Class实例
（1）获取该类型的Class对象

Class clazz = Class.forName("包.类名");


// step2.1 获取属性对象
Field field = clazz.getDeclaredField("属性名");

（3）如果属性的权限修饰符不是public，那么需要设置属性可访问

field.setAccessible(true);


// step2.2 获取运行类的对象
（4）创建实例对象：如果操作的是非静态属性，需要创建实例对象

Object obj = clazz.newInstance(); //有公共的无参构造

Object obj = 构造器对象.newInstance(实参...);//通过特定构造器对象创建实例对象


// step3 反射的方式: 属性调用对象
（5）设置指定对象obj上此Field的属性内容 

field.set(obj,"属性值");

		> 如果操作静态变量，那么实例对象可以省略，用null表示

（6）取得指定对象obj上此Field的属性内容

Object value = field.get(obj);

		> 如果操作静态变量，那么实例对象可以省略，用null表示
```



示例代码：

```java
package com.atguigu.reflect;

public class Student {
    private int id;
    private String name;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Student{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}

```

```java
package com.atguigu.reflect;

import java.lang.reflect.Field;

public class TestField {
    public static void main(String[] args)throws Exception {
        //1、获取Student的Class对象
        Class clazz = Class.forName("com.atguigu.reflect.Student");

        //2、获取属性对象，例如：id属性
        Field idField = clazz.getDeclaredField("id");

        //3、如果id是私有的等在当前类中不可访问access的，我们需要做如下操作
        idField.setAccessible(true);

        //4、创建实例对象，即，创建Student对象
        Object stu = clazz.newInstance();

        //5、获取属性值
        /*
         * 以前：int 变量= 学生对象.getId()
         * 现在：Object id属性对象.get(学生对象)
         */
        Object value = idField.get(stu);
        System.out.println("id = "+ value);

        //6、设置属性值
        /*
         * 以前：学生对象.setId(值)
         * 现在：id属性对象.set(学生对象,值)
         */
        idField.set(stu, 2);

        value = idField.get(stu);
        System.out.println("id = "+ value);
    }
}
```

**关于setAccessible方法的使用：**

- Method和Field、Constructor对象都有setAccessible()方法。
- setAccessible启动和禁用访问安全检查的开关。
- 参数值为true则指示反射的对象在使用时应该取消Java语言访问检查。
  - 提高反射的效率。如果代码中必须用反射，而该句代码需要频繁的被调用，那么请设置为true。
  - 使得原本无法访问的私有成员也可以访问
- 参数值为false则指示反射的对象应该实施Java语言访问检查。



#### 4.3.2 调用指定的方法

15min-

<img src="images/image-20220417181700813.png" alt="image-20220417181700813" style="zoom:80%;" />



```java
// step1: 反射的源头 获取该类型的Class对象
Class clazz = Class.forName("包.类名");

// step2: 获取方法对象
Method method = clazz.getDeclaredMethod("方法名",方法的形参类型列表);

// setAccessible(true): 确保该方法是accessible的
method.setAccessible(true)l;
  
// step3: 创建运行类实例对象
Object obj = clazz.newInstance();

// step4: 调用方法 反射的方式: 方法调用对象
Object result = method.invoke(obj, 方法的实参值列表);

> 如果方法的权限修饰符修饰的范围不可见，也可以调用setAccessible(true)
>
> 如果方法是静态方法，运行类的实例对象也可以省略，用null代替
```



示例代码：

```java
package com.atguigu.reflect;

import org.junit.Test;

import java.lang.reflect.Method;

public class TestMethod {
    @Test
    public void test()throws Exception {
        // 1、获取Student的Class对象
        Class<?> clazz = Class.forName("com.atguigu.reflect.Student");

        //2、获取方法对象
        /*
         * 在一个类中，唯一定位到一个方法，需要：（1）方法名（2）形参列表，因为方法可能重载
         *
         * 例如：void setName(String name)
         */
        Method setNameMethod = clazz.getDeclaredMethod("setName", String.class);

        //3、创建实例对象
        Object stu = clazz.newInstance();

        //4、调用方法
        /*
         * 以前：学生对象.setName(值)
         * 现在：方法对象.invoke(学生对象，值)
         */
        Object setNameMethodReturnValue = setNameMethod.invoke(stu, "张三");

        System.out.println("stu = " + stu);
        //setName方法返回值类型void，没有返回值，所以setNameMethodReturnValue为null
        System.out.println("setNameMethodReturnValue = " + setNameMethodReturnValue);

        Method getNameMethod = clazz.getDeclaredMethod("getName");
        Object getNameMethodReturnValue = getNameMethod.invoke(stu);
        //getName方法返回值类型String，有返回值，getNameMethod.invoke的返回值就是getName方法的返回值
        System.out.println("getNameMethodReturnValue = " + getNameMethodReturnValue);//张三
    }

    @Test
    public void test02()throws Exception{
        Class<?> clazz = Class.forName("com.atguigu.ext.demo.AtGuiguClass");
        Method printInfoMethod = clazz.getMethod("printInfo", String.class);
        //printInfo方法是静态方法
        printInfoMethod.invoke(null,"尚硅谷");
    }
}

```



#### 4.3.3 调用指定的构造器

```java
step1. 通过Class实例调用getDeclaredConstructor(CLass ... args), 获取指定参数类型的构造器
step2. 确保此构造器是accessible
step3. 通过Constructor实例调用newInstance(Object ... objs), 返回一个运行时类的实例
```



```java
// private Person(String name, int age)
@Test
public void test1() throws NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {
    Class clazz = Person.class;

    // 1. 通过Class实例调用getDeclaredConstructor(CLass ... args), 获取指定参数类型的构造器
    Constructor declaredConstructor = clazz.getDeclaredConstructor(String.class, int.class);

    // 2. 确保此构造器是accessible
    declaredConstructor.setAccessible(true);

    // 3. 通过Constructor实例调用newInstance(Object ... objs), 返回一个运行时类的实例
    Person per = (Person) declaredConstructor.newInstance("Tom", 12);

    System.out.println(per);
}

//
// 使用Constructor替换原来的使用`clazz.newInstance()`的方式创建对象
@Test
public void test2() throws NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {
    Class clazz = Person.class;

    // 1. 通过Class实例调用getDeclaredConstructor(CLass ... args), 获取指定参数类型的构造器
    Constructor declaredConstructor = clazz.getDeclaredConstructor();

    // 2. 确保此构造器是accessible
    declaredConstructor.setAccessible(true);

    // 3. 通过Constructor实例调用newInstance(Object ... objs), 返回一个运行时类的实例
    Person per = (Person) declaredConstructor.newInstance();

    System.out.println(per);
}
```





#### 4.3.4 练习

读取user.properties文件中的数据，通过反射完成User类对象的创建及对应方法的调用。

配置文件：user.properties

```
className:com.atguigu.bean.User
methodName:show
```

User.java文件：

```java
package com.atguigu.bean;

/**
 * @author 尚硅谷-宋红康
 * @create 18:41
 */
public class User {
    private String name;

    public User() {
    }

    public User(String name) {
        this.name = name;
    }

    public void show(){
        System.out.println("我是一个脉脉平台的用户");
    }
}
```

ReflectTest.java文件：

```java
package com.atguigu.java4;

import org.junit.Test;

import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Method;
import java.util.Properties;

/**
 * @author 尚硅谷-宋红康
 * @create 18:43
 */
public class ReflectTest {
    @Test
    public void test() throws Exception {
        //1.创建Properties对象
        Properties pro = new Properties();

        //2.加载配置文件，转换为一个集合
        ClassLoader classLoader = ClassLoader.getSystemClassLoader();
        InputStream is = classLoader.getResourceAsStream("user.properties");
        pro.load(is);

        //3.获取配置文件中定义的数据
        String className = pro.getProperty("className");
        String methodName = pro.getProperty("methodName");

        //4.加载该类进内存
        Class clazz = Class.forName(className);

        //5.创建对象
        Object instance = clazz.newInstance();

        //6.获取方法对象
        Method showMethod = clazz.getMethod(methodName);

        //7.执行方法
        showMethod.invoke(instance);
    }
}

```



### 4.4 :moon: 应用4：读取注解信息

192 0min-

见intellij class04-other package

需要懂注解的基础知识



一个完整的注解应该包含三个部分：
（1）声明
（2）使用
（3）读取

#### Step1: 声明自定义注解

```java
package com.atguigu.annotation;

import java.lang.annotation.*;

@Inherited
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface Table {
    String value();
}
```

```java
package com.atguigu.annotation;

import java.lang.annotation.*;

@Inherited
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Column {
    String columnName();
    String columnType();
}
```

* 自定义注解可以通过四个元注解@Retention,@Target，@Inherited,@Documented，分别说明它的声明周期，使用位置，是否被继承，是否被生成到API文档中。
* Annotation 的成员在 Annotation 定义中以无参数有返回值的抽象方法的形式来声明，我们又称为配置参数。返回值类型只能是八种基本数据类型、String类型、Class类型、enum类型、Annotation类型、以上所有类型的数组
* 可以使用 default 关键字为抽象方法指定默认返回值
* 如果定义的注解含有抽象方法，那么使用时必须指定返回值，除非它有默认值。格式是“方法名 = 返回值”，如果只有一个抽象方法需要赋值，且方法名为value，可以省略“value=”，所以如果注解只有一个抽象方法成员，建议使用方法名value。



#### Step2: 使用自定义注解

将自定义注解写到想要修饰的结构头上

```java
package com.atguigu.annotation;

@Table("t_stu")
public class Student {
    @Column(columnName = "sid",columnType = "int")
    private int id;
    @Column(columnName = "sname",columnType = "varchar(20)")
    private String name;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Student{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}

```



#### Step3: 读取和处理自定义注解

自定义注解必须配上注解的信息处理流程才有意义。

我们自己定义的注解，只能使用反射的代码读取。所以自定义注解的声明周期必须是RetentionPolicy.RUNTIME。

```java
package com.atguigu.annotation;

import java.lang.reflect.Field;

public class TestAnnotation {
    public static void main(String[] args) {
        Class studentClass = Student.class;
        Table tableAnnotation = (Table) studentClass.getAnnotation(Table.class);
        String tableName = "";
        if(tableAnnotation != null){
            tableName = tableAnnotation.value();
        }

        Field[] declaredFields = studentClass.getDeclaredFields();
        String[] columns = new String[declaredFields.length];
        int index = 0;
        for (Field declaredField : declaredFields) {
            Column column = declaredField.getAnnotation(Column.class);
            if(column!= null) {
                columns[index++] = column.columnName();
            }
        }
        
        String sql = "select ";
        for (int i=0; i<index; i++) {
            sql += columns[i];
            if(i<index-1){
                sql += ",";
            }
        }
        sql += " from " + tableName;
        System.out.println("sql = " + sql);
    }
}

```



## 5. :moon: 体会反射的动态性

192 14min-

主要是为了实现程序和数据分离, 程序能够动态地响应实时数据(配置文件, 或者用户实时发来的request)来创建对象并使其参与各种运算.



### **体会1：** 动态的创建给定字符串对应的类的对象

```java
public class ReflectionTest {

    //体会反射的动态性：动态的创建给定字符串对应的类的对象
    public <T> T getInstance(String className) throws Exception {
				
      	// forName（）方法获得Class类的实例
        Class clazz = Class.forName(className);
      
				// 通过获取构造器对象来实例化
        Constructor constructor = clazz.getDeclaredConstructor();
        constructor.setAccessible(true);
        return (T) constructor.newInstance();

    }

    @Test
    public void test1() throws Exception {
        String className = "com.atguigu.java1.Person";
        Person p1 = getInstance(className);
        System.out.println(p1);
    }
}
```

### **体会2： **动态的创建指定字符串对应类的对象，并调用指定的方法

192 24-29min 康师傅讲了一个关于这种模式在前端后端数据库三者结合开发时的应用场景

```java
public class ReflectionTest {
    //体会反射的动态性：动态的创建指定字符串对应类的对象，并调用指定的方法
    public Object  invoke(String className,String methodName) throws Exception {
     	  // step 0. Class实例是反射的源头
        Class clazz = Class.forName(className);
      
      	// step 1. 动态地创建全类名对应的运行时类的对象
        Constructor constructor = clazz.getDeclaredConstructor();
        constructor.setAccessible(true);
        Object obj = constructor.newInstance();
				
      	// step 2. 获取运行时类中指定的方法
        Method method = clazz.getDeclaredMethod(methodName);
        method.setAccessible(true);
      	
      	// step 3. step2,3的结果结合 ---> 反射的方式调用方法: 方法调用对象
        return method.invoke(obj);
    }

    @Test
    public void test2() throws Exception {
      // 虽然这里指定的类名和方法名是写死的, 实际中他们可能会从配置文件中读取, 或者用户发送http request时被读取, 从而实现动态地调用指定类的指定方法
        String info = (String) invoke("com.atguigu.java1.Person", "show");

        System.out.println("返回值为：" + info);

    }
}
```



### :gem: practice

192 29min-39min

```java
案例：榨汁机榨水果汁，水果分别有苹果(Apple)、香蕉(Banana)、桔子(Orange)等。

效果如图。

提示：
1、声明(Fruit)水果接口，包含榨汁抽象方法：void squeeze(); /skwiːz/

2、声明榨汁机(Juicer)，包含运行方法：public void run(Fruit f)，方法体中，调用f的榨汁方法squeeze()

3、声明各种水果类，实现水果接口，并重写squeeze();

4、在src下，建立配置文件：config.properties，并在配置文件中配上fruitName=xxx（其中xx为某种水果的全类名） 即在配置文件中写上你想榨哪种水果的汁

5、在FruitTest测试类中，
（1）读取配置文件，获取水果类名，并用反射创建水果对象，
（2）创建榨汁机对象，并调用run()方法
```

代码:

```java
public class ReflectionTest {
	@Test
    public void test1() throws Exception {
        //1.加载配置文件，并获取指定的fruitName值
        Properties pros = new Properties();
       	// 使用IO流默认路径在 module下; 类的加载器的方式默认路径在resources下
        InputStream is = ClassLoader.getSystemClassLoader().getResourceAsStream("config.properties"); 
        pros.load(is);
        String fruitStr = pros.getProperty("fruitName"); // 得到配置文件中key为fruitName对应的value
        
      	//2.创建指定全类名对应类的实例
        Class clazz = Class.forName(fruitStr);
        Constructor constructor = clazz.getDeclaredConstructor();
        constructor.setAccessible(true);
        Fruit fruit = (Fruit) constructor.newInstance();
        
      	//3. 调用相关方法，进行测试
        Juicer juicer = new Juicer();
        juicer.run(fruit);

    }
}

// ---------------------------------------
interface Fruit {
	public void squeeze();
}

class Apple implements Fruit {
	public void squeeze() {
		System.out.println("榨出一杯苹果汁儿");
	}
}

class Orange implements Fruit {
	public void squeeze() {
		System.out.println("榨出一杯桔子汁儿");
	}
}

// 榨汁机 --------------------------------
class Juicer {	
	public void run(Fruit f) {
		f.squeeze();
	}
}

```

其中，配置文件【config.properties】存放在当前Module的src下.

```properties
fruitName=class04_other.exer.Apple
```

<img src="./images/reflectionApp_eg1.png" width=60%>

这样就实现了你在配置文件里指明类名, 之后可以在程序运行时去创建指定类名的对象, 并让其参与各种操作. 实现脚本化创建对象, 实现程序和数据(配置文件)分离



## 6. 复习与企业面试真题

P193 0min-



复习 0-18min

根据复习内容, 我在前面的笔记上做了补充



企业面试真题 18min-37min

```java
1. Class.forName("全路径") 会调用哪些方法? 会调用构造方法吗？ 加载的类会放到哪里? 
  Class.forName()会执行类构造器方法 
  不够调用构造方法(构造器)
  加载的类放在方法区

2. 通过Class.forName()的方式和使用类加载器的方式获取Class实例有何区别? （实际上是JVM相关的面试题） 25min-
  
3. 创建对象有哪几种方法? 27min-
   new: 普通的new / Xxx的静态方法 / XxxBuilder or XxxFactory的静态方法
   反射: CLass的newInstance() /  Constructor的newInstance()
   clone(): 不调用任何构造器, 当前类需要实现Cloneable接口, 实现clone()
   反序列化: 从文件, 网络中获取一个对象的二进制流
     
4. JDK自身的类(e.g. String)中如果结构被private修饰， JDK17中就不允许通过`setAccessible(true)`暴力反射了
```





## 7. 反射的应用: 动态代理

2019年宋红康Java视频讲解, 2023最新版把这部分去掉了

660-663

代理设计模式的原理: 使用一个<u>代理</u>将对象包装起来, 然后用该代理对象取代原始对象。任何对原始对象的调用都要通过代理。代理对象决定是否以及何时将方法调用转到原 始对象上。

+ 之前在interface那章为大家讲解过代理机制的操作，属于静态代理，<u>特征是代理类和目标 对象的类都是*在编译期间确定下来*</u>，不利于程序的扩展。同时，每一个代理类只能为一个接口服务，这样一来程序开发中必然产生过多的代理。最好可以通过一个代理类完成全部的代理功 ----> 动态代理

```java
动态代理是指客户通过代理类来调用其它对象的方法，并且是在程序**运行时**根据需要动态创建目标类的代理对象。

动态代理使用场合: 1) 调试; 2) 远程方法调用

动态代理相比于静态代理的优点:  抽象角色中(接口)声明的所有方法都被转移到调用处理器一个集中的方法中处理，这样，我们可以更加灵活和统一的处理众多的方法。
```



代理模式的三要素: 1) 接口, 2,3) 实现了同一个接口的被代理类和代理类.  其中代理类依赖被代理类(被代理类对象被代理类对象使用), 之所以实现相同的接口, 是为了保证代理类可以调用被代理类的同名方法

<img src="./images/ProxyMode.png" width=40%>





### 静态代理

661

先来看静态代理的例子

+ 特点是代理类写死了

```java
public class StaticProxyTest {

    public static void main(String[] args) {
        // 创建被代理类对象
        NikeClothFactory nikeClothFactory = new NikeClothFactory();
        // 创建代理类对象, 通过构造器依赖注入
        ProxyClothFactory proxyClothFactory = new ProxyClothFactory(nikeClothFactory);

        // 代理类对象执行
        proxyClothFactory.produceCloth();
    }
}


interface ClothFactory{
    void produceCloth();
}


// Proxy: 静态代理的特点, 代理类写死了 --------------------------------------------
// 被代理类作为成员出现在代理类中被使用, 即代理类依赖于被代理类
class ProxyClothFactory implements ClothFactory{
    private ClothFactory factory;       // 用被代理类对象进行实例化 / 多态: 接口的实现类可以被实例化

    public ProxyClothFactory (ClothFactory factory){        // dependency injection
        this.factory = factory;
    }

    @Override
    public void produceCloth() {
        System.out.println("proxy factory do some preliminary work");
        factory.produceCloth();
        System.out.println("Proxy factory do some post work");
    }
}

// 被代理类 -------------------------------------------
class NikeClothFactory implements ClothFactory{
    @Override
    public void produceCloth(){
        System.out.println("Nike工厂生产一批运动服");
    }

}
```



### 动态代理

662

+ 特点是代理类不需要写死, 而是采用静态工厂去动态地生成代理类. 所实现的最终效果就是: 你给定我一个被代理类的对象, 我可以动态地去创建出一个对应的代理类的对象, 允许你通过这个代理类的对象来调用被代理类的同名方法

```java
/**
 * 19年视频教程 662: 动态代理举例
 * 要实现动态代理, 要解决的核心问题: 
 * 		问题一: 如何根据加载到内存中的被代理类, 动态地创建一个代理类及其对象
 * 		问题二: 当通过代理类的对象调用方法时, 如何动态地去调用被代理类中的同名方法?
 * @author xueshuo
 * @create 2023-02-23 10:19 am
 */
public class DynamicProxyTest {

    // 最终实现的效果就是, 只需要给我被代理类的对象, 我就可以动态地生成一个对应代理类的对象, 允许你通过代理类去调用被代理类的同命方法
    public static void main(String[] args) {
        // 创建被代理类对象
        SuperMan superMan = new SuperMan();
        // proxyInstance: 动态地生成代理类的对象
        Human proxyInstance = (Human) ProxyFactory.getProxyInstance(superMan);
        // 当通过代理类对象调用方法时, 会自动地去调用被代理类中的同名方法
        System.out.println(proxyInstance.getBelief());         //  其实是回去调用handler里的invoke()方法
        proxyInstance.eat("四川麻辣烫");

        System.out.println("e.g. 2 *****************************");
        // 创建被代理类对象
        NikeClothFactory nikeClothFactory = new NikeClothFactory(); // 被代理类来自上面静态代理的例子
        // 动态的创建代理类
        ClothFactory proxyClothFactory = (ClothFactory) ProxyFactory.getProxyInstance(nikeClothFactory);
        // 通过代理类来调用被代理类中的同名方法
        proxyClothFactory.produceCloth();
    }
}


interface Human{
    String getBelief();
    void eat(String food);
}

// 被代理类 ------------------------------------------------------
class SuperMan implements Human{
    @Override
    public String getBelief() {
        return  "I believe I can fly!";
    }

    @Override
    public void eat(String food) {
        System.out.println("I like eating " + food);
    }
}

// Proxy: 动态代理的特点, 不写死代理类, 而是用静态工厂去动态地生成代理类 -------------------------------------------------------
class ProxyFactory{
    // 调用此方法, 返回一个代理类的对象,
    // 注意方法的argument的类型指被代理类的类型, 返回值类型指代理类的类型, 因为我们要实现动态代理所以他们都只写Object
    public static Object getProxyInstance(Object obj){      // obj: 被代理类的对象
        MyInvocationHandler handler = new MyInvocationHandler();

        handler.bind(obj);	// 依赖注入

        // 该方法的前两个参数 解决问题一: 如何根据加载到内存中的被代理类, 动态地创建一个代理类及其对象 (利用反射去读取被代理类的ClassLoader, 以及Class实例)
        // 第三个参数解决问题二: 当通过代理类的对象调用方法时, 如何动态地去调用被代理类中的同命方法?
        return Proxy.newProxyInstance(obj.getClass().getClassLoader(), obj.getClass().getInterfaces(), handler);

    }
}

// 解决问题二: 当通过代理类的对象调用方法时, 如何动态地去调用被代理类中的同命方法?
class MyInvocationHandler implements InvocationHandler{
    private Object obj; // 被代理类对象, 赋值时使用被代理类对象

    public void bind(Object obj){       // 依赖注入
        this.obj = obj;
    }

    // 当我们通过代理类的对象调用方法a时， 就会自动地调用如下的方法: invoke()
    // 将被代理类要执行的方法a的功能就声明在invoke()方法中
    // arg1: proxy即我们的代理类对象, arg2: method即代理类对象想要调用的方法对象的实例, arg3: args即同名方法的参数
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {

        // 即为代理类对象调用的方法, 此方法也就作为了被代理类对象要调用的方法
        // 参数中的obj 即为被代理类的对象
        Object returnValue = method.invoke(obj, args);   // 利用反射： 方法(对象)调用对象
        // returnValue即作为当前类中invoke()的返回值
        return returnValue;
    }
}
```



其中最关键的问题二的解决时, 需要定义一个实现了InvocationHandler的类, 在这个类中我们重写invoke()方法, 当我们通过代理类的对象调用方法a时， 就会自动地调用这个被重写的invoke( )方法. 在这个invoke()方法里，method是作为参数传入的因而是动态可变的,  我们可以借助这点来实现AOP



### AOP与动态代理

663

最naive的写法, 用到相同的代码片段时, 复制粘贴, 很拉

<img src="./images/AOP1.png" width=50%>

改进: 我们可以考虑将相同的代码片段集合封装起来实现复用 ----> 代码段1、代码段2、代码段3和深色代码段分离开了，但代码段1、2、3又和一个特定的方法A耦合了!    *最理想的效果是:代码块1、2、3既可以执行方法A，又无须在程序中以硬编码 (指写死代码) 的方式直接调用深色代码的方法, 从而降低耦合性提高灵活度*

<img src="./images/AOP2.png" width=50%>



#### AOP代理

+ 使用Proxy生成一个动态代理时，往往并不会凭空产生一个动态代理，这样没有 太大的意义。通常都是为指定的目标对象生成动态代理

+ :star: 这种动态代理在AOP中被称为AOP代理，AOP代理可代替目标对象，AOP代理包含了目标对象的全部方法。**但AOP代理中的方法与目标对象的方法存在差异: AOP代理里的方法可以在执行目标方法之前、之后插入一些通用处理**. 即我们可以在通过代理类调用被代理类同名方法的切面上进行额外的代理操作(指下图中的通用方法1, 通用方法2), 并且中间调用的代理的类的方法是可以动态变化的 (不需要hard code写死到底调用哪个方法), 这就牛逼了

<img src="./images/AOP3.png" width=30%>



还是以上面的动态代理为例子:

在实现了InvocationHandler的类的invoke()方法中, 我们可以在代理类调用同名方法时, 在执行目标方法的之前, 和之后添加一些通用处理代码块 如下

```java
// ..............
// ..............

class HumanUtil {
    public void method1(){
        System.out.println("================== 通用方法一 ==================");
    }

    public void method2(){
        System.out.println("================== 通用方法二 ==================");
    }
}

// ..............
// ..............

class MyInvocationHandler implements InvocationHandler{
    private Object obj; // 被代理类对象, 赋值时使用被代理类对象

    public void bind(Object obj){       // 依赖注入
        this.obj = obj;
    }

    // 当我们通过代理类的对象调用方法a时， 就会自动地调用如下的方法: invoke()
    // 将被代理类要执行的方法a的功能就声明在invoke()方法中
    // arg1: proxy即我们的代理类对象, arg2: method即代理类对象想要调用的方法对象的实例, arg3: args即同名方法的参数
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {

        HumanUtil util = new HumanUtil();
        util.method1();     // AOP:  代表固定的代码块

        // AOP: 代表可变的代码块------------------------------------------------------
        // 即为代理类对象调用的方法, 此方法也就作为了被代理类对象要调用的方法
        // 参数中的obj 即为被代理类的对象
        Object returnValue = method.invoke(obj, args);   // 利用反射： 方法(对象)调用对象
        // returnValue即作为当前类中invoke()的返回值
        // ------------------------------------------------------------------------

        util.method2();     // AOP:  代表固定的代码块

        return returnValue;
    }
}
```





