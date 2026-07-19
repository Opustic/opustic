<template>
    <div class="my-8 border border-neutral-800 bg-neutral-950 p-6 font-sans text-neutral-200 shadow-xl">
        <div class="mb-4 flex flex-col justify-between border-b border-neutral-900 pb-3 sm:flex-row sm:items-center">
            <div>
                <h4 class="text-sm font-bold uppercase tracking-wider text-orange-500 font-mono">// Pipeline d'Ingestion Local</h4>
                <p class="text-xs text-neutral-500 mt-0.5">Traitement asynchrone sécurisé via l'architecture On-Premise.</p>
            </div>
            <button 
                @click="runPipeline" 
                :disabled="isRunning"
                class="mt-3 border border-orange-500/30 bg-orange-950/20 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-orange-500 transition-all hover:bg-orange-500 hover:text-black disabled:opacity-40 sm:mt-0"
            >
                {{ isRunning ? 'Traitement...' : 'Traiter Doc.pdf' }}
            </button>
        </div>

        <!-- Grille des microservices -->
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div 
                v-for="(step, index) in steps" 
                :key="index"
                class="border p-4 font-mono relative bg-black transition-colors duration-300"
                :class="activeStep === index ? 'border-orange-500' : 'border-neutral-900'"
            >
                <div class="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">Step 0{{ index + 1 }}</div>
                <div class="text-xs font-bold text-neutral-200 uppercase tracking-wide">{{ step.name }}</div>
                <p class="text-[11px] text-neutral-500 font-sans mt-1 leading-relaxed">{{ step.desc }}</p>
                
                <!-- Jauge de progression interne -->
                <div class="absolute bottom-0 left-0 h-[2px] bg-orange-500 transition-all duration-300" :style="{ width: activeStep > index ? '100%' : activeStep === index ? '50%' : '0%' }"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const isRunning = ref(false)
const activeStep = ref(-1)

const steps = [
    { name: "Stirling-PDF", desc: "Extraction brute des couches de texte et normalisation OCR." },
    { name: "Chunking Engine", desc: "Découpage sémantique glissant pour l'analyse contextuelle." },
    { name: "ChromaDB", desc: "Génération des embeddings et indexation vectorielle locale." }
]

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const runPipeline = async () => {
    isRunning.value = true
    activeStep.value = 0
    await sleep(800)
    activeStep.value = 1
    await sleep(800)
    activeStep.value = 2
    await sleep(800)
    activeStep.value = -1
    isRunning.value = false
}
</script>