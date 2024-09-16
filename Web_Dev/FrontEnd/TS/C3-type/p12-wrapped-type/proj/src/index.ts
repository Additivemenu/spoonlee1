let obj1 = {};
let obj2: {} = { name: "John", age: 25 };
let obj3: {} = 123;
let obj4: {} = "Hello";

let obj5: object = { name: "John", age: 25 };
let obj6: object = [1, 2, 3];
let obj7: object = "hello"; // Error: Type 'string' is not assignable to type 'object'.

// 装箱类型: Object
const temp1: Object = { name: "jack" };
const temp2: Object = () => {};
const temp3: Object = [];
const temp4: Object = new String("hello");
const temp5: Object = "world";
const temp6: Object = 123;
const temp7: Object = true;
const temp8: Object = Symbol("a");

let str1: string = "Hello";
let str2: String = new String("Hello");
str2 = str1; // OK, 因为 string 是 String 的子类型
// str1 = str2; // Error: Type 'String' is not assignable to type 'string'. 'string' is a primitive, but 'String' is a wrapper object. Prefer using 'string' when possible.

let str3: String = new String("Hello");
// let str4: string = str3; // Error: Type 'String' is not assignable to type 'string'. 'string' is a primitive, but 'String' is a wrapper object. Prefer using 'string' when possible.

// 类型字面量, 一样有这样的兼容性问题
let str5: "Hello" = "Hello";
str2 = str5; // OK
str1 = str5; // OK
str5 = str1; // Type 'string' is not assignable to type '"Hello"'.
