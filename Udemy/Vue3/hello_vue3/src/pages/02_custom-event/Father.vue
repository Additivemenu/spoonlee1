<template>
  <div class="father">
    <h3>父组件</h3>
    <h4 v-show="toy">子给的玩具：{{ toy }}</h4>
    <!-- 给子组件Child绑定custom event @send-toy with method "sendToy", 
	 as you bound @send-toy event on Child, you need to define send-toy event in Child-->
    <Child @send-toy="saveToy" />
  </div>
</template>

<script setup lang="ts" name="Father">
import Child from "./Child.vue";
import { ref } from "vue";
// 数据
let toy = ref(""); // ! essentially still state lifting, but using event-driven programming

// 用于保存传递过来的玩具
function saveToy(value: string) {
  console.log("saveToy", value);
  toy.value = value;
}
</script>

<style scoped>
.father {
  background-color: rgb(165, 164, 164);
  padding: 20px;
  border-radius: 10px;
}
.father button {
  margin-right: 5px;
}
</style>
