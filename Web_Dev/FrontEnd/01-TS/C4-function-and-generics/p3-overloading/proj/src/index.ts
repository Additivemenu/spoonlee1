{
  /**
   * 以下只是ts的函数重载写法
   * Java 里的写法更加严谨: @Overload ...
   *
   * 注意ts里重载签名和重载实现必须放在一起, 中间不能有其他代码
   *
   */

  function combine(a: number, b: number): number; //  重载签名1
  function combine(a: string, b: string): string; //  重载签名2

  // 重载实现
  function combine(a: number | string, b: number | string) {
    if (typeof a === "number" && typeof b === "number") {
      return a * b;
    } else if (typeof a === "string" && typeof b === "string") {
      return a + b;
    }
    throw new Error("must be of the same type");
  }

  const result1 = combine(2, 3); // result1 is auto inferred to be a number
  console.log(result1);

  const result2 = combine("Hello", "World"); // result2 is auto inferred to be a string
  console.log(result2);
}

{
  function changeType(x: string): number;
  function changeType(x: number): string;
  function changeType(x: string | number): number | string {
    return typeof x === "string" ? parseInt(x, 10) : x.toString();
  }
  changeType("2");
}


{
  
}