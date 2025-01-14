<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import AppButton from '../AppButton/AppButton.vue'

const isScrollButtonVisible = ref(false)

const scrollToTop = () => {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
}

const handleScroll = () => {
  isScrollButtonVisible.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <AppButton
    :style="{ fontSize: 'x-large' }"
    text="🔝"
    :action="scrollToTop"
    class="app-button-go-to-top"
  />
</template>

<style scope lang="scss">
@use '@/assets/scss/variables' as vars;

.app-button-go-to-top {
  position: fixed;
  top: 50%;
  right: 1%;
  transform: translate(-50%, -50%);
  background-color: vars.$primary-color;
  color: vars.$black;
  border: none;
  border-radius: 1.25rem;
  cursor: pointer;
  button {
    font-size: 5rem;
    width: 3rem;
  }
  @media (min-width: 720px) {
    button {
      font-size: 5rem;
      width: 3rem;
    }
  }

  &.visible {
    opacity: 1;
  }
}
</style>
