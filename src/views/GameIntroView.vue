<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { playerInfoStore } from '../stores/playerInfo'

import buildsData from '../data/builds.json'
import PlayerBuild from '@/classes/PlayerBuildClass'

const INTRO_SCRIPT = ref([
  'You return to your village drenched from the sudden rain shower. The sky is dark and rain continues to pour.',
  'The village is quiet. Most of the inhabitants are taking cover in their homes to avoid a situation like yours.',
  'You vividly hear the squelch of your footsteps every step along the muddy path. \'This rain is relentless.\' you think to yourself.',
  'As you open your front door, you are greeted by the warmth of your home. Or at least that is what you wish. Instead, the fire is out and the room frigid.',
  'You quickly light the fire and toss the sopping wet clothes into a corner of the room.',
  'Sprawling out on the worn bear rug, you stare into the fire. The flames dance and flicker, casting shadows on the walls.',
  '\'What am I doing here?\' you think to yourself. \'I should have left after the last raid. Now, there\'s nothing here left for me. I could be doing something. Anything.\'',
  'You close your eyes and drift off to sleep, determined to begin a new course. But it will have to wait until morning.',
])

const router = useRouter()

const currentLineIndex = ref(0)
const currentLine = ref(INTRO_SCRIPT.value[currentLineIndex.value])

const introScriptComplete = ref(false)
const playerInfoSubmitted = ref(false)
const showBuildDescription = ref(false)

const player = ref({
  name: '',
  build: '',
})

const playerInfo = playerInfoStore()


const beginGame = () => {
  // Apply base build stats to player
  const playerBuild = new PlayerBuild()
  playerBuild.applyBaseBuild(player.value.build)

  router.push('/game')
}

const showNextLine = () => {
  console.log(currentLineIndex.value, INTRO_SCRIPT.value.length - 1)
  if (currentLineIndex.value === INTRO_SCRIPT.value.length - 1) {
    introScriptComplete.value = true
    return
  }

  currentLineIndex.value = currentLineIndex.value + 1
  currentLine.value = INTRO_SCRIPT.value[currentLineIndex.value]
}

const submitPlayerInfo = () => {
  if (player.value.name === '') return
  if (player.value.name.length < 3) return

  playerInfo.playerUsername = player.value.name
  playerInfo.playerBuildBase = player.value.build

  playerInfoSubmitted.value = true
  console.log('new player:', player.value)
  console.log('playerInfo:', playerInfo)
}
</script>

<template>
  <div class="px-12 py-2">
    <section>
      <div class="my-10 mx-28 p-20 min-h-screen-90 border-8 border-gray-500 bg-fantasy-rain-night bg-cover">

        <!-- Intro text for player to read -->
        <div
          class="text-center"
          v-if="introScriptComplete === false"
        >
          <div class="bg-white/50 p-5">
            <h1 class="text-black text-3xl">
              {{ currentLine }}
            </h1>
          </div>

          <button
            class="bg-emerald-500 text-white text-3xl p-4 mx-auto mt-10 mb-3 hover:bg-emerald-600"
            @click="showNextLine"
          >
            {{ currentLineIndex === INTRO_SCRIPT.length - 1 ? 'Continue' : 'Next' }}
          </button>
        </div>
        <div
          class="text-center"
          v-else-if="introScriptComplete === true && playerInfoSubmitted === false"
        >
          <div class="bg-white/50 p-5">
            <h1 class="text-black text-4xl">
              Who are you?
            </h1>
            <input
              type="text"
              class="p-2 w-1/2 mx-auto my-10 bg-transparent text-black text-2xl border-b-2 border-black placeholder-black focus:outline-none"
              placeholder="Enter your name"
              v-model="player.name"
            />

            <h1 class="text-black text-4xl">
              Which are you most like?
            </h1>

            <!-- Builds -->
            <div class="grid grid-cols-3 gap-4 mt-10">
              <div class="col-span-1">
                <button
                  class="p-4 hover:bg-slate-800 active:bg-red-800 focus:bg-red-700 text-white"
                  :class="{ 'bg-red-700' : player.build === 'merchant', 'bg-slate-700' : player.build !== 'merchant'}"
                  @click="player.build = 'merchant'; showBuildDescription = true; console.log(player.build)"
                >
                  Merchant
                </button>
              </div>
              <div class="col-span-1">
                <button
                  class="p-4 hover:bg-slate-800 active:bg-red-800 focus:bg-red-700 text-white"
                  :class="{ 'bg-red-700' : player.build === 'priest', 'bg-slate-700' : player.build !== 'priest'}"
                  @click="player.build = 'priest'; showBuildDescription = true; console.log(player.build)"
                >
                  Priest
                </button>
              </div>
              <div class="col-span-1">
                <button
                  class="p-4 hover:bg-slate-800 active:bg-red-800 focus:bg-red-700 text-white"
                  :class="{ 'bg-red-700' : player.build === 'warrior', 'bg-slate-700' : player.build !== 'warrior'}"
                  @click="player.build = 'warrior'; showBuildDescription = true; console.log(player.build)"
                >
                  Warrior
                </button>
              </div>
            </div>

            <!-- Build descriptions -->
            <div
              class="flex items-center justify-center min-h-[300px] mt-5 bg-slate-900/75 border-2 border-slate-800 text-2xl text-white"
              v-if="showBuildDescription === true"
            >
              <div
                v-if="player.build === 'merchant'"
              >
                <h1 class="mb-5">
                  {{ buildsData.merchant.description }}
                </h1>
                <div
                  v-for="(statBoost, index) in buildsData.merchant.statBoosts"
                  :key="index"
                >
                  <h2>
                    {{ index }}: +{{ statBoost }}
                  </h2>
                </div>
              </div>
              
              <div
                v-if="player.build === 'priest'"
              >
                <h1 class="mb-5">
                  {{ buildsData.priest.description }}
                </h1>
                <div
                  v-for="(statBoost, index) in buildsData.priest.statBoosts"
                  :key="index"
                >
                  <h2>
                    {{ index }}: +{{ statBoost }}
                  </h2>
                </div>
              </div>

              <div
                v-if="player.build === 'warrior'"
              >
                <h1 class="mb-5">
                  {{ buildsData.warrior.description }}
                </h1>
                <div
                  v-for="(statBoost, index) in buildsData.warrior.statBoosts"
                  :key="index"
                >
                  <h2>
                    {{ index }}: +{{ statBoost }}
                  </h2>
                </div>
              </div>

            </div>
          </div>

          <button
            class="bg-emerald-500 text-white text-3xl p-4 mx-auto mt-10 mb-3 hover:bg-emerald-600"
            @click="submitPlayerInfo"
          >
            Continue
          </button>
        </div>
        <div
          class="text-center"
          v-else
        >
          <div class="bg-white/50 p-5">
            <h1 class="text-black text-4xl">
              {{ player.name }}, your journey begins come morning. Sleep well. Tonight marks the end of one story and the beginning of another.
            </h1>
          </div>

          <button
            class="block max-w-40 bg-emerald-500 text-white text-3xl p-4 mx-auto mt-10 mb-3 hover:bg-emerald-600"
            @click="beginGame"
          >
            Begin
        </button>
        </div>

      </div>
    </section>
  </div>
</template>