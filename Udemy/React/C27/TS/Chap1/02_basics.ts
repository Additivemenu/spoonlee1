let a;

a = 10;
a = 'hello';

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
