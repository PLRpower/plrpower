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
            'group relative flex flex-col overflow-hidden bg-[#050505] border border-white/[0.05] hover:border-accent/40 transition-all duration-500 shadow-xl shadow-black/20 no-underline',
            { 'md:flex-row': isWideCard(project.gridClass) }
          ]"
        >
          <!-- Full Bleed Background Image for 2x2 Feature Cards -->
          <div v-if="project.image && isFeaturedCard(project.gridClass)" class="absolute inset-0 z-0">
            <AsciiImage 
              :src="project.image" 
              :alt="project.title"
              class="w-full h-full object-cover" 
              mode="default-ascii"
              :resolution="project.resolution"
              :invert="project.invert"
              :brightness="project.brightness"
              :contrast="project.contrast"
              :char-spacing="project.charSpacing"
              :char-ramp="project.charRamp"
              :tint-color="project.tintColor"
              :color-mode="project.colorMode"
              :use-original-colors="project.useOriginalColors"
            />
            <div class="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#050505]/85 via-[#050505]/20 to-transparent pointer-events-none"></div>
          </div>

          <!-- Split Image for Wide (2x1) or Tall (1x2) Cards -->
          <div v-else-if="project.image" class="relative flex-shrink-0 overflow-hidden bg-black w-full" 
               :class="getImageClass(project.gridClass)">
            <AsciiImage 
              :src="project.image" 
              :alt="project.title"
              class="w-full h-full object-cover" 
              mode="default-ascii"
              :resolution="project.resolution"
              :invert="project.invert"
              :brightness="project.brightness"
              :contrast="project.contrast"
              :char-spacing="project.charSpacing"
              :char-ramp="project.charRamp"
              :tint-color="project.tintColor"
              :color-mode="project.colorMode"
              :use-original-colors="project.useOriginalColors"
            />
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
              <div class="w-8 h-8 rounded-full bg-white/[0.03] flex items-center justify-center border border-white/[0.05] group-hover:bg-accent group-hover:border-accent transition-colors duration-300"
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
                      :class="isFeaturedCard(project.gridClass) ? 'text-white/90 bg-white/10 border-white/10' : 'text-secondary/80 bg-white/[0.03] border-white/[0.05]'">
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
import { projects as allProjects } from '~/data/projects';

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
</script>
