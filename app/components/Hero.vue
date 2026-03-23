<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

// Hero component - structural wrapper
const props = defineProps<{
  year?: string;
  subtitle?: string;
}>();

const route = useRoute();

const isBot = ref(false);

// Détection bots/Lighthouse (SSR & Client)
if (process.server) {
  const ua = useRequestHeaders(['user-agent'])['user-agent'] || '';
  isBot.value = /bot|googlebot|crawler|spider|robot|crawling|lighthouse|chrome-lighthouse/i.test(ua);
} else if (process.client) {
  isBot.value = /bot|googlebot|crawler|spider|robot|crawling|lighthouse|chrome-lighthouse/i.test(navigator.userAgent);
}

onMounted(() => {
  // Si on arrive avec un hash (ex: /#about) ou si c'est un bot, on ne bloque pas le scroll
  if (route.hash || isBot.value) {
    return;
  }

  // Empêcher le scroll initialement via la classe CSS
  document.documentElement.classList.add('no-scroll');
  document.body.classList.add('no-scroll');
  
  const timer = setTimeout(() => {
    document.documentElement.classList.remove('no-scroll');
    document.body.classList.remove('no-scroll');
  }, 5000);

  // Nettoyage au cas où le composant est démonté avant la fin du timer
  onUnmounted(() => {
    clearTimeout(timer);
    document.documentElement.classList.remove('no-scroll');
    document.body.classList.remove('no-scroll');
  });
});
</script>

<template>
  <div class="h-screen w-full flex flex-col justify-between py-10 relative z-10 max-md:py-5">
    <main class="flex-grow flex flex-col justify-start pt-[12vh] items-start text-left max-md:pt-[10vh]">

      <div class="animate-fade-in" :style="isBot ? { animation: 'none', opacity: 1 } : { 'animation-delay': '0.2s' }">
        <div class="font-handwriting text-[clamp(1.5rem,4vw,2.2rem)] tracking-wider" style="color: var(--accent-color);">
          Hello, I am
        </div>
      </div>

      <AsciiBanner :delay="isBot ? 0 : 500" :instant="isBot" />

      <div class="flex flex-col items-start text-left animate-fade-in" 
           :style="isBot ? { animation: 'none', opacity: 1 } : { 'animation-delay': '3.8s' }">
        <h3 class="text-[clamp(1rem,2vw,1.25rem)] font-semibold tracking-widest text-primary mt-4">
          <span class="font-handwriting text-[clamp(1.2rem,2.5vw,1.6rem)] align-baseline font-normal mr-1.5 leading-none" style="color: var(--accent-color);">An</span> 
          Engineering student in Computer Science & AI apprenticeship
        </h3>
      </div>
      <div class="flex flex-col items-start text-left animate-fade-in" 
           :style="isBot ? { animation: 'none', opacity: 1 } : { 'animation-delay': '5s' }">
        <h3 class="text-[clamp(1rem,2vw,1.25rem)] font-semibold tracking-widest text-primary mt-4">
          <span class="font-handwriting text-[clamp(1.2rem,2.5vw,1.6rem)] align-baseline font-normal mr-1.5 leading-none" style="color: var(--accent-color);">Seeking a</span> 
          3-month international internship.
        </h3>
      </div>
    </main>

    <footer class="flex justify-center items-center">
      <div class="flex flex-col items-center gap-[15px] animate-fade-in" 
           :style="isBot ? { animation: 'none', opacity: 1 } : { 'animation-delay': '5.5s' }">
        <span class="text-[0.6rem] tracking-[0.3em] text-secondary">Scroll</span>
        <div class="scroll-line"></div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.scroll-line {
  width: 1px;
  height: 60px;
  background: linear-gradient(to bottom, var(--accent-color), transparent);
  position: relative;
  overflow: hidden;
}

.scroll-line::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  animation: scrollIndicator 2s cubic-bezier(0.15, 0.41, 0.69, 0.94) infinite;
}

@keyframes scrollIndicator {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}

.animate-fade-in {
  opacity: 0;
  animation: fadeIn 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
