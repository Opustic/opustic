<script setup lang="ts">
import { ref, onMounted } from 'vue'

// --- 1. Gestion Tripartite (Typing Effect) ---

// Tes trois piliers d'expertise
const expertises = [
  'Data Analyst',
  'Full-Stack Developer',
  'Automation Developer'
]

// Références réactives pour l'animation
const displayedExpertise = ref('')
const expertiseIndex = ref(0)
const charIndex = ref(0)
const isDeleting = ref(false)

// Paramètres de vitesse (en ms)
const typingSpeed = 100 // Vitesse de frappe normale
const erasingSpeed = 50  // Vitesse d'effacement
const newTextDelay = 2000 // Pause avant de commencer à effacer
const eraseDelay = 1000   // Pause avant de taper le texte suivant

function typeText() {
  const currentText = expertises[expertiseIndex.value]

  if (isDeleting.value) {
    // Phase d'effacement
    displayedExpertise.value = currentText.substring(0, charIndex.value - 1)
    charIndex.value--
  } else {
    // Phase de frappe
    displayedExpertise.value = currentText.substring(0, charIndex.value + 1)
    charIndex.value++
  }

  // Détermination de la prochaine action
  let nextSpeed = isDeleting.value ? erasingSpeed : typingSpeed

  if (!isDeleting.value && charIndex.value === currentText.length) {
    // Texte entier tapé, pause avant d'effacer
    isDeleting.value = true
    nextSpeed = newTextDelay
  } else if (isDeleting.value && charIndex.value === 0) {
    // Texte entièrement effacé, passer au suivant
    isDeleting.value = false
    expertiseIndex.value = (expertiseIndex.value + 1) % expertises.length
    nextSpeed = eraseDelay
  }

  // Boucle récursive via setTimeout
  setTimeout(typeText, nextSpeed)
}

// Lancer l'animation une fois le composant monté
onMounted(() => {
  setTimeout(typeText, eraseDelay)
})


</script>

<template>
  <section class="relative flex min-h-screen w-full flex-col border-b border-premium pt-20">

    <LazyGridBg
      :cols="16"
      :rows="10"
      :step-duration="220"
      :fade-duration="1400"
      class="opacity-30"
    />

    <div class="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 py-16">

      <!-- Bandeau statut -->
      <div class="mb-8 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-brand-dark/60 dark:text-brand-light/60">
        <span class="h-2 w-2 bg-brand-orange" />
        Disponible pour de nouveaux projets
        <span class="text-brand-dark/30 dark:text-brand-light/30">— 2026</span>
      </div>

      <!-- Grand titre -->
      <h1 class="text-5xl leading-[0.95] font-semibold tracking-tight sm:text-7xl lg:text-8xl">
        <span class="block">Serge GUIMBI</span>
        <!-- Ligne d'animation de la machine à écrire -->
        <span class="block text-brand-dark/30 dark:text-brand-light/30 min-h-[1.2em]">
          <span class="typewriter-text">{{ displayedExpertise }}</span>
          <!-- Le curseur clignotant -->
          <span class="typewriter-cursor" aria-hidden="true">|</span>
        </span>
      </h1>

      <!-- Description courte clarifiée -->
      <p class="mt-8 max-w-2xl font-sans text-base text-brand-dark/70 dark:text-brand-light/70 sm:text-lg leading-relaxed">
        Je conçois des architectures digitales sur-mesure — de la modélisation de vos données à la conception d'interfaces performantes, en passant par l'automatisation intégrale de vos processus métier.
      </p>

      <!-- CTA -->
      <div class="mt-10">
        <NuxtLink
          to="/#projects"
          class="group inline-flex items-center gap-4 border border-brand-dark dark:border-brand-light bg-brand-dark dark:bg-brand-light px-6 py-3.5 font-mono text-xs uppercase tracking-widest text-brand-light dark:text-brand-dark transition-colors duration-200 hover:border-brand-orange hover:bg-brand-orange dark:hover:bg-brand-orange dark:hover:text-brand-light"
        >
          Voir mes réalisations
          <UIcon
            name="i-lucide-arrow-down-right"
            class="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
          />
        </NuxtLink>
      </div>

      <!-- Grille de specs -->

        <div class="mt-10 border border-premium">

            <LazyTechnologies />

        </div>

    </div>

  </section>
</template>

<style scoped>
/* --- Styles de l'animation Typewriter --- */

.typewriter-cursor {
  display: inline-block;
  margin-left: 1px;
  color: #ff5722; /* Utilise ton orange de marque ici */
  animation: blink 1s step-end infinite;
  font-weight: 200; /* Plus fin que le texte */
}

/* Clignotement du curseur */
@keyframes blink {
  from, to { opacity: 1; }
  50% { opacity: 0; }
}
</style>