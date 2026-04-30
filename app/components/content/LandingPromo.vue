<script setup lang="ts">
defineProps({
  buttonText: String,
  buttonLink: String
})
</script>

<template>
  <section class="w-full bg-primary py-24 lg:py-32 min-h-[400px] lg:min-h-[500px] overflow-hidden relative group flex items-center">
    <div class="absolute -right-10 lg:-right-20 top-0 h-full flex items-center text-black opacity-10 select-none pointer-events-none">
      <span class="text-[12rem] lg:text-[18rem] font-black uppercase whitespace-nowrap font-headline leading-none">OFFER</span>
    </div>
    <div class="px-12 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10 w-full max-w-none mx-auto">
      <div class="text-on-primary">
        <span class="text-sm font-bold uppercase tracking-[0.3em] mb-4 block font-label">
          <slot name="subtitle" />
        </span>
        <div class="text-6xl md:text-7xl font-black uppercase tracking-tighter leading-none font-headline">
          <slot name="title" />
        </div>
      </div>
      <NuxtLink :to="buttonLink" class="bg-[#0e0e0e] text-[#e4f265] px-16 py-6 font-black text-xl sharp-edge hover:bg-surface-container-highest transition-all uppercase whitespace-nowrap font-headline inline-block text-center">
        {{ buttonText }}
      </NuxtLink>
    </div>
  </section>
</template>
