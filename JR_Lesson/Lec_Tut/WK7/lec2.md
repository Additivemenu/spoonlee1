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
1h04min-1h23min 解构赋值 Destructing

就只是Java里getter在JS里的简洁写法, react里经常用

之前讲过


```js
// { }里填JSON格式的, 一般用来表示object
// [ ] 里填数组格式的, 一般用来表示array

const arr = ['A', 'B', 'C'];
// 和上面等效的, 因为数组也是obeject
const arr1 = {0: 'A', 1: 'B', 2:'C'}

// 解构数组
const {0: aa, 1: bb, 2: cc} = arr   // aa = 'A', bb = 'B', cc = 'C' 
// 和上面等效
const [a, b, c] = arr   // a = 'A', b = 'B', c = 'C'

```




1h23min-1h34min 歇息

1h34min-
不用看都是废话


1h46min- 
rest

---

ES6知识点总结 1h50min-

+ Arrow function
+ let/const
+ template str
+ destruct
+ 函数的默认参数


---
1h51min-2h22min 函数参数的默认值

ES6之前不能直接为函数的参数指定默认值, 只能采用变通的方式对每一个参数指定默认值:
```js
const hello = (name) =>{
    if(! name){
        name = "World!";
    }

    console.log(`Hello ${name}`);
}

hello();        // Hello World
hello("Alice"); // Hello Alice

```

```js
// ES6允许直接在argument里指定默认值
const hello = (name = "world", address="Melbourne") => {
    console.log(name + address)
}
```


```js
{
    console.log("default parameter");
    const marks = {
        math: 100,
        java: 99
    };

    const getTotalScore = (results) => {
        const {
            math: mathScore,
            java: javaScore

        }  = results

        console.log('math: ' + mathScore)
        console.log('Java: ' + javaScore)
        console.log("total marks is: "+ (mathScore+javaScore) )

    }
    getTotalScore(marks);

    // 利用destruct functional argument来设定函数的默认参数
    console.log('-------利用destruct functional argument来设定函数的默认参数-------');
    const getTotalScore1 = (
        {math = 0, 
        java = 0}) => {

        console.log('math: '+ math)
        console.log('Java: '+ java)
        console.log("total marks is: "+ (math+java) )
    }

    marks1 = {
        math: 95
    }
    getTotalScore1(marks1);


    // e.g 在argument中使用'=', 设置两层的参数默认值
    console.log('--------在argument中使用=, 设置两层的参数默认值----------');
    const getTotalScore2 = ({
            math = 0, 
            java = 0
        } = {
            math: 0,
            java: 0
        }) => {

        console.log('math: '+ math)
        console.log('Java: '+ java)
        console.log("total marks is: "+ (math+java) )
    }

    getTotalScore2();    // 空参, 则传入函数的object为{math:0, java:0}
    getTotalScore2({math: 90});   

}
```

下节课讲react

下节课前写完p1








