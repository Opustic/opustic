<script setup lang="ts">
interface GalleryImage {
    src: string
    alt: string
    caption?: string
}

interface Props {
    images: GalleryImage[]
}

const props = defineProps<Props>()

const currentIndex = ref(0)
const hasImages = computed(() => Array.isArray(props.images) && props.images.length > 0)
const total = computed(() => props.images?.length ?? 0)

function goTo(index: number) {
    if (!hasImages.value) return
    currentIndex.value = ((index % total.value) + total.value) % total.value
}

function next() {
    goTo(currentIndex.value + 1)
}

function prev() {
    goTo(currentIndex.value - 1)
}

function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowRight') next()
    if (e.key === 'ArrowLeft') prev()
}

// Support tactile basique (swipe)
let touchStartX = 0

function onTouchStart(e: TouchEvent) {
    touchStartX = e.touches[0]?.clientX ?? 0
}

function onTouchEnd(e: TouchEvent) {
    const touchEndX = e.changedTouches[0]?.clientX ?? 0
    const delta = touchEndX - touchStartX
    if (Math.abs(delta) < 40) return
    delta > 0 ? prev() : next()
}
</script>

<template>
    <div
        v-if="hasImages"
        class="not-prose border border-premium"
        tabindex="0"
        @keydown="handleKeydown"
    >
        <!-- Image active -->
        <div
            class="relative aspect-video w-full overflow-hidden bg-brand-dark/[0.02] dark:bg-brand-light/[0.02]"
            @touchstart="onTouchStart"
            @touchend="onTouchEnd"
        >
            <Transition mode="out-in" enter-active-class="transition-opacity duration-300" enter-from-class="opacity-0" leave-active-class="transition-opacity duration-150" leave-to-class="opacity-0">
                <img
                    :key="currentIndex"
                    :src="images[currentIndex]?.src"
                    :alt="images[currentIndex]?.alt ?? ''"
                    class="h-full w-full object-cover"
                    loading="lazy"
                >
            </Transition>

            <!-- Flèches -->
            <button
                v-if="total > 1"
                type="button"
                aria-label="Image précédente"
                class="absolute top-1/2 left-3 flex h-9 w-9 -translate-y-1/2 items-center justify-center border border-premium bg-brand-light/90 text-brand-dark transition-colors duration-200 hover:border-brand-orange hover:text-brand-orange dark:bg-brand-dark/90 dark:text-brand-light"
                @click="prev"
            >
                <UIcon name="i-lucide-chevron-left" class="h-4 w-4" />
            </button>

            <button
                v-if="total > 1"
                type="button"
                aria-label="Image suivante"
                class="absolute top-1/2 right-3 flex h-9 w-9 -translate-y-1/2 items-center justify-center border border-premium bg-brand-light/90 text-brand-dark transition-colors duration-200 hover:border-brand-orange hover:text-brand-orange dark:bg-brand-dark/90 dark:text-brand-light"
                @click="next"
            >
                <UIcon name="i-lucide-chevron-right" class="h-4 w-4" />
            </button>

            <!-- Compteur -->
            <div class="absolute right-3 bottom-3 border border-premium bg-brand-light/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-brand-dark dark:bg-brand-dark/90 dark:text-brand-light">
                {{ String(currentIndex + 1).padStart(2, '0') }} / {{ String(total).padStart(2, '0') }}
            </div>
        </div>

        <!-- Légende -->
        <p
            v-if="images[currentIndex]?.caption"
            class="border-t border-premium px-4 py-3 font-mono text-xs text-brand-dark/60 dark:text-brand-light/60"
        >
            {{ images[currentIndex].caption }}
        </p>

        <!-- Miniatures -->
        <div v-if="total > 1" class="flex border-t border-premium">
            <button
                v-for="(image, i) in images"
                :key="i"
                type="button"
                class="relative aspect-video flex-1 overflow-hidden border-r border-premium last:border-r-0"
                :aria-label="`Aller à l'image ${i + 1}`"
                @click="goTo(i)"
            >
                <img :src="image.src" :alt="image.alt" class="h-full w-full object-cover" loading="lazy">
                <span
                    class="absolute inset-0 transition-colors duration-200"
                    :class="i === currentIndex ? 'bg-brand-orange/10 ring-2 ring-inset ring-brand-orange' : 'bg-brand-dark/40 hover:bg-brand-dark/10'"
                />
            </button>
        </div>
    </div>
</template>