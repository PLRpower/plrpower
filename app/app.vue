<script setup lang="ts">

useHead({
  title: 'Paul Thomas | Portfolio',
  meta: [
    { name: 'description', content: 'Portfolio of Paul Thomas - Web Developer' }
  ]
})
</script>

<template>
  <div class="app-wrapper">
    <!-- Texture & Overlays -->
    <div class="grain-overlay"></div>
    <div class="grid-overlay"></div>
    <div class="glow"></div>
    <div class="vignette"></div>
    
    <!-- App Content -->
    <div class="content-wrapper">
      <NuxtRouteAnnouncer />
      <Hero />
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
