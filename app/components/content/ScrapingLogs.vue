<template>
  <div class="my-8 border border-neutral-800 bg-neutral-950 p-6 font-mono text-xs text-neutral-300 shadow-xl">
    <!-- Terminal Header -->
    <div class="mb-4 flex items-center justify-between border-b border-neutral-900 pb-3">
      <div class="flex items-center gap-2">
        <div class="h-2.5 w-2.5 bg-neutral-800"></div>
        <span class="text-neutral-500 text-[11px] tracking-wider uppercase">Worker Console // {{ target }}</span>
      </div>
      <button 
        @click="runSimulation" 
        :disabled="isRunning"
        class="border border-orange-500/30 bg-orange-950/20 px-3 py-1 font-bold uppercase tracking-wider text-orange-500 transition-all hover:bg-orange-500 hover:text-black disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-orange-500"
      >
        {{ isRunning ? 'Scan en cours...' : 'Déclencher Scan' }}
      </button>
    </div>

    <!-- Log Screen -->
    <div class="h-48 overflow-y-auto bg-black/60 p-4 font-mono leading-relaxed border border-neutral-900 text-neutral-400">
      <div v-for="(log, index) in logs" :key="index" class="mb-1">
        <span class="text-neutral-600">[{{ log.time }}]</span>
        <span :class="{
          'text-orange-500 font-bold': log.type === 'warn',
          'text-emerald-500 font-bold': log.type === 'success',
          'text-neutral-400': log.type === 'info'
        }">
          {{ log.text }}
        </span>
      </div>
      <!-- Cursor -->
      <div v-if="isRunning" class="inline-block h-3 w-1.5 bg-orange-500 animate-pulse ml-1"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  target: {
    type: String,
    default: 'https://concurrent-cible.com'
  }
})

const logs = ref([{ time: '00:00:00', type: 'info', text: 'System idle. Waiting for trigger...' }])
const isRunning = ref(false)

const getTimestamp = () => {
  const now = new Date()
  return now.toTimeString().split(' ')[0]
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const runSimulation = async () => {
  isRunning.value = true
  logs.value = [{ time: getTimestamp(), type: 'info', text: 'Initiating manual scan job...' }]
  
  await sleep(800)
  logs.value.push({ time: getTimestamp(), type: 'info', text: 'RQ Worker fetched job: [scrape_target]' })
  
  await sleep(1000)
  logs.value.push({ time: getTimestamp(), type: 'info', text: 'Trying static extraction via Scrapy...' })
  
  await sleep(1200)
  logs.value.push({ time: getTimestamp(), type: 'warn', text: 'WARNING: Missing hydration. Target page requires Javascript execution.' })
  
  await sleep(800)
  logs.value.push({ time: getTimestamp(), type: 'info', text: 'Falling back to dynamic extraction via Playwright Async...' })
  
  await sleep(1500)
  logs.value.push({ time: getTimestamp(), type: 'info', text: 'Snapshot captured. HTML structural layout diff analysis started.' })
  
  await sleep(1000)
  logs.value.push({ time: getTimestamp(), type: 'success', text: 'SUCCESS: Structural modification detected. Diff stored in DB.' })
  
  isRunning.value = false
}
</script>