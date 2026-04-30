<script setup lang="ts">
const localePath = useLocalePath()
defineProps({
  title: String,
  link: String,
  image: String
})
</script>

<template>
  <div class="group relative overflow-hidden bg-surface-container-low sharp-edge aspect-[3/4]">
    <img :src="image" class="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-80" />
    <div class="absolute inset-0 bg-gradient-to-t from-surface-container-highest to-transparent opacity-90"></div>
    <div class="absolute bottom-0 left-0 p-8 w-full">
      <h3 class="text-3xl font-bold uppercase mb-4 text-on-surface font-headline">{{ title }}</h3>
      <div class="h-px w-full bg-outline-variant mb-4"></div>
      <NuxtLink :to="localePath(link)" class="text-primary font-bold flex items-center gap-2 text-sm uppercase tracking-widest font-body group-hover:gap-3 transition-all">
        View Range <Icon name="ph:arrow-up-right-bold" class="text-sm" />
      </NuxtLink>
    </div>
  </div>
</template>
