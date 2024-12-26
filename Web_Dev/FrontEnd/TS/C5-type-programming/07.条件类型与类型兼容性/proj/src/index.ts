{
  // ! 一定注意条件类型最后取得是类型 (可以是字面量类型), 不是值
  type T1 = 1 extends number ? true : false; // true
  type T2 = "1" extends number ? true : false; // false
  type T3 = string extends object ? true : false; // false, 小写object
  type T4 = string extends Object ? true : false; // true, 大写的Object
  type T5 = { a: 1 } extends object ? true : false; // true
  type T6 = { a: 1; b: 2 } extends { a: 1 } ? true : false; // true
  type T7 = { a: 1 } extends { a: 1; b: 2 } ? true : false; // false
  type T8 = string extends {} ? true : false; // true

  // 但是，下面的代码会让你产生困惑：
  // 这三个建议大家不需要细究，知道他们有这个问题：你中有我，我中有你。这是**TS“系统设定”**的问题。
  // ! 记住这个就行: 原始类型的字面量类型< 原始类型 < 原始类型对应的装箱类型 < Object
  type T9 = {} extends object ? true : false; // true
  type T10 = object extends {} ? true : false; // true

  type T11 = {} extends Object ? true : false; // true
  type T12 = Object extends {} ? true : false; // true

  type T13 = object extends Object ? true : false; // true
  type T14 = Object extends object ? true : false; // true
}

{
  // !记住any/unknown是所有类型的顶层类型就行;
  type T15 = string extends any ? true : false; // true
  type T16 = Object extends any ? true : false; // true
  type T17 = Object extends unknown ? true : false; // true

  // 以下神奇 - 但不要纠结, 这是TS的系统设定
  type T18 = any extends Object ? 1 : 2; // 1 | 2
  type T19 = any extends "Hello" ? 1 : 2; // 1 | 2

  type T20 = unknown extends any ? 1 : 2; // 1
  type T21 = any extends unknown ? 1 : 2; // 1

  // !别忘记，`never`类型是所有类型的子类型
  type T22 = never extends "Hello" ? true : false; // true
  type T23 = "Hello" extends never ? true : false; // false
}
