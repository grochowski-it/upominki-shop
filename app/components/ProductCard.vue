<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const { t } = useI18n()

// Determine link to product. In Nuxt Content v3, data collections might not have standard routes
// automatically, but we can construct it if needed. For now we use the path if it exists, or just a generic link.
const productLink = computed(() => {
  return props.product.path || `/products/${props.product.id}`
})

const isBestSeller = computed(() => {
  return props.product.tag?.toLowerCase() === 'bestseller' || props.product.tag?.toLowerCase() === 'best seller'
})
</script>

<template>
  <NuxtLink :to="productLink" class="flex flex-col group h-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background">
    <div class="bg-surface-container-low aspect-[4/5] relative overflow-hidden">
      <!-- We use a standard img or NuxtImg if available -->
      <img 
        :src="product.mainImage || 'https://placehold.co/400x500/131313/e4f265?text=NO+IMAGE'" 
        :alt="product.title" 
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
      />
      
      <!-- Tag / Badge -->
      <div 
        v-if="product.tag"
        class="absolute top-0 left-0 bg-primary text-on-primary font-headline font-bold text-[10px] uppercase px-3 py-1.5 tracking-widest"
      >
        {{ product.tag }}
      </div>
    </div>
    
    <div class="bg-surface-container-highest p-4 flex flex-col gap-2 flex-grow border border-transparent group-hover:border-outline-variant/30 transition-colors">
      <div class="flex justify-between items-start gap-4">
        <h3 class="font-headline font-bold text-lg md:text-xl uppercase tracking-tight leading-tight max-w-[70%]">
          {{ product.title }}
        </h3>
        <span class="font-headline font-black text-lg md:text-xl text-primary whitespace-nowrap">
          {{ product.price }}
        </span>
      </div>
      
      <p v-if="product.features?.printDesc" class="font-body text-on-surface-variant text-xs leading-relaxed line-clamp-2">
        {{ product.features.printDesc }}
      </p>
      
      <button class="mt-auto w-full bg-surface text-primary border border-primary/20 font-headline font-bold uppercase py-3 text-sm active:scale-[0.98] transition-all group-hover:bg-primary group-hover:text-on-primary">
        {{ t('search.view_specs') }}
      </button>
    </div>
  </NuxtLink>
</template>
