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
            <div class="mb-6">
              <span class="font-handwriting text-2xl text-accent/80">Projects</span>
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
              :to="project.link || ('/projects/' + project.id)"
              :target="project.link?.startsWith('http') ? '_blank' : undefined"
              class="project-panel flex-shrink-0 w-[85vw] md:w-[55vw] lg:w-[45vw] h-[55vh] relative flex flex-col p-8 md:p-12 group no-underline"
              :class="project.isViewAll ? 'justify-center items-center overflow-hidden bg-[#2dd4bf]/[0.03] border-y border-r border-[#2dd4bf]/20' : 'justify-end'"
              @mouseenter="isHoveringProject = true"
              @mouseleave="isHoveringProject = false"
            >
              <!-- Giant Full-bleed Background for regular projects with ASCII rasterization on hover -->
              <div v-if="!project.isViewAll" class="absolute inset-0 z-0 overflow-hidden bg-[#030303] light:bg-[#f8fafc]">
                <AsciiImage 
                  v-if="project.image"
                  :src="project.image" 
                  :alt="project.title" 
                  class="w-full h-full object-cover" 
                  mode="default-ascii"
                  :resolution="180"
                  :invert="project.invert"
                  :group-hover="true"
                />
                <!-- Localized bottom-left scrim: keeps ASCII art 100% visible across top/right while keeping text legible -->
                <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(3,3,3,0.85)_0%,_rgba(3,3,3,0.4)_40%,_transparent_70%)] light:bg-[radial-gradient(ellipse_at_bottom_left,_rgba(248,250,252,0.9)_0%,_rgba(248,250,252,0.4)_40%,_transparent_70%)] pointer-events-none"></div>
                <div class="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#030303]/80 light:from-[#f8fafc]/80 to-transparent pointer-events-none"></div>
              </div>

              <!-- Project number for regular projects -->
              <span v-if="!project.isViewAll" class="absolute top-8 right-10 font-display text-[6rem] md:text-[8rem] font-extrabold leading-none text-white/[0.03] light:text-black/[0.03] group-hover:text-white/[0.06] light:text-black/[0.06] transition-colors duration-700 select-none z-10 pointer-events-none">
                {{ String(idx + 1).padStart(2, '0') }}
              </span>

              <!-- Dramatic Glow for View All card -->
              <div v-if="project.isViewAll" class="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 blur-[100px] rounded-full group-hover:bg-accent/20 transition-colors duration-700 pointer-events-none -translate-y-1/2 translate-x-1/3 z-0"></div>

              <!-- Content overlay for regular projects -->
              <div v-if="!project.isViewAll" class="relative z-10 max-w-2xl">
                <h3 class="font-display text-2xl md:text-4xl font-bold text-primary mb-4 leading-tight drop-shadow-md">{{ project.title }}</h3>
                <p class="font-mono text-[0.75rem] text-accent tracking-wider mb-6 font-medium drop-shadow-sm">{{ project.tech }}</p>
                <p class="text-base text-secondary/95 light:text-slate-700 leading-relaxed max-w-[500px] drop-shadow-sm">{{ project.description }}</p>
              </div>

              <!-- Content overlay for View All card -->
              <div v-else class="relative z-10 flex flex-col items-center gap-6 text-primary transition-transform duration-500 group-hover:scale-[1.03]">
                <div class="flex items-center justify-center text-secondary group-hover:text-accent transition-colors duration-500">
                  <Icon name="material-symbols:arrow-forward" size="56px" />
                </div>
                <h3 class="font-display text-3xl md:text-5xl font-bold tracking-tight text-center">View All<br>Projects</h3>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Floating Explore Text for Projects (Visible only on Desktop hover) -->
    <ClientOnly>
      <Teleport to="body">
        <div ref="exploreCursorRef" class="fixed pointer-events-none z-[100] hidden md:flex items-center gap-2 mix-blend-difference"
             :class="isHoveringProject ? 'opacity-100' : 'opacity-0'"
             :style="{ transition: 'opacity 0.2s', transform: 'translate(24px, -50%) scale(' + (isHoveringProject ? 1 : 0.8) + ')' }">
          <span class="font-display font-bold text-xl md:text-2xl text-white light:text-primary uppercase tracking-wider">Explore</span>
          <Icon name="material-symbols:arrow-outward" size="32px" class="text-white light:text-primary" />
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
    title: 'Federated Learning Platform',
    label: 'Research & Distributed AI',
    tech: 'Distributed ML · PyTorch/TF · Edge AI · Sockets',
    description: 'Researched and evaluated distributed Federated Learning architectures on physical Raspberry Pi clusters at LINEACT Research Laboratory.',
    image: '/images/projects/federated-learning.webp',
    invert: true
  },
  {
    id: 'axiom-engine',
    title: 'Axiom Chess Engine & AI',
    label: 'AI / ML & Algorithms',
    tech: 'Python · Heuristics · Alpha-Beta · Minimax',
    description: 'A custom chess engine combining classical Alpha-Beta pruning with machine learning-inspired evaluation functions.',
    image: '/images/projects/axiom.webp'
  },
  {
    id: 'embedded-weather-station',
    title: 'Embedded Weather Station',
    label: 'Embedded Systems & IoT',
    tech: 'C++ · Arduino/ESP32 · Sensors · Telemetry',
    description: 'A resilient embedded sensor payload designed for environmental monitoring, maritime hazard mitigation, and low-power telemetry.',
  },
  {
    id: 'delivery-route-optimization',
    title: 'Route & Fleet Optimization',
    label: 'Data Science & Operations',
    tech: 'Python · Graph Theory · Combinatorial Optimization',
    description: 'Operations research and data science algorithms solving Vehicle Routing Problems (VRP) with time-window constraints.',
  },
  {
    id: 'a-la-carte',
    title: 'À la carte — Smart Kitchen',
    label: 'Full-Stack & Vision AI',
    tech: 'TypeScript · Nuxt · OCR/Vision · REST APIs',
    description: 'A smart meal planner and pantry inventory manager using computer vision and NLP to extract recipes from photos.',
  },
  {
    id: 'view-all',
    title: 'View All Projects',
    isViewAll: true,
    link: '/projects'
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
        ['end']: () => `+=${getTotalScrollWidth()}`,
        invalidateOnRefresh: true,
        fastScrollEnd: true,
        preventOverlaps: true,
      }
    });

    horizontalWheelHandler = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        // noinspection SuspiciousNameCombination
        const scrollDelta = e.deltaX;
        window.scrollBy({ top: scrollDelta, behavior: 'auto' });
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
