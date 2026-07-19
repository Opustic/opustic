<template>
  <div class="my-8 border border-neutral-800 bg-neutral-950 p-6 font-sans text-neutral-200 shadow-xl">
    <!-- Header du Dashboard -->
    <div class="mb-6 flex flex-col justify-between border-b border-neutral-900 pb-4 sm:flex-row sm:items-center">
      <div>
        <h4 class="text-sm font-bold uppercase tracking-wider text-orange-500 font-mono">
          // {{ title || 'Console de Surveillance active' }}
        </h4>
        <p class="text-xs text-neutral-500 mt-0.5">{{ subtitle || 'Statut des workers en temps réel.' }}</p>
      </div>
      <div class="mt-3 flex items-center gap-4 font-mono text-xs sm:mt-0">
        <div class="flex items-center gap-2">
          <span class="h-2 w-2 rounded-none bg-orange-500 animate-pulse shadow-[0_0_8px_#f97316]"></span>
          <span class="text-neutral-400">Workers: 4 Active</span>
        </div>
        <div class="text-neutral-500">Queue: 0 pending</div>
      </div>
    </div>

    <!-- Contenu Principal Grid -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <!-- Faux Graphique SVG (2/3 de l'espace) -->
      <div class="border border-neutral-900 bg-black/40 p-4 lg:col-span-2">
        <div class="mb-2 flex items-center justify-between font-mono text-xs text-neutral-500">
          <span>Latence des Scans (ms)</span>
          <span class="text-orange-400/80">Moyenne: 248ms</span>
        </div>
        
        <!-- Graphique SVG Minimaliste -->
        <div class="relative w-full h-32 bg-neutral-950/60 border border-neutral-900/50 overflow-hidden">
          <svg class="w-full h-full overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
            <!-- Grille de fond -->
            <line x1="0" y1="25" x2="300" y2="25" stroke="#171717" stroke-dasharray="2 2" />
            <line x1="0" y1="50" x2="300" y2="50" stroke="#171717" stroke-dasharray="2 2" />
            <line x1="0" y1="75" x2="300" y2="75" stroke="#171717" stroke-dasharray="2 2" />
            
            <!-- Ligne de tendance orange -->
            <path
              d="M 0 80 Q 30 40 60 70 T 120 30 T 180 60 T 240 20 T 300 45"
              fill="none"
              stroke="#f97316"
              stroke-width="1.5"
              class="drop-shadow-[0_2px_4px_rgba(249,115,22,0.4)]"
            />
          </svg>
        </div>
      </div>

      <!-- Métadonnées & Status (1/3 de l'espace) -->
      <div class="flex flex-col justify-between border border-neutral-900 bg-black/40 p-4 font-mono text-xs">
        <div class="space-y-2">
          <div class="text-neutral-500 uppercase text-[10px] tracking-wider border-b border-neutral-900 pb-1">Targets</div>
          <div class="flex justify-between">
            <span class="text-neutral-400">concurrent-a.com</span>
            <span class="text-emerald-500 bg-emerald-950/30 px-1.5 border border-emerald-900/50">200 OK</span>
          </div>
          <div class="flex justify-between">
            <span class="text-neutral-400">ecom-challenger.fr</span>
            <span class="text-emerald-500 bg-emerald-950/30 px-1.5 border border-emerald-900/50">200 OK</span>
          </div>
          <div class="flex justify-between">
            <span class="text-neutral-400">saas-competitor.io</span>
            <span class="text-orange-500 bg-orange-950/30 px-1.5 border border-orange-900/50">302 CHG</span>
          </div>
        </div>
        <div class="mt-4 pt-2 border-t border-neutral-900 text-[11px] text-neutral-500">
          Dernière synchronisation globale : il y a 2 min
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  subtitle: String
})
</script>