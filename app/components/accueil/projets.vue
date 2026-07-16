<script setup lang="ts">
const { data: projects } = await useAsyncData('projects-list', () =>
    queryCollection('projects').order('year', 'DESC').all()
)

const activeProjectPath = ref<string | null>(null)

function openProject(path: string) {
    activeProjectPath.value = path
}
function closeProject() {
    activeProjectPath.value = null
}
</script>

<template>
    <section id="projects" class="border-b border-premium">
        <div class="mx-auto max-w-6xl px-6 py-24">

            <div class="mb-16 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-brand-dark/60 dark:text-brand-light/60">
                <span class="h-2 w-2 bg-brand-orange" />
                Projets
            </div>

            <div v-if="projects?.length" class="grid grid-cols-1 border-t border-l border-premium sm:grid-cols-2">
                <button
                    v-for="(project, i) in projects"
                    :key="project.path"
                    type="button"
                    class="group flex flex-col justify-between border-r border-b border-premium p-8 text-left transition-colors duration-200 hover:bg-brand-dark/[0.02] dark:hover:bg-brand-light/[0.02]"
                    @click="openProject(project.path)"
                >
                    <div>
                        <div class="flex items-center justify-between">
                            <span class="font-mono text-xs text-brand-orange">{{ String(i + 1).padStart(2, '0') }}</span>
                            <span class="font-mono text-[10px] uppercase tracking-widest text-brand-dark/40 dark:text-brand-light/40">
                                {{ project.year }}
                            </span>
                        </div>

                        <h3 class="mt-4 font-sans text-2xl font-semibold tracking-tight text-brand-dark dark:text-brand-light">
                            {{ project.title }}
                        </h3>

                        <p class="mt-2 font-sans text-sm text-brand-dark/60 dark:text-brand-light/60">
                            {{ project.summary }}
                        </p>
                    </div>

                    <div class="mt-8 flex flex-wrap items-center gap-2">
                        <span
                            v-for="tech in project.stack.slice(0, 4)"
                            :key="tech"
                            class="border border-premium px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-brand-dark/60 dark:text-brand-light/60"
                        >
                            {{ tech }}
                        </span>
                        <UIcon
                            name="i-lucide-arrow-up-right"
                            class="ml-auto h-4 w-4 text-brand-dark/30 transition-colors duration-200 group-hover:text-brand-orange dark:text-brand-light/30"
                        />
                    </div>
                </button>
            </div>

            <p v-else class="font-mono text-sm text-brand-dark/40 dark:text-brand-light/40">
                Aucun projet publié pour l'instant.
            </p>
        </div>
    </section>

    <ProjectModal :path="activeProjectPath" @close="closeProject" />
</template>