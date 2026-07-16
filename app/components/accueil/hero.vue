<script setup lang="ts">
const specs = [
  { label: 'Stack', value: 'Nuxt / Vue / TS' },
  { label: 'Focus', value: 'Full-stack & SaaS' },
  { label: 'Basé à', value: 'Pointe-Noire, CG' },
  { label: 'Statut', value: 'Disponible' }
]
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
        <h1 class="text-4xl leading-[1.05] font-semibold tracking-tight sm:text-6xl lg:text-7xl">
          <span class="block">Serge GUIMBI</span>
          <span class="mt-4 block font-mono text-lg font-light uppercase tracking-widest text-brand-dark/40 dark:text-brand-light/40 sm:text-2xl">
            <span class="text-brand-orange">Data Analyst</span> 
            <span class="mx-2 sm:mx-3">•</span> 
            <span class="text-brand-dark dark:text-brand-light">Full-Stack Dev</span> 
            <span class="mx-2 sm:mx-3">•</span> 
            <span class="text-brand-orange">Automation Expert</span>
          </span>
        </h1>

        <!-- Description courte -->
        <p class="mt-8 max-w-2xl font-sans text-base text-brand-dark/70 dark:text-brand-light/70 sm:text-lg leading-relaxed">
          Je construis des ponts entre la donnée et le produit. Spécialisé dans l'analyse de données, le développement d'applications sur-mesure et l'automatisation de workflows, je conçois des systèmes fiables et autonomes de bout en bout.
        </p>

        <!-- CTA -->
        <div class="mt-10">
            <NuxtLink
                to="/#projects"
                class="group inline-flex items-center gap-4 border border-brand-dark dark:border-brand-light bg-brand-dark dark:bg-brand-light px-6 py-3.5 font-mono text-xs uppercase tracking-widest text-brand-light dark:text-brand-dark transition-colors duration-200 hover:border-brand-orange hover:bg-brand-orange dark:hover:bg-brand-orange dark:hover:text-brand-light"
            >
            Voir mes projets
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