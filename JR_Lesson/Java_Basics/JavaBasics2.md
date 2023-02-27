Java 18期 2022-12-20: Java basics2 lec



# Exception handling PPT 6min-26min

+ 商业级项目中, exception handling可能达到40%以上

:gem: problem within e.g. https://docs.oracle.com/javase/tutorial/essential/exceptions/tryResourceClose.html

+ 如果br.close() throws IOException, 那么fr.close()可能无法被执行到, fr有可能被泄露
  + effective java item9: Prefer try-with-resources to try-finally


Throwable类: Error, Exception两个子类
+ RuntimeException: 不必捕获
+ checked Exception: 必须做exception handing
  + 如 IOException, ClassNotFoundException 

做正确的Exception handing1234
+ 核心是: 在合适的层级处理异常. 多写代码, 慢慢体会吧

# Log (日志) 26min-
> javaCore1 chap7

+ In production, do not use System.out as log tool
+ Use log configuration 
  + suggest to use slf4j 

# OOP 36min-
这些八股记住, 面试有可能会问

克制使用inheritance

# Abstract class and interface 48min-
> 作业: abstract class vs. interface

functional interface
```java
@FunctionalInterface
public interface Foo {
  String method(String string);
}
private String add(String string, Foo foo) {
  return foo.method(string);
}
public String tryFunction() {
  Foo foo = parameter -> parameter + " from lambda";
  return add("Message", foo);
}
```

+ `Predicate` https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/function/Predicate.html

e.g. person class
+ `Supplier` functional interface
+ `Consumer` functional interface
+ `Function` functional interface  docs.oracle.com自己查
+ `BiFunction`


# Tips 1h07min-
Effective Java: item17, 18, 59

# :moon: unit test 1h13min-1h37min
为什么unit test?
- 保证代码质量, 但也不能100%保证没有bug, 还有另外的test
- 方便代码重构 (后面会提到, 当使用flocking rule重构代码时需要频繁地run test来check重构之后的代码的external behaviour是否和之前一致)

图解释 https://www.youtube.com/watch?v=URSWYvyc42M
+ query: e.g. get()
+ command: e.g. set()

# SOLID principles 1h37min-
背下来, 需要一个过程来理解
+ single responsibility
+ Open/closed
+ Liskov substitution
+ Interface segregation 
+ Dependency inversion

# :moon: Practice 1h42min-
作业: 由 Unit Test的代码 反推 项目代码



作业的common issues

```java
+ not follow coding standard
+ use static method without thinking
+ Not fully Understand the requirement
+ No .gitignore 
```



.gitignore里:

```bash
.idea
.gradle
build/   # build路径下的文件我们不需要上传到github
```



## 实现项目代码 

```java
public class Bottles {
    // fields--------------------------------------------

    // constructors--------------------------------------

    public Bottles(){

    }

    // methods--------------------------------------------
    public static void main(String[] args){
        Bottles bottlesTest = new Bottles();

        //System.out.println(bottlesTest.verse(0));
        System.out.println(bottlesTest.verses(2,0));
        //System.out.println(bottlesTest.song());
    }

    // 指定index为a, 打印对应的歌词
    public String verse(int a){
        String ans ="";

        // 用switch case也可
        if(a==0){
            ans = ans+"No more bottles of beer on the wall, no more bottles of beer.\n" +
                    "Go to the store and buy some more, 99 bottles of beer on the wall.";
        }else if(a==1){
            ans = ans+"1 bottle of beer on the wall, 1 bottle of beer.\n" +
                    "Take it down and pass it around, no more bottles of beer on the wall.";
        }else if (a==2){
            ans = ans+ "2 bottles of beer on the wall, 2 bottles of beer.\n" +
                    "Take one down and pass it around, 1 bottle of beer on the wall.";
        }else{
            ans = ans+ a +" bottles of beer on the wall, "+a+" bottles of beer.\n"
                    + "Take one down and pass it around, "+(a-1) +" bottles of beer on the wall.";
        }
        return ans;

    }

    // 根据区间输出歌词
    public String verses(int hi, int lo){
//        // 方式一 常规方式
//        String ans = "";
//        for(int i=hi; i>=lo; i--){      // i rest at 1
//            ans= ans + verse(i);
//            if(i != lo){
//                ans = ans+"\n\n";
//            }
//        }
//        return ans;

        // 方式二: 用stream API
        return IntStream.rangeClosed(lo, hi)
                .mapToObj(i -> verse(hi - i + lo))      // verse(arg), arg从高到低调用
                .collect(Collectors.joining("\n\n"));
    }

    // 输出完整的song
    public String song(){
        String ans = "";
        ans = verses(99,0);
        return ans;
    }
}
```

至此, 以上代码足以满足需求, 但是能看到`verse(int a)`有很明显的重复代码， 且不够Object-oreinted. 

接下来我们将一步步消除其中重复的代码， 并将其重构地足够Object-oriented (其中会用到几种设计模式). 文件的数量将从1个增加到多个, 看似变复杂了但是扩展性会大大提高



## Code refactoring 2h11min-

Refactoring is the process of chaning a software system in such a way that it does not alter the external behaviour of the code yet improve its internal structure.

即不改变unit test代码 (保留external behaviour不变), 只改项目代码来优化internal structure 



### how to refactor? 2h16min-

start from open/close principle



common code smell: 重复的代码

```java
flocking rules

1. Select the things that are most alike.2. Find the smallest difference between them.3. Make the simplest change that will remove that difference.

Changes to code can be subdivided into four distinct steps:

1. parse the new code
2. parse and execute it
3. parse, execute and use its result
4. delete unused code
  
As you’re following the flocking rules: 
For now, change only one line at a time.
Run the tests after every change.
If the tests fail, undo and make a better change.
```



Refactor流程: 先找到最小不同， 然后利用函数把不同点提出来, 每次修改一点代码后就run test, 确保代码的external behaviour没变, 接着继续找最小不同...如此往复



```java
    // 指定index为a, 打印对应的歌词
    public String verse(int a){
        String ans ="";

        // 用switch case也可
        if(a==0){
            ans = ans+"No more bottles of beer on the wall, no more bottles of beer.\n" +
                    "Go to the store and buy some more, 99 bottles of beer on the wall.";
        }else{
            ans = ans+ numberString(a) +" " + container(a) + " of beer on the wall, "+numberString(a)+" "+container(a)+" of beer.\n"
                    + "Take "+pronoun(a)+" down and pass it around, "+numberString(a-1) +" " + container(a-1)+" of beer on the wall.";
        }
        return ans;

    }


    public String pronoun(int i){
        if(i == 1){
            return "it";
        }else{
            return "one";
        }
    }

    public String numberString(int i){
        if(i == 0){
            return "no more";
        }else{
            return String.valueOf(i);
        }
    }


    // 复数为bottles, 单数为bottle
    public String container(int i){
        if(i == 1){
            return "bottle";
        }else{
            return "bottles";
        }
    }
```



还可以继续合并消除if else分支, 减少verse()中的重复代码 2h37min-2h43min

需要导入Apache的capatilize() 函数





2h43min- 

继续找code smell





### 重构开始向面向对象跟进:

把通过flocking rule新加的function转移到另一个类中, 因为这些方法都只接收1个number

```java
public class BottoleNumber {
   	private String pronoun(int i){
        if(i == 1){
            return "it";
        }else{
            return "one";
        }
    }

    private String numberString(int i){
        if(i == 0){
            return "no more";
        }else{
            return String.valueOf(i);
        }
    }

    // 复数为bottles, 单数为bottle
    private String container(int i){
        if(i == 1){
            return "bottle";
        }else{
            return "bottles";
        }
    }
}
```



更近一步, 我们把这些方法的输入的参数(number)看成对象, 把上面的类的行为规范抽离到interface里

```java
public interface IBottoleNumber{
    String pronoun()

    String numberString()
    

    String container()
}

public class NumberZero implements IBottleNumber{
  	@Override
  	public String pronoun(){
      ...
    }
  
  	@Override
  	public String numberString(){
      ...
    }
  
    @Override
    public String container(){
      ...
    }
}

public class NumberOne implements IBottleNumber{
  	@Override
  	public String pronoun(){
      ...
    }
  
  	@Override
  	public String numberString(){
      ...
    }
  
    @Override
    public String container(){
      ...
    }
}

public class BottleNumber implements IBottleNumber{
  	private int value;
  
  	public IBottleNumber(int value){
       	this.value = value;
    }
  
  	@Override
  	public String pronoun(){
      ...
    }
  
  	@Override
  	public String numberString(){
      ...
    }
  
    @Override
    public String container(){
      ...
    }
}



```



BottleNumberFactory 3h2min-

```java
public BottleNumberFactory{
  public IBottleNumber build(int i){		// 返回类型体现多态
    switch (i){
      case -1:
        return new NumberNegativeOne();
      case: 0:
        return new NumberZero();
      case 1:
        return new NumberOne();
      default:
        return new BottleNumber(i);
    }
  }
}
```



这下我们的代码就变得更加Obeject-oriented了

```java
public class Bottles{
  	private BottleNumberFactory bf = new BottleNumberFactory();
  
  public String verse(int i){
    
    IBottleNumber bottle = bf.build(i)
    IBottleNumber nextBottle = bf.build(i-1);
    
    return StringUtils.capitalize(bottle.numberString()) + " " + bottle.container + " of beer on the wall, "
      + bottle.numberString() + " " + bottle.container() + " of beer. \n"
      + bottle.action()
      + next.bottle.numberString() + " " + nextBottle.container() + " of beer on the wall.";
  }
}
```



### 新的需求3h06min-

