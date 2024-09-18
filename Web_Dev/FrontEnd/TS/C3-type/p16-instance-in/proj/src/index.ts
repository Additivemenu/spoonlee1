{
  class Animal {
    eat() {
      console.log("Animal eating");
    }
  }

  class Dog extends Animal {
    eat() {
      console.log("Dog eating");
    }

    bark() {
      console.log("Dog barking");
    }
  }

  class Cat extends Animal {
    eat() {
      console.log("Cat eating");
    }

    meow() {
      console.log("Cat meowing");
    }
  }

  function feedAnimal(animal: Animal) {
    // polymorphism: instanceof  -> type narrowing
    if (animal instanceof Dog) {
      animal.bark();
    } else if (animal instanceof Cat) {
      animal.meow();
    } else {
      animal.eat();
    }
  }

  feedAnimal(new Dog());

}

{
  const obj = { a: 123 };

  if ("a" in obj) {
    console.log("有a属性");
  }

  type Circle = {
    kind: "circle";
    radius: number;
  };

  type Rectangle = {
    kind: "rectangle";
    width: number;
    height: number;
  };

  type Triangle = {
    kind: "triangle";
    base: number;
    height: number;
  };

  type Shape = Circle | Rectangle | Triangle;

  function printArea(shape: Shape) {
    if ("radius" in shape) {
      console.log(Math.PI * shape.radius ** 2); // shape Type: Circle
    } else if ("width" in shape) {
      console.log(shape.width * shape.height); // shape Type: Rectangle
    } else {
      console.log((shape.base * shape.height) / 2); // shape Type: Triangle
    }
  }
}
