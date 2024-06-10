<template>
  <!-- html -->

  <Person />
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
</style>
