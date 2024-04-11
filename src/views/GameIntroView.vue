<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { playerInfoStore } from '../stores/playerInfo'

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

const currentLineIndex = ref(0)
const currentLine = ref(INTRO_SCRIPT.value[currentLineIndex.value])

const introScriptComplete = ref(false)
const playerNameSubmitted = ref(false)

const player = ref({
  name: ''
})

const playerInfo = playerInfoStore()

const showNextLine = () => {
  console.log(currentLineIndex.value, INTRO_SCRIPT.value.length - 1)
  if (currentLineIndex.value === INTRO_SCRIPT.value.length - 1) {
    introScriptComplete.value = true
    return
  }

  currentLineIndex.value = currentLineIndex.value + 1
  currentLine.value = INTRO_SCRIPT.value[currentLineIndex.value]
}

const submitPlayerName = () => {
  if (player.value.name === '') return
  if (player.value.name.length < 3) return

  playerInfo.username = player.value.name

  playerNameSubmitted.value = true
  console.log(player.value.name)
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
          v-else-if="introScriptComplete === true && playerNameSubmitted === false"
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
          </div>

          <button
            class="bg-emerald-500 text-white text-3xl p-4 mx-auto mt-10 mb-3 hover:bg-emerald-600"
            @click="submitPlayerName"
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

          <RouterLink
            class="block max-w-40 bg-emerald-500 text-white text-3xl p-4 mx-auto mt-10 mb-3 hover:bg-emerald-600"
            to="/game"
          >
            Begin
          </RouterLink>
        </div>

      </div>
    </section>
  </div>
</template>