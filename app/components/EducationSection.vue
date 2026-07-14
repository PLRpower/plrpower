<template>
  <section id="education" class="relative mt-48 md:mt-64 px-6 md:px-10 overflow-hidden">
    <div class="absolute -top-16 -left-4 md:left-10 font-display text-[20vw] md:text-[15vw] font-extrabold leading-none text-white/[0.015] light:text-black/[0.015] select-none pointer-events-none z-0" aria-hidden="true">
      04
    </div>

    <div class="max-w-[1200px] mx-auto relative z-10">
      <div class="md:flex items-start gap-12 lg:gap-16 relative">
        <!-- Left: Sticky column -->
        <div class="md:w-5/12 md:sticky md:top-32 mb-16 md:mb-0">
          <div class="flex items-center gap-4 mb-6">
            <span class="font-handwriting text-2xl text-accent/80">Education</span>
            <div class="w-12 h-px bg-accent/20"></div>
          </div>
          <h2 class="font-display text-[clamp(2.2rem,6vw,4.5rem)] font-extrabold leading-[0.95] tracking-tight text-primary">
            <SectionTitleReveal text="Background" />
          </h2>
          
          <!-- Abstract decorative element -->
          <div class="mt-16 opacity-30 group hidden md:block">
            <div class="w-48 h-48 rounded-full border border-accent/20 relative flex items-center justify-center">
              <div class="w-32 h-32 rounded-full border-t border-b border-accent/40 animate-[spin_10s_linear_infinite]"></div>
              <div class="w-16 h-16 rounded-full bg-accent/10 absolute flex items-center justify-center">
                <div class="w-2 h-2 rounded-full bg-accent"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Scrollable column -->
        <div class="md:w-7/12 flex flex-col gap-6">
          <div v-for="(edu, idx) in educationData" :key="idx" 
               class="edu-card relative p-6 md:p-8 lg:p-12 border border-white/[0.03] light:border-black/[0.03] bg-white/[0.01] light:bg-black/[0.01] group hover:bg-white/[0.02] light:bg-black/[0.02] hover:border-white/[0.06] light:border-black/[0.06] transition-all duration-500 overflow-hidden">
            <span class="font-display text-[3.5rem] font-extrabold text-white/[0.02] light:text-black/[0.02] absolute top-4 right-6 group-hover:text-accent/[0.06] transition-colors duration-700 select-none">{{ edu.period.split(' – ')[1] || edu.period }}</span>
            <div class="relative z-10">
              <span class="font-mono text-[0.65rem] tracking-[0.3em] uppercase text-accent mb-4 block">{{ edu.period }}</span>
              <h3 class="font-display text-lg sm:text-xl lg:text-2xl font-bold text-primary mb-3 leading-tight truncate tracking-tight" :title="edu.title">{{ edu.title }}</h3>
              <p class="font-mono text-[0.85rem] text-secondary/60 mb-4">{{ edu.school }}</p>
              <p v-if="edu.details" class="text-[0.9rem] text-secondary/50 leading-relaxed">{{ edu.details }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

const educationData = [
  {
    title: "Engineer's Degree — Computer Science",
    school: 'CESI École d\'Ingénieurs',
    period: '2023 – 2028',
    details: 'Specializing in AI & Machine Learning, Embedded Systems, and Application Development through an apprenticeship program.'
  },
  {
    title: 'French Baccalauréat (High School Diploma)',
    school: 'Lycée Marie Curie',
    period: '2020 – 2023',
    details: 'Specializations: Academic Mathematics and Advanced Computer Science'
  }
];

onMounted(async () => {
  if (import.meta.client) {
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.batch('.edu-card', {
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
.edu-card {
  opacity: 0;
  transform: translateY(30px);
}
</style>
