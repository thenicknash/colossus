import buildsData from '../data/builds.json'
import { playerInfoStore } from '../stores/playerInfo'

export default class PlayerBuild {
  constructor () {
    this.buildsData = buildsData
    this.playerInfo = playerInfoStore() 
  }

  applyBaseBuild (buildName) {
    const build = this.buildsData[buildName]

    console.log('build', build)

    for (const [key, value] of Object.entries(build.statBoosts)) {
      let keyTitleCase = key.charAt(0).toUpperCase() + key.slice(1)

      console.log('keyTitleCase', keyTitleCase, 'value', value)
      let keyName = 'player' + keyTitleCase + 'Base'
      console.log('keyName', keyName)
      console.log('this.playerInfo[keyName]', this.playerInfo[keyName])
      this.playerInfo[keyName] += value
    }

    // Ensure that the player's health is updated if it's less than the max health
    if (this.playerInfo.playerHealthBase < this.playerInfo.playerMaxHealthBase) {
      this.playerInfo.playerHealthBase = this.playerInfo.playerMaxHealthBase
    }
  }
}