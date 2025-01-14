<script setup lang="ts">
import PokeballButton from '../PokeballButton/PokeballButton.vue'

interface Props {
  name: string
  image: string
  caught: boolean
  id: number
}

defineProps<Props>()
</script>

<template>
  <div class="pokemon-id">
    <p class="pokemon-id__title">{{ name }}</p>
    <PokeballButton :id="id" :caught="caught" />
  </div>
  <img class="pokemon-id__img" loading="lazy" :src="image" :alt="name" />
</template>

<style scoped lang="scss">
.pokemon-id {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  height: 3rem;
}
.pokemon-id__title {
  text-transform: capitalize;
  font-size: 0.75rem;
  @media (min-width: 720px) {
    font-size: 1rem;
  }
}

.pokemon-id__img {
  width: 6rem;
  @media (min-width: 720px) {
    width: 8rem;
  }
}
</style>
