<template>
  <label class="app-toggle-container">
    <input type="checkbox" @click="handleToggle" />
    <span class="app-toggle_back">
      <span class="app-toggle__empty"></span>
      <span class="app-toggle-label app-toggle-label__first-option">{{ option1 }}</span>
      <span class="app-toggle-label app-toggle-label__second-option">{{ option2 }}</span>
    </span>
  </label>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  option1: {
    type: String,
    default: 'On',
  },
  option2: {
    type: String,
    default: 'Off',
  },
  initialViewMode: {
    type: Boolean,
    default: true,
  },
  toggleMethod: {
    type: Function,
    required: true,
  },
})

const handleToggle = () => {
  props.toggleMethod()
}
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as vars;

.app-toggle-container {
  position: relative;
  width: 100%;
  height: 2.5rem;
  margin-top: 0.5rem;
  border: 0.0625rem solid vars.$dark;
  border-radius: 1.25rem;
}

.app-toggle-container input[type='checkbox'] {
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
}

.app-toggle-container input[type='checkbox'] + .app-toggle_back {
  position: absolute;
  width: 100%;
  height: 100%;
  background: vars.$primary-color;
  border-radius: 1.25rem;
}

.app-toggle-container input[type='checkbox']:checked + .app-toggle_back {
  background: vars.$secondary-color;
}

.app-toggle-container input[type='checkbox'] + .app-toggle_back .app-toggle__empty {
  display: block;
  position: absolute;
  content: ' ';
  background: vars.$white;
  width: 50%;
  height: 100%;
  transition: margin 150ms linear;
  border: 0.0625rem solid vars.$dark;
  border-radius: 1.25rem;
}

.app-toggle-container input[type='checkbox']:checked + .app-toggle_back .app-toggle__empty {
  margin-left: 50%;
}

.app-toggle-container .app-toggle-label {
  display: block;
  position: absolute;
  width: 50%;
  color: vars.$white;
  line-height: 2.5rem;
  text-align: center;
  font-size: 1.25rem;
  font-weight: bold;
}

.app-toggle-container .app-toggle-label.app-toggle-label__first-option {
  left: 0;
}

.app-toggle-container .app-toggle-label.app-toggle-label__second-option {
  right: 0;
}

.app-toggle-container
  input[type='checkbox']:checked
  + .app-toggle_back
  .app-toggle-label.app-toggle-label__first-option {
  color: vars.$white;
}

.app-toggle-container
  input[type='checkbox']
  + .app-toggle_back
  .app-toggle-label.app-toggle-label__second-option {
  color: vars.$white;
}

.app-toggle-container
  input[type='checkbox']:checked
  + .app-toggle_back
  .app-toggle-label.app-toggle-label__second-option {
  color: vars.$white;
}
</style>
