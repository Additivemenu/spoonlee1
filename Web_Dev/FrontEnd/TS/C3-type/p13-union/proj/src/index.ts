let width: number | string = 100;
width = "200px";

type Color = "red" | "blue" | "green";
// let color: Color = "yellow"; // Error: Type '"yellow"' is not assignable to type 'Color'.

{
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

  const person1: Person = { name: "John", score: 90 };
  const person2: Person = { name: "Jane", age: 30, subject: "Math" };
  const person3: Person = {
    name: "Doe",
    score: 80,
    age: 40,
    subject: "Science",
  }; // ! it is ok to assign a value that has all properties of both types
  // const person4: Person = { name: "Doe" };   // Error: Type '{ name: string; }' is not assignable to type 'Person'

  // ! but it pops error if we try to access properties that are not common in both types
  console.log(person3.name);
  //console.log(person3.age); // error: Property 'age' does not exist on type 'Person'. Property 'age' does not exist on type 'Student'.
  console.log((person3 as Teacher).age); // OK
  //console.log(person3.score); // error: Property 'score' does not exist on type 'Person'. Property 'score' does not exist on type 'Teacher'.
  console.log((person3 as Student).score); // OK
}

{
  type Color = "黑色" | "白色" | "褐色" | "花色";
  type Breed = "英短" | "中华田园猫" | "暹罗猫" | "孟买猫";

  type Cat = {
    name: string;
    age: number;
    color?: Color; // Color | undefined
    breed?: Breed;
    gender: "male" | "female";
  };

  const cat: Cat = {
    name: "tom",
    age: 2,
    color: "花色",
    breed: "中华田园猫",
    gender: "male",
  };
  cat.breed = "暹罗猫";

  // Cat | undefined
  function getCat() {
    if (Math.random() > 0.5) {
      return cat;
    }
  }
}
