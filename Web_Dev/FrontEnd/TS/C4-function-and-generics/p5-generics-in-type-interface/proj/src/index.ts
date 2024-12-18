{
  // part1: 数组使用泛型
  function unique<T>(array: Array<T>): T[] {
    return Array.from(new Set(array));
  }

  const arr1: number[] = [1, 2, 2, 3, 4, 4];
  const arr2: Array<string> = ["a", "b", "b", "c", "d", "a"];

  const arr3 = unique(arr1);
  const arr4 = unique(arr2);
  console.log(arr3);
  console.log(arr4);
}

{
  // part2: 泛型别名

  // 模拟API的返回数据
  type ResultData<T> = {
    message: string;
    code: number;
    data: T;
  };

  type User = {
    id: number;
    name: string;
    tel: string;
    address?: string;
  };

  type UserResultData = ResultData<User>;
}

{
  // part3: 泛型别名之间相互调用 -> 给予了很大的灵活性, 同时也增加了代码的复杂度 -> 从这里开始 ts就开始变得复杂了
  type MyEvent<T> = {
    target: T; // e.g. HTMLButtonElement | null, but we are not sure which type it is
    type: string; // e.g. "click", "change", "mouseover"
  };

  // 泛型别名调用别的泛型别名 -> 就像函数传参一样, 提供一个约束, 也算一种类型封装
  type TimedEvent<T> = {
    event: MyEvent<T>;
    from: Date;
    to: Date;
  };

  // ! T 传入 联合类型
  const myEvent: MyEvent<HTMLButtonElement | null> = {
    target: document.querySelector("#btn"),
    type: "click",
  };

  const timedEvent: TimedEvent<HTMLElement | null> = {
    event: {
      target: document.querySelector("#div"),
      type: "click",
    },
    from: new Date(),
    to: new Date(),
  };

  function triggerEvent<T>(event: MyEvent<T>): void {
    // ...
  }
  triggerEvent({
    target: document.querySelector("#layer"),
    type: "click",
  });
}

{
  // part4: 还可以利用泛型别名给我们写TS代码带来一些方便
  // let var1: string;
  // var1 = null; // ! error: Type 'null' is not assignable to type 'string'

  // 泛型的写法:
  type Nullable<T> = T | null | undefined;
  const str: Nullable<string> = null;

  type User = {
    id: number;
    name: string;
    tel: string;
    address?: string;
  };

  let user: Nullable<User> = null;
  user = {
    id: 1,
    name: "aaa",
    tel: "123456",
  };
}

{
  // part5: 在函数的调用签名中使用泛型
  // ! 这里只定义类型, 泛型的类型在调用的时候才指定
  type Filter<T> = (
    arr: T[],
    callback: (item: T, index?: number) => boolean,
  ) => T[];

  // ! 很像React Functional component的类型写法 -> 在实现函数的时候才指定泛型的类型 -> 这样做可以使得类型和逻辑分离
  const myFilter: Filter<string> = (arr, callback) => {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      if (callback(item)) {
        result.push(item);
      }
    }
    return result;
  };

  const filterArr2 = myFilter(["xxx.js", "aaa.java", "bbb.md"], (item) =>
    item.endsWith(".js"),
  );
  console.log(filterArr2);
}
