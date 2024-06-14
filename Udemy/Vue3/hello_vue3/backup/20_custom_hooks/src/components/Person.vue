<template>
  <div class="person">
    <h2>current sum is {{ sum }}, 10 times is {{ bigSum }}</h2>
    <button @click="add">sum + 1</button>
    <hr />
    <img v-for="(dog, index) in dogList" :src="dog" :alt="dog" :key="index" />
    <br />
    <button @click="getDog">give me another dog</button>
  </div>
</template>

<!-- syntax sugar for setup: so that you don't have to return data and methods in a setup() method -->
<script setup lang="ts" name="Person">
import useSum from "@/hooks/useSum";
import useDog from "@/hooks/useDog";

const { sum, bigSum, add } = useSum();
const { dogList, getDog } = useDog();
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
img {
  width: 200px;
  margin: 10px;
}
</style>
