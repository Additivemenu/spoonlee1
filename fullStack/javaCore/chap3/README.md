# Chapter 3 Java基本程序设计结构

## 3.6 字符串String
[JavaString](stringJava.java)

从概念上讲, Java字符串就是Unicode字符序列.Java没有内置的字符串类型, 而是在标准Java类库中提供了一个预定义类, 很自然地叫做String.**每个用双引号括起来的字符串都是String类的一个实例.**
### 1. 子串
```Java
String greeting = "Hello";
String s = greeting.substring(0,3); // s = "Hel", 第二个参数是不想复制的第一个index, 这里是(0,3)就表示只截取index=0,1,2
```
### 2. 拼接
+ 用+连接
  字符串 + 非字符串， 后者会被转换成字符串
### 3. 不可变字符串
String类没有提供修改字符串中某个字符的方法, 所以Java文档中将*String类对象*称为是**不可变的(immutable)**. 但是, 可以修改字符串变量, 让它引用另外一个字符串.String类对象本身就像是一个完整的实体存在内存中不能修改, 但是却可以改变字符串变量让它引用String类对象的一部分或者引用别的String类对象, 如:
```java
greeting = greeting.substring(0,3)+"p!";
```
Java的不可变字符串特性使得修改字符串的效率没那么高, 但是编辑器可以让字符串共享. **其实大多数情况下我们更需要比较两个字符串，而非修改字符串.**

注意C++中字符串是可修改的, 可以修改字符串中的单个字符.
### 4. 检测字符串是否相等
```Java
s.equals(t) // return true if s与t相等; 否则return false
```
这里s和t可以是字符串变量, 或者字符串字面量(就是"aaaa..."之类的)

```Java
"Hello".equalsIgnoreCase("hello") // 忽略大小写检查
```

**注意千万别使用==运算符检测两个字符串是否相等!** ==运算符只能确定两个字符串是否存放在同一个位置. 如果字符串放在同一个位置上, 它们必然相等, 但是完全有可能将内容相同的多个字符串副本放置在不同的位置上.
### 5. 空串与Null串
  + 检测是否为空串
```Java
if (string.length()==0)
or
if(str.equals(""))
```
+ 检测是否为null
```Java
if(str == null)
```
+ 检测是否为null & 空串
注意必须先检查是否为null, 因为无法在null值上调用方法.
```Java
if(str!=null && str.length() != 0 )
```

### 6. 码点与代码单元
略
记住不要使用char类型,太底层了.
### 7. String API
见textbook， 略
### 8. 阅读联机API文档
+ [阅读Java联机API文档](https://docs.oracle.com/en/java/javase/18/)  
当使用的类不是定义在基本java.lang包中时， 一定要使用import指令导入相应的包. 例如读取System.in, 需要import java.util包, 来使用[Scanner类](https://docs.oracle.com/en/java/javase/18/docs/api/java.base/java/util/Scanner.html) , 你可以查看它的定义, method之类的说明
### 9. 构建字符串 
使用StringBuilder类
```java
//构建一个空的字符串构造器
StringBuilder builder = new StringBuilder();
// 添加内容
builder.append("who's ");
builder.append("your daddy");
// 字符串构建完成, 使用toString method将其转化成string
String completedString = builder.toString();

System.out.println(completedString);
```
## 3.7 输入输出




## 3.10 数组Array
### 1. 数组声明
[arrayAnnouncing](arrayJava.java)
> 数组是用来存储同一类型值的集合. 
>+ 数组长度不要求是常量, 但一旦数组长度指定便无法更改(使用arrayList动态扩容).  
>+ Java中允许长度为0的数组(注意长度为0的数组不同于null数组)

> 数组的声明方式:
>+ 方式1: 
>```java
>   int arr = new int[100];//内存中开辟一个可以容纳100个int数值的空间存放数组arr
>```
>> int型数组元素初始化为0
>> Boolean型数组元素初始化为false
>> String型数组元素初始化为null
>+ 方式2: 在{}中枚举元素, 无需指定数组长度
>+ 方式3: 用匿名数组快速初始化旧数组

### 2. 访问数组元素
略

### 3. for each loop
```Java
for(int element:arr)
    System.out.println(element);
```
打印数组arr的每一个元素, 一个元素占一行. 读作"循环arr中的每一个元素"
+ 更简洁不宜错
+ 但不如for循环效率高, 不如for循环灵活(for each只能遍历每一个元素)

### 4. 数组拷贝
[arrayCopy](arrayJava.java)
>+ 方式1: 拷贝数组变量  
>  新旧变量同时引用内存中的同一数组, 一变都变

>+ 方式2: Arrays.copyOf()
>  直接开辟新的内存来存储新的数组, 新旧数组各自独立

### 5. 命令行参数
[arrayCommandLine](arrayCommandLine.java)
```java
public static void main(String[] args)
```
中的String[] args 其实是一个string array, 用来接收命令行的输入

### 6. 数组排序
[arraySort](arraySorting.java)
Arrays.sort() 使用快速排序法(QuickSort)排序

### 7. 多维数组
先跳过,
java实际上没有多维数组, 实际上只是"数组的数组"

### 8. 不规则数组
紧跟多维数组, 先跳过