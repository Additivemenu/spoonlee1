"use strict";
let a = [1, 2, 3];
var b = ["a", "b"];
const c = [true, false];
const d = ["a", "b"];
let e = [1, "a"];
const f = ["a", "b", 2];
a.push(4);
// a.push("a"); //error
d.unshift("c");
f.push("aaa");
// f.push(true); //error
let g = [1, "a"];
g.map(item => {
    if (typeof item === "number") {
        return item * 2;
    }
    return item.toUpperCase();
});
const users = [
    {
        name: "a",
        age: 20
    },
    {
        name: "b",
        age: 21
    }
];
const arr = [];
arr.push(1);
arr.push("a");
// 如果any类型的数组在函数中有赋值了具体的类型，那么出了函数作用域之后，就不会被扩展为any[]类型
function fn() {
    const arr = [];
    arr.push(1);
    arr.push("a");
    return arr;
}
const arr2 = fn();
// arr2.push(true);
const arr3 = [1, 2, 3];
const myArr1 = arr3.concat(4);
console.log(myArr1);
const myArr2 = arr3.filter(item => item > 2);
console.log(myArr2);
const myArr3 = arr3.slice(0, 2);
console.log(myArr3);
// arr3.push(4);
// arr3[3] = 4;
// arr3.splice(0, 1);
