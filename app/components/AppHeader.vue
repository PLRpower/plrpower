<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';

const route = useRoute();
const isScrolled = ref(false);
const isPastHero = ref(false);
const isMobileMenuOpen = ref(false);

const isNotHome = computed(() => route.path !== '/' && route.path !== '');
const showLogo = computed(() => isNotHome.value || isPastHero.value);

const navItems = [
  { name: 'About', href: '#about', num: '01' },
  { name: 'Projects', href: '#projects', num: '02' },
  { name: 'Experience', href: '#experience', num: '03' },
  { name: 'Education', href: '#education', num: '04' },
  { name: 'Skills', href: '#skills', num: '05' },
  { name: 'Awards', href: '#awards', num: '06' },
  { name: 'Contact', href: '#contact', num: '07' },
];

let ticking = false;
const handleScroll = () => {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(() => {
      const top = window.scrollY;
      isScrolled.value = top > 50;
      isPastHero.value = top > 220;
      ticking = false;
    });
  }
};

const unblockScroll = () => {
  document.documentElement.classList.remove('no-scroll');
  document.body.classList.remove('no-scroll');
};

const handleNavClick = () => {
  unblockScroll();
  isMobileMenuOpen.value = false;
  document.body.classList.remove('no-scroll');
};

const handleLogoClick = () => {
  handleNavClick();
  if (route.path === '/' || route.path === '') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const getNavLink = (href: string) => {
  if (route.path === '/') return href;
  return '/' + href;
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  if (isMobileMenuOpen.value) {
    document.body.classList.add('no-scroll');
  } else {
    document.body.classList.remove('no-scroll');
  }
};

watch(() => route.path, () => {
  isMobileMenuOpen.value = false;
  document.body.classList.remove('no-scroll');
});

onMounted(() => {
  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <!-- Main Header -->
  <header
    class="fixed top-0 left-0 w-full z-[1000] transform-gpu transition-[background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
    :class="isScrolled
      ? 'bg-[rgba(3,3,3,0.75)] backdrop-blur-md border-b border-[var(--header-border,rgba(255,255,255,0.06))] shadow-[var(--header-shadow,0_4px_30px_rgba(0,0,0,0.3))] [contain:layout_style]'
      : 'bg-transparent border-b border-transparent'"
  >
    <div class="max-w-[1400px] mx-auto w-full flex items-center justify-between px-6 md:px-10 h-20">

      <!-- ASCII Logo (Scrolled or Non-home pages) -->
      <div class="flex items-center">
        <NuxtLink
          to="/"
          class="group block w-44 sm:w-56 md:w-64 transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] focus:outline-none no-underline"
          :class="showLogo ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 -translate-x-3 pointer-events-none'"
          aria-label="Paul Thomas — Return to home"
          @click="handleLogoClick"
        >
          <AsciiBanner :animated="false" class="!my-0" />
        </NuxtLink>
      </div>

      <!-- Right Navigation & Controls -->
      <div class="flex items-center ml-auto">
        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-2 animate-nav-fade-in">
          <div
            v-for="item in navItems"
            :key="item.href"
            class="relative px-3 py-1.5"
            @click="handleNavClick"
          >
            <AsciiOdometerLink
              :to="getNavLink(item.href)"
              :text="item.name"
              class="text-[0.8rem] tracking-[0.08em] text-secondary hover:text-primary transition-colors"
            />
          </div>
        </nav>

        <!-- Mobile Hamburger Button -->
        <button
          class="md:hidden relative z-[1010] w-10 h-10 flex items-center justify-center focus:outline-none ml-2"
          aria-label="Toggle menu"
          @click="toggleMobileMenu"
        >
          <span class="hamburger-lines relative w-6 h-4 flex flex-col justify-between">
            <span
              class="block h-[2px] w-full bg-primary transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] origin-center"
              :class="isMobileMenuOpen ? 'translate-y-[7px] rotate-45 bg-accent' : ''"
            ></span>
            <span
              class="block h-[2px] w-full bg-primary transition-all duration-300"
              :class="isMobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100'"
            ></span>
            <span
              class="block h-[2px] w-full bg-primary transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] origin-center"
              :class="isMobileMenuOpen ? '-translate-y-[7px] -rotate-45 bg-accent' : ''"
            ></span>
          </span>
        </button>
      </div>
    </div>

    <!-- Bottom gradient line -->
    <div class="absolute bottom-0 left-0 w-full h-px overflow-hidden">
      <div
        class="header-bottom-line h-full w-full"
        :class="isScrolled ? 'opacity-100' : 'opacity-0'"
      ></div>
    </div>
  </header>

  <!-- Mobile Menu Overlay -->
  <Transition
    enter-active-class="transition-opacity duration-400 ease-out"
    enter-from-class="opacity-0"
    leave-active-class="transition-opacity duration-300 ease-in"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isMobileMenuOpen"
      class="fixed inset-0 bg-black/50 z-[990] md:hidden"
      @click="toggleMobileMenu"
    />
  </Transition>

  <!-- Mobile Menu Panel -->
  <Transition
    enter-active-class="transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
    enter-from-class="translate-x-full"
    leave-active-class="transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.6,1)]"
    leave-to-class="translate-x-full"
  >
    <nav
      v-if="isMobileMenuOpen"
      class="fixed top-0 right-0 h-full w-[min(85vw,380px)] z-[995] md:hidden mobile-panel flex flex-col"
    >
      <!-- Panel content -->
      <div class="flex flex-col justify-center flex-1 px-10 py-24 gap-2">
        <NuxtLink
          v-if="isNotHome"
          to="/"
          class="mobile-nav-item group no-underline flex items-baseline gap-4 py-3 border-b border-white/[0.06] mb-2"
          @click="handleNavClick"
        >
          <span class="font-mono text-xs text-accent transition-colors duration-300">
            00.
          </span>
          <span class="font-title text-2xl font-semibold text-accent tracking-tight transition-all duration-300 group-hover:translate-x-2">
            Home
          </span>
          <span class="flex-1 h-px bg-gradient-to-r from-accent/20 to-transparent ml-2 self-center"></span>
        </NuxtLink>

        <NuxtLink
          v-for="(item, index) in navItems"
          :key="item.href"
          :to="getNavLink(item.href)"
          class="mobile-nav-item group no-underline flex items-baseline gap-4 py-3"
          :style="{ animationDelay: `${(index + (isNotHome ? 1 : 0)) * 60 + 150}ms` }"
          @click="handleNavClick"
        >
          <span class="font-mono text-xs text-accent/60 transition-colors duration-300 group-hover:text-accent">
            {{ item.num }}.
          </span>
          <span class="font-title text-2xl font-semibold text-primary/80 tracking-tight transition-all duration-300 group-hover:text-primary group-hover:translate-x-2">
            {{ item.name }}
          </span>
          <span class="flex-1 h-px bg-gradient-to-r from-white/5 to-transparent ml-2 self-center"></span>
        </NuxtLink>
      </div>

      <!-- Panel decorative bottom -->
      <div class="px-10 pb-10">
        <div class="h-px w-full bg-gradient-to-r from-accent/30 via-[#14b8a6]/30 to-transparent mb-4"></div>
        <p class="font-mono text-[0.65rem] text-secondary/50 tracking-widest uppercase">Paul Thomas — Portfolio</p>
      </div>
    </nav>
  </Transition>
</template>

<style scoped>
/* Entry animation */
@keyframes navFadeIn {
  from {
    opacity: 0;
    transform: translateY(-12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-nav-fade-in {
  animation: navFadeIn 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.2s both;
}

/* Bottom gradient line with pulse */
.header-bottom-line {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(45, 212, 191, 0.3) 25%,
    rgba(16, 185, 129, 0.3) 50%,
    rgba(45, 212, 191, 0.3) 75%,
    transparent 100%
  );
  transition: opacity 0.7s ease;
}

/* Mobile panel glassmorphism */
.mobile-panel {
  background: var(--panel-bg, rgba(3, 3, 3, 0.85));
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border-left: 1px solid var(--panel-border, rgba(255, 255, 255, 0.06));
  box-shadow: var(--panel-shadow, -20px 0 60px rgba(0, 0, 0, 0.5));
}

/* Mobile nav item stagger animation */
@keyframes mobileItemSlide {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.mobile-nav-item {
  opacity: 0;
  animation: mobileItemSlide 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}
</style>