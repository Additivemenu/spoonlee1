<template>
  <div class="person">
    <h2>name: {{ person.name }}</h2>
    <h2>age: {{ person.age }}</h2>
    <h2>car: {{ person.car.c1 }}, {{ person.car.c2 }}</h2>
    <button @click="changeName">change name</button>
    <button @click="changeAge">change age</button>
    <button @click="changeC1">change 1st car</button>
    <button @click="changeC2">change 2nd car</button>
    <button @click="changeCars">change cars</button>
  </div>
</template>

<!-- syntax sugar for setup: so that you don't have to return data and methods in a setup() method -->
<script setup lang="ts" name="Person">
import { reactive, watch } from "vue";

// data
let person = reactive({
  name: "tom",
  age: 18,
  car: {
    c1: "BMW",
    c2: "Audi",
  },
});

// methods
function changeName() {
  person.name += "~";
}

function changeAge() {
  person.age += 1;
}

function changeC1() {
  person.car.c1 = "Benz";
}

function changeC2() {
  person.car.c2 = "Toyota";
}

function changeCars() {
  //! this set a new object to person.car, which change the address of person.car
  person.car = {
    c1: "Ford",
    c2: "Honda",
  };
}

// watch
// scenario 4.1: watch reactive obj's property, and that property basic type variable
watch(
  () => person.name, // watch a getter function
  (newVal, oldVal) => {
    console.log("person.name changed", newVal, oldVal);
  }
);

// scenario 4.2: watch reactive obj's property, and that property is an object
// you could watch for person.car directly, but you could also watch for getter function (more recommended)
watch(
  () => person.car, // this watch for address change of person.car
  (newVal, oldVal) => {
    console.log("person.car changed", newVal, oldVal);
  },
  { deep: true } // manually set deep to true to watch for the change of person.car's inner property
);
</script>

<style scoped>
.person {
  background-color: skyblue;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
}

button {
  margin: 0 5px;
}

li {
  font-size: 20px;
}
</style>
