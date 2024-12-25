// 关联泛型
type User = {
  readonly id: number;
  name: string;
  tel: string;
  address?: string;
};

// 比如挑选name和tel属性,形成下面的类型

type UserPick = {
  name: string;
  tel: string;
};

// ! K 关联于T, 和function的参数声明不同 -> function的参数声明是独立的,不关联 -> 其实我感觉主要因为类型编程是声明式的,而函数是命令式的
type MyPick<T, K extends keyof T> = {
  [key in K]: T[key];
};

type PickUser = MyPick<User, "name" | "address">;

let u: PickUser = {
  name: "jack",
  address: "苏州",
};
