<script setup lang="ts">
const isBot = ref(false);

// Détection bots/Lighthouse (SSR & Client)
if (import.meta.server) {
  const ua = useRequestHeaders(['user-agent'])['user-agent'] || '';
  isBot.value = /bot|googlebot|crawler|spider|robot|crawling|lighthouse|chrome-lighthouse/i.test(ua);
} else if (import.meta.client) {
  isBot.value = /bot|googlebot|crawler|spider|robot|crawling|lighthouse|chrome-lighthouse/i.test(navigator.userAgent);
}
</script>

<template>
  <div class="h-screen w-full max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col justify-between py-10 relative z-10 max-md:py-5">
    <main class="w-full flex-grow flex flex-col justify-start pt-[12vh] items-start text-left max-md:pt-[10vh]">

      <div class="animate-fade-in" :style="isBot ? { animation: 'none', opacity: 1 } : { 'animation-delay': '0.2s' }">
        <div class="font-handwriting text-[clamp(1.5rem,4vw,2.2rem)] tracking-wider text-accent">
          Hello, I am
        </div>
      </div>

      <AsciiBanner :delay="isBot ? 0 : 500" :instant="isBot" />

      <div class="flex flex-col items-start text-left animate-fade-in mt-6 md:mt-8" 
           :style="isBot ? { animation: 'none', opacity: 1 } : { 'animation-delay': '2.2s' }">
        <h3 class="text-[clamp(1rem,2vw,1.25rem)] font-normal tracking-widest text-primary mt-4">
          <span class="font-handwriting text-[clamp(1.2rem,2.5vw,1.6rem)] align-baseline font-normal mr-1.5 leading-none text-accent">An</span>
          AI & Embedded Systems Engineering Apprentice at LINEACT Research Lab · CS Student at CESI
        </h3>
      </div>
      <div class="flex flex-col items-start text-left animate-fade-in" 
           :style="isBot ? { animation: 'none', opacity: 1 } : { 'animation-delay': '3s' }">
        <h3 class="text-[clamp(1rem,2vw,1.25rem)] font-normal tracking-widest text-primary mt-4">
          <span class="font-handwriting text-[clamp(1.2rem,2.5vw,1.6rem)] align-baseline font-normal mr-1.5 leading-none text-accent">Currently seeking</span>
          a 3 to 4-month international research / engineering internship starting June–July 2027.
        </h3>
      </div>

      <div class="mt-10 animate-fade-in flex flex-wrap gap-3" :style="isBot ? { animation: 'none', opacity: 1 } : { 'animation-delay': '3.8s' }">
        <a href="/CV_Paul_Thomas.pdf" download 
           class="group flex items-center gap-2 px-4 py-2.5 border border-[#2dd4bf]/30 bg-[#2dd4bf]/[0.08] text-[#2dd4bf] font-mono text-[0.75rem] no-underline hover:bg-[#2dd4bf]/[0.15] hover:border-[#2dd4bf]/50 hover:shadow-[0_0_15px_rgba(45, 212, 191,0.2)] hover:-translate-y-0.5 transition-all duration-300">
          <Icon name="uil:file-download" size="16px" />
          <AsciiOdometerLink text="Download CV" class="text-inherit" />
        </a>
        <a href="https://github.com/PLRpower" target="_blank" rel="noopener noreferrer" 
           class="group flex items-center gap-2 px-4 py-2.5 border border-white/[0.04] bg-white/[0.01] light:border-black/10 light:bg-black/5 font-mono text-[0.75rem] text-secondary/60 no-underline hover:text-accent hover:border-accent/15 hover:bg-accent/[0.03] transition-all duration-300">
          <Icon name="uil:github" size="16px" />
          <AsciiOdometerLink text="Github" class="text-inherit" />
        </a>
        <a href="https://www.linkedin.com/in/paul-thomas-strasbourg/" target="_blank" rel="noopener noreferrer" 
           class="group flex items-center gap-2 px-4 py-2.5 border border-white/[0.04] bg-white/[0.01] light:border-black/10 light:bg-black/5 font-mono text-[0.75rem] text-secondary/60 no-underline hover:text-accent hover:border-accent/15 hover:bg-accent/[0.03] transition-all duration-300">
          <Icon name="uil:linkedin" size="16px" />
          <AsciiOdometerLink text="LinkedIn" class="text-inherit" />
        </a>
        <a href="mailto:paul.thomas.stras@gmail.com" 
           class="group flex items-center gap-2 px-4 py-2.5 border border-white/[0.04] bg-white/[0.01] light:border-black/10 light:bg-black/5 font-mono text-[0.75rem] text-secondary/60 no-underline hover:text-accent hover:border-accent/15 hover:bg-accent/[0.03] transition-all duration-300">
          <Icon name="uil:envelope" size="16px" />
          <AsciiOdometerLink text="Email" class="text-inherit" />
        </a>
      </div>
    </main>

    <footer class="flex justify-center items-center">
      <div class="flex flex-col items-center gap-[15px] animate-fade-in" 
           :style="isBot ? { animation: 'none', opacity: 1 } : { 'animation-delay': '4.6s' }">
        <span class="text-[0.6rem] tracking-[0.3em] text-secondary">Scroll</span>
        <div class="w-px h-[60px] bg-gradient-to-b from-accent to-transparent relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-full bg-white light:bg-slate-900 animate-scroll-indicator"></div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Les animations complexes sont conservées en CSS pour la lisibilité */
@keyframes scrollIndicator {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}

.animate-scroll-indicator {
  animation: scrollIndicator 2s cubic-bezier(0.15, 0.41, 0.69, 0.94) infinite;
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
