0-

code sand box做测试更加方便(vscode: live preview)

下节课grid布局

---

9min- 开始

js书写的三种方式
+ 行内
+ 内嵌
+ 外部

---
variable 18min-52min
+ var
+ let 
+ const

命名规范
+ camelCase

[01](./01-let_const_var.html)

+ undefine: a value that can be assigned to a variable
+ not defined: indicates that a variable does not exist
+ const: 声明时必须赋值 P18

---

数据类型 52min-1h13min


PPT 20
+ Number
+ Boolean
+ String
+ Undefined
+ Null
+ symbol
+ Bigint
+ object

数据类型的转换 
+ Number to String PPT22
+ String to Number PPT23
+ to Boolean


---

运算符  1h13min

05-09

+ 算数
+ 比较
  + == 默认会自动转化数据类型, 只关心值是否相等
  + === 严格相等 
+ 逻辑
+ spread operator (展开符)
  + 用来展开array

---

# 看到这里!

解构1h42min-

11

即拆分array, 或者object里的component

---

剩余参数1h57min-


12

---

control flow 2h05min-2h30min




---
数组自带的一些操作方法API:

map 2h30min-

array的方法, map()返回array

[w3schools: map](https://www.w3schools.com/jsref/jsref_map.asp)

17

filter 2h38min-

从一个array中筛选符合条件的元素

18

reduce 2h46min-3h02min

从一个array中聚合信息

[w3school: reduce](https://www.w3schools.com/jsref/jsref_reduce.asp)

19

20

21

---
object 3h02min-

---

arrow function 3h04min-3h12min(end)

arrow function是匿名函数, 不绑定arguments

匿名函数和explicit函数的区别 Ally_tut2 25min-
```js
  const getArrMax = function(arr){      // 把匿名函数赋给变量getARRMax
    ...
  }
```


---
shadowCopy & deepCopy Ally_tut2 30min-50min


---
async 