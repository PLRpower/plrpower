<script setup lang="ts">
import { computed } from 'vue';
import { useSchemaOrg } from '#imports';
import { getProjectById } from '~/data/projects';

const route = useRoute();
const projectId = route.params.id as string;

const project = computed(() => getProjectById(projectId));

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
  <div class="max-w-[1000px] mx-auto px-6 md:px-10 py-32 md:py-24 selection:bg-accent selection:text-black" v-if="project">
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
        <span class="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-accent/90 font-semibold">{{ project.label }}</span>
        <div class="h-px flex-1 bg-gradient-to-r from-accent/20 to-transparent"></div>
      </div>
      <h1 class="font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold tracking-tight text-primary leading-[1.05]">
        <TextScramble :text="project.title" tag="span" :duration="1200" />
      </h1>
      
      <!-- Tech badges -->
      <div class="mt-6 flex flex-wrap gap-2">
        <span v-for="tech in project.tech.split(' | ')" :key="tech" 
              class="px-3 py-1.5 text-[0.75rem] font-mono rounded-md bg-white/[0.03] border border-white/[0.06] text-secondary/80">
          {{ tech }}
        </span>
      </div>

      <!-- Action Links (GitHub, Demo, Documents) -->
      <div v-if="project.github || (project.documents && project.documents.length)" class="mt-8 flex flex-wrap gap-3">
        <a v-if="project.github" :href="project.github" target="_blank" rel="noopener noreferrer"
           class="inline-flex items-center gap-2 px-4 py-2 border border-white/[0.1] bg-white/[0.02] text-primary hover:border-accent hover:text-accent transition-all duration-300 font-mono text-xs">
          <Icon name="uil:github" size="16px" />
          <span>View Source on GitHub</span>
          <Icon name="material-symbols:arrow-outward" size="14px" />
        </a>

        <a v-for="doc in project.documents" :key="doc.url" :href="doc.url" target="_blank" rel="noopener noreferrer"
           class="inline-flex items-center gap-2 px-4 py-2 border border-accent/30 bg-accent/[0.06] text-accent hover:bg-accent/[0.15] hover:border-accent/60 transition-all duration-300 font-mono text-xs group">
          <Icon name="uil:file-alt" size="16px" class="group-hover:scale-110 transition-transform" />
          <span>{{ doc.title }}</span>
          <span class="text-[10px] opacity-75 font-semibold">[PDF]</span>
          <Icon name="material-symbols:arrow-outward" size="14px" class="opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </a>
      </div>
    </header>

    <!-- Project image -->
    <div class="mb-16 animate-project-in" style="animation-delay: 0.2s;" v-if="project.image">
      <div class="relative w-full overflow-hidden border border-white/[0.06] bg-white/[0.98] group">
        <div class="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-[#14b8a6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none"></div>
        <div class="p-8 md:p-12 flex justify-center items-center">
          <AsciiImage 
            :src="project.image" 
            :alt="project.title" 
            class="max-w-full h-auto min-h-[300px]"
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
      </div>
    </div>

    <!-- Content Sections -->
    <div class="space-y-16 animate-project-in" style="animation-delay: 0.3s;">
      
      <!-- Overview -->
      <section>
        <h2 class="font-display text-2xl mb-4 font-bold text-primary">Overview & Objective</h2>
        <p class="text-base md:text-lg leading-[1.9] text-secondary/80">{{ project.detailDescription || project.description }}</p>
      </section>

      <!-- Key Technical Highlights -->
      <section v-if="project.highlights && project.highlights.length">
        <h2 class="font-display text-2xl mb-6 font-bold text-primary">Key Engineering Highlights</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="item in project.highlights" :key="item.title"
               class="p-6 border border-white/[0.05] bg-white/[0.015]">
            <h3 class="font-display text-lg font-bold text-primary mb-2 text-accent/90">{{ item.title }}</h3>
            <p class="text-sm text-secondary/70 leading-relaxed">{{ item.description }}</p>
          </div>
        </div>
      </section>

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