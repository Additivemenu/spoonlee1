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
  let b1 = "this is a b1";
  let b2 = 'he said: "this"';
  let b3 = "he said: 'this'";
  let b4 = `he said: "a",'b'`;
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

  /**
   * TODD
   */
  //boolean
  let c = "0";
  let d = undefined;
  let e = null;

  if (c) {
    console.log("good");
  } else if (d) {
    console.log("bad");
  } else if (e) {
    console.log("OK");
  } else {
  }
}

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
  console.log(array[1]);

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
  console.log(array[100]);
  console.log(array[100].name); // undefined

  array[101] = {};
  array[101].name = "shawn";
  console.log(array[101]); // now array[101].name displayed
}

{
  // lock variable
  const password = "kjjk";

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

  console.log(pointers > 100 ? "gold" : "siver");
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
  console.log(false||10);
  console.log(4||10);
}
