<template>
  <div class="person">
    <h2>when temp >= 60 degrees, or height >= 80 cm, send request to server</h2>
    <h2>current water temperature is: {{ temp }} degrees</h2>
    <h2>current water height is: {{ height }} cm</h2>
    <button @click="changeSum">temp + 10</button>
    <button @click="changeHeight">height + 10</button>
  </div>
</template>

<!-- syntax sugar for setup: so that you don't have to return data and methods in a setup() method -->
<script setup lang="ts" name="Person">
import { watch, ref, watchEffect } from "vue";

// data
let temp = ref(10);
let height = ref(0);

// methods
function changeSum() {
  temp.value += 10;
}
function changeHeight() {
  height.value += 10;
}

// // watch - watch implementation: need to explicitly define the dependencies
// watch([temp, height], (newValue) => {
//   let [newTemp, newHeight] = newValue;

//   if (newTemp >= 60 || newHeight >= 80) {
//     console.log("send request to server");
//   }
// });

// watch - watchEffect implementation: no need to explicitly define the dependencies
watchEffect(() => {
  console.log("watchEffect");   
  if (temp.value >= 60 || height.value >= 80) {
    console.log("send request to server");
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
