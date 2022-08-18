# Chapter 3 Java基本程序设计结构

## 3.3 数据类型

---
以下来自UniMelb: Java
[demo_overflow](overflow.java)

---

### 3.3.1 整型
|类型 |存储需求  | 取值范围|
--- | --- | ---|
|byte|1 Bytes|-128~127 |
|short|2 Bytes|-32768 ~ 32767 |
|int|4 Bytes|-2 147 483 648 ~ 2 147 483 647 (刚超过20亿) |
|long|8 Bytes|-9 223 372 036 854 775 808 ~ 9 223 372 036 854 775 807|

### 3.3.2 浮点类型
|类型 |存储需求  | 取值范围|
--- | --- | ---|
|float|4 Bytes|大约 $\pm$ 3.402 823 47E+38F (有效位为6~7位)|
|double (更常用)|8 Bytes|大约 $\pm$ 1.797 693 134 862 315 70E+308 (有效位为15位)|


### 3.3.3 Char类型

### 3.3.4 Unicode和Char类型


### 3.3.5 boolean类型


## 3.5 运算符
### 3.5.1 算术运算符
>+ 当参与/运算的两个操作数(operand)都是整数时, 表示整数除法; 否则表示浮点除法. 如 15/2=7, 15.0/2=7.5
>+ 整数被0除将会产生一个异常, 而浮点数被0除将会得到无穷大或NaN结果.


### 3.5.2 数学函数与常量

### 3.5.3 :moon:数值类型之间的转换
Java has different integer types (byte, short, int, long) and different "floating point" types (float, double). These take up increasing amounts of storage (1, 2, 4, 8 bytes for integers, 4, 8 bytes for floating point), but can store larger ranges of numbers.

> Widening conversion
> 在二元运算中, 当混用两种类型的数值时(如a+b, a是int, b是float), 先将两个操作数化为同一类型再做计算, 优先级是 double > float > long > int (即有浮点就化浮点, 有精度高的结果就精度高), 如下:
>+ 如果两个操作数中有一个是double型, 另一个也化为double型
>+ 否则, 如果其中一个操作数是float型, 另一个操作数也化为float型
>+ 否则，如果其中一个操作数是long型, 另一个操作数也化为long型
>+ 否则, 两个操作数都将被转换为int型  

![](Src/DataTypeConversion.jpg)

上图中有6个实线箭头, 表示无信息丢失的转换; 另有3个虚线箭头, 表示可能有精度损失的转换(由编码方式决定).

---

以下来自UniMelb: Java

The char type is a special case. While it technically is not an int it is an integral type, i.e., it is considered to be a whole number that can be converted to and from other integral types:
```java
public class Conversion {
    public static void main(String[] args) {
        char c = 'J';
        long y = 10;
        System.out.println(c+y); //84
        
    }
}
```
---

### 3.5.4 :moon:强制类型转换 (Typecasting)
> narrowing conversion
> 强制类型转换: 在圆括号内给出想要转换的目标类型, 后面紧跟待转换的变量名.例如:
```java
double x = 9.997;
int nx = (int) x;
```
这样变量nx的值为9. 因为强制类型转换通过截断小数部分将浮点值转换为整型.

如果想对浮点数做舍入运算, 以便得到最接近的整数, 使用Math.round方法.

---

以下来自UniMelb: Java  
A char converted to an int represents the corresponding ASCII code (or Unicode code point) of the character. Typecasting can be used to convert an int to a char type:
```java
public class Conversion {
    public static void main(String[] args) {
        int j = 74;
        int a = 65;
        int v = 86;
        System.out.println((char)j + "" + (char)a + "" + (char)v + "" + (char)a); // "JAVA"
    }
}
```
A cast can also be used to explicitly ask for a widening conversion:
```java
public class Conversion {
    public static void main(String[] args) {
        //narrowing
        short x;
        int y = 50;
        x = (short) y;
        System.out.println(x); //50

        //narrowing
        int sum = 10;
        int count = 2;
        double average = (double)sum / count;
        System.out.println(average); //5.0
    }
}
```
---

### 3.5.5 结合赋值和运算符

### 3.5.6 自增与自减运算符
++x, --x 先加减后用
x++, x-- 先用后加减

### 3.5.7 关系与boolean运算符
> 关系运算符
> <, <=, >, >=
> !=, ==
> 返回true OR false
> ```java
> boolean result = (5!=4);// result = true
> ```

> boolean运算符
> &&(AND), ||(OR), !(NOT)
> 通过true, false的与或非关系返回true OR false
> 短路方式求值: 如果第一个操作数足以确定表达式的值, 第二个操作数就不必计算了

>三元运算符
> ?:
> 表达式: condition? expression1:expression2

### 3.5.8 位运算符

### 3.5.9 括号与运算符级别
见书P44 
优先级(Precedence)
结合性(Associativity)

## 3.6 :full_moon:字符串String
[JavaString](stringJava.java)

从概念上讲, Java字符串就是Unicode字符序列.Java没有内置的字符串类型, 而是在标准Java类库中提供了一个预定义类, 很自然地叫做String.**每个用双引号括起来的字符串都是String类的一个实例.**

---
以下来自UniMelb: Java

+ Using a backslash (\) allows you to include double-quotes and other special characters (including \ itself) in a string:
```java
System.out.println("He said a \"backslash (\\) is special!\""); //He said a "backslash (\) is special!"
System.out.println("Windows file names become C:\\users\\fred"); // Windows file names become C:\users\fred
```

+ Certain letters after a backslash are treated specially, for example, \n for a new line and \t for a tab character.

+ Two strings can be appended using +, an operation also called concatenation. If either operand is a string, the + operation will convert the other operand into a string:
```java
// simple concatenation
System.out.println("Hello " + "String!"); //Hello String!

// conversion
int x = 1;
System.out.println("x = " + x); // x = 1

// can you figure out (and fix) what happens here?
System.out.println("x + x = " + x + x); // x + x = 11

// Explain what happens here.
String strJ = "J";
char chrJ = 'J';
System.out.println ("With a string we get " + (strJ + 1)); //With a string we get J1
System.out.println ("With a char we get " + (chrJ + 1)); // With a char we get 75
```
+ [Java Doc for more String API](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html)

---

### 3.6.1 子串
```Java
String greeting = "Hello";
String s = greeting.substring(0,3); // s = "Hel", 第二个参数是不想复制的第一个index, 这里是(0,3)就表示只截取index=0,1,2
```

### 3.6.2 拼接
+ 用+连接

  字符串 + 非字符串， 后者会被转换成字符串

### 3.6.3 不可变字符串
String类没有提供修改字符串中某个字符的方法, 所以Java文档中将*String类对象*称为是**不可变的(immutable)**. 但是, 可以修改字符串变量, 让它引用另外一个字符串.String类对象本身就像是一个完整的实体存在内存中不能修改, 但是却可以改变字符串变量让它引用String类对象的一部分或者引用别的String类对象, 如:
```java
greeting = greeting.substring(0,3)+"p!";
```
Java的不可变字符串特性使得修改字符串的效率没那么高, 但是编辑器可以让字符串共享. **其实大多数情况下我们更需要比较两个字符串，而非修改字符串.**

注意C++中字符串是可修改的, 可以修改字符串中的单个字符.

### 3.6.4 检测字符串是否相等
```Java
s.equals(t) // return true if s与t相等; 否则return false
```
这里s和t可以是字符串变量, 或者字符串字面量(就是"aaaa..."之类的)

```Java
"Hello".equalsIgnoreCase("hello") // 忽略大小写检查
```

**注意千万别使用==运算符检测两个字符串是否相等!** ==运算符只能确定两个字符串是否存放在同一个位置. 如果字符串放在同一个位置上, 它们必然相等, 但是完全有可能将内容相同的多个字符串副本放置在不同的位置上.

### 3.6.5 空串与Null串
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

### 3.6.6 码点与代码单元
略
记住不要使用char类型,太底层了.

### 3.6.7 String API

[Java Doc for more String API](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html)
### 3.6.8 阅读联机API文档
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
## 3.7 :full_moon:输入输出
### 3.7.1 读取输入
[inputTest](inputOutput.java)

注意Scanner 类定义在java.util中. 当使用的类不是定义在基本java.lang包中时， 一定要使用import

> 常用Scanner api:
>+ keyboard.nextLine(): reads the entire line, including the newline character
>+ keyboard.next(): reads in one word as a String
>+ keyboard.nextInt(): reads in a number and converts it to int
>+ keyboard.nextDouble(): reads in a number and converts it to double

记得用完后close Scanner

更多API见[Java Scanner API](https://docs.oracle.com/javase/8/docs/api/java/util/Scanner.html)

---
UniMelb Java e.g.:

Write a calculator that will read a line like

num1 + num2 or num1 * num2

and output the sum in the first case, or the product in the second case.

```java
public static void main (String[] args) {
    System.out.println ("Enter either  num1 + num2  or num1 * num2");
    
    Scanner keyBoard = new Scanner (System.in);

    int firstNum = keyBoard.nextInt();
    char operator = keyBoard.next().charAt(0); // get the first character of a String
    int secondNum = keyBoard.nextInt();

    int result = (operator=='+')?firstNum+secondNum:firstNum*secondNum;
    System.out.println(result);
}
```

**It is also worth mentioning the use of nextLine() and nextInt (watchful when mixed use them!)**, see below quiz question: What are the values of x, s, and y after running the program below with the following parameters:

```shell
java IOTest
8
Test
9
```

```java
import java.util.scanner;

class IOTest {
  public static void main (String[] args) {
    Scanner keyboard = new Scanner(System.in);
    int x = keyboard.nextInt();
    String s = keyboard.nextLine();
    int y = keyboard.nextInt();
  }
}
```

The answer is miraculously:

The following exception is thrown:
```shell
Exception in thread "main" java.util.InputMismatchException
```

In fact:

x = 8 (there is a hidden newline "\n" when the input is provided but only the number is read in.

s = "\n" (that hidden newline character makes it into the nextLine() method)

y = "Test"  >  The String cannot be converted to int.

>Tim, the lecturer answers:
>In order to send your input to the Scanner input, you will need to hit 'enter', which produces a newline on your console, so technically the above input looks like this:
>```shell
>8\n
>Test\n
>9\n
>```
>The method nextInt() only parses the next number while >nextLine() parses the entire line.


---

### 3.7.2 格式化输出(Formatted output)

---
MelbUni: Java

This so-called format-string is an ordinary string, but can contain format specifiers for each argument you pass in:
```java
double average = 5.0;
System.out.printf("Average: %5.2f", average);
```

**A format specifier** begins with % and may have a number specifying how to format the next value in the list of arguments.  It ends with a letter specifying the type of the value:
```java
String formatString = "%X.Y"; // Syntax: x.y; where x= padding (width) and y= decimal places.
```

> The X before the decimal point specifies the minimum number of characters to be printed.
>+ The full number will be printed, even if it takes more characters than specified by X 
>+ If X is omitted, the value will be printed in its minimum width 
>+ If X is negative, the value will be left-justified, otherwise right-justified
>+ If X starts with a zero, then the number will be padded with leading 0s (good if printing for a variable-width font, where the width of a space is different from the width of a digit); otherwise it will be padded with spaces

>The Y after the decimal point specifies the number of digits of the value that are printed after the decimal point. If Y is omitted, Java decides how to format it. 


---

|转换符 |类型  | 示例|转换符 |类型  | 示例|
--- | --- | ---| --- |---|---|
|d|十进制整数|159 | s| 字符串| Hello|
|x|十六进制整数|9f| c| 字符| H|
|o|八进制整数|237| b| 布尔| true|
|f|定点浮点数|15.9| h| 散列码| 42628b2|
|e|指数浮点数|1.59e+01| tx or Tx| 日期时间| 已过时, 应用java.time类|
|g|通用浮点数(e和f中较短的一个)|-| %| 百分号| %|
|a|十六进制浮点数|0x1.fccpd3| 0x1.fccpd3| 与平台有关的分隔符| -|
 

 [Demo: formatPlay](formatPlay.java)

Result

```shell
"string" has 6 characters 
pi to 4 places: 3.1416
Right>>   3.1416<<
Left>>3.1416   <<
$9.99
009.99
009.99
250000.00
2.50e+05
```
### 3.7.3 文件输入与输出
aaa


### 3.7.4 Command Line Input
_this session is from UniMelb Java_

```java
public static void main(String[] args) {}
```
The variable args holds the values that a user provides when the program is executed.  e.g. [commandLineInput](commandLineInput.java):

```java
public class commandLineInput {
    public static void main(String[] args) {
        System.out.println("Hello " + args[0] + "!");
    }
}
```
type in following at terminal:
```shell
javac commandLineInput.java
java commandLineInput abc
```
Results:
```shell
Hello abc!
```

You can add arguments to your program, which will be referred to by their index: args[0], args[1], ... **Each argument is treated as a string.** But you can convert the string input to int or a double, for example using:
```java
int argument = Integer.parseInt(args[0]);
double arg0 = Double.parseDouble(args[0]);
```

e.g.

```java
public class Sum {
    public static void main(String[] args) {

        int firstNum = Integer.parseInt(args[0]);
        int secondNum = Integer.parseInt(args[1]);
        System.out.println("The result is:"+ (firstNum + secondNum));
    }
}
```
```shell
java Sum 20 24
```
```shell
The result is: 44
```

> Note: Command line arguments are usually delimited (ie separated) by spaces. By putting double quotation marks around an argument, we indicate that the spaces are a part of the single argument.
> ``` shell
> $ java SimpleCalculator "meaning of life"
> 42
> ```

## 3.8 控制流程
### 3.8.1 块作用域

### 3.8.2 条件语句

---

> conditional operator

UniMelb:Java

可以使用conditional operator在函数的argument里, 而if else却不能做到.

```java
System.out.println(Math.sqrt(Math.sin(a > 0 ? a : -a)));
```

---

### 3.8.3 循环


### 3.8.4 确定循环

---

for loop

+ A for loop can contain multiple initialization actions separated by commas:
```java
for(int i=0, j=100; i<j; i++) {}
```

+ A for loop can contain multiple update actions, separated by commas:
```java
for(int i=0, j=100; i<j; i++, j--) {}
```

---


### 3.8.5 多重选择: switch语句

---

UniMelb Java

```java
switch (Controlling_Expression)
{
  case Case_Label_1:
           Statement_Sequence_1
           break;
  case Case_Label_2:
           Statement_Sequence_2
           break;
  case Case_Label_n:
           Statement_Sequence_n
           break;
  default:
}

```

> 注意!
+ Beware that the controlling expression must evaluate to a char, int, short, byte or String (or an enumerated type, which we will see later).  Note that it cannot be a long.
+ The optional default label is usually used last. If no case label matches, then the only statements executed are those following the default label (if there is one).
+ Each sequence of statements should be followed by a break statement, which tells the program execution to continue after the switch block. If you don't add a break statement, the next case label will be evaluated. 
  + Advanced:  The only time it is appropriate not to have a break statement is if there are multiple cases that should run the same code, as in the following example.  Note that the "fall-through" only applies when there is no code.  Whenever there is code, there is a break.

    ```java
    class Main {
        static public void main (String[] args) {
            int a = 1;
            switch (a) {
                case 1:
                case 3: 
                case 5:
                case 7:
                case 9:
                    System.out.println("odd, single digit");
                    break;
                default :
                    System.out.println("even or multi-digit");
                    break;
            }
        }
    }
    ```
---

### 3.8.6 中断控制流程的语句

When loop statements are nested, any break or continue statement applies to the innermost, containing loop statement.

**1. label break**
 
There is a type of break statement that, when used in nested loops, can end any containing loop, not just the innermost loop. To achieve this, we use a labeled break statement. If an enclosing loop statement is labelled with an Identifier, the following version of the break statement will exit the labelled loop, even if it is not the innermost enclosing loop: 
```java
break someIdentifier;
```

To label a loop, simply precede it with an Identifier and a colon: 
```java
someIdentifier:
```
[Demo: label break](labelBreak.java)

**2. The exit Statement**
 
A break statement will end a loop or switch statement, but will not end the program. The exit method will immediately end the program as soon as it is invoked: 

```java
System.exit(0);
```
The exit statement takes one integer argument . By tradition, a zero argument is used to indicate a normal ending of the program. However, the cleanest way to end a program is to always let it run to the end of its main function, except when you want to report that an error occurred.


## 3.10 数组Array
### 3.10.1 :full_moon:数组声明
[arrayAnnouncing](arrayJava.java)

1. 数组是用来存储同一类型值的集合. 
+ 数组长度不要求是常量, 但一旦数组长度指定便无法更改(使用arrayList动态扩容).  
+ Java中允许长度为0的数组(注意长度为0的数组不同于null数组)

2. 数组的声明方式:
+ 方式1: 
    ```java
    int[] arr = new int[100];//内存中开辟一个可以容纳100个int数值的空间存放数组arr
    ```
    int型数组元素初始化为0
    Boolean型数组元素初始化为false
    String型数组元素初始化为null
+ 方式2: 在{}中枚举元素, 无需指定数组长度
+ 方式3: 用匿名数组快速初始化旧数组

### 3.10.2 访问数组元素
略

### 3.10.3 for each loop
```Java
for(int element:arr)
    System.out.println(element);
```
打印数组arr的每一个元素, 一个元素占一行. 读作"循环arr中的每一个元素"
+ 更简洁不宜错
+ 但不如for循环效率高, 不如for循环灵活(for each只能遍历每一个元素)

### 3.10.4 数组拷贝
[arrayCopy](arrayJava.java)
>+ 方式1: 拷贝数组变量  
>  新旧变量同时引用内存中的同一数组, 一变都变

>+ 方式2: Arrays.copyOf()
>  直接开辟新的内存来存储新的数组, 新旧数组各自独立

### 3.10.5 命令行参数
[arrayCommandLine](arrayCommandLine.java)
```java
public static void main(String[] args)
```
中的String[] args 其实是一个string array, 用来接收命令行的输入

### 3.10.6 数组排序
[arraySort](arraySorting.java)
Arrays.sort() 使用快速排序法(QuickSort)排序

### 3.10.7 多维数组
先跳过,
java实际上没有多维数组, 实际上只是"数组的数组"

### 3.10.8 不规则数组
紧跟多维数组, 先跳过