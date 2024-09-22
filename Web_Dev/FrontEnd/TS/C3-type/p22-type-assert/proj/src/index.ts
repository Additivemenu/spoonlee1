{
  let someValue: any = "this is a string"; // 但我清楚知道这其实是一个字符串

  let strLength1: number = (<string>someValue).length;
  // 如果要写断言，建议用as，因为上面的形式在react中会有歧义。尖括号语法与JSX的标签语法相冲突

  let strLength2: number = (someValue as string).length;
}

{
  // ! use case: abstract -> concrete
  {
    // use case 1 - 联合类型断言: 相当于告诉ts我自己来负责类型安全
    type MyType = string | number | boolean;
    function getLength(type: MyType) {
      console.log((type as string).length); // but not very safe
    }
    getLength("hello world!");

    type Student = {
      name: string;
      score: number;
    };

    type Teacher = {
      name: string;
      age: number;
      subject: string;
    };

    type Person = Student | Teacher;

    function print(person: Person) {
      console.log(person.name);
      console.log((person as Student).score);
      console.log((person as Teacher).subject);
    }
  }

  {
    // use case 2 - 父类型断言为子类型 (down-casting);

    class Animal {
      eat() {
        console.log("animal eat");
      }
    }

    class Dog extends Animal {
      eat() {
        console.log("dog eat");
      }
      bark() {
        console.log("dog bark");
      }
    }

    class Cat extends Animal {
      eat() {
        console.log("cat eat");
      }
      meow() {
        console.log("cat meow");
      }
    }

    // 不太安全的写法
    function feed(animal: Animal) {
      (animal as Cat).meow(); // down-casting
    }

    // 相对更安全的写法
    function feedAnimal(animal: Animal) {
      if (animal instanceof Cat) {
        animal.meow();
      } else if (animal instanceof Dog) {
        animal.bark();
      } else {
        animal.eat();
      }
    }

    const inputDom = document.querySelector("input") as HTMLInputElement;
    inputDom.addEventListener("change", (e) => {
      (e.target as HTMLInputElement).value;
    });
  }

  {
    // use case 3 - 将任何一个类型断言为any
    const obj = {
      name: "jack",
      age: 20,
    };

    (obj as any).gender = "male"; // 忽略类型检查
    console.log((obj as any).gender);
  }

  {
    // use case 4 - 将any/unknown 断言为具体类型 22min-
    // 3rd party library or legacy code,
    function getData(id: number): any {
      return {
        id: 1,
        name: "jack",
        age: 18,
      };
    }

    const user = getData(1); // user is any type

    interface User {
      id: number;
      name: string;
      age: number;
    }
    const user2 = getData(1) as User; // user2 is User type
    user2.name;
  }
}

{
  // 断言的限制
  {
    let str1: "hello" = "hello";
    let str2 = "world";
    str2 = str1;

    //str1 = str2; // ! Error: Type 'string' is not assignable to type '"hello"'.
    str1 = str2 as "hello"; // OK
  }

  {
    class Animal {
      eat() {
        console.log("animal eat");
      }
    }

    class Dog extends Animal {
      eat() {
        console.log("dog eat");
      }
      bark() {
        console.log("dog bark");
      }
    }

    class Cat extends Animal {
      eat() {
        console.log("cat eat");
      }
      meow() {
        console.log("cat meow");
      }
    }

    let a: Animal = new Animal();
    let b: Dog = new Dog();
    // a = b; // OK

    // b = a; // ! Error: Type 'Animal' is not assignable to type 'Dog'.
    b = a as Dog; // OK
    b.bark(); // not safe
  }
}

{
  // 非空断言
  {
    let maybeString: string | null = "hello";
    let definitelyString = maybeString!;
  }

  {
    function getRandom(length?: number) {
      if (!length) {
        return undefined;
      }

      return Math.random().toString(36).slice(-length);
    }
    let s = getRandom(6);
    // 可以使用类型断言
    (s as string).charAt(0);

    // 由于就是字符串和非空的处理，可以使用非空断言
    s!.charAt(0);
  }

  {
    type Box = {
      id: number;
      name: string;
    };

    function getBox(): Box | undefined {
      if (Math.random() > 0.5) {
        return {
          id: 1,
          name: "box1",
        };
      }
      return undefined;
    }

    function createProduction(box: Box) {
      // todos...
    }

    createProduction(getBox() as Box);
    // 非空断言
    createProduction(getBox()!);
  }
}

{
  // 双重断言
  let str = "123hello";
  let n = str as unknown as number; // ! not recommended, not type safe: TypeScript -> AnyScript
  console.log(typeof n); //
}

{
  // as const 断言
  let str = "hello" as const; // str type: "hello"
  //str = "world"; // ! Error: Type '"world"' is not assignable to type '"hello"'.

  let arr = [1, 2, 3] as const; // arr type: readonly [1,2,3]

  let obj = { x: 10, y: 20 } as const; // obj type: {readonly x: 10, readonly y: 20}
  //obj.x = 100; // ! Error: Cannot assign to 'x' because it is a read-only property.

  const person = {
    id: 1,
    name: "jack",
    address: {
      city: "chengdu",
      province: "sichuan",
    },
  } as const; // person type: {readonly id: 1; readonly name: "jack"; readonly address: {readonly city: "chengdu"; readonly province: "sichuan";}}

  // 常用的: array -> 字面量联合类型
  const roles = ["角色列表", "用户删除", "用户查询", "权限详情"] as const;
  type Role = (typeof roles)[number]; //"角色列表" | "用户删除" | "用户查询" | "权限详情"

  {
    // an more complex example - learned from rhombus ai project
    const ADVANCED_METHODS = ["knn", "random-forest", "svm"] as const;
    type AdvancedMethod = (typeof ADVANCED_METHODS)[number]; // "knn" | "random-forest" | "svm"
    const BASIC_METHODS = ["mean", "mode", "median"] as const;
    type BasicMethod = (typeof BASIC_METHODS)[number]; // "mean" | "mode" | "median"

    const isAdvancedMethod = (method: string): method is AdvancedMethod => {
      return ADVANCED_METHODS.includes(method as AdvancedMethod);
    };

    const isBasicMethod = (method: string): method is BasicMethod => {
      return BASIC_METHODS.includes(method as BasicMethod);
    };

    type KNNFormSchema = {
      method: "knn";
      knnParams: string;
      isAdvanced: boolean;
    };
    type RandomForestFormSchema = {
      method: "random-forest";
      randomForestParams: string;
      isAdvanced: boolean;
    };
    type SVMFormSchema = {
      method: "svm";
      svmParams: string;
      isAdvanced: boolean;
    };
    type MeanFormSchema = {
      method: "mean";
      meanParams: string;
    };
    type ModeFormSchema = {
      method: "mode";
      modeParams: string;
    };
    type MedianFormSchema = {
      method: "median";
      medianParams: string;
    };

    type FormSchema =
      | KNNFormSchema
      | RandomForestFormSchema
      | SVMFormSchema
      | MeanFormSchema
      | ModeFormSchema
      | MedianFormSchema;

    function getFormSchema(method: AdvancedMethod | BasicMethod): FormSchema {
      if (isAdvancedMethod(method)) {
        // method type: "knn" | "random-forest" | "svm"
        switch (method) {
          case "knn":
            return { method: "knn", knnParams: "", isAdvanced: true };
          case "random-forest":
            return {
              method: "random-forest",
              randomForestParams: "",
              isAdvanced: true,
            };
          case "svm":
            return { method: "svm", svmParams: "", isAdvanced: true };
        }
      } else if (isBasicMethod(method)) {
        // method type: "mean" | "mode" | "median"
        switch (method) {
          case "mean":
            return { method: "mean", meanParams: "" };
          case "mode":
            return { method: "mode", modeParams: "" };
          case "median":
            return { method: "median", medianParams: "" };
        }
      } else {
        return { method: "mean", meanParams: "" };
      }
    }
  }
}
