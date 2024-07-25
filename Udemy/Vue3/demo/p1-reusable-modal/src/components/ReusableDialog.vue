<template>
    <el-dialog :visible.sync="isVisible" @close="closeDialog">
      <component :is="dialogContentComponent"></component>
    </el-dialog>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import { ElDialog } from 'element-plus';
  
  const props = defineProps({
    visible: {
      type: Boolean,
      required: true
    },
    dialogContentComponent: {
      type: Object,
      required: true
    }
  });
  
  const emit = defineEmits(['update:visible']);
  
  const isVisible = ref(props.visible);
  
  const closeDialog = () => {
    isVisible.value = false;
    emit('update:visible', false);
  };
  
  watch(() => props.visible, (newVal) => {
    isVisible.value = newVal;
  });
  </script>
  
