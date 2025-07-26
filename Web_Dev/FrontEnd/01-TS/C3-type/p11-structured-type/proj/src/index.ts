{
  type Person = {
    name: string;
    age: number;
  };

  type Animal = {
    name: string;
    age: number;
  };

  const person: Person = {
    name: "Jack",
    age: 25,
  };

  const animal: Animal = person; // 结构化类型系统, 只要属性和方法相同, 就可以认为是同一个类型

  function greet(person: Person) {
    console.log(`Hello, ${person.name}`);
  }

  greet(animal); // 结构化类型系统, 只要属性和方法相同, 就可以认为是同一个类型
  greet({ name: "Cat", age: 3 }); // 结构化类型系统, 只要属性和方法相同, 就可以认为是同一个类型
}

{
  class User {
    constructor(public name: string, public age: number) {}
  }

  class Person {
    constructor(public name: string, public age: number) {}
  }

  const user = new User("Jack", 25);
  const person: Person = user; // 结构化类型系统, 只要属性和方法相同, 就可以认为是同一个类型
}
