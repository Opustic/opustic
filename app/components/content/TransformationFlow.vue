<template>
  <div class="my-8 border border-neutral-800 bg-neutral-950 p-6 font-mono shadow-xl text-xs">
    <div class="mb-4 flex items-center justify-between text-neutral-500 text-[10px] tracking-wider uppercase">
      <span>Pipeline de Traitement Asynchrone</span>
      <span class="text-orange-500 animate-pulse">● System Ready</span>
    </div>

    <!-- Flow Grid -->
    <div class="grid grid-cols-1 gap-2 md:grid-cols-4 md:gap-4 relative">
      <div 
        v-for="(step, index) in steps" 
        :key="index"
        class="border border-neutral-900 bg-black/40 p-4 relative overflow-hidden group transition-all duration-300 hover:border-orange-500/40"
      >
        <!-- Top orange indicator active on hover -->
        <div class="absolute top-0 left-0 right-0 h-[2px] bg-neutral-900 group-hover:bg-orange-500 transition-colors duration-300"></div>
        
        <div class="text-orange-500 font-bold mb-1 text-[11px]">{{ step.stage }}</div>
        <div class="text-neutral-300 font-sans leading-relaxed text-[12px]">{{ step.label }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  steps: {
    type: Array,
    default: () => [
      { stage: '01. Input', label: 'Dessin sur Canvas' },
      { stage: '02. Ingestion', label: 'Normalisation image brute' },
      { stage: '03. Vision IA', label: 'Calcul des Bounding Boxes' },
      { stage: '04. Output', label: 'Rendu du composant Nuxt UI' }
    ]
  }
})
</script>