import { gameCycleInfoStore } from "../stores/gameCycleInfo"

export default class ActionPoints {
  constructor() {
    this.gameCycleInfo = gameCycleInfoStore()
  }

  areEmpty() {
    return this.gameCycleInfo.gameActionPointsLeft === 0
  }

  decrementActionPoints() {
    this.gameCycleInfo.gameActionPointsLeft--
    if (this.gameCycleInfo.gameActionPointsLeft < 0) {
      this.gameCycleInfo.gameActionPointsLeft = 0
    }
  }

  increaseInitialActionPoints() {
    this.gameCycleInfo.gameActionPointsInitial++
    this.gameCycleInfo.gameActionPointsLeft = this.gameCycleInfo.gameActionPointsInitial
  }

  getActionPointsLeft() {
    return this.gameCycleInfo.gameActionPointsLeft
  }

  resetActionPoints() {
    this.gameCycleInfo.gameActionPointsLeft = this.gameCycleInfo.gameActionPointsInitial
  }

  setActionPoints(actionPoints) {
    this.gameCycleInfo.gameActionPointsLeft = actionPoints
  }
}