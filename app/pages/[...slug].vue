<script setup lang="ts">
const route = useRoute()

// Fetch the document from the 'pages' collection based on current route
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('pages').path(route.path).first()
})
</script>

<template>
  <main>
    <!-- ContentRenderer replaces the removed ContentDoc component -->
    <ContentRenderer v-if="page" :value="page" />
    <div v-else class="min-h-screen flex items-center justify-center bg-surface">
      <div class="text-center">
        <h1 class="text-6xl font-black text-primary font-headline uppercase mb-4">404</h1>
        <p class="text-on-surface-variant font-body mb-8">Page not found.</p>
        <NuxtLink to="/" class="bg-primary text-on-primary px-8 py-3 font-bold sharp-edge">
          Return Home
        </NuxtLink>
      </div>
    </div>
  </main>
</template>
