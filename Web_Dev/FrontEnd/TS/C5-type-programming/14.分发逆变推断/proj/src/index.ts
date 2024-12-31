{
  // 实现类型工具: 将元组类型转变为交叉类型
  type TupleToInterSection<T extends any[]> = T extends [infer F, ...infer R]
    ? F & TupleToInterSection<R>
    : unknown; // 递归终止条件, 如果写never, any 都不行

  type C = TupleToInterSection<
    [{ id: 1 }, { name: "jack" }, { gender: "male" }]
  >;

  // what we want:
  // { id: 1 } & { name: "jack" } & {gender: "male"}
}

{
  //! 上难度
  // 实现类型工具：将联合类型转变为交叉类型
  // 联合类型的分发式特性 + 函数参数的逆变特性 + infer推断

  // review:
  // 一般情况下，结构化类型遵循的是鸭子类型的协变
  type A = { id: 1; name: "jack" } extends { id: 1 } ? 1 : 2; // type A = 1
  //! 函数的参数遵循逆变
  type B = ((arg: { id: 1 }) => any) extends (arg: {
    id: 1;
    name: "jack";
  }) => any
    ? 1
    : 2; // type B = 1

  // 这是人脑能想出来的?
  type UnionToIntersection<U> =
    // 利用分发特性，将联合类型构建成联合类型的函数
    // {id:1} | {name:"jack"} | {sex:"男"}
    // 变为
    //   (arg: {id:1}) => any
    // | (arg: {name:"jack"}) => any
    // | (arg: {sex:"男"}) => any
    (U extends any ? (arg: U) => any : never) extends (arg: infer P) => any
      ? P
      : never;

  type D = UnionToIntersection<{ id: 1 } | { name: "jack" } | { sex: "男" }>;
  /**
   * 
   * type D = {
    id: 1;
} & {
    name: "jack";
} & {
    sex: "\u7537";
}
   */
}
