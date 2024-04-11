import { playerInfoStore } from "../stores/playerInfo"

import ItemPotion from "./ItemPotionClass"
import ItemEquipment from "./ItemEquipmentClass"

export default class PlayerInventory {
  constructor() {
    this.playerInfo = playerInfoStore()
  }

  addItemFromEquipment (item) {
    let lastInventoryId = this.playerInfo?.playerInventory?.at(-1)?.inventoryId

    if (!lastInventoryId) { lastInventoryId = 0 }

    item.inventoryId = lastInventoryId + 1

    this.playerInfo.playerInventory.push(item)
  }

  addItemFromStore (item) {
    let lastInventoryId = this.playerInfo?.playerInventory?.at(-1)?.inventoryId

    if (!lastInventoryId) { lastInventoryId = 0 }

    item.inventoryId = lastInventoryId + 1

    this.playerInfo.playerInventory.push(item)

    this.playerInfo.playerCoin -= Number(item.price)
  }

  removeItem(item) {
    this.playerInfo.playerInventory = this.playerInfo.playerInventory.filter((inventoryItem) => inventoryItem.inventoryId !== item.inventoryId)
  }

  // TODO: Make this more robust and handle different item types
  useItem(item) {
    console.log('Using item:', item)

    if (item.type === 'potion') {
      const itemPotion = new ItemPotion(item.id)
      itemPotion.loadItem(item)
      itemPotion.use()
      this.removeItem(item)
    } else if (item.type === 'shield') {
      const itemEquipment = new ItemEquipment(item.id)
      let removeItemFromInventory = itemEquipment.equip(item)

      if (removeItemFromInventory === true) {
        this.removeItem(item)
      }
    }
  }

  getItems() {
    return this.playerInfo.playerInventory
  }
}