<template>
  <div class="person">
    <h2>a car {{ car.brand }} with price {{ car.price }}k</h2>
    <button @click="changePrice">modify car price</button>
    <br />
    <h2>game list</h2>
    <ul>
      <!-- this is Vue's flavour of doing array.map() -->
      <li v-for="g in games" :key="g.id">{{ g.name }}</li>
    </ul>
    <button @click="changeFirstGame">modify first game name</button>
  </div>
</template>

<!-- syntax sugar for setup: so that you don't have to return data and methods in a setup() method -->
<script setup lang="ts" name="Person">
import { ref } from "vue";

// data
let car = ref({ brand: "BMW", price: 100 }); // reactive object
let games = ref([
  { id: "1", name: "game1" },
  { id: "2", name: "game2" },
  { id: "3", name: "game3" },
]); // reactive object (array)

// methods
// we directly manipulate the reactive objects, unlike react where we have to make a new copy of the state to use setState()
function changePrice() {
  car.value.price += 10;
}
function changeFirstGame() {
  games.value[0].name = "new game name";
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
