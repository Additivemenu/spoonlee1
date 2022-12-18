# var vs let vs const 0min-24min
+ var p3肯定不会用, const基本无脑用, let看情况用的相对少
  + 因为基本不希望别的程序员中途改动自己定义的变量
+ 但它们的区别面试还是会问

# Arrow function 24min-52min
+ 好在简洁


本质是匿名函数

```js
//命名函数写法
function addOne(number){
    return number+1;
}

//标准的箭头函数写法
const addOne = (number)=>{
    return number+1;
}

//简介写法, 只有一个变量(最好别去掉argument的括号), 函数体若只有1行可以省略return 和 { }
const addOne = (number) => number+1;
```

```js
const add = (a,b)=>a+b;

const getCircleArea = (r)=> 3.14*r*r;
```

```js
// 返回一个object
// 用()包住{}, 告诉编译器里面的{}不是代表代码块
const createProfile = (name, age, title)=>({
    name:name, 
    age: age, 
    title:title})

// 当object属性名和函数argument同名时, ES6语法糖写法:
const createProfile = (name, age, title) => ({name, age, title}) 
```

# object destructing 52min-
从object中extract info, 并赋值给另外的变量
+ 好处在于简洁

```js
const person = {
    firstName: 'john',
    lastName: 'Doe'
}

// when we want to extract property from an object
const fName = person.firstName;
const lName = person.lastName;

// in ES6, more clean way to extract info (equivalent to the 2 lines above)
const {firstName: fName, lastName: lName} = person;
// 如果变量名和property name一样的话
const {firstName, lastName} = person;

```

destructing a null object 
```js
function getPerson(){ return null;}
const{firstName, lastName} = getPerson() || {};     // if left of `||` is true, just pick the left; if left of `||` is false (null & undefined are false), pick the right
console.log(firstName)  // undefined, 空object的属性为undefined
```

nested object destructing
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

destructing function arguments
```js
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

```js
// task: 返回一个独立的,具有age的person object

// 标准写法
function addAgeAttributeToPerson(age, person){
    return{
        firstName: person.firstName,
        lastName: person.lastName,
        age: age
    }
}

// 简洁写法: 用destructing
const addAgeAttributeToPerson = (age, {firstName, lastName})=> ({
    firstName,
    lastName,
    age  
})

// 更简洁写法: 用spread operator; 注意只有1层的Object, spread operator相当于深拷贝
const addAgeAttributeToPerson = (age, person)=> ({...person, age })


```

# JS基础 1h52min-
看到这里