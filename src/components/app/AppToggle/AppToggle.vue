<script setup lang="ts">
interface Props {
  option1: string
  option2: string
  toggleMethod: () => void
}

const props = defineProps<Props>()

const handleToggle = () => {
  props.toggleMethod()
}
</script>

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

<style scoped lang="scss">
.app-toggle-container {
  position: relative;
  width: 100%;
  min-width: 8rem;
  height: 2.5rem;
  margin-top: 0.5rem;
  border: 0.0625rem solid $dark;
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
  background: $primary-color;
  border-radius: 1.25rem;
}

.app-toggle-container input[type='checkbox']:checked + .app-toggle_back {
  background: $primary-color;
}

.app-toggle-container input[type='checkbox'] + .app-toggle_back .app-toggle__empty {
  display: block;
  position: absolute;
  content: ' ';
  background: $white;
  width: 50%;
  height: 100%;
  transition: margin 150ms linear;
  border: 0.0625rem solid $dark;
  border-radius: 1.25rem;
}

.app-toggle-container input[type='checkbox']:checked + .app-toggle_back .app-toggle__empty {
  margin-left: 50%;
}

.app-toggle-container .app-toggle-label {
  display: block;
  position: absolute;
  width: 50%;
  color: $white;
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
  color: $white;
}

.app-toggle-container
  input[type='checkbox']
  + .app-toggle_back
  .app-toggle-label.app-toggle-label__second-option {
  color: $white;
}

.app-toggle-container
  input[type='checkbox']:checked
  + .app-toggle_back
  .app-toggle-label.app-toggle-label__second-option {
  color: $white;
}
</style>
