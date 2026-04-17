<script setup lang="ts">
defineProps({
  mainImage: String,
  mainTag: String,
  mainTitle: String,
  subImage1: String,
  subTitle1: String,
  subImage2: String,
  subTitle2: String
})
</script>

<template>
  <section class="px-12 py-24 bg-surface">
    <div class="text-center mb-20">
      <div class="text-6xl font-black uppercase tracking-tighter mb-4 font-headline text-on-surface">
        <slot name="title" />
      </div>
      <div class="text-on-surface-variant font-body">
        <slot name="subtitle" />
      </div>
    </div>
    <div class="grid grid-cols-12 gap-4 h-[1000px]">
      <!-- Large Featured -->
      <div class="col-span-12 md:col-span-8 h-full bg-surface-container-high relative overflow-hidden group sharp-edge">
        <img :src="mainImage" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80" />
        <div class="absolute inset-0 flex items-end p-12 bg-gradient-to-t from-black/80 to-transparent">
          <div>
            <span class="text-primary text-xs font-bold tracking-[0.4em] uppercase mb-4 block font-label">{{ mainTag }}</span>
            <h3 class="text-4xl font-bold uppercase text-on-surface font-headline">{{ mainTitle }}</h3>
          </div>
        </div>
      </div>
      <!-- Side Column -->
      <div class="col-span-12 md:col-span-4 flex flex-col gap-4 h-full">
        <div class="h-1/2 bg-surface-container-high relative overflow-hidden group sharp-edge">
          <img :src="subImage1" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80" />
          <div class="absolute inset-0 flex items-end p-8 bg-gradient-to-t from-black/80 to-transparent">
            <h3 class="text-2xl font-bold uppercase text-on-surface font-headline">{{ subTitle1 }}</h3>
          </div>
        </div>
        <div class="h-1/2 bg-surface-container-high relative overflow-hidden group sharp-edge">
          <img :src="subImage2" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80" />
          <div class="absolute inset-0 flex items-end p-8 bg-gradient-to-t from-black/80 to-transparent">
            <h3 class="text-2xl font-bold uppercase text-on-surface font-headline">{{ subTitle2 }}</h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
