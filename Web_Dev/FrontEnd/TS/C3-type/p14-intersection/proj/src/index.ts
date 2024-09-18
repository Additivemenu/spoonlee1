{
  // 更进一步的:
  type P = {
    name: string;
    age: number;
  };

  // T can be seen as type P as it contains all fields in type P
  type T = {
    name: string;
    age: number;
    gender: string;
  };

  // M can be seen as type P as it contains all fields in type P
  // but M cannot be seen as type T because M is missing `gender` field required by T
  type M = {
    name: string;
    age: number;
    title: "Dr." | "Mr." | "Miss";
  };

  const personP: P = { name: "Alice", age: 30 };
  const personT: T = { name: "Alice", age: 30, gender: "female" };
  const validAssignment: P = personT; // Valid because `T` contains all fields in `P`
  const personM: M = { name: "Bob", age: 40, title: "Mr." };
  const validAssignmentM: P = personM; // Valid because `M` contains all fields in `P`

  const invalidAssignment: T = personM; // Invalid because `M` does not contain the `gender` field

}

{
  type Student = { name: string; score: number };
  type Teacher = { name: string; age: number; subject: string };

  type User = Student & Teacher;

  const user: User = {
    name: "John",
    score: 100,
    age: 30,
    subject: "Math",
  }; // 必须同时满足 Student 和 Teacher 的所有属性, 少一个都不行
  // 即 User类型既得满足Student类型的要求, 又得满足Teacher类型的要求, 所以User类型是Student类型和Teacher类型的intersection
  // 换句话说, 一个User类型的instance, 必须同时具备Student类型和Teacher类型的所有属性
  // 但注意intersection并不是类型里属性集合相交, 而是类型相交
}

{
  // 交叉类型不能直接使用于字面量类型和基础类型, 因为这样会导致交叉类型的结果为never
  type Width = number & string; // never
  type Color = "red" & "blue"; // never
}

{
  // 交叉类型和联合类型一起使用
  type P = {
    name: string;
    gender: string;
  };

  type T = {
    name: string | undefined | number;
    age: number;
  };

  type PT = P & T;

  const pt: PT = {
    name: "tom", // string
    age: 18,
    gender: "male",
  };

  type Params = string | number | boolean;
  type A = Params & string; // string
}

{
  // 使用交叉类型, 实现类似继承的效果
  type Goods = {
    id: number;
    name: string;
    price: number;
  };

  type Cart = Goods & {
    count: number;
  };

  type Order = Goods & {
    count: number;
    totalPrice: number;
  };

  let goods: Goods = {
    id: 1,
    name: "apple",
    price: 5,
  };

  let cart: Cart = {
    id: 1,
    name: "apple",
    price: 5,
    count: 2,
  };

  let order: Order = {
    id: 1,
    name: "apple",
    price: 5,
    count: 2,
    totalPrice: 10,
  };

  goods = cart; // OK, Cart类型肯定包含Goods类型的所有属性, 可以视为Cart类型‘继承’Goods类型
  cart = goods; // Error, Type 'Goods' is not assignable to type 'Cart'. Property 'count' is missing in type 'Goods' but required in type '{ count: number; }'
}
