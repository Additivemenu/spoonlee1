# Chapter 4 对象与类
## 4.1 面向对象程序设计概述
> 重要OOP概念:
>+ 类(class): 构造对象的模板或蓝图.
> 由类构造(construct)对象的过程称为创建类的实例(instance). 类即注模, 对象即铸造的模型.
>>+ 实例字段(instance field): 对象中的数据.
>>+ 方法(method): 操作数据的过程.
>>+ 对象当前状态(state):作为一个类的实例, 特定对象都有一组特定的实例字段, 这些值的集合就是这个对象的当前状态.
>+ 封装(encapsulation):将数据和行为组合在一个包中, 并对对象的使用者隐藏具体的实现方式.
>+ 继承(inheritance)

> 对象的三个特性:
>+ 行为(behavior): 由可调用方法定义
>+ 状态(state): 必须通过调用方法改变
>+ 标识(identity): 每个对象都有一个唯一标识
> 这三个特性之间相互影响. e.g. 对象的状态会影响到其行为(订单状态为"已付款", 那么此时就应该禁用"付款"行为)

> 类与类之间的关系
>+ 依赖dependence("uses-a"): 如果一个类的方法使用或操纵另一个类的对象, 就说一个类依赖于另一个类;应尽可能将相互依赖的类降至最少.
>+ 聚合aggregation("has-a"): 意味着类A的对象包含类B的对象.
>+ 继承 inheritance("is-a"): 一般来讲, 如果类A扩展类B, 类A不但包含从类B继承的方法, 还会有一些额外的功能.
>+ 可以使用UML(Unified Modelling Language)绘制类图来描述类之间的关系
## 4.2 使用预定义类

> 对象与对象变量
>+ 构造对象
>  **想要使用对象, 首先必须构造对象, 并对其初始状态, 然后对对象应用方法**
>>+ 在Java中, 使用构造器(constructor)构造新实例. 构造器的名字应和类名相同.例如想构造一个Date对象, 需要在构造器前加上new操作符:
>> ```Java
>> new Date(); // 构造了一个新的对象, 它被初始化为当前的日期和时间
>> ```
>+ 复用构造的对象-对象变量
>  通常会希望复用构造的对象, 此时需要将构造的对象放在对象变量里:
> ```Java
> Date birthday = new Date();
> ```

> :full_moon:注意事项
>1. **注意一定要区分对象和对象变量!!!**
>```JAVA
>Date deadline;
>```
>例如上述代码定义了一个对象变量deadline, 它可以引用Date类型的对象,但deadline本身并不是一个对象! **对象变量并没有包含一个对象, 而是引用内存中的对象.** 在Java中, 任何对象变量的值都是对存储在另外一个地方的某个对象的引用.  
>可以认为对象变量相当于C中的指针变量, 而对象相当于一个实实在在的数据（而不是地址值).

>2. **注意一定要先初始化对象变量, 才能对其使用方法**
>不同于C, 在Java中如果未初始化指针(引用)，运行时系统会直接报错,而不是产生一个随机的结果
>>+ 引用新构造的对象
>>```JAVA
>> deadline=new Date();
>>```
>>+ 引用已有的对象 
>>两个对象变量将引用内存中的同一个对象
>>```JAVA
>> deadline=birthday;
>>```
>3. **new操作符返回值也是一个引用**
>>```JAVA
>> Date deadline = new Date();
>>```
>> 表达式new Date()构造了一个Date类型的对象, 它的值是对新创建对象的一个引用. 而这个引用存储在对象变量deadline中.
>4. **所有的Java对象都存储在堆中.当一个对象包含另一个对象变量时,它只是包含另一个堆对象的指针.**


### 4.2.2 Java类库中的LocalDate类
[Java_Date](code2_2_localdate.java)
标准Java类库分别包含了两个类: 
+ 表示时间点的Date类
+ 用日历表示法表示日期的LocalDate类

具体内容先跳过

### 4.2.3 更改器方法与访问器方法
[calender_demo](code2_3_demo.java)

>重要概念
>+ 更改器方法(mutator method): 更改对象状态的方法
>+ 访问器方法(accessor method): 只访问对象而不修改对象状态的方法

具体内容先跳过


## 4.3 :full_moon:用户自定义类
[employeeSalaryManagement](code3_1_employeeTest.java)

在Java中, 最简单的类定义形式为:
```Java
class ClassName{
    field1;
    field2;
    ...
    constructor1;
    constructor2;
    ...
    method1;
    method2;
    ...
}

```

### 4.3.1 基于上面[demo](code3_1_employeeTest.java)分析(原书4.3.2- 4.3.8)

#### 1. 概览
demo中包含两个类: Employee类和带有public修饰符的EmployeeTest类（包含了main方法）. 当编译这段source code时, 编译器将在目录下创建两个类文件: 1) EmployeeTest.class; 2) Employee.class. 在命令行中键入 javac EmployeeTest.java则会编译EmployeeTest及其用到的类

#### 2. public与private修饰符
+ public: Employee类中的方法都被标记为public,这意味着任何类的任何方法都可以调用这些方法.
+ private: Employee类中的字段都标记为了private, 这意味着只有Employee类自身的方法能够访问访问这些实例字段,而其他类的方法则不能读写这些字段.
  
#### 3. 关于构造器  
demo中的Employee类的第二部分关于constructor的定义:
```java
    // define constructor-----------------------------------------
    public Employee(String n, double s, int year, int month, int day){ // remember these parameters are inputs, not actual class property

        //name = Objects.requireNonNullElse(n, "unknown"); // name might be null, 这里我们采用"宽容法"    
        
        //----"严格法"----------
        Objects.requireNonNull(n, "the name cannot be null"); 
        name = n;
        //--------------
        salary = s;
        hireDay = LocalDate.of(year, month, day);
    }
```
注意到:
+ 构造器与类名相同
+ 每个类可以有一个以上的构造器
  通过它们的参数类型来加以区分(见4.6).
+ 构造器可以有0个,1个或多个参数
+ 构造器可以没有返回值
+ **构造器总是伴随着new操作符一起调用**
+ **注意:不要在构造器中定义与实例字段同名的局部变量**  
 以防止这些局部变量遮蔽(shadow)同名的实例字段.例如以下构造器中声明了局部变量name和salary， 这与Employee类的实例字段重名了.
 ```Java
 public Employee(String n, double s, ...){
 String name = n //error
 double salary = s; // error
}
 ```
#### 4.使用var关键字声明局部变量
在Java10中, 如果可以从变量的初始值推导出它们的类型, 那么可以用var关键字声明局部变量,而无需指定类型.  
```java
Employee haary = new Employee("Harry", 50000, 1989,10,1); //最标准写法
var harry = new Employee("Harry", 50000, 1989,10,1); // 也可这样
```
不过我们一般不会对数值类型使用var, 如int, long或者double. 注意var关键字只能用于方法中的局部变量, 参数和字段的类型必须声明.

#### 5.关于使用null引用
我们知道, 一个对象变量包含一个对象的引用, 或者包含一个特殊值null(表示没有引用任何对象). **定义一个类时, 最好事先清楚哪些字段可能为null**. 如果对一个null值应用一个方法, 则会产生一个NullPointerException异常. 有两种方式来address关于null值的使用:
+ "宽容型"方法: 把null参数转换为一个适当的null值(希望接收可有可无的值)
```java
public Employee(String n, double s, int year, int month, int day){
    name =  Objects.requireNonNullElse(n,"unknown");
    ...
}
```
+ "严格型"方法: 干脆直接拒绝null参数(不希望接收可有可无的值)
此时如果用null名字构造了一个Employee对象, 就会产生NullPointerException异常.这种做法有两个好处: 1)异常报告会提供这问题的描述; 2)异常报告会准确指出问题所在的位置, 方便定位错误.
 
```java
public Employee(String n, double s, int year, int month, int day){
    Objects.requireNonNull(n, "The name cannot be null");
    name = n;
    ...
}
```
#### 6.隐式参数与显示参数
>+ 隐式(implicit)参数: 用关键词this指示隐式参数(Java中可写可不写), 隐式参数不会出现在方法声明中.
>+ 显示(explicit)参数: 位于方法名后面括号中的数值, 显式地列在方法声明中

#### 7.封装的优点
略

### 4.3.2 其他碎碎念 
#### 1.基于类的访问权限
一个方法可以访问所属类的所有对象的私有数据.

#### 2. 私有方法
>+ 私有方法: 关键字private. 从程序设计者的角度来讲, 如果方法是私有的, 类的设计者就可以确信他不会用在别处, 可将其删去.
>+ 公有方法: 关键字public. 程序设计这应意识到, public method不能随便删去, 因为可能会有其他代码依赖这个方法. 

#### 3. final实例字段
>可以将实例字段定义为final, 这样的字段必须在构造对象时初始化， 且之后无法再修改这个字段.


## 4.4 静态字段与静态方法
解释static修饰符的含义: **静态, 与类关联, 是类的方法(静态方法)或属性(静态字段), 而与动态变化的对象无关. 因此, 静态字段和静态方法不依赖于对象, 通过类便可直接调用, 而一般的实例字段却需要对象才能使用.**
### 4.4.1 静态字段
>+ 如果将一个字段定义为**static**, **每个类**只有一个这样的字段;
>+ 对于非静态的实例字段, **每个对象**都有一个自己的副本
> (静态字段也叫类字段, "静态"是延续了C++的叫法并无实际含义)


```Java
class Employee{
    private static int nexId = 1;
    private int id;
}
```
上面的代码表示, 每一个Employee对象都有一个自己的字段, 但这个类的所有实例都共享一个nextId字段. 例如, 如果有1000个Employee类对象, 则有1000个实例字段id, 分别对应每一个对象. 但是， 只有一个静态字段nextId.即使没有Employee对象, 静态字段nextId也存在(因此只要有static关键字, 那么你就可以无需对象便可访问字段).它属于类, 而不属于单个的对象. 这种静态字段一般用于类共享的信息(类似多线程中需要一个共享变量来递增id)

==有个代码例子???????没懂==

### 4.4.2 静态常量
静态变量用的比较少, 但是静态常量却用得很多. 例如Math类中关于PI的定义:
```Java
public class math{
    ...
    public static final double Pi = 3.14159265358979323846;
}
```
在程序中用Math.PI来访问这个常量. 但如果这里省略关键字static, PI就变成了Math类的一个实例字段, 即需要一个Math类的对象来访问PI，且每一个Math对象都有一个自己的PI副本.

==另一个常使用的静态常量是System.out ???????回头看==
### 4.4.3 静态方法
>+ **静态方法是不在对象上执行的方法 (或认为是没有this参数的方法).**
> 例如Math类的pow方法就是一个静态方法, 表达式 Math.pow(x,a)会计算x的a次幂. 在运算完成时, 它不使用任何Math对象(换言之,它没有隐式参数). 这种方法更像是面对过程中的普通函数.
>+ **静态方法无法访问非静态实例字段, 因为它不能在对象上执行; 但是相应地, 静态方法可以访问静态字段.** 
>+ 可以使用对象来调用静态方法, 这是合法的, _但是不推荐这么做, 因为这违背了我们使用静态方法的初衷: 静态方法不依赖于对象, 而是属于类的._

> 以下两种情况可以使用静态方法
>+ 方法不需要访问对象状态, 因为它需要的所有参数都通过显示参数提供.(e.g. Math.pow) 
>+ 方法只需访问类的静态字段

### 4.4.4 工厂方法 
使用静态工厂方法(factory method)来构建对象.

已见过的工厂方法包括: LocalDate.now 和 LocalDate.of

==NumberFormat类??????==



### 4.4.5 main方法
main方法也是一个静态方法, 它不对任何对象进行操作. 每一个类都可以有一个main方法, 这是常用于对类进行单元测试的一个技巧.

[staticTest](code4_4_staticTest.java)

+ **注意textbook中 class Employee前得也加上static, 否则无法在Employee类中定义static field or method**
+ 注意并不是只要一个方法用到static field, 该方法就是static method--**是否要冠以一个method以static, 取决于该方法是否要用到instances的field(是否可以只依赖于类).** 比如demo中的setId方法用到了static field nextId, 但同时也要用到instances的id, 所以不是static method.

+ run public class staticTest的main method:  
可见static class Employee的main method并未被执行  
```shell
name=Tom, id=1, salary=40000.0
name=Dick, id=2, salary=60000.0
name=Harry, id=3, salary=65000.0
Next available id = 4
```
+ run static class Employee的main method:  
可见只有static class Employee的main method被执行了  

```shell
Harry50000.0
```
## 4.5 :full_moon:方法参数
[paramTest](code4_5_paramTest.java)

Java程序设计语言对对象采用的不是按引用调用, 实际上, **对象引用是按值传递的.**

>对demo总结（运行结果见代码注释）
>+ 有两种类型的方法参数:
>> 1) 基本数据类型(数字, boolean)
>> 2) 对象引用
>+ **Test1: 当基本数据类型作为方法参数时, 方法不能修改基本数据类型的参数(即数值型或布尔型).**  
> 因为Java对于基本数据类型的参数是按值传递的. 方法会创建主函数中基本数据的副本, 然后在副本中计算, 方法调用结束后副本中的变量会被释放.
>+ **Test2: 当对象引用作为方法参数时, 方法可以改变对象参数的状态.**
> 因为对象是按照对象引用作为方法参数而被方法调用的. 方法同样会创建主函数中对象变量的副本(**对象变量就是对对象的引用**), 这样副本中的对象变量和主函数中的对象变量其实都引用(指向)了内存中的同一对象, 在副本中改变对象变量其实就在改变内存中的对象, 所以此时方法调用结束后对象的状态可以被改变.
>+ **Test3: 当对象引用作为方法参数时, 方法不能让一个对象参数引用一个新的对象 (methods can't attach new objects to object parameters).**
>test3的结果显示, swap方法只是交换了副本中的参数x和y, 并没有交换主函数中的我们想交换的对象变量a和b. 主函数中的对象变量a和b分别引用了内存中的对象A和B, a和b的值应该就是内存中对象a和b的地址, 现在想要使得对象变量a指向对象B, 对象变量b指向对象A, 需要交换的是对象变量a和b的值, 但是实际上swap方法创建的副本中对象变量x和y初始化得到的值是内存中的对象A和B的地址值, 交换x和y根本不会影响到主函数中对象变量a和b的值 (除非你用指针分别指向对象变量a和b, 再令指针指向的值互换, 不过这是C的思想了.)本质上还是因为Java是按值传递的(call by value).

## 4.6 对象构造
对象构造非常重要, Java提供了多种编写构造器的机制.
### 4.6.1 重载
>+ 如果多个方法有相同的名字,不同的参数, 便出现了**重载(Overloading)**.编译器必须挑选出具体调用哪个方法: 编译器用各个方法首部中的参数类型与特定方法调用中所使用的值类型进行匹配, 来选出正确的方法.这个查找匹配的过程叫**做重载解析(overloading resolution)**.
>+ Java允许重载任何方法, 要完整地描述一个方法, 需要指定方法名及其参数类型, 这叫做方法的**签名(signature)**.例如String类有4个名为indexOf的公共方法, 它们的签名是:
>>```java
>> indexOf(int)
>> indexOf(int, int)
>> indexOf(String)
>> indexOf(String, int)
>> ```
>> 注意返回类型不是方法签名的一部分, 也就是说不能有两个名字相同, 参数类型也相同却有不同返回类型的方法. 
### 4.6.2 :full_moon:默认字段初始化
>如果在构造器中没有显式地为字段设置初值, 那么就会被自动赋值为默认值:
>+ 数值为0
>+ boolean值为false
>+ 对象引用为null
> 依赖默认值的做法是一 b种不好的编程实践, 如果不对字段明确地进行初始化, 就会影响程序代码的可读性. 

>:full_moon:**注意区分字段与局部变量关于初始化的区别:**
>+ 方法中的局部变量必须明确地初始化 
>+ 但是在类中，如果没有初始化类中的字段, 将会自动初始化为默认值(0, false OR null).


### 4.6.3 无参数的构造器
>+ 如果编写一个类时没有编写构造器, 那么Java会为你提供一个无参数构造器, 这个构造器将所有的实例字段设置为默认值.例如以下是Employee类的无参数构造器:
>>```Java
>> public Employee(){
>>  name = "";
>>  salary = 0;
>>  hireDay = LocalDate.now();
>>}
>>```
>+ 如果编写一个类时编写了至少一个构造器, 但没有编写无参数的构造器, 那么构造对象时必须提供参数. 例如 [4-2 Demo](code3_1_employeeTest.java)中的Employee类提供了一个简单的构造器:
>>```Java
>>public Employee(String n, double s, int year, int month, int day)
>>```
>>对于这个类, 如果你不提供参数而想构造默认员工就是不合法的:
>>```java
>>e = new Employee(); // error
>>```

### 4.6.4 :full_moon:显式字段的初始化
>+ **除了在构造对象时初始化字段, 在定义类时的字段时(也叫声明, 编写一个类的step1)也可以直接为任何字段赋值.** 如果希望把一个类的所有构造器的某特定字段设置为同一个值, 这个语法就很方便. 例:
>> ``` java
>> class Employee{
>>    private String name = "";
>> }
>> ```
>> 但是在C++中, 不能直接初始化类的实例字段, 所有的字段都必须在构造器中设置
>+ **初始值不一定非得是常量.** 例如下面例子中就是利用方法调用来初始化一个Employee对象的id.
>> ``` java
>> class Employee{
>> private static int nextId;
>> private int id = assignId();
>> ...
>> private static int assignId(){
>>  int r = nextId;
>>  nextId++;
>>  return r;
>>  }
>> ...
>> }
>> ```
==试下这个代码!!!==

至此, 我们学习到了两种初始化字段的方式:
+ 在构造器中设置值
+ 在声明中赋值

在4.6.7中, 我们还会了解到第三种初始化字段的方式--初始化块(initialization block)

### 4.6.5 参数名
 关于参数命名的实践: 以下构造器中, 等号左边是实例字段, 右边是传入的参数变量. 这里的核心问题在于不要把二者取一样的名字, 否则参数变量会遮蔽同名的实例字段, 一般有以下三种习惯来区分实例字段和参数变量:
+ 我们通常喜欢用单个字母作为参数名:
 ```java
 public Employee(String n, double s){
      name = n;
      salary = s;    
 }
 ```
 但是这种方式会降低代码可读性.
+ 有些程序员在每个参数前面加一个前缀"a"(preferred):
 ```java
  public Employee(String aName, double aSalary){
      name = aName;
      salary = aSalary;
  }
 ```
+ 用this指示隐式参数(preferred): 
 ```java
 public Employee(String name, double salary){
      this.name = name;
      this.salary = salary;
 }
 ```
Java中不写this也行, 只要能区分开实例字段和参数变量即可.


### 4.6.6 :full_moon:调用另一个构造器
关键字this指示一个方法的隐式参数, 但它还有另一个含义:
如果构造器的第一个语句形如this(...), 这个构造器将调用同一个类的另一个构造器:
```java
public Employee(double s){ // another constructor
    //calls Employee(String, double)
    this("Employee #"+nextId, s); // overload
    nextId++;
}
```
这样当调用new Employee(60000)时, Employee(double)构造器将调用Employee(String, double)构造器. 采用这种方式使用this关键字非常有用, 这样对公共的构造器代码只需要编写一次即可.
==没懂?????? -- 看4.6.7 demo==

### 4.6.7 :full_moon:初始化块 (initialization block)
[constructorTest](code4_5_constructorTest.java)

>Results: 
> 可见Employee的id是按照代码递增1的
>```shell
>name=Harry, id=6978, salary=40000.0
>name=Employee #6979, id=6979, salary=60000.0
>name=, id=6980, salary=0.0
>```
>上述demo展示了很多本节讨论的特性:
>+ 重载构造器
>+ 用this(...)调用另一个构造器
>+ 无参数构造器
>+ 对象初始化块
>+ 静态初始化块
>+ 实例字段初始化

---

前面我们已经讲过两种初始化数据字段的方式:
+ 在构造器中设置值 (更常用)
+ 在声明中赋值

现在来讲第三种机制: **初始化块(initialization block).** 在一个类的声明中, 可以包含任意多个代码块. 只要构造这个类的对象, 这些块就会被执行:
```java
class Employee{
    private static int nextId;

    private int id;
    private String name;
    private double salary;

    // object initialization block
    {
        id = nextId;
        nextId++;
    }

    public Employee(String n, double s){
        name = n;
        salary = s;
    }

    public Employee(){
        name = "";
        salary = 0;
    }
    ...
}
```
在这个示例中, 无论使用哪个构造器构造对象, id字段都会在对象初始化块中初始化, 首先运行初始化块, 然后才运行构造器主题部分. 这种机制不是必须的, 也不常见, 通常哦我们会直接将初始化代码放在构造器中.  
如果想要使用这种机制, 建议总是将初始化块放在字段定义之后以防止循环定义.

> 注解: 调用构造器的具体处理步骤：
> 1. 如果构造器的第一行调用了另一个构造器, 则基于所提供的参数执行第二个构造器.
> 2. 否则,
>> + 所有的数据字段初始化为其默认值(0, false OR null).
>> + 按照在类声明中出现的顺序, 执行所有字段初始化方法和初始化块.
> 3. 执行构造器主体代码. 

---

**静态初始化块**
如果类的静态字段需要很复杂的初始化代码, 那么可以使用静态的初始化块:

```java
//static initialization block
static{
    var generator = new Random(); // need import util
    nextId = generator.nextInt(10000);
}
```
这样当类第一次加载时, 将会进行静态字段的初始化.

### 4.6.8 对象析构与finalize方法
Java可以完成自动的垃圾回收, 不需要人工回收内存,所以Java不支持析构器.(有些面向对象的程序设计语言,特别是C++， 有显式的析构器方法, 其中放置一些当对象不再使用时需要执行的清理代码. 析构器中最常见的操作时回收分配给对象的存储空间.)

有些对象使用了内存之外的其他资源, 比如文件或使用了系统资源的另一个对象的句柄. 在这种情况下, 当资源不再需要时, 将其回收和再利用就非常重要. 如果一个资源一旦使用完就需要立即关闭, 那么应提供一个close方法来完成必要的清理工作. 可以在对象使用完时调用这个close方法(注意不要使用finalize方法完成清理, 它已被废弃.).

## 4.7 包
Java允许使用包(package)来将类组织在一个集合中. 借助包我们可以方便地组织自己的代码, 并将自己的代码与别人提供的代码库分开管理.

### 4.7.1 包名
>+ **使用包的主要原因是确保类名的唯一性.**  
> 假如两个程序员同时建立了Employee类, 只要将这些类放置在不同的包中就不会产生冲突. 事实上, 为了保证包名的绝对唯一性, 要用一个因特网域名(这显然是唯一的)以逆序的形式作为包名, 然后对不同的工程使用不同的子包.
>+ **每一个包都是独立的类的集合**
> 从编译器的角度来看, 嵌套的包之间没有任何关系. 例如java.util包与java.util.jar包之间毫无关系.
### 4.7.2 类的导入
> **一个类可以使用所属包中的所有类, 以及其他包中的公共类**, 对于后者, 我们有两种方法来访问:
>>+ 使用完全限定名(fully qualified name)
>> 即包名后面跟着类名(很繁琐), 例如:
>> ```java
>> java.time.LocalDate today = java.time.LocalDate.now();
>> ```
>>+ 使用import语句 
>> 可以使用import语句导入一个特定的类或整个包
>> ```java
>> import java.time.*; // import all package
>> import java.time.LocalDate; // import the specified class
>>```

> **注意!**
> 在多数情况下, 可以用import导入你需要的包而不必过多考虑. 但如果发生命名冲突, 此时应注意包了. 例如, java.util和java.sql包都有Date类, 如果你同时导入这两个包:
> ```java
> import java.util.*;
> import java.sql.*;
> ```
> 在程序使用Date类的时候, 就会出现编译错误:
> ``` java
> Date today; // error -- java.util.Date OR java.sql.Date?
> ```
> 此时有两种方式来指定你到底想用哪个包的类:
>+ 增加一个特定的import语句
>> ```java
>> import java.util.*;
>> import java.sql.*;
>> import java.util.Date;
>> ``` 
>+ 在类名前加上完整的包名
>> ```java
>> var deadline = new java.util.Date();
>> var today = new java.sql.Date();
>> ``` 

---

在包中定位类是编译器(compiler)的工作. C++中与包类似的机制是命名空间(namespae)特性.

### 4.7.3 静态导入
import语句还可以允许导入静态方法和静态字段, 而不只是类
如下添加在源文件顶部, 便可使用System类的静态方法和静态字段(如System.out, System.exit), 而不必加类名前缀
``` java
import static java.lang.System.*;
```

另外, 还可以导入特定的方法或字段:
```java
import static java.lang.System.out; // you can use print directly in the code instead of writing "System.out.print();"
```

### 4.7.4 在包中增加类



### 4.7.5 包访问

### 4.7.6 类路径

### 4.7.7 设置类路径




## 4.8 JAR文件





## 4.9 文档注解





## 4.10 类设计技巧