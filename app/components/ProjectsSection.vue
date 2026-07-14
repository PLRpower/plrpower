<template>
  <section id="projects" class="relative mt-48 md:mt-64" @mousemove="updateHoverPos">
    <div class="overflow-hidden relative">
      <div ref="projectsSectionRef" class="relative pt-24 pb-12">
        <!-- Giant background number -->
        <div class="absolute -top-10 -left-4 md:left-10 font-display text-[20vw] md:text-[15vw] font-extrabold leading-none text-white/[0.02] light:text-black/[0.02] select-none pointer-events-none z-0" aria-hidden="true">
          02
        </div>

        <div class="px-6 md:px-10 mb-12 relative z-10">
          <div class="max-w-[1200px] mx-auto">
            <div class="flex items-center gap-4 mb-6">
              <span class="font-handwriting text-2xl text-accent/80">Projects</span>
              <div class="w-12 h-px bg-accent/20"></div>
            </div>
            <h2 class="font-display text-[clamp(2.2rem,6vw,4.5rem)] font-extrabold leading-[0.95] tracking-tight text-primary">
              <SectionTitleReveal text="Selected work" />
            </h2>
          </div>
        </div>

        <!-- Horizontal scroll wrapper -->
        <div ref="horizontalRef" class="projects-horizontal-wrapper">
          <div ref="horizontalTrackRef" class="projects-track flex items-stretch gap-0">
            <NuxtLink 
              v-for="(project, idx) in projectsData" 
              :key="project.id"
              :to="'/projects/' + project.id"
              class="project-panel flex-shrink-0 w-[85vw] md:w-[55vw] lg:w-[45vw] h-[55vh] relative flex flex-col justify-end p-8 md:p-12 group block no-underline"
              @mouseenter="isHoveringProject = true"
              @mouseleave="isHoveringProject = false"
            >
              <!-- Giant Full-bleed Background -->
              <div class="absolute inset-0 z-0 overflow-hidden bg-[#030303] light:bg-[#f8fafc]">
                <NuxtImg 
                  v-if="project.image"
                  :src="project.image" 
                  :alt="project.title" 
                  class="w-full h-full object-cover opacity-40 transition-transform duration-1000 group-hover:scale-105" 
                  format="webp" 
                  loading="lazy"
                  :sizes="idx % 2 === 0 ? 'sm:90vw md:65vw' : 'sm:90vw md:45vw'"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-[#030303] light:from-[#f8fafc] via-[#030303]/50 light:via-[#f8fafc]/50 to-transparent"></div>
                <div class="absolute inset-0 bg-gradient-to-r from-[#030303]/80 light:from-[#f8fafc]/80 via-transparent to-[#030303]/30 light:to-[#f8fafc]/30"></div>
              </div>

              <!-- Project number -->
              <span class="absolute top-8 right-10 font-display text-[6rem] md:text-[8rem] font-extrabold leading-none text-white/[0.03] light:text-black/[0.03] group-hover:text-white/[0.06] light:text-black/[0.06] transition-colors duration-700 select-none z-10">
                {{ String(idx + 1).padStart(2, '0') }}
              </span>

              <!-- Content overlay -->
              <div class="relative z-10 max-w-2xl transition-transform duration-500 group-hover:translate-x-4">
                <h3 class="font-display text-2xl md:text-4xl font-bold text-primary mb-4 leading-tight">{{ project.title }}</h3>
                <p class="font-mono text-[0.75rem] text-accent tracking-wider mb-6">{{ project.tech }}</p>
                <p class="text-base text-secondary/80 leading-relaxed max-w-[500px]">{{ project.description }}</p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Floating Explore Text for Projects (Visible only on Desktop hover) -->
    <ClientOnly>
      <Teleport to="body">
        <div ref="exploreCursorRef" class="fixed pointer-events-none z-[100] flex items-center gap-2 mix-blend-difference hidden md:flex"
             :class="isHoveringProject ? 'opacity-100' : 'opacity-0'"
             :style="{ transition: 'opacity 0.2s', transform: 'translate(24px, -50%) scale(' + (isHoveringProject ? 1 : 0.8) + ')' }">
          <span class="font-display font-bold text-xl md:text-2xl text-white light:text-primary uppercase tracking-wider">Explore</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="text-white light:text-primary">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </div>
      </Teleport>
    </ClientOnly>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';

const horizontalRef = ref<HTMLElement | null>(null);
const horizontalTrackRef = ref<HTMLElement | null>(null);
const projectsSectionRef = ref<HTMLElement | null>(null);

const isHoveringProject = ref(false);
const exploreCursorRef = ref<HTMLElement | null>(null);

const updateHoverPos = (e: MouseEvent) => {
  if (isHoveringProject.value && exploreCursorRef.value) {
    exploreCursorRef.value.style.left = `${e.clientX}px`;
    exploreCursorRef.value.style.top = `${e.clientY}px`;
  }
};

const projectsData = [
  {
    id: 'federated-learning',
    title: 'Federated Learning — Lab',
    label: 'Research & ML',
    tech: 'Distributed ML · Python · TensorFlow',
    description: 'Researched and implemented Federated Learning models within a professional R&D environment at LINEACT Research Laboratory.',
    image: '/images/projects/federated-learning.webp'
  },
  {
    id: 'minecraft-server',
    title: 'Minecraft Server — Exolia',
    label: 'Server Architecture',
    tech: 'Java · Architecture · Team Management',
    description: 'Architected and managed a Minecraft server reaching 500+ registered players, focusing on custom mod/plugin development and team coordination.',
  },
  {
    id: 'chess-engine',
    title: 'Chess Engine',
    label: 'AI / ML & Algorithms',
    tech: 'C / C++ · Algorithms · AI / ML',
    description: 'Built a chess engine from scratch, implementing move generation, game tree search and evaluation functions.',
  },
  {
    id: 'chess-clock',
    title: 'Chess Clock — ESP32',
    label: 'Embedded Systems',
    tech: 'C · Systems · ESP32',
    description: 'Designed and programmed a chess clock on ESP32 microcontroller, illustrating concrete hardware expertise.',
  },
  {
    id: 'conway-game-of-life',
    title: "Conway's Game of Life",
    label: 'Simulation',
    tech: 'C++ · Simulation · OOP',
    description: "Full implementation of Conway's Game of Life with custom rendering and optimized object-oriented design.",
  },
  {
    id: 'a-la-carte',
    title: 'A la carte',
    label: 'Mobile App',
    tech: 'Vue/Nuxt · Mobile Dev · SQL',
    description: 'Mobile application for storing recipes easily and simplifying daily kitchen management.',
  }
];

let scrollTriggerInstance: any = null;
let horizontalWheelHandler: ((e: WheelEvent) => void) | null = null;

onMounted(async () => {
  await nextTick();
  if (import.meta.client && projectsSectionRef.value && horizontalRef.value && horizontalTrackRef.value) {
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    const track = horizontalTrackRef.value;
    const getTotalScrollWidth = () => track.scrollWidth - window.innerWidth;

    scrollTriggerInstance = gsap.to(track, {
      x: () => -getTotalScrollWidth(),
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: projectsSectionRef.value,
        pin: projectsSectionRef.value,
        start: 'top 40px',
        scrub: 1.2,
        end: () => `+=${getTotalScrollWidth()}`,
        invalidateOnRefresh: true,
        fastScrollEnd: true,
        preventOverlaps: true,
      }
    });

    horizontalWheelHandler = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        window.scrollBy({ top: e.deltaX, behavior: 'auto' });
      }
    };
    projectsSectionRef.value.addEventListener('wheel', horizontalWheelHandler, { passive: false });
  }
});

onBeforeUnmount(() => {
  if (projectsSectionRef.value && horizontalWheelHandler) {
    projectsSectionRef.value.removeEventListener('wheel', horizontalWheelHandler);
  }
  if (scrollTriggerInstance) {
    scrollTriggerInstance.scrollTrigger?.kill();
    scrollTriggerInstance.kill();
  }
});
</script>

<style scoped>
.projects-horizontal-wrapper {
  overflow: hidden;
  width: 100%;
}
.projects-track {
  will-change: transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
.project-panel {
  transition: opacity 0.3s ease;
}
</style>
