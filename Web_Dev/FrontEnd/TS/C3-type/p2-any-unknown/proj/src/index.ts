// any
{
  let a: any = 666;
  let b: any = ["danger"];
  let c = a + b;

  let foo; // any

  function func(foo: number, bar: string) {}

  console.log(true);

  let str: string = "aaa";

  let anyVar: any = null;
  anyVar.foo.bar.fn();
}

// unknown
{
  let a: unknown = 30;
  let b = a === 123;

  let c: any = 30;
  let d: number = c + 10;

  let e: unknown = "string";
  e = 123;
  e = true;

  // let f: string = e;
  // let f = e + 10;

  let f: any = e;

  if (typeof e === "number") {
    let g: number = e + 10;
  }

  let anyFn: any;
  let unknownFn: unknown;

  anyFn.foo();
  // unknownFn.foo(); //error
}
