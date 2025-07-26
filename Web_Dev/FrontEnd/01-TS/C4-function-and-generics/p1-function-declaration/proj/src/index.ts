{
  function add(a: number, b: number): number {
    return a + b;
  }
  const result = add(1, 2);

  function sayHello1(name: string) {
    return "hello " + name;
  }

  const sayHello2 = function (name: string) {
    return "hello " + name;
  };

  const sayHello3 = (name: string): string => {
    return "hello " + name;
  };

  const sayHello4 = (name: string) => "hello " + name;

  // (name: string) => "hello admin" | undefined
  const sayHello5 = (name: string) => {
    if (name === "admin") {
      return "hello admin";
    }
    return;
  };

  {
    // 可选参数, 默认参数
    function sendMessage(userId: number, message?: string, message2 = "hello") {
      console.log(userId);
      console.log(message);
      console.log(message2);
    }

    sendMessage(1);
  }

  {
    // 隐藏参数
    function sum() {
      console.log(arguments);
      return Array.from(arguments).reduce((acc, cur) => acc + cur, 0);
    }

    // @ts-ignore
    const sumResult = sum(1, 2, 3, 4, 5); // ! error: Expected 0 arguments, but got 4.
    console.log(sumResult);
  }

  {
    // 剩余参数
    function sum(...numbers: number[]): number {
      return numbers.reduce((acc, cur) => acc + cur, 0);
    }

    const sumResult = sum(1, 2, 3, 4, 5); // OK
    console.log(sumResult);
  }

  {
    // this
    function showDate(this: Date) {
      return `${this.getFullYear()}-${this.getMonth() + 1}-${this.getDate()}`;
    }

    const time = showDate.call(new Date()); // need to learn js function course about call, apply, bind...
  }
}
