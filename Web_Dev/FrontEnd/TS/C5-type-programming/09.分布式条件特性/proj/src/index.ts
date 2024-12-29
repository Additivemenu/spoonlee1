{
  type IsString<T> = T extends string ? 1 : 2;

  type A = IsString<string>; // 1
  type B = IsString<number>; // 2
  type C = IsString<"adc">; // 1
  type D = IsString<123>; // 2

  type E = IsString<"a" | true | 1>; // 1 | 2   触发分布式特性
}

{
  // ts utility types: Extract, Exclude
  // https://www.typescriptlang.org/docs/handbook/utility-types.html#extracttype-union
  // https://www.typescriptlang.org/docs/handbook/utility-types.html#excludeuniontype-excludedmembers

  type MyInclude<T, U> = T extends U ? T : never;
  type MyExclude<T, U> = T extends U ? never : T;
  type A0 = MyInclude<"hello" | "world", string>; // "hello" | "world"  触发分布式特性

  type A = "a" | "b" | "c";
  type B = "a" | "b";

  // ! 注意需要同时满足三个条件才会触发分布式特性
  // 1.条件类型
  // 2.联合类型
  // 3.泛型
  type C0 = "a" | "b" | "c" extends "a" | "b" ? 1 : 2; //! 2 , 未触发分布式特性(即直接比较兼容性), 联合类型兼容性: 更具体的类型相当于子类
  type C00 = "a" | "b" | never; // "a" | "b"

  type C = MyInclude<A, B>; //! "a" | "b", 触发分布式特性: 逐个比较 再取联合类型 "a" | "b" | never => "a" | "b"
  type D = MyExclude<A, B>; //!  "c", 触发分布式特性: 逐个比较 再取联合类型 never | never | "c" => "c"

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
}

{
  //! 上难度: 实现Pick与Omit
  // https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys
  // https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys

  type MyPick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  // function myOmit(t, k) {
  //   const d = exclude(todo, "title", "completed") // description
  //   pick(todo,"description")
  // }
  type MyOmit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

  interface Todo {
    title: string;
    description: string;
    completed: boolean;
  }

  type TodoPreview = MyPick<Todo, "title" | "completed">;
  type TodoPreview2 = MyOmit<Todo, "title" | "completed">;
}

{
  // 编写一个类型工具，把部分键名设置为可选?
  type User = {
    id: number;
    name: string;
    age: number;
    tel: string;
    address: string;
  };

  /*
desired outcome: 

type User2 = OptionalPick<User, "age" | "tel" | "address">;
type User2 = {
  id: number,
  name: string,
  age?: number,
  tel?: string,
  address?: string
}
*/

  //Omit, Pick, Partial

  // pseudo code:
  // function OptionalPick(T, K) {
  //   Partial(Pick(T, K))
  //   &
  //   Omit(T,K)
  // }
  type RequiredPick0 = Omit<User, "age" | "tel" | "address">;
  type PartialPick0 = Partial<Pick<User, "age" | "tel" | "address">>;
  type OptionalPick0 = RequiredPick0 & PartialPick0;

  // 泛型化
  type OptionalPick<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

  const u: OptionalPick<User, "age" | "address"> = {
    id: 1,
    name: "jack",
    tel: "121212",
  };

  //分布式特性还需要注意一个小问题，泛型参数不能被包裹
  type ABB<T> = T extends any ? T[] : never;
  type ACC<T> = [T] extends any ? T[] : never;

  type F = ABB<string | number>; // string[] | number[] 触发分布式特性
  type H = ACC<string | number>; //  (string | number)[]  未触发分布式特性
}
