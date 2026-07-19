<script setup lang="ts">
useSeoMeta({
    title: 'Serge GUIMBI — Développeur Full-Stack, Data Analyst & Automatisation',
    description: 'Je conçois des applications web sur-mesure, j\'analyse des données et j\'automatise des workflows avec n8n.',
    ogTitle: 'Serge GUIMBI — Développeur Full-Stack',
    ogDescription: 'Développement web, data analyse et automatisation n8n.',
    ogType: 'website',
    twitterCard: 'summary_large_image'
})

defineOgImage('Portfolio')

useSchemaOrg([
    definePerson({
        name: 'Serge GUIMBI',
        jobTitle: 'Développeur Full-Stack & Data Analyst',
        url: 'https://opustic.vercel.app',
        sameAs: [
        'https://github.com/Opustic',
        'https://www.linkedin.com/in/serge-guimbi-6b707a309/'
        ]
    })
])
</script>





<template>

    <LazyAccueilHero />

    <LazyAccueilAbout id="apropos" />

    <LazyAccueilProjets id="projets" />

    <LazyAccueilFaq id="faq" />

    <LazyContact id="contacts" />

</template>