JavaScript object





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





# 2. Class

ES6新特性

JavaScript构造对象的写法跟传统的面向对象语言(比如 C++ 和 Java)差异很大，很容易让新学习这门语言的程序员感到困惑。

```java
//java 写法
CLass Animal{
    ...
}
Animal dog = new Animal();


```

```js
//js 写法
let student = {
    id: '',
    name: ''
}
```

---

ES6 引入了更接近传统语言中class的OOP写法

但是下面代码的和Java这样的OOP语言相比性能不好, 方法作为对象的属性和对象同时占内存 (除非用prototype才能让方法绑定到class上, 无论你创建多少对象, 方法占用的内存是一样的)

e.g. Myer 黑五日活不超过100w, 代码的性能不作为澳洲程序员的重要考虑, RMR才是澳洲IT重点



```js
class Person { 

    constructor(name) {
        this.name = name; 
    } 

    sayHi() {
        console.log('My name is ' + this.name);
    }

    joinMeeting(meeting) { 
        meeting.talks.push(this.sayHi);
    }
}


var alice = new Person('Alice'); 
alice.sayHi()

var bob = new Person('Bob');
bob.sayHi()
```







## this

JS中, this的指向是由上下文动态决定的: 谁调用指向谁

```js
let o1 = {
    text: 'o1',
    fn: function(){
        return this.text
    },
};

o1.fn()     // o1

let o2 = {
    text: 'o2',
    fn: function(){
        return o1.fn();
    },
};

o2.fn()     // o1, 因为o1.fn() o1调用了fn(), fn()中this指向o1


let o3 = {
    text: 'o3',
    fn: function(){
        let fn = o1.fn;
        return fn();        // 没有调用者
    },
};

o3.fn()     //  error / undefined, o3.fn()执行起来没有调用者

let o4 = {
    text: 'o4',
}

o4.fn = o1.fn
o4.fn()         // o4, o4调用fn(), this指向o4


let o5 = {
    text: 'o5',
    fn: function(){
        return o1.fn()
    },
};
o5.fn()     //  o1   因为o5.fn()执行起来, 是执行o1.fn(), o1调用fn(), 其中this指向o1
```





# 3. Object Destructuring

:gem: [destruct demo](./Destruct/destruct.js)

ES6新特性

:book: [MDN: Destructing](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

The destructuring assignment syntax is a JavaScript expression that makes it possible to unpack values from arrays, or properties from objects, into distinct variables. 

就只是Java里getter在JS里的简洁写法, react里经常用

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

## 3.1 Destructuring a null object
```js
function getPerson(){ return null;}
const{firstName, lastName} = getPerson() || {};     // if left of `||` is true, just pick the left; if left of `||` is false (null & undefined are false), pick the right
console.log(firstName)  // undefined, 空object的属性为undefined
```



destructing array

```js
// { }里填JSON格式的, 一般用来表示object
// [ ] 里填数组格式的, 一般用来表示array

const arr = ['A', 'B', 'C'];
// 和上面等效的, 因为数组也是obeject
const arr1 = {0: 'A', 1: 'B', 2:'C'}

// 解构数组
const {0: aa, 1: bb, 2: cc} = arr   // aa = 'A', bb = 'B', cc = 'C' 
// 和上面等效
const [a, b, c] = arr   // a = 'A', b = 'B', c = 'C'
```



destruct using spread operator

```js
const student = { 
  name: 'Alice', 
  age: 26, 
  courses: [
    {name: 'Introduction to JavaScript', }, 
    {name: 'How to give up JavaScript', }]
};

const{
  name,
  ...studentWithoutName
} = student;
console.log(studentWithoutName);      // 除去name属性的object打印出来  (嵌套了再多层的object也可以)
```





## 3.2 Nested object destructuring

因为destruct的目的是为了getter更简单写法, 所以应该不会在get深层属性的时候使用, 只会用个一两层, 不然get深层属性比getter要麻烦的多

先记这些, 后续有别的疑问再研究

```js
const student = { 
  name: 'Alice', 
  age: 26, 
  courses: [
    {name: 'Introduction to JavaScript', }, 
    {name: 'How to give up JavaScript', }]
};

const {
  name: myName,
  age: myAge,
  // courses: [
  //     {name: course1},
  //     {name: course2}]
  // 和上面等效
  courses: {
    0: {name: course1},
    1: {name: course2}
  }
} = student;
console.log(`${myName}, ${myAge}, I study: \n ${course1} and \n ${course2}`)
```



:bangbang: 需要注意destructing obeject type的成员变量为shallowCopy!

```js
    console.log("-----------检查解构object成员变量是否是shallowCopy-----------")
    // get第二层的object (第一层就是personArr, 它本身就是个object)
    const personArr=[
        {name: "Tom", age: 12, courses:[{name: 'math', mark:90}, {name: 'physics', mark:89}] },
        {name: "Jerry", age: 16, courses:[{name: 'math', mark:100}, {name: 'physics', mark:95}]}
    ]
    const [
        tom,                // tom is a shallowCopy of personArr[0]
        jerry
    ]= personArr
    console.log(tom)        // 注意打印只写tom, 别写别的字符串拼接, 不然显示[object Object]
    console.log(jerry)

    tom.age = 14
    console.log(tom)            // 14
    console.log(personArr)      // 14

    // 想get第三层的object 变量也是可以的, 但是明显写起来会绕了很多
    const [
        {courses: tomCourses},
        {courses: jerryCourses}
    ] = personArr;

    console.log('tom, jerry courses:')
    console.log(tomCourses)
    console.log(jerryCourses)
```







## 3.3 





## 3.4 Destructuring function arguments

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