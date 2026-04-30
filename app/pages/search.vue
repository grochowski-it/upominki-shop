<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

const { t } = useI18n()
const route = useRoute()

const searchQuery = ref((route.query.q as string) || '')
const searchInputRef = ref<HTMLInputElement | null>(null)

// Focus input on mount
onMounted(() => {
  if (!searchQuery.value) {
    searchInputRef.value?.focus()
  }
})

// Update URL when search changes
watch(searchQuery, (newVal) => {
  const query = { ...route.query }
  if (newVal) {
    query.q = newVal
  } else {
    delete query.q
  }
  navigateTo({ query }, { replace: true })
})

// Fetch products
const { data: allProducts } = await useAsyncData('products', () => queryCollection('products').all())

const filteredProducts = computed(() => {
  if (!allProducts.value) return []
  if (!searchQuery.value) return allProducts.value
  
  const query = searchQuery.value.toLowerCase()
  return allProducts.value.filter(product => {
    return product.title?.toLowerCase().includes(query) || 
           product.tag?.toLowerCase().includes(query) ||
           product.features?.printDesc?.toLowerCase().includes(query) ||
           product.features?.materialDesc?.toLowerCase().includes(query) ||
           product.features?.printTitle?.toLowerCase().includes(query) ||
           product.specs?.fiberDesc?.toLowerCase().includes(query)
  })
})
</script>

<template>
  <div class="bg-background text-on-background min-h-screen pb-20">
    <!-- Search Input Area -->
    <section class="px-6 pt-12 pb-8 md:pt-16 md:px-12 max-w-[1600px] mx-auto">
      <div class="flex flex-col gap-4 max-w-4xl">
        <span class="font-headline font-bold text-primary text-xs uppercase tracking-[0.2em]">
          {{ t('search.searching_for') }}
        </span>
        
        <div class="relative w-full group">
          <input 
            ref="searchInputRef"
            v-model="searchQuery"
            type="text" 
            :placeholder="t('search.placeholder')"
            class="w-full bg-transparent border-b-2 border-outline-variant/30 text-4xl md:text-6xl font-headline font-black text-on-surface py-2 focus:outline-none focus:border-primary transition-colors uppercase tracking-tight italic"
          />
        </div>
        
        <div class="flex justify-end w-full">
          <span class="font-label text-on-surface-variant text-sm mt-2">
            {{ t('search.results_count', { count: filteredProducts.length < 10 ? '0' + filteredProducts.length : filteredProducts.length }) }}
          </span>
        </div>
      </div>
    </section>

    <!-- Search Results Grid -->
    <main class="px-6 py-4 md:px-12 max-w-[1600px] mx-auto flex flex-col gap-8">
      <div v-if="filteredProducts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <ProductCard 
          v-for="product in filteredProducts" 
          :key="product.id" 
          :product="product" 
        />
      </div>
      
      <!-- Empty State -->
      <div v-else class="flex flex-col items-center justify-center py-20 text-center border border-outline-variant/20 bg-surface-container-low">
        <Icon name="ph:ghost" class="text-6xl text-outline-variant mb-6" />
        <h3 class="font-headline font-bold text-2xl uppercase tracking-widest text-on-surface-variant">No Artifacts Found</h3>
        <p class="font-body text-on-surface-variant mt-2 max-w-md">Try adjusting your search terms or browse our trending categories below.</p>
        <button @click="searchQuery = ''" class="mt-8 px-8 py-3 bg-primary text-on-primary font-headline font-bold uppercase tracking-widest text-sm hover:bg-primary-dim transition-colors">
          Clear Search
        </button>
      </div>
    </main>

    <!-- Trending Section -->
    <section class="mt-20 mb-24 max-w-[1600px] mx-auto">
      <div class="px-6 md:px-12 mb-6 flex items-center justify-between">
        <h4 class="font-headline font-bold text-sm md:text-base uppercase tracking-widest text-primary">{{ t('search.trending') }}</h4>
        <div class="h-[1px] flex-grow ml-4 md:ml-8 bg-outline-variant/30"></div>
      </div>
      <div class="flex gap-4 overflow-x-auto px-6 md:px-12 pb-4 hide-scrollbar">
        <button @click="searchQuery = 'Steel'" class="flex-shrink-0 bg-surface-container-highest border-b-2 border-primary px-8 py-4 hover:bg-surface-container-high transition-colors">
          <span class="font-headline font-bold text-sm uppercase tracking-tighter text-on-surface">STEEL FLASKS</span>
        </button>
        <button @click="searchQuery = 'Acrylic'" class="flex-shrink-0 bg-surface-container-highest px-8 py-4 hover:bg-surface-container-high hover:border-b-2 hover:border-primary transition-all">
          <span class="font-headline font-bold text-sm uppercase tracking-tighter text-on-surface-variant hover:text-on-surface">ACRYLIC PRINTS</span>
        </button>
        <button @click="searchQuery = 'Laser'" class="flex-shrink-0 bg-surface-container-highest px-8 py-4 hover:bg-surface-container-high hover:border-b-2 hover:border-primary transition-all">
          <span class="font-headline font-bold text-sm uppercase tracking-tighter text-on-surface-variant hover:text-on-surface">LASER PLATES</span>
        </button>
        <button @click="searchQuery = 'Tote'" class="flex-shrink-0 bg-surface-container-highest px-8 py-4 hover:bg-surface-container-high hover:border-b-2 hover:border-primary transition-all">
          <span class="font-headline font-bold text-sm uppercase tracking-tighter text-on-surface-variant hover:text-on-surface">TECH TOTES</span>
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
