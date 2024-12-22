{
  type Animal = {
    eat(): void;
  };
  type Pet = Animal & {
    run(): void;
  };
  type Dog = Pet & {
    bark(): void;
  };

  let a: Animal = {
    eat() {
      console.log("eat");
    },
  };

  let p: Pet = {
    eat() {
      console.log("eat");
    },
    run() {
      console.log("run");
    },
  };

  let d: Dog = {
    eat() {
      console.log("eat");
    },
    run() {
      console.log("run");
    },
    bark() {
      console.log("bark");
    },
  };
}

// TS中class类，也是结构化类型，当然在类型兼容性上支持的就是协变
class Animal {
  eat() {
    console.log("eat");
  }
}
class Pet extends Animal {
  run() {
    console.log("run");
  }
}
class Dog extends Pet {
  bark() {
    console.log("bark");
  }
}

let a = new Animal();
let p = new Pet();
let d = new Dog();

function feed(pet: Pet) {
  pet.run();
  return pet;
}

// feed(a); // Error
feed(p);
feed(d);

// 在TS中，函数的类型兼容性非常特殊
// 在不考虑this 的情况下，满足一下条件，可以说函数A是函数B的子类型
// 1、函数A的参数数量小于或者等于函数B的参数数量
// 2、函数A的返回类型是函数B返回类型的子类型，也就是支持协变
// 3、函数A的各个参数的类型是函数B相应参数的父类型，也就是参数支持逆变
function clone(f: (p: Pet) => Pet): void {
  // ...
  let parent = new Pet();
  let child = f(parent); // 如果返回值类型是父类型，下面对象的调用是不安全
  child.run();
}

// 现在有下面不同的几个函数
function petToPet(p: Pet): Pet {
  // todos...
  return new Pet();
}

function petToDog(p: Pet): Dog {
  // todos...
  return new Dog();
}

function petToAnimal(p: Pet): Animal {
  // todos...
  return new Animal();
}

clone(petToPet);
clone(petToDog);
// clone(petToAnimal);

function animalToPet(a: Animal): Pet {
  // todos...
  return new Pet();
}

function dogToPet(d: Dog): Pet {
  // todos...
  // d.bark();
  return new Pet();
}

clone(petToPet);
clone(animalToPet);
clone(dogToPet);
