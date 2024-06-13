<template>
  <div class="person">
    <h1>scenario2: watch for ref-wrapped object-type variable</h1>
    <h2>name: {{ person.name }}</h2>
    <h2>age: {{ person.age }}</h2>
    <button @click="changeName">change name</button>
    <button @click="changeAge">change age</button>
    <button @click="changePerson">change person</button>
  </div>
</template>

<!-- syntax sugar for setup: so that you don't have to return data and methods in a setup() method -->
<script setup lang="ts" name="Person">
import { ref, watch } from "vue";

// data
let person = ref({
  name: "tom",
  age: 18,
});

// methods
const changeName = () => {
  person.value.name += "~"; // just change a field of the object
};
const changeAge = () => {
  person.value.age += 1; // just change a field of the object
};

const changePerson = () => {
  // change the whole object
  person.value = {
    name: "jerry",
    age: 20,
  };
};

// watch
/**
 * watch for ref wrapped object-type variable, actually it's watching for the reference of the object
 * if you want to watch for inner properties of the object, you need to config the watch by passing the 3rd argument
 * watch 1st argument: ref wrapped object-type variable
 * watch 2nd argument: callback function
 * watch 3rd argument: config object (deep, immediate ... etc)
 */
watch(
  person,
  (newValue, oldValue) => {
    console.log("person has changed!", newValue, oldValue);
  },
  { deep: true }
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
