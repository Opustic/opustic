<template>
  <div class="my-8 border border-neutral-800 bg-neutral-950 p-6 font-sans text-neutral-200 shadow-xl">
    <!-- Header -->
    <div class="mb-4 flex flex-col justify-between border-b border-neutral-900 pb-3 sm:flex-row sm:items-center">
      <div>
        <h4 class="text-sm font-bold uppercase tracking-wider text-orange-500 font-mono">// {{ title || 'Espace Laboratoire : Canvas' }}</h4>
        <p class="text-xs text-neutral-500 mt-0.5">{{ subtitle || 'Dessinez pour compiler.' }}</p>
      </div>
      <button 
        @click="startSimulation" 
        :disabled="isDrawing || hasGenerated"
        class="mt-3 border border-orange-500/30 bg-orange-950/20 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-orange-500 transition-all hover:bg-orange-500 hover:text-black disabled:opacity-40 sm:mt-0"
      >
        <span v-if="isDrawing">Tracé IA...</span>
        <span v-else-if="hasGenerated">Réinitialiser</span>
        <span v-else>Simuler un Tracé</span>
      </button>
    </div>

    <!-- Interface Workspace -->
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <!-- Zone Canvas -->
      <div class="relative aspect-video border border-neutral-900 bg-neutral-950 overflow-hidden flex items-center justify-center">
        <div class="absolute top-2 left-2 font-mono text-[10px] text-neutral-600 uppercase">Input: Sketch Area</div>
        
        <!-- Simulation de dessin SVG progressif -->
        <svg class="w-4/5 h-4/5 stroke-orange-500 stroke-[2] fill-none stroke-linecap-square" viewBox="0 0 200 120">
          <!-- Bounding box conteneur -->
          <rect x="10" y="10" width="180" height="100" class="transition-all duration-1000" :class="step >= 1 ? 'stroke-dasharray-0' : 'stroke-dasharray-custom opacity-0'" style="stroke-dasharray: 600; stroke-dashoffset: 0;" />
          <!-- Titre simulé -->
          <line x1="30" y1="30" x2="100" y2="30" class="transition-all duration-700 delay-300" :class="step >= 2 ? '' : 'opacity-0'" />
          <!-- Input 1 -->
          <rect x="30" y="45" width="140" height="15" class="transition-all duration-700 delay-700" :class="step >= 3 ? '' : 'opacity-0'" />
          <!-- Bouton -->
          <rect x="30" y="75" width="60" height="20" class="transition-all duration-500 delay-1000" :class="step >= 4 ? '' : 'opacity-0'" />
        </svg>

        <!-- Quadrillage technique de fond -->
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none -z-10 opacity-30"></div>
      </div>

      <!-- Zone Code Source -->
      <div class="relative aspect-video border border-neutral-900 bg-black p-4 font-mono text-[11px] text-neutral-400 overflow-y-auto">
        <div class="absolute top-2 right-2 text-[10px] text-neutral-600 uppercase">Output: Nuxt UI</div>
        <pre v-if="step >= 5" class="whitespace-pre-wrap text-neutral-300 leading-normal"><span class="text-orange-500">&lt;template&gt;</span>
  <span class="text-neutral-600">&lt;!-- Card Conteneur --&gt;</span>
  <span class="text-orange-400">&lt;UCard</span> <span class="text-neutral-500">class="max-w-sm border-none bg-neutral-900"</span><span class="text-orange-400">&gt;</span>
    <span class="text-orange-400">&lt;h3</span> <span class="text-neutral-500">class="text-lg font-bold"</span><span class="text-orange-400">&gt;</span>Connexion<span class="text-orange-400">&lt;/h3&gt;</span>
    <span class="text-orange-400">&lt;UFormGroup</span> <span class="text-neutral-500">label="Email" class="mt-4"</span><span class="text-orange-400">&gt;</span>
      <span class="text-orange-400">&lt;UInput</span> <span class="text-neutral-500">type="email" color="orange"</span> <span class="text-orange-400">/&gt;</span>
    <span class="text-orange-400">&lt;/UFormGroup&gt;</span>
    <span class="text-orange-400">&lt;UButton</span> <span class="text-neutral-500">color="orange" class="mt-6 shadow-sm"</span><span class="text-orange-400">&gt;</span>Valider<span class="text-orange-400">&lt;/UButton&gt;</span>
  <span class="text-orange-400">&lt;/UCard&gt;</span>
<span class="text-orange-500">&lt;/template&gt;</span></pre>
        <div v-else class="h-full flex items-center justify-center text-neutral-700 text-xs">
          En attente du signal d'analyse...
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  title: String,
  subtitle: String
})

const step = ref(0)
const isDrawing = ref(false)
const hasGenerated = ref(false)

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const startSimulation = async () => {
  if (hasGenerated.value) {
    step.value = 0
    hasGenerated.value = false
    return
  }

  isDrawing.value = true
  
  step.value = 1 // Conteneur
  await sleep(600)
  step.value = 2 // Titre
  await sleep(500)
  step.value = 3 // Input
  await sleep(500)
  step.value = 4 // Bouton
  await sleep(800)
  step.value = 5 // Génération du code
  
  isDrawing.value = false
  hasGenerated.value = true
}
</script>

<style scoped>
.stroke-dasharray-custom {
  stroke-dasharray: 600;
  stroke-dashoffset: 600;
}
.stroke-dasharray-0 {
  stroke-dasharray: 600;
  stroke-dashoffset: 0;
}
</style>