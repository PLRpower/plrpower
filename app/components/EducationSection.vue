<template>
  <section id="education" class="relative mt-32 md:mt-48 px-6 md:px-10 overflow-hidden">
    <!-- Giant background number -->
    <div class="absolute -top-8 md:-top-12 -left-4 md:left-10 font-display text-[20vw] md:text-[15vw] font-extrabold leading-none text-white/[0.015] select-none pointer-events-none z-0" aria-hidden="true">
      04
    </div>

    <div class="max-w-[1200px] mx-auto relative z-10">
      <!-- Section Header -->
      <div class="mb-16">
        <div class="mb-6">
          <span class="font-handwriting text-2xl text-accent/80">Education</span>
        </div>
        <h2 class="font-display text-[clamp(2.2rem,6vw,4.5rem)] font-extrabold leading-[0.95] tracking-tight text-primary">
          <SectionTitleReveal text="Academic Background" />
        </h2>
      </div>

      <!-- Minimalist Layout: 2 Asymmetric Airy Blocks -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        <!-- Primary Block: CESI (8 cols) -->
        <div class="lg:col-span-8 p-8 md:p-12 border border-white/[0.06] bg-white/[0.01] flex flex-col justify-between group hover:border-accent/30 transition-all duration-500 relative overflow-hidden edu-item">
          <!-- Subtle ambient glow on hover -->
          <div class="absolute -top-24 -right-24 w-80 h-80 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors duration-700 pointer-events-none"></div>

          <div>
            <div class="flex items-center justify-between gap-4 mb-6">
              <span class="font-mono text-xs text-accent tracking-widest uppercase font-semibold">2023 — 2028</span>
              <span class="font-mono text-[0.65rem] text-secondary/50 border border-white/10 px-2.5 py-1 rounded-full">5-Year Master's (BAC+5)</span>
            </div>

            <h3 class="font-display text-2xl md:text-4xl font-bold text-primary mb-3 leading-tight">
              Engineer's Degree in Computer Science
            </h3>
            
            <p class="font-mono text-sm text-secondary/70 mb-6">
              CESI École d'Ingénieurs · Strasbourg, France
            </p>

            <p class="text-sm md:text-base text-secondary/70 leading-relaxed max-w-2xl mb-8">
              Specializing in <span class="text-primary font-medium">Artificial Intelligence & Machine Learning</span>, Embedded Systems, and Distributed Computing. Combined with an ongoing 3-year apprenticeship as a Research Engineer at <span class="text-primary font-medium">LINEACT Lab</span>.
            </p>

            <div class="flex flex-wrap gap-2">
              <span v-for="tag in ['AI & Machine Learning', 'Federated Learning', 'Embedded Systems', 'Distributed Systems']" :key="tag"
                    class="font-mono text-xs text-secondary/80 bg-white/[0.03] px-3 py-1.5 rounded-md border border-white/[0.05]">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>

        <!-- Secondary Block: High School (4 cols) -->
        <div class="lg:col-span-4 p-8 md:p-10 border border-white/[0.04] bg-white/[0.008] flex flex-col justify-between group hover:border-white/[0.1] transition-all duration-500 edu-item">
          <div>
            <div class="flex items-center justify-between gap-4 mb-6">
              <span class="font-mono text-xs text-secondary/50 tracking-widest uppercase">2020 — 2023</span>
              <span class="font-mono text-[0.65rem] text-secondary/40">Conferred</span>
            </div>

            <h3 class="font-display text-xl md:text-2xl font-bold text-primary mb-3 leading-tight">
              French Baccalauréat
            </h3>
            
            <p class="font-mono text-sm text-secondary/60 mb-6">
              Lycée Marie Curie · Strasbourg
            </p>

            <p class="text-sm text-secondary/60 leading-relaxed">
              Specialized in <span class="text-primary/90">Academic Mathematics</span> and <span class="text-primary/90">Computer Science (NSI)</span>. Foundation in algorithms and programming.
            </p>
          </div>

          <div class="mt-8 pt-6 border-t border-white/[0.04] flex flex-wrap gap-2">
            <span class="font-mono text-xs text-secondary/60 bg-white/[0.02] px-2.5 py-1 rounded-md border border-white/[0.04]">Mathematics</span>
            <span class="font-mono text-xs text-secondary/60 bg-white/[0.02] px-2.5 py-1 rounded-md border border-white/[0.04]">Computer Science</span>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(async () => {
  if (import.meta.client) {
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.batch('.edu-item', {
      onEnter: (elements) => {
        gsap.fromTo(elements, 
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.12 }
        );
      },
      start: 'top 88%',
      once: true
    });
  }
});
</script>

<style scoped>
.edu-item {
  opacity: 0;
  transform: translateY(30px);
}
</style>
