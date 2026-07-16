<script setup lang="ts">
const props = defineProps<{ path: string | null }>()
const emit = defineEmits<{ close: [] }>()

const isOpen = computed(() => !!props.path)

const { data: project, status } = await useAsyncData(
    () => `project-${props.path}`,
    () => props.path ? queryCollection('projects').path(props.path).first() : Promise.resolve(null),
    { watch: [() => props.path] }
)

function closeOnEscape(e: KeyboardEvent) {
    if (e.key === 'Escape') emit('close')
}

watch(isOpen, (open) => {
    document.body.style.overflow = open ? 'hidden' : ''
})

onMounted(() => window.addEventListener('keydown', closeOnEscape))
onUnmounted(() => window.removeEventListener('keydown', closeOnEscape))
</script>

<template>
    <Teleport to="body">
        <Transition
            enter-active-class="transition-opacity duration-300"
            enter-from-class="opacity-0"
            leave-active-class="transition-opacity duration-200"
            leave-to-class="opacity-0"
        >
            <div v-if="isOpen" class="fixed inset-0 z-[100] overflow-y-auto bg-brand-light dark:bg-brand-dark">
                <div class="sticky top-0 z-10 flex h-20 items-center justify-between border-b border-premium bg-brand-light/90 px-6 backdrop-blur-md dark:bg-brand-dark/90">
                    <span class="font-mono text-sm uppercase tracking-widest text-brand-dark/60 dark:text-brand-light/60">
                        {{ project?.title ?? '...' }}
                    </span>
                    
                    <button
                        type="button"
                        class="flex h-10 w-10 items-center justify-center border border-premium transition-colors duration-200 hover:border-brand-orange hover:text-brand-orange"
                        @click="emit('close')"
                    >
                        <UIcon name="i-lucide-x" class="h-4 w-4" />
                    </button>
                </div>

                <div class="mx-auto max-w-3xl px-6 py-16">
                    <div v-if="status === 'pending'" class="font-mono text-sm text-brand-dark/40 dark:text-brand-light/40">
                        Chargement...
                    </div>

                    <template v-else-if="project">
                        <div class="mb-10 flex flex-wrap gap-2">
                            <span
                                v-for="tech in project.stack"
                                :key="tech"
                                class="border border-premium px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-brand-dark/60 dark:text-brand-light/60"
                            >
                                {{ tech }}
                            </span>
                        </div>

                        <article class="prose prose-neutral max-w-none dark:prose-invert">
                            <ContentRenderer :value="project" />
                        </article>
                    </template>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>