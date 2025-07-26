{
  type A = string & number; // never

  type Foo = string | number | boolean | undefined | null | void | never; // never 不携带任何类型信息

  type Method = "GET" | "POST" | "PUT";
  function request(url: string, method: Method) {
    if (method === "GET") {
      console.log(method, url);
    } else if (method === "POST") {
      console.log(method, url);
    } else {
      const _neverCheck: never = method; // only never can be assigned to never, 穷举式检查 (在编译时即可发现错误)
      console.log(method, url); // method type: never
      throw new Error(`Unsupport method: ${method}`);
    }
  }

  request("http://www.baidu.com", "GET");
}

{
  // 字面量类型做类型收缩
  type Circle = { kind: "circle"; radius: number };
  type Rect = { kind: "rect"; width: number; height: number };
  type Triangle = { kind: "triangle"; base: number; height: number };
  type Shape = Circle | Rect | Triangle;

  function area(shape: Shape) {
    switch (shape.kind) {
      case "circle":
        return Math.PI * shape.radius ** 2; // shape type: Circle
      case "rect":
        return shape.width * shape.height; // shape type: Rect
      case "triangle":
        return (shape.base * shape.height) / 2; // shape type: Triangle
      default:
        const _neverCheck: never = shape; // only never can be assigned to never, 穷举式检查(在编译时即可发现错误)
        throw new Error("Invalid shape type");
    }
  }
}

{
  function fn(): never {
    // todos ...
    throw new Error("error");
  }

  function foo(n: number) {
    if (n > 10) {
      fn();
      let name = "foo";  // unreachable code
    }
  }
}
