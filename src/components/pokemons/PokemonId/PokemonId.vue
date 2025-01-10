<script setup lang="ts">
interface Props {
  name: string
  image: string
}

defineProps<Props>()
</script>

<template>
  <p class="pokemon-id__title">{{ name }}</p>
  <img class="pokemon-id__img" :src="image" :alt="name" />
</template>

<style scoped lang="scss">
.pokemon-id__title {
  text-transform: capitalize;
}

.pokemon-id__img {
  width: 3rem;
  @media (min-width: 720px) {
    width: 6rem;
  }
}
</style>
