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

<style scoped lang="scss">
th {
  padding: 0.75rem;
  text-align: center;
}

th {
  background-color: $white;
}
</style>
