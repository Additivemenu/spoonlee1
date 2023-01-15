
# 7:45开始

JS龙哥分享笔记

龙哥自我介绍: Qantas tech lead

主要讲react, 不懂就问, 不用担心浪费大家时间.

布置的作业一定要做

# 20:08正式开始

markdown: markdown language, 兼容性很好, vscode, github...都可以用

html: hypertext markup language, up代表可以向上扩展, 一个html tag可以扩展出很多属性 


# JS基础知识复习  20:30


## :star: 1. debugger  
结合一个demo


## 2. statement 20:49-

面试时能够扩展回答面试官的问题最加分, 面试主要靠和面试官聊, 比如面试官问项目里你加不加semi-colon, 答: it depends, 两种情况分别讨论, 写分号更标准, 不写分号也可以因为js中只要我保证代码语句都是一句一行也行, 这样更简洁. 而不是给一个确定的回答.


## 3. Variable

```js

var name = 'aa'     // String
var age = 32        // number
var isBad = false   // boolean
var middleName     // undefined
var purse = null;  // null 


function myFav(name){
    console.log(name);
}

// myFav的类型: Object
// 在JS里, 如果一个变量看起来哪个类型都不是, 那它往往就是Object类型
// 即 非primitive type的变量的类型都是Object

const myArray = [1,2,3,4]
// myArray的类型: Object

class Bank{

}

const nab = new Bank()
// nab的类型: Object

```

Hoisting 21:22

```js
num = 6

function log(){
    console.log(num)

    var num=7
}

var num

log()       //? undefined 因为只有声明被提升
```

上面的和下面的等效

```java
var num
num = 6

function log(){
    var num
    console.log(num)

    num=7
}

log()       //

```

Identifier


## 4. control flow

JS中, 任何两个独立的object都不相等.

当比较primitive type的变量时, 比较值
当比较object type的变量时, 比较内存地址

---

鸭子原则 (duck test)

如果一个生物长的像鸭子, 叫声像鸭子, 走路像鸭子, 各方面都像鸭子, 那么JS就认为这个生物大概率是鸭子

如何判断一个东西为true

非严格像等 
'ABC': true
123: true
true: true
{}: true
null: false
undefined: flase 
0: false



只要不是false的, 就是true: 
+ trusy: String(exclude ''),  number (exclude 0), object
+ falsy: null, undefined, 0, ''

```js
var x = 2
if(x = 2){      // 在js中不报错,  console.log("1")会被执行. 因为2是trucy
    console.log("1")
}
```


:star:

```js
// 以下只是简写, 并不是检测数值或者类型
if(xxx){

}

// 实际上是:
if(duckTest(xxx, true)){

}


```

---

switch      22:08 - 

```js
function isApple(fruit){
    case "banana":
        // ...
        return false;
    case "apple":
        // ...
        return false; 
    default: 
        // ...

}
```

现在还用switch多吗?把每个case都换成object的一个property是不是更好理解

字典数据

```js
const dictionary = {
    a:{},
    b:{},
    c:{}
}
```


三元表达式:

你懂的

短路计算:

``` js
// 本质
truthy && something = something

falsy && ... = falsy

truthy || ... = truthy

falsy || something = something
```



```js
const welcomeMessage = isVIP && 'welcome VIP!'   // if left is false, just return fasle. if left is true, then we look at right 
const loginMessage = welcomeMessage || "login success!" // if left is true, return the left. if left is fasle, then we look at the right

// isVIP false, loginMessage = "login success!"
// isVIP true, loginMessage = "welcome VIP!"

```

应用: 少写几行代码

```js
document.querySelector('#dropdown-container').innerHTML = showDropdown && renderDropdown();


// 等效
if(showDropdown){
    document.querySelector('#dropdown-container').innerHTML = renderDropdown();
}else{
    document.querySelector('#dropdown-container').innerHTML = false;
}
```


loop


function


下节课接着讲匿名函数