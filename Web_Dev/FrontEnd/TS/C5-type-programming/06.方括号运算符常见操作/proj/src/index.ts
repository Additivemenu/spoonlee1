type User = {
  readonly id: number;
  name: string;
  tel: string;
  address?: string;
  sex: boolean;
};

{
  // [ ]得到类型某个值的类型
  type DummyValueType = User["id" | "name"]; // type DummyValueType = number | string
  type ValueType = User[keyof User]; //  type ValueType = string | number | boolean | undefined
}

{
  // 泛型
  type MyReadonly<T> = {
    readonly [key in keyof T]: T[key];
  };
}

{
  // 数组
  const arr0 = ["admin", "user", "client"]; // string[]
  type ArrType0 = (typeof arr0)[number]; // string

  // 只读元组
  const arr = ["admin", "user", "client"] as const; // 只读元组
  const arr2 = [1, true, "admin"] as const;

  type ArrType = (typeof arr)[number]; // "admin" | "user" | "client"
  type FirstArrType = (typeof arr2)[0]; // 1
  type LastArrType = (typeof arr)[2]; // "client"
}

{
  const arr = ["admin", "user", "client"] as const; // as const 得到只读元组

  // 获取元组类型的泛型工具
  type ArrType<T extends readonly any[]> = T[number];
  // type A = ArrType<["admin", "user", "client"]>
  type A = ArrType<typeof arr>;   // type A = "admin" | "user" | "client"

  // 获取数组长度 length
  type Len = (typeof arr)["length"];  // type Len = 3, 但如果是arr是number[]的话，Len = number
  let n: Len = 3;
  // 获取数组长度的泛型工具
  type ArrLen<T extends readonly any[]> = T["length"];
  type B = ArrLen<[1, 2, 3, 4, 5, 6]>; //6

  // 泛型 + 扩展运算符... + []
  type Concat<T extends any[], U extends any[]> = [...T, ...U]; // ... 对泛型操作? 
  type Result = Concat<[1, 2], ["a", "b"]>; // [1,2,"a","b"]
}
