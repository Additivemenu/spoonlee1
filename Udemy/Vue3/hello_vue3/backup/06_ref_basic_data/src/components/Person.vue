<template>
  <div class="person">
    <h2>name: {{ name }}</h2>
    <p>age: {{ age }}</p>
    <p>address: {{ address }}</p>
    <button @click="changeName">modify name</button>
    <button @click="changeAge">modify age</button>
    <button @click="showTel">check out tel</button>
  </div>
</template>

<!-- syntax sugar for setup: so that you don't have to return data and methods in a setup() method -->
<script setup lang="ts" name="Person">
import { ref } from "vue";

// data
let name = ref("tommy"); 
let age = ref(18);
let tel = "12315552";
let address = "123 main st";

// methods
function changeName() {
  name.value = "alice";     // ! need to treat name as ref object in script tag, but no need to do so in template tag
}
function changeAge() {
  age.value += 1;
}
function showTel() {
  alert(tel);
}
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
</style>
