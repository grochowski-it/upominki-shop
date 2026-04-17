<template>
  <section class="px-12 py-24 bg-[#111111] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a1a1a] to-[#0e0e0e] border-y border-[#262626]">
    <div class="flex justify-between items-end mb-16">
      <div>
        <div class="text-5xl font-black uppercase tracking-tighter mb-2 font-headline text-on-surface">
          <slot name="title" />
        </div>
        <div class="h-1 w-24 bg-primary"></div>
      </div>
      <div class="text-on-surface-variant font-label uppercase tracking-widest text-sm">
        <slot name="subtitle" />
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
      <slot />
    </div>
  </section>
</template>
