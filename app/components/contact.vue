<script setup lang="ts">
interface ContactLink {
    label: string
    value: string
    href: string
    icon: string
    copyable?: boolean
    highlight?: boolean
}

const links: ContactLink[] = [
    { label: 'Email', value: 'hello@serge.dev', href: 'mailto:hello@serge.dev', icon: 'i-lucide-mail', copyable: true, highlight: true },
    { label: 'GitHub', value: '@serge-mabiala', href: 'https://github.com/serge-mabiala', icon: 'i-simple-icons-github' },
    { label: 'LinkedIn', value: 'Serge Mabiala', href: 'https://linkedin.com/in/serge-mabiala', icon: 'i-simple-icons-linkedin' },
    { label: 'TikTok', value: '@serge.dev', href: 'https://tiktok.com/@serge.dev', icon: 'i-simple-icons-tiktok' }
]

const copiedLabel = ref<string | null>(null)

async function handleLinkClick(link: ContactLink, event: MouseEvent) {
    if (!link.copyable) return
    event.preventDefault()
    try {
        await navigator.clipboard.writeText(link.value)
        copiedLabel.value = link.label
        setTimeout(() => {
        if (copiedLabel.value === link.label) copiedLabel.value = null
        }, 1800)
    } catch {
        // clipboard indisponible — on ignore silencieusement
    }
}



</script>

<template>
    <section id="contact" class="border-b border-premium">
        <div class="mx-auto max-w-6xl px-6 py-24">

            <!-- Header de section -->
            <div class="mb-16 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-brand-dark/60 dark:text-brand-light/60">
                <span class="h-2 w-2 bg-brand-orange" />
                Contact
            </div>

            <h2 class="max-w-2xl text-4xl leading-tight font-semibold tracking-tight text-brand-dark dark:text-brand-light sm:text-5xl">
                Un projet en tête ?
                <span class="text-brand-dark/30 dark:text-brand-light/30">Discutons-en.</span>
            </h2>

            <!-- Grille de contacts (4 carrés collés) -->
            <div class="mt-4 grid grid-cols-2 border-t border-l border-premium sm:grid-cols-4"> 
                <a
                    v-for="link in links"
                    :key="link.label"
                    :href="link.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="group relative flex aspect-square flex-col items-center justify-center gap-3 border-r border-b border-premium p-4 text-center transition-colors duration-200"
                    :class="link.highlight
                        ? 'bg-brand-orange text-brand-light hover:bg-brand-orange-hover'
                        : 'text-brand-dark hover:bg-brand-dark/[0.02] dark:text-brand-light dark:hover:bg-brand-light/[0.02]'"
                    @click="handleLinkClick(link, $event)"
                >
                    <UIcon
                        :name="link.icon"
                        class="h-6 w-6"
                        :class="link.highlight ? 'text-brand-light' : 'text-brand-dark/50 dark:text-brand-light/50'"
                    />
                    <span class="font-mono text-xs uppercase tracking-widest">
                        {{ link.label }}
                    </span>

                    <span
                        v-if="link.copyable"
                        class="absolute bottom-2 font-mono text-[9px] uppercase tracking-widest opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                        :class="link.highlight ? 'text-brand-light/70' : 'text-brand-orange'"
                    >
                        {{ copiedLabel === link.label ? 'Copié' : 'Copier' }}
                    </span>
                </a>
            </div>
        </div>
    </section>
</template>