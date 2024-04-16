import { defineStore } from 'pinia'
import { useLocalStorage } from "@vueuse/core"

export const playerInfoStore = defineStore('playerInfo', {
  state: () => {
    return {
      playerArmor: useLocalStorage('playerArmor', {}),
      playerBuildBase: useLocalStorage('playerBuildBase', {}),
      playerCharismaBase: useLocalStorage('playerCharismaBase', 1),
      playerCharismaEquipBuff: useLocalStorage('playerCharismaEquipBuff', 0),
      playerCoin: useLocalStorage('playerCoin', 5),
      playerDefenseBase: useLocalStorage('playerDefense', 1),
      playerDefenseEquipBuff: useLocalStorage('playerDefenseEquipBuff', 0),
      playerDexterityBase: useLocalStorage('playerDexterityBase', 1),
      playerDexterityEquipBuff: useLocalStorage('playerDexterityEquipBuff', 0),
      playerExperience: useLocalStorage('playerExperience', 0),
      playerExperienceToNextLevel: useLocalStorage('playerExperienceToNextLevel', 10),
      playerHealthBase: useLocalStorage('playerHealthBase', 10),
      playerHealthEquipBuff: useLocalStorage('playerHealthEquipBuff', 0),
      playerIntelligenceBase: useLocalStorage('playerIntelligenceBase', 1),
      playerIntelligenceEquipBuff: useLocalStorage('playerIntelligenceEquipBuff', 0),
      playerInventory: useLocalStorage('playerInventory', []),
      playerLevel: useLocalStorage('playerLevel', 1),
      playerLuckBase: useLocalStorage('playerLuckBase', 1),
      playerLuckEquipBuff: useLocalStorage('playerLuckEquipBuff', 0),
      playerMagicBase: useLocalStorage('playerMagicBase', 1),
      playerMagicEquipBuff: useLocalStorage('playerMagicEquipBuff', 0),
      playerMaxHealthBase: useLocalStorage('playerMaxHealthBase', 10),
      playerMaxHealthEquipBuff: useLocalStorage('playerMaxHealthEquipBuff', 0),
      playerRent: useLocalStorage('playerRent', 10),
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

    playerHealthTotal: (state) => {
      return state.playerHealthBase + state.playerHealthEquipBuff
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

    playerMaxHealthTotal: (state) => {
      return state.playerMaxHealthBase + state.playerMaxHealthEquipBuff
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
