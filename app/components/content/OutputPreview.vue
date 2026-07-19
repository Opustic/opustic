<template>
  <div class="my-8 border border-neutral-800 bg-neutral-950 p-6 font-sans text-neutral-200 shadow-xl">
    <!-- Contrôle du miroir -->
    <div class="mb-6 flex items-center justify-between border-b border-neutral-900 pb-4">
      <div class="font-mono text-xs">
        <span class="text-neutral-500">Mode actif : </span>
        <span class="text-orange-400 font-bold uppercase tracking-wide">{{ isCodeView ? 'Composant Live' : 'Filaire Brut' }}</span>
      </div>
      
      <!-- Switch ultra carré -->
      <button 
        @click="isCodeView = !isCodeView"
        class="border border-neutral-800 bg-black px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-neutral-400 transition-all hover:border-orange-500 hover:text-orange-500"
      >
        [ Basculer la vue ]
      </button>
    </div>

    <!-- Zone d'affichage dynamique -->
    <div class="flex items-center justify-center p-8 bg-black/50 border border-neutral-900 min-h-64 relative overflow-hidden">
      
      <!-- Vue A : Croquis Filaire Brut -->
      <div v-if="!isCodeView" class="w-full max-w-xs space-y-4 border border-dashed border-neutral-800 p-6 font-mono text-neutral-600 opacity-80">
        <div class="border border-neutral-800 p-1 text-center text-[10px] text-orange-500/70 border-dashed">[ BOX: H3_TITLE ]</div>
        <div class="space-y-1">
          <div class="text-[9px]">[ LABEL ]</div>
          <div class="h-8 border border-neutral-800 border-dashed"></div>
        </div>
        <div class="h-9 w-24 border border-neutral-800 border-dashed flex items-center justify-center text-[10px]">[ BTN ]</div>
      </div>

      <!-- Vue B : Composant Production Faux Rendu Nuxt UI (sans dépendance externe complexe) -->
      <div v-else class="w-full max-w-xs bg-neutral-900 border border-neutral-800 p-6 shadow-2xl transition-all duration-300">
        <h3 class="text-base font-bold text-white tracking-tight">Espace Authentification</h3>
        <p class="text-xs text-neutral-500 mt-1">Accédez à votre tableau de bord.</p>
        
        <div class="mt-4 space-y-3 font-sans">
          <div>
            <label class="block text-xs font-medium text-neutral-400 mb-1">Identifiant professionnel</label>
            <input type="text" disabled value="serge.guimbi@opustic.dev" class="w-full bg-neutral-950 border border-neutral-800 px-3 py-1.5 text-xs text-neutral-300 focus:outline-none focus:border-orange-500" />
          </div>
          <button class="w-full bg-orange-500 text-black text-xs font-bold uppercase tracking-wider py-2 transition-colors hover:bg-orange-600">
            Connexion
          </button>
        </div>
      </div>

      <!-- Scanner Laser Horizontal lors du switch -->
      <div class="absolute inset-x-0 h-[1px] bg-orange-500/80 shadow-[0_0_8px_#f97316] pointer-events-none animate-scan"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  mockType: {
    type: String,
    default: 'login-form'
  }
})

const isCodeView = ref(false)
</script>

<style scoped>
@keyframes scan {
  0% { top: 0%; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}
.animate-scan {
  animation: scan 2s infinite linear;
}
</style>