"use strict";
/* let a:object = {
  b: "hello"
}

console.log(a.b) // 注意object上并没有b的属性 */
let a = {
    b: "hello"
};
console.log(a.b);
const user = {
    name: "jack",
    age: 25,
    sex: "男",
    tel: "123"
};
user.age = 19;
user.name = "tom"; // 报错，因为name是只读属性
console.log(user);
