:computer:[Bilibili 尚硅谷: 集合 511-562 (514-517,  560-562 revision)](https://www.bilibili.com/video/BV1Kb411W75N?p=513&vd_source=c6866d088ad067762877e4b6b23ab9df)

---
- [1. Java 集合框架概述](#1-java-集合框架概述)
- [2. Collection Interface](#2-collection-interface)
  - [2.1 Iterator Interface](#21-iterator-interface)
  - [2.2 Collection: List](#22-collection-list)
  - [2.3 Collection: Set](#23-collection-set)
- [3. Map Interface](#3-map-interface)
- [4. `Collections` 容器工具类](#4-collections-容器工具类)
- [5. 数据结构简述](#5-数据结构简述)

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
  + `List`: 元素有序, 可重复的集合
  + `Set`: 元素无序, 不可重复的集合
+ `Map` (映射) interface: **双列数据**, 保存具有映射关系的"key-value pair"的集合



<img src="../../../Src_md/java_collection.png" width=80%>



<img src="../../../Src_md/java_map.png" width=80%>

# 2. Collection Interface

## 2.1 Collection的常用方法

注意向Collection接口的实现类的对象中添加数据obj时, **要求obj所在类要@override equals()** ---> 这样contains(), remove()等方法才能有效, 因为它们底层调用了equals()

CRUD

### 增

+ `add(Object e)`: add e into coll
+ `addAll(Collection coll1)`: all all elements in coll1 into coll



### ''查''

+ `contains(Object obj)`: 判断当前集合是否包含obj. 需要调用equals()方法, 需要重写equals()
+ `constainsAll(Collection coll1)`: 判断coll1中的所有元素是否都存在于当前集合中.



### 删

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

+ 鉴于Java中数组用来存储数据的局限性，我们通常使用List替代数组. List相当于动态数组.

+ List集合类中**元素有序, 可重复**, 集合中的每个元素都有其对应的顺序索引.

+ List容器中的元素都对应一个整数型的序号记载其在容器中的位置，可以根据 序号存取容器中的元素.

+ JDK API中List接口的实现类常用的有:ArrayList、LinkedList和Vector



List接口: 存储有序的(元素在集合中的前后顺序是有意义), 可重复的数据.  又名 --> 动态数组; List接口Java1.2出现
*              ArrayList: 作为List interface的主要实现类, 线程不安全的因而效率高; 
               *              底层使用**Object[]** elementData存储
*              LinkedList: 对于频繁的插入, 删除操作, 使用此类效率比ArrayList高 ; 
               *              底层使用**双向链表**存储; Java1.2才出现
*              Vector 作为List接口的古老实现类 Java1.0 就有了, 线程安全因而效率低;  
               *              底层使用**Object[]** elementData存储

### ArrayList

源码分析 527

该看这个了!



### LinkedList

源码分析 528







### Vector

源码分析 529





## 2.4 :full_moon: Collection: Set



### HashSet



### LinkedHashSet



### TreeSet





# 3. Map Interface



## HashMap



### LinkedHashMap



## SortedMap



### TreeMap





# 4. `Collections` 容器工具类






# 5. 数据结构简述
