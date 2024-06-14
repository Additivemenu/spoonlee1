<template>
  <Person :list="personList" />
</template>

<script lang="ts" setup name="App">
import Person from "./components/Person.vue";
import { reactive } from "vue";
import { type Persons } from "./types";

// this will pass to child component
let personList = reactive<Persons>([
  { id: "a1", name: "John", age: 20 },
  { id: "a2", name: "Doe", age: 30 },
  { id: "a3", name: "Smith", age: 40 },
]);
</script>

<style></style>
