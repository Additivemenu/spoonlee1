"use strict";
/* type Age = number;

type Person = {
  name: string,
  age: Age,
  tel?: string
}

let user1: Person = {
  name: 'John',
  age: 30,
  tel: '123-456-7890'
}

let user2: Person = {
  name: 'John',
  age: 30
}

type Color = "red";
// type Color = "blue"; // 类型别名不能重名

if (true) {
  type Color = "blue";
  let color: Color = "blue";
}

let color: Color = "red"; */
let user1 = {
    name: 'John',
    age: 30,
    address: {
        province: '四川',
        city: '成都'
    }
};
let user2 = {
    name: 'John',
    age: 30,
    address: {
        province: '云南',
        city: '昆明'
    }
};
