:computer:[Bilibili 尚硅谷: Enum & comments 496-516](https://www.bilibili.com/video/BV1Kb411W75N?p=498)

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
# Part1: Enum


# Part2: Annotation (注解)
## 1. Annotation introduction
+ 从JDK5.0开始, Java增加了对元数据(MetaData)的支持, 也就是Annotation(注解)
+ Annotation其实就是代码里的**特殊标记** (e.g. @Override), 这些标记可以在编译, 类加载, 运行时被读取, 并执行相应的处理. 
  + 通过使用Annotation, 程序员可以在不改变原有逻辑的情况下, 在源文件中嵌入一些补充信息. 
  + 代码分析工具, 开发工具和部署工具可以通过这些补充信息进行验证或者进行部署.
+ Annotation可以像modifier一样被使用, 可以用于**修饰包, 类, 构造器, 方法, 成员变量, 参数, 局部变量的声明**, 这些信息被保存在Annotation的"name = value"对中.

---
+ 在JavaSE中, 注解的使用目的比较简单, 例如标记过时的功能, 忽略警告等. 在JavaEE/Android中注解占据了更为重要的角色, 例如用来配置应用程序的任何切面, 代替JavaEE旧版中所遗留的冗杂代码和XML配置等
+ 未来的开发模式都是基于注解的, JPA是基于注解的, Spring2.5以上都是基于注解的, Hibernate3.x以后也是基于注解的, 现在的Struts2有一部分也是基于注解了, 注解是一种趋势, 一定程度上可以说: **框架 = 注解 + 反射 + 设计模式.**


## 2. 常见的Annotation示例
第一类: 生成文档相关的Annotation
+ @author 标明开发该类模块的作者 多个作者之间使用 分割
+ @version 标明该类模块的版本
+ @see 参考转向 也就是相关主题
+ @since 从哪个版本开始增加的
+ @param 对方法中某参数的说明 如果没有参数就不能写
+ @return 对方法返回值的说明 如果方法的返回值类型是 void 就不能写
+ @exception 对方法可能抛出的异常进行说明 如果方法没有用 throws显式抛出的异常就不能写

---
第二类: 在编译时进行格式 检查 (JDK 内置的三个基本注解)
+ @Override: 限定重写父类方法 , 该注解只能 用于方法

+ @Deprecated : 用于表示所修饰的元素 类 , 方法等 已过 时。通常是因为
所修饰的结构危险或存在更好的选择

+ @SuppressWarnings : 抑制编译器警告

---
第三类: 跟踪代码依赖性，实现替代配置文件功能

:gem: Servlet 3.0提供了注解(Annotation), 使得不再需要在 web xml 文件中进行 Servlet 的部署: 

```xml
<!--in the past, we have to configure XML file-->
<servlet>
    <servlet-name>LoginServlet</servlet-name>
    <servlet-class>com.servlet.LoginServlet</servlet-class>
</servlet>
<servlet-mapping>
    <servlet-name>LoginServlet</servlet-name>
    <url-pattern>/login</url-pattern>
</servlet-mapping>
```

```java
//  now we just put on an Annotation in one row:
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

该看504了

## 3. 自定义Annotation




## 4. JDK中的元注解





## 5. 利用反射获取注解信息





## 6. JDK8中注解的新特性


