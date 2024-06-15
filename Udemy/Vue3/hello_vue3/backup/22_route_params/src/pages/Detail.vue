<template>
  <ul class="news-list">
    <li>id: {{ route.params.id }}</li>
    <li>title: {{ route.params.title }}</li>
    <li>description: {{ route.params.content }}</li>
  </ul>
</template>

<script setup lang="ts" name="About">
import { toRefs } from "vue";
import { useRoute } from "vue-router";

let route = useRoute(); //! note route is also reactive
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
