/**
 *  ============================================================================
 * Object.keys(): return the key of an object in an array
 */
console.log("======================Object.keys()========================");
let profile = {
  name: "Rober Dw. Jr",
  age: 45,
  work: "Actor",
};

// get the key of profile object, return them in an array
console.log(Object.keys(profile));

let str = "abc";
console.log(Object.keys(str)); // get the index

let arr = ["a", "b", "c"];
console.log(Object.keys(arr)); // get the index

// ===================================================================================
let myObj = {
  make: "Ferrari",
  model: "Portofino",
  fuel: "Petrol",
  year: 2018,
};

// get the number of keys of myObj: first return keys in an array
let len = Object.keys(myObj).length;
console.log(len);
console.log(Object.keys(myObj)); // ['make', 'model', 'fuel', 'year']

// ----------------------------
// if key is number, return keys in a sorted array
let obj = {
  200: "a",
  19: "b",
  89: "c",
};
console.log(Object.keys(obj)); // ['19', '89', '200']

/**
 * ========================================================================================
 * Object.values(): return value of an object in an array
 */
console.log(`===============Object.values()=======================`);
const person = {
  firstName: "John",
  lastName: "Doe",
  age: 25,
};

// approach 1: for in + .hasOwnProperty()
let values1 = [];
for (const key in person) {
  if (person.hasOwnProperty(key)) {
    values1.push(person[key]); // push value (person[key]) into values1
  }
  // values1.push(person[key])
}
console.log(values1);

// approach 2: Object.values()
const values2 = Object.values(person);
console.log(values2);

/**
 * ===========================================================================
 * Object.entries()
 */

const obj1 = {
  name: "ben",
  age: 26,
};

console.log(Object.entries(obj));

/**
 * ============================================================================
 * Object.assign(destObj, srcObj): shallow copy (only 1 layer) srcObj into destObj
 * property with the same key name will cover destObj's corresponding key's value
 */
const obj2 = {
  name: "ben",
  age: 26,
};
const newObj = Object.assign({}, obj2);
console.log(newObj);

const objj1 = { first: 1 };
const objj2 = { second: 2 };
const objj3 = { third: 3 };

const newObjj = Object.assign({}, objj1, objj2, objj3);
console.log(newObjj);

{
  const obj = { some: "value" };
  const newObj = Object.assign(obj, { other: "value2" });
  console.log(newObj);
}

/**
 * spread operator
 */
{
  const obj1 = { a: 1, b: 2 };
  const obj2 = { c: 3, d: 4 };

  const newObj = { ...obj1, ...obj2 };
  console.log(newObj);
}

/**
 * Object.freeze(): freeze an object, it will not be changeable, add or delete property (elements) later on
 * note: Object.freeze() is a shallow freeze, only apply to 1 layer
 */
{
  let obj = { name: "ben", age: 22 };
  Object.freeze(obj);

  obj.name = "Chris";
  console.log(obj); // {name: 'ben', age: 22}, can not change property

  obj.gender = "male";
  console.log(obj); // {name: 'ben', age: 22}, can not add new property

  //----------------------
  let arr = [1, 2];
  Object.freeze(arr);
  arr[0] = 3;
  console.log(arr); // [1, 2], can not change propery

  // Object.freeze() is a shallow freeze, only freeze 1 layer
  let parent_obj = { name: "ben", sub_obj: { b: 1 } };
  Object.freeze(parent_obj);
  parent_obj.sub_obj.b = 2          
  console.log(parent_obj)            
  
}

/**
 * Object.seal(): cannot add or delete, but change is allowed
 * Note: Object.seal() is also shallow seal, only apply to 1 layer
 */
{
    console.log("seal")

    let obj = { name: "ben", age: 22 };
    Object.seal(obj);

    obj.gender = "male"
    console.log(obj)

    obj.age = 25
    console.log(obj)

}

