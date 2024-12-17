{
  // part1: 规定函数类型 -> 你在写React Functional Component的时候, 经常需要规定函数的类型, 即函数签名
  // e.g.1
  type Add = (a: number, b: number) => number; // 这个是类型别名的写法 (大多数情况下我们用类型别名来写), 也可以用interface来定义, 但写法上略有不同
  const add: Add = (a, b) => a + b;

  // e.g.2
  type User = {
    userId: number;
    name: string;
    info: (name: string) => string;
  };

  let user: User = {
    userId: 1,
    name: "Jack",
    info: (name) => {
      return `${name} + ...`;
    },
  };
}

{
  // part2: more examples on function signatures:
  // e.g.1
  type Log = (userId: number, message?: string) => void;
  const log: Log = (userId, message) => {
    console.log(userId, message);
  };
  log(1, "Hello");

  // e.g.2
  type SumFn = (...numbers: number[]) => number; // spread positional parameters
  const sum: SumFn = (...numbers) => {
    return numbers.reduce((acc, cur) => acc + cur, 0);
  };
  console.log(sum(1, 2, 3, 4, 5));
}

{
  // part3:  and you can even infer the function signature from a function implementation -> 但这用的多吗？
  // e.g. 1
  const sumResult = (...numbers: number[]) => {
    return numbers.reduce((acc, cur) => acc + cur, 0);
  };
  type SumFn = typeof sumResult;

  interface Add {
    (a: number, b: number): number;
  }
}

{
  // part4: 带回调函数的复杂函数 -> 很常见
  type ErrorCallback = (err: Error | null, result: string) => void;
  type HandleData = (data: string, cb: ErrorCallback) => void;

  // this looks like a functional component in react
  const handleData: HandleData = (data, callback) => {
    if (data === "error") {
      callback(new Error("error"), "");
    } else {
      callback(null, "handled " + data);
    }
  };

  const p = {
    name: "John",
    handle: handleData,
  };
}

{
  // part5: 上下文类型推导

  type Fn = (index: number) => void;

  function times(fn: Fn, n: number) {
    for (let i = 0; i < n; i++) {
      fn(i);
    }
  }

  // ts自动推导出了函数的类型
  times((n) => console.log(n), 4);
}
