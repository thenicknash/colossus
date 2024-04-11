<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="bg-slate-900 py-5 border-b border-slate-700">
    <nav class="text-sky-400 space-x-4 text-center text-xl ">
      <RouterLink class="p-2 hover:bg-sky-500 hover:text-slate-800" to="/">Home</RouterLink>
      <RouterLink class="p-2 hover:bg-sky-500 hover:text-slate-800" to="/game">Game</RouterLink>
    </nav>
  </header>
  
  <div class="px-8 py-10">
    <section>
      <h1 class="text-5xl text-sky-400 text-center">
        Colossus
      </h1>
    </section>

    <section>
      <div class="px-10 py-10 text-center">
        <p class="text-xl text-sky-400 mb-10">
          A game where you can either be a lowly peasant or the ruler of nations. The choice is yours.
        </p>
        <RouterLink class="block max-w-24 bg-sky-400 py-3 px-5 text-xl hover:bg-sky-500 m-auto" to="/game/intro">
          PLAY
        </RouterLink>
      </div>
    </section>
  </div>
</template>