Contents

- [Part1 理解对象](#part1-理解对象)
      - [Object.defineProperty()](#objectdefineproperty)
  - [1.2 定义多个属性](#12-定义多个属性)
  - [1.3 读取属性的特性](#13-读取属性的特性)
  - [1.4 合并对象](#14-合并对象)
  - [1.5 对象标识及相等判定](#15-对象标识及相等判定)
  - [1.6 增强的对象语法](#16-增强的对象语法)
  - [1.7 对象解构](#17-对象解构)
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

> 重点:
> + object的属性, 属性的特性(包括属性的get(), set()函数)
> + `Object.assign()` API 的原理
> + Object增强语法: 简写属性名, 动态属性名, 简写方法名

ECMA-262将对象定义为一组属性的无序集合. 对象的每个属性或方法都由一个key来标识, 这个key映射到一个value, 可以把ECMAScript的对象想象成一张散列表, 其中的内容就是一组key-value pair, 值可以是数据或者函数. 

+ :star:JS中的object与java中的略有不同 
  + JS中object可以直接创建而不需要非得instantiate class, 有以下3种方式:
    ```js
    // 方式1 old way: 实例化Object, 再添加属性和方法
    let person = new Object();

    person.name = "Nicholas";
    person.age = 29;
    person.job = "Software Engineer"

    person.sayName = function(){
      console.log(this.name);
    }
    ```

    ```js
    // 方式2: 使用对象字面量来创建一个object(最常用)
    // 此时对象的属性的configurable, enumerable, writable默认是true
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

    ```JS
    // 方式3: 采用Object.defineProperties()来为undefined object定义多个属性
    // 由于使用了Object.defineProperties(), 注意此时数据属性的configurable, enumerable,writable的值默认是false
    let book = {};

    Object.defineProperties(book, {
      ...
    })
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
+ :star:[\[Get]]: 获取函数, 在读取属性时调用. 默认为undefined
+ :star:[\[Set]]: 设置函数, 在写入属性时调用. 默认为undefined

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
ECMAScript提供`Object.defineProperties()`来一次性为object定义多个属性. 它有两个argument: 1)想要操作的object名; 2) 一个描述符对象


:gem: e.g.1 如下, 在book对象上定义了两个数据属性, 一个访问器属性. 注意数据属性的configurable, enumerable和writable的值在这里都是false.

```JS
  // 采用Object.defineProperties()来为undefined object定义多个属性
  let book = {};

  Object.defineProperties(book, {

    year_:{     // 数据属性 ----------------
      value: 2017
    },

    edition：{  // 数据属性 ---------------
      value: 1
    },

    year:{      // 访问器属性 -------------
      get(){
        return this.year_;
      },
      set(newValue){
        if(newValue > 2017){
          this.year_ = newValue;
          this.edition += newValue-2017; 
        }
      }
    }

  })
  ```



## 1.3 读取属性的特性
使用`Object.getOwnPropertyDescriptor()`方法可以取得指定属性的属性描述符. 它接收两个argument: 1) 属性所在的对象; 2) 要取得其描述符的属性名.

略





## 1.4 合并对象
合并(merge)对象: 把源对象所有的本地属性一起复制(copy)到目标对象上.

`Object.assign()`方法实现对象合并. 它接收1)一个目标对象;  2)一个或多个源对象 作为参数,  这个API有以下的行为:
+ 将每个源对象中可枚举(Object.propertyIsEnumerable()返回true)和自由(Object.hasOwnProperty()返回true)属性复制到目标对象. 
  + Object.assign()既修改目标对象, 同时也返回修改后的目标对象 (见下e.g.) 
+ 以字符串和符号为key的属性会被复制. 
+ **该API原理: 对每个符合条件的属性, 这个方法会先使用源对象上的[\[Get]]取得属性的值, 然后使用目标对象上的[\[Set]]设置属性的值.** (见下e.g.) 

:gem:[e.g.1 Object.assign()](./ObjectAssign.js)

+ Object.assign()实际上对每个源对象**的属性**执行的是**shadowCopy**. 即将src object**的属性的引用**赋给dest object的对应属性, 但注意dest和src本身的引用可不同(因为dest, src是我们提前声明好的Object, 然后才用dest, src参与Object.assign())
  + 如果多个源对象都有相同的属性, 则使用最后一个复制的值. 原因见该API的原理.
  + 此外, 从源对象访问器属性取得的值, 比如获取函数, 会作为一个静态值赋给目标对象. 换句话说, 不能在两个对象间转移get函数和set函数.

:gem: [e.g.2 Object.assign() 覆盖属性和属性引用](./ObjectAssign2.js)

+ 注意`Object.assign()`没有"rollback"的概念. 如果赋值期间出现错误, 则操作会终止, 退出并抛出错误. dest object中已经被赋值的属性会被保留, Object.assign()不会保留assign之前的值.


## 1.5 对象标识及相等判定

在ECMAScript6之前, 有些特殊情况即使是===也无能为力:
```js
// 这些===结果是对的
console.log(true === 1);  // false
console.log({} === {});   // false
console.log("2" === 2);   // false

// 这些===结果是错的
console.log(+0 === -0) ;  // true
console.log(+0 === 0);    // true 
console.log(-0 === 0);    // true

// 要确定NaN的相等性, 必须用isNaN()
console.log(NaN === NaN);   // false
console.log(isNaN(NaN));    // true
```


ECMAScript6 规范新增了Object.is(), 这个方法和===很像, 但同时也考虑到了上述边界情形. 

```js
console.log(Object.is(true, 1));  // false
console.log(Object.is({}, {}));   // false
console.log(Object.is("2",2));    // false

// 正确的0, -0, +0 相等/不等判定
console.log(Object.is(+0, -0));   // false
console.log(Object.is(+0, 0));    // true
console.log(Object.is(-0, 0));    // false

// 正确的NaN相等判定
console.log(Object.is(NaN, NaN)); //  true
```


## 1.6 :moon:增强的对象语法
ECMAScript6新增了很多语法糖特性, 来使得定义和操作对象更为方便.

### 1.6.1 属性值简写
```js
let name = 'matt';
let person = {
  name: name      // *******************
};
console.log(person);    // {name: 'Matt' }

// 以下和上面等效 ---------------------
// 属性名和变量名相同的情况简写:
let name = 'Matt';
let person = {
  name           // ********************
};
console.log(person);    // {name: 'Matt' }
```

```js
// 属性名和变量名相同的情况简写:
function makePerson(name){
  return {
    name
  };
}

let person = makePerson('Matt');

console.log(person.name);     // Matt
```

### 1.6.2 :moon:可计算属性(动态属性名)
如果想要使用变量的值作为属性名, 那么必须先声明对象, 然后使用中括号语法来添加属性. 换句话说, 不能直接在对象字面量中直接动态命名属性.

```js
// 即把对象字面量中的属性名换成[计算表达式], 即可实现动态属性名
function getUniqueKey(key){
    return `${key}`;
}

let nameKey = "name";
let obj = {
  [getUniqueKey(nameKey)]: 'shawn'
}
```

:gem: [e.g. 动态属性名](./computableProperty.js)

+ 注意, 如果计算属性的表达式抛出错误, 那么之前完成的计算是不能rollback的.

### 1.6.3 简写方法名
看至此处




## 1.7 对象解构


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