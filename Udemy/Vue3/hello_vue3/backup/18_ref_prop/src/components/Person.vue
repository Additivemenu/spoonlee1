<template>
  <div class="person">
    <h1>China</h1>
    <h2 ref="title2">Beijing</h2>
    <h3>Guigu</h3>
    <button @click="showLog">click me to output h2</button>
  </div>
</template>

<!-- syntax sugar for setup: so that you don't have to return data and methods in a setup() method -->
<script setup lang="ts" name="Person">
import { ref, defineExpose } from "vue";

// create a title2, to store the reference of h2 (similar to useRef in React)
let title2 = ref();
let a = ref(0);
let b = ref(1);
let c = ref(2);

function showLog() {
  console.log(title2.value);
}

// this is similar to forwardRef and imeprativeHandle in React, expose internal structure to parent component
defineExpose({
  a,
  b,
});
</script>

<!-- scoped will confine the css selector only to this Vue template -->
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
