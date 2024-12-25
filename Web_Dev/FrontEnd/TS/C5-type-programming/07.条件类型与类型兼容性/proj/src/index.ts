type T1 = 1 extends number ? true : false; // true
type T2 = "1" extends number ? true : false; // false
type T3 = string extends object ? true : false; // false
type T4 = string extends Object ? true : false; // true
type T5 = { a: 1 } extends object ? true : false; // true
type T6 = { a: 1, b: 2 } extends { a: 1 } ? true : false; // true
type T7 = { a: 1 } extends { a: 1, b: 2 } ? true : false; // false
type T8 = string extends {} ? true : false; // true

type T9 = {} extends object ? true : false; // true
type T10 = object extends {} ? true : false; // true
type T11 = {} extends Object ? true : false; // true
type T12 = Object extends {} ? true : false; // true
type T13 = object extends Object ? true : false; // true
type T14 = Object extends object ? true : false; // true

// 原始类型的字面量类型< 原始类型 < 原始类型对应的装箱类型 < Object

type T15 = string extends any ? true : false; // true
type T16 = Object extends any ? true : false; // true
type T17 = Object extends unknown ? true : false; // true

type T18 = any extends Object ? 1 : 2; // 1 | 2
type T19 = any extends "Hello" ? 1 : 2; // 1 | 2

type T20 = unknown extends any ? 1 : 2; // 1
type T21 = any extends unknown ? 1 : 2; // 1

type T22 = never extends "Hello" ? true : false; // true
type T23 = "Hello" extends never ? true : false; // false
