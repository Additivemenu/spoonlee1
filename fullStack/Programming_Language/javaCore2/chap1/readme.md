跳转:
:book: [尚硅谷chap16 Java8新特性: Stream API & Optional Class](./GuiguShang.md)


---

- [1. Intro: 从迭代到流](#1-intro-从迭代到流)
- [2. Stream](#2-stream)
  - [2.1 Stream的创建](#21-stream的创建)
  - [2.2 filter, map, flatMap](#22-filter-map-flatmap)
  - [2.2](#22)
- [7. optional类型](#7-optional类型)


---

# 1. Intro: 从迭代到流
动机: java8引入了流库, 与集合(set)相比, 流(stream)提供了一种可以让我们在更高概念级别上去指定计算任务的数据视图, 用来"做什么而不是怎么做". 就像SQL语句那样更加方便地去数据集合展开操作, 而不用关心操作是如何实现的.

:gem: e.g.1

假设我们想计数一本书的words count:
```java
// firstly import contents of a book into a list named words
var contents = new String (Files.readAllBytes(Path.get("alice.txt")), StandardCharsets.UTF_8);      // read file into String
List<String> words = List.of(contents.split("\\PL+"));  // split into words

// 方法一: iteration
int count = 0;
for(String W:words){
    if(w.length() > 12) count++;
}

// 方法二: use stream
long count = words.stream()         // initial stream
    .filter(w ->w.length>12)        // 返回另一个stream, 其中只包含长度大于12的单词
    .count();                       // 进一步将filter()返回的stream化简为一个结果
```

方法二use stream的工作流程:
1. 创建一个stream
2. 指定将initial stream转换为其他stream的中间操作, 可能包含多个步骤
3. 应用终止操作, 从而产生结果. 从此之后, 这个流就再也不能用了.


集合 vs. stream的工作特点:
+ **stream不会存储其元素**
  + 元素可能存储在底层的集合中, 或按需产生. 
+ **stream的操作不会修改其数据源.** 
  + 如上面filter()并不修改initial stream而是返回另一个stream
+ **stream的操作是尽可能惰性执行的**


# 2. Stream
## 2.1 Stream的创建
可以使用Collection interface的stream方法将任何集合转化为一个stream

+ `stream.of()` 将array转换为一个stream
    ```java
    Stream<String> song = Stream.of("gently", "down", "the", "stream")
    ```
+ `Array.stream(array, from, to)`可以利用array的片段创建一个stream

+ `Stream.empty()`创建empty stream, 不包含任何元素
+ 创建无限stream:
  + `generate`
  + `iterate`

## 2.2 filter, map, flatMap

## 2.2 

# 7. optional类型