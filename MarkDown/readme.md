extension:  
markdown allinone,  
markdown preview enhanced

沉浸式写作: `ctrl + k` 松开 `z`;退出双击`Esc`

[其他人关于Markdown笔记](https://gitee.com/yerenping/Ye13/blob/master/other/Markdown-studay.md)

[MarkDown官方教程](https://markdown.com.cn/basic-syntax/horizontal-rules.html)

[HelloJava](Src/helloJava.java)


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
# 5.强调
在强调内容两侧加上*或者_  , 如  
*斜体*, _斜体_  
**加粗**, __加粗__ 
# 6.列表
## 无序列表
使用`.` `+`或`-`, 如
+ 第一项
+ 第二项
+ 第三项
注意：标记后面最少有一个_空格_或_制表符_。若不在引用区块中，必须和前方段落之间存在空行。
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
[1]:https://github.com/Additivemenu/spoonlee1
[2]:https://github.com/Additivemenu/algorithm-primary-beginner
# 9.图片
与链接类似, 只需再在链接的基础上在前方加一个!
![](Src/R.jpg)
# 10. 反斜杠\
相当于反转义作用, 使一个符号变为普通符号
# 11. 符号`
起到标记作用, 如  
`ctrl + k`