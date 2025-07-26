{
  // ! 除了类型守卫的作用，in 运算符还能遍历联合类型的每一个成员类型
  type U = "a" | "b" | "c";
  type Foo = {
    [key in U]: string;
  };

  // 以上相当于:
  // type Foo = {
  //   a: string
  //   b: string
  //   c: string
  // }

  let foo: Foo = {
    a: "a",
    b: "b",
    c: "c",
    // d: "d", // ! Error: Object literal may only specify known properties, and 'd' does not exist in type 'Foo'.
  };
}

{
  type Person = {
    id: number;
    name: string;
  };

  type PersonKeys = keyof Person & {};

  type Person2 = {
    [key in PersonKeys]: Person[key]; // [ ]是为了取得key对应的值的**类型**
  };
}

{
  type User = {
    readonly id: number;
    name: string;
    tel: string;
    address?: string;
  };

  {
    // 使用UserKeys类型变量 -> 会丢失属性的修饰符
    type UserKeys = keyof User & {};
    type CopyUser = {
      [key in UserKeys]: User[key];
    };

    let u1: CopyUser = {
      id: 1, // !not readonly
      name: "jack",
      tel: "133333333",
      address: "上海", // !not optional
    };
  }

  {
    // !直接使用keyof User -> 不会丢失属性的修饰符
    type CopyUser = {
      [key in keyof User]: User[key];
    };

    let u1: CopyUser = {
      id: 1,
      name: "jack",
      tel: "133333333",
      // address:"上海"
    };
    // u1.id = 2;
  }

  {
    // 上泛型开启类型编程 -> 最generalized的写法

    // 像函数一样, 你给我一个类型, 我按你的要求给你一个新类型
    type Copy<T extends object> = {
      [key in keyof T]: T[key];
    };

    const u2: Copy<User> = {
      id: 2,
      name: "rose",
      tel: "1233434",
      address: "cd",
    };
    // u2.id = 3;  // ! error: Cannot assign to 'id' because it is a read-only property.

    type Animal = {
      name: string;
      age: number;
      color: string;
      type: "小猫" | "小狗";
    };
    const dog: Copy<Animal> = {
      name: "小白",
      age: 3,
      color: "white",
      type: "小狗",
    };

    // ! keyof T 键名的类型可以得到一个联合类型 string | number | symbol
    type A = keyof any;
    // 后面的映射类型，可能会联合模板字符串一起操作，可能会要去keyof any 得到的必须是string类型
    type B = keyof any & string;
  }
}
