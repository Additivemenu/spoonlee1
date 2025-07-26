const temp1: undefined = undefined;
const temp2: null = null;

// 只有在strictNullChecks为false时，才能将null和undefined赋值给其他类型
const temp3: string = null; // error: Type 'null' is not assignable to type 'string'.
const temp4: string = undefined; // error: Type 'undefined' is not assignable to type 'string'.

let temp5: string = null; // error: Type 'null' is not assignable to type 'string'.
let temp6 = null; // type: any, 因为ts类型拓宽

function getStr() {
  // type: string | undefined
  if (Math.random() > 0.5) {
    return "abc";
  }
}

type User = {
  name: string;
  age: number;
};

function getUser(): User {
  // error: Function lacks ending return statement and return type does not include 'undefined'.
  if (Math.random() > 0.5) {
    return {
      name: "Tom",
      age: 18,
    };
  }
}
