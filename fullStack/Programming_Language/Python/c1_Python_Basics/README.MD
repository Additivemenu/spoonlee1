# Part 1 Python basic syntax



## 1.1 Variable
在Python中, 和其他编程语言一样, 变量名中只能包含字母, 数字和下划线, 且只能以字母或下划线作为变量名开头; 变量名不可包含空格; 变量名不能包含python用于特殊用途的关键字.

## 1.2 Data type

Name | type | Description
-----|-----|-----
Integer | int | Whole number: 3, 200, 
Floating point | float | Number with a decimal point: 2.3, 1.5
String | str | Ordered sequence of characters: "hello", 'happy'



### 1.2.1 int
整数

### 1.2.2 float
带小数点的数

### 1.2.3 String
在python中, 用"" 或''括起来的都是String (Java里""括起来的是String, ''括起来的是char)
```python
"this is tony"
'this is tony'  # 但注意, 此时如果String中有单引号将导致语法错误
```

操控String type的变量:
1. title()
首字母大写
2. String拼接
直接使用 + 来拼接String
但注意: python中如果连接字符串的类型不同, 要显式同化类型(这点和Java不同):

    ```python
    #需要显式地把23转化为String, 用Str(), 否则python无法知道你想如何解读23
    message = "happy " + 23 + "rd birthday" 

    message = "happy " + str(23) + "rd birthday"
    ```

3. 添加空白
   + 制表符 \t (相当于连续几个white space)
   + 换行 \n
4. 删除空白
   + 删除String末尾的空白 rstrip() 
   + 删除String开图空白 lstrip()
   + 删除String中的空白 strip()
5. Access character in a String
   和list类似, 直接用variableName[index]即可, index从0开始, 可以为负数(从末尾倒回去了)  

## 1.3 Operators

### 1.3.1 Arithmetic Operators
+ 加减乘除: +, -, *, /
+ 乘方: **
+ module, floor division: %, //
+ <,<=,>,>=
+ !=, ==
+ is, is not: identify operator
+ in, not in: membership operator

### 1.3.2 Logic Operators
+ not
+ or
+ and

### 1.3.3 Bit Operators
+ ~: complement
+ &: bit-wise "AND"
+ ^: bit-wise "XOR"
+ |: bit-wise "OR"
+ ">>", "<<": right shift, left shift
## 1.4 Control flow





# Part 2 Python 基本数据结构

+ Order immutable用( ): tuple
+ Ordered mutable用[ ]: list
+ Unordered 用{ }: dictionary, set

Name | type | Description | Example
-----|-----|----- | -----
List | list | Ordered sequence of objects | [10, "hello", 200.3]
Dictionary | dict | Unordered key | {"mykey":"value", "name":"Frank"}
Tuple | tup | Ordered **immutable** sequence of objects | (10, "hello2", 200.3)
Set | set | Unordered collection of **unique** objects | {"a", "b", "c"}


## 2.1 List
### 2.1.1 List 初始化
List的元素用square bracket括起来

```python
fruits = [‘apple’, ‘orange’, ‘banana’, ‘grapes’, ‘strawberry’]
empty_list = []
empty_list = list()
```

### 2.1.2 CRUD on List

Access element:
+ python index也是从0开始, 并且可以是负的.

```python
# Access element
fruits = [‘apple’, ‘orange’, ‘banana’, ‘grapes’, ‘strawberry’]
print(fruits[0])
print(fruits[1])
print(fruits[2])
print(fruits[-1])
print(fruits[-2])
```


```python
# add element
fruits = [‘apple’, ‘orange’, ‘banana’, ‘grapes’, ‘strawberry’]
print(fruits)
fruits.append(’cherry’)
print(fruits)
```


```python
# remove element
fruits = [‘apple’, ‘orange’, ‘banana’, ‘grapes’, ‘strawberry’]
print(fruits)
fruits.remove(‘banana’)
fruits.pop()
fruits.pop(0)
del fruits[-1]
```


## 2.2 Tuple



## 2.3 Dictionary



## 2.4 Set

