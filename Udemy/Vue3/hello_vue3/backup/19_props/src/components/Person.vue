<template>
  <div class="person">
    <ul>
      <li v-for="p in list" :key="p.id">{{ p.name }} -- {{ p.age }}</li>
    </ul>
  </div>
</template>

<!-- syntax sugar for setup: so that you don't have to return data and methods in a setup() method -->
<script setup lang="ts" name="Person">
import { withDefaults } from "vue";
import { type Persons } from "@/types";

// receive props and confine its type (just like parsing args in functional component in React)
// defineProps is macro function, no need to import from vue
withDefaults(defineProps<{ list?: Persons }>(), {
  list: () => [{ id: "as1", name: "jerry", age: 12 }],
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
