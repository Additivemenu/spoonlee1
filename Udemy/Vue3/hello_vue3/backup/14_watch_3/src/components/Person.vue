<template>
  <div class="person">
    <h1>scenario3: watch for reactive-wrapped object-type variable</h1>
    <h2>name: {{ person.name }}</h2>
    <h2>age: {{ person.age }}</h2>
    <button @click="changeName">change name</button>
    <button @click="changeAge">change age</button>
    <button @click="changePerson">change person</button>
  </div>
</template>

<!-- syntax sugar for setup: so that you don't have to return data and methods in a setup() method -->
<script setup lang="ts" name="Person">
import { reactive, watch } from "vue";

// data
let person = reactive({
  name: "tom",
  age: 18,
});

// methods
const changeName = () => {
  person.name += "~"; // just change a field of the object
};
const changeAge = () => {
  person.age += 1; // just change a field of the object
};

const changePerson = () => {
  // overwrite object field values (not change person address)
  Object.assign(person, {
    name: "jerry",
    age: 20,
  });
};

// watch
/**
 * watch for reactive wrapped object-type variable, deep watch by default (you cannot disable such deep watch)
 */
watch(person, (newValue, oldValue) => {
  console.log("person has changed!", newValue, oldValue);
});
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
