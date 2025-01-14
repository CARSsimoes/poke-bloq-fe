<script setup lang="ts">
const message = 'Loading, please wait...'
</script>

<template>
  <div class="app-loading">
    <div class="app-loading__spinner"></div>
    <p class="app-loading__message">{{ message }}</p>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables' as vars;

.app-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.app-loading__spinner {
  border: 1rem solid #f3f3f3;
  border-top: 1rem solid #3498db;
  border-radius: 50%;
  width: 8rem;
  height: 8rem;
  animation: spin 1s linear infinite;
}

.app-loading__message {
  margin-top: 1rem;
  font-size: 1.2rem;
  color: vars.$dark;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
