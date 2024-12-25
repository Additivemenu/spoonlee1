// type A = "12345"; // "1" | "2" | "3" | "4" | "5"

// type StringToUnion<S extends string> = S extends
//   `${infer One}${infer Two}${infer Three}${infer Four}${infer Five}`
//   ? One | Two | Three | Four | Five
//   : never

// type B = StringToUnion<A>;


// type NineMantra = "临兵斗者皆阵列前行";
// type StringToUnion<S extends string> = S extends
//   `${infer One}${infer Rest}`
//   ? One | StringToUnion<Rest>
//   : never
 
//   // 临  兵  斗  者  皆   阵  列  前  行
// type B = StringToUnion<NineMantra>;


// 将数组中每个元素类型进行翻转

type A = [1, 2, 3, 4, 5, 6, 7];

type ReverseArr<T extends any[]> = 
  T extends [infer One, ...infer Rest]
  ? [...ReverseArr<Rest>, One]
  : T
type Revered = ReverseArr<A>;

// 编写类型工具，获取一个字符串字面量类型的长度
type LengthOfString<S extends string, T extends string[] = []> =
  S extends `${infer F}${infer R}`
  ? LengthOfString<R, [...T, F]>
  : T['length'];

type S = LengthOfString<"12345678">;

// 编写一个类型工具，实现映射类型的深层级的readonly
type User = {
  id: number;
  name: string;
  address: {
    province: string;
    city: {
      name: string;
      street: string
    }
  }
}

// type ReadonlyUser = Readonly<User>;

type DeepReadonly<T extends Record<string, any>> = 
  T extends any ?
  {
    readonly[K in keyof T]: T[K] extends Record<string, any> ? DeepReadonly<T[K]> : T[K]
  }
  : never


type ReadonlyUser = DeepReadonly<User>;