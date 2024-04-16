<script setup>
console.log('TIME TO TRAIN!')
</script>

<template>
  <div class="px-12 py-2">
    <section>
      <div class="relative my-10 mx-10 p-2 min-h-screen-90 border-8 bg-brown-300 border-brown-700 bg-cover">
        <RouterLink
          class="absolute top-0 right-0 h-8 w-8 pt-0.5 pb-0.5 bg-red-800 border-l-4 border-b-4 border-brown-700 hover:bg-red-900 text-white text-center"
          to="/game"
        >
          X
        </RouterLink>

        <h1 class="pt-5 text-3xl text-center text-white font-extrabold underline">
          TRAINING
        </h1>

      </div>
    </section>
  </div>
</template>