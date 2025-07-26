{
  // 方式一: 使用字面量的联合类型来表示离散的取值类型
  type Gender = "male" | "female";
  type Color = "red" | "blue" | "green"; // but when option in this type changes, we need to change the code all over the place
  type Direction = "up" | "down" | "left" | "right";
  type Status = "success" | "error" | "warning";
  type Weekday = "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";

  function fn(color: Color) {
    switch (color) {
      case "red": // ! 这里写死了, 如果color的选项改变了, 需要改变所有的代码
        return "red";
      case "blue":
        return "blue";
      case "green":
        return "green";
      default:
        return "unknown";
    }
  }

  console.log(fn("red"));
}

{
  // 方式二: 使用枚举类型 (枚举类型在ts中比较特殊, 即可以作为值直接使用, 也可作为类型使用)
  // convention: should use Capital letter for enum value and singular form for enum name
  // 枚举创建好之后, 其本身就有映射: string -> number (默认), string -> string ...
  enum Color {
    Red = "red",
    Blue = "blue",
    Green = "green",
    Yellow = "yellow",
  } // 这样当我们需要改变选项时, 只需要改变这里的值即可, 不需要改变所有的代码

  function fn(color: Color) {
    switch (color) {
      case Color.Red: // ! 这里写的是枚举类型, 如果color的选项改变了, 不需要改变所有的代码
        console.log(color);
        return color;
      case Color.Blue:
        console.log(color);
        return color;
      case Color.Green:
        console.log(color);
        return color;
      case Color.Yellow:
        console.log(color);
        return color;
      default:
        return color;
    }
  }

  fn(Color.Red);
}

{
  {
    type Status = "success" | "error" | "warning";
    function checkStatus(status: Status) {
      switch (status) {
        case "success": //!写死了
          console.log("success");
          break;
        case "error":
          console.log("error");
          break;
        case "warning":
          console.log("warning");
          break;
        default:
          console.log("unknown");
      }
    }
  }

  {
    enum Status {
      Success = "success",
      Error = "error",
      Warning = "warning",
    }

    function checkStatus(status: Status) {
      switch (status) {
        case Status.Success: // !这里写的是枚举类型, 如果status的选项改变了, 不需要改变所有的代码
          console.log(status);
          break;
        case Status.Error:
          console.log(status);
          break;
        case Status.Warning:
          console.log(status);
          break;
        default:
          console.log("unknown");
      }
    }
  }
}

{
  // enum 作为值使用
  enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
  }

  const upValue = Direction.Up;
  console.log(upValue); // "UP"

  // 和上面等效
  const upKey = Direction["Up"];
  console.log(upKey); // "UP"
}

{
  enum AttackType {
    // Decimal    // Binary
    None = 0, // 0000
    Melee = 1, // 0001
    Fire = 2, // 0010
    Ice = 4, // 0100
    Poison = 8, // 1000
  }

  // 位运算 属性： Melee | Fire | Ice
  const attack = AttackType.Melee | AttackType.Fire | AttackType.Poison; // 注意这不是联合类型, 而是enum作为值参与位运算. attack type: number

  const attackMethod = (attack: AttackType) => {
    console.log(attack);
  };

  attackMethod(AttackType.Fire); // 2
  attackMethod(attack); // 11 = 0001 | 0010 | 1000 = Melee | Fire | Poison, we feed a number type variable as input to the function
}

{
  // 常量枚举
  const enum Direction {
    Up = 0,
    Down = 1,
    Left = 2,
    Right = 3,
  }

  console.log(Direction.Up);
  console.log(Direction[0]); // 因为Direction是常量enum, 因此不能使用常量枚举的值来获取key
}
