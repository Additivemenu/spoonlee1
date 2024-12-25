{
  // ! 获取类型别名的所有键的联合类型

  type User = {
    id: number;
    name: string;
    age: number;
  };

  // 小技巧，通过& {} 可以看到keyof组成的联合类型
  type UserKeys = keyof User & {}; // type UserKeys = "id" | "name" | "age"

  let a: UserKeys = "id";
}

{
  //! keyof和其他类型操作符的联合使用, 本质还是获取类型别名的所有键的联合类型

  {
    // keyof + typeof
    const person = {
      name: "jack",
      sex: "男",
      age: 20,
    };

    // !可以和typeof联合使用，获取一个对象的键的联合类型 -> 本质还是获取类型别名的所有键的联合类型

    type PersonKeys = keyof typeof person; // type PersonKeys = "name" | "age" | "sex"
  }

  {
    // keyof + [ ]

    // 可以和方括号运算符联合使用，获取对象类型值的类型
    type Person = {
      name: string;
      sex: boolean;
      age: number;
    };

    type dummyValueKeys = Person["name" | "age"]; // type dummyValueKeys = string | number
    type ValueType = Person[keyof Person]; // type ValueType = string | number | boolean
  }

  {
    // keyof + 受限的泛型

    // ! a more practical example: 非常优雅的方式来代替函数重载

    // 之前重载实现的createElement
    // function createElement(tagName: 'a'): HTMLAnchorElement
    // function createElement(tagName: 'div'): HTMLDivElement
    // function createElement(tagName:string):HTMLElement {
    //   return document.createElement(tagName)
    // }

    type TagName = keyof HTMLElementTagNameMap & {};

    function createElement<T extends TagName>(
      tagName: T,
    ): HTMLElementTagNameMap[T] {
      return document.createElement(tagName);
    }

    const div = createElement("div");
  }
}
