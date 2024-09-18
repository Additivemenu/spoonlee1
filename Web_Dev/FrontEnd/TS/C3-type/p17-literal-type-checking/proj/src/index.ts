{
  type UserTextEvent = {
    value: string;
    target: HTMLInputElement;
  };

  type UserMouseEvent = {
    value: number;
    target: HTMLButtonElement;
  };

  type UserEvent = UserTextEvent | UserMouseEvent;
  // 相当于下面:
  // type UserEvent = {
  //   value: string | number;
  //   target: HTMLInputElement | HTMLButtonElement;
  // }

  function handle(event: UserEvent) {
    console.log(event.value); // string | number
    console.log(event.target); // HTMLInputElement | HTMLButtonElement

    if (typeof event.value === "string") {
      console.log(event.value); // string
      console.log(event.target); //  HTMLInputElement | HTMLButtonElement, it didn't narrow the type for event.target
    } else {
      console.log(event.value); // number
      console.log(event.target); // HTMLInputElement | HTMLButtonElement, it didn't narrow the type for event.target
    }
  }
}

{
  // we could use literal type to narrow the type
  type UserTextEvent = {
    type: "TextEvent";
    value: string;
    target: HTMLInputElement;
  };

  type UserMouseEvent = {
    type: "MouseEvent";
    value: number;
    target: HTMLButtonElement;
  };

  type UserEvent = UserTextEvent | UserMouseEvent;

  function handle(event: UserEvent) {
    console.log(event.value); // string | number
    console.log(event.target); // HTMLInputElement | HTMLButtonElement

    // 通过字面量来细化联合类型
    if (event.type === "TextEvent") {
      console.log(event.value); // string
      console.log(event.target); //  HTMLInputElement
    } else {
      console.log(event.value); // number
      console.log(event.target); // HTMLButtonElement
    }
  }

  handle({
    type: "TextEvent",
    value: "123",
    target: document.querySelector("input")!,
  });
}

{
  {
    // 不太好的写法:
    type Shape = {
      kind: "circle" | "rect";
      radius?: number;
      width?: number;
      height?: number;
    };

    function area(s: Shape) {
      if (s.kind === "circle") {
        return Math.PI * s.radius! ** 2; // need to have !: non-null assertion operator
      } else {
        return s.width! * s.height!; // need to have !: non-null assertion operator
      }
    }
  }

  {
    // 更好的写法: 使用字面量类型 进行可辨识联合类型
    type Circle = {
      kind: "circle";
      radius: number;
    };

    type Rect = {
      kind: "rect";
      width: number;
      height: number;
    };

    type Shape = Circle | Rect;

    function area(s: Shape) {
      if (s.kind === "circle") {
        return Math.PI * s.radius ** 2;
      } else {
        return s.width * s.height;
      }
    }
  }
}
