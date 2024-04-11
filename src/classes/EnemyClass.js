import enemyData from '../data/enemies.json'

export default class Enemy {
  constructor(username, level, health, strength, defense, speed) {
    this.defense = defense
    this.health = health
    this.id = enemyData[username].id
    this.imagePath = enemyData[username].imagePath
    this.level = level
    this.maxHealth = health
    this.speed = speed
    this.strength = strength
    this.username = username

    this.setExperienceGranted()
  }

  attack() {
    return this.strength
  }

  defend() {
    return this.defense
  }

  takeDamage(damage) {
    this.health -= damage
  }

  isAlive() {
    return this.health > 0
  }

  setExperienceGranted() {
    switch (this.username.toLowerCase()) {
      case 'goblin':
        this.experienceGranted = 2
        break
      case 'wolf':
        this.experienceGranted = 3
        break
      case 'rogue soldier':
        this.experienceGranted = 5
        break
      default:
        this.experienceGranted = 1
        break
    }
  }
}