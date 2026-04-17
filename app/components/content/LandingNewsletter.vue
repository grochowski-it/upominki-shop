<script setup lang="ts">
defineProps({
  buttonText: String,
  disclaimer: String
})
</script>

<template>
  <section class="bg-surface-container-low border-y border-outline-variant/20 py-24">
    <div class="px-12 max-w-none w-full flex flex-col md:flex-row items-center justify-between gap-12">
      <div class="max-w-md">
        <div class="text-5xl font-black uppercase tracking-tighter mb-6 leading-tight font-headline text-on-surface">
          <slot name="title" />
        </div>
        <div class="text-on-surface-variant font-body leading-relaxed">
          <slot name="description" />
        </div>
      </div>
      <div class="w-full max-w-lg flex flex-col gap-4">
        <div class="relative">
          <input
            type="email"
            class="w-full bg-[#111111] border border-[#262626] px-8 py-6 text-xl text-white focus:ring-0 focus:border-[#e4f265] transition-all outline-none placeholder:text-[#666666] font-body"
            placeholder="EMAIL ADDRESS"
          />
        </div>
        <button class="w-full bg-[#e4f265] text-[#0e0e0e] py-6 text-xl font-black uppercase hover:bg-[#d4e255] transition-all active:scale-95 font-headline">
          {{ buttonText }}
        </button>
        <p class="text-[10px] text-[#ababab]/50 font-label tracking-widest text-center uppercase">{{ disclaimer }}</p>
      </div>
    </div>
  </section>
</template>
