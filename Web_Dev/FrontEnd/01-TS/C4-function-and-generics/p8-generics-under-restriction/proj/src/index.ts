{
  // 注意这里是小写的object, 不是Object (装箱类型)
  function getObj<T extends object>(obj: T) {
    return obj;
  }
  // getObj("hello"); // ! error: Argument of type 'string' is not assignable to parameter of type 'object'.
  // getObj(123); // ! error: Argument of type 'number' is not assignable to parameter of type 'object'.
  getObj({ id: 1, name: "aaa" });
}

{
  type ObjLength = {
    length: number;
  };

  // T extends ObjLength 表示 T 必须包含 ObjLength 的所有属性, 这就为泛型进一步添加了限制
  function getObjLength<T extends ObjLength>(obj: T) {
    return obj;
  }

  getObjLength({ id: 1, name: "aaa", length: 2 });
  getObjLength("aaa");
  getObjLength([1, 2, 3, 4, 5]);
  // getObjLength({ id: 1, name: "aaa" }); //! error
}

{
  // 多泛型
  type ObjLength = {
    length: number;
  };

  // 比较长度
  // a > b  大于0
  // a < b  小于0
  // a = b  等于0
  function compareLength<T extends ObjLength, U extends ObjLength>(a: T, b: U) {
    return a.length - b.length;
  }

  const result = compareLength([1, 2, 3, 4, 5], "abc");
  console.log(result);
}

{
  type TreeNode = {
    value: string;
  };
  type LeafNode = TreeNode & {
    isLeaf: true;
  };
  type InnerNode = TreeNode & {
    children: TreeNode[];
  };
  const a: TreeNode = { value: "a" };
  const b: LeafNode = { value: "b", isLeaf: true };
  const c: LeafNode = { value: "c", isLeaf: true };
  const d: InnerNode = { value: "e", children: [b, c] };

  function mapNode<T extends TreeNode>(
    node: T,
    f: (value: string) => string,
  ): T {
    // ! 这里的T受到限制, 他一定是TreeNode的类型, 所以必然有value属性

    return {
      ...node,
      value: f(node.value),
    };
  }

  const a1 = mapNode(a, (v) => v.toUpperCase());
  const b1 = mapNode(b, (v) => v.toUpperCase());
  const c1 = mapNode(c, (v) => v.toUpperCase());
  const d1 = mapNode(d, (v) => v.toUpperCase());

  console.log(a1);
  console.log(b1);
  console.log(c1);
  console.log(d1);
}

{
  // review: [] operator
  type User = {
    id: number;
    name: string;
    gender: "male" | "female";
  };
  type A = User["gender"];

  // [] operator + extends => extract field type from object
  type Message<T extends { message: unknown }> = T["message"]; // ! 你要使用T的message属性, 前提是T必须有message属性, 可以用extends来限制T的类型
  const person = {
    id: 1,
    message: "hello",
  };

  type PersonMessage = Message<typeof person>; // string
}

{
  // tuple type inference -> tmd这个有啥用?
  // 一般做法:
  const a = [1, true]; // (number | boolean)[]
  const aa = [1, true] as const; // readonly [1, true]

  // alternatively, using generics:
  function tuple<T extends unknown[]>(...ts: T) {
    return ts;
  }

  const myTuple1 = tuple(1, "hello", true); // 推导为元组类型 [number, string, boolean]
  const myTuple2 = tuple(...["资料管理员", "权限管理员", "经理"]); // [string, string, string]
}
