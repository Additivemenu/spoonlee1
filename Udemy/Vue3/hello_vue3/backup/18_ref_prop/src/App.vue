<template>
  <!-- html -->

  <h2 ref="title2">hello</h2>
  <button @click="showLog">click me to output h2</button>

  <Person ref="ren" />
</template>

<script lang="ts" setup name="App">
// JS
import Person from "./components/Person.vue";
import { ref } from "vue";

let title2 = ref();
let ren = ref();

function showLog() {
  console.log(ren.value);
}
</script>

<style>
/* css */
</style>
