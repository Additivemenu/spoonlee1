{
  // type Flatten<T> = T extends any[] ? T[number] : T;  // 传统写法 -> 不太好读
  type Flatten<T> = T extends (infer U)[] ? U : T; //! infer写法

  type T1 = Flatten<number[]>;
  type T2 = Flatten<string[]>;
  type T3 = Flatten<[1, 2, 3, 4]>; // tuple

  const arr = [
    {
      id: 1,
      name: "aaa",
    },
    {
      id: 2,
      name: "bbb",
    },
    {
      id: 3,
      name: "ccc",
    },
  ];

  type T4 = Flatten<typeof arr>;
  /**
   * type T4 = {
    id: number;
    name: string;
}
   * 
   */

  type T5 = Flatten<"hello">; // type T5 = "hello"
}

{
  type Arr1 = ["a", "b", "c"]; // 注意这是tuple type, 不是array value
  type Arr2 = [1, 2, 3];

  // 传统写法 -> 不太好读
  // type First<T extends any[]> = T extends [] ? never : T[0];
  // type First<T extends any[]> = T['length'] extends 0 ? never : T[0];

  // infer 写法
  type First<T extends any[]> = T extends [infer F, ...infer R] ? F : never;
  type Last<T extends any[]> = T extends [...infer R, infer L] ? L : never;

  type F1 = First<Arr1>; // "a"
  type F2 = First<Arr2>; // 1

  type F3 = Last<Arr1>; // "c"
  type F4 = Last<Arr2>; // 3
}

{
  //! 通过infer实现元组两个位置上类型的交换
  type Swap<T extends any[]> = T extends [infer A, ...infer R, infer B]
    ? [B, ...R, A]
    : T;

  type S1 = Swap<[1, 2]>; // [2, 1];
  type S2 = Swap<[1, 2, 3, 4]>; // [4, 2, 3, 1];
}

{
  //! infer function return type
  // https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype

  type GetReturnType<T extends (...args: any[]) => any> = T extends (
    ...args: any[]
  ) => infer R
    ? R
    : never;

  type A = GetReturnType<() => string>; // string
  type B = GetReturnType<(n: number) => void>; // void
  type C = GetReturnType<(n: number) => number>; // number
}
