<template>
  <div>
    <el-button @click="openDialog">Open Dialog</el-button>
    <ReusableDialog
      :visible="isDialogOpen"
      :dialogContentComponent="dialogContentComponent"
      @update:visible="closeDialog"
    >
    </ReusableDialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ReusableDialog from "./components/ReusableDialog.vue";
import DynamicContent from "./components/DynamicContent.vue";


const isDialogOpen = ref(false);
const dialogContentComponent = ref(null);

const openDialog = () => {
  dialogContentComponent.value = DynamicContent;
  isDialogOpen.value = true;

  debugger;
};

const closeDialog = () => {
  isDialogOpen.value = false;
};
</script>
