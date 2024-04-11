<script setup>
import PlayerJobs from '../classes/PlayerJobsClass'

const playerJobs = new PlayerJobs()
console.log(playerJobs.jobs)

console.log('TIME TO WORK!')

const workJob = (job) => {
  console.log('Working job:', job)

  // Increment job progress experience
  // - Check if job progress is at max
  // - If so, increase job rank
  // Subtract appropriate action points from player
  // Roll dice for extra skill increase
  // - If roll is successful, increase skill & include message
  // - Else ignore
  // Reward player with coin
  // Display message with results
  // Return player to the village
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

        <!-- Available jobs -->
        <div class="mt-10">
          <div
            class="flex items-center justify-between max-w-[800px] p-4 my-5 mx-auto bg-slate-700/90 border-4 border-slate-800 text-white"
            v-for="job in playerJobs.jobs"
            :key="job.id"
          >
            <div class="inline-block text-2xl">
              <span class="text-2xl"><i class="fa-solid fa-hammer"></i></span>
              &nbsp;
              <span class="pr-5">{{ job.title }}</span>
              |
              <span class="px-5">Rank: {{ playerJobs.getCurrentJobRank(job.id) }} </span>
              |
              <span class="pl-5">Progress: (0/10)</span>
            </div>
            <button
              class="p-2 bg-red-700 border-4 border-red-800 hover:bg-red-800 hover:border-red-900 active:bg-red-900 active:border-red-950"
              @click="workJob(job)"
            >
              Work
            </button>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>