type User = {
  readonly id: number,
  name: string
  tel: string
  address?: string
  sex:boolean
}

// type ValueType = User["id" | "name"];
type ValueType = User[keyof User]

// 泛型
type MyReadonly<T> = {
  readonly [key in keyof T]: T[key];
}

// 数组
const arr = ["admin", "user", "client"] as const;
const arr2 = [1, true, "admin"] as const;

// type ArrType = typeof arr[number]
// type FirstArrType = typeof arr2[0];
// type LastArrType = typeof arr[2];

// 获取元组类型的泛型工具
type ArrType<T extends readonly any[]> = T[number];
// type A = ArrType<["admin", "user", "client"]>
type A = ArrType<typeof arr>

// 获取数组长度 length
type Len = typeof arr['length'];
let n: Len = 3;

// 获取数组长度的泛型工具
type ArrLen<T extends readonly any[]> = T['length'];
type B = ArrLen<[1, 2, 3, 4, 5, 6]>; //6

// 泛型 + 扩展运算符... + []
type Concat<T extends any[], U extends any[]> = [...T, ...U]
type Result = Concat<[1, 2], ["a", "b"]>; // [1,2,"a","b"]