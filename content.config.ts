import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
    collections: {
        projects: defineCollection({
            type: "page",
            source: "projects/*.md",
            schema: z.object({
                summary: z.string(),
                stack: z.array(z.string()),
                year: z.string(),
                status: z.enum(["live", "in-progress", "archived"]),
                link: z.string().optional(),
                repo: z.string().optional(),
            }),
        }),
    },
});
