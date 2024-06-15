<template>
  <ul class="news-list">
    <li>id: {{ id }}</li>
    <li>title: {{ title }}</li>
    <li>description: {{ content }}</li>
  </ul>
</template>

<script setup lang="ts" name="About">
defineProps(["id", "title", "content"]); //  retrieving props from props passed in
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
