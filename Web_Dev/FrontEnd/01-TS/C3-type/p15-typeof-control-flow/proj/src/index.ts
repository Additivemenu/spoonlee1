{
  let str1 = "hello"; // Type: string
  const str2 = "hello"; // Type: "hello"

  type MyTypes = number | string | boolean | null | undefined;

  // ts 可以强大到判断出 value 的类型, 从而方便我们进行类型判断(类型收缩)
  function parse(value: MyTypes) {
    if (typeof value === "number") {
      return value.toFixed(2); // value Type: number
    } else if (typeof value === "string") {
      return value.trim(); // value Type: string
    } else {
      return value; // value Type: boolean | null | undefined
    }
  }
}

{
  // 类型推断
  let temp1 = "hello";
  const temp2 = "hello";
  const temp3 = null;
  const temp4 = (a: number, b: number) => a + b + "";

  type Temp1 = typeof temp1; // Type: string
  type Temp2 = typeof temp2; // Type: "hello"
  type Temp3 = typeof temp3; // Type: null
  type Temp4 = typeof temp4; // Type: (a: number, b: number) => string

  const user = {
    name: "John",
    age: 30,
    address: {
      province: "Guangdong",
      city: "Shenzhen",
    },
  };
  type User = typeof user; // Type: { name: string; age: number; address: { province: string; city: string; }; }
  const person: User = {
    name: "John",
    age: 30,
    address: {
      province: "Guangdong",
      city: "Shenzhen",
    },
  };
}
