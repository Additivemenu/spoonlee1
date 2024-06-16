<template>
  <div class="father">
    <h3>父组件</h3>
    <div class="content">
      <Category title="game list">
        <ul>
          <li v-for="g in games" :key="g.id">{{ g.name }}</li>
        </ul>
      </Category>
      <Category title="food city">
        <img :src="imgUrl" alt="an image" />
      </Category>
      <Category title="good movie">
        <video :src="videoUrl" controls></video>
      </Category>
    </div>
  </div>
</template>

<script setup lang="ts" name="Father">
import Category from "./Category.vue";
import { ref, reactive } from "vue";

// data
let games = reactive([
  { id: "aad1", name: "LOL" },
  { id: "aad2", name: "PUBG" },
  { id: "aad3", name: "GTA5" },
]);
let imgUrl = ref("https://z1.ax1x.com/2023/11/19/piNxLo4.jpg");
let videoUrl = ref(
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
);
</script>

<style scoped>
.father {
  background-color: rgb(165, 164, 164);
  padding: 20px;
  border-radius: 10px;
}
.content {
  display: flex;
  justify-content: space-evenly;
}
img,
video {
  width: 100%;
}
</style>
