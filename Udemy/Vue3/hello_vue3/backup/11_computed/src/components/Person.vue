<template>
  <div class="person">
    firstName:
    <input type="text" v-model="firstName" /> <br />
    lastName:
    <input type="text" v-model="lastName" /> <br />
    fullName:
    <span>{{ fullName }}</span>
    <button @click="changeFullName">change full name to Zhang-San</button>
  </div>
</template>

<!-- syntax sugar for setup: so that you don't have to return data and methods in a setup() method -->
<script setup lang="ts" name="Person">
import { ref, computed } from "vue";

let firstName = ref("Shawn");
let lastName = ref("Li");

// // similar to derived state in react,
// // whenever firstName or lastName changes, fullName will be recalculated
// // if firstName or lastName not change, fullName will reuse the previous value
// // the computed value defined here cannot be modified directly, it's read-only
// let fullName = computed(() => {
//   return (
//     firstName.value.slice(0, 1).toUpperCase() +
//     firstName.value.slice(1) +
//     "-" +
//     lastName.value.slice(0, 1).toUpperCase() +
//     lastName.value.slice(1)
//   );
// });

// this is how you define a computed property with setter, being readable and writable
let fullName = computed({
  get() {
    return (
      firstName.value.slice(0, 1).toUpperCase() +
      firstName.value.slice(1) +
      "-" +
      lastName.value.slice(0, 1).toUpperCase() +
      lastName.value.slice(1)
    );
  },
  set(val) {
    const [str1, str2] = val.split("-");
    firstName.value = str1;
    lastName.value = str2;
  },
});

function changeFullName() {
  fullName.value = "Zhang-San"; // this forward the value to the setter of computed property
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

li {
  font-size: 20px;
}
</style>
