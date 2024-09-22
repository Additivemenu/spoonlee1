// satisfies -> TS4.9
// 类型检查
// 和type assertion `as` 类似， 但是比`as`更加智能且安全, 因为它可以在满足类型安全的前提下, 自动帮我们做类型收窄或类型提示

{
  interface IConfig {
    a: string | number;
  }

  const legacy: IConfig = {}; // error: Property 'a' is missing in type '{}' but required in type 'IConfig'
  console.log(legacy.a); // not even get a type error -> not good

  const legacyAs: IConfig = {} as IConfig; // this is not type safe
  console.log(legacyAs.a); // not even get a type error -> not good

  // 如果类型不安全, 通过satisfies转换会提示错误, 后面调用也会报错
  const current = {} satisfies IConfig; // error: Property 'a' is missing in type '{}' but required in type 'IConfig'
  console.log(current.a); // get a type error -> good

  {
    const currentWithValue: IConfig = { a: 2 }; // a type: number | string
    currentWithValue.a.toFixed(); // error: Property 'toFixed' does not exist on type 'string | number'.
  }

  {
    const currentWithValue = { a: 2 } as IConfig; // a type: number | string
    currentWithValue.a.toFixed(); // error: Property 'toFixed' does not exist on type 'string | number'.
  }

  {
    const currentWithValue = { a: 2 } satisfies IConfig; // a type: number  -> satisfies自动帮我们做了类型收窄
    currentWithValue.a.toFixed(); // error: Property 'toFixed' does not exist on type 'string | number'.
  }
}

{
  // satisfies在满足type safety的前提下, 自动帮我们做类型提示
  type MyElement = {
    tagName: string;
    src: string;
    [key: string]: any; // 索引签名
  };
  {
    const element = {
      tagName: "img",
      src: "https://www.google.com/img",
      alt: "Example Image",
    } as MyElement;

    console.log(element); // 没有类型提示, 无法element.alt
  }

  {
    const element = {
      tagName: "img",
      src: "https://www.google.com/img",
      alt: "Example Image",
    } satisfies MyElement;

    console.log(element); // 有类型提示, 可以element.alt
  }
}
