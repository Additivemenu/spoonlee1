<template>
  <div class="talk">
    <button @click="getLoveTalk">get a love talk</button>
    <ul>
      <li v-for="talk in talkList" :key="talk.id">
        {{ talk.title }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts" name="">
import { storeToRefs } from "pinia";
import { useTalkStore } from "@/store/loveTalk";

// data
const talkStore = useTalkStore();
const { talkList } = storeToRefs(talkStore);
talkStore.$subscribe((mutate, state) => {
  console.log("talkList changed", mutate, state);
  localStorage.setItem("talkList", JSON.stringify(state.talkList));
});

//methods
async function getLoveTalk() {
  await talkStore.getTalkList();
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
