<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

const { t, locale } = useI18n()
const localePath = useLocalePath()

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const close = () => {
  emit('update:modelValue', false)
  searchQuery.value = ''
}

const searchQuery = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

// Fetch all products
const { data: allProducts } = await useAsyncData('products', () => queryCollection('products').all())

const searchResults = computed(() => {
  if (!searchQuery.value || !allProducts.value) return []
  const query = searchQuery.value.toLowerCase()
  
  return allProducts.value.filter(product => {
    return product.title?.toLowerCase().includes(query) || 
           product.tag?.toLowerCase().includes(query) ||
           product.features?.printDesc?.toLowerCase().includes(query) ||
           product.features?.materialDesc?.toLowerCase().includes(query)
  }).slice(0, 5) // Limit to 5 suggestions
})

// Focus input when opened
watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    setTimeout(() => {
      inputRef.value?.focus()
    }, 100)
    // Prevent background scrolling
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
})

const submitSearch = () => {
  if (searchQuery.value) {
    close()
    navigateTo({
      path: localePath('/search'),
      query: { q: searchQuery.value }
    })
  }
}
</script>

<template>
  <Transition name="fade">
    <div v-if="modelValue" class="fixed inset-0 z-[100] bg-surface/95 backdrop-blur-xl flex flex-col items-center pt-24 px-6 md:pt-32">
      <!-- Close Button -->
      <button 
        @click="close"
        class="absolute top-6 right-6 md:top-8 md:right-12 text-on-surface-variant hover:text-primary transition-colors p-2"
        aria-label="Close search"
      >
        <Icon name="ph:x-bold" class="text-3xl" />
      </button>

      <div class="w-full max-w-4xl flex flex-col gap-8">
        <!-- Search Input -->
        <div class="relative w-full group">
          <Icon name="ph:magnifying-glass" class="absolute left-0 top-1/2 -translate-y-1/2 text-3xl text-primary" />
          <input 
            ref="inputRef"
            v-model="searchQuery"
            @keyup.enter="submitSearch"
            type="text" 
            :placeholder="t('search.placeholder')"
            class="w-full bg-transparent border-b-2 border-outline-variant/30 text-2xl md:text-5xl font-headline font-black text-on-surface py-4 pl-12 placeholder:text-outline focus:outline-none focus:border-primary transition-colors uppercase tracking-tight"
          />
        </div>

        <!-- Search Suggestions -->
        <div v-if="searchQuery" class="flex flex-col gap-4 w-full">
          <div class="flex justify-between items-end border-b border-outline-variant/20 pb-2">
            <span class="font-headline font-bold text-primary text-xs uppercase tracking-[0.2em]">{{ t('search.searching_for') }}</span>
            <span class="font-label text-on-surface-variant text-sm">{{ t('search.results_count', { count: searchResults.length }) }}</span>
          </div>

          <div v-if="searchResults.length > 0" class="flex flex-col gap-2">
            <NuxtLink 
              v-for="product in searchResults" 
              :key="product.id"
              :to="product.path"
              @click="close"
              class="flex items-center gap-4 p-3 bg-surface-container-low hover:bg-surface-container-highest transition-colors group cursor-pointer border border-transparent hover:border-outline-variant/30"
            >
              <div class="w-16 h-20 bg-surface-container-highest flex-shrink-0">
                <img v-if="product.mainImage" :src="product.mainImage" :alt="product.title" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              </div>
              <div class="flex flex-col flex-grow">
                <h4 class="font-headline font-bold text-lg uppercase tracking-tight text-on-surface group-hover:text-primary transition-colors line-clamp-1">{{ product.title }}</h4>
                <p class="font-body text-xs text-on-surface-variant line-clamp-1">{{ product.features?.printDesc || product.tag }}</p>
              </div>
              <span class="font-headline font-black text-primary whitespace-nowrap">{{ product.price }}</span>
            </NuxtLink>
          </div>
          
          <div v-else class="py-8 text-center text-on-surface-variant font-headline uppercase tracking-widest">
            No artifacts found
          </div>

          <button 
            v-if="searchResults.length > 0"
            @click="submitSearch"
            class="mt-4 w-full py-4 border border-primary/20 text-primary font-headline font-bold uppercase hover:bg-primary/10 transition-colors tracking-widest text-sm"
          >
            View all results
          </button>
        </div>
        
        <!-- Default State (Empty Query) -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-8 opacity-50">
          <div>
            <h4 class="font-headline font-bold text-sm uppercase tracking-widest text-primary mb-4">{{ t('search.trending') }}</h4>
            <div class="flex flex-col gap-2">
              <button @click="searchQuery = 'Hoodie'" class="text-left font-headline text-on-surface-variant hover:text-on-surface hover:pl-2 transition-all uppercase tracking-tight text-xl">Obsidian Heavyweight Hoodie</button>
              <button @click="searchQuery = 'Mug'" class="text-left font-headline text-on-surface-variant hover:text-on-surface hover:pl-2 transition-all uppercase tracking-tight text-xl">Monolith Matte Mug</button>
              <button @click="searchQuery = 'Vessel'" class="text-left font-headline text-on-surface-variant hover:text-on-surface hover:pl-2 transition-all uppercase tracking-tight text-xl">Titanium White Vessel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, backdrop-filter 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  backdrop-filter: blur(0px);
}
</style>
