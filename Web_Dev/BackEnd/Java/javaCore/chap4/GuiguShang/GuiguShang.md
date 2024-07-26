References:

:computer: [尚硅谷 面向对象(下):  static, 代码块, final (313-340)](https://www.bilibili.com/video/BV1Kb411W75N?p=315&vd_source=c6866d088ad067762877e4b6b23ab9df)

之后的抽象类, 抽象方法, 接口, 内部类见CoreJava chap6 笔记



# 1. static 关键字

313-326

我们有时候希望无论是否产生了对象或无论产生了多少 对象的情况下，某些特定的数据在内存空间里只有一份，例如所有的中国人都有个 国家名称，每一个中国人都共享这个国家名称，不必在每一个中国人的实例对象中 都单独分配一个用于代表国家名称的变量。

```
static可以用来修饰的结构: 属性, 方法, 代码块, 内部类
```



## 1.1 static 修饰属性

使用static修饰属性: 静态变量 (类变量)

1. 属性按是否被static修饰又分为: 静态属性 vs. 非静态属性(实例变量)
   + 实例变量： 我们创建了类的多个对象, 每个对象都独立地拥有一套类中的非静态属性, 当修改其中一个对象的非静态属性时， 不会导致其他对象中同样的属性值的修改.
   + 静态变量: 我们创建了类的多个对象, 多个对象共享同一个静态变量. 当通过某一个对象修改静态变量时. 会导致其他对象调用次静态变量时, 也是修改过的.

2. static 修饰属性的其他说明
    静态变量随着类的加载而加载, 可以通过"类.静态变量"的方式进行调用
    静态变量的加载要早于对象的创建
    由于类只会加载一次, 则静态变量在内存中也只会存在一份: 存在方法区的静态域中


:bangbang: 不能通过类来调用非静态的结构, 但是可以通过对象调用静态结构

| 能否调用 | 类变量 | 实例变量 |
| -------- | ------ | -------- |
| 通过类   | yes    | no       |
| 通过对象 | yes    | Yes      |



3. 静态属性举例: System.out; Math.PI



```java
public class StaticTest {
    public static void main(String[] args) {

        Chinese.nation = "中国";     // 静态变量随着类的加载而加载

        Chinese c1 = new Chinese();
        c1.name = "姚明";
        c1.age = 40;

        Chinese c2 = new Chinese();
        c2.name = "马龙";
        c2.age = 30;

        c1.nation = "CHN";
        c2.nation = "CHINA";
        System.out.println(c2.nation);  // "CHINA"
    }
}

class Chinese{
    String name;
    int age;

    static String nation;

}
```



### :moon: JVM内存解析

316

![static_JVM](./Src_md/static_JVM.png)

注意JVM三大结构: 栈, 堆, 方法区分别用来存放什么

JVM的内存解析最早在封装那里提到



## 1.2 static 修饰方法

317

1. 使用static修饰方法

随着类的加载而加载, 可以通过"类.静态方法"来调用

2. static调用权限:

| 能否调用 | 静态方法 | 非静态方法             |
| -------- | -------- | ---------------------- |
| 通过类   | yes      | no                     |
| 通过对象 | yes      | Yes (但是不推荐这么写) |

+ 静态方法中, 只能调用静态的方法或属性， 因为他们的生命周期是一致的

+ 非静态方法中, 既可以调用非静态的方法或属性，也可以调用静态的方法或属性

3. static 注意点

* 在静态的方法内, 不能使用this, super关键字
* 关于静态属性和静态方法的使用, 大家都从生命周期的角度去理解



```java
class Chinese{
    String name;
    int age;

    static String nation;
		
   // non-static 方法 -------------------------------------- 
    public void eat(){
        System.out.println("中国人吃中餐");
        // 调用非静态结构
        System.out.println(name);

        info();

        // 调用静态结构
        walk();
        System.out.println("nation: "+ nation);
    }

    public void info(){
        System.out.println(name + age);
    }

		// static 方法 ------------------------------------------
    public static void show(){
        System.out.println("I am a Chinese");
        // 不能调用非静态结构
//        eat();
//        name = "Tom"

        // 可以调用静态结构
        System.out.println(nation);
        walk();
    }

    public static void walk (){

    }


}
```



:bangbang: 属性和方法是否该加static的经验之谈

```
6. 开发中如何确定一个属性是否要被声明为static?
      > 属性是可以被多个对象所共享的, 不会随着对象的不同而不同的.
      > 类中的常量也常常声明为static. e.g. Math.PI

    开发中如何确定一个方法是否要被声明为static?
      > 操作静态属性的方法, 通常就设置为static (非静态的方法也可以调用静态属性, 但是方便期间保证他们的生命周期一致)
      > 工具类中的方法, 习惯上声明为static的. 比如, Math, Arrays, Collections
```



## 1.3 static 应用举例

320

注意下例中Circle哪些属性被声明为static

```java
public class CircleTest {
    public static void main(String[] args) {
        Circle c1 = new Circle();
        Circle c2 = new Circle();
        Circle c3 = new Circle(3.4);

        System.out.println("c1's id is: " + c1.getId());
        System.out.println("c2's id is: " + c2.getId());
        System.out.println("c3's id is: " + c3.getId());

        System.out.println("total circles: " + Circle.getTotal() );
    }

}


class Circle{

    private double radius;
    private int id;     // 每创建一个新的Circle, id 自动递增

    public Circle(){
        id = init++;
        total++;
    }

    public Circle(double radius){
        this();
//        id = init++;
//        total++;

        this.radius = radius;
    }

    private static int total;       // how many circle has been created, 被所有对象共享
    private static int init = 1001; // 辅助赋值给Circle对象的id, 被所有对象共享

    public double findArea(){
        return 3.14 * radius * radius;
    }

    public int getId() {
        return id;
    }

    public static int getTotal() {
        return total;
    }

    public void setId(int id) {
        this.id = id;
    }
}
```



## 1.4 static 练习

321

```java
编写一个类实现银行账户的概念，包含的属性有“帐号”、“密 码”、“存款余额”、“利率”、“最小余额”，定义封装这些 属性的方法。账号要自动生成。 编写主类，使用银行账户类，输入、输出3个储户的上述信息。 考虑:哪些属性可以设计成static属性。
```

:bangbang: 明确一个类中哪些属性应该是static, 哪些不是

```java
public class Account {
    private int id;
    private String pwd = "0000000";
    private double balance;

    private static double interestRate;
    private static double minMoney = 1.0;
    private static int init = 1001; // 辅助, 用于自动生成id

    public Account () {
        id = init++;
    }

    public Account(String pwd, double balance){
        id = init++;
        this.pwd = pwd;
        this.balance = balance;
    }

    @Override
    public String toString() {
        return "Account{" +
                "id=" + id +
                ", pwd='" + pwd + '\'' +
                ", balance=" + balance +
                '}';
    }

		
  	// 各种getter, setter.....
  	
}
```

```java
public class AccountTest {
    public static void main(String[] args) {
        Account acct1 = new Account();
        Account acct2 = new Account("password", 1000.0 );


        Account.setInterestRate(0.012);
        Account.setMinMoney(100);

        System.out.println(acct1);
        System.out.println(acct2);

        System.out.println(Account.getInterestRate());
        System.out.println(Account.getMinMoney());
    }
}
```











## 单例模式

322 - 326

这里也讲了单例模式, 更全面的单例模式见design pattern



```java
单例模式的优点: 
由于单例模式只生成一个实例，减少了系统性能开销，当一个对象的 产生需要比较多的资源时，如读取配置、产生其他依赖对象时，则可以通过在应用启动时直接产生一个单例对象，然后永久驻留内存的方 式来解决。
  
> 网站的计数器，一般也是单例模式实现，否则难以同步。
> 应用程序的日志应用，一般都使用单例模式实现，这一般是由于共享的日志 文件一直处于打开状态，因为只能有一个实例去操作，否则内容不好追加。
> 数据库连接池的设计一般也是采用单例模式，因为数据库连接是一种数据库
资源。
> 项目中，读取配置文件的类，一般也只有一个对象。没有必要每次使用配置
 文件数据，都生成一个对象去读取。
> Application 也是单例的典型应用
> Windows的Task Manager (任务管理器)就是很典型的单例模式
> Windows的Recycle Bin (回收站)也是典型的单例应用。在整个系统运行过程
 中，回收站一直维护着仅有的一个实例。
```





# 2. main()方法 与代码块

## main()

327

```java
 main()方法的使用说明
* 1. main()作为程序的入口
* 2. main() 方法也是普通的静态方法,
*      即可以通过类去调用main()
*      main()内部不能通过类调用非静态方法, 而只能通过对象调用非静态方法
* 3. main() 的形参, 允许我们与控制台交互 (之前我们是用Scanner)
```



```java
public class MainTest {

    public static void main(String[] args) {

        Main.main(new String[100]);
      
        // main()内部只能通过对象调用非静态结构
        MainTest test = new MainTest();
        test.show();
    }

    public void show(){

    }
}

class Main{

    public static void main(String[] args) {

        for(int i = 0 ; i < args.length; i++){
            args[i] = "args_" + i;
            System.out.println(args[i]);
        }
    }
}
```



了解即可, 通过控制台交互: 给main() 输入args: 

```bash
(base) ➜  Main git:(master) ✗ javac MainDemo.java						// 编译
(base) ➜  Main git:(master) ✗ java MainDemo arg1 "89" 90 		// 运行, 同时指定args

```





## 代码块

328-331

```java
* 类的成员之四: 代码块
*  1. 代码块的作用: 用来初始化类, 对象。 不能被主动调用, 而是被动执行
*
*  2. 代码块如果有修饰的话, 只能用static
*        分类: 静态代码块 vs. 非静态代码块
*
*  3. 静态代码块
*      > 内部可以有输出语句
*      > 随着类的加载而执行, 而且只执行1次
*      > 作用: 初始化类的信息
*      > 如果一个类中定义了多个静态代码块, 则按照声明的先后顺序执行 (不过一般写1个就够了)
*          > 静态代码块的执行要优先于非静态代码块的执行
*      > 静态代码块内只能调用静态的结构, 不能调用非静态的结构
*
*  4. 非静态代码块
*      > 内部可以有输出语句
*      > 随着对象的创建而执行, 每当创建一个对象就执行1次非静态代码块
*      > 作用: 可以在创建对象时, 对对象的属性进行初始化
*      > 如果一个类中定义了多个非静态代码块, 则按照声明的先后顺序执行(不过一般写1个就够了)
*      > 非静态代码块内部, 可以调用静态的结构, 也可以调用非静态的结构
  
*      至此, 对属性(成员变量)可以赋值的位置:
*           1. 默认初始化
*           2. 显式初始化
*           3. 构造器中初始化
*           4. 有了对象之后, 通过"对象.属性" or "对象.方法"的方式进行赋值
*           5. 在代码块中赋值
```



学到这里, 其实一个类的内部分4个部分了: field ; constructors; block; methods

```java
public class BlockTest {
    public static void main(String[] args) {
       String desc = Person.desc;
        System.out.println(desc);

        Person person1 = new Person();
        Person person2 = new Person();
        System.out.println("age of person2 is" +  person2.age);
    }

}

class Person{
		// fields --------------------------------------------
    String name;
    int age;
    static String desc = "I am a person";

    // constructors ---------------------------------------
    public Person(){

    }

    public Person(String name, int age){
        this.name = name;
        this.age = age;
    }

    // block -----------------------------------------------
    // 静态代码块
    static {
        System.out.println("hello, static block - 1");
        desc = "I am a person loving Java!";
    }

    static {
        System.out.println("hello, static block - 2");
    }
    // 非静态代码块
    {
        System.out.println("hello, block - 1");
        this.age = 1;
    }

    {
        System.out.println("hello, block - 2");
    }

    // methods ---------------------------------------------
    public void eat(){
        System.out.println("eat");
    }

    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }

    public static void info(){
        System.out.println("I am a happy person");
    }
}
```



### 开发中代码块的使用

329

用来辅助初始化类或者对象的信息, 尤其当这种信息的要求比较复杂时（比如要求成员变量的初始化是满足单例模式的）

```java
public class JDBCUtils {
	
	private static DataSource dataSource = null;
  
  // 使用static block辅助完成 dataSource的初始化, 保证在JDBCUtils加载时 dataSource有值且单例
	static{
		InputStream is = null;
		try {
      // 初始化的必备前置操作
			is = DBCPTest.class.getClassLoader().getResourceAsStream("dbcp.properties");
			Properties pros = new Properties();
			pros.load(is);
			//调用BasicDataSourceFactory的静态方法，获取数据源。
			dataSource = BasicDataSourceFactory.createDataSource(pros);
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			if(is != null){
				try {
					is.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
  
	//使用DBCP数据库连接池实现数据库的连接
	public static Connection getConnection2() throws SQLException{
		Connection conn = dataSource.getConnection();
		System.out.println(conn);
		return conn;
	}
	
}
```



### 代码块的课后练习

:gem:  e.g.1

```java
/**
 * 总结: 由父及子, 静态先行
 *
 */
class Root{
	static{
		System.out.println("Root的静态初始化块");
	}

	{
		System.out.println("Root的普通初始化块");
	}
	public Root(){
		System.out.println("Root的无参数的构造器");
	}
}

class Mid extends Root{
	static{
		System.out.println("Mid的静态初始化块");
	}

	{
		System.out.println("Mid的普通初始化块");
	}

	public Mid(){
		System.out.println("Mid的无参数的构造器");
	}

	public Mid(String msg){
		//通过this调用同一类中重载的构造器
		this();
		System.out.println("Mid的带参数构造器，其参数值："
			+ msg);
	}
}
class Leaf extends Mid{

	static{
		System.out.println("Leaf的静态初始化块");
	}

	{
		System.out.println("Leaf的普通初始化块");
	}

	public Leaf(){
		//通过super调用父类中有一个字符串参数的构造器
		super("尚硅谷");
		System.out.println("Leaf的构造器");
	}
}

public class LeafTest{
	public static void main(String[] args){
		new Leaf();
		System.out.println();
		new Leaf();
	}
}
```

结果: 

```bash
Root的静态初始化块
Mid的静态初始化块
Leaf的静态初始化块
Root的普通初始化块
Root的无参数的构造器
Mid的普通初始化块
Mid的无参数的构造器
Mid的带参数构造器，其参数值：尚硅谷
Leaf的普通初始化块
Leaf的构造器

Root的普通初始化块
Root的无参数的构造器
Mid的普通初始化块
Mid的无参数的构造器
Mid的带参数构造器，其参数值：尚硅谷
Leaf的普通初始化块
Leaf的构造器
```



:gem: e.g.2

```java
class Father {
	static {
		System.out.println("Father's 静态代码块");
	}

	{
		System.out.println("Father's 非静态代码块");
	}

	public Father() {
		System.out.println("Father 无参构造器");

	}

}

public class Son extends Father {
	static {
		System.out.println("Son's 静态代码块");
	}

	{
		System.out.println("Son's 非静态代码块");
	}

	public Son() {
		System.out.println("Son's 无参构造器");
	}


	public static void main(String[] args) { // 由父及子 静态先行
		// main 也是静态方法, 需要依赖类来调, 先加载son类, 再调用main

		System.out.println("77777777777");
		
		System.out.println("************************");
		new Son();
		
		System.out.println("************************");
		new Son();
		
		System.out.println("************************");
		new Father();
	}

}
```

执行结果

```bash
Father's 静态代码块
Son's 静态代码块
77777777777
************************
Father's 非静态代码块
Father 无参构造器
Son's 非静态代码块
Son's 无参构造器
************************
Father's 非静态代码块
Father 无参构造器
Son's 非静态代码块
Son's 无参构造器
************************
Father's 非静态代码块
Father 无参构造器
```





### 属性赋值的先后顺序

```java
 * 至此, 对属性(成员变量)可以赋值的位置, 他们的执行顺序是:
 *       1. 默认初始化
 *       2. 显式初始化 3. 在代码块中赋值  (2 & 3 同级别， 谁先写谁先执行)
 *       4. 构造器中初始化
 *       5. 有了对象之后, 通过"对象.属性" or "对象.方法"的方式进行赋值
```



```````java
public class OrderTest {
    public static void main(String[] args) {
        Order order = new Order();
        System.out.println(order.orderId);

    }
}

class Order{
    int orderId =3;

    {
        orderId = 4;
    }
}
```````

执行结果,  因为2. 显式初始化 3. 在代码块中赋值  (2 & 3 同级别， 谁先写谁先执行)

```bash
4
```







# 3. final 关键字

332-335

final可以修饰的结构: 类, 方法, 变量

## 修饰类

final修饰一个类: 此类不能被其他类所继承
*         比如: String类, System类, StringBuffer类

## 修饰方法

final修饰一个方法: 表明此方法不可以被重写
*         比如: Object类中的getCLass()



## 修饰变量

final修饰一个变量: 此时的'变量'成为一个常量. '变量'分为两种: 属性(类的成员变量)和局部变量(声明在方法体里的变量)



### 修饰属性

final 修饰属性, 可以考虑初始化的位置有： 

+ 显式初始化 (默认初始化失效), 
+ 代码块中初始化
+ 构造器中初始化

:bangbang: 注意不能通过方法来给被final修饰的属性‘初始化’, 因为当类被实例化时, 属性就应该在堆空间中被初始化, 通过方法并不能保证这点

```java
public class FinalTest {
    // 1. 显式初始化
    final int WIDTH = 10;

    // 2. 代码块初始化final修饰的属性
    final int LEFT;
    {
        LEFT = 1;
    }

    // 3. 构造器初始化final修饰的属性
    final int RIGHT;
    public FinalTest(){
        RIGHT = 2;
    }

    public FinalTest(int n){
        RIGHT = n;
    }

    // 不可以通过方法来'初始化'fianl修饰的属性
//    final int DOWN;
//
//    public void setDown(int down){
//        this.DOWN = down;
//    }

    // 在被final修饰的'变量'被初始化后, 不可以修改它
    public void doWidth(){
//        WIDTH = 20;
    }
}
```



### 修饰局部变量

 fianl 修饰局部变量:
*                  尤其是用final修饰形参时, 表明此形参是一个常量. 当我们调用此方法时, 才会给常量形参赋一个实参. 一旦赋值后, 就只能在方法体内使用此形参但不能重新赋值

```java
public class FinalTest {
   

    // 局部变量 ---------------------------------------
    // 1. 普通的局部变量
    public void show () {
        final int NUM = 10;     // 常量
//        NUM += 20;
    }

    // 2. 形参
    public void show(final int num){
//        num = 100; // 编译不通过
        System.out.println(num);
    }

    public static void main(String[] args) {
        FinalTest test = new FinalTest();
        test.show(10);
    }

}
```



> `static final` 用来修饰 属性:  很常见, 表示全局常量
>
> `static final` 用来修饰 方法:  用的少, 一般自己写代码很少修饰方法为final



## final课后练习



```java
// 排错
public class Something {
    public int addOne(final int x) {

        return ++x;		// 编译不通过
        // return x + 1;		// 可以, 并没有改变x的值
    } 
}

```



```java
// 排错
public class Something {
    public static void main(String[] args) {
				Other o = new Other();
				new Something().addOne(o); 
    }
  
    public void addOne(final Other o) { 
      // o = new Other();			// 编译会报错
      o.i++;		// 没问题
    } 
}

class Other { public int i;
}
```

