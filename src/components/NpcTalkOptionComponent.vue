<script setup>
import { computed, ref, watch } from 'vue'

import npcs from '../data/npcs.json'

const props = defineProps({
  displayModal: Boolean ?? false,
  npcs: Array ?? []
})

const computedNpcs = ref([])

watch(() => props.displayModal, (value) => {
  if (!value) {
    console.log('clearing npc list')
    computedNpcs.value = []
    return
  }

  console.log('displayModal:', value)
  console.log('props.npcs:', props.npcs)
  console.log('npcs:', npcs)
  // computedNpcs.value.push(npcs.find(npc => npc.name === props.npcs[0].name))
  console.log('computedNpcs:', computedNpcs.value)

  for (let i = 0; i < props.npcs.length; i++) {
    let foundNpc = npcs.find(npc => npc.name === props.npcs[i].name)
    console.log('foundNpc:', foundNpc)
    if (foundNpc) {
      computedNpcs.value.push(foundNpc)
    }
  }

})
</script>

<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    v-show="props.displayModal"
  >
    <div class="fantasy-box border-4 text-center p-10">
      <p>
          Who would you like to talk to?
      </p>
      <div
        v-for="npc in computedNpcs"
      >
        <RouterLink
          class="block p-2 mt-5 bg-red-700 border-2 border-red-800 text-white hover:bg-red-800 hover:border-red-900"
          :to="'/game/dialogue/' + npc.guid"
        >
          {{ npc.name }}
        </RouterLink>
      </div>
      <button
        class="p-2 mt-5 bg-red-700 border-2 border-red-800 text-white hover:bg-red-800 hover:border-red-900"
        @click="$emit('closeNpcTalkOptions')"
      >
        Back
      </button>
    </div>
  </div>
</template>