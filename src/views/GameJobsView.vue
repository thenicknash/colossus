<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import ActionPoints from '@/classes/ActionPointsClass';
import PlayerJobs from '../classes/PlayerJobsClass'
import PlayerStats from '@/classes/PlayerStatsClass'

const actionPointsInitial = new ActionPoints()
const playerJobs = new PlayerJobs()
const router = useRouter()

const postJobActionPointsUsed = ref(0)
const postJobCoinsEarned = ref(0)
const postJobSkillIncreased = ref('')
const showPostJobPopUp = ref(false)

const confirmPostJobPopUp = () => {
  const actionPoints = new ActionPoints()

  if (actionPoints.areEmpty()) {
    console.log('Navigating to village...')
    router.push('/game')
  }

  showPostJobPopUp.value = false
}

const getCoins = () => {
  const playerStats = new PlayerStats()
  return playerStats.getCoins()
}

const skillToIncreaseText = (jobId) => {
  if (jobId === 1) { return 'Strength' }
  if (jobId === 2) { return 'Speed' }
  if (jobId === 3) { return 'Intelligence / Charisma' }
}

const workJob = (job) => {
  console.log('Working job:', job)

  // Increment job progress experience
  // - Check if job progress is at max
  // - If so, increase job rank
  playerJobs.increaseJobExperience(job.id)

  // Subtract appropriate action points from player
  const actionPoints = new ActionPoints()
  let actionPointsLeft = actionPoints.getActionPointsLeft()
  console.log('Action points consumed:', job.actionPointsConsumed)
  console.log('Action points left:', actionPointsLeft)

  let actionPointsLeftAfterJob = actionPointsLeft - job.actionPointsConsumed
  if (actionPointsLeftAfterJob < 0) actionPointsLeftAfterJob = 0

  actionPoints.setActionPoints(actionPointsLeftAfterJob)

  // Roll dice for extra skill increase
  // - If roll is successful, increase skill & include message
  // - Else ignore
  const playerStats = new PlayerStats()
  const skillIncreased = playerStats.chanceToIncreaseSkillFromJob(job.id)
  console.log('Skill increased:', skillIncreased)

  // Reward player with coin
  playerStats.addCoins(job.coinsEarned)

  // Display message with results
  postJobActionPointsUsed.value = job.actionPointsConsumed
  postJobCoinsEarned.value = job.coinsEarned
  postJobSkillIncreased.value = skillIncreased ? `${skillIncreased} skill increased!` : ''
  showPostJobPopUp.value = true
}
</script>

<template>
  <div class="px-12 py-2">
    <section>
      <div class="relative my-10 mx-10 p-2 min-h-screen-90 border-8 bg-jobs-board border-brown-700 bg-cover">
        <RouterLink
          class="absolute top-0 right-0 h-8 w-8 pt-0.5 pb-0.5 bg-red-800 border-l-4 border-b-4 border-brown-700 hover:bg-red-900 text-white text-center"
          to="/game"
        >
          X
        </RouterLink>

        <h1 class="pt-5 text-5xl text-center text-white font-extrabold underline">
          JOBS
        </h1>

        <!-- Basic player info -->
        <div class="mt-10">
          <div class="flex w-fit max-w-[800px] p-4 mx-auto bg-slate-700/90 border-4 border-slate-800 text-white text-2xl">
            <!-- Player coins -->
            <div>
              <span class="pr-2 text-yellow-300 tooltip">
                <i class="fa-solid fa-coins"></i>
              </span>
              <span class="pr-4">{{ getCoins() }}</span>
            </div>

            <!-- Player action points -->
            <div>
              <span class="pr-2 text-yellow-300">
                <i class="fa-solid fa-bolt"></i>
              </span>
              <span class="pr-4">{{ actionPointsInitial.getActionPointsLeft() }}</span>
            </div>
          </div>
        </div>

        <!-- Available jobs -->
        <div class="mt-10">
          <div
            class="grid grid-cols-6 items-center justify-between max-w-[800px] p-4 my-5 mx-auto bg-slate-700/90 border-4 border-slate-800 text-white"
            v-for="job in playerJobs.jobs"
            :key="job.id"
          >
            <div class="col-span-3 inline-block text-2xl">

              <span
                class="text-3xl"
                v-if="job.id === 1"
              >
                <i class="fa-solid fa-hammer"></i>
              </span>
              <span
                class="text-3xl"
                v-else-if="job.id === 2"
              >
                <i class="fa-solid fa-broom"></i>
              </span>
              <span
                class="text-3xl"
                v-else-if="job.id === 3"
              >
                <i class="fa-solid fa-store"></i>
              </span>
              &nbsp;
              <span
                class="p-2 mr-5 bg-slate-800 border-2 border-slate-900 tooltip"
                :data-tooltip="`Rank: ${playerJobs.getJobRank(job.id)} | Progress: ${playerJobs.getJobExperience(job.id)}/${playerJobs.getJobMaxExperience(job.id)}`"
              >
                {{ job.title }} {{ playerJobs.getJobRank(job.id) }}
              </span>
            </div>
            <div class="col-span-2 text-2xl">
              <div
                class="inline-block h-12 p-2 mr-5 bg-slate-500 border-4 border-slate-800 hover:bg-slate-600 tooltip"
                :data-tooltip="'Grants a chance to increase your ' + skillToIncreaseText(job.id) + ' skill.'"
              >
                <span
                  class="m-auto text-2xl"
                  v-if="job.id === 1"
                >
                  <i class="fa-solid fa-dumbbell"></i>
                </span>
                <span
                  v-else-if="job.id === 2"
                >
                  <i class="fa-solid fa-person-running"></i>
                </span>
                <span
                  v-else-if="job.id === 3"
                >
                  <i class="fa-solid fa-brain"></i>
                </span>
              </div>
              <span
                class="pr-2 text-yellow-300 tooltip"
                :data-tooltip="'You will receive ' + job.coinsEarned + ' coins for completing this job.'"
              >
                <i class="fa-solid fa-coins"></i>
              </span>
              <span class="pr-4">{{ job.coinsEarned }}</span>
              <span
                class="pr-5 tooltip"
                :data-tooltip="'This job consumes ' + job.actionPointsConsumed + ' action point(s).'"
              >
                <span class="pr-2 text-yellow-300">
                  <i class="fa-solid fa-bolt"></i>
                </span> 
                {{ job.actionPointsConsumed }}
              </span>
            </div>
            <div class="text-right text-2xl">
              <button
                v-if="actionPointsInitial.getActionPointsLeft() >= job.actionPointsConsumed"
                class="p-2 bg-red-700 border-4 border-slate-800 hover:bg-red-800 hover:border-slate-900 active:bg-red-900 active:border-slate-950"
                @click="workJob(job)"
              >
                Work
              </button>
              <button
                v-else
                class="p-2 bg-gray-500 border-4 border-slate-900 hover:bg-gray-600 hover:cursor-not-allowed tooltip"
                :data-tooltip="'You need ' + job.actionPointsConsumed + ' action points to work this job.'"
                disabled
              >
                Work
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- Post job pop-up -->
    <section
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      v-show="showPostJobPopUp"
    >
      <div class="fantasy-box border-4 text-center p-10">
        <p>
          {{ postJobCoinsEarned }} coins earned!
        </p>
        <p>
          {{ postJobActionPointsUsed }} action points used.
        </p>
        <p
          v-if="postJobSkillIncreased !== ''"
        >
          {{ postJobSkillIncreased }}
        </p>
        <button
          class="p-2 mt-5 bg-red-800 border-2 border-yellow-600 text-white hover:bg-red-900"
          @click="confirmPostJobPopUp"
        >
          Confirm
        </button>
      </div>
    </section>
  </div>
</template>