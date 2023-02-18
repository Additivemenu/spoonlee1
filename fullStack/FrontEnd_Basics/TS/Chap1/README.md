

# 和react一起使用

+ passing props via functional components in React using TypeScript is very similar to passing props in regular JavaScript, with the *additional step of specifying the types of the props.*







# TS类型声明

## 基本用法

02-

```js
let a: number;

let a:number = 1;

function sum(a:number, b:number) : number{
  ...
}
```



```ts
// !
// 声明变量b, 且指定它的类型为number, 之后b的赋值只能是数组
let b: number; 
b = 33;
// b = 'hello'; // forbidden

let str: string;
str = 'hello';
// str = 1;     // forbidden

// tsc指令可以指定将ts文件编译为哪个版本(e.g. ES6)的js


// !
// 声明变量同时赋值
let c: boolean = true;

// 如果变量的声明和赋值是同时进行的, TS可以自动对变量进行类型检测
let d = false;
// d = 1;      // forbidden


// !
// JS中的函数不考虑参数的类型和个数
// 但TS可以为他们指定类型, 并限定arument的个数, 还可以为返回值返回类型
function sum(a:number, b:number) : number{
    return a + b;
}

let result = sum(123, 123);
// console.log(sum(123, "123"));        // forbidden
// console.log(sum(123,123,123))       // forbidden
```



## TS数据类型

03-

| 类型    | 例子              | 描述                           |
| ------- | ----------------- | ------------------------------ |
| number  | 1, 33, 2.5        | 任意数字                       |
| string  | 'hi', "hi", \`h\` | 任意字符串                     |
| boolean | true, false       | 你懂的                         |
| 子面量  | 其本身            | 限制变量的值就是该字面量的值   |
| any     | *                 | 任意类型                       |
| unkown  | *                 | 类型安全的any                  |
| void    | undefined         | Undefined                      |
| never   | 没有值            | 不能是任何值 (一般用来报错)    |
| object  | {name: 'tom'}     | 任意的JS对象                   |
| array   | [1,2,3]           | 任意JS数组                     |
| tuple   | [4,5]             | 元祖, TS新增类型, 固定长度数组 |
| Enum    | enum{A,B}         | 枚举, TS中新增类型             |



### 字面量 (Literal)

```js
// !
//  也可以直接使用字面量进行类型声明
let aa: 10;

aa = 10;

// aa = 11;     // error 通过字面量类型声明, 不能修改了

// ! 字面量
// 可以使用 |  来连接多个类型或者字面量 (联合类型)
let bb: "male" | "female";
bb = "male";
bb = "female"


let cc: boolean | string;
cc = true;
cc = "true";
```



### any vs. unknown

```js
// ! any
// 一个变量声明为any, 相当于对该变量关闭了TS的类型检测, 使用TS一般不用
let dd: any;
dd = 10;
dd = 'hello';
dd = true;

// ! 声明变量如果不指定类型, TS自动认为是any
let ee;

// ! 
// any 类型的变量可以赋给任何类型的变量
let ss: string;
ss = dd;


// ! unknown 表示未知类型的值
// 值可以是任意类型 
let ff: unknown;
ff = 10;
ff = 'hello';
ff = true;

// !
// 但是 unknown 类型的变量不能直接赋值给unknown类型的值
// unknown类型其实就是一个类型安全的any, 能用unknown尽量别用any
let gg = 'hello';
// gg = ff;     //! error

// 必须先做类型检查, 才能将unknown类型的值符给其他类型的变量
if(typeof ff === "string"){
    gg = ff;
}
```

### 类型断言

```js
// 类型断言, 用来告诉解析器变量的实际类型
/**
 * 语法:
 *  变量 as 类型
 *  <类型> 变量
 */
gg = ff as string; 
gg = <string> ff;
```

### Void

```js
// ! void
function fn(): number{
    return 123;
}

function fn1(): void{
    
}

function fn2(): number | string{
    return 1;
}
```

### never

```js
// ! never 表示永远不会返回结果, 主要用来报错
function fn3(): never{
    throw new Error('报错了');
}
```



04-

### :moon: object限定

```js
// ! JS中对象太多了, 单单声明object限制类型还不够
let a4: object;
a4 = {};
a4 = function (){};


// ! object的加强: 可以指定对象中应该包含的属性及类型
let b4:{name:string, age?: number};       // b4必须指向object, 且obejct中必须有一个类型为name属性, age属性可选
// b4={};      // !error
b4 = {name: "spongebob"}
b4 = {name: "bob", age: 20};

// 对象必须有name, 其他属性可以随便加
// 【proName: string】: any 表示任意类型的属性
let c4: {name: string, [propName: string]: any}    
c4 = {name: 'tom', age: 18, gender: "male" }
```

### :moon: function的限定

```js
// ! 限定函数的argument参数与返回值类型
let d4: (a: number,b:number) => number
d4 = function (n1, n2){
    return n1 + n2;
}
```

### :moon: Array & tuple

```js
// ! 限制数组存储相同类型的值
// 类型[]
// Array<类型>
let e4:  string[];       // 限定e是字符串数组
e4 = ['a','b', 'c'];

let f4: number[];

let g4: Array<number>;
g4 = [1,2,3];

// ! tuple
/**
 * tuple就是长度固定的数组
 * 语法: [类型, 类型]
 */
let h4: [string, number];       // 限定h4内只有2个元素, 第一个为string, 第二个为number
h4 = ['a',123]
```

### Enum

```js
// ! enum
enum Gender{
    Male = 0,
    Female = 1
}

let i: {name: string, gender: Gender};
i = {
    name: 'tom',
    gender: Gender.Male
}

console.log(i.gender === Gender.Male)
```

### & 

```js
// ! & 
let j4: string | number;	// 限定j4类型为string or number

let jj4: {name: string} & {age: number};    // jj4必须同时满足 {name: string} {age:number}这两个限定条件 ---> 同时具有string类型的name, number类型的age这两个属性
jj4 = {name: 'tom', age: 12}
```

### :moon: type alias, 方便复用

```js
//! 类型的别名
type myType = 1 | 2 | 3 | 4 | 5;

let k4: myType;
let m4: myType;

k4 = 1;
m4 = 2;
```

