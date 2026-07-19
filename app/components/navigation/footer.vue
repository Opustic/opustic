<script setup lang="ts">
import { motion, useScroll, useTransform, useReducedMotion } from 'motion-v'

const prefersReduced = useReducedMotion()
const wordmarkRef = ref<HTMLElement>()

const { scrollYProgress: wordmarkProgress } = useScroll({
  target: wordmarkRef,
  offset: ['start end', 'end start'],
})
const wordmarkY = useTransform(wordmarkProgress, [0, 1], [40, -40])

const navLinks = [
  { label: 'Accueil', to: '#' },
  { label: 'Projets', to: '#projets' },
  { label: 'À propos', to: '#apropos' },
  { label: 'FAQ', to: '#faq' },
  { label: 'Contacts', to: '#contacts' }
]

const taglineItems = [
  'Disponible pour de nouveaux projets',
  'Basé à Brazzaville, Congo',
  'Conçu à Brazzaville, déployé partout'
]

// Horloge locale live
const localTime = ref('')
let clockTimer: ReturnType<typeof setInterval> | undefined

function updateClock() {
  localTime.value = new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Africa/Brazzaville'
  }).format(new Date())
}

onMounted(() => {
  updateClock()
  clockTimer = setInterval(updateClock, 1000 * 30)
})

onUnmounted(() => {
  clearInterval(clockTimer)
})

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="relative overflow-hidden">
    <!-- Bande marquee fantaisiste -->
    <UMarquee
      pause-on-hover
      :overlay="false"
      :ui="{ root: '[--gap:--spacing(12)] [--duration:35s] border-b border-premium bg-brand-dark py-3' }"
    >
      <div
        v-for="(item, i) in taglineItems"
        :key="i"
        class="flex shrink-0 items-center gap-12"
      >
        <span class="font-mono text-xs uppercase tracking-widest text-brand-light/70">
          {{ item }}
        </span>
        <span class="h-1.5 w-1.5 shrink-0 bg-brand-orange" />
      </div>
    </UMarquee>

    <!-- Wordmark géant + grille animée en fond -->
    <div ref="wordmarkRef" class="relative border-b border-premium">
      <GridBg :cols="20" :rows="6" :step-duration="220" :fade-duration="1400" class="opacity-40" />

      <motion.div
        :style="{ y: wordmarkY }"
        class="relative mx-auto max-w-6xl px-6 p-16"
      >
        <NuxtLink
          to="#"
          class="block select-none text-center font-sans text-[18vw] leading-none font-bold tracking-tighter text-transparent transition-colors duration-300 [-webkit-text-stroke:1px_var(--color-brand-dark)] hover:[-webkit-text-stroke:1px_var(--color-brand-orange)] dark:[-webkit-text-stroke:1px_var(--color-brand-light)] sm:text-[14vw]"
        >
          OPUSTIC
        </NuxtLink>
      </motion.div>
    </div>

    <!-- Contenu principal -->
    <div class="mx-auto max-w-6xl px-6 py-12">
      <div class="grid grid-cols-1 gap-10 sm:grid-cols-3">

        <!-- Nav -->
        <motion.div
          :initial="{ opacity: 0, y: 16 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :viewport="{ once: true, margin: '-40px' }"
          :transition="prefersReduced ? { duration: 0 } : { duration: 0.45 }"
        >
          <p class="mb-4 font-mono text-[10px] uppercase tracking-widest text-brand-dark/40 dark:text-brand-light/40">
            Navigation
          </p>
          <nav class="flex flex-col gap-2">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.label"
              :to="link.to"
              class="w-fit font-mono text-sm text-brand-dark/70 transition-colors duration-200 hover:text-brand-orange dark:text-brand-light/70"
            >
              {{ link.label }}
            </NuxtLink>
          </nav>
        </motion.div>

        <!-- Statut / horloge -->
        <motion.div
          :initial="{ opacity: 0, y: 16 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :viewport="{ once: true, margin: '-40px' }"
          :transition="prefersReduced ? { duration: 0 } : { duration: 0.45, delay: 0.1 }"
        >
          <p class="mb-4 font-mono text-[10px] uppercase tracking-widest text-brand-dark/40 dark:text-brand-light/40">
            Statut
          </p>
          <div class="flex items-center gap-2 font-mono text-sm text-brand-dark dark:text-brand-light">
            <span class="h-2 w-2 animate-pulse bg-brand-orange" />
            Disponible
          </div>
          <p class="mt-2 font-mono text-sm text-brand-dark/50 dark:text-brand-light/50">
            {{ localTime }} — Brazzaville, CG
          </p>
        </motion.div>

        <!-- Back to top -->
        <motion.div
          :initial="{ opacity: 0, y: 16 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :viewport="{ once: true, margin: '-40px' }"
          :transition="prefersReduced ? { duration: 0 } : { duration: 0.45, delay: 0.2 }"
          class="flex items-start justify-start sm:justify-end"
        >
          <button
            type="button"
            class="group flex items-center gap-3 border border-premium px-5 py-3 font-mono text-xs uppercase tracking-widest text-brand-dark transition-colors duration-200 hover:border-brand-orange hover:text-brand-orange dark:text-brand-light"
            @click="scrollToTop"
          >
            Haut de page
            <UIcon
              name="i-lucide-arrow-up"
              class="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5"
            />
          </button>
        </motion.div>
      </div>

      <!-- Ligne du bas -->
      <div class="mt-16 flex flex-col gap-3 border-t border-premium p-6 font-mono text-[10px] uppercase tracking-widest text-brand-dark/40 sm:flex-row sm:items-center sm:justify-between dark:text-brand-light/40">
        <span>© {{ new Date().getFullYear() }} Serge GUIMBI — Tous droits réservés</span>
        <span>Conçu &amp; codé avec Nuxt, Tailwind &amp; beaucoup de café</span>
      </div>
    </div>
  </footer>
</template>