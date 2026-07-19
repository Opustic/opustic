<template>
    <div class="my-8 border border-neutral-800 bg-neutral-950 p-6 font-sans text-neutral-200 shadow-xl">
        <div class="mb-4 font-mono text-xs text-neutral-500 uppercase tracking-wider">// Comparateur d'Indexation : Sémantique vs Textuel</div>
        
        <!-- Zone de saisie -->
        <div class="mb-6 flex gap-2">
            <input 
                v-model="query" 
                type="text" 
                placeholder="Ex: Facture de réparation mécanique..." 
                class="flex-1 bg-black border border-neutral-900 px-3 py-2 font-mono text-xs text-neutral-200 focus:outline-none focus:border-orange-500"
            />
            
            <button 
                @click="triggerSearch"
                class="border border-neutral-800 bg-black px-4 py-2 font-mono text-xs uppercase text-neutral-400 hover:border-orange-500 hover:text-orange-500 transition-colors"
            >
                Query
            </button>
        </div>

        <!-- Comparatif à deux colonnes -->
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <!-- Recherche textuelle classique -->
            <div class="border border-neutral-900 bg-black/40 p-4 font-mono text-xs">
                <div class="text-[10px] text-neutral-500 uppercase mb-3">// Recherche SQL (LIKE %query%)</div>
                <div v-if="hasSearched" class="text-neutral-500 italic">
                    0 documents trouvés. <br><span class="text-[11px] font-sans text-neutral-600 block mt-1">Échec : Le mot exact n'est pas présent dans le texte brut.</span>
                </div>
                <div v-else class="text-neutral-700">En attente d'exécution...</div>
            </div>

            <!-- Recherche sémantique vectorielle -->
            <div class="border border-neutral-900 bg-black p-4 font-mono text-xs relative overflow-hidden group">
                <div class="text-[10px] text-orange-500 uppercase mb-3">// Recherche Vectorielle (Cos Sim)</div>
                <div v-if="hasSearched" class="space-y-2">
                    <div class="border border-neutral-900 bg-neutral-950 p-2 border-l-2 border-l-orange-500">
                        <div class="flex justify-between font-bold text-[11px]">
                            <span class="text-neutral-300">doc_2026_garage.pdf</span>
                            <span class="text-orange-400">Score: 0.94</span>
                        </div>
                        <p class="text-[11px] font-sans text-neutral-500 mt-1">« Maintenance du bloc moteur et remplacement alternateur »</p>
                    </div>
                </div>
                <div v-else class="text-neutral-700">En attente d'exécution...</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const query = ref('')
const hasSearched = ref(false)

const triggerSearch = () => {
    if (!query.value.trim()) return
    hasSearched.value = true
}
</script>