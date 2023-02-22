:computer:[Bilibili 尚硅谷: Enum & comments 496-510](https://www.bilibili.com/video/BV1Kb411W75N?p=498)

---
- [Part1: Enum](#part1-enum)
- [Part2: Annotation (注解)](#part2-annotation-注解)
  - [1. Annotation introduction](#1-annotation-introduction)
  - [2. 常见的Annotation示例](#2-常见的annotation示例)
  - [3. 自定义Annotation](#3-自定义annotation)
  - [4. JDK中的元注解](#4-jdk中的元注解)
  - [5. 利用反射获取注解信息](#5-利用反射获取注解信息)
  - [6. JDK8中注解的新特性](#6-jdk8中注解的新特性)


---
# Part1: Enum 枚举类

496-501

## 1. 自定义枚举类



## 2. 使用enum



## 3. Emun类的主要方法





## 4. 实现接口的枚举类





# Part2: Annotation (注解)

502-510 



## 1. Annotation introduction

502- 

从JDK5.0开始, Java增加了对元数据(MetaData)的支持, 也就是Annotation(注解)



什么是Annotation?

+ Annotation其实就是代码里的**特殊标记** (e.g. @Override), 这些标记可以在编译, 类加载, 运行时被读取, 并执行相应的处理. 

:star: Annotation的作用?

+ 通过使用Annotation, 程序员可以在不改变原有逻辑的情况下, 在源文件中嵌入一些补充信息, 代码分析工具, 开发工具和部署工具可以通过这些补充信息进行验证或者进行部署.
+ Annotation可以像modifier一样被使用, 可以用于**修饰包, 类, 构造器, 方法, 成员变量, 参数, 局部变量的声明**, 这些信息被保存在Annotation的"name = value"对中.



> :bangbang: 关于注解的一点说明
>
> + 在JavaSE中, 注解的使用目的比较简单, 例如标记过时的功能, 忽略警告等. 但是在JavaEE/Android中, 注解占据了更为重要的角色, 例如用来配置应用程序的任何切面(Aspect), 代替JavaEE旧版中所遗留的冗杂代码和XML配置等
> + 未来的开发模式都是基于注解的, JPA (Java Persistent API)是基于注解的, Spring2.5以上都是基于注解的, Hibernate3.x以后也是基于注解的, 现在的Struts2有一部分也是基于注解了, 注解是一种趋势, 一定程度上可以说: **框架 = 注解 + 反射 + 设计模式.**



## 2. :moon: 常见的Annotation示例

503, 504

### 2.1 第一类: 生成文档相关的Annotation

```java
+ `@author` 标明开发该类模块的作者 多个作者之间使用 分割
+ `@version` 标明该类模块的版本
+ `@see` 参考转向 也就是相关主题
+ `@since` 从哪个版本开始增加的
+ `@param` 对方法中某参数的说明 如果没有参数就不能写
+ `@return` 对方法返回值的说明 如果方法的返回值类型是 void 就不能写
+ `@exception` 对方法可能抛出的异常进行说明 如果方法没有用 throws显式抛出的异常就不能写
  
其中
@param @return 和 @exception 这三个标记都是只用于方法的。 
@param的格式要求:@param 形参名 形参类型 形参说明 
@return 的格式要求:@return 返回值类型 返回值说明 
@exception的格式要求:@exception 异常类型 异常说明 
@param和@exception可以并列多个
```



### 2.2 第二类: 在编译时进行格式检查 (JDK 内置的三个基本Annotation)

```java
+ `@Override`: 限定重写父类方法 , 该注解只能用于修饰方法. 编译器可以检查修饰的方法是否真的被override了, good practice.
+ `@Deprecated`: 用于提示程序员它所修饰的元素, 类, 方法等已过时(但依然可以使用). 通常是因为所修饰的结构危险或存在更好的选择(比如新的JDK版本更新提供了更好的方法)
+ `@SuppressWarnings`: 抑制编译器警告
```



```java
public class AnnotationTest{
  
  public static void main(String[] args) { 
    @SuppressWarnings("unused")
    int a = 10;
	}
  
  @Deprecated
  public void print(){
  	System.out.println("过时的方法");
  }
  
  @Override
	public String toString() {
    return "重写的toString方法()";
  }
}
```





### 2.3 第三类: 跟踪代码依赖性，实现替代配置文件功能

:gem: Servlet 3.0提供了注解(Annotation), 使得不再需要在 web xml 文件中进行 Servlet 的部署: 

过去使用Xml 配置文件

```xml
<!--in the past, we have to configure XML file-->
<servlet>
    <servlet-name>LoginServlet</servlet-name>
    <servlet-class>com.servlet.LoginServlet</servlet-class>
</servlet>
<!--这里是把上面的servlet mapping到url /login, 这样我们就知道 url /login 是要调用LoginSevlet这个类-->
<servlet-mapping>
    <servlet-name>LoginServlet</servlet-name>
    <url-pattern>/login</url-pattern>
</servlet-mapping>
```

现在使用Annotation

```java
//  现在有了Annotation, 只需要在LoginServlet头上写上它对应的url信息就可以了
@WebServlet("/login")
public class LoginServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request , HttpServletResponse response ) throws
ServletException, IOException{}
    protected void doPost(HttpServletRequest request , HttpServletResponse response ) throws
ServletException, IOException {
    doGet(request , response);
    }
}
```



:gem: spring框架中关于"事务"的管理

过去使用xml配置文件


```xml
<!--in the past, we have to configure XML file-->
<!--配置事务属性-->
<tx advice transaction manager="dataSourceTransactionManager" id="txAdvice">
    <tx attributes>
        <!--配置每个方法使用的事务属性-->
        <tx method name="buyBook" propagation="REQUIRES_NEW" isolation="READ_COMMITTED" read-only="false" timeout="3"/>
    </tx attributes>
</tx:advice>
```

现在使用Annotation

```java
//  now we just put on an Annotation in one row:
@Transactional(propagation=Propagation.REQUIRES_NEW, isolation=Isolation.READ_COMMITTED,readOnly=false, timeout=3)
public void buyBook(String username, String isbn){
    // 1 查询书的单价
    int price = bookShopDao.findBookPriceByIsbn(isbn);
    // 2 更新库存
    bookShopDao.updateBookStock(isbn);
    // 3 更新用户的余额
    bookShopDao.updateUserAccount(username, price);
}
```





## 3. 自定义Annotation

505



+ 定义新的 Annotation 类型使用 @interface 关键字
+ 自定义注解自动继承了 java lang annotation Annotation 接口
+ **Annotation 的成员变量在 Annotation 定义中以无参数方法的形式来 声明.** 其方法名和返回值定义了该成员的名字和 类型. 我们 称为**配置参数**. 类型只能是八种基本数据类型, String 类型, Class 类型, enum 类型, Annotation 类型, 以上所有类型的 数组
+ 如果Annotation有成员, 在使用注解时, 需要提供成员的值 (除非为成员提供了default值)
  + 可以在定义 Annotation 的成员变量时为其指定初始值 指定成员变量的初始值可使用 default 关键字
  + 如果只有一个参数成员 建议使用 参数名为 value
  + 如果定义的注解含有配置参数 那么使用时必须指定参数值 除非它有默认值. 格式是参数名参数值, 如果只有一个参数成员, 且名称为 value , 可以省略 "value="


+ 没有成员定义的Annotation称为**标记**, 包含成员变量的 Annotation 称为**元数据 Annotation**

:bangbang: 注意: 自定义注解必须配上注解的信息处理流程才有意义, 这就需要使用反射读取注解的信息

```java
// 参照@SuppressWarning来自定义
public @interface MyAnnotation {
    String value() default "hello";	// 指定成员value的默认值为"hello"
}

@MyAnnotation(value = "hello world!")	// 如果Annotation有成员, 在使用注解时, 需要提供成员的值 (除非为成员提供了default值)
class Person{
  
    private String name;
    private int age;

    public Person() {
    }
		
  	@MyAnnotation("hi")
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
  
  	...
}
```



## 4. :moon: JDK中的元注解

506

JDK 的元 Annotation 用于修饰其他 Annotation 定义. JDK5.0提供了4个标准的meta-annotation类型，分别是:

```java
Retention
Target
Documented
Inherited
```



`@Retention`: 只能用于修饰一个 Annotation 定义, 用于指定该 Annotation 的生命 周期, @Rentention 包含一个 RetentionPolicy类型 (枚举类啦) 的成员变量, 使用 @Rentention 时必须为该 value 成员变量指定值:

```java
RetentionPolicy.SOURCE //在源文件中有效(即源文件保留)，编译器直接丢弃这种策略的注释, 不会进入.class文件

RetentionPolicy.CLASS //在class文件中有效(即class保留) ， 但当运行 Java 程序时, JVM 不会保留注解。 这是默认值

RetentionPolicy.RUNTIME //在运行时有效(即运行时保留)，当运行Java 程序时, JVM会保留注释。程序可以通过反射获取该注释, 程序可以根据注解的信息进行某种逻辑上的操作
```

<img src="./Src_md/retention1.png" width=70%>



`@Target`: 用于修饰 Annotation 定义, 用于指定被修饰的 Annotation 能用于 修饰哪些程序元素。 @Target 也包含一个名为 value 的成员变量。

| 取值 (ElementType枚举类) | 描述                                  |
| ------------------------ | ------------------------------------- |
| TYPE                     | 用于描述类, 接口(包括注解类型),  enum |
| FIELD                    | 描述字段                              |
| METHOD                   | 描述方法                              |
| PARAMETER                | 描述参数                              |
| CONSTRUCTOR              | 描述构造器                            |
| LOCAL_VARIABLE           | 描述局部变量                          |
| PACKAGE                  | 描述包                                |
| ANNOTATION_TYPE          | 描述注解类型                          |
| ...                      |                                       |



`@Documented`: 用于指定被该元 Annotation 修饰的 Annotation 类将被javadoc 工具提取成文档。默认情况下，javadoc是不包括注解的。 

+ 定义为Documented的注解必须设置Retention值为RUNTIME。

```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(value={CONSTRUCTOR, FIELD, LOCAL_VARIABLE, METHOD, PACKAGE, MODULE, PARAMETER, TYPE})
public @interface Deprecated {
    String since() default "";
    boolean forRemoval() default false;
}
```



@Inherited: 被它修饰的 Annotation 将具有继承性。如果某个类使用了被 @Inherited 修饰的 Annotation, 则其子类将自动具有该注解。

+ 比如:如果把标有@Inherited注解的自定义的注解标注在类级别上，该类的子类则可以继承父类类级别的注解

+ 实际应用中，使用较少





## 5. 利用反射获取注解信息

507

在反射部分更详细讲解 ---> 反射的应用4

利用反射获取子类的注解信息 

```java
@Test
public void testGetAnnotation(){
    Class studentClass = Student.class;

    Annotation[] annotations = studentClass.getAnnotations();
    for(int i = 0; i< annotations.length; i++){
        System.out.println(annotations[i]);         // @class02_customizingAnnotation.MyAnnotation("hello world!")
    }
}
```

自定义注解

```java
@Target({TYPE, FIELD, METHOD, PARAMETER, LOCAL_VARIABLE, MODULE})
@Retention(RetentionPolicy.RUNTIME)
@Inherited		// 被Inherited修饰的注解, 如果@MyAnnotation修饰了Person, 则Person的子类也会继承Person的@MyAnnotation注解
public @interface MyAnnotation {

    String value() default "hello";

}
```

Person

```java
@MyAnnotation(value = "hello world!")
public class Person{
    private String name;
    private int age;

    public Person() {
    }

		...
}
```

Student

```java
public class Student extends Person implements Info {
    // 重写父类的方法
    @Override
    public void walk(){
        System.out.println("student walk");
    }

    // 实现接口中的方法
    @Override
    public void show() {

    }
}

interface Info{
    void show();
}
```







## 6. JDK8中注解的新特性

### 可重复注解

508



在MyAnnotation上声明一个@Repeatable(MyAnnotations.class)

MyAnnotation与MyAnnotations头上的元注解应该相同

```java
// @MyAnnotations({@MyAnnotation("hi"), @MyAnnotation("hello")})       // '重复注解'JDK8之前的写法
@MyAnnotation("hi")
@MyAnnotation("hello")
public class JDK8AnnotationTest {


}

@Target({TYPE, FIELD, METHOD, PARAMETER, LOCAL_VARIABLE, MODULE})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Repeatable(MyAnnotations.class)
public @interface MyAnnotation {

    String value() default "hello";

}

@Retention(RetentionPolicy.RUNTIME)
@Target({TYPE, FIELD, METHOD, PARAMETER, LOCAL_VARIABLE, MODULE})
@Inherited
public @interface MyAnnotations {
    MyAnnotation[] value();
}
```



### 类型注解

509



JDK1.8之后，关于元注解@Target的参数类型ElementType枚举值多了两个:

```java
TYPE_PARAMETER, TYPE_USE
```



在Java 8之前，注解只能是在声明的地方所使用，Java8开始，注解可以应用 在任何地方。

```java
ElementType.TYPE_PARAMETER // 表示该注解能写在类型变量的声明语 句中(如:泛型声明)。

ElementType.TYPE_USE // 表示该注解能写在使用类型的任何语句中。
```



```java
class Generic<@MyAnnotation T>{
    public void show() throws @MyAnnotation RuntimeException{
        ArrayList<@MyAnnotation String> list = new ArrayList<>();

        int num = (@MyAnnotation int) 10L;
    }
}

@Target({TYPE, FIELD, METHOD, PARAMETER, LOCAL_VARIABLE, MODULE, TYPE_PARAMETER, TYPE_USE})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Repeatable(MyAnnotations.class)
public @interface MyAnnotation {

    String value() default "hello";

}
```



