{
  // 创建一个通用的交换函数，它接受一个包含两个元素的数组，并返回元素交换位置后的数组
  function swap<T, U>(pair: [T, U]): [U, T] {
    return [pair[1], pair[0]];
  }
  const result1 = swap([2, "a"]);
  const result2 = swap(["hello", { text: "world" }]);
  console.log(result1, result2);
}

{
  // 封装一个类似于数组的map函数，简单来说，给我一个数组，然后根据回调函数，我们能组装成另外一个新的数组，而这个新的数组，可能类型和原来的数组一样，也有可能不一样
  const arr = [1, 2, 3, 4, 5];
  function map<T, U>(arr: T[], callback: (e: T, i?: number) => U): U[] {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      result.push(callback(item, i));
    }
    return result;
  }

  // 调用的时候指定泛型的类型
  const t1 = map<number, number>(arr, (e) => e * 2);
  const t2 = map<number, string>(arr, (e) => `<div>index${e}</div>`);

  // 在调用的时候，同样可以让Typescript自己进行类型推导
  const tt1 = map(arr, (e) => e * 2);
  const tt2 = map(arr, (e) => `<div>index${e}</div>`);
}
