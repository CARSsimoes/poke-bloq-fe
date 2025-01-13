<script setup lang="ts">
interface Props {
  text: string
  action: () => void
}

defineProps<Props>()
</script>
<template>
  <button @click="action">{{ text }}</button>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables' as vars;

button {
  padding: 0.25rem 0.5rem;
  background-color: vars.$secondary-color;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
}
</style>
