<template>
  <section id="skills" class="relative mt-48 md:mt-64 px-6 md:px-10 overflow-hidden">
    <div class="absolute -top-8 md:-top-12 -right-4 md:right-10 font-display text-[20vw] md:text-[15vw] font-extrabold leading-none text-white/[0.015] select-none pointer-events-none z-0" aria-hidden="true">
      05
    </div>

    <div class="max-w-[1200px] mx-auto relative z-10">
      <div class="mb-6">
        <span class="font-handwriting text-2xl text-accent/80">Skills</span>
      </div>
      <h2 class="font-display text-[clamp(2.2rem,6vw,4.5rem)] font-extrabold leading-[0.95] tracking-tight text-primary mb-16">
        <SectionTitleReveal text="Tech stack" />
      </h2>

      <!-- Interactive Bento Grid -->
      <div class="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 auto-rows-[250px] skill-card">
        
        <!-- Box 1: Large Cyan (AI & Data) -->
        <div class="relative p-8 border border-[#2dd4bf]/20 bg-[#2dd4bf]/[0.03] group overflow-hidden md:col-span-2 md:row-span-2 flex flex-col justify-end">
          <!-- Dramatic Glow -->
          <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 blur-[100px] rounded-full group-hover:bg-accent/20 transition-colors duration-700 pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
          
          <div class="relative z-10">
            <span class="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-accent mb-4 block font-semibold">Core Expertise</span>
            <h3 class="font-display text-4xl md:text-5xl font-bold text-primary leading-tight mb-6 group-hover:text-accent transition-colors duration-500">AI / ML & Distributed Intelligence</h3>
            <ul class="flex flex-wrap gap-2.5">
              <li v-for="skill in ['PyTorch', 'TensorFlow', 'Federated Learning', 'Computer Vision (OpenCV)', 'TinyML & Edge AI', 'Scikit-Learn', 'Transformers / LLMs', 'NumPy / Pandas', 'Data Analysis & Metrics']" :key="skill" class="px-4 py-2 bg-[#050505]/60 backdrop-blur-md rounded-lg border border-white/5 text-[0.8rem] text-secondary/90 shadow-lg">{{ skill }}</li>
            </ul>
          </div>
        </div>

        <!-- Box 2: Medium (Systems & Embedded) -->
        <div class="relative p-6 border border-white/[0.04] bg-[#0a0a0a] group hover:bg-[#0f0f0f] transition-all duration-500 overflow-hidden md:col-span-2 md:row-span-1 cursor-pointer" @click="ledOn = !ledOn">
          <!-- Circuit pattern background -->
          <div class="absolute inset-0 opacity-[0.15] transition-opacity duration-300" :class="ledOn ? 'opacity-[0.25]' : ''" style="background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0); background-size: 24px 24px;"></div>
          
          <div class="relative z-10 flex flex-col h-full justify-between">
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-secondary/50 block">Proficient In</span>
                <!-- Virtual LED -->
                <div class="flex items-center gap-2">
                  <div class="w-3.5 h-3.5 rounded-full border shadow-inner transition-all duration-300" :class="ledOn ? 'bg-[#2dd4bf] border-[#2dd4bf] shadow-[0_0_15px_rgba(45,212,191,0.8)]' : 'bg-[#1a1a1a] border-white/20'"></div>
                </div>
              </div>
              <h3 class="font-display text-2xl font-bold text-primary mb-4 group-hover:text-white transition-colors duration-300" :class="ledOn ? 'text-white' : ''">Systems & Embedded</h3>
            </div>
            <div class="flex flex-wrap gap-2">
              <span v-for="skill in ['C / C++', 'ROS / ROS2', 'ESP32', 'Arduino', 'Linux IPC & Kernel', 'RTOS', 'Sensor Fusion & Telemetry']" :key="skill" class="font-mono text-[0.75rem] text-secondary/70 bg-white/[0.03] px-3 py-1.5 rounded-md border border-white/[0.05]">{{ skill }}</span>
            </div>
          </div>
        </div>

        <!-- Box 3: Small (Full-Stack & Software) -->
        <div class="relative p-6 border border-white/[0.04] bg-white/[0.015] group hover:bg-white/[0.03] transition-all duration-500 overflow-hidden md:col-span-1 md:row-span-1 flex flex-col justify-between">
          <div>
            <span class="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-secondary/50 mb-3 block">Applied Skills</span>
            <h3 class="font-display text-xl font-bold text-primary mb-3 group-hover:text-white transition-colors duration-300">Software & Web</h3>
            <p class="font-mono text-[0.7rem] text-secondary/50 leading-relaxed">TypeScript · Node.js · Nuxt<br>React · Python / FastAPI<br>PostgreSQL · REST & GraphQL</p>
          </div>
          <div class="font-mono text-[0.65rem] text-secondary/40 tracking-wider">FULL-STACK & APIS</div>
        </div>

        <!-- Box 4: Small (DevOps & Tools) -->
        <div class="relative border border-white/[0.04] bg-[#050505] overflow-hidden md:col-span-1 md:row-span-1 flex flex-col group hover:bg-[#0a0a0a] transition-colors duration-500 rounded-lg">
          <!-- Terminal Header -->
          <div class="flex gap-2 px-4 py-3 border-b border-white/[0.05] bg-[#0a0a0a]">
            <div class="w-2.5 h-2.5 rounded-full bg-red-500/50 group-hover:bg-red-500 transition-colors duration-300"></div>
            <div class="w-2.5 h-2.5 rounded-full bg-yellow-500/50 group-hover:bg-yellow-500 transition-colors duration-300"></div>
            <div class="w-2.5 h-2.5 rounded-full bg-green-500/50 group-hover:bg-green-400 transition-colors duration-300"></div>
          </div>
          <!-- Terminal Body -->
          <div class="p-5 h-full flex flex-col justify-center">
            <h3 class="font-display text-lg font-bold text-primary mb-3">DevOps & Research</h3>
            <ul class="flex flex-col gap-2">
              <li v-for="skill in ['Docker & Swarm', 'Git / CI/CD', 'Linux Admin', 'Jupyter Lab']" :key="skill" class="flex items-center gap-3">
                <span class="text-accent font-mono text-[0.7rem]">></span>
                <span class="font-mono text-[0.8rem] text-secondary/80">{{ skill }}</span>
              </li>
            </ul>
            <!-- Blinking cursor -->
            <div class="mt-4 flex items-center">
              <span class="w-2 h-3.5 bg-accent/60 animate-pulse inline-block"></span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const ledOn = ref(false);

onMounted(async () => {
  if (import.meta.client) {
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.batch('.skill-card', {
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
.skill-card {
  opacity: 0;
  transform: translateY(30px);
}
</style>
