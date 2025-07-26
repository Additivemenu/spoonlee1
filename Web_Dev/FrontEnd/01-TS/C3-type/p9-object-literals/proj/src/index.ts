{
  let a: object = {
    b: "hello",
  };

  console.log(a.b); // error: Property 'b' does not exist on type 'object'
}

{
  let a: {
    b: string;
  } = {
    b: "hello",
  };
  console.log(a.b);

  // 这里就很常用了, TS project里到处都是
  const user: {
    readonly name: string;
    age: number;
    sex?: string; // string | undefined
    tel?: string; // string | undefined
  } = {
    name: "jack",
    age: 25,
    sex: "男",
    tel: "123",
  };

  user.age = 19;
  user.name = "tom"; // error: Cannot assign to 'name' because it is a read-only property.
  console.log(user);
}
