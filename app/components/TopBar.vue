<script setup lang="ts">
const { locale, setLocale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const toggleLocale = () => {
  const newLocale = locale.value === 'pl' ? 'en' : 'pl'
  navigateTo(switchLocalePath(newLocale))
}

const { data: allNav } = await useAsyncData('navigation', () => queryCollection('navigation').all())
const navData = computed(() => allNav.value?.find(n => n.id.includes(`/${locale.value}.yml`)))

const isSearchOpen = ref(false)
</script>

<template>
  <!-- TopNavBar -->
  <header class="fixed top-0 left-0 w-full z-50 bg-[#0e0e0e] border-none">
    <div class="flex justify-between items-center w-full px-12 py-6 max-w-none relative">
      <div class="text-3xl font-black text-[#e4f265] tracking-widest font-headline uppercase">
        UPOMINKI.SHOP
      </div>
      <nav class="hidden md:flex items-center gap-10">
        <NuxtLink 
          v-for="(link, index) in navData?.links" 
          :key="index" 
          :to="link.url" 
          :class="[
            'font-headline tracking-tighter uppercase transition-all',
            index === 0 
              ? 'text-[#e4f265] relative pb-2 before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-[#e4f265]' 
              : 'text-[#ababab] hover:text-[#e4f265]'
          ]"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
      <div class="flex items-center gap-6">
        <!-- Language Switcher -->
        <button
          id="lang-switcher"
          class="flex items-center gap-1.5 text-[#ababab] hover:text-[#e4f265] transition-all duration-200 font-headline text-sm tracking-widest uppercase cursor-pointer"
          @click="toggleLocale"
        >
          <Icon name="ph:globe" class="text-lg" />
          <span class="font-bold">{{ locale === 'pl' ? 'EN' : 'PL' }}</span>
        </button>

        <button 
          @click="isSearchOpen = true"
          class="text-[#ababab] hover:text-[#e4f265] transition-all duration-150 scale-95 active:opacity-80 flex items-center justify-center"
        >
          <Icon name="ph:magnifying-glass" class="text-2xl" />
        </button>

        <button class="text-[#ababab] hover:text-[#e4f265] transition-all duration-150 scale-95 active:opacity-80 flex items-center justify-center">
          <Icon name="ph:shopping-cart" class="text-2xl" />
        </button>
      </div>
      <div class="bg-[#262626] h-[2px] w-full absolute bottom-0 left-0"></div>
    </div>
    
    <AppSearch v-model="isSearchOpen" />
  </header>
</template>
