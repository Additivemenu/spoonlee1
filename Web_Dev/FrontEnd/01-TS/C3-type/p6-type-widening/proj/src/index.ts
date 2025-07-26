{
  // 声明变量时如果运行以后修改变量的值（例如使用let和var声明），变量类型将被ts拓宽，从字面值放大到包含该字面量的基础类型
  let a = "hello"; // a: string
  let b = 123; // b: number
  let c = true; // c: boolean
}

{
  // 使用const声明不可变的变量时，情况不同，会自动的把类型缩窄
  const a = "hello"; // a: "hello"
  const b = 123; // b: 123
  const c = true; // c: true
}

{
  // 我们当然可以显示的标注类型防止类型拓宽
  let a: "hello" = "hello";
  let b: 123 = 123;
  let c: true = true;
}

{
  // 不过使用**const声明的对象，并不会缩窄推导的类型**
  // 因为Javascript对象是可变的，所以在Typescript看来，创建对象之后你可能会更新对象
  const obj = {
    b: 123,   // b: number
  };
}
