跳转

+ :pencil: [JS与Java语法区别](./JS_Vs_Java.md)
+ :pencil: [steve的JS笔记](./Js.md)

---

Chapter | 
------ | 
[C1: JS Basics](./C1_JS_Basics/README.md)   |   
[C2: JS Object](./C2_Object/JS_object.md) |
[C3: JS Function](./C3_Function/README.md) |
[C4: JS Couping with HTML & CSS](./C4_CoupingWithHTMLCSS/README.md) |
[C5: JS Debug & Exception](./C5_Debug/README.md) |

---
学习资源

1. [b站尚硅谷JS视频笔记](https://github.com/limingzhong61/LearningNotes/blob/master/JSNote/JavaScript/JavaScript.md) 
   可以从中窥探JS重点框架, 先浏览这个再去看MDN文档

2. [mozilla (讲的比W3全面些)](https://developer.mozilla.org/en-US/docs/Web/JavaScript) 
   + **尚硅谷视频笔记看完后主要看这个, MDN看熟了以后查文档也顺手**
   + JS红宝书拿来作为参考书籍辅助看原理, 但看书做笔记根本记不住啊而且很耗费时间,

3. [W3 JS (但是讲的比较浅)](https://www.w3schools.com/js/default.asp)

4. <<JavaScript高级程序设计>> 4th edition
   - 作为补充性质的参考书目

---



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



SOLID原则:
+ **The Single-responsibility principle**: "There should never be more than one reason for a class to change." In other words, every class should have only one responsibility.
+ **The Open–closed principle**: "Software entities should be open for extension, but closed for modification."  功能可扩展, 但是同时核心代码不需要修改.
+ **The Liskov substitution principle**: "Functions that use pointers or references to base classes must be able to use objects of derived classes without knowing it."
+ **The Interface segregation principle**: "Clients should not be forced to depend upon interfaces that they do not use."
+ **The Dependency inversion principle**: "Depend upon abstractions, not concretions."



ECMAScript

JavaScript 解释型语言 (翻译型语言) code -> 用户浏览器上执行 不同浏览器，对代码的解释方式解释手段，都是不同的, 这使得JS很难广泛被推广

ECMA(欧洲计算机制造协会) -> 定义标准 ECMAScript n -> ES n - ES4 - ES4.6 - ES4.9 - ES New - ES5 (ECMA 重组，制定了一系列规范，成立公司) - ES6 * - ES2018 - ES7 - ES8 - ES2019 - ES9

一份JS代码 (符合 ES6 标准的代码) -> 浏览器根据 ES6 定义的标准解释 -> 用户使用





---

如何在webpage打开JS的’debug window’: Inspect>Console> where JavaScript is edited

Tips: 
+ 学代码只看书没有意义，得写代码，多练习
    JavaScript写前端逻辑
    NodeJS写后端逻辑, NodeJS与JavaScript一脉相承(Java和python也可以写后端)  
    而后端负责管理数据库
+ 语言最好先选一样学精，再学另一样
    JavaScript每年都会有新feature, 最新的feature自学（可以关注个公众号）, 我们这里只讲基础的

不太合适的理解:
+ JS放在浏览器里运行, 就作为前端语言.
+ JS放在Node里运行, 就作为后端语言(node.js). -(sudo apt install nodejs)





