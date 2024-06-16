<template>
  <div class="count">
    <h2>current sum is: {{ sum }}, times 10 is {{ bigSum }}</h2>
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
import { useCountStore } from "@/store/count";
import { storeToRefs } from "pinia";

const countStore = useCountStore();
const { sum, bigSum } = storeToRefs(countStore); // deconstruct state from store (toRef is used to deconstruct the whole store)

let n = ref(1); // user chosen number

// methods
function add() {
  // 1st way to change state: change individual property directly
  // countStore.sum += n.value;

  // 2nd way to change state: patch modify the state (similar to setState in react)
  // countStore.$patch({ sum: countStore.sum + n.value });

  // 3rd way to change state: use action (similar to redux)
  countStore.increment(n.value);
}

function minus() {
  countStore.decrement(n.value);
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
