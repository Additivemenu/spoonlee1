{
  // 可见写起来, 比TS函数重载简洁多了

  function identity<T>(value: T): T {
    return value;
  }

  type User = {
    id: number;
    name: string;
  };

  // 写全了Generics:
  const s1 = identity<number>(1);
  const s2 = identity<string>("a");
  const s3 = identity<User>({ id: 1, name: "aaa" });
  console.log(s3.name); // ok

  // 当我们调用的时候，TS其实可以根据我们传入的参数自动推导泛型的类型，所以，调用的时候，前面的<>是可以省略的
  const ss1 = identity(1);
  const ss2 = identity("a");
  const ss3 = identity({ id: 1, name: "aaa" });
  console.log(s3.name); // ok
}

{
  function getTuple<T>(a: T, b: T) {
    return [a, b];
  }
  const as = getTuple<string>("hello", "world");
  console.log(as); // [ 'hello', 'world' ]
}

{
  // 类型写死的写法
  function myNumberFilter(
    arr: number[],
    callback: (item: number, index?: number) => boolean,
  ): number[] {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      if (callback(item)) {
        result.push(item);
      }
    }
    return result;
  }
  const filterArr1 = myNumberFilter([1, 2, 3, 4, 5], (item) => item % 2 === 0);
  console.log(filterArr1);
}

{
  // generics的写法, 使得封装更加灵活且严谨 =>  把函数看作一个黑盒, generics看成一个标签或者占位符
  function filter<T>(
    arr: T[],
    callback: (item: T, index?: number) => boolean,
  ): T[] {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      if (callback(item)) {
        result.push(item);
      }
    }
    return result;
  }

  const filterArr1 = filter(["xxx.js", "aaa.java", "bbb.md"], (item) =>
    item.endsWith(".js"),
  );
  console.log(filterArr1);

  const filterArr2 = filter([1, 2, 3, 4, 5], (item) => item % 2 === 0);
  console.log(filterArr2);
}
