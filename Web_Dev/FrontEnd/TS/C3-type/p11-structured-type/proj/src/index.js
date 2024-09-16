"use strict";
const person = {
    name: 'John',
    age: 30
};
// const animal: Animal = {
//   name: 'Dog',
//   age: 5
// } 
const animal = person;
function greet(person) {
    console.log(`Hello ${person.name}`);
}
greet(animal);
