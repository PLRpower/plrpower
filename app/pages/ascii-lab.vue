<script setup lang="ts">
import { ref, computed } from 'vue';

useHead({
  title: 'ASCII Art Tuning Lab | Paul Thomas',
});

interface ProjectConfig {
  id: string;
  name: string;
  src: string;
  resolution: number;
  invert: boolean;
  brightness: number;
  contrast: number;
  charSpacing: number;
  charRamp: string;
  tintColor: string;
  colorMode?: 'monochrome' | 'original';
}

import { projects as baseProjects } from '~/data/projects';

const defaultRamps = [
  { name: 'High-Detail 16 (Standard)', value: ' .·:;~+=-*#%&$@' },
  { name: 'Classic 10', value: ' .:-=+*#%@' },
  { name: 'Dense 70', value: ' .\'`^",:;Il!i><~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$' },
  { name: 'Blocks & Shades', value: ' ░▒▓█' },
  { name: 'Binary Matrix', value: ' 01' },
];

const tintPresets = [
  { name: 'Emerald (Portfolio Default)', value: '#2dd4bf' },
  { name: 'Matrix Green', value: '#22c55e' },
  { name: 'Neon Cyan', value: '#06b6d4' },
  { name: 'Cyber Amber', value: '#f59e0b' },
  { name: 'Pure White', value: '#ffffff' },
  { name: 'Slate Light', value: '#0f172a' }
];

const projects = ref<ProjectConfig[]>([
  ...baseProjects.filter(p => p.image).map(p => ({
    id: p.id,
    name: p.title,
    src: p.image!,
    resolution: p.resolution ?? 180,
    invert: p.invert ?? false,
    brightness: p.brightness ?? 1.0,
    contrast: p.contrast ?? 1.2,
    charSpacing: p.charSpacing ?? 0.85,
    charRamp: p.charRamp ?? ' .·:;~+=-*#%&$@',
    tintColor: p.tintColor ?? '#2dd4bf',
    colorMode: p.colorMode ?? 'monochrome'
  })),
  {
    id: 'profile',
    name: 'Profile Photo',
    src: '/images/other/profile.webp',
    resolution: 180,
    invert: false,
    brightness: 1.0,
    contrast: 1.15,
    charSpacing: 0.85,
    charRamp: ' .·:;~+=-*#%&$@',
    tintColor: '#2dd4bf',
    colorMode: 'monochrome'
  }
]);

const selectedProjectId = ref('federated-learning');
const activeProject = computed(() => {
  return projects.value.find(p => p.id === selectedProjectId.value) || projects.value[0]!;
});

const viewMode = ref<'side-by-side' | 'interactive-hover' | 'ascii-only'>('side-by-side');
const copiedMessage = ref(false);

const copyCode = () => {
  const p = activeProject.value;
  const snippet = `<AsciiImage 
  src="${p.src}" 
  alt="${p.name}"
  :resolution="${p.resolution}"
  :invert="${p.invert}"
  :brightness="${p.brightness}"
  :contrast="${p.contrast}"
  :char-spacing="${p.charSpacing}"
  char-ramp="${p.charRamp}"
  tint-color="${p.tintColor}"
/>`;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(snippet);
    copiedMessage.value = true;
    setTimeout(() => {
      copiedMessage.value = false;
    }, 2500);
  }
};

const copyAllJson = () => {
  const json = JSON.stringify(projects.value, null, 2);
  if (navigator.clipboard) {
    navigator.clipboard.writeText(json);
    copiedMessage.value = true;
    setTimeout(() => {
      copiedMessage.value = false;
    }, 2500);
  }
};

const handleCustomUpload = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    if (typeof reader.result === 'string') {
      const customId = 'custom-' + Date.now();
      projects.value.push({
        id: customId,
        name: file.name,
        src: reader.result,
        resolution: 95,
        invert: false,
        brightness: 1.0,
        contrast: 1.2,
        charSpacing: 0.85,
        charRamp: ' .·:;~+=-*#%&$@',
        tintColor: '#2dd4bf'
      });
      selectedProjectId.value = customId;
    }
  };
  reader.readAsDataURL(file);
};
</script>

<template>
  <div class="min-h-screen bg-[#030303] text-[#e2e8f0] p-6 md:p-10 font-mono">
    <!-- Header -->
    <header class="max-w-[1500px] mx-auto mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/[0.08] pb-6">
      <div>
        <div class="flex items-center gap-3">
          <NuxtLink to="/" class="text-accent hover:underline text-xs flex items-center gap-1">
            <Icon name="uil:arrow-left" size="14px" /> Back to Portfolio
          </NuxtLink>
          <span class="text-secondary/40">//</span>
          <span class="text-xs text-accent/80 font-bold tracking-widest uppercase">LAB_ENVIRONMENT</span>
        </div>
        <h1 class="text-2xl md:text-3xl font-display font-extrabold text-white mt-1">
          ASCII Calibration & Tuning Lab
        </h1>
      </div>

      <div class="flex items-center gap-3">
        <button 
          @click="copyCode" 
          class="px-4 py-2 bg-accent/10 hover:bg-accent/20 border border-accent/30 text-accent text-xs font-semibold tracking-wider transition-colors flex items-center gap-2"
        >
          <Icon :name="copiedMessage ? 'uil:check' : 'uil:copy'" size="16px" />
          {{ copiedMessage ? 'COPIED TO CLIPBOARD!' : 'COPY VUE PROPS' }}
        </button>
        <button 
          @click="copyAllJson" 
          class="px-4 py-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-secondary/80 text-xs tracking-wider transition-colors"
        >
          EXPORT ALL CONFIG (JSON)
        </button>
      </div>
    </header>

    <!-- Main Workspace -->
    <div class="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      <!-- Left: Configuration Controls (5 cols) -->
      <div class="lg:col-span-4 bg-white/[0.02] border border-white/[0.08] p-6 flex flex-col gap-6">
        
        <!-- Image Selector -->
        <div>
          <label class="text-xs text-accent uppercase tracking-widest font-bold block mb-3">1. Select Image</label>
          <div class="grid grid-cols-3 gap-2 mb-3">
            <button 
              v-for="p in projects" 
              :key="p.id" 
              @click="selectedProjectId = p.id"
              class="p-2 text-left border text-[11px] transition-all flex flex-col items-center gap-1.5"
              :class="selectedProjectId === p.id ? 'border-accent bg-accent/10 text-white font-bold' : 'border-white/[0.06] bg-black/40 text-secondary/60 hover:border-white/[0.2]'"
            >
              <img :src="p.src" :alt="p.name" class="w-full h-12 object-cover" />
              <span class="truncate w-full text-center">{{ p.name }}</span>
            </button>
          </div>

          <label class="block text-[11px] text-secondary/60 hover:text-white cursor-pointer border border-dashed border-white/[0.15] p-2.5 text-center hover:border-accent transition-colors">
            <span>+ Upload Custom Image</span>
            <input type="file" accept="image/*" class="hidden" @change="handleCustomUpload" />
          </label>
        </div>

        <!-- Sliders & Modifiers -->
        <div class="flex flex-col gap-5 border-t border-white/[0.08] pt-6">
          <label class="text-xs text-accent uppercase tracking-widest font-bold block">2. Image Adjustments</label>

          <!-- Resolution (Columns) -->
          <div>
            <div class="flex justify-between text-xs mb-1.5">
              <span class="text-secondary/70">Columns (Resolution)</span>
              <span class="text-accent font-bold">{{ activeProject.resolution }} cols</span>
            </div>
            <input 
              v-model.number="activeProject.resolution" 
              type="range" 
              min="30" 
              max="260" 
              step="1"
              class="w-full accent-accent bg-white/[0.1] h-1.5 cursor-pointer"
            />
          </div>

          <!-- Brightness -->
          <div>
            <div class="flex justify-between text-xs mb-1.5">
              <span class="text-secondary/70">Brightness Multiplier</span>
              <span class="text-accent font-bold">{{ activeProject.brightness.toFixed(2) }}x</span>
            </div>
            <input 
              v-model.number="activeProject.brightness" 
              type="range" 
              min="0.3" 
              max="2.5" 
              step="0.05"
              class="w-full accent-accent bg-white/[0.1] h-1.5 cursor-pointer"
            />
          </div>

          <!-- Contrast (Gamma) -->
          <div>
            <div class="flex justify-between text-xs mb-1.5">
              <span class="text-secondary/70">Contrast / Gamma</span>
              <span class="text-accent font-bold">{{ activeProject.contrast.toFixed(2) }}</span>
            </div>
            <input 
              v-model.number="activeProject.contrast" 
              type="range" 
              min="0.5" 
              max="3.0" 
              step="0.05"
              class="w-full accent-accent bg-white/[0.1] h-1.5 cursor-pointer"
            />
          </div>

          <!-- Column Spacing / Character Width Fit -->
          <div>
            <div class="flex justify-between text-xs mb-1.5">
              <span class="text-secondary/70">Column Width Ratio (No Overlap)</span>
              <span class="text-accent font-bold">{{ activeProject.charSpacing.toFixed(2) }}</span>
            </div>
            <input 
              v-model.number="activeProject.charSpacing" 
              type="range" 
              min="0.5" 
              max="1.1" 
              step="0.02"
              class="w-full accent-accent bg-white/[0.1] h-1.5 cursor-pointer"
            />
            <p class="text-[10px] text-secondary/40 mt-1">Lower = wider gap between characters. Higher = tighter characters.</p>
          </div>

          <!-- Invert Colors Toggle -->
          <div class="flex items-center justify-between p-3 bg-white/[0.02] border border-white/[0.06]">
            <div>
              <span class="text-xs font-semibold block text-white">Invert Luminance</span>
              <span class="text-[10px] text-secondary/50">For white/light background images</span>
            </div>
            <input 
              v-model="activeProject.invert" 
              type="checkbox" 
              class="w-5 h-5 accent-accent cursor-pointer"
            />
          </div>

          <!-- Character Ramp Presets -->
          <div>
            <label class="text-xs text-secondary/70 block mb-1.5">Character Density Ramp</label>
            <select 
              v-model="activeProject.charRamp" 
              class="w-full bg-[#0a0a0a] border border-white/[0.1] p-2 text-xs text-white mb-2"
            >
              <option v-for="r in defaultRamps" :key="r.name" :value="r.value">
                {{ r.name }}
              </option>
            </select>
            <input 
              v-model="activeProject.charRamp" 
              type="text" 
              placeholder="Custom character set"
              class="w-full bg-black/60 border border-white/[0.08] p-2 text-[11px] text-accent tracking-widest"
            />
          </div>

          <!-- Color Tint Presets -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <label class="text-xs text-secondary/70">Color Mode & Tint</label>
              <button 
                @click="activeProject.colorMode = activeProject.colorMode === 'original' ? 'monochrome' : 'original'"
                class="px-2 py-0.5 text-[10px] font-bold border transition-colors"
                :class="activeProject.colorMode === 'original' ? 'border-accent bg-accent text-black' : 'border-white/[0.2] bg-white/[0.05] text-white'"
              >
                {{ activeProject.colorMode === 'original' ? '🌈 TRUE COLOR (RGB)' : 'MONOCHROME TINT' }}
              </button>
            </div>
            <div class="flex flex-wrap gap-2" :class="{ 'opacity-40 pointer-events-none': activeProject.colorMode === 'original' }">
              <button 
                v-for="t in tintPresets" 
                :key="t.name" 
                @click="activeProject.tintColor = t.value"
                class="px-2.5 py-1.5 border text-[10px] flex items-center gap-1.5 transition-all"
                :class="activeProject.tintColor === t.value ? 'border-accent bg-accent/20 text-white font-bold' : 'border-white/[0.08] bg-black/40 text-secondary/60'"
              >
                <span class="w-2.5 h-2.5 rounded-full" :style="{ background: t.value }"></span>
                <span>{{ t.name }}</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      <!-- Right: Live Comparison & Interactive Viewer (8 cols) -->
      <div class="lg:col-span-8 flex flex-col gap-6">
        
        <!-- View Mode Switcher -->
        <div class="flex items-center justify-between bg-white/[0.02] border border-white/[0.08] p-3">
          <span class="text-xs text-secondary/60 uppercase font-bold tracking-wider">Viewing Mode:</span>
          <div class="flex gap-2">
            <button 
              @click="viewMode = 'side-by-side'"
              class="px-3 py-1.5 text-xs transition-colors"
              :class="viewMode === 'side-by-side' ? 'bg-accent text-black font-bold' : 'bg-white/[0.04] text-secondary/70 hover:text-white'"
            >
              Side-by-Side (Source vs ASCII)
            </button>
            <button 
              @click="viewMode = 'interactive-hover'"
              class="px-3 py-1.5 text-xs transition-colors"
              :class="viewMode === 'interactive-hover' ? 'bg-accent text-black font-bold' : 'bg-white/[0.04] text-secondary/70 hover:text-white'"
            >
              Hover Test
            </button>
            <button 
              @click="viewMode = 'ascii-only'"
              class="px-3 py-1.5 text-xs transition-colors"
              :class="viewMode === 'ascii-only' ? 'bg-accent text-black font-bold' : 'bg-white/[0.04] text-secondary/70 hover:text-white'"
            >
              ASCII Only
            </button>
          </div>
        </div>

        <!-- Mode 1: Side-by-Side Comparison -->
        <div v-if="viewMode === 'side-by-side'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Left: Original Image -->
          <div class="bg-black/60 border border-white/[0.08] p-4 flex flex-col gap-3">
            <div class="flex justify-between items-center text-xs text-secondary/60">
              <span class="font-bold text-white">[01] SOURCE PHOTO</span>
              <span>object-cover</span>
            </div>
            <div class="relative w-full h-[400px] overflow-hidden bg-[#030303]">
              <img 
                :src="activeProject.src" 
                :alt="activeProject.name" 
                class="w-full h-full object-cover"
              />
            </div>
          </div>

          <!-- Right: ASCII Render -->
          <div class="bg-black/60 border border-white/[0.08] p-4 flex flex-col gap-3">
            <div class="flex justify-between items-center text-xs text-secondary/60">
              <span class="font-bold text-accent">[02] LIVE ASCII RENDER</span>
              <span>{{ activeProject.resolution }} cols // color: {{ activeProject.colorMode || 'mono' }}</span>
            </div>
            <div class="relative w-full h-[400px] overflow-hidden bg-[#030303]">
              <AsciiImage 
                :key="`${activeProject.id}-${activeProject.resolution}-${activeProject.invert}-${activeProject.brightness}-${activeProject.contrast}-${activeProject.charSpacing}-${activeProject.charRamp}-${activeProject.tintColor}-${activeProject.colorMode}`"
                :src="activeProject.src" 
                :alt="activeProject.name"
                :resolution="activeProject.resolution"
                :invert="activeProject.invert"
                :brightness="activeProject.brightness"
                :contrast="activeProject.contrast"
                :char-spacing="activeProject.charSpacing"
                :char-ramp="activeProject.charRamp"
                :tint-color="activeProject.tintColor"
                :color-mode="activeProject.colorMode"
                mode="always-ascii"
              />
            </div>
          </div>
        </div>

        <!-- Mode 2: Interactive Hover Test (Simulating Project Card) -->
        <div v-else-if="viewMode === 'interactive-hover'" class="flex flex-col gap-3">
          <div class="text-xs text-secondary/60">
            Hover over the card to test the dissolve transition between ASCII (default) and Photo:
          </div>
          <div class="w-full h-[450px] overflow-hidden relative border border-white/[0.1] group shadow-2xl bg-black">
            <AsciiImage 
              :key="`${activeProject.id}-${activeProject.resolution}-${activeProject.invert}-${activeProject.brightness}-${activeProject.contrast}-${activeProject.charSpacing}-${activeProject.charRamp}-${activeProject.tintColor}-${activeProject.colorMode}`"
              :src="activeProject.src" 
              :alt="activeProject.name"
              :resolution="activeProject.resolution"
              :invert="activeProject.invert"
              :brightness="activeProject.brightness"
              :contrast="activeProject.contrast"
              :char-spacing="activeProject.charSpacing"
              :char-ramp="activeProject.charRamp"
              :tint-color="activeProject.tintColor"
              :color-mode="activeProject.colorMode"
              mode="default-ascii"
            />
            <div class="absolute bottom-6 left-6 z-20 pointer-events-none">
              <span class="text-accent text-[10px] tracking-widest uppercase font-bold px-2 py-1 bg-black/60 border border-accent/20">
                HOVER TO REVEAL PHOTO
              </span>
              <h3 class="text-2xl font-bold text-white mt-2">{{ activeProject.name }}</h3>
            </div>
          </div>
        </div>

        <!-- Mode 3: ASCII Full Screen -->
        <div v-else class="w-full h-[600px] overflow-hidden relative border border-white/[0.1] bg-black">
          <AsciiImage 
            :key="`${activeProject.id}-${activeProject.resolution}-${activeProject.invert}-${activeProject.brightness}-${activeProject.contrast}-${activeProject.charSpacing}-${activeProject.charRamp}-${activeProject.tintColor}-${activeProject.colorMode}`"
            :src="activeProject.src" 
            :alt="activeProject.name"
            :resolution="activeProject.resolution"
            :invert="activeProject.invert"
            :brightness="activeProject.brightness"
            :contrast="activeProject.contrast"
            :char-spacing="activeProject.charSpacing"
            :char-ramp="activeProject.charRamp"
            :tint-color="activeProject.tintColor"
            :color-mode="activeProject.colorMode"
            mode="always-ascii"
          />
        </div>

        <!-- Generated Vue Props Code Box -->
        <div class="bg-black/80 border border-white/[0.08] p-5 flex flex-col gap-2">
          <div class="flex justify-between items-center text-xs text-secondary/60">
            <span>GENERATED VUE CODE FOR THIS IMAGE:</span>
            <button @click="copyCode" class="text-accent hover:underline text-[11px]">Copy snippet</button>
          </div>
          <pre class="text-[12px] text-accent/90 bg-black/90 p-4 overflow-x-auto border border-white/[0.04]"><code>&lt;AsciiImage 
  src="{{ activeProject.src }}" 
  alt="{{ activeProject.name }}"
  :resolution="{{ activeProject.resolution }}"
  :invert="{{ activeProject.invert }}"
  :brightness="{{ activeProject.brightness }}"
  :contrast="{{ activeProject.contrast }}"
  :char-spacing="{{ activeProject.charSpacing }}"
  char-ramp="{{ activeProject.charRamp }}"
  color-mode="{{ activeProject.colorMode || 'monochrome' }}"
  tint-color="{{ activeProject.tintColor }}"
/&gt;</code></pre>
        </div>

      </div>

    </div>
  </div>
</template>
