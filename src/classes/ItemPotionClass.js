import itemData from '../data/items.json'

import { playerInfoStore } from "../stores/playerInfo"

const playerInfo = playerInfoStore()

export default class ItemPotion {
  constructor (id) {
    const item = itemData.find(i => i.id === id)

    this.id = Number(item.id)
    this.name = item.name
    this.code = item.code
    this.type = item.type
    this.price = Number(item.price)
    this.sellPrice = Number(item.sellPrice)
    this.effectValue = Number(item.effectValue)
    this.description = item.description
    this.rarity = item.rarity
    this.imagePath = item.imagePath
    this.itemClass = item.itemClass

    this.inventoryId = -1
  }

  loadItem (item) {
    this.id = item.id
    this.name = item.name
    this.code = item.code
    this.type = item.type
    this.price = item.price
    this.sellPrice = item.sellPrice
    this.effectValue = item.effectValue
    this.description = item.description
    this.rarity = item.rarity
    this.imagePath = item.imagePath
    this.itemClass = item.itemClass
    this.inventoryId = item.inventoryId
  }

  // TODO: Flesh this out for more potion types (stat buffs, etc.)
  // and make it easier to read & maintain
  use () {
    console.log(`You used the ${this.name}`)

    if (this.id === 1) {
      playerInfo.playerHealthBase += this.effectValue
      if (playerInfo.playerHealthBase > playerInfo.playerMaxHealthTotal) {
        playerInfo.playerHealthBase = playerInfo.playerMaxHealthTotal
      }
    }
    else if (this.id === 2) {
      playerInfo.playerStrengthBase += 1
    }

  }
}
