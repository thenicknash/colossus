<script>
// use normal <script> to declare options
// Removes errors in the console about not being able to find the component
export default {
  inheritAttrs: false
}
</script>

<script setup>
import { computed, defineProps, ref, watch } from 'vue'
import { playerInfoStore } from '../stores/playerInfo'

import ActionPoints from '../classes/ActionPointsClass'
import Enemy from '../classes/EnemyClass'
import PlayerStats from '../classes/PlayerStatsClass'
import PopUpComponent from './PopUpComponent.vue'

const emit = defineEmits(['endCombat'])

const props = defineProps({
  displayModal: Boolean ?? false
})

const eventLog = ref([])
const playerInfo = playerInfoStore()
const popUpMessage = ref('')
const showActions = ref(false)
const showPopUp = ref(false)
const turnOrder = ref([])

// Placeholder for dynamically created enemy object
let enemy = {}

const calculateDamage = (attackerStrength, defenderDefense) => {
  let damageDealt = Number(Math.floor(Math.random() * attackerStrength) + 1)

  let defenseModifier = Number(Math.floor(Math.random() * (defenderDefense * 0.5)))

  console.log('defenderDefense:', defenderDefense)
  console.log('Damage dealt:', damageDealt)
  console.log('Defense modifier:', defenseModifier)

  damageDealt -= defenseModifier

  if (damageDealt < 0) damageDealt = 0

  console.log('Final Damage dealt:', damageDealt)
  console.log('attackerStrength:', attackerStrength)
  return Number(damageDealt)
}

const closePopUp = () => {
  showPopUp.value = false
  emit('endCombat')
}

const commenceCombatRound = () => {
  console.log('Beginning combat...')

  let currentTurn = turnOrder.value.shift()

  if (Number(playerInfo.playerHealthTotal) <= 0 || Number(enemy.health) <= 0) {
    console.log('BATTLE COMPLETE!')

    if (playerInfo.playerHealthTotal <= 0) {
      console.log('Player is the loser!')
      eventLog.value.unshift(`${playerInfo.playerUsername} has been defeated!`)
      popUpMessage.value = 'DEFEATED!'
    } else {
      let experienceGained = enemy.experienceGranted

      const playerStats = new PlayerStats()
      playerStats.gainExperience(experienceGained)

      // TODO: Create a money reward system
      playerInfo.playerCoin += 3

      // TODO: Create an item reward system

      console.log('Player is the winner!')
      eventLog.value.unshift(`${enemy.username} has been defeated!`)
      popUpMessage.value = `VICTORY! You gained ${enemy.experienceGranted} experience!`
    }

    // Resetting combat values
    turnOrder.value = []
    showPopUp.value = true

    const actionPoints = new ActionPoints()
    actionPoints.decrementActionPoints()

    return
  }

  // Damage dealt calculations
  let damageDealt = 0
  if (currentTurn.username === playerInfo.playerUsername) {
    damageDealt = calculateDamage(playerInfo.playerStrengthTotal, enemy.defense)
  } else {
    damageDealt = calculateDamage(enemy.strength, playerInfo.playerDefenseTotal)
  }

  // Apply the damage dealt based on the current user's turn and log it
  if (currentTurn.username === playerInfo.playerUsername) {
    console.log('Player\'s turn!')
    eventLog.value.unshift(`${playerInfo.playerUsername} attacks!`)
    enemy.health -= damageDealt

    if (enemy.health <= 0) enemy.health = 0

    eventLog.value.unshift(`${playerInfo.playerUsername} deals ${damageDealt} damage!`)
  } else {
    console.log('Enemy\'s turn!')
    eventLog.value.unshift(`${enemy.username} attacks!`)

    // TODO: Figure out a less hacky way to apply damage to the player
    playerInfo.playerHealthBase -= damageDealt

    if (playerInfo.playerHealthBase <= 0) {
      playerInfo.playerHealthBase = 0
    }

    eventLog.value.unshift(`${enemy.username} deals ${damageDealt} damage!`)
  }

  // If the next turn is the enemy, go ahead and call commenceCombatRound again
  // TODO: Change comparison values to avoid bug if player has the same username
  if (turnOrder.value[0].username === enemy.username) {
    setTimeout(() => {
      commenceCombatRound()
    }, 1000)
  } else {
    showActions.value = true
  }
}

const generateRandomEnemy = () => {
  let enemyTypes = ['GOBLIN', 'WOLF', 'ROGUE SOLDIER']
  let randomEnemy = enemyTypes[Math.floor(Math.random() * enemyTypes.length)]
  console.log('Random enemy:', randomEnemy)

  let generatedEnemy = {}

  if (randomEnemy === 'GOBLIN') {
    generatedEnemy = new Enemy(randomEnemy, 1, 5, 1, 1, 1)
  } else if (randomEnemy === 'WOLF') {
    generatedEnemy = new Enemy(randomEnemy, 2, 8, 2, 2, 2)
  } else if (randomEnemy === 'ROGUE SOLDIER') {
    generatedEnemy = new Enemy(randomEnemy, 5, 20, 5, 5, 5)
  }

  console.log('Generated enemy:', generatedEnemy)

  return generatedEnemy
}

const setTurnOrder = () => {
  console.log('Setting turn order...')
  console.log('Player speed:', playerInfo.playerSpeedTotal)
  console.log('Enemy speed:', enemy.speed)

  console.log('enemy:', enemy.username)

  if (playerInfo.playerSpeedTotal >= enemy.speed) {
    console.log('Player goes first!')
    for (let i = 0; i < 101; i++) {
      if (i % 2 === 0) {
        turnOrder.value.push({ username: playerInfo.playerUsername, backgroundColor: 'bg-blue-800' })
      } else {
        turnOrder.value.push({ username: enemy.username, backgroundColor: 'bg-red-800' })
      }
    }
  } else {
    console.log('Enemy goes first!')
    for (let i = 0; i < 101; i++) {
      if (i % 2 === 0) {
        turnOrder.value.push({ username: enemy.username, backgroundColor: 'bg-red-800' })
      } else {
        turnOrder.value.push({ username: playerInfo.playerUsername, backgroundColor: 'bg-blue-800' })
      }
    }
  }
}

// computed property that only shows the next 5 turns
const nextTurns = computed(() => {
  return turnOrder.value.slice(0, 5)
})

// Kicks off combat when the modal is displayed
watch(() => props.displayModal, (value) => {
  enemy = {}
  turnOrder.value = []

  if (value) {
    // Overwriting the Enemy object here resets the health to the max health
    // enemy = new Enemy('GOBLIN', 1, 5, 1, 1, 1)
    enemy = generateRandomEnemy()
    console.log('Enemy:', enemy)

    eventLog.value = []
    eventLog.value.push("You encounter a " + enemy.username + "!")

    setTurnOrder()

    if (turnOrder.value[0].username === enemy.username) {
      setTimeout(() => {
        commenceCombatRound()
      }, 1000)
    } else {
      showActions.value = true
    }
  }
})
</script>

<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    v-show="props.displayModal"
  >
    <div class="relative min-h-screen-90 w-full px-10 mx-14 bg-brown-300 text-white border-4 border-brown-700">
      <h1 class="w-fit p-4 mx-auto mb-5 text-5xl bg-brown-500 border-x-4 border-b-4 border-brown-700">
        {{ enemy.username }}
      </h1>

      <!-- Top row -->
      <div class="flex flex-row justify-between items-start">

        <!-- Your stats -->
        <div class="flex-none bg-slate-700 text-white p-2 border-yellow-500 border-4">
          <h1 class="text-md">
            {{ playerInfo.playerUsername }} | Lvl. {{ playerInfo.playerLevel }}
          </h1>
          <p class="text-md">
            Health: {{ playerInfo.playerHealthTotal }}/{{ playerInfo.playerMaxHealthTotal }}
          </p>
          <p class="text-md">
            Experience: {{ playerInfo.playerExperience }}/{{ playerInfo.playerExperienceToNextLevel }}
          </p>
        </div>

        <!-- Enemy image -->
        <div class="flex-initial bg-brown-500 border-4 border-brown-700">
          <img
            :src="enemy.imagePath"
            alt="ENEMY IMAGE"
            class=" max-h-80 max-w-80"
          />
        </div>

        <!-- Enemy stats -->
        <div class="flex-none bg-slate-700 text-white p-2 border-yellow-500 border-4">
          <h1 class="text-md">
            {{ enemy.username }} | Lvl. {{ enemy.level }}
          </h1>
          <p class="text-md">
            Health: {{ enemy.health }}/{{ enemy.maxHealth }}
          </p>
        </div>

      </div>

      <!-- Bottom row -->
      <div>
        <div class="mx-2 mb-2 absolute inset-x-0 bottom-0">

          <!-- Turn order -->
          <div class="flex flex-intial justify-end">
            <div class=" max-w-72 bg-brown-500 border-4 border-brown-700 text-white p-2">
              <h3 class="text-xl">
                Turn Order
              </h3>

              <hr class="mb-5 border-b-2">

              <div
                v-for="(player, index) in nextTurns"
                :key="index"
                class=""
              >
                <div
                  class="px-2 mb-2 border-2 border-yellow-500 rounded-full"
                  :class="player.backgroundColor"
                >
                  {{ player.username }}
                </div>
              </div>
            </div>
          </div>

          <!-- Event log -->
          <div class="flex flex-row">
            <div class="max-h-28 min-h-28 w-1/2 mx-auto my-5 p-2 bg-brown-500 border-4 border-brown-700 text-left overflow-scroll">
              <p
                v-for="(event, index) in eventLog"
                :key="index"
                class="text-sm"
              >
                > {{ event }}
              </p>
            </div>
          </div>

          <!-- Actions -->
          <div
            class="flex flex-row justify-center space-x-2"
            v-show="showActions"
          >
            <div class="flex-initial">
              <button
                class="bg-slate-700 text-white p-2 border-4 border-yellow-500 hover:bg-slate-800 hover:border-yellow-600 active:bg-slate-900 active:border-yellow-700"
                @click="commenceCombatRound"
              >
                Attack
              </button>
            </div>
            <div class="flex-initial">
              <button
                class="bg-slate-700 text-white p-2 border-4 border-yellow-500 hover:bg-slate-800 hover:border-yellow-600 active:bg-slate-900 active:border-yellow-700"
                @click="displayPopUp('Your strength improved!')"
              >
                Items
              </button>
            </div>
            <div class="flex-initial">
              <button
                class="bg-slate-700 text-white p-2 border-4 border-yellow-500 hover:bg-slate-800 hover:border-yellow-600 active:bg-slate-900 active:border-yellow-700"
                @click="$emit('endCombat')"
              >
                Run
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>

  <PopUpComponent
    :displayModal="showPopUp"
    :message="popUpMessage"
    @close-pop-up="closePopUp"
  />
</template>