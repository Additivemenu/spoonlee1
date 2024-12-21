{
  /**
   * TS是结构化类型系统, 通过判断属性, 方法是否存在来判断类型, 而非通过类型的名字来判断
   */
  type User = {
    id?: number;
    name: string;
  };

  type Animal = {
    id?: number;
    name: string;
  };

  // AdminUser可以视为User (Animal)的子类型
  type AdminUser = {
    id?: number;
    name: string;
    role: string;
  };

  function deleteUser(user: User) {
    console.log(user);
  }

  const a1: Animal = {
    id: 1,
    name: "animal1",
  };

  // ! TS认为AdminUser是User(或者Animal)的子类型, 因为AdminUser包含了User的所有属性
  const u1: AdminUser = {
    id: 2,
    name: "user2",
    role: "admin",
  };

  const u2: User & { role: string } = {
    id: 3,
    name: "user3",
    role: "admin",
  };

  deleteUser(a1); // OK? Error? -> OK
  deleteUser(u1); // OK? Error? -> OK -> 因为TS是结构化类型系统，只要满足了User的结构，就可以传入 (但Java, C#是名义类型系统 -> 必须是User类型才可以传入)
  deleteUser(u2); // OK? Error? -> OK


  /**
   * more examples: 
   * 
   * typescript对于结构（对象和类）的属性类型进行了协变，也就是说，
   *   + 如果想保证A对象可赋值给B对象，那么A对象的每个属性都必须是B对象对应属性的子类型
   *   + 如果A是B的子类型，那么我们可以说由A组成的复合类型（例如数组和泛型）也是B组成相应复合类型的子类型**
   * 
   *  User ---> id ---> number | undefined
   *  ExistUser ---> id ---> number
   *  LegacyUser ---> id ---> number | string | undefined
   *  therefore: ExistUser <: User <: LegacyUser
   * 
   */
  // ! 这个也是User的子类型, 因为number可以赋值给number | undefined
  type ExistUser = {
    id: number;
    name: string;
  };

  // ! 但这个不是User的子类型, 因为number | string | undefined 不能赋值给 number | undefined
  type LegacyUser = {
    id?: number | string;
    name: string;
  };

  const existUser: ExistUser = {
    id: 2,
    name: "user2",
  };

  const legacyUser: LegacyUser = {
    id: 3,
    name: "user3",
  };

  deleteUser(existUser); // OK? Error? -> OK
  // deleteUser(legacyUser); // ! OK? Error? -> Error
}

{
  /**
   * typescript对于结构（对象和类）的属性类型进行了协变，也就是说，
   *   + 如果想保证A对象可赋值给B对象，那么A对象的每个属性都必须是B对象对应属性的子类型
   *   + 如果A是B的子类型，那么我们可以说由A组成的复合类型（例如数组和泛型）也是B组成相应复合类型的子类型**
   */
  type Pet = {
    name: string;
  };

  type Dog = Pet & {
    breed: string;
  };

  const dogs: Dog[] = [
    {
      name: "jack",
      breed: "拉布拉多",
    },
    {
      name: "rose",
      breed: "吉娃娃",
    },
  ];

  const pet: Pet[] = dogs;

  type Arrs<T> = {
    arr: T[];
  };

  const arr1: Arrs<Dog> = {
    arr: dogs,
  };

  const arr2: Arrs<Pet> = arr1;
}
