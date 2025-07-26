"use strict";
function add(a, b) {
    return a + b;
}
function sayHello1(name) {
    return "hello " + name;
}
const sayHello2 = function (name) {
    return "hello " + name;
};
const sayHello3 = (name) => {
    return "hello " + name;
};
const sayHello4 = (name) => "hello " + name;
const sayHello5 = (name) => {
    if (name === "admin") {
        return "hello admin";
    }
    return;
};
const result = add(1, 2);
/* function sendMessage(userId: number, message?: string) {
  console.log(userId);
  console.log("message: ", message);
}

sendMessage(1) */
function sendMessage(userId, message = "hello") {
    console.log(userId);
    console.log("message: ", message);
}
sendMessage(1, "hi");
function sum() {
    return Array.from(arguments).reduce((result, item) => result + item, 0);
}
const sumResult = sum(1, 2, 3, 4, 5);
console.log(sumResult);
