<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { playerInfoStore } from '../stores/playerInfo'
import { gameCycleInfoStore } from '../stores/gameCycleInfo'

import ActionPoints from '../classes/ActionPointsClass'
import CombatComponent from '../components/CombatComponent.vue'
import PlayerInventoryComponent from '../components/PlayerInventoryComponent.vue'
import PopUpComponent from '../components/PopUpComponent.vue'
import ShopItemsComponent from '../components/ShopItemsComponent.vue'
import PlayerStatsAndEquipmentComponent from '@/components/PlayerStatsAndEquipmentComponent.vue'

const gameCycleInfo = gameCycleInfoStore()
const playerInfo = playerInfoStore()

const router = useRouter()


const showActions = ref(false)
const showCombatModal = ref(false)
const showDialogue = ref(true)
const showIntroDialogue = ref(!gameCycleInfo.gameIntroComplete)
const showLocations = ref(false)
const showPlayerInventory = ref(false)
const showPlayerStatsAndEquipment = ref(false)
const showPopUp = ref(false)
const showShopItems = ref(false)
const playerLocation = ref('village')
const popUpMessage = ref('')


const beginCombat = () => {
  if (playerInfo.playerHealthTotal <= 0) {
    displayPopUp('You are too weak to fight! Rest and recover first.')
    return
  }

  const actionPoints = new ActionPoints()
  console.log('actionPoints:', actionPoints)
  console.log('actionPoints.getActionPointsLeft:', actionPoints.getActionPointsLeft)
  console.log('actionPoints.isActionPointsZero:', actionPoints.isActionPointsZero)

  if (actionPoints.areEmpty()) {
    displayPopUp('You are too tired to fight! Rest and recover first.')
    return
  }

  showActions.value = false
  showDialogue.value = false
  showLocations.value = false
  showPopUp.value = false
  showCombatModal.value = true
}

const beginGame = () => {
  showDialogue.value = false
  showLocations.value = true
  showActions.value = true
  showIntroDialogue.value = false

  gameCycleInfo.gameIntroComplete = true
}

const closePlayerInventory = () => {
  showPlayerInventory.value = false
}

const closePlayerStatsAndEquipment = () => {
  showPlayerStatsAndEquipment.value = false
}

const closePopUp = () => {
  showPopUp.value = false
}

const closeShopItems = () => {
  showShopItems.value = false
}

const displayPopUp = (message) => {
  showPopUp.value = true
  popUpMessage.value = message
}

const endCombat = () => {
  showActions.value = true
  showLocations.value = true
  showCombatModal.value = false
}

const navigateToJobs = () => {
  const actionPoints = new ActionPoints()

  if (actionPoints.areEmpty()) {
    displayPopUp('You are too tired to work! Rest and recover first.')
    return
  }

  router.push('/game/jobs')
}

const navigateToTraining = () => {
  const actionPoints = new ActionPoints()

  if (actionPoints.areEmpty()) {
    displayPopUp('You are too tired to train! Rest and recover first.')
    return
  }

  router.push('/game/training')
}

const rest = () => {
  const actionPoints = new ActionPoints()

  console.log('actionsPoints.gameCycleInfo:', actionPoints.gameCycleInfo)

  if (gameCycleInfo.gameCurrentTime === 'EVENING') {
    gameCycleInfo.gameCurrentTime = 'MORNING'
    gameCycleInfo.gameCurrentDay += 1

    actionPoints.resetActionPoints()


    displayPopUp('You rest for the night!')
  } else {
    gameCycleInfo.gameCurrentTime = 'EVENING'

    actionPoints.resetActionPoints()

    displayPopUp('You rest for some time!')
  }
}


if (gameCycleInfo.gameIntroComplete) {
  beginGame()
}

const audio = new Audio('/music/medieval-fantasy-1.mp3')
audio.loop = true
audio.play()
</script>

<template>
  <div class="px-12 py-2">

    <section>

      <!-- Main game view -->
      <div
        class="relative my-10 mx-10 p-2 min-h-screen-90 border-8 border-gray-500 bg-cover"
        :class="{
          'bg-fantasy-village-dawn': playerLocation === 'village',
          'bg-fantasy-rain-night': playerLocation === 'village-rain-night',
          'bg-fantasy-wilderness': playerLocation === 'wilderness',
          'bg-fantasy-shop': playerLocation === 'shop',
        }"
      > 

        <!-- Top row -->
        <div class="flex flow-row justify-between">

          <!-- Name, health, exp -->
          <div class="flex-none p-2 fantasy-box border-4">
            <button
              class="text-md hover:underline"
              @click="showPlayerStatsAndEquipment = true"
            >
              {{ playerInfo.playerUsername }}
            </button> | Lvl. {{ playerInfo.playerLevel }}
            <p class="text-md">
              Health: {{ playerInfo.playerHealthTotal }} / {{ playerInfo.playerMaxHealthTotal }}
            </p>
            <p class="text-md">
              Experience: {{ playerInfo.playerExperience }}/{{ playerInfo.playerExperienceToNextLevel }}
            </p>

            <hr class="my-1">

            <div class="grid grid-cols-2">
              <p>STR: {{ playerInfo.playerStrengthTotal }} <span v-if="playerInfo.playerStrengthEquipBuff > 0">(+{{ playerInfo.playerStrengthEquipBuff }})</span></p>
              <p>DEF: {{ playerInfo.playerDefenseTotal }} <span v-if="playerInfo.playerDefenseEquipBuff > 0">(+{{ playerInfo.playerDefenseEquipBuff }})</span></p>
              <p>MAG: {{ playerInfo.playerMagicTotal }} <span v-if="playerInfo.playerMagicEquipBuff > 0">(+{{ playerInfo.playerMagicEquipBuff }})</span></p>
              <p>RES: {{ playerInfo.playerResolveTotal }} <span v-if="playerInfo.playerResolveEquipBuff > 0">(+{{ playerInfo.playerResolveEquipBuff }})</span></p>
              <p>INT: {{ playerInfo.playerIntelligenceTotal }} <span v-if="playerInfo.playerIntelligenceEquipBuff > 0">(+{{ playerInfo.playerIntelligenceEquipBuff }})</span></p>
              <p>CHA: {{ playerInfo.playerCharismaTotal }} <span v-if="playerInfo.playerCharismaEquipBuff > 0">(+{{ playerInfo.playerDefenseEquipBuff }})</span></p>
              <p>SPD: {{ playerInfo.playerSpeedTotal }} <span v-if="playerInfo.playerSpeedEquipBuff > 0">(+{{ playerInfo.playerSpeedEquipBuff }})</span></p>
              <p>LCK: {{ playerInfo.playerLuckTotal }} <span v-if="playerInfo.playerLuckEquipBuff > 0">(+{{ playerInfo.playerLuckEquipBuff }})</span></p>
            </div>

            <div class="grid grid-cols-1 text-left mt-5">
              <RouterLink
                class="text-center bg-slate-700 border-2 border-yellow-500 p-1 hover:bg-slate-800"
                to="/game/skills"
              >
                Adjust Skills <span v-if="playerInfo.playerUnusedSkillPoints > 0">({{ playerInfo.playerUnusedSkillPoints }})</span>
              </RouterLink>
            </div>
          </div>

          <!-- Locations -->
          <div
            class="flex flex-row space-x-2"
            v-show="showLocations === true"
          >
            <div class="flex-initial">
              <button
                class="p-2 border-4 bg-brown-300 border-brown-500 text-white hover:bg-brown-500 hover:border-brown-700 active:bg-brown-700 active:border-brown-900"
                :class="{ 'bg-brown-700 border-brown-900 hover:bg-brown-700 hover:border-brown-900': playerLocation === 'village' }"
                :disabled="playerLocation === 'village'"
                @click="playerLocation = 'village'"
              >
                Village
              </button>
            </div>
            <div class="flex-initial">
              <button
                class="p-2 border-4 bg-brown-300 border-brown-500 text-white hover:bg-brown-500 hover:border-brown-700 active:bg-brown-700 active:border-brown-900"
                :class="{ 'bg-brown-700 border-brown-900 hover:bg-brown-700 hover:border-brown-900': playerLocation === 'wilderness' }"
                :disabled="playerLocation === 'wilderness'"
                @click="playerLocation = 'wilderness'"
              >
                Wilderness
              </button>
            </div>
            <div class="flex-initial">
              <button
                class="p-2 border-4 bg-brown-300 border-brown-500 text-white hover:bg-brown-500 hover:border-brown-700 active:bg-brown-700 active:border-brown-900"
                @click="displayPopUp('You are not qualified for the Guild Hall!')"
              >
                Guild Hall
              </button>
            </div>
          </div>

          <!-- Money, prestige, and inventory -->
          <div class="flex-inital h-fit bg-slate-700/90 text-white p-2 border-slate-800 border-4">
            <p class="text-md">
              Day: {{ gameCycleInfo.gameCurrentDay }} - {{ gameCycleInfo.gameCurrentTime }}
            </p>
            <p>
              Actions left: {{ gameCycleInfo.gameActionPointsLeft }}
            </p>
            <p class="text-md">
              Coin: {{ playerInfo.playerCoin }}
            </p>
            <p class="text-md">
              Prestige: 0
            </p>
            <button
              class="text-md hover:underline"
              @click="showPlayerInventory = true"
            >
              Inventory
            </button>

            <!-- DEV ONLY -->
            <p>
              <RouterLink
                class="block text-center bg-red-500 p-2 mt-5 text-md hover:bg-red-700"
                to="/debug"
              >
                Debugger
              </RouterLink>
            </p>
          </div>

        </div>

        <!-- Main game dialogue text -->
        <div
          class="bg-slate-700 p-2 mx-2 mb-2 border-4 border-yellow-500 absolute inset-x-0 bottom-0"
          v-show="showIntroDialogue === true"
        >
          <!-- text -->
          <div class="flex flex-row mb-5">
            <h1 class="text-white text-md">
              The day has come. You awake with a renewed spirit ready to take hold of your fate. What will you do?
            </h1>
          </div>
          <!-- button -->
          <div class="flex flex-row justify-end">
            <div class="">
              <button
                class="bg-emerald-500 text-md text-white p-2"
                @click="beginGame"
              >
                Continue  
              </button>
            </div>
          </div>
        </div>

        <!-- Sub-locations & location actions -->
        <div>
          <div
            class="mx-2 mb-2 absolute inset-x-0 bottom-0"
            v-show="showActions === true"
          >
            <div class="flex flex-row space-x-2 justify-between">

              <!-- Sub-locations -->
              <div
                class="flex space-x-2"
                v-if="playerLocation === 'village'"
              >
                <div class="flex-initial">
                  <button
                    class="world-fantasy-button"
                    @click="playerLocation = 'shop'"
                  >
                    Shop
                  </button>
                </div>
              </div>
              <div
                class="flex space-x-2"
                v-else-if="playerLocation === 'shop'"
              >
                <div class="flex-initial">
                  <button
                    class="world-fantasy-button"
                    @click="playerLocation = 'village'"
                  >
                    Village
                  </button>
                </div>
              </div>

              <!-- Location actions -->
              <div
                class="flex flex-row space-x-2"
                v-if="playerLocation === 'village'"
              >
                <div class="flex-initial">
                  <button
                    class="world-fantasy-button"
                    @click="displayPopUp('You take a look around!')"
                  >
                    Explore
                  </button>
                </div>
                <div class="flex-initial">
                  <button
                    class="world-fantasy-button"
                    @click="navigateToJobs"
                  >
                    Jobs
                  </button>
                </div>
                <div class="flex-initial">
                  <button
                    class="world-fantasy-button"
                    @click="navigateToTraining"
                  >
                    Train
                  </button>
                </div>
                <div class="flex-initial">
                  <button
                    class="world-fantasy-button"
                    v-if="gameCycleInfo.gameCurrentTime === 'MORNING'"
                    @click="rest"
                  >
                    Wait
                  </button>
                  <button
                    class="world-fantasy-button"
                    v-else
                    @click="rest"
                  >
                    Rest
                  </button>
                </div>
              </div>
              <div
                class="flex flex-row space-x-2"
                v-else-if="playerLocation === 'shop'"
              >
                <div class="flex-initial">
                  <button
                    class="world-fantasy-button"
                    @click="showShopItems = true"
                  >
                    Trade
                  </button>
                </div>
              </div>
              <div
                class="flex flex-row space-x-2"
                v-else-if="playerLocation === 'wilderness'"
              >
                <div class="flex-initial">
                  <button
                    class="world-fantasy-button"
                    @click="beginCombat"
                  >
                    Combat
                  </button>
                </div>
              </div>

              <!-- Game settings -->
              <div class="flex-inital h-fit bg-slate-700/90 text-white p-2 border-slate-800 border-4">
                <button
                  class="text-md hover:underline"
                  @click="displayPopUp('Settings are not available yet.')"
                >
                  Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <CombatComponent
      :displayModal="showCombatModal"
      @end-combat="endCombat"
    />

    <PlayerInventoryComponent
      :displayModal="showPlayerInventory"
      @close-player-inventory="closePlayerInventory"
    />

    <PlayerStatsAndEquipmentComponent
      :displayModal="showPlayerStatsAndEquipment"
      @close-player-stats-and-equipment="closePlayerStatsAndEquipment"
    />

    <PopUpComponent
      :displayModal="showPopUp"
      :message="popUpMessage"
      @close-pop-up="closePopUp"
    />

    <ShopItemsComponent
      :displayModal="showShopItems"
      @close-shop-items="closeShopItems"
    />

  </div>
</template>