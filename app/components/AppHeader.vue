<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';

const route = useRoute();
const colorMode = useColorMode();
const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

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
      isScrolled.value = window.scrollY > 50;
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

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <!-- Main Header -->
  <header
    class="fixed top-0 left-0 w-full z-[1000] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
    :class="[
      isScrolled
        ? 'header--scrolled'
        : 'header--top'
    ]"
  >
    <div class="max-w-[1400px] mx-auto w-full flex items-center justify-end px-6 md:px-10 h-20">

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center gap-1 animate-nav-fade-in">
        <NuxtLink
          v-for="item in navItems"
          :key="item.href"
          :to="getNavLink(item.href)"
          class="nav-link group relative px-4 py-2 no-underline"
          @click="handleNavClick"
        >
          <span class="relative z-10 font-mono text-[0.8rem] tracking-[0.08em] uppercase text-secondary transition-colors duration-300 group-hover:text-primary">
            {{ item.name }}
          </span>
          <!-- Gradient underline -->
          <span class="absolute bottom-1 left-4 right-4 h-[2px] rounded-full bg-gradient-to-r from-accent to-[#14b8a6] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] origin-left"></span>
        </NuxtLink>
      </nav>

      <!-- Theme Toggle Button -->
      <ClientOnly>
        <button
          @click="toggleTheme"
          class="relative z-[1010] w-10 h-10 flex items-center justify-center focus:outline-none transition-transform hover:scale-110 ml-2 md:ml-4 text-secondary hover:text-primary"
          aria-label="Toggle theme"
        >
          <Icon v-if="$colorMode.value === 'dark'" name="ph:sun" class="w-5 h-5" />
          <Icon v-else name="ph:moon" class="w-5 h-5" />
        </button>
      </ClientOnly>

      <!-- Mobile Hamburger Button -->
      <button
        class="md:hidden relative z-[1010] w-10 h-10 flex items-center justify-center focus:outline-none"
        aria-label="Toggle menu"
        @click="toggleMobileMenu"
      >
        <div class="hamburger-lines relative w-6 h-4 flex flex-col justify-between">
          <span
            class="block h-[2px] w-full rounded-full bg-primary transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] origin-center"
            :class="isMobileMenuOpen ? 'translate-y-[7px] rotate-45 bg-accent' : ''"
          ></span>
          <span
            class="block h-[2px] w-full rounded-full bg-primary transition-all duration-300"
            :class="isMobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100'"
          ></span>
          <span
            class="block h-[2px] w-full rounded-full bg-primary transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] origin-center"
            :class="isMobileMenuOpen ? '-translate-y-[7px] -rotate-45 bg-accent' : ''"
          ></span>
        </div>
      </button>
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
  <Transition name="overlay">
    <div
      v-if="isMobileMenuOpen"
      class="fixed inset-0 bg-black/50 z-[990] md:hidden"
      @click="toggleMobileMenu"
    />
  </Transition>

  <!-- Mobile Menu Panel -->
  <Transition name="mobile-panel">
    <nav
      v-if="isMobileMenuOpen"
      class="fixed top-0 right-0 h-full w-[min(85vw,380px)] z-[995] md:hidden mobile-panel flex flex-col"
    >
      <!-- Panel content -->
      <div class="flex flex-col justify-center flex-1 px-10 py-24 gap-2">
        <NuxtLink
          v-for="(item, index) in navItems"
          :key="item.href"
          :to="getNavLink(item.href)"
          class="mobile-nav-item group no-underline flex items-baseline gap-4 py-3"
          :style="{ animationDelay: `${index * 60 + 150}ms` }"
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
/* Header states */
.header--top {
  background: transparent;
  border-bottom: 1px solid transparent;
}

.header--scrolled {
  background: var(--header-bg, rgba(3, 3, 3, 0.4));
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--header-border, rgba(255, 255, 255, 0.06));
  box-shadow: var(--header-shadow, 0 4px 30px rgba(0, 0, 0, 0.3));
  contain: layout style;
}

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

/* Mobile panel transition */
.mobile-panel-enter-active {
  transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.mobile-panel-leave-active {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.6, 1);
}
.mobile-panel-enter-from,
.mobile-panel-leave-to {
  transform: translateX(100%);
}

/* Overlay transition */
.overlay-enter-active {
  transition: opacity 0.4s ease;
}
.overlay-leave-active {
  transition: opacity 0.3s ease;
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
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

/* Nav link subtle hover bg */
.nav-link::before {
  content: '';
  position: absolute;
  inset: 4px 0;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0);
  transition: background 0.3s ease;
}
.nav-link:hover::before {
  background: rgba(255, 255, 255, 0.03);
}
</style>