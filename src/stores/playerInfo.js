import { defineStore } from 'pinia'
import { useLocalStorage } from "@vueuse/core"

export const playerInfoStore = defineStore('playerInfo', {
  state: () => {
    return {
      playerArmor: useLocalStorage('playerArmor', {}),
      playerCharismaBase: useLocalStorage('playerCharismaBase', 1),
      playerCharismaEquipBuff: useLocalStorage('playerCharismaEquipBuff', 0),
      playerCoin: useLocalStorage('playerCoin', 5),
      playerDefenseBase: useLocalStorage('playerDefense', 1),
      playerDefenseEquipBuff: useLocalStorage('playerDefenseEquipBuff', 0),
      playerDexterityBase: useLocalStorage('playerDexterityBase', 1),
      playerDexterityEquipBuff: useLocalStorage('playerDexterityEquipBuff', 0),
      playerExperience: useLocalStorage('playerExperience', 0),
      playerExperienceToNextLevel: useLocalStorage('playerExperienceToNextLevel', 10),
      playerHealth: useLocalStorage('playerHealth', 10),
      playerIntelligenceBase: useLocalStorage('playerIntelligenceBase', 1),
      playerIntelligenceEquipBuff: useLocalStorage('playerIntelligenceEquipBuff', 0),
      playerInventory: useLocalStorage('playerInventory', []),
      playerLevel: useLocalStorage('playerLevel', 1),
      playerLuckBase: useLocalStorage('playerLuckBase', 1),
      playerLuckEquipBuff: useLocalStorage('playerLuckEquipBuff', 0),
      playerMagicBase: useLocalStorage('playerMagicBase', 1),
      playerMagicEquipBuff: useLocalStorage('playerMagicEquipBuff', 0),
      playerMaxHealth: useLocalStorage('playerMaxHealth', 10),
      playerResolveBase: useLocalStorage('playerResolveBase', 1),
      playerResolveEquipBuff: useLocalStorage('playerResolveEquipBuff', 0),
      playerShield: useLocalStorage('playerShield', {}),
      playerSkillPoints: useLocalStorage('playerSkillPoints', 0),
      playerSpeedBase: useLocalStorage('playerSpeedBase', 1),
      playerSpeedEquipBuff: useLocalStorage('playerSpeedEquipBuff', 0),
      playerStrengthBase: useLocalStorage('playerStrengthBase', 1),
      playerStrengthEquipBuff: useLocalStorage('playerStrengthEquipBuff', 0),
      playerUnusedSkillPoints: useLocalStorage('playerUnusedSkillPoints', 0),
      playerUsername: useLocalStorage('playerUsername', 'Kai'),
      playerWeapon: useLocalStorage('playerWeapon', {}),
    }
  },

  getters: {
    playerCharismaTotal: (state) => {
      return state.playerCharismaBase + state.playerCharismaEquipBuff
    },

    playerDefenseTotal: (state) => {
      return state.playerDefenseBase + state.playerDefenseEquipBuff
    },

    playerDexterityTotal: (state) => {
      return state.playerDexterityBase + state.playerDexterityEquipBuff
    },

    playerIntelligenceTotal: (state) => {
      return state.playerIntelligenceBase + state.playerIntelligenceEquipBuff
    },

    playerLuckTotal: (state) => {
      return state.playerLuckBase + state.playerLuckEquipBuff
    },

    playerMagicTotal: (state) => {
      return state.playerMagicBase + state.playerMagicEquipBuff
    },

    playerResolveTotal: (state) => {
      return state.playerResolveBase + state.playerResolveEquipBuff
    },

    playerSpeedTotal: (state) => {
      return state.playerSpeedBase + state.playerSpeedEquipBuff
    },

    playerStrengthTotal: (state) => {
      return state.playerStrengthBase + state.playerStrengthEquipBuff
    },
  },
})
