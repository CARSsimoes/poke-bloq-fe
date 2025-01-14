<script setup lang="ts">
interface Props {
  isVisible: boolean
}

defineProps<Props>()

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}
</script>

<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-content">
      <header class="modal-header">
        <slot name="header"></slot>
      </header>
      <slot name="body"></slot>
      <footer class="modal-footer">
        <slot name="bottom"></slot>
      </footer>
      <button class="modal-close" @click="closeModal">×</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables' as vars;

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: vars.$box-shadow;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: vars.$white;
  padding: 1.5rem;
  border-radius: 1.25rem;
  box-shadow: 0 0.25rem 0.5rem vars.$box-shadow;
  position: relative;
  max-width: 30rem;
  width: 80%;
  @media (min-width: 720px) {
    width: 100%;
  }
}

.modal-header,
.modal-footer {
  display: flex;
  gap: 1rem;
}

.modal-close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
