<script setup lang="ts">
interface Props {
  columns: string[]
}

defineProps<Props>()
</script>

<template>
  <thead>
    <tr>
      <th v-for="column in columns" :key="column">{{ column }}</th>
    </tr>
  </thead>
</template>
