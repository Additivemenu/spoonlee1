<!-- the component that we see as a modal  -->
<template>
  <div v-if="props.modelValue" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";


const props = defineProps({
  // passed from v-model in the parent component? 
  modelValue: {
    type: Boolean,
    required: true,
  },
});


const emit = defineEmits(["update:modelValue"]);

// TODO: why need to have this two way binding and watch ? 
// const isVisible = ref(props.modelValue);  // TODO: ! what? a reactive passed down to a children needs to be reactified again?

const closeModal = () => {
  isVisible.value = false;
  emit("update:modelValue", false);
};

// // Watch for changes in the modelValue prop
// watch(
//   () => props.modelValue,
//   (newVal) => {
//     isVisible.value = newVal;
//   }
// );
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
}
</style>
