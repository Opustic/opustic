<template>
  <div class="my-8 border border-neutral-800 bg-neutral-950 p-4 font-mono text-xs text-neutral-300 shadow-xl">
    <div class="mb-3 flex items-center justify-between border-b border-neutral-900 pb-2 text-[10px] text-neutral-500 uppercase tracking-widest">
      <span>CLI Engine Execution</span>
      <span class="text-orange-500 animate-pulse">● node_worker</span>
    </div>
    
    <div class="space-y-1.5 leading-relaxed">
      <div class="flex items-center gap-2 text-neutral-400">
        <span class="text-orange-500">$</span>
        <span>{{ command }}</span>
      </div>
      
      <!-- Affichage sécurisé des lignes -->
      <div 
        v-for="(line, index) in parsedOutputs" 
        :key="index"
        v-show="visibleLines >= index"
        :class="{
          'text-orange-500 font-bold': line.startsWith('🎉') || line.startsWith('✔'),
          'text-neutral-500': line.startsWith('🔍'),
          'text-neutral-300': line.startsWith('⚡')
        }"
      >
        {{ line }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  command: {
    type: String,
    default: 'oopt folder ./images'
  },
  outputs: {
    type: [Array, String],
    default: () => []
  }
})

const visibleLines = ref(-1)
const timers = ref([])

// Sécurité absolue : transforme la prop en tableau de chaînes, peu importe ce que Nuxt Content envoie
const parsedOutputs = computed(() => {
  if (!props.outputs) return []
  if (Array.isArray(props.outputs)) return props.outputs
  try {
    // Si c'est une chaîne JSON mal parsée
    return JSON.parse(props.outputs)
  } catch {
    // Fallback si c'est une simple chaîne de caractères séparée par des virgules
    return String(props.outputs).split(',').map(s => s.trim())
  }
})

onMounted(() => {
  // On attend que l'hydratation initiale du client soit terminée à 100%
  nextTick(() => {
    if (parsedOutputs.value && parsedOutputs.value.length > 0) {
      parsedOutputs.value.forEach((_, index) => {
        const timer = setTimeout(() => {
          visibleLines.value = index
        }, (index + 1) * 350)
        timers.value.push(timer)
      })
    }
  })
})

onBeforeUnmount(() => {
  timers.value.forEach(clearTimeout)
})
</script>