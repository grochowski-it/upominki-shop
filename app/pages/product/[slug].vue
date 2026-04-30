<script setup lang="ts">
const { t, locale } = useI18n()
const route = useRoute()
const slug = route.params.slug as string

// Fetch product data
const collectionPath = computed(() => {
  return locale.value === 'pl' ? `/products/${slug}` : `/en/products/${slug}`
})

const { data: product } = await useAsyncData(`product-${slug}`, () => {
  return queryCollection('products').path(collectionPath.value).first()
}, { watch: [locale] })

// Computed properties for the template
const sizes = computed(() => product.value?.sizes || [])
const colors = computed(() => product.value?.colors || [])
const thumbnails = computed(() => product.value?.thumbnails || [])

// Gallery state
const mainImage = ref(product.value?.mainImage || '')
const originalMainImage = ref(product.value?.mainImage || '')
const activeThumb = ref(-1) // -1 = main image is the original

watch(product, (newVal) => {
  if (newVal) {
    mainImage.value = newVal.mainImage
    originalMainImage.value = newVal.mainImage
    activeThumb.value = -1
    
    // reset selection if we want to
    if (!sizes.value.includes(selectedSize.value)) {
      selectedSize.value = sizes.value[0] || 'M'
    }
  }
})

const setMainImage = (src: string, index: number) => {
  mainImage.value = src
  activeThumb.value = index
}

const resetMainImage = () => {
  mainImage.value = originalMainImage.value
  activeThumb.value = -1
}

// Selection state
const selectedSize = ref(sizes.value[0] || 'M')
const selectedColor = ref(colors.value[0]?.value || '#1a1a1a')

// Text input
const customText = ref('')

// Drag & drop
const isDragging = ref(false)
const uploadedFile = ref<string | null>(null)

const handleDragOver = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = true
}

const handleDragLeave = () => {
  isDragging.value = false
}

const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = false
  if (e.dataTransfer?.files.length) {
    uploadedFile.value = e.dataTransfer.files[0].name
  }
}

const handleFileClick = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = (e: Event) => {
    const target = e.target as HTMLInputElement
    if (target.files?.length) {
      uploadedFile.value = target.files[0].name
    }
  }
  input.click()
}

</script>

<template>
  <div class="max-w-[1440px] mx-auto px-6 lg:px-12 py-8 lg:py-12">
    <!-- Product Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
      <!-- ==================== -->
      <!-- Product Gallery (Left) -->
      <!-- ==================== -->
      <div class="lg:col-span-7">
        <!-- Main Image -->
        <div
          class="bg-surface-container-low aspect-square relative group overflow-hidden cursor-crosshair"
        >
          <img
            :src="mainImage"
            :alt="product?.title"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div
            class="absolute top-6 left-6 lg:top-8 lg:left-8 bg-primary text-on-primary px-4 py-1 font-headline font-bold text-xs lg:text-sm tracking-widest uppercase"
          >
            {{ product?.tag }}
          </div>
        </div>

        <!-- Thumbnails -->
        <div class="grid grid-cols-4 gap-3 lg:gap-4 mt-3 lg:mt-4">
          <div
            v-for="(thumb, index) in thumbnails"
            :key="index"
            class="aspect-square cursor-pointer transition-all duration-200"
            :class="[
              activeThumb === index
                ? 'border-2 border-primary'
                : 'border-2 border-transparent hover:border-primary/30',
              'bg-surface-container-highest'
            ]"
            @click="setMainImage(thumb, index)"
          >
            <img
              :src="thumb"
              :alt="`Thumbnail ${index + 1}`"
              class="w-full h-full object-cover transition-opacity duration-200"
              :class="activeThumb === index ? 'opacity-80' : 'opacity-40 hover:opacity-100'"
            />
          </div>
          <div
            class="bg-surface-container-highest aspect-square flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer border-2 border-transparent hover:border-primary/30"
          >
            <span class="material-symbols-outlined text-3xl lg:text-4xl">play_circle</span>
          </div>
        </div>
      </div>

      <!-- ======================== -->
      <!-- Product Details (Right) -->
      <!-- ======================== -->
      <div class="lg:col-span-5 flex flex-col">
        <!-- Breadcrumbs (mobile & desktop) -->
        <nav class="flex gap-2 text-[10px] font-bold text-on-surface-variant mb-4 lg:mb-6 tracking-widest uppercase">
          <NuxtLink to="/" class="hover:text-primary transition-colors">{{ $t('product.breadcrumb.shop') }}</NuxtLink>
          <span>/</span>
          <span class="hover:text-primary transition-colors cursor-pointer">{{ $t('product.breadcrumb.apparel') }}</span>
          <span>/</span>
          <span class="text-primary">{{ $t('product.breadcrumb.personalized') }}</span>
        </nav>

        <!-- Title & Price -->
        <header class="mb-8 lg:mb-10">
          <h1 class="font-headline text-4xl lg:text-6xl font-black tracking-tighter mb-3 lg:mb-4 uppercase leading-none">
            {{ product?.title }}
          </h1>
          <div class="flex items-baseline gap-4">
            <span class="text-2xl lg:text-4xl font-bold text-primary font-headline">{{ product?.price }}</span>
            <span v-if="product?.oldPrice" class="text-on-surface-variant line-through text-lg lg:text-xl">{{ product?.oldPrice }}</span>
          </div>
        </header>

        <!-- Configuration Steps -->
        <div class="space-y-8 lg:space-y-10">
          <!-- Step 1: Text Input -->
          <section>
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3">
                <span class="bg-primary text-on-primary w-6 h-6 flex items-center justify-center font-bold text-xs flex-shrink-0">01</span>
                <h3 class="font-headline font-bold uppercase tracking-widest text-sm">{{ $t('product.step1Label') }}</h3>
              </div>
              <span class="text-[10px] text-primary/60 font-medium hidden lg:inline">{{ $t('product.maxChars') }}</span>
            </div>
            <div class="relative">
              <input
                id="product-text-input"
                v-model="customText"
                type="text"
                maxlength="24"
                :placeholder="$t('product.step1Placeholder')"
                class="w-full bg-surface-container-lowest border-0 border-b-2 border-primary/40 focus:border-primary focus:ring-0 text-white placeholder:text-outline-variant py-3 lg:py-4 px-0 font-headline text-base lg:text-lg tracking-widest transition-all"
              />
            </div>
          </section>

          <!-- Step 2: Upload -->
          <section>
            <div class="flex items-center gap-3 mb-4">
              <span class="bg-primary text-on-primary w-6 h-6 flex items-center justify-center font-bold text-xs flex-shrink-0">02</span>
              <h3 class="font-headline font-bold uppercase tracking-widest text-sm">{{ $t('product.step2Label') }}</h3>
            </div>
            <div
              id="product-upload-zone"
              class="border-2 border-dashed transition-colors p-6 lg:p-8 flex flex-col items-center justify-center bg-surface-container-low cursor-pointer group"
              :class="isDragging ? 'border-primary bg-primary/5' : 'border-outline-variant hover:border-primary'"
              @dragover="handleDragOver"
              @dragleave="handleDragLeave"
              @drop="handleDrop"
              @click="handleFileClick"
            >
              <span
                v-if="!uploadedFile"
                class="material-symbols-outlined text-3xl lg:text-4xl mb-2 transition-colors"
                :class="isDragging ? 'text-primary' : 'text-outline-variant group-hover:text-primary'"
              >cloud_upload</span>
              <span
                v-else
                class="material-symbols-outlined text-3xl lg:text-4xl mb-2 text-primary"
              >check_circle</span>
              <p class="text-[10px] lg:text-xs font-bold tracking-widest font-headline transition-colors text-center"
                 :class="isDragging ? 'text-white' : 'text-on-surface-variant group-hover:text-white'"
              >
                {{ uploadedFile || $t('product.step2Upload') }}
              </p>
            </div>
          </section>

          <!-- Size & Color Selection -->
          <section class="grid grid-cols-2 gap-6 lg:gap-8">
            <div>
              <h3 class="font-headline font-bold uppercase tracking-widest text-xs mb-3 lg:mb-4 text-on-surface-variant">
                {{ $t('product.selectSize') }}
              </h3>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="size in sizes"
                  :key="size"
                  :id="`product-size-${size.toLowerCase()}`"
                  class="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center font-bold text-xs lg:text-sm transition-all active:scale-95"
                  :class="selectedSize === size
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-highest hover:bg-primary hover:text-on-primary'
                  "
                  @click="selectedSize = size"
                >
                  {{ size }}
                </button>
              </div>
            </div>
            <div>
              <h3 class="font-headline font-bold uppercase tracking-widest text-xs mb-3 lg:mb-4 text-on-surface-variant">
                {{ $t('product.baseColor') }}
              </h3>
              <div class="flex gap-3">
                <button
                  v-for="color in colors"
                  :key="color.value"
                  :id="`product-color-${color.name.toLowerCase()}`"
                  class="w-8 h-8 border-2 transition-all active:scale-90"
                  :style="{ backgroundColor: color.value }"
                  :class="selectedColor === color.value
                    ? 'border-primary ring-2 ring-offset-2 ring-offset-background ring-transparent'
                    : 'border-transparent hover:border-outline'
                  "
                  @click="selectedColor = color.value"
                />
              </div>
            </div>
          </section>

          <!-- CTA Buttons -->
          <div class="pt-4 lg:pt-6 space-y-3 lg:space-y-4">
            <button
              id="product-add-to-cart"
              class="w-full bg-primary text-on-primary py-5 lg:py-6 font-headline font-black text-lg lg:text-xl tracking-widest hover:bg-primary-dim transition-all active:scale-[0.98] flex items-center justify-center gap-3"
            >
              <span class="material-symbols-outlined hidden lg:inline">shopping_bag</span>
              {{ $t('product.addToCart') }}
            </button>
            <button
              id="product-add-to-favorites"
              class="w-full bg-surface-container-highest text-primary py-3 lg:py-4 font-headline font-bold text-sm tracking-widest flex items-center justify-center gap-2 hover:bg-surface-bright transition-all active:scale-[0.98]"
            >
              <span class="material-symbols-outlined text-lg" style="font-variation-settings: 'FILL' 1;">favorite</span>
              {{ $t('product.addToFavorites') }}
            </button>
          </div>

          <!-- Product Features (mobile-visible, desktop-visible) -->
          <div class="space-y-5 pt-4 lg:pt-6 border-t border-surface-container-highest">
            <div class="flex items-start gap-4" v-if="product?.features">
              <span class="material-symbols-outlined text-primary mt-0.5 flex-shrink-0">verified</span>
              <div>
                <h4 class="text-[11px] font-bold uppercase tracking-widest mb-1">{{ product.features.printTitle }}</h4>
                <p class="text-sm text-on-surface-variant leading-relaxed">{{ product.features.printDesc }}</p>
              </div>
            </div>
            <div class="flex items-start gap-4" v-if="product?.features">
              <span class="material-symbols-outlined text-primary mt-0.5 flex-shrink-0">inventory_2</span>
              <div>
                <h4 class="text-[11px] font-bold uppercase tracking-widest mb-1">{{ product.features.materialTitle }}</h4>
                <p class="text-sm text-on-surface-variant leading-relaxed">{{ product.features.materialDesc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ==================== -->
    <!-- Engineering Specs -->
    <!-- ==================== -->
    <section class="mt-20 lg:mt-32 pt-16 lg:pt-20 border-t border-surface-container-highest" v-if="product?.specs">
      <h2 class="font-headline text-3xl lg:text-4xl font-black tracking-tighter mb-12 lg:mb-16 uppercase">
        {{ product.specs.title }}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-1 lg:gap-12">
        <!-- Fiber Density -->
        <div class="bg-surface-container-low p-8 flex flex-col justify-between min-h-[200px] lg:min-h-0 lg:bg-transparent lg:flex-row lg:gap-6">
          <div class="flex-shrink-0 w-14 h-14 lg:w-16 lg:h-16 bg-surface-container-highest flex items-center justify-center text-primary mb-4 lg:mb-0">
            <span class="material-symbols-outlined text-2xl lg:text-3xl">texture</span>
          </div>
          <div>
            <h4 class="font-headline font-bold text-lg mb-2 uppercase">{{ product.specs.fiberTitle }}</h4>
            <p class="text-on-surface-variant text-sm leading-relaxed">{{ product.specs.fiberDesc }}</p>
          </div>
        </div>
        <!-- Ink Technology -->
        <div class="bg-surface-container p-8 flex flex-col justify-between min-h-[200px] lg:min-h-0 lg:bg-transparent lg:flex-row lg:gap-6">
          <div class="flex-shrink-0 w-14 h-14 lg:w-16 lg:h-16 bg-surface-container-highest flex items-center justify-center text-primary mb-4 lg:mb-0">
            <span class="material-symbols-outlined text-2xl lg:text-3xl">ink_highlighter</span>
          </div>
          <div>
            <h4 class="font-headline font-bold text-lg mb-2 uppercase">{{ product.specs.inkTitle }}</h4>
            <p class="text-on-surface-variant text-sm leading-relaxed">{{ product.specs.inkDesc }}</p>
          </div>
        </div>
        <!-- True Fit -->
        <div class="bg-surface-container-high p-8 flex flex-col justify-between min-h-[200px] lg:min-h-0 lg:bg-transparent lg:flex-row lg:gap-6">
          <div class="flex-shrink-0 w-14 h-14 lg:w-16 lg:h-16 bg-surface-container-highest flex items-center justify-center text-primary mb-4 lg:mb-0">
            <span class="material-symbols-outlined text-2xl lg:text-3xl">straighten</span>
          </div>
          <div>
            <h4 class="font-headline font-bold text-lg mb-2 uppercase">{{ product.specs.fitTitle }}</h4>
            <p class="text-on-surface-variant text-sm leading-relaxed">{{ product.specs.fitDesc }}</p>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>
