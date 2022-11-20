# Part 1 Python basic syntax



## 1.1 Variable
### 1.1.1 int

### 1.1.2 float


### 1.1.3 String

## 1.2 Operators




## 1.3 Control flow





# Part 2 Python 基本数据结构

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

