<template>
  <div class="news">
    <!-- navbar -->
    <ul>
      <li v-for="news in newsList" :key="news.id">
        <!-- 1st way -->
        <!-- <RouterLink
          :to="`/news/detail/${news.id}/${news.title}/${news.content}`"
          >{{ news.title }}</RouterLink
        > -->
        <!-- 2nd way -->
        <RouterLink
          :to="{
            name: 'newsDetail',
            params: {
              id: news.id,
              title: news.title,
              content: news.content,
            },
          }"
          >{{ news.title }}</RouterLink
        >
      </li>
    </ul>
    <!-- display content -->
    <div class="news-content">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup lang="ts" name="News">
import { reactive } from "vue";
import { RouterView, RouterLink } from "vue-router";

const newsList = reactive([
  { id: "aa1", title: "news1", content: "news1 content" },
  { id: "ab2", title: "news2", content: "news2 content" },
  { id: "ac3", title: "news3", content: "news3 content" },
  { id: "ad4", title: "news4", content: "news4 content" },
]);
</script>

<style scoped>
/* 新闻 */
.news {
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  height: 100%;
}
.news ul {
  margin-top: 30px;
  list-style: none;
  padding-left: 10px;
}
.news li > a {
  font-size: 18px;
  line-height: 40px;
  text-decoration: none;
  color: #64967e;
  text-shadow: 0 0 1px rgb(0, 84, 0);
}
.news-content {
  width: 70%;
  height: 90%;
  border: 1px solid;
  margin-top: 20px;
  border-radius: 10px;
}
</style>
