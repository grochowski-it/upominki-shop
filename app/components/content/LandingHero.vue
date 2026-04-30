<script setup lang="ts">
defineProps({
  image: {
    type: String,
    required: true
  }
})
</script>

<template>
  <section class="relative h-[870px] w-full flex items-center overflow-hidden">
    <div class="absolute inset-0 z-0">
      <img :src="image" class="w-full h-full object-cover opacity-60 grayscale" />
      <div class="absolute inset-0 bg-gradient-to-r from-[#0e0e0e] via-transparent to-transparent"></div>
    </div>
    <div class="relative z-10 px-12 max-w-4xl">
      <div class="text-7xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-8 font-headline uppercase [&_strong]:text-primary [&_strong]:font-black text-on-surface">
        <slot name="title" />
      </div>
      <div class="text-on-surface-variant text-xl max-w-xl mb-14 font-body">
        <slot name="description" />
      </div>
      <button class="bg-primary text-on-primary px-12 py-5 font-black text-xl sharp-edge hover:bg-primary-dim transition-all active:scale-95 flex items-center gap-4 group">
        <slot name="button-text" />
        <Icon name="ph:arrow-right-bold" class="text-2xl transition-transform group-hover:translate-x-2" />
      </button>
    </div>
  </section>
</template>
