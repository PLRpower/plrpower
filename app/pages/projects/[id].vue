<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useSchemaOrg } from '#imports';
import { getProjectById, projects, type ProjectGalleryItem } from '~/data/projects';

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

// Lightbox for gallery images
const selectedImage = ref<ProjectGalleryItem | null>(null);

const openLightbox = (item: ProjectGalleryItem) => {
  selectedImage.value = item;
};

const closeLightbox = () => {
  selectedImage.value = null;
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && selectedImage.value) {
    closeLightbox();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});

// Next project link
const nextProject = computed(() => {
  if (!project.value) return null;
  const currentIndex = projects.findIndex(p => p.id === project.value!.id);
  if (currentIndex === -1) return null;
  const nextIdx = (currentIndex + 1) % projects.length;
  return projects[nextIdx];
});
</script>

<template>
  <div class="max-w-[1100px] mx-auto px-6 md:px-10 py-32 md:py-24 selection:bg-accent selection:text-black" v-if="project">
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
        <span v-if="project.year" class="font-mono text-[0.7rem] text-secondary/50 font-semibold">· {{ project.year }}</span>
        <div class="h-px flex-1 bg-gradient-to-r from-accent/20 to-transparent"></div>
      </div>
      <h1 class="font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold tracking-tight text-primary leading-[1.05]">
        <TextScramble :text="project.title" tag="span" :duration="1200" />
      </h1>
      
      <!-- Tech badges -->
      <div class="mt-6 flex flex-wrap gap-2">
        <span v-for="tech in project.techs" :key="tech" 
              class="px-3 py-1.5 text-[0.75rem] font-mono rounded-md bg-white/[0.03] border border-white/[0.06] text-secondary/80">
          {{ tech }}
        </span>
      </div>

      <!-- Action Links (GitHub, Demo, Documents) -->
      <div v-if="project.github || (project.documents && project.documents.length) || project.demo" class="mt-8 flex flex-wrap gap-3">
        <a v-if="project.demo" :href="project.demo" target="_blank" rel="noopener noreferrer"
           class="inline-flex items-center gap-2 px-4 py-2 border border-accent/40 bg-accent/[0.08] text-accent hover:bg-accent/20 transition-all duration-300 font-mono text-xs">
          <Icon name="material-symbols:open-in-new" size="16px" />
          <span>Live Demo</span>
          <Icon name="material-symbols:arrow-outward" size="14px" />
        </a>

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

    <!-- Main Project Visual -->
    <div class="mb-16 animate-project-in" style="animation-delay: 0.2s;" v-if="project.image">
      <div class="relative w-full overflow-hidden border border-white/[0.06] bg-[#050505] group">
        <div class="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-[#14b8a6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none"></div>
        <div class="p-8 md:p-12 flex justify-center items-center">
          <AsciiImage 
            :src="project.image" 
            :alt="`${project.title} — ${project.label}`" 
            class="w-full aspect-video min-h-[300px]"
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
      
      <!-- Overview & Context -->
      <section>
        <div class="flex items-center gap-3 mb-4">
          <h2 class="font-display text-2xl font-bold text-primary">Overview & Objective</h2>
          <div class="h-px flex-1 bg-white/[0.06]"></div>
        </div>
        <div class="space-y-4">
          <p class="text-base md:text-lg leading-[1.9] text-secondary/90 whitespace-pre-line">
            {{ project.detailDescription || project.description }}
          </p>
        </div>
      </section>

      <!-- Architecture Tree / Directory Structure -->
      <section v-if="project.architectureTree">
        <div class="flex items-center gap-3 mb-4">
          <h2 class="font-display text-2xl font-bold text-primary">System Architecture & Modules</h2>
          <div class="h-px flex-1 bg-white/[0.06]"></div>
        </div>
        <div class="border border-white/[0.08] bg-[#070707] rounded-sm overflow-hidden">
          <div class="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-red-500/40"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-yellow-500/40"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-green-500/40"></span>
              <span class="ml-2 font-mono text-xs text-secondary/60">architecture.tree</span>
            </div>
            <span class="font-mono text-[0.7rem] text-accent/80 uppercase tracking-widest">Repository Map</span>
          </div>
          <pre class="p-6 font-mono text-xs md:text-sm leading-relaxed text-secondary/90 overflow-x-auto whitespace-pre"><code>{{ project.architectureTree }}</code></pre>
        </div>
      </section>

      <!-- Detailed Sections from README -->
      <section v-for="section in project.sections" :key="section.title" class="space-y-6">
        <div class="flex items-center gap-3">
          <div>
            <span v-if="section.subtitle" class="block font-mono text-[0.7rem] uppercase tracking-wider text-accent/80 font-medium mb-1">{{ section.subtitle }}</span>
            <h2 class="font-display text-2xl font-bold text-primary">{{ section.title }}</h2>
          </div>
          <div class="h-px flex-1 bg-white/[0.06]"></div>
        </div>

        <p v-if="section.content" class="text-base md:text-lg leading-[1.85] text-secondary/80 whitespace-pre-line">
          {{ section.content }}
        </p>

        <!-- Section Items / Capabilities Grid -->
        <div v-if="section.items && section.items.length" class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div v-for="item in section.items" :key="item.description"
               class="p-5 border border-white/[0.05] bg-white/[0.015] hover:border-accent/30 transition-colors">
            <h3 v-if="item.title" class="font-display text-base font-bold text-primary mb-2 text-accent/90">
              {{ item.title }}
            </h3>
            <p class="text-sm text-secondary/75 leading-relaxed">{{ item.description }}</p>
          </div>
        </div>

        <!-- Section Table (Benchmarks, Specifications) -->
        <div v-if="section.table" class="overflow-x-auto border border-white/[0.08] bg-[#070707] rounded-sm">
          <table class="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr class="border-b border-white/[0.08] bg-white/[0.02]">
                <th v-for="header in section.table.headers" :key="header" class="p-3 text-accent font-semibold whitespace-nowrap">
                  {{ header }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, rIdx) in section.table.rows" :key="rIdx" class="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                <td v-for="(cell, cIdx) in row" :key="cIdx" class="p-3 text-secondary/90 whitespace-nowrap" :class="{ 'font-semibold text-primary': cIdx === 0 }">
                  {{ cell }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Technical Artifacts & Visual Gallery -->
      <section v-if="project.gallery && project.gallery.length" class="space-y-6">
        <div class="flex items-center gap-3 mb-2">
          <div>
            <span class="block font-mono text-[0.7rem] uppercase tracking-wider text-accent/80 font-medium mb-1">Visual Documentation</span>
            <h2 class="font-display text-2xl font-bold text-primary">Engineering Artifacts & Diagrams</h2>
          </div>
          <div class="h-px flex-1 bg-white/[0.06]"></div>
        </div>
        <p class="text-sm text-secondary/60 font-mono">
          Click any diagram or visual artifact to examine in high resolution.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div 
            v-for="item in project.gallery" 
            :key="item.url" 
            :class="item.span === 'full' ? 'md:col-span-2' : 'md:col-span-1'"
            class="group border border-white/[0.08] bg-[#070707] rounded-sm overflow-hidden hover:border-accent/40 transition-all duration-300 flex flex-col cursor-pointer"
            @click="openLightbox(item)"
          >
            <div class="relative overflow-hidden bg-black/60 flex items-center justify-center p-4 min-h-[220px]">
              <img 
                :src="item.url" 
                :alt="item.title" 
                loading="lazy"
                class="max-h-[380px] w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div class="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <div class="p-2 rounded-full bg-black/70 border border-accent/40 text-accent">
                  <Icon name="material-symbols:zoom-in" size="20px" />
                </div>
              </div>
            </div>
            <div class="p-4 border-t border-white/[0.06] bg-white/[0.015] flex-1 flex flex-col justify-between">
              <h3 class="font-display text-sm font-bold text-primary mb-1 group-hover:text-accent transition-colors">
                {{ item.title }}
              </h3>
              <p v-if="item.caption" class="text-xs text-secondary/70 leading-relaxed font-sans">
                {{ item.caption }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Key Technical Highlights -->
      <section v-if="project.highlights && project.highlights.length">
        <div class="flex items-center gap-3 mb-6">
          <h2 class="font-display text-2xl font-bold text-primary">Key Engineering Highlights</h2>
          <div class="h-px flex-1 bg-white/[0.06]"></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="item in project.highlights" :key="item.title"
               class="p-6 border border-white/[0.05] bg-white/[0.015] hover:border-accent/20 transition-colors">
            <h3 class="font-display text-lg font-bold text-primary mb-2 text-accent/90">{{ item.title }}</h3>
            <p class="text-sm text-secondary/70 leading-relaxed">{{ item.description }}</p>
          </div>
        </div>
      </section>

      <!-- Commands & Quickstart -->
      <section v-if="project.commands && project.commands.length">
        <div class="flex items-center gap-3 mb-6">
          <h2 class="font-display text-2xl font-bold text-primary">Execution & Quickstart Commands</h2>
          <div class="h-px flex-1 bg-white/[0.06]"></div>
        </div>
        <div class="space-y-4">
          <div v-for="cmd in project.commands" :key="cmd.label" class="border border-white/[0.08] bg-[#070707] rounded-sm p-4">
            <div class="flex items-center justify-between mb-2">
              <span class="font-mono text-xs font-semibold text-accent/90">{{ cmd.label }}</span>
              <span v-if="cmd.description" class="text-xs text-secondary/50 font-mono">{{ cmd.description }}</span>
            </div>
            <pre class="font-mono text-xs md:text-sm bg-black/60 p-3 text-secondary/90 overflow-x-auto border border-white/[0.04]"><code>{{ cmd.command }}</code></pre>
          </div>
        </div>
      </section>

      <!-- Next Project Bar -->
      <div v-if="nextProject" class="pt-12 border-t border-white/[0.08] flex items-center justify-between">
        <NuxtLink to="/#projects" class="font-mono text-xs text-secondary/60 hover:text-accent transition-colors no-underline">
          ← Back to all projects
        </NuxtLink>
        <NuxtLink :to="'/projects/' + nextProject.id" class="inline-flex items-center gap-3 font-mono text-xs text-primary hover:text-accent transition-all duration-300 no-underline group">
          <span class="text-secondary/50">Next:</span>
          <span class="font-bold underline decoration-accent/40 underline-offset-4 group-hover:decoration-accent">{{ nextProject.title }}</span>
          <Icon name="material-symbols:arrow-forward" size="16px" class="transition-transform group-hover:translate-x-1" />
        </NuxtLink>
      </div>

    </div>

    <!-- Lightbox Modal for Full Diagram Inspection -->
    <Teleport to="body">
      <div 
        v-if="selectedImage" 
        class="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-8 animate-fadeIn"
        @click.self="closeLightbox"
      >
        <button 
          @click="closeLightbox" 
          class="absolute top-6 right-6 p-2 text-secondary/70 hover:text-accent border border-white/10 hover:border-accent/40 bg-black/80 font-mono text-xs transition-colors flex items-center gap-2"
          aria-label="Close dialog"
        >
          <Icon name="material-symbols:close" size="20px" />
          <span>ESC</span>
        </button>

        <div class="max-w-[95vw] max-h-[85vh] flex flex-col items-center justify-center">
          <img 
            :src="selectedImage.url" 
            :alt="selectedImage.title" 
            class="max-w-full max-h-[75vh] object-contain rounded-sm border border-white/10 shadow-2xl"
          />
          <div class="mt-4 text-center max-w-2xl">
            <h4 class="font-display text-base font-bold text-primary">{{ selectedImage.title }}</h4>
            <p v-if="selectedImage.caption" class="text-xs text-secondary/70 mt-1 font-sans">{{ selectedImage.caption }}</p>
          </div>
        </div>
      </div>
    </Teleport>

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

.animate-fadeIn {
  animation: fadeIn 0.2s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>