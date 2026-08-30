<template>
  <div class="min-h-screen bg-bg text-primary pt-32 pb-32 px-6 md:px-10 overflow-hidden">
    <!-- Abstract background -->
    <div class="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 blur-[150px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3 z-0"></div>

    <div class="max-w-[1400px] mx-auto relative z-10">
      <div class="mb-20">
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-secondary hover:text-accent font-mono text-sm tracking-wider uppercase transition-colors duration-300 mb-8 group">
          <Icon name="uil:arrow-left" size="16px" class="transition-transform duration-300 group-hover:-translate-x-1" />
          Back to home
        </NuxtLink>
        <h1 class="font-display text-[clamp(3rem,8vw,6rem)] font-extrabold leading-[1.05] tracking-tight text-primary mb-6">
          Selected<br>Works
        </h1>
        <p class="text-xl text-secondary/70 max-w-2xl leading-relaxed">
          A showcase of my projects across AI, Embedded Systems, and Web Engineering.
        </p>
      </div>

      <!-- Bento Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[320px]">
        
        <NuxtLink 
          v-for="project in allProjects" 
          :key="project.id"
          :to="'/projects/' + project.id"
          :class="[
            project.gridClass, 
            'group relative flex flex-col overflow-hidden bg-[#050505] light:bg-white border border-white/[0.05] light:border-black/[0.05] hover:border-accent/40 transition-all duration-500 shadow-xl shadow-black/20 no-underline',
            { 'md:flex-row': isWideCard(project.gridClass) }
          ]"
        >
          <!-- Full Bleed Background Image for 2x2 Feature Cards -->
          <div v-if="project.image && isFeaturedCard(project.gridClass)" class="absolute inset-0 z-0">
            <AsciiImage 
              :src="project.image" 
              :alt="project.title"
              class="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000" 
              mode="default-ascii"
              :resolution="180"
              :invert="project.invert"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-[#050505] light:from-[#f8fafc] via-[#050505]/60 light:via-[#f8fafc]/60 to-transparent pointer-events-none"></div>
          </div>

          <!-- Split Image for Wide (2x1) or Tall (1x2) Cards -->
          <div v-else-if="project.image" class="relative flex-shrink-0 overflow-hidden bg-black w-full" 
               :class="getImageClass(project.gridClass)">
            <AsciiImage 
              :src="project.image" 
              :alt="project.title"
              class="w-full h-full object-cover" 
              mode="default-ascii"
              :resolution="180"
              :invert="project.invert"
            />
            <!-- Darkening overlay -->
            <div class="absolute inset-0 bg-[#050505]/30 light:bg-transparent group-hover:opacity-0 transition-opacity duration-700 pointer-events-none"></div>
          </div>
          
          <!-- Background glow for cards without images -->
          <div v-else class="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <div class="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent"></div>
          </div>

          <!-- Content Section -->
          <div class="relative z-10 flex flex-col flex-grow p-6 md:p-8"
               :class="{ 'justify-end h-full': isFeaturedCard(project.gridClass) }">
            
            <!-- Top part of content -->
            <div class="flex items-center justify-between mb-4" 
                 :class="{ 'absolute top-8 right-8 left-8': isFeaturedCard(project.gridClass) }">
              <span class="font-mono text-[0.65rem] font-bold px-2 py-1 bg-accent/10 text-accent rounded-md tracking-wider uppercase">
                {{ project.category }}
              </span>
              <div class="w-8 h-8 rounded-full bg-white/[0.03] light:bg-black/[0.03] flex items-center justify-center border border-white/[0.05] light:border-black/[0.05] group-hover:bg-accent group-hover:border-accent transition-colors duration-300"
                   :class="{ 'bg-white/10 text-white': isFeaturedCard(project.gridClass) }">
                <Icon name="material-symbols:arrow-outward" size="16px" class="text-secondary/50 group-hover:text-black transition-colors duration-300" 
                      :class="{ 'text-white': isFeaturedCard(project.gridClass) }"/>
              </div>
            </div>

            <!-- Bottom part of content -->
            <div :class="isFeaturedCard(project.gridClass) ? 'mt-auto' : 'flex flex-col flex-grow'">
              <h2 class="font-display text-2xl md:text-3xl font-bold mb-3"
                  :class="isFeaturedCard(project.gridClass) ? 'text-white' : 'text-primary'">{{ project.title }}</h2>
              
              <p class="text-sm leading-relaxed mb-6" 
                 :class="[
                    project.gridClass.includes('row-span-1') && !project.gridClass.includes('col-span-2') ? 'line-clamp-2' : 'line-clamp-4',
                    isFeaturedCard(project.gridClass) ? 'text-white/70 max-w-[80%]' : 'text-secondary/70 flex-grow'
                 ]">
                {{ project.description }}
              </p>
              
              <div class="flex flex-wrap gap-2 mt-auto pt-2">
                <span v-for="tech in project.techs" :key="tech" class="px-2.5 py-1 rounded-md border text-[0.65rem] font-mono"
                      :class="isFeaturedCard(project.gridClass) ? 'text-white/90 bg-white/10 border-white/10' : 'text-secondary/80 bg-white/[0.03] light:bg-black/[0.03] border-white/[0.05] light:border-black/[0.05]'">
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </NuxtLink>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Selected Works | Paul Thomas'
});

const isFeaturedCard = (gridClass: string) => gridClass.includes('col-span-2') && gridClass.includes('row-span-2');
const isWideCard = (gridClass: string) => gridClass.includes('col-span-2') && gridClass.includes('row-span-1');

const getImageClass = (gridClass: string) => {
  if (isWideCard(gridClass)) {
    return 'md:w-[45%] h-[200px] md:h-full border-r border-white/[0.05]';
  }
  return 'h-[45%] border-b border-white/[0.05]';
};

const allProjects = [
  {
    id: 'federated-learning',
    title: 'Federated Learning Platform',
    category: 'Research & AI',
    description: 'Researched and evaluated distributed Federated Learning architectures on Raspberry Pi clusters at LINEACT Laboratory.',
    techs: ['Python', 'PyTorch / TF', 'Distributed ML', 'Edge AI'],
    image: '/images/projects/federated-learning.webp',
    invert: true,
    gridClass: 'md:col-span-2 lg:col-span-2 lg:row-span-2'
  },
  {
    id: 'axiom-engine',
    title: 'Axiom Chess Engine & AI',
    category: 'AI & Algorithms',
    description: 'A custom chess engine combining classical Alpha-Beta pruning with machine learning-inspired evaluation functions.',
    techs: ['Python', 'Heuristics', 'Game Tree Search', 'ML'],
    image: '/images/projects/axiom.webp',
    gridClass: 'md:col-span-2 lg:col-span-2 lg:row-span-1'
  },
  {
    id: 'embedded-weather-station',
    title: 'Embedded Weather Station',
    category: 'Embedded & IoT',
    description: 'A resilient, Arduino/ESP32-based embedded weather station prototype designed for environmental hazard monitoring.',
    techs: ['C++', 'Arduino / ESP32', 'Sensors', 'Telemetry'],
    image: '/images/projects/weather.jpg',
    gridClass: 'md:col-span-2 lg:col-span-2 lg:row-span-1'
  },
  {
    id: 'mundo-search',
    title: 'Mundo Search',
    category: 'Full-Stack & AI',
    description: 'An innovative search engine leveraging AI to generate interactive mindmaps and concept graphs.',
    techs: ['TypeScript', 'Vue.js', 'NLP & AI', 'Graph UI'],
    image: '/images/projects/search.jpg',
    gridClass: 'md:col-span-1 lg:col-span-1 lg:row-span-2'
  },
  {
    id: 'hydro-regen',
    title: 'Hydro Regen',
    category: 'Hackathon Winner',
    description: 'Award-winning regenerative hydrology mapping platform built by a 10-person team during Aquathon (3rd Place & Jury Award).',
    techs: ['Vue.js', 'TypeScript', 'Spatial Data', 'Tailwind'],
    image: '/images/projects/hydro.jpg',
    gridClass: 'md:col-span-1 lg:col-span-2 lg:row-span-2'
  },
  {
    id: 'a-la-carte',
    title: 'À la carte — Smart Kitchen',
    category: 'Mobile & AI',
    description: 'A smart meal planner and fridge management app that extracts recipes from photos and matches real-time ingredients.',
    techs: ['TypeScript', 'Vue/Nuxt', 'OCR / Vision', 'REST APIs'],
    gridClass: 'md:col-span-2 lg:col-span-1 lg:row-span-1'
  },
  {
    id: 'delivery-route-optimization',
    title: 'Route & Fleet Optimization',
    category: 'Data Science & OR',
    description: 'Operations research and graph algorithms solving Vehicle Routing Problems (VRP) with time-window constraints.',
    techs: ['Python', 'Jupyter', 'Graph Theory', 'Optimization'],
    gridClass: 'md:col-span-2 lg:col-span-1 lg:row-span-1'
  },
  {
    id: 'conway-game-of-life',
    title: 'Game of Life Simulation',
    category: 'C++ & Systems',
    description: 'High-performance cellular automaton in modern C++20 with OpenMP multi-threading and SOLID architecture.',
    techs: ['C++20', 'OpenMP', 'Parallel Computing', 'OOP'],
    gridClass: 'md:col-span-1 lg:col-span-2 lg:row-span-1'
  },
  {
    id: 'minecraft-server',
    title: 'Exolia Server Infrastructure',
    category: 'Distributed Systems',
    description: 'Multiplayer server infrastructure serving 500+ players with asynchronous Netty plugins and Redis synchronization.',
    techs: ['Java', 'Netty', 'Concurrency', 'Redis / SQL'],
    gridClass: 'md:col-span-1 lg:col-span-2 lg:row-span-1'
  }
];
</script>
