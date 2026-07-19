<script setup lang="ts">
import { motion, useReducedMotion } from 'motion-v'

const prefersReduced = useReducedMotion()

interface FaqItem {
  question: string
  answer: string
}

const faqs: FaqItem[] = [
  {
    question: 'Quel type de projets acceptez-vous ?',
    answer: 'Applications web sur-mesure, plateformes SaaS, automatisation de workflows et missions d\'analyse de données. Je travaille aussi bien sur des projets complets de A à Z que sur des interventions ponctuelles.'
  },
  {
    question: 'Quel est votre délai moyen pour un projet ?',
    answer: 'Ça dépend de la portée — un MVP simple peut prendre 2 à 4 semaines, une plateforme complète plusieurs mois. Je donne une estimation précise après un premier échange sur le besoin.'
  },
  {
    question: 'Travaillez-vous en remote ?',
    answer: 'Oui, exclusivement en remote. Je suis basé à Pointe-Noire et je collabore avec des clients à distance, avec des points réguliers selon le fuseau horaire du projet.'
  },
  {
    question: 'Quelles technologies utilisez-vous principalement ?',
    answer: 'Nuxt/Vue et FastAPI pour le développement web, PostgreSQL pour les données, n8n pour l\'automatisation. Le choix final dépend toujours des contraintes spécifiques du projet.'
  },
  {
    question: 'Proposez-vous de la maintenance après livraison ?',
    answer: 'Oui, sous forme de forfait mensuel ou d\'interventions ponctuelles selon vos besoins. On en discute généralement vers la fin du projet, une fois le périmètre de maintenance plus clair.'
  },
  {
    question: 'Comment se déroule le paiement ?',
    answer: 'Généralement en plusieurs jalons — un acompte au démarrage, puis des paiements liés à l\'avancement. Les modalités exactes sont définies ensemble avant le début du projet.'
  }
]

const openIndex = ref<number | null>(null)

function toggle(index: number) {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
  <section id="faq" class="border-b border-premium">
    <div class="mx-auto max-w-6xl px-6 py-24">

      <!-- Header de section -->
      <motion.div
          :initial="{ opacity: 0, x: -20 }"
          :whileInView="{ opacity: 1, x: 0 }"
          :viewport="{ once: true, margin: '-80px' }"
          :transition="prefersReduced ? { duration: 0 } : { duration: 0.5 }"
          class="mb-16 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-brand-dark/60 dark:text-brand-light/60"
      >
          <span class="h-2 w-2 bg-brand-orange" />
          FAQ
      </motion.div>

      <motion.h2
          :initial="{ opacity: 0, y: 20 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :viewport="{ once: true, margin: '-80px' }"
          :transition="prefersReduced ? { duration: 0 } : { duration: 0.5, delay: 0.1 }"
          class="max-w-2xl text-4xl leading-tight font-semibold tracking-tight text-brand-dark dark:text-brand-light sm:text-5xl"
      >
          Questions
          <span class="text-brand-dark/30 dark:text-brand-light/30">fréquentes.</span>
      </motion.h2>

      <!-- Liste accordéon -->
      <div class="mt-16 border-t border-premium">
        <motion.div
          v-for="(faq, index) in faqs"
          :key="faq.question"
          :initial="{ opacity: 0, x: -16 }"
          :whileInView="{ opacity: 1, x: 0 }"
          :viewport="{ once: true, margin: '-40px' }"
          :transition="prefersReduced ? { duration: 0 } : { duration: 0.4, delay: index * 0.08, ease: 'easeOut' }"
          class="border-b border-premium px-4"
        >
          <button
            type="button"
            class="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors duration-200 hover:text-brand-orange"
            :aria-expanded="openIndex === index"
            @click="toggle(index)"
          >
            <span class="flex items-center gap-6">
              <span class="font-mono text-xs text-brand-orange">
                {{ String(index + 1).padStart(2, '0') }}
              </span>
              <span class="font-sans text-lg font-medium tracking-tight text-brand-dark dark:text-brand-light sm:text-xl">
                {{ faq.question }}
              </span>
            </span>
            <UIcon
              name="i-lucide-plus"
              class="h-4 w-4 shrink-0 text-brand-dark/40 transition-transform duration-300 dark:text-brand-light/40"
              :class="openIndex === index ? 'rotate-45' : 'rotate-0'"
            />
          </button>

          <div
            class="grid overflow-hidden transition-all duration-300 ease-in-out"
            :style="{ gridTemplateRows: openIndex === index ? '1fr' : '0fr' }"
          >
            <div class="overflow-hidden">
              <p class="max-w-2xl pb-6 pl-13 font-sans text-sm text-brand-dark/60 dark:text-brand-light/60 sm:text-base">
                {{ faq.answer }}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  </section>
</template>