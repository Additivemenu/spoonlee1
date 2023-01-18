接着讲JS

0-
课堂练习 pdf page6

写代码注意: 可扩展性(Reusable), 可维护性(Matainability), 可读性(Readability) 这也是最精华的思想

好的代码一定是契合人类思维方式的

1. given by an array of flights, returns stops statement to user.

```js
function getStop2(flights){
    const length = flight.length;

    // 利用字典数据 (即一个HashMap)
    const specialStopMap = {
        0: 'Direct',
        1: '1 Stop',
        6: 'hello world',
        15: 'The dream flight',
        10: 'Another special message'
    }

    const normalStops = (length - 1) + ' Stops'
    const specialStops = specialStopMap[length];

    return specialStops || normalStops;
}
```


2. calculate tax 1h10min-

```js
function calculateIncomeTax(income){
    // build up tax table
    let incomeTaxMap = [
        {min: 0, max: 18200, rate: 0, base: 0},
        {min: 18200, max: 37000, rate: 0.19, base: 0},
        {min: 37000, max: 90000, rate: 0.325, base: 3572},
        {min: 90000, max: 180000, rate: 0.37, base: 20797},
        {min: 1800000, max: Number.Infinity, rate: 0.45, base: 54096},
    ]

    // look up tax table
    let row
    for(let i=0; i < incomeTaxMap.length; i++){
        if(income >= incomeTaxMap[i].min && income < incomeTaxMap[i].max){
            row = incomeTaxTable[i];
        }
    }

    // calculation
    const tax = row.base + (income-row.min) * row.rate;
    return tax;

}
```


---
1h20min-1h42min

SOLID原则:
+ **The Single-responsibility principle**: "There should never be more than one reason for a class to change." In other words, every class should have only one responsibility.
+ **The Open–closed principle**: "Software entities should be open for extension, but closed for modification."  功能可扩展, 但是同时核心代码不需要修改.
+ **The Liskov substitution principle**: "Functions that use pointers or references to base classes must be able to use objects of derived classes without knowing it."
+ **The Interface segregation principle**: "Clients should not be forced to depend upon interfaces that they do not use."
+ **The Dependency inversion principle**: "Depend upon abstractions, not concretions."




---
1h42min-

ES6 pdf page15

ECMAScript

JavaScript 解释型语言 (翻译型语言) code -> 用户浏览器上执行 不同浏览器，对代码的解释方式解释手段，都是不同的

ECMA(欧洲计算机制造协会) -> 定义标准 ECMAScript n -> ES n - ES4 - ES4.6 - ES4.9 - ES New - ES5 (ECMA 重组，制定了一系列规范，成立公司) - ES6 * - ES2018 - ES7 - ES8 - ES2019 - ES9


一份JS代码 (符合 ES6 标准的代码) -> 浏览器根据 ES6 定义的标准解释 -> 用户使用


ES6新特性:
+ 箭头函数
```js
// 函数是普通老百姓, 没有特权, 函数和变量没有任何区别
// 函数也可以作为变量的值储存，也可以作为参数传递，也可以作为返回值返回
// 区分 fn = function(){...} 函数变量赋值 与 fn() 函数调用

var sum = function(num1, num2) {
    return num1 + num2;
}

var sum = (num1, num2) => {
    return num1 + num2;
}

var sum = (num1, num2) => num1 + num2;
```

+ class
JS没有对象,because everyhing is `Object`

```java
//java
CLass Animal{
    ...
}

Animal dog = new Animal();
```

```js
//js
let student = {
    id: '',
    name: ''
}

```


2h12min-2h49min
this

JS中, this的指向是由上下文动态决定的: 谁调用指向谁


```js
let o1 = {
    text: 'o1',
    fn: function(){
        return this.text
    },
};

o1.fn()     // o1

let o2 = {
    text: 'o2',
    fn: function(){
        return o1.fn();
    },
};

o2.fn()     // o1, 因为o1.fn() o1调用了fn(), fn()中this指向o1


let o3 = {
    text: 'o3',
    fn: function(){
        let fn = o1.fn;
        return fn();        // 没有调用者
    },
};

o3.fn()     //  error / undefined, o3.fn()执行起来没有调用者

let o4 = {
    text: 'o4',
}

o4.fn = o1.fn
o4.fn()         // o4, o4调用fn(), this指向o4


let o5 = {
    text: 'o5',
    fn: function(){
        return o1.fn()
    },
};
o5.fn()     //  o1   因为o5.fn()执行起来, 是执行o1.fn(), o1调用fn(), 其中this指向o1



```






---




面试
+ 欧洲式: 粥多僧少, 缺人
  + 澳洲就是这样, 会RMR就成了大半了
+ 中国式: 粥少僧多, 不缺人
  + 应试 
  + 考算法
+ 美国式: 最不缺人, 希望招进来的人最聪明
  + 考算法