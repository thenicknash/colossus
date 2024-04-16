<script setup>
const props = defineProps({
  displayModal: Boolean ?? false,
  message: String ?? ''
})

</script>

<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    v-show="props.displayModal"
  >
    <div class="fantasy-box border-4 text-center p-10">
      <p>
        {{ props.message }}
      </p>
      <button
        class="p-2 mt-5 bg-red-800 border-2 border-yellow-600 text-white hover:bg-red-900"
        @click="$emit('closePopUp')"
      >
        Close
      </button>
    </div>
  </div>
</template>