{
  type A = "12345"; // "1" | "2" | "3" | "4" | "5"

  //! 写死的方式
  // 模板字符串 + infer
  type StringToUnion<S extends string> =
    S extends `${infer One}${infer Two}${infer Three}${infer Four}${infer Five}`
      ? One | Two | Three | Four | Five
      : never;
  type B = StringToUnion<A>; // type B = "1" | "2" | "3" | "4" | "5"

  type NineMantra = "123456789";
  type C = StringToUnion<NineMantra>; // type C = "1" | "2" | "3" | "4" | "56789"

  //! 递归实现
  type StringToUnionRecursion<S extends string> =
    S extends `${infer One}${infer Rest}`
      ? One | StringToUnionRecursion<Rest>
      : never;
  type D = StringToUnionRecursion<NineMantra>; //  type D = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
}

{
  // 将数组中每个元素类型进行翻转
  type A = [1, 2, 3, 4, 5, 6, 7];

  type ReverseArr<T extends any[]> = T extends [infer One, ...infer Rest]
    ? [...ReverseArr<Rest>, One]
    : T;
  type Revered = ReverseArr<A>; // type Revered = [7, 6, 5, 4, 3, 2, 1]
}

{
  //! 上难度
  // 编写类型工具，获取一个字符串字面量类型的长度
  type LengthOfString<
    S extends string,
    T extends string[] = [],
  > = S extends `${infer F}${infer R}`
    ? LengthOfString<R, [...T, F]>
    : T["length"];

  type S = LengthOfString<"12345678">; // type S = 8
}

{
  //! 上难度
  // 编写一个类型工具，实现映射类型的深层级的readonly
  type User = {
    id: number;
    name: string;
    address: {
      province: string;
      city: {
        name: string;
        street: string;
      };
    };
  };

  type ReadonlyUser = Readonly<User>; //! only readonly top level

  type DeepReadonly<T extends Record<string, any>> = T extends any
    ? {
        readonly [K in keyof T]: T[K] extends Record<string, any>
          ? DeepReadonly<T[K]>
          : T[K];
      }
    : never;

  type DeepReadonlyUser = DeepReadonly<User>; //! readonly all level
}
