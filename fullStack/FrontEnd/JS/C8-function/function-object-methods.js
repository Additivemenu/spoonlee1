{
  function greet(greeting, punctuation) {
    console.log(greeting + ", " + this.name + punctuation);
  }

  const person = {
    name: "Shawn",
  };

  const greetShawn = greet.bind(person, "Hi");

  greetShawn("!"); // Output: "Hi, Shawn!"
}

{
  const person = {
    name: "Shawn",
    greet: function () {
      console.log("Hello, " + this.name);
    },
  };

  setTimeout(person.greet.bind(person), 1000); // Output after 1 second: "Hello, Shawn"
  setTimeout(person.greet, 1000); // ! Output after 1 second: "Hello, undefined"
}


