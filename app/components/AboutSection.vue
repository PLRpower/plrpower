<template>
  <section id="about" class="relative mt-32 md:mt-48 px-6 md:px-10 overflow-hidden">
    <!-- Giant background number -->
    <div class="about-big-number absolute -top-8 md:-top-12 -right-4 md:right-10 font-display text-[20vw] md:text-[15vw] font-extrabold leading-none text-white/[0.015] select-none pointer-events-none z-0" aria-hidden="true">
      01
    </div>

    <div class="max-w-[1200px] mx-auto relative z-10">
      <!-- Section label -->
      <div class="mb-6">
        <span class="font-handwriting text-2xl text-accent/80">About</span>
      </div>

      <!-- Section title reveal -->
      <h2 class="font-display text-[clamp(2.2rem,6vw,4.5rem)] font-extrabold leading-[0.95] tracking-tight text-primary mb-16">
        <SectionTitleReveal text="Who I am" />
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
        <!-- Photo column - breaks the grid intentionally -->
        <div class="md:col-span-4 md:col-start-1 md:-mt-8">
          <div class="about-photo relative group">
            <AsciiImage 
              src="/images/other/profile.webp" 
              alt="Paul Thomas" 
              class="w-full aspect-[3/4] object-cover"
              mode="default-photo"
              :resolution="200"
              :contrast="1"
              :brightness="0.80"
              :char-spacing="0.8"
              char-ramp=" .·:;~+=*#%@"
              :group-hover="true"
            />
            <!-- Photo overlay line -->
            <div class="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-accent via-[#14b8a6] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left pointer-events-none"></div>
            <!-- Corner brackets -->
            <div class="absolute top-3 left-3 w-5 h-5 border-t border-l border-accent/30 transition-all duration-500 group-hover:border-accent group-hover:w-7 group-hover:h-7 group-hover:top-2 group-hover:left-2 pointer-events-none"></div>
            <div class="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-accent/30 transition-all duration-500 group-hover:border-accent group-hover:w-7 group-hover:h-7 group-hover:bottom-2 group-hover:right-2 pointer-events-none"></div>
          </div>
          <p class="font-mono text-[0.6rem] text-secondary/30 tracking-[0.2em] mt-3 uppercase">Strasbourg, FR</p>
        </div>

        <!-- Text column -->
        <div class="md:col-span-7 md:col-start-6 md:pt-12">
          <p class="about-text text-[clamp(1rem,2vw,1.2rem)] leading-[2] text-secondary/80">
            I am a Computer Science engineering student at <span class="text-primary font-medium">CESI</span> and an Apprentice Research Engineer at <span class="text-primary font-medium">LINEACT Laboratory</span>. My work centers on distributed machine learning and Edge AI, specifically designing and benchmarking <span class="text-accent font-medium">Federated Learning</span> architectures deployed across physical clusters of resource-constrained devices.
          </p>
          <p class="about-text text-[clamp(1rem,2vw,1.2rem)] leading-[2] text-secondary/80 mt-6">
            I operate at the intersection of mathematical modeling, algorithmic theory, and systems engineering. Whether optimizing low-level firmware in <span class="text-primary font-medium">C/C++</span>, training deep learning models in <span class="text-primary font-medium">PyTorch</span>, or architecting scalable full-stack applications with <span class="text-primary font-medium">TypeScript</span> and <span class="text-primary font-medium">Docker</span>, I prioritize computational efficiency, fault-tolerance, and clean architecture.
          </p>
          <p class="about-text text-[clamp(1rem,2vw,1.2rem)] leading-[2] text-secondary/80 mt-6">
            From winning awards in rapid-prototyping hackathons to tackling complex combinatorial optimization problems, I thrive on transforming abstract research into robust, real-world systems. I am currently seeking a <span class="text-accent font-medium">3 to 4-month international research or engineering internship starting June–July 2027</span> to collaborate on cutting-edge challenges in AI, autonomous systems, and distributed computing.
          </p>

          <!-- Quick stats -->
          <div class="flex gap-12 mt-12 pt-8 border-t border-white/[0.04]">
            <div v-for="stat in aboutStats" :key="stat.label" class="flex flex-col">
              <span class="font-display text-3xl font-bold text-primary">{{ stat.value }}</span>
              <span class="font-mono text-[0.6rem] text-secondary/40 tracking-[0.15em] uppercase mt-1">{{ stat.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';

const aboutStats = [
  { value: '3 Yrs', label: 'R&D Lab Exp.' },
  { value: '15+', label: 'Projects Built' },
  { value: '4', label: 'Awards & Certs' },
];

let triggers: any[] = [];

onMounted(async () => {
  if (import.meta.client) {
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    triggers = ScrollTrigger.batch('.about-text', {
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

onBeforeUnmount(() => {
  triggers.forEach(t => t.kill());
});
</script>

<style scoped>
.about-text {
  opacity: 0;
  transform: translateY(30px);
}
</style>
