import { createRouter, createWebHistory } from 'vue-router'
import PokedexView from '../views/PokedexView/PokedexView.vue'
import LayoutType from '@/shared/layouts/layouts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PokedexView,
      props: { activeLayout: LayoutType.TABLE },
    },
    {
      path: '/my-pokemons',
      name: 'my-pokemons',
      component: () => import('../views/MyPokemonsView/MyPokemonsView.vue'),
      props: { activeLayout: LayoutType.TABLE },
    },
  ],
})

export default router
