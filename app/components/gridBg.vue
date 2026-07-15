<script setup lang="ts">
interface Props {
    cols?: number
    rows?: number
    /** Temps entre deux cellules (ms) — vitesse de déplacement */
    stepDuration?: number
    /** Durée du fade-out (ms) — plus long que stepDuration = traînée douce */
    fadeDuration?: number
}

const props = withDefaults(defineProps<Props>(), {
    cols: 16,
    rows: 10,
    stepDuration: 90,
    fadeDuration: 700
})

const cells = computed(() => {
    const result: { row: number, col: number }[] = new Array(props.rows * props.cols)
    let i = 0
    for (let row = 0; row < props.rows; row++) {
        for (let col = 0; col < props.cols; col++) {
            result[i++] = { row, col }
        }
    }
    return result
})

const cellRefs = ref<(HTMLElement | null)[]>([])
function setCellRef(el: Element | ComponentPublicInstance | null, i: number) {
    cellRefs.value[i] = el as HTMLElement | null
}

let timer: ReturnType<typeof setInterval> | undefined
let currentEl: HTMLElement | null = null
let position = 0 // index en parcours "colonne par colonne" (vertical d'abord)

function tick() {
    const totalCells = props.rows * props.cols
    const row = position % props.rows
    const col = Math.floor(position / props.rows) % props.cols
    const domIndex = row * props.cols + col // conversion vers l'ordre du DOM (rendu ligne par ligne)

    currentEl?.classList.remove('is-active')
    const el = cellRefs.value[domIndex]
    el?.classList.add('is-active')
    currentEl = el ?? null

    position = (position + 1) % totalCells
}

onMounted(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    timer = setInterval(tick, props.stepDuration)
})

onUnmounted(() => {
    clearInterval(timer)
})
</script>

<template>
    <div
        class="pointer-events-none absolute inset-0 grid h-full w-full"
        :style="{
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            '--fade': `${fadeDuration}ms`
        }"
        aria-hidden="true"
    >
        <div
            v-for="(cell, i) in cells"
            :key="i"
            :ref="(el) => setCellRef(el, i)"
            class="grid-cell border-r border-b border-brand-dark/[0.04] dark:border-brand-light/[0.04]"
        />
    </div>
</template>

<style scoped>
.grid-cell {
    background-color: transparent;
    transition: background-color var(--fade) ease-out;
    --glow-color: rgba(255, 102, 0, 0.35);
}

.grid-cell.is-active {
    background-color: var(--glow-color);
    transition: background-color 80ms ease-in;
}

:global(.dark) .grid-cell {
    --glow-color: var(--color-brand-orange-glow);
}
</style>