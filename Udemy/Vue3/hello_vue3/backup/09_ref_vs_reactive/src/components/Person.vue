<template>
  <div class="person">
    <h2>a car {{ car.brand }} with price {{ car.price }}k</h2>
    <button @click="changePrice">modify car price</button>
    <button @click="changeBrand">modify car brand</button>
    <button @click="changeCar">modify car</button>
    <hr />
    <h2>current sum is : {{ sum }}</h2>
    <button @click="changeSum">click me to sum +1</button>
  </div>
</template>

<!-- syntax sugar for setup: so that you don't have to return data and methods in a setup() method -->
<script setup lang="ts" name="Person">
import { ref, reactive } from "vue";

// data --------
let car = reactive({ brand: "BMW", price: 100 }); // reactive object
let sum = ref(0);

// methods -----
// we directly manipulate the reactive objects, unlike react where we have to make a new copy of the state to use setState()
function changePrice() {
  car.price += 10;
}
function changeBrand() {
  car.brand = "Audi";
}
function changeCar() {
  // car = { brand: "Mercedes", price: 200 };    // this won't work 
  Object.assign(car, { brand: "Mercedes", price: 200 });  // this will work
}

function changeSum() {
  sum.value += 1;
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
