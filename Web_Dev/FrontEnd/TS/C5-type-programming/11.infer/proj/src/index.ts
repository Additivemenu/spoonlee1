// type Flatten<T> = T extends any[] ? T[number] : T;
type Flatten<T> = T extends (infer U)[] ? U : T;

type T1 = Flatten<number[]>;
type T2 = Flatten<string[]>;
type T3 = Flatten<[1, 2, 3, 4]>;

const arr = [
  {
    id:1, name:"aaa"
  },
  {
    id:2, name:"bbb"
  },
  {
    id:3, name:"ccc"
  },
]

type T4 = Flatten<typeof arr>;
type T5 = Flatten<"hello">;

type Arr1 = ["a", "b", "c"];
type Arr2 = [1, 2, 3];

// type First<T extends any[]> = T extends [] ? never : T[0];
// type First<T extends any[]> = T['length'] extends 0 ? never : T[0];
type First<T extends any[]> = T extends [infer F, ...infer R] ? F : never
type Last<T extends any[]> = T extends [...infer R, infer L] ? L : never

type F1 = First<Arr1>;  // "a"
type F2 = First<Arr2>;  // 1

type F3 = Last<Arr1>;  // "c"
type F4 = Last<Arr2>;  // 3

// 通过infer实现元组两个位置上类型的交换
type Swap<T extends any[]> = T extends [infer A, ...infer R, infer B] ? [B, ...R, A] : T;

type S1 = Swap<[1, 2]>; // [2, 1];
type S2 = Swap<[1, 2, 3, 4]>; // 不满足两个位置的元组，直接返回T;

type GetReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : never;

type A = GetReturnType<() => string>;
type B = GetReturnType<(n:number) => void>;
type C = GetReturnType<(n:number) => number>;