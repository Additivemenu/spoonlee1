<template>
  <div class="person">
    <h1>scenario1: watch for ref-wrapped basic type variable</h1>
    <h2>current sum is: {{ sum }}</h2>
    <button @click="changeSum">click me to increase by 1</button>
  </div>
</template>

<!-- syntax sugar for setup: so that you don't have to return data and methods in a setup() method -->
<script setup lang="ts" name="Person">
import { ref, watch } from "vue";

// data
let sum = ref(0);

// methods
const changeSum = () => {
  sum.value += 1;
};

// watch => which is similar to useEffect in React
// ! no need to watch sum.value, just watch sum
const stopWatch = watch(sum, (newValue, oldValue) => {
  console.log(
    "sum has changed!",
    "new value: ",
    newValue,
    "old value: ",
    oldValue
  );

  if (newValue > 10) {
    console.log("sum is greater than 10, stop watching");
    stopWatch();    // does react have stop watching feature?
  }
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
