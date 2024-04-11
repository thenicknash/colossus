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
    this.playerInfo.playerMaxHealth += 2
    this.playerInfo.playerHealth = this.playerInfo.playerMaxHealth

    this.playerInfo.playerUnusedSkillPoints += 1
  }
}
