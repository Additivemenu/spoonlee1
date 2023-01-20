继续讲ES6

接上节课this的用法 0 -

一般由上下文对象调用, 绑定在该对象上 （谁调用, this指向谁）

---
Es6: class  3min-

JavaScript构造对象的写法跟传统的面向对象语言(比如 C++ 和 Java)差异很大，很容易让新学习这门语言的程序员感到困惑。

ES6 引入了更接近传统语言中class的OOP写法

但是下面代码的和Java这样的OOP语言相比性能不好, 方法作为对象的属性和对象同时占内存 (除非用prototype才能让方法绑定到class上, 无论你创建多少对象, 方法占用的内存是一样的)

e.g. Myer 黑五日活不超过100w, 代码的性能不作为澳洲程序员的重要考虑, RMR才是澳洲IT重点
```js
class Person { 

    constructor(name) {
        this.name = name; 
    } 

    sayHi() {
        console.log('My name is ' + this.name);
    }

    joinMeeting(meeting) { 
        meeting.talks.push(this.sayHi);
    }
}


var alice = new Person('Alice'); 
alice.sayHi()

var bob = new Person('Bob');
bob.sayHi()

```


---

var变量提升 29min-


如果是常量要用const,只有变量用let






---

块级作用域 44min-

只需要记住用let 和 const, 用var会带来很多反直觉的块级作用域的问题
 
```js
const fns = [];

// giao, 把函数变量放入一个数组...
for (let i = 0; i < 10; i ++) {
    fns[i] = function(){
        console.log(i);
    }
}

console.log(fns[3] )     // 函数变量
/**
 * ƒ (){
        console.log(i);
    }
 */

fns[4]()    // 调用函数变量对应的函数体
/**
 * 4
 */
```


---

Template String 57min-

字符串操作在JS中是十分繁琐的

+ ''
+ ""
+ ES引入了\`\`, 允许你直接在``中用${}引用变量

```js
const s = `My name is ${name}, I am ${age} years old`   // 丝滑
```


---
1h04min-

解构赋值 Destructing

就是getter的简洁写法

之前讲过


```js
const arr = ['A', 'B', 'C'];
// 和上面等效的
const arr = {0: 'A', 1: 'B', 2:'C'}



```

从1h18min- 接着看

---


