<template>
  <div class="person">
    <h2>name: {{ name }}</h2>
    <h2>age: {{ age }} / {{ yearsOld }} / {{ person.age }}</h2>
    <button @click="changeName">change name</button>
    <button @click="changeAge">change age</button>
  </div>
</template>

<!-- syntax sugar for setup: so that you don't have to return data and methods in a setup() method -->
<script setup lang="ts" name="Person">
import { ref, reactive, toRefs, toRef } from "vue";

// data -----------
let person = reactive({ name: "Max", age: 30 });

let { name, age } = toRefs(person); // ! this is how you destructure a reactive object
let yearsOld = toRef(person, "age");   // ! this is how you get a single property from a reactive object

// methods --------
function changeName() {
  name.value += "~"; // this also changes property.name
}

function changeAge() {
  age.value += 1; // this also changes property.age
}
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
