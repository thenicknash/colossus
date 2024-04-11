<script setup>
import { playerInfoStore } from '@/stores/playerInfo'

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

        <h1 class="pt-5 text-3xl text-center text-white font-extrabold">
          &dash; SKILLS &dash;
        </h1>

        <p class="text-center text-white text-xl">
          Unused skill points: {{ playerInfo.playerUnusedSkillPoints }}
        </p>

        <!-- Base skills -->
        <div class="grid grid-cols-2 text-white">
          <div class="border-2 border-white text-3xl m-5 p-5">
            STR: {{ playerInfo.playerStrengthBase }}
            <div class="inline">
              <button
                class="h-12 w-12 ml-5 bg-slate-700 border-4 border-slate-600 text-white text-3xl hover:bg-slate-800 hover:border-slate-700"
                v-if="playerInfo.playerStrengthBase > 1"
                @click="playerInfo.playerStrengthBase -= 1; playerInfo.playerUnusedSkillPoints += 1"
              >
                -
              </button>
              <button
                class="h-12 w-12 ml-5 bg-slate-700 border-4 border-slate-600 text-white text-3xl hover:bg-slate-800 hover:border-slate-700"
                v-if="playerInfo.playerUnusedSkillPoints > 0"
                @click="playerInfo.playerStrengthBase += 1; playerInfo.playerUnusedSkillPoints -= 1"
              >
                +
              </button>
            </div>
          </div>
          <div class="border-2 border-white text-3xl m-5 p-5">
            DEF: {{ playerInfo.playerDefenseBase }}
            <div class="inline">
              <button
                class="h-12 w-12 ml-5 bg-slate-700 border-4 border-slate-600 text-white text-3xl hover:bg-slate-800 hover:border-slate-700"
                v-if="playerInfo.playerDefenseBase > 1"
                @click="playerInfo.playerDefenseBase -= 1; playerInfo.playerUnusedSkillPoints += 1"
              >
                -
              </button>
              <button
                class="h-12 w-12 ml-5 bg-slate-700 border-4 border-slate-600 text-white text-3xl hover:bg-slate-800 hover:border-slate-700"
                v-if="playerInfo.playerUnusedSkillPoints > 0"
                @click="playerInfo.playerDefenseBase += 1; playerInfo.playerUnusedSkillPoints -= 1"
              >
                +
              </button>
            </div>
          </div>
          <div class="border-2 border-white text-3xl m-5 p-5">
            MAG: {{ playerInfo.playerMagicBase }}
            <div class="inline">
              <button
                class="h-12 w-12 ml-5 bg-slate-700 border-4 border-slate-600 text-white text-3xl hover:bg-slate-800 hover:border-slate-700"
                v-if="playerInfo.playerMagicBase > 1"
                @click="playerInfo.playerMagicBase -= 1; playerInfo.playerUnusedSkillPoints += 1"
              >
                -
              </button>
              <button
                class="h-12 w-12 ml-5 bg-slate-700 border-4 border-slate-600 text-white text-3xl hover:bg-slate-800 hover:border-slate-700"
                v-if="playerInfo.playerUnusedSkillPoints > 0"
                @click="playerInfo.playerMagicBase += 1; playerInfo.playerUnusedSkillPoints -= 1"
              >
                +
              </button>
            </div>
          </div>
          <div class="border-2 border-white text-3xl m-5 p-5">
            RES: {{ playerInfo.playerResolveBase }}
            <div class="inline">
              <button
                class="h-12 w-12 ml-5 bg-slate-700 border-4 border-slate-600 text-white text-3xl hover:bg-slate-800 hover:border-slate-700"
                v-if="playerInfo.playerResolveBase > 1"
                @click="playerInfo.playerResolveBase -= 1; playerInfo.playerUnusedSkillPoints += 1"
              >
                -
              </button>
              <button
                class="h-12 w-12 ml-5 bg-slate-700 border-4 border-slate-600 text-white text-3xl hover:bg-slate-800 hover:border-slate-700"
                v-if="playerInfo.playerUnusedSkillPoints > 0"
                @click="playerInfo.playerResolveBase += 1; playerInfo.playerUnusedSkillPoints -= 1"
              >
                +
              </button>
            </div>
          </div>
          <div class="border-2 border-white text-3xl m-5 p-5">
            INT: {{ playerInfo.playerIntelligenceBase }}
            <div class="inline">
              <button
                class="h-12 w-12 ml-5 bg-slate-700 border-4 border-slate-600 text-white text-3xl hover:bg-slate-800 hover:border-slate-700"
                v-if="playerInfo.playerIntelligenceBase > 1"
                @click="playerInfo.playerIntelligenceBase -= 1; playerInfo.playerUnusedSkillPoints += 1"
              >
                -
              </button>
              <button
                class="h-12 w-12 ml-5 bg-slate-700 border-4 border-slate-600 text-white text-3xl hover:bg-slate-800 hover:border-slate-700"
                v-if="playerInfo.playerUnusedSkillPoints > 0"
                @click="playerInfo.playerIntelligenceBase += 1; playerInfo.playerUnusedSkillPoints -= 1"
              >
                +
              </button>
            </div>
          </div>
          <div class="border-2 border-white text-3xl m-5 p-5">
            CHA: {{ playerInfo.playerCharismaBase }}
            <div class="inline">
              <button
                class="h-12 w-12 ml-5 bg-slate-700 border-4 border-slate-600 text-white text-3xl hover:bg-slate-800 hover:border-slate-700"
                v-if="playerInfo.playerCharismaBase > 1"
                @click="playerInfo.playerCharismaBase -= 1; playerInfo.playerUnusedSkillPoints += 1"
              >
                -
              </button>
              <button
                class="h-12 w-12 ml-5 bg-slate-700 border-4 border-slate-600 text-white text-3xl hover:bg-slate-800 hover:border-slate-700"
                v-if="playerInfo.playerUnusedSkillPoints > 0"
                @click="playerInfo.playerCharismaBase += 1; playerInfo.playerUnusedSkillPoints -= 1"
              >
                +
              </button>
            </div>
          </div>
          <div class="border-2 border-white text-3xl m-5 p-5">
            SPD: {{ playerInfo.playerSpeedBase }}
            <div class="inline">
              <button
                class="h-12 w-12 ml-5 bg-slate-700 border-4 border-slate-600 text-white text-3xl hover:bg-slate-800 hover:border-slate-700"
                v-if="playerInfo.playerSpeedBase > 1"
                @click="playerInfo.playerSpeedBase -= 1; playerInfo.playerUnusedSkillPoints += 1"
              >
                -
              </button>
              <button
                class="h-12 w-12 ml-5 bg-slate-700 border-4 border-slate-600 text-white text-3xl hover:bg-slate-800 hover:border-slate-700"
                v-if="playerInfo.playerUnusedSkillPoints > 0"
                @click="playerInfo.playerSpeedBase += 1; playerInfo.playerUnusedSkillPoints -= 1"
              >
                +
              </button>
            </div>
          </div>
          <div class="border-2 border-white text-3xl m-5 p-5">
            LCK: {{ playerInfo.playerLuckBase }}
            <div class="inline">
              <button
                class="h-12 w-12 ml-5 bg-slate-700 border-4 border-slate-600 text-white text-3xl hover:bg-slate-800 hover:border-slate-700"
                v-if="playerInfo.playerLuckBase > 1"
                @click="playerInfo.playerLuckBase -= 1; playerInfo.playerUnusedSkillPoints += 1"
              >
                -
              </button>
              <button
                class="h-12 w-12 ml-5 bg-slate-700 border-4 border-slate-600 text-white text-3xl hover:bg-slate-800 hover:border-slate-700"
                v-if="playerInfo.playerUnusedSkillPoints > 0"
                @click="playerInfo.playerLuckBase += 1; playerInfo.playerUnusedSkillPoints -= 1"
              >
                +
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>