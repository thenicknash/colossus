import enemyData from '../data/enemies.json'

export default class Enemy {
  constructor(username, level, health, strength, defense, speed) {
    this.defense = defense
    this.experienceGranted = enemyData[username].experienceGranted
    this.health = health
    this.id = enemyData[username].id
    this.imagePath = enemyData[username].imagePath
    this.level = level
    this.maxHealth = health
    this.speed = speed
    this.strength = strength
    this.username = username
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
}