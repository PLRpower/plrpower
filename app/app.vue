<script setup lang="ts">

import { onMounted, onBeforeUnmount } from 'vue';

useHead({
  htmlAttrs: {
    lang: 'fr'
  },
  title: 'Paul Thomas | Portfolio',
  meta: [
    { name: 'description', content: 'Portfolio of Paul Thomas - Web Developer' }
  ]
})

onMounted(() => {
  let width = window.innerWidth;
  let height = window.innerHeight;
  
  const handleResize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
  };
  
  window.addEventListener('resize', handleResize);

  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / width - 0.5) * 30;
    const y = (e.clientY / height - 0.5) * 30;
    
    const glow = document.querySelector('.glow') as HTMLElement;
    const glow2 = document.querySelector('.glow-2') as HTMLElement;
    
    if (glow) glow.style.transform = `translate(${x}px, ${y}px)`;
    if (glow2) glow2.style.transform = `translate(${-x}px, ${-y}px)`;
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
  });
});
</script>

<template>
  <div class="app-wrapper">
    <!-- Texture & Overlays -->
    <div class="grain-overlay"></div>
    <div class="grid-overlay"></div>
    <div class="glow"></div>
    <div class="glow-2"></div>
    <div class="vignette"></div>
    
    <!-- App Content -->
    <div class="content-wrapper">
      <AppHeader />
      <NuxtRouteAnnouncer />
      <NuxtPage />
    </div>
  </div>
</template>

<style>
.app-wrapper {
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  background-color: var(--bg-color);
}

.content-wrapper {
  position: relative;
  z-index: 10;
}
</style>
