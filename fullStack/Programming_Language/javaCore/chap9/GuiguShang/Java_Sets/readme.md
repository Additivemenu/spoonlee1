:computer:[Bilibili 尚硅谷: 集合 511-562 (514-517,  560-562 revision)](https://www.bilibili.com/video/BV1Kb411W75N?p=513&vd_source=c6866d088ad067762877e4b6b23ab9df)

---
[TOC]



---

# 1. Java 集合框架概述

Array在内存存储方面的特点:
+ 数组初始化后, 长度就确定了
+ 数组声明的类型, 就决定了进行元素初始化时的类型

Array在存储数据方面的弊端:
+ 数组初始化后, 长度不可变, 不便于扩展
+ 数组中提供的属性和方法少, 不便于进行添加, 删除, 插入等操作, 且效率不高, 同时无法直接获取存储元素的个数
+ 数组存储的数据是有序的, 可以重复的， 这就导致存储数据的特点单一



---

为了克服Array的弊端, **Java集合类**可以用来存储数量不等的多个对象, 还可以用于保存具有映射关系的关联数组.

Java集合可以分为Collection和Map两种体系:

+ `Collection` interface: **单列数据**, 定义了存取一组对象的方法的集合
  + `List`: 元素有序 (index有意义), 可重复的集合
  + `Set`: 元素无序, 不可重复的集合
+ `Map` (映射) interface: **双列数据**, 保存具有映射关系的"key-value pair"的集合



<img src="../../../Src_md/java_collection.png" width=80%>



<img src="../../../Src_md/java_map.png" width=80%>

# 2. Collection Interface

## 2.1 Collection的常用方法

由于继承, Collection的常用方法也可被List和Set使用



:bangbang: 注意向Collection接口的实现类的对象中添加数据obj时, **要求obj所在类要@override equals()** ---> 这样contains(), remove()等方法才能有效, 因为它们底层调用了equals()

### CRUD

增

+ `add(Object e)`: add e into coll
+ `addAll(Collection coll1)`: all all elements in coll1 into coll

---

"查"

+ `contains(Object obj)`: 判断当前集合是否包含obj. 需要调用equals()方法, 需要重写equals()
+ `constainsAll(Collection coll1)`: 判断coll1中的所有元素是否都存在于当前集合中.

---

删

+ `remove(Object obj)`: 从当前集合中删除obj元素.  同样需要调用equals()方法, 同样需要重写equals()
+ `removeAll(COllection coll1)`: 从当前集合中移除coll1中所有元素 (差集操作)

+ `retainAll(Collection coll1)`: 交集操作, 获取当前集合和coll1的交集, 并将结果返回给当前集合.

+ `equals(Object obj)`: 要想返回true, 当前集合和形参集合的元素都得相同(顺序, 值都得相同)



### 其他基本操作

+ `size()`
+ `clear()`
+ `isEmpty`

+ `hashCode()`: 返回当前对象的hash值



### 集合与数组相互转化

+ `toArray()`: 集合 ---> 数组

+ 拓展: Array --> Collection (即list): 调用Arrays class的static method asList()

  + 注意 Arrays.asList(arr) 内array元素的类型得是wrapper class, 如果是基本数据类型则如下

    + ```java
      List ints = Arrays.asList(new int[]{123, 456});     // int[] 整体看作一个元素
      System.out.println(ints.size());          // 1
      ```

    



## 2.2 Iterator Interface

:book: [JDK17 doc: Iterator](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Iterable.html) JDK1.8之后新添加了几个方法, 这里没有体现

+ Iterator对象称为迭代器(23种设计模式之一), 主要用于遍历**Collection集合(不包括Map集合)**中的元素.
+ GOF给迭代器的定义为: **提供一种方法访问一个容器(container)对象中各个元素, 而又不需要暴露该容器对象的内部细节**. 迭代器模式, 就是为容器而生. 类似于"公交车上的售票员"
+ Collection接口继承了java.lang.Iterable接口, Iterable接口有一个iterator()方法, 那么所有实现了Collection接口的集合类都有一个iterator()方法, 用以返回一个实现了Iterator接口的对象
+ **Iterator仅仅用于遍历集合, Iterator本身并不提供承装对象的能力.** 如果需要创建Iterator对象, 则必须有一个被迭代的集合, 也就是说, Iterator对象是依附于被迭代的集合而存在的.
+ **集合对象每次调用iterator()方法都得到一个全新的Iterator对象**, 默认游标都在集合的第一个元素之前. 所以注意不要对一个集合反复地使用iterator()方法，容易死循环



### 2.1.1 迭代器的执行原理

next(), hasNext()搭配使用

其实原理就像单链表遍历一样

注意next()实际包含两部操作: 1) 指针下移; 2) 返回指针下移后指向的元素

<img src="./Src_md/Iterator_principle.PNG" widht=50%>

`remove()`



增强for loop, 注意是shallowCopy集合元素来操作





## 2.3 :full_moon: Collection: List

+ 鉴于Java中数组用来存储数据的局限性，我们通常使用List替代数组. **List相当于动态数组.**

+ List集合类中**元素有序, 可重复**, 集合中的每个元素都有其对应的顺序索引.

+ List容器中的元素都对应一个整数型的序号记载其在容器中的位置，可以根据 序号存取容器中的元素.

+ JDK API中List接口的实现类常用的有:ArrayList、LinkedList和Vector



List接口: 存储有序的(元素在集合中的前后顺序是有意义), 可重复的数据.  又名 --> 动态数组; List接口Java1.2出现
*              ArrayList: 作为List interface的主要实现类, 线程不安全的因而效率高(用Collections的synchronizedList() 可以返回线程安全的List); 
               *              底层使用**Object[]** elementData存储
*              LinkedList: 对于频繁的插入, 删除操作, 使用此类效率比ArrayList高 ; 
               *              底层使用**双向链表**存储; Java1.2才出现
*              Vector 作为List接口的古老实现类 Java1.0 就有了, 线程安全因而效率低;  
               *              底层使用**Object[]** elementData存储



尚硅谷课件里有对应的pdf讲这些实现类的源码

+ `command` + `O`: search for the class and check the source code

+  `command` + `fn` + `F12`: display all methods in current class



### ArrayList

源码分析 527

+ **jdk7的情况下**

```java
ArrayList list = new ArrayList();   // 底层创建了长度为10的Object[] elementData

list.add(123);                      // elementData[0] = new Interger(123);

list.add(11);                       // 如果此次的add, 导滞elementData[0]的容量不够, 则扩容
```

默认情况下, 扩容为原来的容量的1.5倍， 同时需要将原有的数组中的数据复制到新的数组中.

结论: 建议开发中去使用带参数的constructor: ArrayList list = new ArrayList(int capacity)


+ **jdk8中的ArrayList的变化**

```java
ArrayList list = new ArrayList();  //底层Object[] elementData初始化为{}, 而不是一个长度为10的Object[]

list.add(123);                     // 第一次调用add()时, 底层才创建了长度为10的数组, 并将数据123添加到elementData中
```

后续的添加与扩容操作与jdk7无异



小结:

jdk7中的ArrayList的对象的创建类似于单例的**饿汉式**

jdk8中的ArrayList的对象创建类似于单例的**懒汉式**, 延迟了数组的创建, 节省内存



### LinkedList

源码分析 528

```java
LinkedList list = new LinkedList();   //内部声明了Node类型的first和last属性, 默认值为null
list.add(123);           // 将123封装到Node中, 创建了Node对象
```

其中Node定义为: 体现了LinkedList本质是双向链表

```java
private static class Node<E> {
      E item;
      Node<E> next;
      Node<E> prev;

      Node(Node<E> prev, E element, Node<E> next) {
          this.item = element;
          this.next = next;
          this.prev = prev;
      }
}
```





### Vector

源码分析 529

知道就行, 现在都不用Vector了



### List 接口中常用方法的测试

除了2.1中Collection的常用方法, List接口中额外还有一些和索引有关的方法 (因为List存储的是有序的数据).   而Set中则不会有如下这些方法:

* void add(int index, Object ele):在index位置插入ele元素

* boolean addAll(int index, Collection eles):从index位置开始将eles中的所有元素添加进来

* Object get(int index):获取指定index位置的元素

* int indexOf(Object obj):返回obj在集合中首次出现的位置

* int lastIndexOf(Object obj):返回obj在当前集合中末次出现的位置 

* Object remove(int index):移除指定index位置的元素，并返回此元素 

  * 注意与Collection.remove(Object obj)区分

    ```java
    list.remove(2);  // 默认指的是remove element with index = 2
    
    list.remove(new Integer(2)); // remove element '2'
    ```

* Object set(int index, Object ele):设置指定index位置的元素为ele 

* List subList(int fromIndex, int toIndex):返回从fromIndex到toIndex位置的子集合



---

ArrayList常用方法总结:
* 增: add(Object obj), 指的是在末尾增加元素
* 删: remove(int index) / remove(Object obj)
* 改: set(int index, Object obj)
* 查: get(int index)
* 插: add(int index, Object obj), 指的是在中间插入元素
* 长度: size()
* 遍历: Iterator / enhanced for loop  / normal loop



## 2.4 :full_moon: Collection: Set

Collection接口: 单列集合, 用来存储一个个的对象(int, boolean等基础类型不行)

+ Set接口: 存储无序的(元素在集合中的前后顺序没有意义), 不可重复的数据. 又名 --> 集合(高中意义的)
  + HashSet
    + LinkedHashSet
  + TreeSet



:bangbang: **Set 中没有定义额外的方法, 只能用Collection的方法**



### HashSet

一: Set接口: 存储无序的(元素在集合中的前后顺序没有意义), 不可重复的数据. 以HashSet为例:

* **无序性**: 不等于随机性. 存储的数据在底层的数组中的位置并未按照添加时的数组索引顺序决定, 而是由数据的hashCode来决定

* **不可重复性**: 保证添加的元素按照equals()方法判断时, 不能返回true, 即相同的元素只能添加一个

  

:full_moon: 二: 添加元素的过程 (HashSet底层为HashMap), 以HashSet为例:

核心思想是想通过hashCode来减少判断成本： 

+ 如果两个成员的hashCode一样, 则它们不一定想等, 还需用equals()来double check是否真的想等; 
+ 如果两个成员的hashCode不想等, 则它们一定不相等, 这样就大大减少使用equals()的次数

```bash
我们向HashSet中添加元素a, 首先调用a所在类的hashCode()方法计算a的hashValue, 接着该hashValue被转化为a应该在HashSet底层数组的存放位置, 之后判断该存放位置是否已经有元素:
		如果没有其他元素, 则a就放在这个位置上, a添加成功;        ---> 添加成功情况1
		如果此位置上已经有其他元素b (或以linked lis的形式存在多个元素了), 则首先比较a与b的hashValue:
					如果hashValue不相同, 则a添加成功;        ---> 添加成功情况下2
					如果hashValue相同, 继续调用a所在类的equals()方法:
								若equals()返回true, a添加失败;
								若equals()返回false, a添加成功.        ---> 添加成功情况3
```

对于添加成功情况2,3: 元素a与已经存在在索引位置上的元素用linked list的形式连接存储.

jdk7:  元素a放到数组中, 指向原来的元素

jdk8:  元素a挂在原来的元素下面


HashSet的底层: 数组 + 链表, 装入HashSet的元素需要同时重写equals()与hashCode()方法



**要求: 向HashSet中添加的数据, 其所在类一定要重写: 1) hashCode()  2) equals()**

*     要求: 重写的hashCode()与equals()要尽可能保持一致性: 即想等的对象必须具有相等的hashCode (不同的对象很小概率也有相同的hashCode)
*     技巧: 对象中用作equals()比较的fields, 都应该参与到hashCode的计算; 直接用Intellij的command + N 生成即可



### LinkedHashSet

LinkedHashSet作为HashSet的子类, 在添加数据的同时, 还维护了两个引用, 记录此数据的前一个数据和后一个数据,  使得我们遍历其内部数据时, 可以按照添加的顺序去遍历; 

优点: 对于频繁的遍历操作, LinkedHashSet的查找效率要比HashSet高



### TreeSet

底层用红黑树实现, 可以按照添加的元素的指定属性来排序

:bangbang: 要求: 向TreeSet中添加的数据, 要求是相同类, 且实现了Comparable接口, 不然add时就会报错

两种排序方式: 

+ 自然排序(实现**Comparable接口**): 当构造器参数为空, 默认采用自然排序
  + 自然排序中 判断TreeSet的成员相同, 不是调用equals(), 而是调用Comparable接口中的compareTo()返回0

+ 定制排序(**Comparator接口**): 当构造器参数为Comparator的instance时采用定制排序
  + 定制排序中, 判断成员相等,  不再是equals(), 而是调用Comparator接口中compare()返回
  



**因而小心! 如果两个成员本身是不相等的, 只是他们中某个成员变量想等, 而你恰恰仅使用那个成员变量作为compare()或者compareTo()的判断依据, 此时这两个成员也会被认为是相等的**, 而想等的成员不会被重复加入Set中!



P544 TreeSet课后练习

见intellij practice



P545 Set两道面试题

:gem: Practice: 去除一个List中的重复数据, 要求尽量简单



:gem::gem: 面试题: 

当中途改变set中某个成员的属性时, 该成员的hashCode若被计算就会和原来不同, 但该成员依旧呆在底层数组原来的位置上

```java
@Test
public void test2(){
    HashSet set = new HashSet();
    Person p1 = new Person(1001,"AA");      // Person 已重写hashCode(), equals()
    Person p2 = new Person(1002,"BB");

    set.add(p1);
    set.add(p2);
    System.out.println(set);        // [Person{name='BB', age=1002}, Person{name='AA', age=1001}]

    p1.name = "CC";     // 再次计算p1的hashCode就变了, 但p1放置在底层数组中的位置保持不变(这不就带来很多bug了吗?)
    set.remove(p1);     // remove时先判断有没有, 有了再删除: 先判断hashCode, 此时计算出来的hashCode和p1被加入时不同， 因而被判断为p1不存在, 删除无效
    System.out.println(set);        // [Person{name='BB', age=1002}, Person{name='CC', age=1001}]

    set.add(new Person(1001,"CC")); //同理, Person(1001, "CC）的hashCode对应在底层数组上位置没被占领, 被加入成功
    System.out.println(set);

    set.add(new Person(1001,"AA"));// 虽然hashCode计算的位置上被p1占了, 但二者并不equals, 所以加入成功
    System.out.println(set);
}
```



# 3. Map Interface

546



## HashMap



### LinkedHashMap



## SortedMap



### TreeMap





# 4. `Collections` 容器工具类






# 5. 数据结构简述
