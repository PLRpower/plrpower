<template>
  <section id="awards" class="relative mt-48 md:mt-64 px-6 md:px-10 overflow-hidden" @mousemove="updateHoverPos">
    <div class="absolute -top-8 md:-top-12 -left-4 md:left-10 font-display text-[20vw] md:text-[15vw] font-extrabold leading-none text-white/[0.015] light:text-black/[0.015] select-none pointer-events-none z-0" aria-hidden="true">
      06
    </div>

    <div class="max-w-[1200px] mx-auto relative z-10">
      <div class="mb-6">
        <span class="font-handwriting text-2xl text-accent/80">Awards and Certifications</span>
      </div>
      <h2 class="font-display text-[clamp(2.2rem,6vw,4.5rem)] font-extrabold leading-[0.95] tracking-tight text-primary mb-16">
        <SectionTitleReveal text="Recognition" />
      </h2>

      <!-- Typography List -->
      <div class="flex flex-col border-t border-white/[0.05] light:border-black/[0.05] award-item">
        <div v-for="award in awardsData" :key="award.title" 
             class="group relative py-6 md:py-8 border-b border-white/[0.05] light:border-black/[0.05] flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-default transition-colors duration-500 hover:bg-white/[0.02] light:hover:bg-black/[0.02] px-4 -mx-4"
             @mouseenter="activeAward = award; isHoveringAward = true"
             @mouseleave="isHoveringAward = false">
          
          <div class="flex items-center gap-4 md:gap-12 w-full">
            <!-- Icon visible on mobile, hidden on desktop (desktop uses hover popup) -->
            <div class="md:hidden w-12 h-12 shrink-0 bg-white/[0.03] light:bg-black/[0.03] flex items-center justify-center border border-white/[0.05] light:border-black/[0.05]">
              <NuxtImg :src="award.icon" class="w-7 h-7 object-contain" />
            </div>
            <div class="flex flex-col md:flex-row md:items-center gap-2 md:gap-12 flex-1">
              <span class="font-mono text-[0.7rem] text-accent/50 tracking-[0.2em] uppercase md:w-24 shrink-0">{{ award.date.includes('&') ? award.date : (award.date.split(' ')[1] || award.date) }}</span>
              <h3 class="font-display text-xl md:text-3xl font-extrabold text-primary/80 group-hover:text-accent transition-colors duration-500">{{ award.title }}</h3>
            </div>
          </div>
          <!-- Subtitle visible on mobile -->
          <p class="md:hidden text-[0.8rem] text-secondary/50 leading-relaxed pl-16">{{ award.subtitle }}</p>
        </div>
      </div>

      <!-- Floating Image Pop-up (Visible only on Desktop hover) -->
      <ClientOnly>
        <Teleport to="body">
          <div v-if="activeAward" 
               ref="awardCursorRef"
               class="fixed pointer-events-none z-50 overflow-hidden border border-white/10 light:border-black/10 bg-[#080808]/95 light:bg-white/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] light:shadow-[0_20px_50px_rgba(0,0,0,0.1)] items-center gap-5 p-5 w-[340px] hidden md:flex"
               :class="isHoveringAward ? 'opacity-100 scale-100' : 'opacity-0 scale-95'"
               :style="{ transition: 'opacity 0.2s, transform 0.2s', transform: 'translate(20px, -50%)' }">
            <div class="w-16 h-16 shrink-0 bg-white/5 light:bg-black/5 flex items-center justify-center border border-white/5 light:border-black/5">
              <NuxtImg :src="activeAward.icon" class="w-10 h-10 object-contain grayscale-[0.2]" />
            </div>
            <div class="flex flex-col gap-1">
              <span class="font-display font-bold text-[0.95rem] text-white light:text-primary leading-tight">{{ activeAward.title }}</span>
              <span class="text-[0.75rem] text-secondary/60 leading-relaxed">{{ activeAward.subtitle }}</span>
              <div class="mt-2 flex items-center gap-2 text-sm text-accent/90 font-mono font-bold">
                Details <Icon name="ph:arrow-up-right-bold" size="18px" />
              </div>
            </div>
          </div>
        </Teleport>
      </ClientOnly>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const isHoveringAward = ref(false);
const activeAward = ref<any>(null);
const awardCursorRef = ref<HTMLElement | null>(null);

const updateHoverPos = (e: MouseEvent) => {
  if (isHoveringAward.value && awardCursorRef.value) {
    awardCursorRef.value.style.left = `${e.clientX}px`;
    awardCursorRef.value.style.top = `${e.clientY}px`;
  }
};

const awardsData = [
  {
    title: '3rd Prize & Special Award — Aquathon 2025',
    date: 'Nov 2025',
    icon: '/images/awards/aquathon.webp',
    subtitle: "Developed 'Hydro Regen', an award-winning eco-innovative mapping project inspired by regenerative hydrology. Won 3rd Place & Jury's Favorite."
  },
  {
    title: 'TOP Scorer — AXA Challenge "Best CS Student in France"',
    date: '2025 & 2026',
    icon: '/images/awards/axa.webp',
    subtitle: 'Ranked among the top performers in a competitive national challenge evaluating Cyber, AI / ML, Software Development, and Cloud.'
  },
  {
    title: 'TOEIC — 875/990',
    date: 'Mar 2025',
    icon: '/images/awards/toeic.webp',
    subtitle: 'Scored 875/990, certifying advanced professional English proficiency.'
  },
  {
    title: 'Pix Certification — 553/768',
    date: 'Mar 2023',
    icon: '/images/awards/pix.webp',
    subtitle: 'Official French certification for digital skills across 5 activity domains.'
  }
];

onMounted(async () => {
  if (import.meta.client) {
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.batch('.award-item', {
      onEnter: (elements) => {
        gsap.fromTo(elements, 
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.08 }
        );
      },
      start: 'top 88%',
      once: true
    });
  }
});
</script>

<style scoped>
.award-item {
  opacity: 0;
  transform: translateY(30px);
}
</style>
