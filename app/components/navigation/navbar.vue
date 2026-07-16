<script setup lang="ts">
const colorMode = useColorMode();

const isDark = computed({
    get: () => colorMode.value === "dark",
    set: (value) => {
        colorMode.preference = value ? "dark" : "light";
    },
});

const isScrolled = ref(false);
const isMenuOpen = ref(false);

function handleScroll() {
    isScrolled.value = window.scrollY > 80;
}

function closeOnEscape(e: KeyboardEvent) {
    if (e.key === "Escape") isMenuOpen.value = false;
}

onMounted(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", closeOnEscape);
});

onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("keydown", closeOnEscape);
});

watch(isMenuOpen, (open) => {
    document.body.style.overflow = open ? "hidden" : "";
});

const navLinks = [
    { label: "Home", to: "/", index: "01" },
    { label: "Projects", to: "/#projects", index: "02" },
    { label: "About", to: "/#about", index: "03" },
    { label: "Contact", to: "/#contact", index: "04" },
];
</script>

<template>
    <header
        class="fixed top-0 z-50 w-full border-b border-premium bg-brand-light/90 dark:bg-brand-dark/90 backdrop-blur-md"
    >
        <div class="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
            <NuxtLink
                to="/"
                class="font-mono uppercase text-lg font-bold tracking-tight"
            >
                Opustic<span class="text-brand-orange text-4xl">.</span>
            </NuxtLink>

            <!-- Nav complète (desktop, visible avant scroll) -->
            <nav v-if="!isScrolled" class="hidden items-center gap-10 lg:flex">
                <NuxtLink
                    v-for="link in navLinks"
                    :key="link.to"
                    :to="link.to"
                    class="group flex items-center gap-1.5 font-mono text-sm text-brand-dark/70 dark:text-brand-light/70 transition-colors duration-200 hover:text-brand-dark dark:hover:text-brand-light"
                >
                    <span class="text-[10px] text-brand-orange">{{ link.index }}</span>
                    {{ link.label }}
                </NuxtLink>

                <button
                    type="button"
                    class="flex items-center gap-3 border border-brand-dark dark:border-brand-light bg-brand-dark dark:bg-brand-light px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-brand-light dark:text-brand-dark transition-colors duration-200 hover:bg-brand-orange hover:border-brand-orange dark:hover:bg-brand-orange dark:hover:text-brand-light"
                    @click="isMenuOpen = true"
                >
                    Contact
                    <UIcon name="i-lucide-arrow-up-right" class="h-3.5 w-3.5" />
                </button>
            </nav>

            <!-- Actions droite : toggle + hamburger -->
            <div class="flex items-center gap-3">

                <ColorModeButton/>


                <!-- Hamburger : toujours visible mobile, visible desktop uniquement au scroll -->
                <button
                    v-if="isScrolled || true"
                    type="button"
                    class="flex h-10 w-10 items-center justify-center border border-premium transition-colors duration-200 hover:border-brand-orange"
                    :class="isScrolled ? 'lg:flex' : 'lg:hidden'"
                    @click="isMenuOpen = true"
                >
                    <UIcon name="i-lucide-menu" class="h-4 w-4" />
                </button>
            </div>
        </div>
    </header>

    <!-- Menu plein écran -->
    <Teleport to="body">
        <Transition
            enter-active-class="transition-opacity duration-300"
            enter-from-class="opacity-0"
            leave-active-class="transition-opacity duration-200"
            leave-to-class="opacity-0"
        >
            <div
                v-if="isMenuOpen"
                class="fixed inset-0 z-[100] flex flex-col bg-brand-dark text-brand-light"
            >
                <!-- Barre top du menu -->
                <div
                    class="flex h-20 items-center justify-between border-b border-brand-light/10 px-6"
                >
                    <span class="font-mono uppercase text-lg font-bold tracking-tight"
                        >Opustic<span class="text-brand-orange text-4xl">.</span></span
                    >
                        <button
                            type="button"
                            class="flex h-10 w-10 items-center justify-center border border-brand-light/20 transition-colors duration-200 hover:border-brand-orange hover:text-brand-orange"
                            @click="isMenuOpen = false"
                        >
                            <UIcon name="i-lucide-x" class="h-4 w-4" />
                        </button>
                </div>

                <!-- Liens -->
                <nav class="flex flex-1 flex-col justify-center px-6">
                    <NuxtLink
                        v-for="link in navLinks"
                        :key="link.to"
                        :to="link.to"
                        class="group flex items-center gap-6 border-b border-brand-light/10 py-6 first:border-t"
                        @click="isMenuOpen = false"
                    >
                        <span class="font-mono text-sm text-brand-orange">{{
                            link.index
                        }}</span>
                        <span
                            class="font-sans text-4xl font-semibold tracking-tight transition-colors duration-200 group-hover:text-brand-orange sm:text-6xl"
                        >
                            {{ link.label }}
                        </span>
                        <UIcon
                            name="i-lucide-arrow-up-right"
                            class="ml-auto h-6 w-6 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                        />
                    </NuxtLink>
                </nav>

                <!-- Footer du menu -->
                <div
                    class="flex flex-col gap-2 border-t border-brand-light/10 px-6 py-6 font-mono text-xs uppercase tracking-widest text-brand-light/50 sm:flex-row sm:items-center sm:justify-between"
                >
                    <span>© {{ new Date().getFullYear() }} — Serge</span>
                    <span>hello@serge.dev</span>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>
