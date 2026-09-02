<template>
  <section id="experience" class="relative mt-32 md:mt-48 px-6 md:px-10 overflow-hidden">
    <!-- Giant background section number -->
    <div class="absolute -top-8 md:-top-12 -right-4 md:right-10 font-display text-[20vw] md:text-[15vw] font-extrabold leading-none text-white/[0.015] select-none pointer-events-none z-0" aria-hidden="true">
      03
    </div>

    <div class="max-w-[1200px] mx-auto relative z-10">
      <!-- Section Header -->
      <div class="mb-16">
        <div class="mb-3">
          <span class="font-handwriting text-2xl text-accent/80">Experience</span>
        </div>
        <h2 class="font-display text-[clamp(1.8rem,3vw,3.6rem)] font-extrabold leading-[0.95] tracking-tight text-primary whitespace-nowrap">
          <SectionTitleReveal text="Where I've been" />
        </h2>
      </div>

      <!-- Split Layout: Left Timeline Selector / Right Experience Detail Card -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start exp-reveal">
        
        <!-- Left: Interactive Timeline Selector (5 cols) -->
        <div class="lg:col-span-5 relative">
          <!-- Timeline Items -->
          <div class="flex flex-col gap-2 relative">
            <!-- Continuous Background Line perfectly centered with dots (x = 29px) -->
            <div class="absolute left-[29px] top-6 bottom-6 w-px bg-white/10 pointer-events-none"></div>

            <div 
              v-for="(exp, idx) in experiencesData" 
              :key="exp.id"
              role="button"
              :tabindex="0"
              @click="activeIdx = idx"
              @keydown.enter="activeIdx = idx"
              @keydown.space.prevent="activeIdx = idx"
              class="group flex items-center gap-3 p-3.5 cursor-pointer select-none transition-all duration-300 text-left relative border"
              :class="[
                activeIdx === idx 
                  ? 'bg-white/[0.03] border-white/[0.06] shadow-sm' 
                  : 'hover:bg-white/[0.015] border-transparent'
              ]"
            >
              <!-- Timeline Node Container (Width 30px, exactly centered on the 29px axis) -->
              <div class="w-[30px] flex items-center justify-center shrink-0 z-10">
                <div 
                  class="w-2.5 h-2.5 rounded-full border transition-all duration-300"
                  :class="[
                    activeIdx === idx 
                      ? 'bg-accent border-accent shadow-[0_0_12px_rgba(45,212,191,0.8)] scale-125' 
                      : 'bg-[#0a0a0a] border-white/20 group-hover:border-accent/50'
                  ]"
                ></div>
              </div>

              <!-- Node Text -->
              <div class="flex flex-col flex-1 min-w-0">
                <div class="flex items-center justify-between gap-2">
                  <span 
                    class="font-mono text-xs transition-colors duration-200"
                    :class="activeIdx === idx ? 'text-accent font-semibold' : 'text-secondary/50 group-hover:text-secondary/80'"
                  >
                    {{ exp.shortYear }}
                  </span>
                  <span 
                    v-if="exp.status"
                    class="font-mono text-[0.6rem] px-2 py-0.5 rounded-full border uppercase tracking-wider transition-all duration-200"
                    :class="[
                      activeIdx === idx
                        ? 'border-accent/30 text-accent bg-accent/10'
                        : 'border-white/5 text-secondary/40'
                    ]"
                  >
                    {{ exp.status }}
                  </span>
                </div>
                
                <span 
                  class="font-display text-sm md:text-base font-bold transition-colors duration-200 mt-0.5 leading-snug truncate"
                  :class="activeIdx === idx ? 'text-primary' : 'text-secondary/70 group-hover:text-primary'"
                >
                  {{ exp.title }}
                </span>
                
                <span class="font-mono text-xs text-secondary/50">
                  {{ exp.company }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Active Experience Detail Card (7 cols - Sticky) -->
        <div class="lg:col-span-7 lg:sticky lg:top-32">
          <Transition
            mode="out-in"
            enter-active-class="transition duration-200 ease"
            enter-from-class="opacity-0 translate-y-2"
            leave-active-class="transition duration-200 ease"
            leave-to-class="opacity-0 -translate-y-2"
          >
            <div 
              v-if="activeExp"
              :key="activeExp.id"
              class="p-8 md:p-12 border border-white/[0.06] bg-[#0c0c0c] relative overflow-hidden shadow-xl"
            >
              <!-- Subtle Ambient Glow -->
              <div class="absolute -top-24 -right-24 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>

              <div>
                <!-- Top Meta -->
                <div class="flex items-center justify-between gap-4 mb-6">
                  <span class="font-mono text-xs text-accent uppercase tracking-widest font-semibold">
                    {{ activeExp.date }}
                  </span>
                  <span class="font-mono text-[0.65rem] text-secondary/60 border border-white/10 px-3 py-1 rounded-full uppercase tracking-wider">
                    {{ activeExp.durationLabel }}
                  </span>
                </div>

                <!-- Title & Company -->
                <h3 class="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-2 leading-tight">
                  {{ activeExp.title }}
                </h3>
                
                <p class="font-mono text-sm text-secondary/70 mb-8">
                  {{ activeExp.company }}
                </p>

                <!-- Description -->
                <p class="text-sm md:text-base text-secondary/80 leading-relaxed mb-6 max-w-xl">
                  {{ activeExp.description }}
                </p>

                <!-- Document Link -->
                <div v-if="activeExp.document" class="mb-8">
                  <a 
                    :href="activeExp.document.url" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2.5 px-4 py-2 border border-accent/30 bg-accent/[0.06] text-accent hover:bg-accent/[0.12] hover:border-accent/60 transition-all duration-300 font-mono text-xs group"
                  >
                    <Icon name="uil:file-alt" size="16px" class="group-hover:scale-110 transition-transform" />
                    <span>{{ activeExp.document.label }}</span>
                    <span class="text-[10px] opacity-75 font-semibold">[PDF]</span>
                    <Icon name="material-symbols:arrow-outward" size="14px" class="opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                </div>
              </div>

              <!-- Tech Badges -->
              <div v-if="activeExp.techs && activeExp.techs.length" class="pt-6 border-t border-white/[0.04]">
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="tech in activeExp.techs" 
                    :key="tech"
                    class="font-mono text-xs text-secondary/90 bg-white/[0.03] px-3 py-1.5 rounded-md border border-white/[0.05]"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </Transition>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const activeIdx = ref(0);

const experiencesData = [
  {
    id: 'lineact-apprentice',
    title: 'Apprentice Research Engineer',
    company: 'LINEACT Laboratory',
    date: 'Oct 2025 – Present',
    shortYear: '2025 — Present',
    durationLabel: '3 years',
    status: 'Apprenticeship',
    description: 'R&D in Artificial Intelligence, Embedded Systems, and Distributed Computing. Designing and evaluating a distributed Federated Learning infrastructure running across physical Raspberry Pi clusters and high-performance aggregation servers.',
    techs: ['Python', 'PyTorch / TF', 'Federated Learning', 'Edge AI', 'MQTT / Sockets', 'Linux IPC', 'Docker Swarm'],
    document: {
      title: 'Mémoire Technique - LINEACT',
      url: '/THOMAS_Paul_Memoire_Technique_LINEACT.pdf',
      label: 'Read Mémoire Technique'
    }
  },
  {
    id: 'lineact-intern',
    title: 'R&D Intern – Federated Learning',
    company: 'LINEACT Laboratory',
    date: 'Apr 2025 – Jun 2025',
    shortYear: '2025',
    durationLabel: '3 months',
    status: 'Internship',
    description: 'Development of a distributed Federated Learning prototype on Raspberry Pi edge nodes. Benchmarked shared AI models, decentralized communication protocols, and client selection strategies under non-IID data distributions.',
    techs: ['Python', 'TensorFlow', 'Edge AI', 'TinyML', 'Linux', 'Socket Communication'],
    document: {
      title: 'Rapport de Stage - LINEACT',
      url: '/THOMAS_Paul_Rapport_de_Stage.pdf',
      label: 'Read Rapport de Stage'
    }
  },
  {
    id: 'studio-osalys',
    title: 'Founder & Full-Stack Developer',
    company: 'Studio Osalys',
    date: 'Jun 2022 – Nov 2024',
    shortYear: '2022 — 2024',
    durationLabel: '2 years',
    status: 'Founder',
    description: 'Founded and ran a custom web application studio. Engineered showcase sites, e-commerce platforms, and SaaS products for businesses and individuals, managing full stack lifecycles from architecture to deployment.',
    techs: ['Vue.js', 'Nuxt', 'React', 'Next.js', 'Laravel', 'PostgreSQL', 'Tailwind']
  },
  {
    id: 'pixacare',
    title: 'Intern — Full-Stack Development',
    company: 'Pixacare',
    date: 'Jul 2021',
    shortYear: '2021',
    durationLabel: '2 weeks',
    status: 'Internship',
    description: 'Immersion within a medtech engineering team building a digital wound monitoring platform for patients and doctors.',
    techs: ['JavaScript', 'REST APIs', 'SQL', 'Git']
  },
  {
    id: 'elixir-health',
    title: 'Intern — Mobile Health App',
    company: 'Elixir Health',
    date: 'Jul 2021',
    shortYear: '2021',
    durationLabel: '2 weeks',
    status: 'Internship',
    description: 'Introduction to agile mobile health application design, startup product workflows, and mobile interface prototyping.',
    techs: ['HTML', 'CSS', 'JavaScript', 'Git']
  },
  {
    id: 'nevermind',
    title: 'Intern — Embedded Systems',
    company: 'neverMind GmbH',
    date: 'Dec 2019',
    shortYear: '2019',
    durationLabel: '1 week',
    status: 'Internship',
    description: 'First professional embedded systems immersion in Germany. Designed and programmed custom microcontroller LED control logic.',
    techs: ['Arduino', 'C/C++', 'Microcontrollers', 'Hardware']
  }
];

const activeExp = computed(() => experiencesData[activeIdx.value] ?? experiencesData[0]!);
let triggers: any[] = [];

onMounted(async () => {
  if (import.meta.client) {
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    triggers = ScrollTrigger.batch('.exp-reveal', {
      onEnter: (elements) => {
        gsap.fromTo(elements, 
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
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
.exp-reveal {
  opacity: 0;
  transform: translateY(25px);
}
</style>


