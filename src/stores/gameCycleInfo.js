import { defineStore } from 'pinia'
import { useLocalStorage } from "@vueuse/core"

export const gameCycleInfoStore = defineStore('gameCycleInfo', {
  state: () => {
    return {
      gameActionPointsInitial: useLocalStorage('gameActionPointsInitial', 2),
      gameActionPointsLeft: useLocalStorage('gameActionPointsLeft', 2),
      gameCurrentDay: useLocalStorage('gameCurrentDay', 1),
      gameCurrentTime: useLocalStorage('gameCurrentTime', 'MORNING'),
      gameIntroComplete: useLocalStorage('gameIntroComplete', false),
      gameOver: useLocalStorage('gameOver', false),
    }
  }
})