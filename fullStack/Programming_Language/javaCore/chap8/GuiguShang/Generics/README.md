:computer:[Bilibili 尚硅谷:: Generics 563-574](https://www.bilibili.com/video/BV1Kb411W75N?p=565&vd_source=c6866d088ad067762877e4b6b23ab9df)



尚硅谷还有小手册说明Generics



# 1. 为什么Java引入Generics

563

+ 泛型:标签

+ 举例:
  + 中药店，每个抽屉外面贴着标签
  + 超市购物架上很多瓶子，每个瓶子装的是什么，有标签



泛型的设计背景

集合容器类在设计阶段/声明阶段不能确定这个容器到底实际存的是什么类型的 对象，所以在JDK1.5之前只能把元素类型设计为Object. 

JDK1.5之后使用泛型来 解决。因为这个时候除了元素的类型不确定，其他的部分是确定的，例如关于 这个元素如何保存，如何管理等是确定的，因此此时把元素的类型设计成一个参数，这个类型参数叫做泛型。e.g. `Collection<E>`, `List<E>`，`ArrayList<E>` 这个<E>就 是类型参数，即泛型。





所谓泛型，就是允许***在定义类、接口时***通过一个标识表示**类中**某个属性的类 型或者是某个方法的返回值及参数类型。这个类型参数将在使用时(例如， 继承或实现这个接口，用这个类型声明变量、创建对象时)确定(即传入实 际的类型参数，也称为类型实参)。

+ 从JDK1.5以后，Java引入了“参数化类型(Parameterized type)”的概念， 允许我们在创建集合时再指定集合元素的类型，正如:List<String>，这表明 该List只能保存字符串类型的对象。

+ JDK1.5改写了集合框架中的全部接口和类，为这些接口、类增加了泛型支持， 从而可以在声明集合变量、创建集合对象时传入类型实参。



# 2. 应用一: 在集合中使用Generics

563-564



1. JDK1.5的新特性

2. 在集合中使用Generics:

总结:

(1) 集合接口或集合类在jdk5.0时都修改为带Generics的结构

(2) 在实例化集合类时, 可以指明具体的泛型类型 (相当于给容器贴个标签, 限制内部)

(3) 指明完以后, 在集合类或者接口中凡是定义类或者接口时, 内部结构(e.g.方法， 构造器, 属性 etc)使用到类的泛型的位置, 都指定为实例化的泛型类型

​	e.g. add(E e) ---> 实例化之后, add(Integer e)



:bangbang: 注意点: 

+ **泛型的类型必须是类**, 不能是基本数据类型, 需要用到基本数据类型的位置, 拿包装类替换

+ 如果实例化时, 如果没有指明泛型的类型, 则默认类型为java.lang.Object





:gem:

不使用Generics, 存在两个问题:

+ 容器内元素类型不安全, 
  + 可能运行时才会报错, 我们希望最好在编译时就能查出错误
+ 需要强制down casting, 繁琐有时会报出ClassCastException

```java
    // 在使用Generics之前的情况
    @Test
    public void test1(){
        ArrayList list = new ArrayList();

        // 需求: 存放学生的成绩
        list.add(78);
        list.add(76);
        list.add(89);
        list.add(88);

        // 问题一: 类型不安全, 编译时不做类型检查
        list.add("Tom");

        for(Object score : list){
            // 问题二: 强转时有可能出现ClassCastException
            int studentScore = (Integer) score;
            System.out.println(studentScore);
        }
    }
```

:gem:

```java
    // 在集合中使用Generics: 以ArrayList为例子
    @Test
    public void test2(){
        // 泛型不能是基本类型, 得是Object类型
        ArrayList<Integer> list = new ArrayList<>();

        list.add(95);
        list.add(85);
        list.add(85);
        list.add(90);

        // 编译时会做类型检查, 保证数据安全
//        list.add("Tom"); // 编译不通过

        // 方式1: for loop
        for(Integer score : list){
            // 避免了强转操作
            int stuScore = score;
            System.out.println(stuScore);
        }

        // 方式2: Iterator
        System.out.println("方式2");
        Iterator<Integer> iterator = list.iterator();
        while(iterator.hasNext()){
            Integer stuScore = iterator.next();
            System.out.println(stuScore);
        }

    }
```

:gem:

```java
// 在集合中使用Generics: 以HashMap为例子
    @Test
    public void test3(){
        Map<String, Integer> map = new HashMap<String, Integer>();

        map.put("Tom", 87);
        map.put("Jerry", 89);
        map.put("Jack", 88);

        // 泛型的嵌套
        // Entry interface是定义在Map内部的
        Set<Map.Entry<String, Integer>> entry =  map.entrySet();
        Iterator<Map.Entry<String, Integer>> iterator= entry.iterator();

        while(iterator.hasNext()){
            Map.Entry<String, Integer> e = iterator.next();
            String key = e.getKey();
            Integer value = e.getValue();

            System.out.println(key + "---->" + value);
        }

    }
```



## :gem: 使用Generics 的举例

565

使用Generics和Java 容器来装载数据, 类型安全不需要downcasting, 大大简化代码的书写, 



Employee 

```java
/**
 * 定义一个Employee class
 * 该类包含: private 成员变量 name, age, birthday, 其中birthday 为 MyDate类的对象;
 * 并为每一个属性定义getter, setter
 * 并重写toString(), 输出name, age, birthday
 *
 * @author xueshuo
 * @create 2023-01-18 7:48 pm
 */
public class Employee implements Comparable<Employee> {
    private String name;
    private int age;
    private MyDate birthday;

    public Employee() {
    }

    public Employee(String name, int age, MyDate birthday) {
        this.name = name;
        this.age = age;
        this.birthday = birthday;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public MyDate getBirthday() {
        return birthday;
    }

    public void setBirthday(MyDate birthday) {
        this.birthday = birthday;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", birthday=" + birthday +
                '}';
    }
    
    // 指明Generics之后的写法
    @Override
    public int compareTo(Employee o) {
        // 不需要down casting
        return this.name.compareTo(o.name);
    }


    // 没有指明Generics时的写法
//    // 按name 排序
//    @Override
//    public int compareTo(Object o) {
//        if(o instanceof Employee){
//            Employee e = (Employee)o;
//            return this.name.compareTo(e.name);
//        }else{
//            throw new RuntimeException("input type not matched!");
//        }
//    }
}
```



MyData

```java
/**
 * @author xueshuo
 * @create 2023-01-18 7:46 pm
 */
public class MyDate implements Comparable<MyDate>{

    private int year;
    private int month;
    private int day;

    public MyDate() {
    }

    public MyDate(int year, int month, int day) {
        this.year = year;
        this.month = month;
        this.day = day;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
    }

    @Override
    public String toString() {
        return "MyDate{" +
                "year=" + year +
                ", month=" + month +
                ", day=" + day +
                '}';
    }

    // 使用Generics之后的写法
    @Override
    public int compareTo(MyDate other) {
            // compare year
            int year_diff = this.getYear() - other.getYear();
            if(year_diff != 0){
                return year_diff;
            }

            // compare month
            int month_diff = this.getMonth() - other.getMonth();
            if(month_diff != 0){
                return month_diff;
            }

            // compare day
            return this.getDay() - other.getDay();
    }

    // 使用Generics之前的写法
//    @Override
//    public int compareTo(Object o) {
//        if(o instanceof MyDate){
//            MyDate other = (MyDate) o;
//
//            // compare year
//            int year_diff = this.getYear() - other.getYear();
//            if(year_diff != 0){
//                return year_diff;
//            }
//            // compare month
//            int month_diff = this.getMonth() - other.getMonth();
//            if(month_diff != 0){
//                return month_diff;
//            }
//            // compare day
//            return this.getDay() - other.getDay();
//
//        }else{
//            throw new RuntimeException("input type not matched!");
//        }
//
//    }

}
```



Main  test

+ TreeSet排序方式: 自然排序， 定制排序分别实现

```java
/**
 * 565
 * 创建Employee类的5个对象, 并把这些对象放入TreeSet集合中, 分别用以下两种方式对集合中的元素进行排序, 并遍历输出:
 * 1) 使Employee实现Comparable接口, 并按name排序
 * 2) 创建TreeSet时传入Comparator对象, 按生日日期的先后排序
 *
 * @author xueshuo
 * @create 2023-01-18 7:51 pm
 */
public class EmployeeTest {

    // 问题1: 自然排序: 按name排序Employee
    @Test
    public void test1(){

        TreeSet<Employee> set = new TreeSet<Employee>();

        Employee e1 = new Employee("liudehua", 55, new MyDate(1965, 5, 4));
        Employee e2 = new Employee("zhangxueyou", 43, new MyDate(1997, 5, 4));
        Employee e3 = new Employee("guofucheng", 44, new MyDate(1987, 5, 9));
        Employee e4 = new Employee("liming", 51, new MyDate(1954, 8, 12));
        Employee e5 = new Employee("liangchaowei", 21, new MyDate(1978, 12, 4));

        set.add(e1);
        set.add(e2);
        set.add(e3);
        set.add(e4);
        set.add(e5);

        Iterator<Employee> iterator = set.iterator();
        while(iterator.hasNext()){
            System.out.println(iterator.next());
        }
    }

    // 问题2: 使用定制排序: 按生日日期排序Employee
    @Test
    public void test2(){

        TreeSet<Employee> set = new TreeSet<Employee>(new Comparator<Employee>() {
            // 使用Generics之后的写法
            @Override
            public int compare(Employee o1, Employee o2) {

                    MyDate e1Birthday = o1.getBirthday();
                    MyDate e2Birthday = o2.getBirthday();

                    return e1Birthday.compareTo(e2Birthday);
            }

            // 使用Generics之前的写法
//            @Override
//            public int compare(Object o1, Object o2) {
//                if(o1 instanceof Employee && o2 instanceof Employee){
//                    Employee e1 = (Employee) o1;
//                    Employee e2 = (Employee) o2;
//
//                    MyDate e1Birthday = e1.getBirthday();
//                    MyDate e2Birthday = e2.getBirthday();
//
//                    return e1Birthday.compareTo(e2Birthday);
//
//                }else{
//                    throw new RuntimeException("input type not matched!");
//                }
//            }
        });

        Employee e1 = new Employee("liudehua", 55, new MyDate(1965, 5, 4));
        Employee e2 = new Employee("zhangxueyou", 43, new MyDate(1987, 5, 4));
        Employee e3 = new Employee("guofucheng", 44, new MyDate(1987, 5, 9));
        Employee e4 = new Employee("liming", 51, new MyDate(1954, 8, 12));
        Employee e5 = new Employee("liangchaowei", 21, new MyDate(1978, 12, 4));

        set.add(e1);
        set.add(e2);
        set.add(e3);
        set.add(e4);
        set.add(e5);

        Iterator iterator = set.iterator();
        while(iterator.hasNext()){
            System.out.println(iterator.next());
        }
    }

}
```



# 3. :moon: 应用二: 自定义Generics结构

所谓结构, 即class, interface, method

## 3.1 自定义Generics类, 接口

566,567

自定义含有泛型的类

```java
class Person<T> {
  // 使用T类型定义变量 
  private T info;
  // 使用T类型定义一般方法 public T getInfo() {
  return info; }
      public void setInfo(T info) {
          this.info = info;
  }
  // 使用T类型定义构造器 public Person() {
  }
  public Person(T info) {
  this.info = info; 
}
```





### :bangbang: 亿点细节:

1. 泛型类可能有多个参数，此时应将多个参数一起放在尖括号内。比如: <E1,E2,E3>
2. 泛型类的构造器的书写如下:

```java
public class GenericsClass{
  
  public GenericClass(){}				// 正确
  
	public GenericClass<E>(){}		// 编译不通过
  
}
```

3. 实例化后，操作原来泛型位置的结构必须与指定的泛型类型一致。
4. 泛型不同的引用不能相互赋值。 >尽管在编译时ArrayList<String>和ArrayList<Integer>是两种类型，但是，在运行时只有 一个ArrayList被加载到JVM中。

```java
ArrayList<String> list1 = null;
ArrayList<Integer> list2 = new ArrayList<Integer>();

// 泛型不同的引用不能相互赋值
list1 = list2;  // 编译报错
```



---

1. 泛型如果不指定，将被擦除，泛型对应的类型均按照Object处理，但不等价 于Object。经验:泛型要使用一路都用。要不用，一路都不要用。 泛型的指定中不能使用基本数据类型，可以使用包装类替换。

2. 如果泛型结构是一个接口或抽象类，则不可创建泛型类的对象。

3. 在类/接口上声明的泛型，在本类或本接口中即代表某种类型，可以作为**非静态** 属性的类型、**非静态**方法的参数类型、**非静态**方法的返回值类型。但在静态方法中不能使用类的泛型. 因为泛型的具体类型只有在创建对象时才会指定

```java
// static的方法中不能声明泛型, 因为类的泛型在创建对象时才指定. 但如果是泛型方法, 那就不同了 
public static void show(T t) { 	// 编译报错

} 
```

4. :bangbang: 异常类不能是泛型的, 对于异常变量只能explicitly指定其具体的异常类型

```java
// 不能在try-catch中使用泛型定义 //public void test() {
try {

} catch (MyException<T> ex) { //编译报错
}
}
```

5. 在类中定义含有泛型变量的数组时：
   + 参考:ArrayList源码中声明:Object[] elementData，而非泛型参数类型数组。

```java
new E[]   //  编译不通过
  
E[] elements = (E[])new Object[capacity]		// 正确方式
```



---

父类有泛型，子类可以选择保留泛型也可以选择指定泛型类型: 

+  子类不保留父类的泛型: 按需实现

  + 没有类型 擦除

  + 具体类型

+ 子类保留父类的泛型: 泛型子类
  + 全部保留 
  + 部分保留

```java
class Father<T1, T2> {
}
// 子类不保留父类的泛型
// 1)没有类型 擦除. 不推荐这么做
class Son1 extends Father {// 等价于class Son extends Father<Object,Object>{ }

}
// 2)具体类型
class Son2 extends Father<Integer, String> {

}
  
// 子类保留父类的泛型
// 1)全部保留
class Son3<T1, T2> extends Father<T1, T2> { 
  
}
// 2)部分保留
class Son4<T2> extends Father<Integer, T2> { 
  
}
```

结论:子类必须是“富二代”，子类除了指定或保留父类的泛型，还可以增加自己的泛型

```java
class Father<T1, T2> {
}
// 子类不保留父类的泛型
// 1)没有类型 擦除
class Son<A, B> extends Father{//等价于class Son extends Father<Object,Object>{ }
  
}
// 2)具体类型
class Son2<A, B> extends Father<Integer, String> { 	// Son2 额外定义了A, B 两个泛型
}
  
// 子类保留父类的泛型
// 1)全部保留
class Son3<T1, T2, A, B> extends Father<T1, T2> { 
}
// 2)部分保留
class Son4<T2, A, B> extends Father<Integer, T2> { 
}
```







## 3.2 自定义Generics方法

568

泛型方法: 在方法中出现了泛型的结构, 泛型参数与类的泛型没有任何关系. 换句话说, 泛型方法所属的类是不是泛型类都没有关系 (e.g.1 & e.g.2可以证明这点)

+ 泛型方法, 可以声明为静态的. 原因: 泛型参数是在调用方法时确定的, 并非在实例化类时确定 (而类的泛型是在实例化时确定的)

:gem: e.g.1 泛型类中定义泛型方法

```java
public class Order<T> {		// 类的泛型T
    String orderName;
    int orderId;

    // 类的内部结构就可以使用类的Generics
    T orderT;

    public Order(){

        // 想造泛型类型的数组
//        T[] arr = new T[10];    // 编译不通过

        T[] arr = (T[]) new Object[10];

    };

    public Order(String orderName, int orderId, T orderT){
        this.orderName = orderName;
        this.orderId = orderId;
        this.orderT = orderT;
    }
		
   
    public T getOrderT () {		// 不是泛型方法!
        return orderT;
    }

    public void setOrderT(T orderT){		// 不是泛型方法!
        this.orderT = orderT;
    }

		// ---------------------------------------------------------------------
    // P 568
    // 泛型方法: 在方法中出现了泛型的结构, 泛型参数与类的泛型没有任何关系
    // 换句话说, 泛型方法所属的类是不是泛型类都没有关系
    // 泛型方法, 可以声明为静态的. 原因: 泛型参数是在调用方法时确定的, 并非在实例化类时确定 (而类的泛型是在实例化时确定的)
    public <E> List<E> copyFromArrayToList(E[] arr){	// 第一个<E> 用来告诉编译器, E是泛型变量
        ArrayList<E> list = new ArrayList<>();

        for(E e:arr){
            list.add(e);
        }

        return list;
    }

  
    public static <E> List<E> copyFromArrayToList1(E[] arr){
        ArrayList<E> list = new ArrayList<>();

        for(E e:arr){
            list.add(e);
        }

        return list;
    }
  // ---------------------------------------------------------------------


}
```



:gem: e.g.2 在非泛型类中定义泛型方法

```java
public class SubOrder extends Order<Integer>{   // SubOrder不再是泛型类

    // P 568
    // 泛型方法: 在方法中出现了泛型的结构, 泛型参数与类的泛型没有任何关系
    // 换句话说, 泛型方法所属的类是不是泛型类都没有关系
    public <E> List<E> copyFromArrayToList(E[] arr){
        ArrayList<E> list = new ArrayList<>();

        for(E e:arr){
            list.add(e);
        }

        return list;
    }

}
```





## 3.3 Generics类与Generics方法的使用情景

569

看到这里





# 4. Generics在继承上的体现

570







# 5. 通配符的使用

571-573







# 6. Generics应用举例

574