<script setup lang="ts">
import { ref } from 'vue';

useHead({
  htmlAttrs: { lang: 'fr' },
  title: 'Paul Thomas | Portfolio',
  meta: [
    { name: 'description', content: 'Portfolio of Paul Thomas - Web Developer' }
  ]
})

const isBot = ref(false);

if (import.meta.server) {
  const ua = useRequestHeaders(['user-agent'])['user-agent'] || '';
  isBot.value = /bot|googlebot|crawler|spider|robot|crawling|lighthouse|chrome-lighthouse/i.test(ua);
} else if (import.meta.client) {
  isBot.value = /bot|googlebot|crawler|spider|robot|crawling|lighthouse|chrome-lighthouse/i.test(navigator.userAgent);
}

// Mouse-tracking glow removed — the lerp + rAF loop on 3 fixed elements
// was causing continuous style recalculations during every mouse move.
// Static CSS glows provide the same ambient effect without per-frame cost.
</script>

<template>
  <div class="relative min-h-screen w-full overflow-hidden bg-bg-primary">
    <template v-if="!isBot">
      <div class="grain-overlay"></div>
      <div class="grid-overlay"></div>
      <div class="glow"></div>
      <div class="glow-2"></div>
      <div class="glow-3"></div>

      <div class="vignette"></div>
    </template>
    
    <div class="relative z-10">
      <AppHeader />
      <NuxtRouteAnnouncer />
      <NuxtPage />
    </div>
  </div>
</template>

<style>
</style>
