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





## 2.1 Iterator Interface







## 2.2 Collection: List









## 2.3 Collection: Set





# 3. Map Interface





# 4. `Collections` 容器工具类






# 5. 数据结构简述
