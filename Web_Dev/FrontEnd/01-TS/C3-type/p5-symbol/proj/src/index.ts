{
  let a = Symbol("a");
  let b: symbol = Symbol("a");

  console.log(a === b); // ! false

  let obj = {
    name: "Symbol",
    [a]: "jack",
    [b]: function () {
      console.log("ts");
    },
  };
  console.log(obj); // jack
  for (let key in obj) {
    console.log("---" + key); // 使用symbol定义的key不会被遍历
  }
  console.log(Object.keys(obj)); // ["name"] 使用symbol定义的key不会被遍历
}

{
  // js Symbol.for() -> 全局注册表
  let id1 = Symbol.for("id");
  const user = {
    [id1]: "123",
  };
  console.log(user[id1]); // 123
  console.log(id1); // Symbol(id)

  let id2 = Symbol.for("id");
  console.log(user[id2]); // 123
  console.log(id2); // Symbol(id)

  console.log(id1 === id2); // true
}

{
  let a = Symbol("a");  // a: symbol
  let b = Symbol("b");  // b: symbol
  console.log(a === b); // ! false


  // 使用const定义symbol, 类似类型字面量, 定义unique symbol
  const c = Symbol("c"); // c: unique symbol
  const d: unique symbol = Symbol("d"); // d: unique symbol
  // console.log(c === d); // ! This comparison appears to be unintentional because the types 'typeof c' and 'typeof d' have no overlap.
}
