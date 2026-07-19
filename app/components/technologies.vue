<script setup lang="ts">
interface Tech {
    name: string
    logo: string
}

const techs: Tech[] = [
    { name: 'Vue.js', logo: '/images/logos/vue.png' },
    { name: 'Nuxt.js', logo: '/images/logos/nuxt.png' },
    { name: 'Tailwind CSS', logo: '/images/logos/tailwind.png' },
    { name: 'Python', logo: '/images/logos/python.png' },
    { name: 'R', logo: '/images/logos/r.png' },
    { name: 'JavaScript', logo: '/images/logos/javascript.png' },
    { name: 'n8n', logo: '/images/logos/n8n.png' },
    { name: 'Docker', logo: '/images/logos/docker.png' },
    { name: 'Git', logo: '/images/logos/git.png' },
    { name: 'GitHub', logo: '/images/logos/github.png' },
    { name: 'Laravel', logo: '/images/logos/laravel.png' },
    { name: 'Ollama', logo: '/images/logos/ollama.png' },
    { name: 'PostgreSQL', logo: '/images/logos/postgresql.png' },
]
</script>

<template>
    <section v-if="techs.length > 0">

        <UMarquee
            pause-on-hover
            :overlay="false"
            :ui="{ root: '[--gap:--spacing(16)] [--duration:30s] border-t border-premium py-8' }"
        >
            <div
                v-for="tech in techs"
                :key="tech.name"
                class="flex shrink-0 items-center gap-3"
            >
                <img
                    :src="tech.logo"
                    :alt="tech.name"
                    class="h-8 w-auto object-contain grayscale opacity-50 transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                >
                <span class="font-mono text-xs uppercase tracking-widest text-brand-dark/40 dark:text-brand-light/40">
                    {{ tech.name }}
                </span>
            </div>
        </UMarquee>
    </section>
</template>