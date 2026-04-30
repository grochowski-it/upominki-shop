<script setup lang="ts">
const { locale } = useI18n()

const { data: allFooter } = await useAsyncData('footer', () => queryCollection('footer').all())
const footerData = computed(() => allFooter.value?.find(f => f.id.includes(`/${locale.value}.yml`)))
</script>

<template>
  <footer class="bg-[#0e0e0e] border-t border-[#262626]" v-if="footerData">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-16 px-12 py-28">
      <!-- Brand Column -->
      <div class="col-span-2 md:col-span-1">
        <div class="text-xl font-bold text-[#e4f265] mb-8 uppercase tracking-widest font-headline">UPOMINKI.SHOP</div>
        <p class="text-[#ababab] text-sm leading-relaxed mb-8 max-w-xs font-body tracking-tight">
          {{ footerData.description }}
        </p>
        <div class="flex gap-4">
          <Icon name="ph:globe" class="text-[#ababab] hover:text-[#e4f265] cursor-pointer text-2xl transition-colors" />
          <Icon name="ph:envelope" class="text-[#ababab] hover:text-[#e4f265] cursor-pointer text-2xl transition-colors" />
        </div>
      </div>
      <!-- Dynamic Sections -->
      <div v-for="(section, idx) in footerData.sections" :key="idx">
        <h4 class="text-white font-black text-sm uppercase tracking-widest mb-8 font-headline">{{ section.title }}</h4>
        <ul class="space-y-4 font-body text-sm tracking-tight">
          <li v-for="(link, lIdx) in section.links" :key="lIdx">
            <NuxtLink :to="link.url" :class="link.label === 'Logowanie Hurtowników' || link.label === 'Wholesale Login' ? 'text-[#ababab] hover:text-[#e4f265] transition-colors underline decoration-2' : 'text-[#ababab] hover:text-[#e4f265] transition-colors'">
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="px-12 pb-12">
      <div class="bg-[#262626] h-[1px] w-full mb-8"></div>
      <div class="flex flex-col md:flex-row justify-between items-center gap-4 text-[#ababab] font-body text-xs tracking-tight uppercase">
        <span>{{ footerData.rights }}</span>
        <div class="flex gap-8">
          <span>{{ footerData.city }}</span>
          <span>{{ footerData.logistics }}</span>
        </div>
      </div>
    </div>
  </footer>
</template>
