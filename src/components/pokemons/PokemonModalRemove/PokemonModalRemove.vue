<script setup lang="ts">
import Modal from '@/components/app/AppModal/AppModal.vue'
import { ref } from 'vue'

const isModalVisible = ref(false)

const openModal = () => {
  isModalVisible.value = true
}

const closeModal = () => {
  isModalVisible.value = false
}
</script>

<template>
  <button @click="openModal">Open Modal</button>

  <Modal :isVisible="isModalVisible" @close="closeModal">
    <template #header>
      <h2>Modal Header</h2>
    </template>
    <template #body>
      <p>This is the body of the modal.</p>
    </template>
    <template #bottom>
      <button @click="closeModal">Close</button>
    </template>
  </Modal>
</template>
