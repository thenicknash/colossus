import { defineStore } from 'pinia'
import { useLocalStorage } from "@vueuse/core"

export const playerJobsInfoStore = defineStore('playerJobsInfo', {
  state: () => {
    return {
      playerLaborerExperience: useLocalStorage('playerLaborerExperience', 0),
      playerLaborerMaxExperience: useLocalStorage('playerLaborerMaxExperience', 10),
      playerLaborerRank: useLocalStorage('playerLaborerRank', 1),
      playerStreetSweeperExperience: useLocalStorage('playerStreetSweeperExperience', 0),
      playerStreetSweeperMaxExperience: useLocalStorage('playerStreetSweeperMaxExperience', 10),
      playerStreetSweeperRank: useLocalStorage('playerStreetSweeperRank', 1),
      playerVendorExperience: useLocalStorage('playerVendorExperience', 0),
      playerVendorMaxExperience: useLocalStorage('playerVendorMaxExperience', 10),
      playerVendorRank: useLocalStorage('playerVendorRank', 1),
    }
  }
})
