{
  console.log("hello world");

  let my_name = "shawn";
  console.log(my_name);

  var something = "abc"; // no more using var now
  console.log(something);

  let firstName = "shawn",
    lastName = "Li";
  console.log(firstName, lastName);

  firstName = undefined;
  firstName = null;
  console.log(firstName);
}

{
  //data type
  let a = 1;
  console.log(a);

  let b = "this is a b";
  console.log(b);
  let b1 = "this is a b1";
  console.log(b1);
  let b2 = 'he said: "this"';
  console.log(b2);
  let b3 = "he said: 'this'";
  console.log(b3);
  let b4 = `he said: "a",'b'`;
  console.log(b4);
  let b5 = `he said: ${b}`;
  console.log(b5);

  // data type conversion
  let b6 = "he said: " + b;
  console.log(b6);

  let b7 = "he said: " + a;
  console.log(b7);

  let b8 = "1" + a;
  console.log(b8);

  let b9 = +"1" + a;
  console.log(b9);

  let b10 = "" + 1;
  console.log(b10, typeof b10);
  let b11 = +"1";
  console.log(b11, typeof b11);

  /** TODD:
   *
   */
  //boolean
  let c = "0";
  let d = undefined;
  let e = null;

  if (c) {
    console.log("good");
  }

  if (!d) {
    console.log("bad");
  }

  if (!e) {
    console.log("OK");
  }
}

// obj
{
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
  // notice: be careful to use below command
  // it's easy to modify object using wrong name
  obj.income = 50000;
  obj.salary = 30000;
  console.table(obj);
  //
  obj["names"] = "adssqq";
  console.table(obj);
}

{
  let person = {
    name: "shawn",
    age: 18,
  };

  let a = 1;
  let b = a;
  console.log(a, b);
  b = 2;
  console.log(a, b);

  let person2 = person; // don't use it
  console.log(person, person2);

  person2.age = 30; // this will also change person.age
  console.log(person, person2);

  let person3 = { ...person }; // use this if you want to define an instance
  console.log(person, person3);
  person3.age = 100; // this only change person3.age
  console.log(person, person3);

  // multi layer obj--------------------------------------------
  let user = {
    name: "shawn",
    age: 16,
    profile: {
      cv: "http://xxx",
      id: 123123123,
    },
  };
  // multi layer obj copy
  let user2 = { ...user }; // ... only effective for one layer of obj
  user2.name = "peter";
  console.log(user, user2); // only change first layer name of user2

  user2.profile.id = 78787878;
  console.log(user, user2); // change both user, user2 profile.id.
}

{
  let array = [1, 2, 3, "4", true, { name: "shawn" }];
  console.log(array[0]);

  array[0] = "sdufsd";
  console.table(array);

  let array_1 = array;
  array_1[3] = false; // similar to obj, change array_1 will change array
  console.table(array);

  console.log(array.length);
  console.log(array[6]);

  array[100] = 78;
  console.log(array[100]);

  console.log(array.length); // now length of array is 101

  //------what if i want to define obj in an array------------------
  array[100].name = "Shawn";
  console.log(array[100]); // cannot display in console
  console.log(array[100].name); // undefined

  array[101] = {};
  array[101].name = "shawn";
  console.log(array[101]); // now array[101].name displayed
}

{
  // lock variable
  // const password = "kjjk";
  // password = 'aasaaa'
  // const cannot lock inner element of an object

  const obj = {
    name: "fiter",
  };

  obj.name = "asssss11"; // works
  console.log(obj);

  // below not works
  //   obj = {
  //     name: "1aaz",
  //   };
}

//---------------------------------------
{
  let x = 10;
  let y = 3;
  console.log(x + y);
  console.log(x - y);
  console.log(x * y);
  console.log(x / y);
  console.log(x % y);
  console.log(x ** y);
  console.log(Math.sqrt(100));

  console.log(x++); // use first then add
  console.log(x);
  console.log(x--);
  console.log(x);
  console.log(++x); // add first then use
  console.log(x);
  console.log(--x);
  console.log(x);
}

{
  let xx = 10;
  xx++;
  xx = xx + 5;
  xx += 5;
  xx -= 5;
  xx *= 5;
  xx **= 5;
  xx /= 5;
  xx %= 5;

  xx ?? 5; // what is it?
}

{
  let x = 1;
  console.log(x > 1);
  console.log(x >= 1);
  console.log(x < 1);
  console.log(x <= 1);

  console.log((x = 1));
  console.log(x == 1);
  console.log(x === 1);

  //== justify only value, return boolean
  console.log(0 == false);
  console.log(0 != false); // != is opposite to ==
  console.log(true == 1);
  console.log(true == 2); // only 1 can == true

  // === justify type & value
  console.log(0 === false);
  console.log(0 !== false); //!== is opposite to ===
}

//--------triple operator----------------
{
  let pointers = 100;
  if (pointers > 100) {
    console.log("gold");
  } else {
    console.log("silver");
  }

  console.log(pointers > 100 ? "gold" : "silver");
}

//-------------
{
  console.log(true && true);
  let dayTime = 3;
  if (dayTime > 18 && daytime < 24) {
    console.log("night");
  } else {
    console.log("day");
  }

  console.log(false || true);

  if ((dayTime > 18 && dayTime < 24) || (dayTime > 0 && dayTime < 6)) {
    console.log("night");
  } else {
    console.log("day");
  }

  console.log(0 || false);
  console.log(null || false);
  console.log(undefined || false);
  console.log(NaN || false);
  //
  console.log(3 || false);
  console.log(false || 10);
  console.log(4 || 10);

  console.log(true == 2);
  console.log(!2);
}
// ------------JS_lesson2--------------------
{
  const roles = ["student", "teacher", "boss"];

  let role = roles[2];

  switch (role) {
    case roles[0]:
      console.log("hello!");
      break;
    case roles[1]:
      console.log("!!!");
      break;
    case roles[2]:
      console.log("???");
      break;
    default:
      console.log("aaa");
  }
}

("use strict");

{
  let newArrayNumber = [];
  for (let i = 0; i < 10; i++) {
    newArrayNumber[i] = i + 5;
  }
  console.log(newArrayNumber);

  // forEach: manipulation over each
  newArrayNumber.forEach((num, index) => {
    // index starts from 0
    console.log("1:", num, index);
  });

  // identical to the above--------------------
  for (let i = 0; i < newArrayNumber.length; i++) {
    console.log("2:", newArrayNumber[i]);
  }
}

//=========function============================
{
  function func1() {
    console.log("hello world");
  }

  func1();

  function func2(info) {
    console.log(`${info} juice`); // ${} extract str
  }

  func2("orange");
  func2("apple");

  //unknown input number
  function func4(array) {
    let cum = 0;

    array.forEach((num) => {
      cum += num;
    });
    console.log(cum);
  }

  func4([1, 2, 3, 4, 5, 6]); // input has to be an array

  //unkown input number
  function func4_1(a, b, ...rest) {
    let cum = a + b;
    rest.forEach((num) => {
      cum += num;
    });
    console.log(cum);
  }

  func4_1(1, 2, 3, 4, 5, 6); // input is not an array
  func4_1(...[1, 2, 3, 4, 5, 6]); // expand the array

  // return
  let cum = func5(1, 2);
  console.log(cum);
  function func5(a, b) {
    return a + b; // skip over what is behind return
  }

  //obj as input parameter--------------------
  const obj = {
    // const only confines type of obj, cannot confine its content
    name: "Shawn",
    age: 18,
  };

  function func6(obj) {
    console.log("name:", obj.name);
    console.log("age:", obj.age);

    obj.name = "xueshuo";
    obj.age = 30;
  }

  func6(obj);
  console.log(obj);
  //---------------------------------
  // function func6(obj) there is only 1 entrance
  // but there are two 'exit'
  // return: 出口之一，特点是产生新内容,同时不更改原始数据
  // 复杂结构的传参: 出口之一, 特点是可以获得内容修改, 缺点是更改了原始的数据。
  //---------------------------------

  function func7({ name, age }) {
    // instead of usinng an obj as input parameter
    // here we use elements of an obj as the input
    // this will create a new, real obj, 没有使用"指针"引用
    // 这种方式函数只能通过return来向外传递数据, 与func6相对
    name = "shawn";
    age = "20";
    return { name, age };
  }

  const newObj = func7(obj);
  console.log(newObj);
  console.log(obj);

  //--------------------------
  const func8 = function () {
    console.log("func8");
  };
  func8();

  const arrow_func1 = () => {
    console.log("array_func1");
  };

  const array = [1, 2, 3, 4, 5];
  const array_func4 = (num) => {
    console.log(num);
  };

  array.forEach(array_func4);
}

//------define a function for obj----------------
{
  /**type1: */
  const radius = 1;
  const location = { x: 1, y: 2 };
  const isVisible = true;
  const draw = function () {
    console.log("draw");
  };
  draw();

  /**type2: */
  const circle = {
    //notive it only confine the type of cirle, not its content
    radius: 1,
    location: {
      x: 1,
      y: 2,
    },
    isVisible: true,

    draw1() {
      console.log("draw1");
    },

    draw2() {
      console.log("draw2");
    },
  };

  circle.draw1();
  circle.draw2();
}

{
  /**type3: hybrid */
  const radius = 1;
  const location = { x: 1, y: 2 };
  const isVisible = true;
  const draw = function () {
    console.log("draw----");
  };

  const circle2 = {
    radius,
    location,
    isVisible,
    draw,
  };

  circle2.draw();

  /**JS lesson3 2h29min-*/
  function createCircle(radius) {
    return {
      radius,
      draw1() {
        console.log(
          "draw1",
          radius,
          this.radius
        ); /**radius is from this obj's radius, which can be changed anytime */
      },
      draw2: function () {
        console.log(
          "draw2",
          radius,
          this.radius
        ); /**radius is from function input, which cannot be changed after calling the function  */
      },
      draw3: () => {
        console.log(
          "draw3",
          radius,
          this.radius
        ); /**this.radius here is undefined because arrow function cannot find this */
      },
    };
  }

  const circle4 = createCircle(5);
  circle4.radius = 2;
  console.log(circle4);
  circle4.draw1();
  circle4.draw2();
  circle4.draw3();

  const obj = {
    a: 2,
    b: 3,
    change: function () {
      a = 20;
      this.b = 30;
    },
  };

  obj.change();
  console.log(obj);

  function Circle5(radius) {
    this.radius = radius;
    this.draw1 = function () {
      console.log("draw1", this.radius);
    };
    this.draw2 = () => {
      console.log("draw2", this.radius);
    };
  }

  const circle5 = new Circle5(4);
  console.log(circle5);
  circle5.draw1();
  circle5.draw2();

  /**class------------------------- */
  class Car {
    wheels = 4;
    seats = 6;
    drive() {}
    stop() {}
    fill() {}
    pick(num) {
      num > this.seats ? console.log("too many") : console.log("ok");
    }
  }

  const car = new Car();
  car.pick(10);
}

//=====JS lesson2: use JS to control HTML & CSS==================================
{
  // get a single node
  const content = document.querySelector(".content");
  content.innerHTML = "Hahahahahahah";
  console.log(content);
  // get multiple nodes
  const contents = document.querySelectorAll(".content");
  console.log(contents);

  contents.forEach((node, index) => {
    node.innerHTML = `content ${index}`;
  });
  //
  // document.getElementById()
  //document.getElementsByClassName()

  // create element---
  const div = document.createElement("div");
  div.innerHTML = "<h1>click me</h1>";
  // append span onto a node---
  //contents[contents.length - 1].append(div)
  //contents[contents.length - 1].appendChild(div)

  const domBody = document.querySelector("body"); // note there is no '.' in front of body
  domBody.appendChild(div);
  // append over CSS: add a style to span we just added using JS
  div.classList.add("active"); // note there is no '.' in front of active
  div.classList.remove("active");
  div.classList.toggle("active"); //toogle: switch

  div.setAttribute("style", "cursor:pointer"); //

  div.addEventListener("click", () => {
    // define click event
    div.classList.toggle("active");
  });
}

//===========practice===========================
// {
//   console.log("aaaaaaaaaaaa");
//   // practice: output a multiplication table-----------------------
//   for (let i = 1; i < 10; i++) {
//     for (let j = 1; j < i + 1; j++) {
//       console.log(`${i}*${j}=${i * j}`);
//     }
//   }
// }
//----------------------------------------------------------------

// practice: output a multiplication table-----------------------
// {
//   let str = "";

//   for (let i = 1; i < 10; i++) {
//     for (let j = 1; j <= i; j++) {
//       // console.log(i, j);
//       str += `${i}*${j}=${i * j} `;

//       if (i == j) {
//         str += "\n";
//       }
//     }
//   }

//   console.log(str);
// }
//----------------------------------------------------------------
