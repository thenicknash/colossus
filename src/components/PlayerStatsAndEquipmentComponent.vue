<script setup>
import { playerInfoStore } from '../stores/playerInfo'

const playerInfo = playerInfoStore()
console.log(playerInfo)

const props = defineProps({
  displayModal: Boolean ?? false,
})
</script>

<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    v-show="props.displayModal"
  >
    <div class="relative min-h-90 w-auto min-w-96 mx-96 inventory-box border-4">
      <button
        class="absolute top-0 right-0 h-8 w-8 pt-0.5 pb-0.5 bg-red-800 border-l-4 border-b-4 border-brown-700 hover:bg-red-900"
        @click="$emit('closePlayerStatsAndEquipment')"
      >
        X
      </button>

      <div class="p-5 max-h-[560px] overflow-scroll scrollbar-yellow-500">
        <h1 class="text-3xl text-center mb-5">
          {{ playerInfo.playerUsername }}
        </h1>

        <div class="grid grid-cols-3 gap-4 text-center">
          <div
            class="border-4 border-brown-500 h-auto w-28 hover:cursor-pointer hover:bg-slate-800 tooltip-top flex items-center"
            :data-tooltip="'Iron Sword'"
          >
            <img
              src="/images/shop-iron-sword.webp"
              alt="Iron Sword"
              class="h-28 w-28 object-contain pt-2 pb-4"
            >
          </div>
          <div class="">
            <div
              class="border-4 border-brown-500 h-24 w-28 hover:cursor-pointer hover:bg-slate-800 tooltip-top"
              :data-tooltip="'Iron Helmet'"
            >
              <img
                src="/images/shop-iron-helmet.webp"
                alt="Iron Helmet"
                class="h-24 w-36 object-contain pt-2 pb-4"
              >
            </div>
            <div
              class="border-4 border-brown-500 h-36 w-28 mt-5 hover:cursor-pointer hover:bg-slate-800 tooltip-top"
              :data-tooltip="'Iron Armor'"
            >
              <img
                src="/images/shop-iron-armor.png"
                alt="Iron Armor"
                class="h-36 w-36 object-contain pt-2 pb-4"
              >
            </div>
          </div>
          <div
            class="border-4 border-brown-500 h-auto w-28 hover:cursor-pointer hover:bg-slate-800 tooltip-top flex items-center"
            :data-tooltip="'Iron Shield | +2 DEF'"
          >
            <img
              src="/images/shop-iron-shield.png"
              alt="Iron Shield"
              class="h-28 w-28 object-contain pt-2 pb-4"
            >
          </div>
        </div>

      </div>
    </div>
  </div>
</template>