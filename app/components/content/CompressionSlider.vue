<template>
  <div class="my-8 border border-neutral-800 bg-neutral-950 p-6 font-sans text-neutral-200">
    <div class="mb-4 flex items-center justify-between border-b border-neutral-900 pb-3 font-mono text-[11px] uppercase tracking-wider text-neutral-500">
      <span>// Rendu algorithmique : JPG vs AVIF</span>
      <span class="text-orange-500 font-bold">Gain : {{ saving }}</span>
    </div>

    <div class="relative aspect-video w-full bg-neutral-900 border border-neutral-900 overflow-hidden select-none group">
      <!-- Image Après (AVIF - Fond) -->
      <div class="absolute inset-0 bg-neutral-950 flex items-center justify-center">
        <div class="text-center font-mono text-xs text-orange-500/80">
          [ Simulation Target : Fichier AVIF Haute Fidélité ]
          <div class="text-[10px] text-neutral-600 mt-1">{{ optimizedSize }}</div>
        </div>
      </div>

      <!-- Image Avant (JPG - Masque mobile) -->
      <div 
        class="absolute inset-y-0 left-0 bg-neutral-900 border-r border-orange-500 overflow-hidden flex items-center justify-center"
        :style="{ width: sliderPosition + '%' }"
      >
        <!-- Remplacement du calcul JS par une largeur CSS relative absolue pour éviter le blocage -->
        <div class="absolute inset-0 w-full min-w-[800px] h-full bg-neutral-900 flex items-center justify-center">
          <div class="text-center font-mono text-xs text-neutral-500">
            [ Source : Fichier JPEG Original ]
            <div class="text-[10px] text-neutral-600 mt-1">{{ originalSize }}</div>
          </div>
        </div>
      </div>

      <input 
        type="range" 
        min="0" 
        max="100" 
        v-model="sliderPosition" 
        class="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
    originalSize: String,
    optimizedSize: String,
    saving: String
})

const sliderPosition = ref(50)
</script>