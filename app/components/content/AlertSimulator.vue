<template>
  <div class="my-8 border border-neutral-800 bg-neutral-950 p-6 font-sans text-neutral-200 shadow-xl relative overflow-hidden">
    <!-- Main trigger box -->
    <div class="flex flex-col items-center justify-center p-8 border border-dashed border-neutral-800 bg-black/20 text-center">
      <p class="text-xs text-neutral-500 font-mono mb-4">// Test du flux d'automatisation asynchrone</p>
      <button
        @click="triggerAlert"
        :disabled="isProcessing"
        class="border border-orange-500 bg-orange-500/10 px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.1)] transition-all hover:bg-orange-500 hover:text-black hover:shadow-[0_0_25px_rgba(249,115,22,0.3)] disabled:opacity-40"
      >
        {{ isProcessing ? 'Analyse IA & n8n en cours...' : triggerLabel }}
      </button>
    </div>

    <!-- Faux Toast Notification Push n8n -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform translate-y-4 opacity-0 sm:translate-y-0 sm:translate-x-4"
      enter-to-class="transform translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="showAlert" class="absolute top-4 right-4 left-4 sm:left-auto sm:w-80 border border-orange-500 bg-black p-4 font-mono shadow-[0_0_30px_rgba(249,115,22,0.2)]">
        <div class="mb-2 flex items-center justify-between border-b border-neutral-900 pb-1.5 text-[10px]">
          <span class="text-orange-500 font-bold">● WEBHOOK N8N INCOMING</span>
          <span class="text-neutral-500">Instantané</span>
        </div>
        <h5 class="text-xs font-bold text-neutral-200 uppercase mb-1">Alerte : Modification de Tarification</h5>
        <p class="text-[11px] leading-relaxed text-neutral-400">
          <span class="text-orange-400/80">Résumé Groq API :</span> Le concurrent a réduit le prix de son offre principale de 15%. Une stratégie d'acquisition agressive est détectée sur leur page vitrine.
        </p>
        <div class="mt-3 flex justify-end">
          <button @click="showAlert = false" class="text-[10px] uppercase tracking-wider text-neutral-500 hover:text-neutral-200">
            [Fermer]
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  triggerLabel: {
    type: String,
    default: 'Simuler une modification de prix concurrent'
  }
})

const isProcessing = ref(false)
const showAlert = ref(false)

const triggerAlert = () => {
  isProcessing.value = true
  showAlert.value = false
  
  // Simulation de la latence du webhook / LLM
  setTimeout(() => {
    isProcessing.value = false
    showAlert.value = true
  }, 2200)
}
</script>