<template>
    <div class="my-8 border border-neutral-800 bg-neutral-950 p-4 font-mono text-xs text-neutral-400 shadow-xl">
        <div class="mb-4 flex items-center justify-between border-b border-neutral-900 pb-2 text-[10px] text-neutral-500 uppercase tracking-widest">
            <span>Docker Container Orchestration</span>
            <span class="text-orange-500 animate-pulse">● Cluster Online</span>
        </div>

        <div class="space-y-2">
            <div 
                v-for="(service, index) in stack" 
                :key="index"
                class="flex flex-col sm:flex-row sm:items-center justify-between border border-neutral-900 bg-black/60 px-4 py-2 hover:border-neutral-800 transition-colors"
            >
                <div class="flex items-center gap-3">
                    <span class="text-orange-500">✔</span>
                    <span class="font-bold text-neutral-200">{{ service.name }}</span>
                    <span class="text-[10px] text-neutral-600 bg-neutral-950 px-1.5 py-0.5 border border-neutral-900">{{ service.port }}</span>
                </div>
                <div class="mt-1 sm:mt-0 flex items-center gap-4 text-[11px]">
                    <span class="text-neutral-500">Memory: {{ service.mem }}</span>
                    <span class="text-orange-400 font-bold uppercase text-[10px]">Stable</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const stack = [
    { name: "archivx-core-api", port: "port:8080", mem: "42MB" },
    { name: "chromadb-vector-store", port: "port:8000", mem: "180MB" },
    { name: "stirling-pdf-ocr", port: "port:8020", mem: "310MB" }
]
</script>