- [1. 对象的调用](#1-对象的调用)
  - [1.1 对象属性的调用](#11-对象属性的调用)
  - [1.2 对象方法的调用](#12-对象方法的调用)
- [2. Object Destructuring](#2-object-destructuring)
  - [2.1 Destructuring a null object](#21-destructuring-a-null-object)
  - [2.2 Nested object destructuring](#22-nested-object-destructuring)
  - [2.3 Destructuring function arguments](#23-destructuring-function-arguments)



---

```js
let star = {
    name: 'pink',
    age: 18,
    gender: 'male',
    sayHi: function(){
        alert('hi');
    }
}
```

# 1. 对象的调用
## 1.1 对象属性的调用 
```js
console.log(star.name);

console.log(star['name']);
```

## 1.2 对象方法的调用

```js
console.log(star.sayHi());
```


# 2. Object Destructuring

:book: [MDN: Destructing](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

The destructuring assignment syntax is a JavaScript expression that makes it possible to unpack values from arrays, or properties from objects, into distinct variables.

就相当于Java中的getter, 在JS中的写法

普通写法:
```js
const person = {
    firstName: 'john',
    lastName: 'Doe'
}

// when we want to extract property from an object
const fName = person.firstName;
const lName = person.lastName;
```

ES6新特性:

```js
// 利用json格式的key-newKey pair来批量提取一个object的属性的值
{key1: newKey1, key2: newKey2} = object
```

```js
// in ES6, more clean way to extract info (equivalent to the 2 lines above)
const {firstName: fName, lastName: lName} = person;
// 如果变量名和property name一样的话
const {firstName, lastName} = person;
```

## 2.1 Destructuring a null object
```js
function getPerson(){ return null;}
const{firstName, lastName} = getPerson() || {};     // if left of `||` is true, just pick the left; if left of `||` is false (null & undefined are false), pick the right
console.log(firstName)  // undefined, 空object的属性为undefined
```

## 2.2 Nested object destructuring
```js
const employee = { 
	id: 1001, 
	name: { 
		firstName: 'John', 
		lastName: 'Doe' 
	} 
};


const{id, name:{firstName, lastName}, name} = employee;

console.log(firstName);     // John
console.log(name)           // return an object
```


## 2.3 Destructuring function arguments

允许我们当object作为函数输入参数时, 在传入参数期间就把它destruct, 只是一种简化写法的语法 (和用getter没本质区别)

e.g.1 task: print attributes of an object
```js
// 普通写法
function display(person){
    console.log(person.firstName + '' + person.lastName);
}

// destructing at function body
const display = (person) =>{
    const {firstName, lastName} = person;   // destructing
    console.log(firstName +" "+ lastName);
}

// destructing at function argument
const display = ({firstName, lastName}) =>{ 
    console.log(firstName +" "+ lastName);
}

// 用``直接拼接字符串
const display = ({firstName, lastName}) =>{ 
    console.log(`${firstName} ${lastName}`);
}

```

e.g.2 task: 返回一个独立的, 具有新加的属性age的person object

```js
// 普通写法
function addAgeAttributeToPerson(age, person){
    return{
        firstName: person.firstName,
        lastName: person.lastName,
        age: age
    }
}

// 简洁写法: 用destructing object at function argument
const addAgeAttributeToPerson = (age, {firstName, lastName})=> ({
    firstName,
    lastName,
    age  
})

// 更简洁写法: 用spread operator; 注意只有1层的Object, spread operator相当于深拷贝
const addAgeAttributeToPerson = (age, person)=> ({...person, age })
```