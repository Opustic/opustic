<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from 'motion-v'

const prefersReduced = useReducedMotion()
const sectionRef = ref<HTMLElement>()

const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
})
const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60])

const milestones = [
    {
        index: '01',
        title: 'Data & Statistiques',
        description: 'Collecte, traitement et valorisation de données. De la donnée brute — qu\'elle provienne de scraping ou de sources internes — à des analyses exploitables et des bases de données PostgreSQL structurées.'
    },
    {
        index: '02',
        title: 'Développement Full-Stack',
        description: 'Conception d\'applications web complètes et performantes. Stack moderne (Nuxt, Tailwind CSS, FastAPI) au service de la vitesse, de l\'accessibilité et du référencement naturel.'
    },
    {
        index: '03',
        title: 'Automation & Local AI',
        description: 'Orchestration de workflows et intégration d\'IA locale. Connexion de vos outils métier (CRM, tableurs, messagerie) via n8n, avec des modèles de langage déployés en local pour maîtriser coûts et confidentialité.'
    }
]

// 4 à 6 Cas d'usage concrets et ultra-pragmatiques
const useCases = [
    {
        tag: 'DATA + AUTOMATION',
        title: 'Collecte automatisée de données & Enrichissement CRM',
        problem: 'La prospection commerciale manuelle mobilise des ressources considérables — recherche de profils, extraction d\'informations, saisie dans le CRM.',
        solution: 'Un pipeline Scrapy extrait et normalise les profils ciblés. Un script Python traite et nettoie les données, puis n8n les injecte automatiquement dans votre CRM avec notification Telegram.'
    },
    {
        tag: 'DEVELOPPEMENT WEB',
        title: 'Plateforme e-commerce haute performance',
        problem: 'Les temps de chargement élevés sur les connexions mobiles à faible débit impactent directement le taux de conversion.',
        solution: 'Application e-commerce en génération statique (Nuxt) couplée à une base de données locale (SQLite/PostgreSQL). Résultat : temps de chargement quasi-instantané, même sur réseau limité.'
    },
    {
        tag: 'AUTOMATION + IA',
        title: 'Assistant client intelligent multicanal',
        problem: 'Le service client est sollicité en permanence pour des questions récurrentes — tarifs, disponibilités, informations pratiques — au détriment des demandes à forte valeur ajoutée.',
        solution: 'Un chatbot conversationnel, accessible via WhatsApp et Telegram, orchestré par n8n. Il s\'appuie sur votre base documentaire ou un modèle de langage local (Ollama) pour répondre en continu, sans coût d\'API externe.'
    },
    {
        tag: 'DATA VISUALIZATION',
        title: 'Tableau de bord décisionnel',
        problem: 'Les indicateurs de performance sont dispersés entre plusieurs sources — fichiers Excel, outils de caisse, relevés bancaires — rendant le pilotage fastidieux.',
        solution: 'Centralisation automatique des données dans une base PostgreSQL et conception d\'un tableau de bord interactif offrant une vue consolidée de vos KPI en temps réel.'
    }
]

// Fenêtre glissante des 3 prochaines cartes visibles
const stackItems = computed(() => {
    const size = Math.min(3, useCases.length)
    return Array.from({ length: size }, (_, i) => {
        const idx = (currentIndex.value + i) % useCases.length
        return { ...useCases[idx], id: useCases[idx].title, slot: i }
    })
})

const SLOT_STYLES = [
    { y: 0, scale: 1, opacity: 1, rotate: 0, zIndex: 30 },
    { y: 18, scale: 0.94, opacity: 0.5, rotate: -2, zIndex: 20 },
    { y: 32, scale: 0.88, opacity: 0.25, rotate: 2, zIndex: 10 }
]

function slotStyle(slot: number) {
    return SLOT_STYLES[slot] ?? SLOT_STYLES[SLOT_STYLES.length - 1]
}

const currentIndex = ref(0)
const isPlaying = ref(true)
const AUTOPLAY_TIME = 12000 // 12 secondes par cas d'usage
let timer: any = null

const startTimer = () => {
    stopTimer()
    if (isPlaying.value) {
        timer = setInterval(() => {
            nextSlide()
        }, AUTOPLAY_TIME)
    }
}

const stopTimer = () => {
    if (timer) clearInterval(timer)
}

const nextSlide = () => {
    currentIndex.value = (currentIndex.value + 1) % useCases.length
    startTimer()
}

const prevSlide = () => {
    currentIndex.value = (currentIndex.value - 1 + useCases.length) % useCases.length
    startTimer()
}

const togglePlay = () => {
    isPlaying.value = !isPlaying.value
    if (isPlaying.value) {
        startTimer()
    } else {
        stopTimer()
    }
}

onMounted(() => {
    startTimer()
})

onUnmounted(() => {
    stopTimer()
})
</script>

<template>
    <section ref="sectionRef" id="about" class="border-b border-premium">
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
                À propos
            </motion.div>

            <!-- Introduction Narrative -->
            <motion.div
                :style="{ y: parallaxY }"
                class="grid grid-cols-1 gap-12 lg:grid-cols-12 mb-20"
            >
                <motion.div
                    class="lg:col-span-8"
                    :initial="{ opacity: 0, y: 30 }"
                    :whileInView="{ opacity: 1, y: 0 }"
                    :viewport="{ once: true, margin: '-80px' }"
                    :transition="prefersReduced ? { duration: 0 } : { duration: 0.6, ease: 'easeOut' }"
                >
                    <p class="text-2xl leading-snug font-medium tracking-tight text-brand-dark dark:text-brand-light sm:text-3xl lg:text-4xl">
                        <span class="text-brand-orange">Chaque solution que je développe est conçue pour répondre à un besoin concret.</span>
                        <span class="text-brand-dark/40 dark:text-brand-light/40">
                            Analyser des données, déployer une plateforme ou automatiser des processus critiques —
                        </span>
                        des outils robustes, pensés pour la performance et alignés sur vos objectifs.
                    </p>
                </motion.div>

                <motion.div
                    class="lg:col-span-4 flex flex-col justify-end"
                    :initial="{ opacity: 0, y: 30 }"
                    :whileInView="{ opacity: 1, y: 0 }"
                    :viewport="{ once: true, margin: '-80px' }"
                    :transition="prefersReduced ? { duration: 0 } : { duration: 0.6, delay: 0.15, ease: 'easeOut' }"
                >
                    <p class="font-sans text-sm text-brand-dark/60 dark:text-brand-light/60">
                        J'accompagne entreprises et professionnels dans l'automatisation de leurs processus et le déploiement de plateformes digitales performantes.
                    </p>
                </motion.div>
            </motion.div>

            <!-- Les 3 Facettes (Piliers) -->
            <div class="grid grid-cols-1 border-t border-l border-premium sm:grid-cols-3 mb-16">
                <motion.div
                    v-for="(milestone, i) in milestones"
                    :key="milestone.index"
                    :initial="{ opacity: 0, y: 24 }"
                    :whileInView="{ opacity: 1, y: 0 }"
                    :viewport="{ once: true, margin: '-60px' }"
                    :transition="prefersReduced ? { duration: 0 } : { duration: 0.45, delay: i * 0.12, ease: 'easeOut' }"
                    class="border-r border-b border-premium p-6"
                >
                    <span class="font-mono text-xs text-brand-orange">{{ milestone.index }}</span>
                    <h3 class="mt-3 font-sans text-lg font-semibold tracking-tight text-brand-dark dark:text-brand-light">
                        {{ milestone.title }}
                    </h3>

                    <p class="mt-2 font-sans text-sm text-brand-dark/60 dark:text-brand-light/60">
                        {{ milestone.description }}
                    </p>
                </motion.div>
            </div>

            <!-- Carrousel des Cas d'Usage (Structure corrigée) -->
            <div class="w-full">

                <!-- 1. En-tête + Contrôles (Isolés au-dessus de la pile de cartes) -->
                <div class="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div class="flex items-center gap-3">
                        <span class="border border-brand-orange/20 bg-brand-orange/10 px-2.5 py-1 font-mono text-xs tracking-wider text-brand-orange">
                            CAS CONCRET
                        </span>
                        <span class="font-mono text-xs text-brand-dark/50 dark:text-brand-light/50">
                            // 0{{ currentIndex + 1 }} sur 0{{ useCases.length }}
                        </span>
                    </div>

                    <div class="flex items-center gap-2 font-mono text-xs">
                        <button type="button" class="flex h-9 w-9 items-center justify-center border border-premium text-brand-dark transition-colors hover:border-brand-orange hover:text-brand-orange dark:text-brand-light" @click="prevSlide">
                            <UIcon name="lucide:chevrons-left" class="h-4 w-4" />
                        </button>
                        <button type="button" class="flex h-9 px-3 items-center justify-center border border-premium text-brand-dark transition-colors hover:border-brand-orange hover:text-brand-orange dark:text-brand-light" @click="togglePlay">
                            <UIcon :name="isPlaying ? 'lucide:pause' : 'lucide:play'" class="h-4 w-4" />
                        </button>
                        <button type="button" class="flex h-9 w-9 items-center justify-center border border-premium text-brand-dark transition-colors hover:border-brand-orange hover:text-brand-orange dark:text-brand-light" @click="nextSlide">
                            <UIcon name="lucide:chevrons-right" class="h-4 w-4" />
                        </button>
                    </div>
                </div>

                <!-- 2. Zone de la pile de cartes (Hauteur accrue sur mobile pour contenir le texte) -->
                <div class="relative min-h-[480px] sm:min-h-[320px] lg:min-h-[280px]">
                    <AnimatePresence>
                        <motion.div
                            v-for="card in stackItems"
                            :key="card.id"
                            :initial="{ y: 40, scale: 0.8, opacity: 0, rotate: 2 }"
                            :animate="{
                                y: slotStyle(card.slot).y,
                                scale: slotStyle(card.slot).scale,
                                opacity: slotStyle(card.slot).opacity,
                                rotate: slotStyle(card.slot).rotate
                            }"
                            :exit="{ y: -40, scale: 0.9, opacity: 0, rotate: -3 }"
                            :transition="{ type: 'spring', stiffness: 300, damping: 28 }"
                            class="absolute inset-0 flex flex-col gap-6 border border-brand-orange/30 bg-brand-light p-5 sm:p-8 shadow-[0_4px_30px_rgba(255,102,0,0.02)] dark:bg-brand-dark-soft"
                            :style="{ zIndex: slotStyle(card.slot).zIndex, pointerEvents: card.slot === 0 ? 'auto' : 'none' }"
                        >
                            <!-- Contenu supérieur de la carte -->
                            <div>
                                <span class="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-brand-orange">
                                    {{ card.tag }}
                                </span>
                                <h4 class="text-lg leading-tight font-bold text-brand-dark sm:text-xl md:text-2xl dark:text-brand-light">
                                    {{ card.title }}
                                </h4>
                            </div>

                            <!-- Grille Problème / Solution -->
                            <div class="grid grid-cols-1 gap-4 border-t border-premium p-4 md:grid-cols-2 md:gap-6">
                                <div>
                                    <span class="mb-1 block font-mono text-[10px] text-brand-dark/40 uppercase dark:text-brand-light/40">Le Problème</span>
                                    <p class="text-xs leading-relaxed text-brand-dark/70 sm:text-sm dark:text-brand-light/70">{{ card.problem }}</p>
                                </div>
                                <div>
                                    <span class="mb-1 block font-mono text-[10px] text-brand-orange/70 uppercase">La Solution</span>
                                    <p class="text-xs leading-relaxed font-medium text-brand-dark/90 sm:text-sm dark:text-brand-light/95">{{ card.solution }}</p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

        </div>
    </section>
</template>