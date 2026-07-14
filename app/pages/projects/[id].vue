<script setup lang="ts">
import { useSchemaOrg } from '#imports';

const route = useRoute();
const projectId = route.params.id as string;

// On récupère les données (à terme elles seront centralisées)
const projects = [
  {
    id: 'federated-learning',
    title: 'Federated Learning — Lab',
    label: 'Research & ML',
    tech: 'Distributed ML | Python | TensorFlow/PyTorch',
    description: 'Researched and implemented Federated Learning models within a professional R&D environment at LINEACT Research Laboratory.',
    image: '/images/projects/federated-learning.webp'
  },
  {
    id: 'minecraft-server',
    title: 'Minecraft Server — Exolia',
    label: 'Server Architecture',
    tech: 'Java | Architecture | Team Management',
    description: 'Architected and managed a Minecraft server reaching 500+ registered players, focusing on custom mod/plugin development and team coordination.',
  },
  {
    id: 'chess-engine',
    title: 'Chess Engine',
    label: 'AI / ML & Algorithms',
    tech: 'C / C++ | Algorithms | AI / ML',
    description: 'Built a chess engine from scratch, implementing move generation, game tree search and evaluation functions.',
  },
  {
    id: 'chess-clock',
    title: 'Chess Clock — ESP32',
    label: 'Embedded Systems',
    tech: 'C | Systems | ESP32',
    description: 'Designed and programmed a chess clock on ESP32 microcontroller, illustrating concrete hardware expertise.',
  },
  {
    id: 'conway-game-of-life',
    title: 'Conway\'s Game of Life',
    label: 'Simulation',
    tech: 'C++ | Simulation | OOP',
    description: 'Full implementation of Conway\'s Game of Life with custom rendering and optimized object-oriented design.',
  },
  {
    id: 'a-la-carte',
    title: 'A la carte',
    label: 'Mobile App',
    tech: 'Vue/Nuxt | Mobile Dev | SQL',
    description: 'Mobile application for storing recipes easily and simplifying daily kitchen management.',
  }
];

const project = computed(() => projects.find(p => p.id === projectId));

if (!project.value) {
  throw showError({ statusCode: 404, statusMessage: 'Project not found' });
}

useSeoMeta({
  title: `${project.value.title} | Paul Thomas — Portfolio`,
  description: project.value.description,
  ogTitle: project.value.title,
  ogDescription: project.value.description,
  ogImage: project.value.image,
  twitterCard: 'summary_large_image',
});

useSchemaOrg([
  defineWebPage({
    name: project.value.title,
    description: project.value.description,
  })
]);
</script>

<template>
  <div class="max-w-[1000px] mx-auto px-6 md:px-10 py-32 md:py-24 selection:bg-accent selection:text-black light:selection:text-white" v-if="project">
    <!-- Back link -->
    <div class="mb-14 animate-project-in">
      <NuxtLink to="/#projects" class="inline-flex items-center gap-3 no-underline text-secondary/60 font-mono text-[0.8rem] tracking-wider transition-all duration-400 hover:text-accent hover:-translate-x-1 group">
        <svg class="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5m7 7l-7-7 7-7"/></svg>
        <span>Back to projects</span>
      </NuxtLink>
    </div>

    <!-- Header -->
    <header class="mb-16 animate-project-in" style="animation-delay: 0.1s;">
      <div class="flex items-center gap-3 mb-4">
        <span class="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-accent/70">{{ project.label }}</span>
        <div class="h-px flex-1 bg-gradient-to-r from-accent/20 to-transparent"></div>
      </div>
      <h1 class="font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold tracking-tight text-primary leading-[0.95]">
        <TextScramble :text="project.title" tag="span" :duration="1200" />
      </h1>
      <div class="mt-4 flex flex-wrap gap-2">
        <span v-for="tech in project.tech.split(' | ')" :key="tech" 
              class="px-3 py-1 text-[0.7rem] font-mono rounded-md bg-white/[0.03] light:bg-black/[0.03] border border-white/[0.06] light:border-black/[0.06] text-secondary/60">
          {{ tech }}
        </span>
      </div>
    </header>

    <!-- Project image -->
    <div class="mb-20 animate-project-in" style="animation-delay: 0.2s;" v-if="project.image">
      <div class="relative w-full rounded-xl overflow-hidden border border-white/[0.06] light:border-black/[0.06] bg-white/[0.98] light:bg-slate-50 group">
        <!-- Decorative gradient border -->
        <div class="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/5 via-transparent to-[#14b8a6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none"></div>
        <div class="p-8 md:p-12 flex justify-center items-center">
          <NuxtImg 
            :src="project.image" 
            :alt="project.title" 
            format="webp" 
            sizes="sm:100vw md:800px"
            class="max-w-full h-auto transition-transform duration-700 group-hover:scale-[1.02]"
          />
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-[800px] animate-project-in" style="animation-delay: 0.3s;">
      <h2 class="font-display text-2xl mb-8 font-semibold text-primary">Project Overview</h2>
      <p class="text-[1.1rem] leading-[1.9] text-secondary/80 mb-12">{{ project.description }}</p>
      
      <!-- Info callout -->
      <div class="glass-card !rounded-lg relative overflow-hidden">
        <div class="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-accent to-[#14b8a6]"></div>
        <div class="pl-6">
          <p class="text-secondary/60 italic text-[0.95rem] leading-relaxed">Plus d'informations sur ce projet seront ajoutées prochainement...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-project-in {
  opacity: 0;
  animation: projectFadeIn 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

@keyframes projectFadeIn {
  from { 
    opacity: 0; 
    transform: translateY(25px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}
</style>