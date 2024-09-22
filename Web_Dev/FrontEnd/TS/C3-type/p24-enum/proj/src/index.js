"use strict";
/* type Gender = "男" | "女";
type Color = "red" | "blue" | "green";
type Direction = "up" | "down" | "left" | "right";
type Status = "success" | "error" | "warning";
type Weekday = "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";

function fn(color: Color) {
  switch (color) {
    case "red":
      console.log(color);
      break;
    case "blue":
      console.log(color);
      break;
    case "green":
      console.log(color);
      break;
  }
}

fn("green"); // green */
// 枚举创建好之后，本身就有映射
// 字符串->数字   字符串->字符串
/* enum Color {
  Red = "red",
  Blue = 1,
  Green = "green",
  Yellow = 2
}

function fn(color: Color) {
  switch (color) {
    case Color.Red:
      console.log(color);
      break;
    case Color.Blue:
      console.log(color);
      break;
    case Color.Green:
      console.log(color);
      break;
    case Color.Yellow:
      console.log(color);
      break;
  }
}

fn(Color.Yellow) */
/* enum Status {
  Success = 200,
  Error = 500,
  Warning = 401
}

function checkStatus(status: Status) {
  switch (status) {
    case Status.Success:
      console.log(status);
      // todos...
      break;
    case Status.Error:
      console.log(status);
      // todos...
      break;
    case Status.Warning:
      console.log(status);
      // todos...
      break;
  }
}

checkStatus(Status.Success); */
/* enum Direction {
  Up = 0,
  Down = 1,
  Left = 2,
  Right = 3
}

const upValue = Direction.Up;
console.log(upValue);
const upKey = Direction[0];
console.log(upKey)

console.log(Direction[99]);

const n: number = 11;
const dir: Direction = n; */
var AttackType;
(function (AttackType) {
    //Decimal      // Binary
    AttackType[AttackType["None"] = 0] = "None";
    AttackType[AttackType["Melee"] = 1] = "Melee";
    AttackType[AttackType["Fire"] = 2] = "Fire";
    AttackType[AttackType["Ice"] = 4] = "Ice";
    AttackType[AttackType["Poison"] = 8] = "Poison"; // 1000
})(AttackType || (AttackType = {}));
// 攻击的位运算 属性：近战 | 火 | 毒
const attack = AttackType.Melee | AttackType.Fire | AttackType.Poison;
// 根据传入的攻击方式，进行相应的处理
const attackMethod = (attack) => console.log(attack);
attackMethod(AttackType.Fire);
attackMethod(attack);
console.log(0 /* Direction.Up */);
