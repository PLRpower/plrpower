<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const route = useRoute();
const isScrolled = ref(false);

const navItems = [
  { name: 'About', href: '#about', num: '01' },
  { name: 'Projects', href: '#projects', num: '02' },
  { name: 'Education', href: '#education', num: '03' },
  { name: 'Experience', href: '#experience', num: '04' },
  { name: 'Skills', href: '#skills', num: '05' },
  { name: 'Awards', href: '#awards', num: '06' },
  { name: 'Contact', href: '#contact', num: '07' },
];

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

const unblockScroll = () => {
  document.documentElement.classList.remove('no-scroll');
  document.body.classList.remove('no-scroll');
};

const handleNavClick = () => {
  unblockScroll();
};

const getNavLink = (href: string) => {
  if (route.path === '/') return href;
  return '/' + href;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <header 
    class="header" 
    :class="{ 'header--scrolled': isScrolled }"
  >
    <nav class="nav">
      <div class="nav-links">
        <NuxtLink 
          v-for="item in navItems" 
          :key="item.href"
          :to="getNavLink(item.href)"
          class="nav-link"
          @click="handleNavClick"
        >
          <span class="nav-num">{{ item.num }}.</span>
          <span class="nav-text">{{ item.name }}</span>
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0 40px;
  background: rgba(3, 3, 3, 0);
  border-bottom: 1px solid rgba(255, 255, 255, 0);
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0);
  backdrop-filter: blur(0px);
}

.header--scrolled {
  background: rgba(3, 3, 3, 0.75);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
}

.nav {
  max-width: 1200px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  animation: navFadeIn 1s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}

/* On veut qu'elle soit visible même si l'ascii n'est pas fini si l'utilisateur veut cliquer */
/* Mais initialement transparente ? Non, laissons la apparaître doucement */

.nav-links {
  display: flex;
  gap: 2.5rem;
}

.nav-link {
  text-decoration: none;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  color: var(--text-primary);
  transition: color 0.3s ease;
  padding: 0.5rem 0;
}

.nav-num {
  color: var(--accent-color);
  font-size: 0.75rem;
  opacity: 0.8;
}

.nav-text {
  letter-spacing: 0.05em;
  opacity: 0.9;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--accent-color);
  transition: width 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.nav-link:hover {
  color: var(--accent-color);
}

.nav-link:hover::after {
  width: 100%;
}

@keyframes navFadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .nav-links {
    display: none; /* Mobile menu non demandé pour l'instant, on cache ou simplifie */
  }
  
  .header {
    padding: 0 20px;
  }
}
</style>
