{
  // 规定函数类型
  type Add = (a: number, b: number) => number;  // 这个是类型别名的写法, 也可以用interface来定义, 但写法上略有不同
  const add: Add = (a, b) => a + b; // 

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
  // more examples on function signatures:
  type Log = (userId: number, message?: string) => void;
  const log: Log = (userId, message) => {
    console.log(userId, message);
  };
  log(1, "Hello");

  type SumFn = (...numbers: number[]) => number;
  const sum: SumFn = (...numbers) => {
    return numbers.reduce((acc, cur) => acc + cur, 0);
  };
  console.log(sum(1, 2, 3, 4, 5));
}

{
  // and you can even infer the function signature from a function implementation
  const sumResult = (...numbers: number[]) => {
    return numbers.reduce((acc, cur) => acc + cur, 0);
  };
  type SumFn = typeof sumResult;
}

{
  // 18min-
}