// type IsString<T> = T extends string ? true : false
// type A = IsString<string>; // true
// type B = IsString<number>; // false
// type C = IsString<"abc">; // true
// type D = IsString<123>; // false

// 实现一个IF类型工具，接受条件，如果条件为真（条件只能是true或者false类型）
// 就返回类型T，否则就返回类型F

// type IF<C extends boolean, T, F> = C extends true ? T : F;

// type A = IF<true, "a", "b">; // a
// type B = IF<false, "a", "b">; // b
// type C = IF<true, number, string>; // number


// type Result = { a: string, b: boolean } extends { a: string } ? true : false;

// type ObjLength = {
//   length: number
// }

// function getObj<T extends ObjLength>(obj: T) { 
//   // todos...
//   return obj;
// }

// getObj("hello world");
// // getObj(123); // error
// getObj([1, 2, 3]);
// getObj({ a: "hello world", length: 1 });

// // type Message<T extends { message: unknown }> = T['message'];
// // type A = "a" | "b" | never | "c";

// type Message<T> = T extends {message:unknown} ? T['message'] : never;

// const person = {
//   id: 1,
//   // message:"hello"
// }

// type PersonMessage = Message<typeof person>;


// 写一个类型工具，提取具体的类型
// type Flatten<T> = T extends any[] ? T[number] : T;

// type Str = Flatten<string[]>;
// type Num = Flatten<number[]>;
// type Tup = Flatten<[1, 2, 3, 4]>;

// const arr = [
//   {
//     id: 1, name: "aaa"
//   },
//   {
//     id: 2, name: "bbb"
//   },
//   {
//     id: 3, name: "ccc"
//   },
// ];

// type Arr = Flatten<typeof arr>

// 条件类型的嵌套
// type GetType<T> = T extends string ? "string"
//   : T extends number ? "number"
//   : T extends bigint ? "bigint"
//   : T extends boolean ? "boolean"
//   : T extends symbol ? "symbol"
//   : T extends undefined ? "undefined"
//   : T extends null ? "null"
//   : T extends any[] ? "array"
//   : T extends Function ? "function"
//   : "object";

// type T0 = GetType<string>;
// type T1 = GetType<123n>;
// type T2 = GetType<true>;
// type T3 = GetType<() => void>;
// type T4 = GetType<[]>;
// type T5 = GetType<{}>;
// type T6 = GetType<null>;

// 实现类型工具Merge
// 将两个类型合并为一个类型，第二个类型的键会覆盖第一个类型的键
type Foo = {
  name: string
  age: string
}

type Bar = {
  age: number
  sex: string
}

// 联合类型会自动的去除重复
// type A = 1 | 2 | 2 | 3 | 4 | 3;
type Merge<F, S> = {
  // 遍历所有的key，联合类型会自动的去除重复
  [P in keyof F | keyof S]: P extends keyof S
  ? S[P] //直接获取后者的值的类型，保证后者类型覆盖前者
  : P extends keyof F // 如果说是前者类型
  ? F[P]
  : never
}

type Result = Merge<Foo, Bar>;
// type Result = {
//   name: string
//   age: number
//   sex: string
// }