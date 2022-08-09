# 学习资源
[左神教程](https://www.bilibili.com/video/BV13Y411w7aU?spm_id_from=333.999.0.0&vd_source=c6866d088ad067762877e4b6b23ab9df)

[左参考代码](https://github.com/algorithmzuo/algorithm-primary)

先看这个(因为这个会带着你写代码), 再看数据结构之美(总结向，比较理论), 同时拿<<数据结构与算法分析Java>>作为工具书做更深入了解
# 新手班 P3-63
## Class1 位运算,简单排序
### p1 位运算
> *左移14min-*
>+	Int: 4 bytes, 即32bits；Long: 8bytes, 即64bits
>+	左移操作: variable << 2表示将int 类型的variable按二进制表示时，所有1向左移动2位，用0填补原来1所在的位置；二进制左移1位操作在十进制看来就是乘了2

[Code: bitOperation](class1/bit.java)  
![](Src/bit_results.png)

>*反码补码14min-*
>+	Java中int类型(Java中默认int有符号)的最大值是2^31-1, 即int的32位中只取后31位（位index 0-30）来表示数大小，最开头的一位为符号位用来表示正负(0代表非负，1代表负数). Java中int的取值范围是[-2^31, 2^31-1]
>>-	负数: 后31位取反加1。如果首位为1，则剩下31位取反，之后加1，再按十进制转化为负数.  如32位全是1的二进制数，除去首位1剩下31位1取反得到31位0，再加1，转化为十进制得到-1; 再如首位为1，剩下31位为0的二进制数，先把31位0取反，得到31个1，再加1，得到首位为1，余下31位为0的二进制数，化为十进制则为-2^31. (之所以这么规定是因为实际上CPU中的运算都是基于二进制的位运算(与或非…，具体怎么实现新手班不讲)，而不是十进制运算, 这样规定可以确保逻辑门只用一套逻辑运算提高性能)

e.g.

```java
    int b = 123812311;
    int c = ~b; //reverse the binary bits 
    print(b);
    print(c);
```
![](Src/bit_complement.png)

>	*更多的位运算*
>+	或, 与， 异或

e.g.  
```java
int aa = 123131231;
int bb = 3881002;
print(aa); // print binary form of aa
print(bb);
System.out.println("=================");
print(aa|bb);
print(aa&bb);
print(aa^bb); //XOR
```

每一位都做了对应的位运算
![](Src/bit_operation.png)
### 算法介绍
>算法: 对一个问题的解决的流程设计
>+ 有具体的问题
>+ 有设计解决这个问题的具体流程
>+ 有评价处理流程的可量化指标

>算法的分类
>分类很多, 对于新手学习特别重要的一个分类:
>+ 明确知道怎么算的流程(比如上面位运算的取反加一，加减乘除)
>+ 明确知道怎么尝试的流程(始于图灵，也是计算机之所以是一门单独的科学的原因)

### P5 选择排序
把一个数组按从小到大的顺序重新排序
>算法思想
>+ 在[0, N-1]的下标范围内找到最小的数，和下标为0的数交换;
>+ 接着在排除下标为0的元素后，剩下的N-1个元素作为新数组，继续前面的步骤;

算法的图形化理解:
![](Src/Picture1.jpg)


[Code: SelectionSorting](class1/Code07_SelectionSorting.java)
>+ 对数组做处理(检索，各种增删改操作)，肯定是围绕index做文章;
>+ 注意在两个for loop嵌套时，如何定义i, j (或者你可以用start, end来命名左右边界的index)来控制处理数组的左右边界;
>+ 写算法时, 记得先想boundary conditions;


### P6 冒泡排序
把一个数组按元素从小到大重新排序
>算法思想
>+ 从前往后，数组每两个元素(如1和2, 2和3, 3和4…)进行比较，大的那个数放到后面， 最后数组的最后一位一定是最大的那个
>+ 排除掉最后一个元素，剩下的前N-1个元素为新数组，继续前一步

算法的图形化理解
如RNA转录一般

![](Src/bubbleSort.PNG)

[Code: bubbleSorting](class1/Code08_bubbleSort.java)
>只需要关注bubbleSort即可, 其他和上面排序算法一样
>+ 注意在两个for loop嵌套时，如何定义i, j (或者你可以用start, end来命名左右边界的index)来控制处理数组的左右边界

问: 拿到一个算法题, 如何想出最优解?
左答: 这是一个哲学问题.

### P7 插入排序
>算法思想
>+	从左往右, 实现0~0号元素从小到大, 接着实现0~1号元素从小到大, 接着0~2号…最后实现0~(N-1)号元素从小到大, 即在数组长度上逐步实现排序
>+	在以上的每次循环中, 相当于每次考虑一个新的元素来排序. 设这个新元素的index为i, 则从位置为i的slot上向左依次比较, 小的在左边，大的在右边, 直到比较到位置为0的slot上.

算法图形化理解
像吃东西似的, 一点一点消化… 也像抓牌似的, 把新抓到的牌查到已有的牌库中, 使手中的牌有序.
![](Src/pic3.jpg)

[Code: insertSorting](class1/Code09_insertSort.java)
>只需要关注insertSort即可, 其他和上面排序算法一样
>+	insertSort最内层用while loop(这里老师用的)或者for loop都可以

### P8 优化插入排序
其实就是insertSorting中我写的for loop, 老师上面讲的用while loop

### P9 答疑
Github的代码
插入排序比选择,冒泡排序算法要好

各种班介绍
-入门班
-基础班
-进阶班
-体系学习班
-大厂刷题班

“你以为google很难吗?”--左程云
“如果你想在35岁后不落后, 算法是唯一能救你的” –左程云

## Class2 对数器和随即行为
### P10 什么叫数据结构
>含义
>+ 数据结构是存储，组织数据的方式
>+ 精心选择的数据结构可以带来更高的运行或者存储效率
>+ 数据结构是很多算法得以进行的载体

>数据结构分类
>+	连续结构: 占用内存里连续的空间, 寻址很快, 如数组. 便于寻址(因为容易计算偏移量)但不便于增删数据, 因为增减数据会导致数据不连续, 需要额外的操作来使得数据连续
>+	跳转结构: 占用内存里不连续的空间, 如链表(一个节点还包含下一个节点的地址), 二叉树(一个节点还包含其两个子节点的地址), 图(一个节点包含多个节点的地址).  便于增删数据（因为本来数据就不连续）但不便于寻址(因为无法计算偏移量, 只能一个接一个地跳转)
>+	连续结构+跳转结构:



### P11 最基本的数据结构
有一个数组arr，长度为n, 现有极大的业务需求(e.g.要求每秒能达到几千万此)对该数组的第i到第j个元素求和, 如何实现? 
+	如何只是for loop 遍历从第i到第j个元素, 效率很低. 肯定有很多需求是重复的, 那么我们直接建立一个经验表直接索引即可.
+	二维表.  创建一个n*n大小的二维表table, 如下: 行数代表i, 列数代表j. 比如table(0, 3) = 10代表求第0到第3个元素的累加和为10
![](Src/pic4.jpg)
+	一维表. 使用类似cumulative probability function的思想, 创建一个新的与原数组等长的数组new_arr，该数组第i个元素的值等于原数组第0个元素到第i个元素的累加和. 
	+ Arr的第i到第j个元素累加和 = new_arr[ j ] – new_arr[ i-1 ]; boundary condition: 如果I = 0, 就直接 = new_arr[ j ]
+	可见二维表费空间但是时间上快(只有索引), 而一维表费时间(因为除了索引, 还得运算)但是空间上节省


### P12 Java中的math.random()函数
Math.random()函数:
Return一个落在[0,1)上的数, 散落概率均布在[0,1);即probability density function f = x, x属于[0,1)

[code: mathRandom_Demo](class2/mathRandom_test.java)

![运行结果](Src/pic5.png)

其中5个test:
Test 4 和test 5相当于roll dice问题, roll一次只有两种结果, return值落在[0,x) （即中了）, 或落在[x,1)（即没中）,
Roll两次那就有4种事件: {1,2都中}, {1,2都不中},{1中,2不中}, {1不中, 2中}
取两次roll的max来看是否落在[0,x)， 等效于上面的{1,2都中}事件
取两次roll的min来看是否落在[x,1), 等效于上面的{1,2都不中}


### P13 从1到5随机到1-7随机
题目: 现有一个函数可以做到等概率返回1，2，3，4，5. 如何仅利用它(不能修改函数)做到等概率返回1,2,3,4,5,6,7呢?
>核心思想:
>还是通过调用条件函数(题目给定的工具函数)来构造等概率事件(比如多次调用条件函数) ;其实本质还是概率论里的roll dice问题
>>+ 方法:先把1-5随机转化为0,1发生器(1,2返回0， 4,5 返回1，是3弃掉重新做 ),再通过二进制表示法转化0-7随机, 再放弃0; 
>>+ 方法一般化: 从a-b随机到c-d随机都可以通过这种方法做到

[Code:Random_1to5Conversion](class2/Random_1to5conversion.java)

![运行结果](Src/pic6.png)
### P14 01不等概率随机到01等概率随机
题目: f函数以p概率返回0, 以1-p概率返回1； 如果仅利用p函数等概率返回0或1?
> 核心思想: 
> 还是通过调用条件函数(题目给定的工具函数)来构造等概率事件(比如多次调用条件函数), 再做标记(返回0或1); 其实本质还是概率论里的roll dice问题

[Code: 01UnevenTo01Even](class2/Random_01unevenTo01even.java)

![运行结果](Src/pic7.png)
### P15 对数器的使用
[Code: 计数器eg](class2/Code03_Comp.java)
对数器用来调Bug
生成随机样本, 面对具体的数据来调试, 方便自己做对比调bug; 后续的课程里会用到此技巧

Q&A: 按引用传递, 按值传递
Java 基础: 为什么不直接写arr2=arr1来copy呢?
-因为这样写, arr2其实指向的是和arr1同样指向的内存区域, 只有你重新再开辟一块内存区域让arr2指向它才算copy



## Class3 二分法, 复杂度, 动态数组, 哈希表和有序表
### P16 有序数组中找到num
[Code: BSExist](class3/Code01_BSExist.java)
用对数器来校对二分法与暴力遍历的结果是否一致

### P17 有序数组中找到>=num的最左位置
[1,2,2,2,3,4,5,6,7] 返回>=4最左的位置, 即返回4的下标5
一直二分直到把数组耗尽, 最晚抓到的中点(从右往左逼近, 因为所求为>=4最左)值即为所求
[code:BSNearLeft](class3/Code02_BSNearLeft.java)
同理, 有序数组中找到<=num的最右位置
只需修改代码中的二分法查找和暴力遍历部分即可
[code:BSNearRight](class3/Code02_BSNearRight.java)

### P18 局部最小值

先略, 有点繁琐

一个长度为N的数组无序, 但其中任意两个相邻的数不相等  
现定义局部最小:
1.数组左边界: arr[0] < arr[1], 称arr[0]为局部最小
2.数组右边界: arr[N-2] > arr[N-1], 称arr[N-1]为局部最小
3.数组中间: arr[i-1] > arr[i] < arr[i+1], 称arr[i]为局部最小
要求: 返回数组中的一个局部最小值

### P19常数操作
耗费固定时间的操作, 耗费时间与数据量无关， 时间复杂度为O(1)

详细见体系班Class1

### P20时间复杂度
描述进行了多少次常数操作的指标

详细见体系班Class1


### P21等差数列求和
略, 见体系班Class1分析选择排序的时间复杂度

O(logN) 一般不写底数, 因为换底公式

从上往下, 性能降低:  
O(1) 
O(logN) 
O(N) 
O(N*logN) 
O(N^2)  
O(N^3)  
O(N^k)  
O(2^N)  
O(3^N)  
O(k^N)  
O(N!)

### P22-23动态数组
即Java: arrayList; 如果原来的数组长度不够用, 则新开辟一个长度为原来2倍的数组, 将原来的数组拷贝过来, 并销毁原来的数组

arrayList扩容代价的时间复杂度(最差情况下)为O(N)  
比如最坏情况下现在我想往一个长度为1的arrayList中放入N个数, 需要的扩容操作为2+4+8+16+...+N ~ O(N) (等比数列求和)  
N次扩容时间复杂度为O(N), 均摊到一次扩容时间复杂度是O(1), 所以使用arrayList扩容在工程上对总体的时间复杂度影响不大


### P24哈希表和有序表的使用
> 哈希表 hashMap

[Code: hashMapTreeMap](class3/Code05_HashMapTreeMap.java)

+ hashmap本质上就是一个(key, value)数据库
+ 基本操作, 增删查改记录时间复杂度都是O(1), 但这个常数操作的实际时间比较长
  
API | 注释
------ | ------
put(key, value)   | create or update a record  
containsKey(key)   | return true or false  
get(key)   | get value married to key  
remove(key)   |   remove a record

+ 关于key的传递
  + Java源生类key, 按值传递 
  例如HashMap(String, String), key是"金庸", value是所有金庸小说的文本, 那么这个HashMap记录的所占内存是"金庸"+所有金庸小说的文本所占的内存 
  + Java非源生类key, 按引用传递  
   例如HashMap(Node, Node), 自定义的Node类中一字段为String, key是Node{"金庸"}, value是Node{所有金庸小说的文本}, 那么这个HashMap记录的所占内存只是用来表示"金庸"和所有金庸小说文本的变量的内存, 即只是地址(引用)的内存  

>有序表 treeMap
+  比hashMap功能强的地方在于其内部对于key排序了    
   这点也要求key必须是可以排序的(Java源生类会定义好怎么排序, 自定义类的话如果想用treemap也得定义好怎么排序)
+ 但是增删查改的时间复杂度为O(logN), 这点不如hashMap

## Class4 单链表及其简单题目(上)
### P25 单链表与双链表
> 概念介绍 
> 单链表: 值, 一条next指针;
> 双链表: 值, 一条last指针, 一条next指针;
> null: 约定某内存地址为null

### p26 单链表反转
单链表反转是什么

链表反转的两个关键点:
+ 新的head需指向原链表的尾部
+ 内部Node反转
  
> 注意!
> JVM: 如果找不到被引用的内存元素(比如反转链表node， 但没有令head指向新的链表的head), 则释放它们(自动回收功能). 如下:  
>+ head --> a --> b --> c --> d --> null //可以通过head, 找到node a,b,c,d  
>+ 如果只是内部Node反转: null <-- a <-- b <-- c <-- d, 而head仍指向node a, 则无法通过head, 找到node b,c,d, 那么JVM会释放b,c,d的内存 (JVM不可达)

[一个简单的手动反转单链表的例子](class4/reverseLinkedList_Practice.java)

Results:
   ```shell
   1-->2-->3
   3-->2-->1
   ```
创建并连接Node的过程图解:
![](Src/reverselist.jpg)


链表这块的语法参考JavaCore chapter4 4.5对象的引用

## Class5 单链表及其简单题目(下)



## Class6 比较器, 优先级队列, 二叉树



## Class7 继续二叉树




## Class8 归并排序和快速排序


