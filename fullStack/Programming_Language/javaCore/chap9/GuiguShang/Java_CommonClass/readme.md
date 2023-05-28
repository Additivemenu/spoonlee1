Resources:

:computer:[Bilibili: 常用类 448-495](https://www.bilibili.com/video/BV1Kb411W75N?p=450&vd_source=c6866d088ad067762877e4b6b23ab9df)

# 1. :full_moon: String 
## 1.1 `String` 
```java
public final class String implements java.io.Serializable, Comparable<String>, 
CharSequence, Constable, ConstantDesc {
    @Stable
    private final byte[] value;     // byte 与 char可以相互转换

    private int hash; // Default to 0

    ...
}
```

+ String是一个`final` class, 无法被继承
+ 通过**字面量**的方式给一个String变量赋值, 此时的字符串值声明在方法区的**字符串常量池**中
  + 注意字符串常量池中是不会存储在相同内容的字符串的.
  <img src="../../../Src_md/String_final_value.png" width=80%>

+ :star: String对象的字符内容是存储在一个btye数组 value中, value也是`final`的, 代表**不可变的字符序列**. 表面上看似我们修改String变量的赋值, 其实是在方法区的常量池又创建了新的字符串常量, 然后让String变量指向那个新建的常量, 而不是对字符串常量池中原有的value进行修改. 这体现在:
  + 当对字符串重新赋值时
  + 对现有字符串进行连接操作时
  + 当调用String的replace()修改指定字符串片段时


### 1.1.1  Instantiate `String`
首先明确一点: String变量名实际上只是栈中的一个指针, 保存地址值, 它要么保存方法区StringTable(字符串常量池)中的地址, 要么保存堆中的地址.

+ 通过字面量的形式: **一步指向**
  + s1, s2保存的值(地址值), 是对应的数据"javaEE"声明在方法区的字符串常量池中的地址值. 换言之, s1, s2指向字符串常量池中的"javaEE"对象 (一个byte[]).
+ 通过new String("javaEE")的方式: **两步指向**
  + 同时 s3, s4保存的值(地址值) 是 堆空间中的通过new创建出的对象的地址值, 而这些对象的内部的value属性(即byte[])保存的值(地址值) 则是字符串常量池中的"javaEE"对象的地址值
  + 没错, 此时有两个对象: 一个是堆空间中通过new创建的String对象, 另一个是String对象内部属性value指向的, 在字符串常量池中的byte[]对象
+ String还有其他很多constructor, 见官方doc

:gem: e.g.1

<img src="../../../Src_md/String_JVM_memory.png" width=80%> 

:gem: e.g.2

```java
Person p1 = new Person("Tom", 12);
Person p2 = new Person("Tom", 12);

System.out.println(p1.name.equals(p2.name));    // true, check content
System.out.println(p1.name == p2.name);         // true

p1.name = "Jerry";                              // try to modify a String, but actually create another byte[] object in StringTable(字符串常量池)
System.out.println(p2.name);                    // Tom, because String is immutable

class Person {
    String name;
    int age;
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}

```



<img src="../../../Src_md/String_JVM_object_memory.png" width=80%> 

### 1.1.2 String拼接

结论:
+ 常量与常量的拼接结果在常量池中, 而常量池中不会存在相同内容的常量
+ 只要拼接中有一方为变量, 结果就在堆中 (在堆中new一个String对象)
+ 如果拼接的结果调用`intern()`, 返回值就在常量池中

<img src="../../../Src_md/String_concate.png" width=80%>

:gem: e.g.1  
注意通过字面量方式给String变量赋值是一步指向, 而通过new String("...")给String变量赋值则是两步指向

<img src="../../../Src_md/String_concate2.png" width=80%>

:gem: 一道面试题

```java
链接：https://www.nowcoder.com/questionTerminal/ea89183b5d5349f7ac6a11da2308d935
来源：牛客网

public class Example{
    String str = new String("good");
    char[ ] ch = { 'a' , 'b' , 'c' };
    public static void main(String args[]){
        Example ex = new Example();
        ex.change(ex.str,ex.ch);
        System.out.print(ex.str + " and ");
        System.out.print(ex.ch);
    }
    public void change(String str,char ch[ ]){
        str = "test ok";
        ch[0] = 'g';
    }
}
```

<img src="./Src_md/String_question_demonstration.png" width=1000%>

上面这个图中打叉号那部分的说明是不对的, 不是因为Java的String immutable才使得change stack中的str转而指向字符串常量池中的"test ok", **String immutable指的是堆空间中String对象的value属性的值不可以改**, 因为value是final修饰的
```java
private final byte[] value;
```
**String immutable可不是指那些指向堆空间中的String对象的变量的值不能改(String变量名只是个指针而已, 随意改它指向谁很正常)**, change stack中的str变量在change()传入参数时是指向堆空间中的String intance的 (上图画错了, 画的是函数按地址传递, :star: javaCore1 4.5: java函数总是值传递, 方法得到的是参数值的一个副本), 但change()的执行代码中

```java
str = "test ok"
```
使得change stack中的str变量指向了内存常量池中的"test ok"对象.

---

JVM涉及字符串的数据结构

三种JVM
+ sun公司的HotSpot, 我们默认装的是这个, 我们默认提到的JVM的也是指这个
+ BEA公司的JRockit
+ IBM公司的J9 Vm

Heap(堆): 一个JVM实例只存在一个堆内存, 堆内存的大小是可以调节的. 类加载器读取了类文件之后, 需要把类, 方法, 常变量放到堆内存中, 保存所有引用类型的真实信息, 以方便执行器执行, 堆内存分为三部分:
+ Young generation space 新生区
+ Tenure generation space 养老区
+ Permanent Space 永久存储区 (可以看作方法区, 规范里是认为归在heap中, 但是实施时方法区和heap是分开的)

如下: StringTable在JVM中位置随3个版本的变化
<img src="../../../Src_md/string_jvm1.png" width=30%>

<img src="../../../Src_md/string_jvm2.png" width=30%>

<img src="../../../Src_md/string_jvm3.png" width=30%>


之后康师傅讲JVM调优中也会讲到

### 1.1.3 String class 常用方法

455-457




+ `length()`
+ `chatAt()`
+ `isEmpty()`
+ `toUpperCase()`
+ `toLowerCase()`
+ `trim()`

---

+ `equals`
+ `equalsIgnoreCase`
+ `concat`
+ `compareTo`
+ `substring`
---

+ `endsWith`
+ `startWith`
+ `contains`
+ `indexOf`
+ `lastIndexOf`

---

+ `replace`
+ `matches`
+ `split`

---
String parse to other type

String <---> char[]

String <---> byte[]  (encoding, decoding)


---
String 常见算法题

康师傅: 算法就别想着突击了

1. 模拟一个trim方法, 去除字符串两端的空格
2. 将一个字符串进行反转. 将字符串中指定部分进行反转. 比如"ab**cdef**g"反转成"ab**fedc**g"
3. 获取一个字符串在另一个字符串中出现的次数.
4. 获取两个字符串中最大的相同字串. 比如:
   str1 = "abcwerthelloyuiodef"; str2 = "cvhellobnm"
   提示: 将短的那个串进行长度依次递减的字串与较长的串比较
5. 对字符串中字符进行自然顺序排序

473-476讲这几个题



## 1.2 `StringBuffer` & ` StringBuilder`

463-465

String, StringBuffer, StringBuilder的异同

 * String:   不可变的字符序列; 底层使用char[]存储, jdk1.7之后改为用byte[]
 * StringBuffer:  可变的字符序列; 线程安全的, 但效率偏低.  底层使用char[]存储, jdk1.7之后改为用byte[]
 * StringBuilder:  可变的字符序列; jdk5.0新增, 线程不安全, 效率高. 底层使用char[]存储, jdk1.7之后改为用byte[]

源码分析:

```java
String str = new String();           // char[] value = new char[0]

String str1 = new String("abc");     // char[] value = new char[]{'a','b','c'}


StringBuffer sb1 =  new StringBuffer();      // char[] value = new char[16]; 底层创建了一个长度为16的数组

System.out.println(sb1.length());        // 0

sb1.append('a');     // value[0] = 'a';

sb2.append('b');     // value[1] = 'b';



StringBuffer sb2 = new StringBuffer("abc");      // char[] value = new char["abc".length() + 16]

System.out.println(sb2.length());        // 3
```



:bangbang: StringBuffer, StringBuilder的扩容问题: 如果要添加的数据使得底层数组盛不下了, 那么就需要扩容底层的数组.

默认情况下, 扩容为原来容量的2倍+2, 同时将原有数组中的元素复制到新的数组中

指导意义： 开发中建议使用 StringBuffer(int capacity) 构造器 或 StringBuilder(int capacity) 构造器提前指定容量来尽量避免频繁扩容
 

### 常用方法

```java
    /**
     * 465 StringBuffer, StringBuilder常用方法: 以StringBuffer为例:
     *
     * StringBuffer append(xxx):提供了很多的append()方法，用于进行字符串拼接
     * StringBuffer delete(int start,int end):删除指定位置的内容
     * StringBuffer replace(int start, int end, String str):把[start,end)位置替换为str StringBuffer insert(int offset, xxx):在指定位置插入xxx
     * StringBuffer reverse() :把当前字符序列逆转
     * public int indexOf(String str)
     * public String substring(int start,int end): 返回从start开始, 到end索引结束的左闭右开的子区间内的sub-string
     * public int length()
     * public char charAt(int n )
     * public void setCharAt(int n ,char ch)
     *
     * 总结:
     * 增: append(xxx) 可以链式调用
     * 删: delete(int start, int end)
     * 改: setCharAt(int n, char ch)   /  replace(int start, int end, String str)
     * 查: charAt(int n)
     * 插: insert(int offset, xxx)
     * 长度: length()
     * 遍历: for + chatAt()   /  toString()
     */
```



466

```java
// String, StringBuffer, StringBuilder效率测试
// 从高到低： StringBuilder > StringBuffer > String
```








# 2. JDK8之前的日期和时间API

467 -481







469-476: 复习





### IDEA debug

477





# 3. JDK8中新的日期和时间API

482

## `LocalDate`, `LocalTime`, `LocalDateTime`





## `Instant`







## `DateTimeFormatter`



# 4. Java `Comparator`

488

## `Comparable` interface





## `Comparator` interface





# 5. `System`, `Math`, `BigInteger` & `BigDecimal` class

492



## System





## Math





## BigInteger & BigDecimal



