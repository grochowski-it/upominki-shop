<template>
  <div class="bg-background text-on-background font-body antialiased min-h-screen flex flex-col">
    <TopBar />

    <main class="pt-[92px] flex-grow">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>
