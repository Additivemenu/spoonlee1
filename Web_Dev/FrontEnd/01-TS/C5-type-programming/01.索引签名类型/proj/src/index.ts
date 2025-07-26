{
  // 下面这个type定义的很严格, 如果我们希望更加灵活, 可以使用索引签名
  // type User = {
  //   name?: string;
  //   gender?: string;
  //   age?: number;
  // };

  type User = {
    name: string;
    [key: string]: string | number; // !applies to all keys
  };

  // !obj的key可以是string, number 和symbol类型
  let obj: User = {
    name: "Jack",
    gender: "male",
    age: 20,
    "123": "hello",
  };

  console.log(obj.name);
}

{
  // 灵活性
  type AnyTypeObj = {
    [key: string]: any;
  };

  let obj: AnyTypeObj = {
    name: "Jack",
  };

  obj.age = 20;
  obj.name = "Karl";
}

{
  // https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type
  type CatName = "miffy" | "boris" | "mordred";

  interface CatInfo {
    age: number;
    breed: string;
  }

  const cats: Record<CatName, CatInfo> = {
    miffy: { age: 10, breed: "Persian" },
    boris: { age: 5, breed: "Maine Coon" },
    mordred: { age: 16, breed: "British Shorthair" },
  };

  cats.boris;

  // const cats: Record<CatName, CatInfo>;
}
