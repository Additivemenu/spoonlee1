{
  let a = [1, 2, 3];
  a.push(4);
  // a.push("a"); //error

  var b = ["a", "b"];
  const c: boolean[] = [true, false];

  const d: string[] = ["a", "b"];
  d.unshift("c");

  // 兼容不同类型的数组 -> 工程上不推荐这样做
  let e = [1, "a"]; // type: (number | string)[]
  const f: (number | string)[] = [2, "b"]; // type: (number | string)[]
  f.push(3);
  // f.push(true); //error

  let g = [1, "a"];
  g.map((item) => {
    if (typeof item === "number") {
      return item * 2;
    }
    return item.toUpperCase();
  });

  type User = {
    name: string;
    age: number;
  };
  const users: User[] = [];
}

{
  const arr = []; // ! type: any[]
  arr.push(1);
  arr.push("a");
  console.log(arr); // arr type: (string | number)[]

  // 如果any类型的数组, 在函数中有赋值了具体的类型, 那么出了函数作用域之后, 就不会被扩展为any[]类型
  function fn() {
    // return type: (string | number)[]
    const arr = [];
    arr.push(1);
    arr.push("a");
    return arr;
  }
  const arr2 = fn();
  //arr2.push(true); // error
}

{
  // readonly -> ts feature; js 没这个东西
  const arr3: readonly number[] = [1, 2, 3];
  // 改变数组的方法都会报错:
  arr3.push("4"); // error: Property 'push' does not exist on type 'readonly number[]'
  arr3[2] = 4; // error: Index signature in type 'readonly number[]' only permits reading.
  arr3.splice(1, 1); // error: Property 'splice' does not exist on type 'readonly number[]'

  // 但非改变数组的方法不会报错:
  const myArr1 = arr3.concat(4);
  console.log(myArr1); // [1, 2, 3, 4]

  const myArr2 = arr3.filter((item) => item > 2);
  console.log(myArr2); // [3]

  const myArr3 = arr3.slice(0, 2);
  console.log(myArr3); // [1, 2]
}

{
  // 可以是number数组，可以是string，也可以是number和string类型混合的数组
  type ArrType1 = (number | string)[];
  // 要么是number类型，要么是string类型
  type ArrType2 = number[] | string[];

  const arr1: ArrType1 = ["a", "b", "c"];
  const arr2: ArrType2 = [1, 2, 3];
  // const arr3: ArrType2 = [1, "a", 3]; // error
  const arr4: ArrType1 = [1, "a", 3];
}

{
  // tuple
  const pointer1: number[] = [10, 20];
  const pointer2: [number, number] = [20, 30];

  // named tuple
  const pointer3: readonly [x: number, y: number] = [10, 20];
  const user: [name: string, age: number, gender: "male" | "female"] = [
    "a",
    20,
    "male",
  ];

  // tuple存在的问题
  // 虽然不能通过index添加新的元素，但是可以通过push添加新的元素
  pointer2[2] = 40; // error
  pointer2.push(40);
}
