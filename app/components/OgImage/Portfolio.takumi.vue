<script setup lang="ts">
defineProps<{
    title?: string
    subtitle?: string
}>()

const stack = ['NUXT', 'FASTAPI', 'N8N']
</script>

<template>
    <div
        class="relative flex h-full w-full flex-col justify-between overflow-hidden p-16"
        style="background-color: #0d0d0d; color: #ffffff; font-family: 'Inter', sans-serif;"
    >
        <!-- Grille de fond discrète -->
        <div
            style="position: absolute; inset: 0; background-image: repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 80px), repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 80px);"
        />

        <!-- Lueur orange derrière le titre -->
        <div
            style="position: absolute; top: 320px; left: 180px; width: 520px; height: 260px; background: radial-gradient(circle, rgba(255,102,0,0.18) 0%, rgba(255,102,0,0) 70%);"
        />

        <!-- Repères d'angle (haut-gauche / bas-droite) -->
        <div style="position: absolute; top: 40px; left: 40px; width: 28px; height: 28px; border-top: 2px solid #ff6600; border-left: 2px solid #ff6600;" />
        <div style="position: absolute; bottom: 40px; right: 40px; width: 28px; height: 28px; border-bottom: 2px solid #ff6600; border-right: 2px solid #ff6600;" />

        <!-- Bandeau statut -->
        <div style="position: relative; display: flex; align-items: center; gap: 12px; font-family: 'JetBrains Mono', monospace; font-size: 20px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.5);">
            <div style="width: 12px; height: 12px; background-color: #ff6600;" />
            Développeur Full-Stack
        </div>

        <!-- Titre principal -->
        <div style="position: relative; display: flex; flex-direction: column; gap: 8px;">
            <div style="font-size: 88px; font-weight: 800; letter-spacing: -0.02em; line-height: 1;">
                {{ title ?? 'Serge Guimbi' }}
            </div>
            <div style="font-size: 36px; font-weight: 500; color: rgba(255,255,255,0.45);">
                {{ subtitle ?? 'Full-Stack, Data Analyst & Automatisation' }}
            </div>

            <!-- Tags stack -->
            <div style="display: flex; gap: 12px; margin-top: 28px;">
                <div
                    v-for="tech in stack"
                    :key="tech"
                    style="border: 1px solid rgba(255,255,255,0.15); padding: 8px 16px; font-family: 'JetBrains Mono', monospace; font-size: 16px; letter-spacing: 0.08em; color: rgba(255,255,255,0.6);"
                >
                    {{ tech }}
                </div>
            </div>
        </div>

        <!-- Ligne du bas -->
        <div
            style="position: relative; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; font-family: 'JetBrains Mono', monospace; font-size: 18px; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.4);"
        >
            <span>Brazzaville, Congo</span>
        </div>
    </div>
</template>