type World = "world";
type Greeting = `hEllo ${World}`;

// 使用官方提供的字符串类型泛型工具
type UppercaseGreeting = `hello ${Uppercase<World>}`; //Uppercase<Greeting>;

type LowercaseGreeting = Lowercase<Greeting>;

type CapitalizeGreeting = Capitalize<Greeting>;

type UncapitalizeGreeting = Uncapitalize<CapitalizeGreeting>;

// 模板字符串类型和联合类型一起使用，有交叉相乘的效果
type Direction = "left" | "right" | "top" | "bottom";
type BoxName = "padding" | "margin" | "border";
type BoxModel = `${BoxName}-${Direction}`;

const person = {
  firstName: "John",
  lastName: "Doe",
  age: 30
}

type PersonKeys = keyof typeof person;

type EventPersonChange = `${PersonKeys}Changed`;

type EventObjectChange<T> = `${keyof T & string}Changed`
type P = EventObjectChange<typeof person>

type A = {
  foo: number,
  bar: number
}

type C = {
  name: string,
  type: string
  sex: boolean
}

type B = {
  [K in keyof A as `${K}ID`]:number
}

// type E = keyof any & string;

type AddID<T> = {
  [K in keyof T as `${K & string }ID`]: T[K];
}
type H = AddID<C>;

type User = {
  name: string;
  age: number;
  address: string;
}

type AddGetter<T> = {
  [K in keyof T as `get${Capitalize<K & string>}`]: () => T[K];
}

type AddSetter<T> = {
  [K in keyof T as `set${Capitalize<K & string>}`]+?: (arg: T[K]) => void;
}

type UserGetter = AddGetter<User>;
type UserSetter = AddSetter<User>;


type ObjectWithGetterSetter<T extends object> = T & AddGetter<T> & AddSetter<T>;

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
    return this.address
  },
  setName(name) { 
    this.name = name;
  }
}
