// type IsString<T> = T extends string ? 1 : 2;

// type A = IsString<string>;
// type B = IsString<number>;
// type C = IsString<"adc">;
// type D = IsString<123>;

// type E = IsString<"a" | true | 1> // 1 | 2

type MyInclude<T, U> = T extends U ? T : never;
type MyExclude<T, U> = T extends U ? never : T;
// type A = MyInclude<"hello" | "world", string>;

type A = "a" | "b" | "c";
type B = "a" | "b";

// 注意需要满足三个条件才会触发分布式特性
// 1.条件类型
// 2.联合类型
// 3.泛型
// type C = "a" | "b" | "c" extends "a" | "b" ? 1 : 2;
// type C = "a" | "b" | never;

type C = MyInclude<A, B>;
type D = MyExclude<A, B>;
/*
type C = MyInclude<"a", "a" | "b">;  "a"
  | MyInclude<"b", "a" | "b">;  "b"
  | MyInclude<"c", "a" | "b">;  never

type C = "a" | "b" | never;

type D = MyExclude<"a", "a" | "b">;  never
  | MyExclude<"b", "a" | "b">;  never
  | MyExclude<"c", "a" | "b">;  "c"

type D = never | never | "c";
*/

// MyInclude(Extract)  MyExclude(Exclude)

type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
}
// function myOmit(t, k) { 
//   const d = exclude(todo, "title", "completed") // description
//   pick(todo,"description")
// }
type MyOmit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = MyPick<Todo, "title" | "completed">
type TodoPreview2 = MyOmit<Todo, "title" | "completed">

// 编写一个类型工具，把部分键名设置为可选?
type User = {
  id: number,
  name: string,
  age: number,
  tel: string,
  address: string
}

//Omit, Pick, Partial

// function OptionalPick(T, K) { 
//   Partial(Pick(T, K))
//   &
//   Omit(T,K)
// }

// type RequiredPick = Omit<User, "age" | "tel" | "address">;
// type PartialPick = Partial<Pick<User, "age" | "tel" | "address">>
// type OptionalPick = RequiredPick & PartialPick;

type OptionalPick<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// type User2 = OptionalPick<User, "age" | "tel" | "address">;

/*
type User2 = {
  id: number,
  name: string,
  age?: number,
  tel?: string,
  address?: string
}
*/

const u: OptionalPick<User, "age" | "address"> = {
  id: 1,
  name: "jack",
  tel:"121212"
}

//分布式特性还需要注意一个小问题，泛型参数不能被包裹
type ABB<T> = T extends any ? T[] : never;
type ACC<T> = [T] extends any ? T[] : never;

type F = ABB<string | number>
type H = ACC<string | number>