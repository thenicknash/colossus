import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/debug',
      name: 'debug',
      component: () => import('../views/DebugView.vue')
    },
    {
      path: '/game',
      name: 'game',
      component: () => import('../views/GameView.vue')
    },
    {
      path: '/game/dialogue/:guid',
      name: 'game-dialogue',
      component: () => import('../views/GameDialogueView.vue')
    },
    {
      path: '/game/galesburg/map',
      name: 'game-galesburg-map',
      component: () => import('../views/GameGalesburgMapView.vue')
    },
    {
      path: '/game/intro',
      name: 'game-intro',
      component: () => import('../views/GameIntroView.vue')
    },
    {
      path: '/game/jobs',
      name: 'game-jobs',
      component: () => import('../views/GameJobsView.vue')
    },
    {
      path: '/game/skills',
      name: 'game-skills',
      component: () => import('../views/GameSkillsView.vue')
    },
    {
      path: '/game/training',
      name: 'game-training',
      component: () => import('../views/GameTrainingView.vue')
    }
  ]
})

export default router
