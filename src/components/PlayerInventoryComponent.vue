<script setup>
import { defineProps } from 'vue'
import { playerInfoStore } from '../stores/playerInfo'

import PlayerInventory from '../classes/PlayerInventoryClass'

const props = defineProps({
  displayModal: Boolean ?? false,
})

const playerInfo = playerInfoStore()

const useItem = (item) => {
  const playerInventory = new PlayerInventory()
  playerInventory.useItem(item)
}
</script>

<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    v-show="props.displayModal"
  >
    <div class="relative min-h-90 w-auto min-w-96 mx-96 inventory-box border-4">
      <button
        class="absolute top-0 right-0 h-8 w-8 pt-0.5 pb-0.5 bg-red-800 border-l-4 border-b-4 border-brown-700 hover:bg-red-900"
        @click="$emit('closePlayerInventory')"
      >
        X
      </button>

      <!-- Inventory items -->
      <div class="pt-5 pl-4 pr-5 max-h-[560px] overflow-scroll scrollbar-yellow-500">
        <h1 class="text-3xl text-center mb-2">
          Inventory
        </h1>

        <div class="grid grid-cols-5 mb-5 text-center">
          <!-- Looping item -->
          <div
            class="border-4 border-brown-500 h-24 w-24 m-2 hover:cursor-pointer hover:bg-slate-800 tooltip-top"
            :data-tooltip="item.description"
            v-for="item in playerInfo.playerInventory"
            :key="item.id"
            @click="useItem(item)"
          >
            <img
              :src="item.imagePath"
              alt="Red Potion"
              class="h-24 w-24 object-contain pt-2 pb-4"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>