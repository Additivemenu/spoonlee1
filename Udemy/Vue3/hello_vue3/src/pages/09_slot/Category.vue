<template>
  <div class="category">
    <h2>{{ title }}</h2>
    <!-- slot: just like children props in React  -->
    <slot>default content</slot>
  </div>
</template>

<script setup lang="ts" name="Category">
defineProps(["title"]);
</script>

<style scope>
.category {
  background-color: skyblue;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px;

  width: 200px;
  height: 300px;
}
h2 {
  background-color: orange;
  text-align: center;
  font-size: 18px;
  font-weight: 800;
}
</style>
