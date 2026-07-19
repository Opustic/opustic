<template>
    <div class="my-8 font-mono text-xs">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div 
                v-for="(feat, index) in features" 
                :key="index"
                class="border border-neutral-900 bg-black/40 p-4 relative overflow-hidden group hover:border-orange-500/40 transition-colors duration-300"
            >
                <div class="absolute top-0 left-0 right-0 h-[2px] bg-neutral-900 group-hover:bg-orange-500 transition-colors duration-300"></div>
                <div class="text-neutral-200 font-bold mb-1 text-[11px] uppercase tracking-wide">{{ feat.title }}</div>
                <div class="text-neutral-500 font-sans leading-relaxed text-[12px]">{{ feat.desc }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    features: Array
})
</script>