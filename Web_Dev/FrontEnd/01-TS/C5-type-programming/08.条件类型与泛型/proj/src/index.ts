{
  {
    type ObjLength = {
      length: number;
    };

    function getObjLength<T extends ObjLength>(obj: T) {
      return obj;
    }
    getObjLength("Hello World");
    getObjLength([1, 2, 3]);
    getObjLength({ id: 1, length: 2 });
  }

  {
    type Result = { a: string; b: boolean } extends { a: string }
      ? true
      : false; // true
  }
}

{
  {
    // 读取T中message field的类型
    type Message<T extends { message: unknown }> = T["message"];

    const person = {
      id: 1,
      // message: "hello",
    };

    // type PersonMessage = Message<typeof person>;  // ! error: Property 'message' is missing in type '{ id: number; }' but required in type '{ message: unknown; }'.
  }

  {
    // ! 更为严谨的类型判断: 如果T中有message属性，则返回message属性的类型，否则返回never
    type Message<T> = T extends { message: unknown } ? T["message"] : never;

    const person = {
      id: 1,
      // message:"hello"
    };

    type PersonMessage = Message<typeof person>; // never
  }

  {
    // 提取数组中的元素类型
    type Flatten<T> = T extends any[] ? T[number] : T;

    type Str = Flatten<string[]>; // string
    type Num = Flatten<number[]>; // number

    const arr = [
      { id: 1, name: "aaa" },
      { id: 2, name: "bbb" },
      { id: 3, name: "ccc" },
    ];
    // 对象字面量类型 {id: number, name: string}
    type A = Flatten<typeof arr>;
  }
}

{
  type GetType<T> = T extends string
    ? "string"
    : T extends number
    ? "number"
    : T extends bigint
    ? "bigint"
    : T extends boolean
    ? "boolean"
    : T extends symbol
    ? "symbol"
    : T extends undefined
    ? "undefined"
    : T extends null
    ? "null"
    : T extends any[]
    ? "array"
    : T extends Function
    ? "function"
    : "object";

  type T0 = GetType<string>; // "string"
  type T1 = GetType<123n>; // "bigint"
  type T2 = GetType<true>; // "boolean"
  type T3 = GetType<() => void>; // "function"
  type T4 = GetType<[]>; // "array"
  type T5 = GetType<{}>; // "object"
  type T6 = GetType<null>; // "null"
}

{
  // ! 将两个类型合并成一个类型，第二个类型的键会覆盖第一个类型的键的类型
  type Merge<F, S> = {
    // 遍历所有的 key, 注意联合类型默认会去重
    [P in keyof F | keyof S]: P extends keyof S // 如果P包含在keyof S中
      ? // 直接取后者的值的类型，保证后者类型覆盖前者
        S[P]
      : // 如果是前者的属性
      P extends keyof F
      ? // 返回前者的类型
        F[P]
      : // 不会走到这一流程
        never;
  };

  type foo = {
    name: string;
    age: string;
  };

  type bar = {
    age: number;
    sex: string;
  };

  type Result = Merge<foo, bar>;
  /**
    * {
        name: string;
        age: number;
        sex: string;
    }
   */
}
