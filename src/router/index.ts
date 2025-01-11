import { createRouter, createWebHistory } from 'vue-router'
import PokedexView from '../views/PokedexView/PokedexView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PokedexView,
    },
    {
      path: '/my-pokemons',
      name: 'my-pokemons',
      component: () => import('../views/MyPokemonsView/MyPokemonsView.vue'),
    },
  ],
})

export default router
