markdown extension:

+ markdown all in one
+ markdown emoj
+ enhanced markdown preview

---

+ [1.标题](#1标题)
+ [一级标题](#一级标题)
  + [二级标题](#二级标题)
    + [三级标题](#三级标题)
      + [四级标题](#四级标题)
        + [五级标题](#五级标题)
        + [六级标题](#六级标题)
+ [2.段落](#2段落)
+ [3.区块引用](#3区块引用)
+ [4.代码区块](#4代码区块)
+ [5.强调](#5强调)
+ [6.列表](#6列表)
  + [无序列表](#无序列表)
  + [Nested list](#nested-list)
  + [有序列表](#有序列表)
+ [7.分割线](#7分割线)
+ [8.链接](#8链接)
  + [行内式](#行内式)
  + [参考式](#参考式)
+ [9.图片](#9图片)
+ [10. 反斜杠\\](#10-反斜杠)
+ [11. 符号\`](#11-符号)
+ [12. 表格](#12-表格)
+ [13. Math](#13-math)
+ [14. 目录](#14-目录)

---

extension:  
markdown allinone,  
markdown preview enhanced

沉浸式写作: `ctrl + k` 松开 `z`;退出双击`Esc`

[其他人关于Markdown笔记](https://gitee.com/yerenping/Ye13/blob/master/other/Markdown-studay.md)

[MarkDown官方教程](https://markdown.com.cn/basic-syntax/horizontal-rules.html)

[W3school Markdown](https://www.w3schools.io/file/github-readme-image/)

[HelloJava](Src/helloJava.java)

[markdown guide](https://www.markdownguide.org/basic-syntax#code)

---

# 1.标题

e.g.

# 一级标题

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

##### 六级标题

# 2.段落

段落之间:空一行

段落之内想换行:  
两个空格加回车

# 3.区块引用

在段落的每行或第一行使用符号>, 还可以多个嵌套使用

> aa  
> aaa

> a
>> a
>>> a

# 4.代码区块

三个反引号跟语言名字

```c
    void main(){
        printf("hello world!");
    }
```

shell界面

```shell

```

# 5.强调

在强调内容两侧加上*或者_  , 如  
*斜体*,*斜体*  
**加粗**, **加粗**

# 6.列表

## 无序列表

使用`.` `+`或`-`, 如

+ 第一项
+ 第二项
+ 第三项
注意：标记后面最少有一个_空格_或_制表符_。若不在引用区块中，必须和前方段落之间存在空行。

## Nested list

1. Lists can be nested
    + Four spaces
        + Eight spaces
            + Twelve spaces
2. And back

## 有序列表

有序列表的标记方式是将上述的符号换成数字,并辅以`.`，如：

1. 第一项
1 .1 第1.1
3. 第二项
4. 第三项

# 7.分割线

---
OR
***

# 8.链接

链接可以由两种格式构成: 行内式和参考式

## 行内式

[sponlee_GitHub](https://github.com/)

## 参考式

[spoonlee_Res1][1]  
[spoonlee_Res2][2]  
[1]:<https://github.com/Additivemenu/spoonlee1>
[2]:<https://github.com/Additivemenu/algorithm-primary-beginner>

# 9.图片

与链接类似, 只需再在链接的基础上在前方加一个!
![](Src/R.jpg)
<img src="Src/R.jpg" width="50%">

# 10. 反斜杠\

相当于反转义作用, 使一个符号变为普通符号

# 11. 符号`

起到标记作用, 如  
`ctrl + k`

# 12. 表格

Column | Column
------ | ------
Cell   | Cell  

# 13. Math

When $a \ne 0$, there are two solutions to $(ax^2 + bx + c = 0)$ and they are
$$ x = {-b \pm \sqrt{b^2-4ac} \over 2a} $$

$$ 函数名=\begin{cases}
公式1 & 条件1 \\
公式2 & 条件2 \\
公式3 & 条件3
\end{cases}$$

# 14. 目录

自动生成目录:

+ [TOC]
+ ctrl + shift + p, 然后输入command: create table of contents
