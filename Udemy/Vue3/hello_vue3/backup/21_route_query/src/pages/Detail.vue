<template>
  <ul class="news-list">
    <li>id: {{ query.id }}</li>
    <li>title: {{ query.title }}</li>
    <li>description: {{ query.content }}</li>
  </ul>
</template>

<script setup lang="ts" name="About">
import { toRefs } from "vue";
import { useRoute } from "vue-router";

let route = useRoute(); //! note route is also reactive
let { query } = toRefs(route); // deconstruct query from route, and keep it reactive
</script>

<style scoped>
.news-list {
  list-style: none;
  padding-left: 20px;
}

.news-list > li {
  line-height: 30px;
}
</style>
