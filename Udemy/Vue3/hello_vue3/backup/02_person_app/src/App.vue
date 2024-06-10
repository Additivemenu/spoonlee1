<template>
  <!-- html -->
  <div class="app">
    <h1>hello!</h1>
    <Person />
  </div>
</template>

<script lang="ts">
import Person from "./components/Person.vue";

export default {
  name: "app", // component name
  components: {
    Person, // register child components
  },
};
</script>

<style>
/* css */
.app {
  background-color: #ddd;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
}
</style>
