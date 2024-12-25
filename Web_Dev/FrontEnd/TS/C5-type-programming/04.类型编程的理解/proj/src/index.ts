type User = {
  readonly id: number;
  name: string;
  tel: string;
  address?: string;
};

type Animal = {
  name: string;
  type: "cat" | "dog";
};

{
  type UserKeys = keyof User & {}; // 'id' | 'name' | 'tel' | 'address'
  type CopyUser = {
    [key in keyof User]: User[key];
  };

  // type A = keyof any; // string | number | symbol

  type Copy<T> = {
    [key in keyof T]: T[key];
  };

  const user: Copy<User> = {
    id: 1,
    name: "Jack",
    tel: "123456",
  };

  const animal: Copy<Animal> = {
    name: "Tom",
    type: "cat",
  };
}

{
  // 开启简单的类型编程

  // 实现一个 MyReadonly<T>，让 T 的所有属性变为只读
  type MyReadonly<T> = {
    +readonly [key in keyof T]: T[key];
  };
  const user: MyReadonly<User> = {
    id: 1,
    name: "Jack",
    tel: "123456",
  };
  // user.name = "Tom"; // Cannot assign to 'name' because it is a read-only property.

  // 实现一个 MyPartial<T>，让 T 的所有属性变为可选
  type MyPartial<T> = {
    [key in keyof T]+?: T[key];
  };
  const user2: MyPartial<User> = {
    id: 1,
  };
}

{
  // 实现一个 MyRequired<T>，让 T 的所有属性变为必选, 且不能为只读
  type MyRequired<T> = {
    -readonly [key in keyof T]-?: T[key];
  };

  const user: MyRequired<User> = {
    id: 1,
    name: "Jack",
    tel: "123456",
    address: "Beijing",
  };
  user.id = 2;
}

{
  type AnyType = {
    [key: string]: any;
  };

  type MyRecord<Key extends keyof any, Value> = {
    [key in Key]: Value;
  };

  let obj: MyRecord<string, number> = {
    a: 1,
    b: 2,
    // c: "1", // ! error Type 'string' is not assignable to type 'number'.
  };
}
