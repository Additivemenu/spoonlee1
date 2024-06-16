<template>
  <div class="father">
    <h3>父组件</h3>
    <h4>汽车：{{ car }}</h4>
    <h4 v-show="toy">子给的玩具：{{ toy }}</h4>

    <!-- !pass props to child using tag as props -->
    <Child :car="car" :sendToy="getToy" />
  </div>
</template>

<script setup lang="ts" name="Father">
import Child from "./Child.vue";
import { ref } from "vue";
// 数据
let car = ref("奔驰");
let toy = ref(""); // ! 其实还是state lifting

// 方法
// child component will call this method to set value for toy
function getToy(value: string) {
  toy.value = value;
}
</script>

<style scoped>
.father {
  background-color: rgb(165, 164, 164);
  padding: 20px;
  border-radius: 10px;
}
</style>
