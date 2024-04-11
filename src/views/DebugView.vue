<script setup>
import { gameCycleInfoStore } from '../stores/gameCycleInfo';
import { playerInfoStore } from '../stores/playerInfo'

const gameCycleInfo = gameCycleInfoStore()
const playerInfo = playerInfoStore()
</script>

<template>
  <div class="px-12 py-2">
    <section>
      <div class="relative my-10 mx-28 p-2 min-h-screen-90 border-8 bg-brown-300 border-brown-700 bg-cover">
        <RouterLink
          class="absolute top-0 right-0 h-8 w-8 pt-0.5 pb-0.5 bg-red-800 border-l-4 border-b-4 border-brown-700 hover:bg-red-900 text-white text-center"
          to="/game"
        >
          X
        </RouterLink>

        <h1 class="pt-5 text-3xl text-center text-white font-extrabold underline">
          DEVELOPER DEBUG
        </h1>

        <div>
          <h2 class="pt-5 text-2xl text-center text-white font-bold">
            Player Info
          </h2>

          <div class="grid grid-cols-3 gap-4 mt-5 p-5 bg-blue-500 text-white border-4 border-blue-700">
            <div>
              <p>Username: {{ playerInfo.playerUsername }}</p>
              <p>Level: {{ playerInfo.playerLevel }}</p>
              <p>Coin: {{ playerInfo.playerCoin }}</p>
              <p>Skill Points: {{ playerInfo.playerUnusedSkillPoints }}</p>
              <hr class="mt-5">
            </div>
            <div>
              <p>Health: {{ playerInfo.playerHealth }}</p>
              <p>Max Health: {{ playerInfo.playerMaxHealth }}</p>
              <p>Experience: {{ playerInfo.playerExperience }}</p>
              <p>Experience to Next Level: {{ playerInfo.playerExperienceToNextLevel }}</p>
              <hr class="mt-5">
            </div>
            <div>
              <p>Strength: {{ playerInfo.playerStrength }}</p>
              <p>Base Defense: {{ playerInfo.playerDefenseBase }}</p>
              <p>Equip Buff Defense: {{ playerInfo.playerDefenseEquipBuff }}</p>
              <p>Total Defense: {{ playerInfo.playerDefenseTotal }}</p>
              <hr class="mt-5">
            </div>
            <div>
              <p>Weapon: {{ playerInfo.playerWeapon.name ?? playerInfo.playerWeapon }}</p>
              <p>Armor: {{ playerInfo.playerArmor.name ?? playerInfo.playerArmor }}</p>
              <p>Shield: {{ playerInfo.playerShield.name }}</p>
            </div>
            <div>
              <p>Current Day: {{ gameCycleInfo.gameCurrentDay }}</p>
              <p>Current Time: {{ gameCycleInfo.gameCurrentTime }}</p>
              <p>Current Location: {{ playerInfo.playerCurrentLocation }}</p>
            </div>
          </div>
        </div>

        <h2 class="mt-10 text-2xl text-center text-white font-bold">
          Dev Tools
        </h2>

        <div class="grid grid-cols-5 gap-4">
          <button
            @click="playerInfo.playerCoin += 100"
            class="p-2 my-2 text-xl bg-red-500 text-white border-4 border-red-700 hover:bg-red-700 hover:border-red-900"
          >
            Add 100 coins
          </button>

          <button
            @click="playerInfo.playerCoin -= 100"
            class="p-2 my-2 text-xl bg-red-500 text-white border-4 border-red-700 hover:bg-red-700 hover:border-red-900"
          >
            Remove 100 coins
          </button>

          <button
            @click="playerInfo.playerUnusedSkillPoints += 1"
            class="p-2 my-2 text-xl bg-red-500 text-white border-4 border-red-700 hover:bg-red-700 hover:border-red-900"
          >
            Add 1 skill point
          </button>

          <button
            @click="playerInfo.playerUnusedSkillPoints -= 1"
            class="p-2 my-2 text-xl bg-red-500 text-white border-4 border-red-700 hover:bg-red-700 hover:border-red-900"
          >
            Subtract 1 skill point
          </button>

          <button
            @click="playerInfo.playerExperience += 5"
            class="p-2 my-2 text-xl bg-red-500 text-white border-4 border-red-700 hover:bg-red-700 hover:border-red-900"
          >
            Add 5 experience
          </button>

          <button
            @click="playerInfo.playerExperience = 0"
            class="p-2 my-2 text-xl bg-red-500 text-white border-4 border-red-700 hover:bg-red-700 hover:border-red-900"
          >
            Reset experience
          </button>

          <button
            @click="gameCycleInfo.gameCurrentDay += 1"
            class="p-2 my-2 text-xl bg-red-500 text-white border-4 border-red-700 hover:bg-red-700 hover:border-red-900"
          >
            Add 1 day
          </button>

          <button
            @click="gameCycleInfo.gameCurrentDay = 1"
            class="p-2 my-2 text-xl bg-red-500 text-white border-4 border-red-700 hover:bg-red-700 hover:border-red-900"
          >
            Reset days
          </button>

          <button
            @click="gameCycleInfo.gameCurrentDay -= 1; gameCycleInfo.gameCurrentDay < 0 ? gameCycleInfo.gameCurrentDay = 0 : gameCycleInfo.gameCurrentDay"
            class="p-2 my-2 text-xl bg-red-500 text-white border-4 border-red-700 hover:bg-red-700 hover:border-red-900"
          >
            Rollback 1 day
          </button>

          <button
            @click="gameCycleInfo.gameCurrentTime === 'MORNING' ? gameCycleInfo.gameCurrentTime = 'EVENING' : gameCycleInfo.gameCurrentTime = 'MORNING'"
            class="p-2 my-2 text-xl bg-red-500 text-white border-4 border-red-700 hover:bg-red-700 hover:border-red-900"
          >
            Toggle current time
          </button>
        </div>
      </div>
    </section>
  </div>
</template>