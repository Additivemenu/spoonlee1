<template>
  <div>
    <h2>Dynamic Content</h2>
    <p>This is the content of the dialog.</p>
    <el-button @click="close">Close</el-button>
  </div>
</template>

<script setup>
const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};
</script>
