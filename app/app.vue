<script setup lang="ts">
useHead({
  htmlAttrs: { lang: 'en', class: 'bg-[#0a0a0a] text-[#e2e2e2]' },
  bodyAttrs: { class: 'bg-[#0a0a0a] text-[#e2e2e2]' },
  title: 'Paul Thomas | Portfolio',
  meta: [
    { name: 'description', content: 'Portfolio of Paul Thomas - Computer Science Student & AI/Embedded Engineer' }
  ]
})
</script>

<template>
  <div class="relative min-h-screen w-full overflow-hidden bg-bg-primary">
    <div class="grain-overlay"></div>
    <div class="grid-overlay"></div>
    <div class="glow"></div>
    <div class="glow-2"></div>
    <div class="glow-3"></div>
    <div class="vignette"></div>
    
    <div class="relative z-10 flex flex-col min-h-screen">
      <AppHeader />
      <NuxtRouteAnnouncer />
      <div class="flex-grow">
        <NuxtPage />
      </div>
      <AppFooter />
    </div>
  </div>
</template>

<style>
@import "~/assets/css/main.css";

html, body {
  background-color: #0a0a0a !important;
  color: #e2e2e2;
  margin: 0;
  padding: 0;
  min-height: 100vh;
  overflow-x: hidden;
}
</style>
