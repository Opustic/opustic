// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/content", "motion-v/nuxt", "@nuxtjs/seo", "@nuxt/fonts"],
  css: ["~/assets/css/main.css"],

  site: {
    url: "https://opustic.vercel.app",
    name: "Serge GUIMBI — Développeur Full-Stack",
    description: "Développeur Full-Stack, Data Analyst et automatisation n8n.",
    defaultLocale: "fr",
  },
});