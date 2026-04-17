<template>
  <div class="bg-background text-on-background font-body antialiased min-h-screen flex flex-col">
    <!-- TopNavBar -->
    <header class="fixed top-0 left-0 w-full z-50 bg-[#0e0e0e] border-none">
      <div class="flex justify-between items-center w-full px-12 py-6 max-w-none relative">
        <div class="text-3xl font-black text-[#e4f265] tracking-widest font-headline uppercase">
          UPOMINKI.SHOP
        </div>
        <nav class="hidden md:flex items-center gap-10">
          <NuxtLink to="/" class="text-[#e4f265] relative pb-2 transition-all font-headline tracking-tighter uppercase before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-[#e4f265]">
            Shop All
          </NuxtLink>
          <NuxtLink to="#" class="text-[#ababab] hover:text-[#e4f265] transition-colors font-headline tracking-tighter uppercase">Engraving</NuxtLink>
          <NuxtLink to="#" class="text-[#ababab] hover:text-[#e4f265] transition-colors font-headline tracking-tighter uppercase">Printing</NuxtLink>
          <NuxtLink to="#" class="text-[#ababab] hover:text-[#e4f265] transition-colors font-headline tracking-tighter uppercase">Bestsellers</NuxtLink>
          <NuxtLink to="#" class="text-[#ababab] hover:text-[#e4f265] transition-colors font-headline tracking-tighter uppercase">Corporate</NuxtLink>
        </nav>
        <div class="flex items-center gap-6">
          <button class="text-[#ababab] hover:text-[#e4f265] transition-all duration-150 scale-95 active:opacity-80 flex items-center justify-center">
            <Icon name="ph:user" class="text-2xl" />
          </button>
          <button class="text-[#ababab] hover:text-[#e4f265] transition-all duration-150 scale-95 active:opacity-80 flex items-center justify-center">
            <Icon name="ph:shopping-cart" class="text-2xl" />
          </button>
        </div>
        <div class="bg-[#262626] h-[2px] w-full absolute bottom-0 left-0"></div>
      </div>
    </header>

    <main class="pt-[92px] flex-grow">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-[#0e0e0e] border-t border-[#262626]">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-16 px-12 py-28">
        <!-- Brand Column -->
        <div class="col-span-2 md:col-span-1">
          <div class="text-xl font-bold text-[#e4f265] mb-8 uppercase tracking-widest font-headline">UPOMINKI.SHOP</div>
          <p class="text-[#ababab] text-sm leading-relaxed mb-8 max-w-xs font-body tracking-tight">
            Premium industrial personalization services for corporate and individual clients. Engineered for distinction.
          </p>
          <div class="flex gap-4">
            <Icon name="ph:globe" class="text-[#ababab] hover:text-[#e4f265] cursor-pointer text-2xl transition-colors" />
            <Icon name="ph:envelope" class="text-[#ababab] hover:text-[#e4f265] cursor-pointer text-2xl transition-colors" />
          </div>
        </div>
        <!-- Navigation -->
        <div>
          <h4 class="text-white font-black text-sm uppercase tracking-widest mb-8 font-headline">Navigation</h4>
          <ul class="space-y-4 font-body text-sm tracking-tight">
            <li><NuxtLink to="#" class="text-[#ababab] hover:text-[#e4f265] transition-colors">About Industrialist</NuxtLink></li>
            <li><NuxtLink to="#" class="text-[#ababab] hover:text-[#e4f265] transition-colors">Bestsellers</NuxtLink></li>
            <li><NuxtLink to="/" class="text-[#ababab] hover:text-[#e4f265] transition-colors">Shop All</NuxtLink></li>
            <li><NuxtLink to="#" class="text-[#ababab] hover:text-[#e4f265] transition-colors">Corporate</NuxtLink></li>
          </ul>
        </div>
        <!-- Support -->
        <div>
          <h4 class="text-white font-black text-sm uppercase tracking-widest mb-8 font-headline">Support</h4>
          <ul class="space-y-4 font-body text-sm tracking-tight">
            <li><NuxtLink to="#" class="text-[#ababab] hover:text-[#e4f265] transition-colors">Shipping Logistics</NuxtLink></li>
            <li><NuxtLink to="#" class="text-[#ababab] hover:text-[#e4f265] transition-colors">Bulk Orders</NuxtLink></li>
            <li><NuxtLink to="#" class="text-[#ababab] hover:text-[#e4f265] transition-colors">Contact Tech Support</NuxtLink></li>
            <li><NuxtLink to="#" class="text-[#ababab] hover:text-[#e4f265] transition-colors">Privacy Policy</NuxtLink></li>
          </ul>
        </div>
        <!-- Contact -->
        <div>
          <h4 class="text-white font-black text-sm uppercase tracking-widest mb-8 font-headline">Legal</h4>
          <ul class="space-y-4 font-body text-sm tracking-tight">
            <li><NuxtLink to="#" class="text-[#ababab] hover:text-[#e4f265] transition-colors">Terms of Service</NuxtLink></li>
            <li><NuxtLink to="#" class="text-[#ababab] hover:text-[#e4f265] transition-colors">Cookie Policy</NuxtLink></li>
            <li><NuxtLink to="#" class="text-[#ababab] hover:text-[#e4f265] transition-colors">Returns</NuxtLink></li>
            <li><NuxtLink to="#" class="text-[#ababab] hover:text-[#e4f265] transition-colors underline decoration-2">Wholesale Login</NuxtLink></li>
          </ul>
        </div>
      </div>
      <div class="px-12 pb-12">
        <div class="bg-[#262626] h-[1px] w-full mb-8"></div>
        <div class="flex flex-col md:flex-row justify-between items-center gap-4 text-[#ababab] font-body text-xs tracking-tight uppercase">
          <span>© 2024 UPOMINKI.SHOP. PRECISION ENGRAVED.</span>
          <div class="flex gap-8">
            <span>WARSAW / PL</span>
            <span>GLOBAL LOGISTICS</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
