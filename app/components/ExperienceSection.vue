<template>
  <section id="experience" class="relative mt-48 md:mt-64 px-6 md:px-10 overflow-hidden">
    <div class="absolute -top-16 -right-4 md:right-10 font-display text-[20vw] md:text-[15vw] font-extrabold leading-none text-white/[0.015] light:text-black/[0.015] select-none pointer-events-none z-0" aria-hidden="true">
      03
    </div>

    <div class="max-w-[1200px] mx-auto relative z-10">
      <div class="flex items-center gap-4 mb-6">
        <span class="font-handwriting text-2xl text-accent/80">Experience</span>
        <div class="w-12 h-px bg-accent/20"></div>
      </div>
      <h2 class="font-display text-[clamp(2.2rem,6vw,4.5rem)] font-extrabold leading-[0.95] tracking-tight text-primary mb-16">
        <SectionTitleReveal text="Where I've been" />
      </h2>

      <div class="relative py-10">
        <!-- Timeline line -->
        <div class="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-accent opacity-40 md:-translate-x-1/2"></div>
        
        <div class="flex flex-col gap-12 md:gap-0 relative z-10">
          <div v-for="(exp, idx) in experiencesData" :key="idx"
               class="exp-card relative w-full md:w-[calc(50%-3rem)] flex flex-col"
               :class="[
                 idx % 2 !== 0 ? 'md:self-start md:text-right md:items-end' : 'md:self-end md:text-left md:items-start',
                 idx > 0 ? 'md:-mt-10 lg:-mt-16' : ''
               ]">
            
            <!-- Timeline node -->
            <div class="absolute left-[-1.3rem] top-1/2 w-3 h-3 rounded-full bg-primary border-2 border-accent transform -translate-y-1/2 z-10 shadow-[0_0_10px_rgba(45,212,191,0.5)]"
                 :class="idx % 2 !== 0 ? 'md:left-auto md:-right-[3.35rem]' : 'md:right-auto md:-left-[3.35rem]'"></div>
            
            <!-- Content -->
            <div class="pl-8 md:pl-0 w-full group">
              <div class="flex flex-col gap-2 p-6 md:p-8 border border-white/[0.03] light:border-black/[0.03] bg-white/[0.01] light:bg-black/[0.01] transition-all duration-500 hover:bg-white/[0.03] light:bg-black/[0.03] hover:border-accent/30 relative">
                <!-- Subtle glow on hover -->
                <div class="absolute inset-0 bg-gradient-to-br from-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                
                <div class="flex flex-col gap-1">
                  <span class="font-mono text-[0.7rem] text-accent tracking-wider">{{ exp.date }} <span class="text-accent/70 ml-2">({{ exp.durationLabel }})</span></span>
                  <h3 class="font-title text-lg font-bold text-primary leading-tight mt-1 mb-2">{{ exp.title }}</h3>
                </div>
                
                <p class="text-sm leading-[1.8] text-secondary/70 mt-2" :class="idx % 2 !== 0 ? 'md:text-right' : 'md:text-left'" v-html="exp.description"></p>
                
                <!-- Tech badges -->
                <div v-if="exp.techs && exp.techs.length" class="flex flex-wrap gap-2 mt-4" :class="idx % 2 !== 0 ? 'md:justify-end justify-start' : 'justify-start'">
                  <span v-for="tech in exp.techs" :key="tech" class="font-mono text-[0.7rem] text-secondary/80 bg-white/[0.03] light:bg-black/[0.03] px-2.5 py-1 rounded-md border border-white/[0.05] light:border-black/[0.05] transition-colors duration-300 hover:bg-white/[0.06] light:bg-black/[0.06] hover:text-primary">{{ tech }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

const experiencesData = [
  {
    title: 'Apprentice Research Engineer — LINEACT Lab',
    date: 'Oct 2025 – Oct 2028',
    durationLabel: '3 years',
    description: 'R&D in Artificial Intelligence, Embedded Systems and Web Technologies. Designing and developing a Federated Learning infrastructure using Raspberry Pi clusters and a central server.',
    techs: ['Python', 'TensorFlow', 'Keras', 'MQTT', 'Linux', 'Docker', 'Docker Swarm']
  },
  {
    title: 'R&D Intern – Federated Learning — LINEACT Lab',
    date: 'Apr 2025 – Jun 2025',
    durationLabel: '3 months',
    description: 'Development of a distributed Federated Learning infrastructure using Raspberry Pi and a central server. Built a shared AI / ML model, implemented communication protocols, optimized performance and client selection algorithms.'
  },
  {
    title: 'Founder & Full-Stack Developer — Studio Osalys',
    date: 'Jun 2022 – Nov 2024',
    durationLabel: '2 years',
    description: 'Built custom web applications (showcase sites, e-commerce, SaaS, mobile) for businesses and individuals. Full-stack development, client management and deployment.',
    techs: ['Vue.js', 'Nuxt', 'React', 'Next', 'Laravel', 'SQL']
  },
  {
    title: 'Job Shadowing — Full-Stack Development — Pixacare',
    date: 'Jul 2021',
    durationLabel: '2 weeks',
    description: 'Observed and assisted in the development of a medical monitoring platform for patients and doctors.',
    techs: ['JS', 'REST API', 'SQL', 'Git']
  },
  {
    title: 'Observation Intern — Elixir Health',
    date: 'Jul 2021',
    durationLabel: '2 weeks',
    description: 'Introduction to mobile health app development and startup workflows.',
    techs: ['HTML', 'CSS', 'JS', 'Git']
  },
  {
    title: 'Embedded Systems Discovery — neverMind GmbH',
    date: 'Dec 2019',
    durationLabel: '1 week',
    description: 'First professional immersion in embedded development in Germany. Designed and built a controllable LED system using Arduino.',
    techs: ['Arduino', 'C/C++', 'Microcontrollers']
  }
];

onMounted(async () => {
  if (import.meta.client) {
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.batch('.exp-card', {
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
.exp-card {
  opacity: 0;
  transform: translateY(30px);
}
.exp-card.is-active > div:first-child {
  border-color: rgba(45, 212, 191, 0.12);
  background: rgba(45, 212, 191, 0.015);
}
</style>
