{
  type World = "world";
  type Greeting = `hEllo ${World}`;

  // 使用官方提供的字符串类型泛型工具 https://www.typescriptlang.org/docs/handbook/utility-types.html#intrinsic-string-manipulation-types
  type UppercaseGreeting = `hello ${Uppercase<World>}`; //Uppercase<Greeting>;

  type LowercaseGreeting = Lowercase<Greeting>;

  type CapitalizeGreeting = Capitalize<Greeting>;

  type UncapitalizeGreeting = Uncapitalize<CapitalizeGreeting>;
}

{
  //! 模板字符串类型和联合类型一起使用，有交叉相乘的效果 -> 这个有用
  type Direction = "left" | "right" | "top" | "bottom";
  type BoxName = "padding" | "margin" | "border";
  type BoxModel = `${BoxName}-${Direction}`;

  /**
type BoxModel = "padding-left" | "padding-right" | "padding-top" | "padding-bottom" | "margin-left" | "margin-right" | "margin-top" | "margin-bottom" | "border-left" | "border-right" | "border-top" | "border-bottom"
   * 
   */
}

{
  const person = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
  };

  type PersonKeys = keyof typeof person;

  type EventPersonChange = `${PersonKeys}Changed`; // type EventPersonChange = "firstNameChanged" | "lastNameChanged" | "ageChanged"

  // 泛型的写法:
  //! 模板字符串不支持symbol类型, 所以得 & string
  // 结合泛型使用，由于keyof T得到的是一个联合类型，不能直接用于模板字符串拼接
  // 需要使用 交叉类型 &，去掉其他类型，只保留字符串类型
  type EventObjectChange<T> = `${keyof T & string}Changed`;
  type P = EventObjectChange<typeof person>; // type P = "ageChanged" | "firstNameChanged" | "lastNameChanged"
}

{
  type A = {
    foo: number;
    bar: number;
  };

  type C = {
    name: string;
    type: string;
    sex: boolean;
  };

  {
    type B = {
      [K in keyof A as `${K}ID`]: number;
    };

    /**
 * 
 * type B = {
    fooID: number;
    barID: number;
}
 * 
 */
  }

  {
    // review on 交叉类型
    type AAA = "1" | "2" | "3";
    type BBB = "1";
    type CCC = AAA & BBB; // CCC = "1",

    type AA = {
      foo: number;
      bar: number;
    };
    type BB = {
      name: string;
      type: string;
      bar: number;
    };
    type CC = AA & BB; // CC = { foo: number; bar: number; name: string; type: string; }, CC既有AA的属性, 也有BB的属性, 即CC要既兼容AA, 也兼容BB
    const cc: CC = {
      foo: 1,
      bar: 2,
      name: "jack",
      type: "person",
    };

    type DD = AA | BB; // DD = { foo: number; bar: number; } | { name: string; type: string; bar: number; }, DD要么是AA, 要么是BB
    const dd: DD = {
      name: "jack",
      type: "person",
      bar: 2,
    };

    type EE = AA & string; // DD = never

    //! 模板字符串不支持symbol类型, 所以得 & string
    type E = keyof any & string; // type E = string

    type AddID<T> = {
      [K in keyof T as `${K & string}ID`]: T[K];
    };
    type H = AddID<C>;

    /**
     * type H = {
    nameID: string;
    typeID: string;
    sexID: boolean;
}
     */
  }

  {
    //! 综合起来的例子
    type User = {
      name: string;
      age: number;
      address: string;
    };

    type AddGetter<T> = {
      [K in keyof T as `get${Capitalize<K & string>}`]: () => T[K];
    };

    type AddSetter<T> = {
      [K in keyof T as `set${Capitalize<K & string>}`]+?: (arg: T[K]) => void;
    };

    type UserGetter = AddGetter<User>;
    type UserSetter = AddSetter<User>;

    type ObjectWithGetterSetter<T extends object> = T &
      AddGetter<T> &
      AddSetter<T>;

    type UserWithGetterSetter = ObjectWithGetterSetter<User>;

    const p: UserWithGetterSetter = {
      name: "jack",
      age: 20,
      address: "北京",
      getName() {
        return this.name;
      },
      getAge() {
        return this.age;
      },
      getAddress() {
        return this.address;
      },
      setName(name) {
        this.name = name;
      },
    };
  }
}
