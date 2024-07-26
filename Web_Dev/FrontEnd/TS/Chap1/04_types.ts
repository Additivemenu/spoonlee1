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


// ! 限定函数的argument参数与返回值类型
let d4: (a: number,b:number) => number
d4 = function (n1, n2){
    return n1 + n2;
}


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

// ! enum
/**
 * 
 */

// 
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

// 
let j4: string | number;

let jj4: {name: string} & {age: number};    // jj4必须同时满足有name, 和 age属性
jj4 = {name: 'tom', age: 12}

//! 类型的别名
type myType =1 | 2 | 3 | 4 | 5;

let k4: myType;
let m4: myType;

k4 = 1;
m4 = 2;