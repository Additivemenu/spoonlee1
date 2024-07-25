<template>
  <div>
    <button @click="openModal">Open Modal</button>

    <!-- v-model in a component -> pass the isModalOpen state to <Modal> -->
    <!-- The v-model directive is used here to create a two-way binding between isModalOpen and the show prop in Modal.vue. -->
    <!-- @close is a custom event handler -->
    <Modal v-model="isModalOpen">
      <!-- when slot and component element used together? -->
      <component :is="modalContentComponent" @close="closeModal"></component>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Modal from "./components/modals/Modal.vue";
import ModalContent from "./components/modals/ModalContent.vue";

const isModalOpen = ref(false);
const modalContentComponent = ref(null); // TODO: so ref can be a component -> we can pass component as variable ?

const openModal = () => {
  modalContentComponent.value = ModalContent;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};
</script>
