// Primitives: number, string, boolean
// More complex types: arrays, objects
// function types, parameters

// primitives --------------------------------
let age: number = 12;
age = 2;

let userName: string;

let isInstructor: boolean;
isInstructor = true;

// more complex types -------------------------
let hobbies: string[];
hobbies = ["Sports", "Cooking", "Gaming"];

// let person: any;        // any type is allowed, fallback to js!
let person: {
  name: string;
  age: number;
};
person = {
  name: "Max",
  age: 32,
};
// array + object
let people: {
  name: string;
  age: number;
}[];

// type inference ---------------------------
// ts will infer type by default if you don't specify a type
let course = "React - The Complete Guide";
// course = 1; // ! error: Type 'number' is not assignable to type 'string'

// using Union Types -----------------------
let course2: string | number = "React  Native";
course2 = 1234; // legal

// type alias (TS feature)
type Student = {
  name: string;
  age: number;
};

let mike: Student;
mike = {
  name: "aa",
  age: 12,
};

// function & function types ----------------
function add(a: number, b: number) {
  return a + b; // TS infer return value to be 'number'
}

function print(value: any) {
  // void
  console.log(value);
}

// generics (TS feature) just like in Java
function insertAtBeginning<T>(array: T[], value: T) {
  const newArray = [value, ...array];
  return newArray;
}

const demoArray = [1, 2, 3];
const updateArray = insertAtBeginning(demoArray, -1)        // [-1, 1, 2, 3]
// updateArray[0].split('');       //  ! error: Property 'split' does not exist on type 'number'.

const stringArray = insertAtBeginning(['b','c','d'], 'a')
