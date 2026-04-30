import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    pages: defineCollection({
      type: 'page',
      source: '**/*.md'
    }),
    products: defineCollection({
      type: 'data',
      source: 'products/**/*.yml',
      schema: z.object({
        title: z.string(),
        price: z.string(),
        oldPrice: z.string().optional(),
        tag: z.string(),
        mainImage: z.string(),
        thumbnails: z.array(z.string()),
        sizes: z.array(z.string()),
        colors: z.array(z.object({
          name: z.string(),
          value: z.string()
        })),
        features: z.object({
          printTitle: z.string(),
          printDesc: z.string(),
          materialTitle: z.string(),
          materialDesc: z.string()
        }),
        specs: z.object({
          title: z.string(),
          fiberTitle: z.string(),
          fiberDesc: z.string(),
          inkTitle: z.string(),
          inkDesc: z.string(),
          fitTitle: z.string(),
          fitDesc: z.string()
        })
      })
    }),
    navigation: defineCollection({
      type: 'data',
      source: 'navigation/**/*.yml',
      schema: z.object({
        links: z.array(z.object({
          label: z.string(),
          url: z.string()
        }))
      })
    }),
    footer: defineCollection({
      type: 'data',
      source: 'footer/**/*.yml',
      schema: z.object({
        brandTitle: z.string().optional(),
        description: z.string(),
        sections: z.array(z.object({
          title: z.string(),
          links: z.array(z.object({
            label: z.string(),
            url: z.string()
          }))
        })),
        rights: z.string(),
        city: z.string(),
        logistics: z.string()
      })
    })
  }
})
