import { defineCollection, z } from "astro:content";

const mainContent = defineCollection ({
    schema: z.object ({
        title: z.object ({
            en: z.string(),
            es: z.string(),
        }),
        description: z.object ({
            en: z.string(),
            es: z.string(),
        }),
        buttonText: z.object ({
            en: z.string(),
            es: z.string(),
        })
    })
});

const features = defineCollection ({
    schema: z.object ({
        imgURL: z.string().url(),
        title: z.object ({
            en: z.string(),
            es: z.string(),
        }),
        description: z.object ({
            en: z.string(),
            es: z.string(),
        })
    })
});

export const collections = { mainContent, features };