## Async & await
```ts
async () => {
    const postResponse = await axios.put({data});
    console.log(postResponse);
    //{data: "success", status: 200, statusText: "", headers: {…}, config: {…}, request{...}}
    //data contains info given from backend
}
```
## var vs let vs const

Just like `let`, `const` declarations are hoisted to the top but are not initialized.

So just in case you missed the differences, here they are:

- They are all hoisted to the top of their scope. But while `var` variables are initialized with `undefined`, `let` and `const` variables are not initialized.
```js
console.log(name)
var name = "Steven"
```

-   `var` declarations are globally scoped or function scoped while `let` and `const` are block scoped.
```js
function f() {
	var a = 1
	console.log(a)
}

console.log(a)

for(var i = 0; i < 3; i ++) {
	
}
console.log(i)
```
-   `var` variables can be updated and re-declared within its scope; `let` variables can be updated but not re-declared; `const` variables can neither be updated nor re-declared.
-   While `var` and `let` can be declared without being initialized, `const` must be initialized during declaration.

```js

(function() {
	if (typeof name === "undefined") {
		var name = "Jack"
		console.log('Goodbye' + name)
	} else {
		console.log('Hello' + name)
	}
})();
```
## Arrow function

```js
function addOne(number) {
	return number + 1
}
const addOne = (number) => number + 1

function add(a, b) {
	const c = a + b
	return c
}

const add = (a, b) => {
	const c = a + b
	return c
}

function getCircleArea(r) {
    return 3.14 * r * r;
};

const getCircleArea = (r) => 3.14 * r * r;


function setAge(person, age) {
	person.age = age
}

const setAge = (person, age) => person.age = age;

function getProfile(name, age, title) {
	const profile = {
		name: name,
		age: age,
		title: title
	}
	return profile
}
```
##  Object Destructuring
Suppose you have a `person` object with two properties: `firstName` and `lastName`.
```js
const person = { firstName: 'John', lastName: 'Doe' };
```
when you want to assign properties of the `person` object to variables, you typically do it like this:
```js
const firstName = person.firstName; 
const lastName = person.lastName;
```
in ES6
```js
const {firstName, lastName} = person

// rename variable from destructure
```
### Destructuring a null object
```js
function getPerson() { return null; }

const { firstName, lastName } = getPerson() || {};
```
### Nested object destructuring
```js
const employee = { 
	id: 1001, 
	name: { 
		firstName: 'John', 
		lastName: 'Doe' 
	} 
};

const {id, name} = employee;
```
### Destructuring function arguments
```js
function display(person) {
	console.log(person.firstName + ' ' + person.lastName);
}

function addAgeAttributeToPerson(age, person) {
	return {
		firstName: person.firstName,
		lastName: person.lastName,
		age: age
	}
}
```

## == vs === in Javascript
-   `==` **converts** the variable values to the **same** type before performing comparison. This is called [type coercion](https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion).
 -   `===` does **not** do any type conversion (coercion) and returns _true_ only **if** both values **and** types are identical for the two variables being compared.
 ## Js基础
### 1.1 真假值转换
```js
//array can be undefined or null
function getArrayLength(array) {

}
```
| 数值类型 | Boolean |
| ---- | ---- |
| undefined | false |
| null | false |
| 数字 | 0， NaN (Not a Number) 都是false， 其他是true |
| 字符串 | 空字符串是false， 否则为true |
| 对象 | true |

### 1.2 Number();
```js
Number('10.9')  //10.9
Number()  //0
Number('')  //0
Number(null) //0
Number(true); // 1
Number('string') //NaN
Number(undefined) //NaN
Number('123string') //NaN

parseInt('10.9'); // 10
parseInt(); // NaN
parseInt(''); // NaN
parseInt(null); // NaN
parseInt(true); // NaN
parseInt('123string'); // 123

b = {}; //创建 Object
b == 0; //false
```
### 1.3 条件语句
#### switch case语法
```js
var month = 5;
switch (month) {
    case 1:
        console.log('January');
        break;
    case 2:
        console.log('February');
        break;
    case 3:
        console.log('March');
        break;
    default:
        console.log('Month is not January, February or March'); 5
}
```
### 1.4 面向对象
创建对象
```js
var obj = new Object();
obj = { 
    name: {
        first: 'Gandalf',
        last: 'the Grey'
    },
    address: 'Middle Earth'
};

//创建 method
obj.prototype.printName = function() {
    console.log.(this.name);
}
```
使用 prototype 方法可以节约内存和降低实例化的开销。不过 prototype 方法只能声明 public 函数和属性
## ES6
### 2.1 模版字面量
模板字面量用一对`包裹。要插入变量的值，只要把变量放在${}里就可以了。

模板字面量也可以用于多行的字符串，再也不需要用\n 了。只要按下键盘上的 Enter 就可以换一行，就像下面例子里的这是新的一行。
```js
console.log(`你正在阅读${book.name}。 
    这是新的一行
    这也是。`);
```
### 2.2 箭头函数
```js
var circleAreaES5 = function circleArea(r) {
    var PI = 3.14;
    var area = PI * r * r;
    return area;
};
console.log(circleAreaES5(2));
// 简写版
const circleArea = r => { 
    const PI = 3.14;
    const area = PI * r * r;
    return area;
};
console.log(circleArea(2));
// 当箭头函数只有一个参数时，可以省略参数的圆括号
// 当箭头函数的函数体只有一个 `return` 语句时，可以省略 `return` 关键字和方法体的花括号
const circleArea2 = r => 3.14 * r * r;
console.log(circleArea2(2));

//如果函数不接收任何参数，我们就使用一对空的圆括号
const hello = () => console.log('hello!');
hello();
```
**箭头函数不会创建自己的this（重要！！深入理解！！）**

箭头函数没有自己的this，它会捕获自己在定义时（注意，是定义时，不是调用时）所处的外层执行环境的this，并继承这个this值。所以，箭头函数中this的指向在它被定义的时候就已经确定了，之后永远不会改变。

**.call()/.apply()/.bind()无法改变箭头函数中this的指向**

**箭头函数没有原型prototype**
### 2.3 函数的参数默认值
```js
//由于我们没有传入参数 z，它的值默认为 3。因此，4 + 2 + 3 == 9。
function sum(x = 1, y = 2, z = 3) {
    return x + y + z;
}
console.log(sum(4, 2)); // 输出9
```
### 2.4 解构
```js
//初始多个变量
let [x, y] = ['a', 'b']; // 等同于 let x = 'a'; let y = 'b';

//数值的交换
[x, y] = [y, x];

//属性简写
let [x, y] = ['a', 'b'];
let obj = { x, y };
console.log(obj); // { x: "a", y: "b" }
```
### 2.5 类
只需要使用 class 关键字，声明一个有 constructor 函数和其他 method
```js
class Book { 
    constructor (title, pages, isbn) {
        this.title = title;
        this.pages = pages;
        this.isbn = isbn;
    }
    printIsbn() {
        console.log(this.isbn);
    }//这里等同于
    // Book.prototype.printTitle = function() {
    //     console.log(this.title);
    // }
}
```
继承

我们可以用 extends 关键字扩展一个类并继承它的行为(行{1})。在构造函数中，我们也 可以通过 super 关键字引用父类的构造函数(行{2})。
尽管在 JavaScript 中声明类的新方式所用的语法与 Java、C、C++等其他编程语言很类似，但 JavaScript 面向对象编程还是基于原型实现的。
```js
class ITBook extends Book{
    constructor (title, pages, isbn, technology){
        super(title, pages, isbn);
        this.technology = technology;
    }
}
```

使用属性存取器

ES2015 也可以为类属性创建存取器函数。虽然不像其他面向对象语言(封装概念)，类的属性不是私有的，但最好还是遵循一种命名模式。

要声明 get 和 set 函数，只需要在我们要暴露和使用的函数名前面加上 get 或 set 关键字。我们可以用相同的名字声明类属性，或者在属性名前面加下划线，让这个属性看起来像是私有的。 _name 并非真正的私有属性，我们仍然可以引用它。
```js
class Person {
    constructor (name) {
        this._name = name;
    }
    get name() { 
        return this._name;
    }
    set name(value) {
        this._name = value;
    }  
}
```
### 2.6 模块
```js
//第一个文件
const circleArea = r => 3.14 * (r ** 2);
const squareArea = s => s * s;
export {circleArea, squareArea};

//另一个文件使用函数
import { circleArea, squareArea } from './17-CalcArea'; 

console.log(circleArea(2));
console.log(squareArea(2));

//导出时重命名
export {circleArea as circle, squareArea as square}

//引入时重命名
import {circleArea as circle} from './17-CalcArea'; 

console.log(area.circle(2));
console.log(area.square(2));

//还可以在需要被导出的函数或变量前添加 export 关键字。这样就不需要在文件末尾写导出声明了。
export const circleArea = r => 3.14 * (r ** 2);
export const squareArea = s => s * s;
```
## 3 Typescript
在使用 TypeScript 的时候，我们会经常看到下面这样的代码。
```js
let age: number = 20;
let existsFlag: boolean = true;
let language: string = 'JavaScript';
```
TypeScript 允许我们给变量设置一个类型，不过上面的写法太啰唆了。TypeScript 有一个类型推断机制，也就是说 TypeScript 会根据为变量赋的值自动给该变量设置一个类型。我们用更简洁的语法改写上面的代码。
```js
let age = 20; // 数
let existsFlag = true; // 布尔值
let language = 'JavaScript'; // 字符串
```
如果声明了一个变量但没有设置其初始值，推荐为其设置一个类型，如下所示。
```js
let favoriteFood: string;
let age: number;
```
### 3.1 接口
在 TypeScript 中，有两种接口的概念。第一种就像给变量设置一个类型，如下所示。
```js
interface Person {
    name: string;
    age: number;
}

function printName(person: Person) {
    console.log(person.name); 
}
```
TypeScript 有一个名为鸭子类型的概念:如果它看起来像鸭 子，像鸭子一样游泳，像鸭子一样叫，那么它一定是一只鸭子!在本例中，变量 mary 的行为和Person 接口定义的一样，那么它就是一个 Person。这是 TypeScript 的一个强大功能。
```js
const john = { name: 'John', age: 21 };
const mary = { name: 'Mary', age: 21, phone: '123-45678' };
printName(john);
printName(mary);
//上面的代码没有任何编译错误。像 printName 函数希望的那样，变量 john 有一个 name 和 age。变量 mary 除了 name 和 age 之外，还有一个 phone 的信息。
```
第二种 TypeScript 接口的概念和面向对象编程相关，与其他面向对象语言(如 Java、C#和 Ruby 等)中的概念是一样的。

Comparable 接口告诉 MyObject 类，它需要实现一个叫作 compareTo 的方法，并且该方法接收一个参数
```js
interface Comparable {
    compareTo(b: number): number;
}
class MyObject implements Comparable {
    age: number;
    compareTo(b): number {
        if (this.age === b.age) {
            return 0;
        }
        return this.age > b.age ? 1 : -1;
    }
}
```

### 3.2 泛型
```js
interface Comparable<T> {
    compareTo(b: T): number;
}

class MyObject implements Comparable<MyObject> {
    age: number;
    compareTo(b: MyObject): number {
        if (this.age === b.age) {
            return 0; 
        }
        return this.age > b.age ? 1 : -1;
    }
}
```
## 4 数组
 在 JavaScript 里，也可以在数组中保存不同类型 的值，但我们还是遵守最佳实践，避免这么做(大多数语言都没这个能力)。

 创建数组
```js
const array = [];//这里可以用const是因为array不变的是reference
let daysOfWeekend = ["Sunday", "Saturday"];
let daysOfWeekend = new Array(2);
let daysOfWeekend = new Array {"Sunday", "Saturday"};
```
### 4.1 添加和删除元素
结尾添加
```js
let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
numbers[numbers.length] = 10;
numbers.push(11);
numbers.push(12, 13);
//如果输出 numbers 的话，就会看到从 0 到 13 的值。
```
开头添加
```js
//DIV版本
Array.prototype.insertFirstPosition = function(value){
    for(let i = this.length; i >= 0; i--){
        this[i] = this[i-1];
    }
    this[0] = value;
} 
//官方api
numbers.unshift(0);
```
末尾删除元素
```js
numbers.pop();
```

开头删除元素

*div时要真正从数组中移除这个元素，我们需要创建一个新的数组，将所有不是 undefined 的值从原来的数组复制到新的数组中，并且将这个新的数组赋值给我们的数组。*
```js
numbers.shift();
```
### 任意位置添加或删除元素
```js
numbers.splice(5,3);//代码删除了从数组索引 5 开始的 3 个元素。

numbers.splice(5, 0, 2, 3, 4); //splice 方法接收的第一个参数，表示想要删除或插入的元素的索引值。第二个参数是删除元素的个数(这个例子里，我们的目的不是删除元素，所以传入 0)。第三个参数往后，就是要添加到数组里的值(元素 2、3、4)。输出会发现值又变成了从-3 到 12。

numbers.splice(5, 3, 2, 3, 4); //从索引 5 开始删除了 3 个元素，但也从索引 5 开始 添加了元素 2、3、4。
```

```js
const numbers = [0, 1, 2, 3, 4, 5]

// create an array to indicate if each element in array is even, the result should be [true, false, true, false, true, false]

// create an array only contains even number

// determine if array only contains even number

// determine if array contains at least one even number
```

```js
const persons = [{age: 7, name: "1"}, {age: 8, name: "2"}, {age: 9, name: "3"}]

// create an array to change every person's name into 3
```
### 4.2 二维数组
创建数组
```js
let averageTemp = [];
averageTemp[0] = [72, 75, 79, 79, 81, 81];
averageTemp[1] = [81, 79, 75, 75, 73, 73];

// day 1
averageTemp[0] = [];
averageTemp[0][0] = 72;
averageTemp[0][1] = 75;
averageTemp[0][2] = 79;
averageTemp[0][3] = 79;
averageTemp[0][4] = 81;
averageTemp[0][5] = 81;
// day 2
averageTemp[1] = [];
averageTemp[1][0] = 81;
averageTemp[1][1] = 79;
averageTemp[1][2] = 75;
averageTemp[1][3] = 75;
averageTemp[1][4] = 73;
averageTemp[1][5] = 73;
```
### 4.3 常用函数
#### 用every，some方法迭代
every 方法会迭代数组中的每个元素，直到返回 false，否则返回true。some则相反
```js
const isEven = x => x % 2 === 0;

numbers.every(isEven);

numbers.some(isEven);
```
#### 用forEach迭代
它和使用 for 循环的结果相同。
```js
numbers.forEach(x => console.log(x % 2 === 0));
```
#### 使用 map 和 filter 方法
JavaScript 还有两个会返回新数组的迭代方法。第一个是 map，还有一个 filter 方法
```js
const myMap = numbers.map(isEven); //数组 myMap 里的值是:[false, true, false, true, false, true, false, true, false, true, false, true, false, true, false]。它保存了传入 map 方法的 isEven 函数的运行结果。这样就很容易知道一个元素是否是偶数。

const evenNumbers = numbers.filter(isEven);//它返回的新数组由使函数返回 true 的元素组成。在我们的例子里，evenNumbers 数组中的元素都是偶数:[2, 4, 6, 8, 10, 12, 14]。
```
### 4.4 ES6 新增方法
#### 使用 for...of 循环迭代
```js
for (const n of numbers) {
    console.log(n % 2 === 0 ? 'even' : 'odd');
}
```