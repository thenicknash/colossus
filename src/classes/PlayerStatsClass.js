import { playerInfoStore } from "../stores/playerInfo";

export default class PlayerStats {
  constructor () {
    this.playerInfo = playerInfoStore()
    this.leveledUp = false
  }

  gainExperience(experience) {
    this.playerInfo.playerExperience += experience

    if (this.playerInfo.playerExperience >= this.playerInfo.playerExperienceToNextLevel) {
      this.levelUp()
    }
  }

  levelUp() {
    this.playerInfo.playerLevel++
    this.playerInfo.playerExperience = 0
    // TODO: Make this a more complex formula
    this.playerInfo.playerExperienceToNextLevel = 10
    this.playerInfo.playerMaxHealthBase += 2
    this.playerInfo.playerHealthBase = this.playerInfo.playerMaxHealthBase

    this.playerInfo.playerUnusedSkillPoints += 1
  }

  chanceToIncreaseSkillFromJob (jobId) {
    const dice20Side = Math.floor(Math.random() * 20) + 1

    let skillIncreased = ''

    if (jobId === 1) {
      if (dice20Side >= 19) {
        this.playerInfo.playerStrengthBase += 1
        skillIncreased = 'Strength'
      }
    } else if (jobId === 2) {
      if (dice20Side >= 19) {
        this.playerInfo.playerSpeedBase += 1
        skillIncreased = 'Speed'
      }
    } else if (jobId === 3) {
      if (dice20Side >= 17) {
        // Random chance between intelligence and charisma
        const oneOrTwo = Math.floor(Math.random() * 2) + 1

        if (oneOrTwo === 1) {
          this.playerInfo.playerIntelligenceBase += 1
          skillIncreased = 'Intelligence'
        } else {
          this.playerInfo.playerCharismaBase
          skillIncreased = 'Charisma'
        }
      }
    }

    return skillIncreased
  }

  addCoins (amount) {
    this.playerInfo.playerCoin += amount
  }

  removeCoins (amount) {
    this.playerInfo.playerCoin -= amount
    if (this.playerInfo.playerCoin < 0) {
      this.playerInfo.playerCoin = 0
    }
  }

  getCoins () {
    return this.playerInfo.playerCoin
  }
}
