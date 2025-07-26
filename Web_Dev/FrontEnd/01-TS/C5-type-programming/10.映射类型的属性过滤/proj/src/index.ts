type User = {
  readonly id: number;
  name: string;
  tel: string;
  address?: string;
};

{
  // as 属性重命名

  type A<T> = {
    [P in keyof T as "aaaa"]: T[P];
  };
  type B = A<User>;
  /**
 * type B = {
    readonly aaaa: string | number | undefined;
}
 */
}

{
  // e.g. 1
  // type MyOmit<T, K> = Pick<T, Exclude<keyof T, K>>;
  // 另一种实现方式: as 属性过滤

  type MyOmit<T, K> = {
    [P in keyof T as P extends K ? never : P]: T[P];
  };

  type OmitUser = MyOmit<User, "tel" | "address">;
  /*
P in keyof T --- "id" | "name | "tel" | "address"
"tel" | "address"

"id" --- "tel" | "address" ? never : "id" ---- "id"
"name" --- "tel" | "address" ? never : "name" ---- "name"
"tel" --- "tel" | "address" ? never : "tel" ---- never
"address" --- "tel" | "address" ? never : "address" ---- never

at last: 
"id" | "name" | never | never --- "id" | "name"
*/
}

{
  // e.g.2
  // as 属性过滤
  type PickStringValueType<T> = {
    [P in keyof T as T[P] extends string ? P : never]: T[P];
  };

  type FilterStringUser = PickStringValueType<User>;

  type PickByType<T, U> = {
    [P in keyof T as T[P] extends U ? P : never]: T[P];
  };

  type PickUserByNumber = PickByType<User, number>;
  type PickUserByString = PickByType<User, string>;
}
