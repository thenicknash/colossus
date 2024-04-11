import { playerInfoStore } from "../stores/playerInfo"
import PlayerInventory from './PlayerInventoryClass'


export default class PlayerEquipment {
  constructor () {
    const playerInfo = playerInfoStore()

    this.playerInfo = playerInfo
  }

  equipArmor (armor) {
    if (this.playerInfo.armor !== '{}') {
      this.unequipArmor()
    }
    this.playerInfo.armor = armor
  }

  equipShield (shield) {
    console.log('this.playerInfo.playerShield:', this.playerInfo.playerShield)
    console.log('shield', shield)

    // Exit the equipping process if the same shield is already equipped
    if (this.playerInfo.playerShield.code === shield.code) {
      alert(`${shield.name} is already equipped!`)
      return false
    }

    if (Object.keys(this.playerInfo.playerShield).length > 0) {
      console.log('about to unequip shield')
      console.log('this.playerInfo.shield:', this.playerInfo.playerShield)
      this.unequipShield()
    }

    this.playerInfo.playerShield = shield

    this.playerInfo.playerDefenseEquipBuff = shield.effectValue

    return true
  }

  equipWeapon (weapon) {
    if (this.weapon !== '{}') {
      this.unequipWeapon()
    }
    this.weapon = weapon
  }

  unequipArmor () {
    const playerInventory = new PlayerInventory()
    playerInventory.addItem(this.playerInfo.armor)
    this.playerInfo.armor = '{}'
  }

  unequipShield () {
    const playerInventory = new PlayerInventory()
    console.log('Unequipping shield:', this.playerInfo.playerShield)
    playerInventory.addItemFromEquipment(this.playerInfo.playerShield)
    this.playerInfo.playerShield = '{}'
  }

  unequipWeapon () {
    const playerInventory = new PlayerInventory()
    playerInventory.addItem(this.playerInfo.weapon)
    this.playerInfo.weapon = '{}'
  }

  updatePlayerStats () {

  }
}