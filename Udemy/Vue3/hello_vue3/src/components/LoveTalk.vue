<template>
  <div class="talk">
    <button @click="getLoveTalk">get a love talk</button>
    <ul>
      <li v-for="talk in talkList" :key="talk.id">{{ talk.title }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts" name="">
import { reactive } from "vue";
import axios from "axios";
import { nanoid } from "nanoid";

// data
let talkList = reactive([
  { id: "aaa1", title: "talk1" },
  { id: "aaa2", title: "talk2" },
  { id: "aaa3", title: "talk3" },
]);

//methods
async function getLoveTalk() {
  let result = await axios.get(
    "https://api.uomg.com/api/rand.qinghua?format=json"
  );
  console.log(result.data.content);

  talkList.unshift({ id: nanoid(), title: result.data.content });
}
</script>

<style scoped>
.talk {
  background-color: orange;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px;
}
</style>
