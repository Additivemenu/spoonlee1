Contents

- [Part1 理解对象](#part1-理解对象)
  - [1.1 属性的类型](#11-属性的类型)
    - [1.1.1 数据属性](#111-数据属性)
      - [Object.defineProperty()](#objectdefineproperty)
    - [1.1.2 访问器属性](#112-访问器属性)
  - [1.2 定义多个属性](#12-定义多个属性)
  - [1.3 读取属性的特性](#13-读取属性的特性)
- [2. 修改或增加已存在的object的某个field](#2-修改或增加已存在的object的某个field)
- [3. 关于object的引用](#3-关于object的引用)
  - [3.1 使用展开: {...obj}来传递object的值](#31-使用展开-obj来传递object的值)
- [Part2 创建对象](#part2-创建对象)
- [Part3 Inheritance](#part3-inheritance)
- [Part4 Class](#part4-class)
  - [create a class](#create-a-class)
  - [static modifier](#static-modifier)


---

学习资料

<<JavaScript高级程序设计>> 第八章

---

[object.js](./object.js)


# Part1 理解对象

ECMA-262将对象定义为一组属性的无序集合. 对象的每个属性或方法都由一个key来标识, 这个key映射到一个value, 可以把ECMAScript的对象想象成一张散列表, 其中的内容就是一组key-value pair, 值可以是数据或者函数. 

+ :star:JS中的object与java中的略有不同 
  + JS中object可以直接创建而不需要instantiate class
  ```js
  // old way: 实例化Object, 再添加属性和方法
  let person = new Object();

  person.name = "Nicholas";
  person.age = 29;
  person.job = "Software Engineer"
  person.sayName = function(){
    console.log(this.name);
  }
  ```

  ```js
  // 使用对象字面量来创建一个object
  let obj = {
      name: "shawn",
      age: 18,
      income: 0,
      arc: {
          a: 222,
          b: 333,
      },
  };
  console.log(obj);
  console.table(obj);
  ```

## 1.1 属性的类型
属性即object的一个key-value pair, 比如person.name是person这个object的一个属性. object的每一个属性都还有特性, 这些特性规定了object的对应属性的行为

### 1.1.1 数据属性
数据属性包含一个保存数据值的位置. 它有4个特性来描述它们的行为, 前3个均为boolean flag, 最后的[\[value]]是一个实际的值.
+ [\[Configurable]]: 表示属性是否可以通过delete来删除并重新定义, 是否可以修改它的特性, 以及是否可以把它改为访问器属性. 默认值为true
+ [\[Enumerable]]:表示属性是否可以通过for-in loop返回. 默认值为true
+ [\[Writable]]: 表示属性是否可以被修改. 默认值为true
+ [\[Value]]: 包含实际的值.值会从这个位置读取, 也会写入到这个位置. 这个特性默认值为undefined



:gem: e.g.1 如下, 我们为person object创建了一个名(key)为name的属性, 并给它赋予了一个值"Nicholas". 这意味着name的[\[value]]特性被设置为了"Nicholas", 之后对这个值得修改都会保存到这个位置. name属性的其他特性默认为true.
```js
let person={
  name: "Nicholas"
};
```

#### Object.defineProperty()
若要修改属性的默认特性, 则必须使用Object.defineProperty()方法. 它有3个argument, 依次是: 1) 要修改的对象; 2) 要修改的属性名; 3) 一个描述符对象
+ 注意在调用Obeject.defineProperty()时, configurable, enumerable和writable的值如果不指定, 则都默认为false. 不过多数情况下可能用不到这个函数

:gem:e.g.2
```js
let person = {};    // person object原本是undefined的

Object.defineProperty(
  person,
  "name",
  {
    writable: false,    // 表示person.name现在只读, 不能修改name对应的value 
    value: "Nicholas"
  });

console.log(person.name);   // "Nicholas"
person.name = "Greg";
console.log(person.name);   // still "Nicholas"
```

### 1.1.2 访问器属性
访问器属性不包含数据值.

访问器属性有4个特性描述它们的行为:
+ [\[Configurable]]: 表示属性是否可以通过delete删除并重新定义, 是否可以修改它的特性, 以及是否可以把它改为数据属性. 默认值为true.
+ [\[Enumerable]]: 表示属性是否可以通过for-in loop返回. 默认为true.
+ [\[Get]]: 获取函数, 在读取属性时调用. 默认为undefined
+ [\[Set]]: 设置函数, 在写入属性时调用. 默认为undefined

同样, 访问器属性不能直接定义, 必须通过Object.defineProperty()来定义.

:gem:e.g.1 注意和java class的accessor method, setter method的区别
```js
let book = {
  year_: 2017,      // 下划线表示我们不希望该属性在对象方法的外部被访问
  edition: 1
};

Object.defineProperty(book, "year", {
  get(){
    return this.year_;
  },
  set(newValue){
    if(newValue > 2017){
      this.year_ = newValue;
      this.edition += newValue - 2017;
    }
  }
});

book.year = 2018;     // 写入新的值
console.log(book.edition);    // 2

console.log(book.year);
```


## 1.2 定义多个属性



## 1.3 读取属性的特性

# 2. 修改或增加已存在的object的某个field

+ 修改
  + 方式一 使用属性定义
    ```js
    obj.income = 0;
    ```
  + 方式二  使用索引定义
    ```js
    obj['name'] = 'Batman';
    ```

> Note:
> JS中没有锁，意味着你可以修改任何obj, 这带来了极大的不安全性（e.g.你手滑了把name打成了names, 这样就不是修改name的值而是添加了一个新元素，引起了很难察觉到的bug）. 因此在修改obj时需要格外谨慎。不过后端语言有锁，不会让你乱改数据导致此类Bug.

+ 添加
  + 和修改一样



# 3. 关于object的引用
同java一样基本数据类型不需要引用, 但对于object类型(Array也算)的数据, JS依然采用引用: 
```js
object2 = object1; 
```
上面赋值语句代表将object1所引用的在内存中实际的object的地址赋给object2, 此时object1与object2同时指向内存中的同一个object. 

## 3.1 使用展开: {...obj}来传递object的值

展开的意思是, 再在内存中创建一个真实的object, 而不是使用引用, 有点像deepCopy, 但还不完全是deepCopy, 因为展开无法作用于嵌套的object, 只能作用于object内的基本数据类型.

> Note:
> {...object1}只是展开一层object1, 如果一个object1内部嵌套了另一个object2, {...object1}则不会展开内部更深层的object2 （JS此时依然使用object2的引用). 此时需要真正的deepCopy了. 老师的GitHub文档>JavaScript>javascript.xmind>数组的拷贝


e.g. 
```js
let person = {
    name: "shawn",
    age: 18,
};

let person3 = { ...person }; // create a deepCopy of person, assign this deepCopy to person3
console.log(person, person3);
person3.age = 100;          // this only change person3.age
console.log(person, person3);

```

![](../Src/JS_Object_DeepCopy1.png)

可见此时person和person3之间没有dependency了, person3.age=100只作用了person3. 

另外要注意到JS中的打印不是按程序执行顺序的打印, 而是反映最终状态的. 如上面结果中, 第一次的console.log(person, person3)显示person3的age也变成了最终状态的100.


# Part2 创建对象




# Part3 Inheritance




# Part4 Class
class相当于模具, object相当于铸件

和java如出一辙

## create a class

```js
// e.g.1 class without constructor: 直接在fields里赋值 
class Car {
  // fields ---------------------------
  wheels = 4;
  seats = 6;

  // methods --------------------------
  drive() {}
  stop() {}
  fill() {}
  pick_up(num) {
    num > this.seats ? console.log("too many") : console.log("ok");
  }
}

const car = new Car();
car.pick_up(10);    // terminal: "too many"

```

```js
// e.g.2 class with constructor
class CircleClass {
  // fields -------------------------------------
  radius = undefined; /* if you don't specify 'undefined', it is still undefined*/

  // constructors -------------------------------
  constructor(radius) {
    /**no arrow function form */
    this.radius = radius;
  }

  // methods ------------------------------------
  draw1() {
    console.log("draw1",radius,this.radius); /**radius is from this obj's radius, which can be changed anytime */
  }
  draw2 = function () {
    console.log("draw2",radius,this.radius); /**radius is from function input, which cannot be changed after calling the function  */
  };
  draw3 = () => {
    console.log("draw3",radius,this.radius); /**this.radius here is undefined because arrow function cannot find this */
  };
}

const circle6 = new CircleClass(6);
circle6.draw1()
circle6.draw2()
circle6.draw3()


```

## static modifier

static modifier可以使得一个class的instance共享一个变量或方法. 因此, static变量或方法的调用只依赖于class而不是instance.
+ only static method can manipulate static fields

```js
class NewClass{
  static total = 100  /**all instances will share this value */

  borrow(){
    NewClass.total-- /**WATCH we are not using this.total */
    console.log(NewClass.total);
  }

  bringBack(){
    NewClass.total++
    console.log(NewClass.total);
  }

  static clean(){
    NewClass.total = 0
    console.log(NewClass.total);
  }

}

const newClass = new NewClass()
const newClass2 = new NewClass()
const newClass3 = new NewClass()
const newClass4 = new NewClass()

newClass.borrow()     // 99
newClass2.borrow()    // 98
newClass3.bringBack() // 99
newClass4.bringBack() // 100

/**WATCH we are not using an instance to call clean */
NewClass.clean()      // 0

```