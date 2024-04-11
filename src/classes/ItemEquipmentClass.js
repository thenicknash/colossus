import itemData from '../data/items.json'

import PlayerEquipment from './PlayerEquipmentClass'


export default class ItemEquipment {
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

  equip (item) {
    console.log(`You equipped the ${this.name}`)
    
    const playerEquipment = new PlayerEquipment()
    let removeItemFromInventory = true

    if (item.type === 'shield') {
      removeItemFromInventory = playerEquipment.equipShield(item)
    }

    return removeItemFromInventory
  }
}