<template>
  <div>
    <h2>Modal Title</h2>
    <p>This is the modal content.</p>
    <button @click="closeModal">Close</button>
  </div>
</template>

<script setup>
const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};
</script>
