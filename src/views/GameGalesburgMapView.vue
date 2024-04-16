<script setup>
console.log('City map')
</script>

<template>
  <div class="px-12 py-2">
    <section>
      <div class="relative my-10 mx-10 p-2 min-h-screen-90 border-8 bg-brown-300 border-brown-700 bg-galesburg-map bg-cover">
        <RouterLink
          class="absolute top-0 right-0 h-8 w-8 pt-0.5 pb-0.5 bg-red-800 border-l-4 border-b-4 border-brown-700 hover:bg-red-900 text-white text-center"
          to="/game"
        >
          X
        </RouterLink>

        <div>
          <!-- Circle icon interactive -->
          <div
            class="absolute top-1/2 left-1/2 w-8 h-8 bg-red-500 border-2 border-white rounded-full cursor-pointer hover:bg-red-700"
          >
            <!-- <i class="fa-regular fa-circle"></i> -->
          </div>
        </div>

      </div>
    </section>
  </div>
</template>