<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import npcs from '../data/npcs.json'

const route = useRoute()

const npcGuid = ref(route.params.guid)

const npc = ref(npcs.find(npc => npc.guid === npcGuid.value))

console.log('route.params.guid:', route.params.guid)
console.log('npcGuid:', npcGuid.value)
console.log('npc:', npc.value)
</script>

<template>
  <div class="px-12 py-2">
    <section>
      <div
        class="relative my-10 mx-10 p-2 min-h-screen-90 border-8 border-gray-500 bg-cover"
        :class="{}"
      >
        DIALOGUE
      </div>
    </section>
  </div>
</template>