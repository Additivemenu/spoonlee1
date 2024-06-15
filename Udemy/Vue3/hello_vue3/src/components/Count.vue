<template>
  <div class="count">
    <h2>current sum is:{{ sum }}</h2>
    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="add">sum</button>
    <button @click="minus">subtract</button>
  </div>
</template>

<script setup lang="ts" name="Count">
import { ref } from "vue";

let sum = ref(1); // current sum
let n = ref(1); // user chosen number

// methods
function add() {
  sum.value += n.value;
}

function minus() {
  sum.value -= n.value;
}
</script>

<style scoped>
.count {
  background-color: skyblue;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px;
}

select,
button {
  margin: 0 5px;
  height: 25px;
}
</style>
