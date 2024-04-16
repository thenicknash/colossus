<script setup>
import { ref } from 'vue'

import ItemArmor from '../classes/ItemEquipmentClass';
import ItemPotion from '../classes/ItemPotionClass'
import PlayerInventory from '../classes/PlayerInventoryClass';

const HEALING_POTION_1_ID = 1
const STRENGTH_POTION_1_ID = 2
const IRON_SHIELD_ID = 3

const emit = defineEmits(['closeShopItems'])

const shopItems = ref([])

// TESTING ONLY
const smallHealingPotion = new ItemPotion(HEALING_POTION_1_ID)
shopItems.value.push(smallHealingPotion)

const strengthPotion = new ItemPotion(STRENGTH_POTION_1_ID)
shopItems.value.push(strengthPotion)

const ironShield = new ItemArmor(IRON_SHIELD_ID)
shopItems.value.push(ironShield)

console.log('shopItems:', shopItems.value)
// END TESTING ONLY


const selectedItem = ref(null)
const selectedItemId = ref(-1)
const selectedItemName = ref('')
const selectedItemPrice = ref(0)
const selectedItemQuantity = ref(0)

const props = defineProps({
  displayModal: Boolean ?? false,
  message: String ?? ''
})

const buyPotion = () => {
  console.log('selectedItemQuantity:', selectedItemQuantity)
  console.log('selectedItem:', selectedItem)

  for (let i = 0; i < selectedItemQuantity.value; i++) {
    console.log(`Buying ${selectedItemName.value}...`)
    
    // TODO: Come up with a cleaner approach to choosing the correct class
    if (selectedItem.value.itemClass === 'ItemArmor') {
      const armor = new ItemArmor(selectedItemId.value)
      console.log('ARMOR:', armor)

      const playerInventory = new PlayerInventory()
      playerInventory.addItemFromStore(armor)
    } else if (selectedItem.value.itemClass === 'ItemPotion') {
      const potion = new ItemPotion(selectedItemId.value)
      console.log('POTION:', potion)

      const playerInventory = new PlayerInventory()
      playerInventory.addItemFromStore(potion)
    }
  }
}

const calculatePrice = (itemId) => {
  console.log('Calculating price...')
  const potion = new ItemPotion(itemId)
  selectedItemPrice.value = potion.price * selectedItemQuantity.value
}

const resetAndCloseShopItems = () => {
  console.log('Resetting and closing shop items...')
  selectedItem.value = null
  selectedItemId.value = -1
  selectedItemName.value = ''
  selectedItemPrice.value = 0
  selectedItemQuantity.value = 0

  emit('closeShopItems')
}

const selectAnItem = (item) => {
  console.log('Selecting an item...')
  selectedItem.value = item
  selectedItemName.value = item.name
  selectedItemId.value = item.id
  selectedItemPrice.value = item.price
  selectedItemQuantity.value = 1

  calculatePrice(item.id)
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
        @click="resetAndCloseShopItems"
      >
        X
      </button>

      <!-- Pop up title -->
      <div class="pt-5 pl-4 pr-5 max-h-[560px] overflow-scroll scrollbar-yellow-500">
        <h1 class="text-xl text-center mb-2">
          Shop
        </h1>

        <div class="grid grid-cols-2 gap-x-4">

          <!-- Shop items -->
          <div class="h-auto grid grid-cols-2 mb-5 text-center">

            <div
              class="border-4 border-brown-500 h-24 w-24 m-2 hover:cursor-pointer hover:bg-slate-800 tooltip-top"
              v-for="item in shopItems"
              :key="item.id"
              :data-tooltip="item.description"
              @click="selectAnItem(item)"
            >
              <img
                :src="item.imagePath"
                alt="Red Potion"
                class="h-24 w-24 object-contain pt-2 pb-4"
              >
            </div>

          </div>

          <!-- Item to buy section -->
          <div class="grid items-center justify-center mt-2 mb-7 ">
            <div class="px-2 max-h-[300px] min-w-[250px] my-auto bg-brown-300 border-4 border-brown-500 text-center">
              <h3 class="pt-5 text-xl">
                {{ selectedItemName ?? 'Select an item' }}
              </h3>
              <h4 class="pt-2 text-lg">
                Price: {{ selectedItemPrice }}
              </h4>
              <h4 class="pt-2 text-lg">
                Quantity: {{ selectedItemQuantity }}
              </h4>
              <div class="pt-5">
                <button
                  class="px-4 py-1 bg-brown-900 border-l-2  border-t-2 border-r-1 border-b-2 border-brown-700 text-xl hover:bg-brown-700 hover:border-brown-500"
                  :class="selectedItemQuantity <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-brown-700 hover:border-brown-500'"
                  :disabled="selectedItemQuantity <= 1"
                  @click="selectedItemQuantity > 1 ? selectedItemQuantity-- : 1; calculatePrice(selectedItemId)"
                >
                  &darr;
                </button>
                &nbsp;
                <button
                  class="px-4 py-1 bg-brown-900 border-l-1  border-t-2 border-r-2 border-b-2 border-brown-700 text-xl hover:bg-brown-700 hover:border-brown-500"
                  :class="selectedItemQuantity >= 99 || selectedItem === null ? 'opacity-50 cursor-not-allowed' : 'hover:bg-brown-700 hover:border-brown-500'"
                  :disabled="selectedItemQuantity >= 99 || selectedItem === null"
                  @click="selectedItemQuantity++ ; calculatePrice(selectedItemId)"
                >
                  &uarr;
                </button>
              </div>
              <button
                class="p-2 my-5 bg-red-700 border-4 border-yellow-500 text-white hover:bg-red-800 active:bg-red-900 active:border-yellow-600"
                @click="buyPotion"
              >
                Buy
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>