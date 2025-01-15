<script setup lang="ts">
import { useClipboard } from '@/composables/useClipboard/useClipboard'
import PokeballButton from '../PokeballButton/PokeballButton.vue'
import Routes from '@/shared/types/routes'
import AppNotify from '@/components/app/AppNotify/AppNotify.vue'

interface Props {
  name: string
  image: string
  caught: boolean
  id: number
}

defineProps<Props>()

const { copyToClipboard, clipboardSuccess, clipboardError } = useClipboard()

const copyText = (text: string) => {
  copyToClipboard(text)
}
</script>

<template>
  <div class="pokemon-id">
    <p class="pokemon-id__title">{{ name }}</p>
    <PokeballButton :id="id" :caught="caught" />
  </div>
  <div class="pokemon-id-section">
    <img class="pokemon-id__img" loading="lazy" :src="image" :alt="name" />
    <button
      v-if="$route.path === Routes.MY_POKEMONS"
      class="pokemon-id__share"
      @click="copyText(image)"
    >
      🔗
    </button>
    <AppNotify v-if="clipboardSuccess" :message="'Text copied successfully!'" :color="'green'" />
    <AppNotify v-if="clipboardError" :message="'An error occured!'" :color="'red'" />
  </div>
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

.pokemon-id-section {
  display: flex;
  align-items: center;
}

.pokemon-id__img {
  width: 5.5rem;
  height: auto;
  @media (min-width: 720px) {
    width: 6.5rem;
  }
}

.pokemon-id__share {
  font-size: 1.5rem;
  cursor: pointer;
  background: none;
  border: none;
  cursor: pointer;
}
</style>
