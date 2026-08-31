<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const route = useRoute();

// ─── Live Strasbourg Local Time ──────────────────────────────────────
const localTime = ref('');
let timer: ReturnType<typeof setInterval> | null = null;

const updateTime = () => {
  try {
    localTime.value = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Paris',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(new Date());
  } catch {
    localTime.value = new Date().toLocaleTimeString('en-GB');
  }
};

onMounted(() => {
  updateTime();
  timer = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});

const getNavLink = (href: string) => {
  if (route.path === '/') return href;
  return '/' + href;
};

const navLinks = [
  { name: 'About', href: '#about', num: '01' },
  { name: 'Projects', href: '#projects', num: '02' },
  { name: 'Experience', href: '#experience', num: '03' },
  { name: 'Education', href: '#education', num: '04' },
  { name: 'Skills', href: '#skills', num: '05' },
  { name: 'Awards', href: '#awards', num: '06' },
  { name: 'Contact', href: '#contact', num: '07' },
];

const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="relative z-20 border-t border-white/[0.08] bg-[#050505]/95 backdrop-blur-xl overflow-hidden">
    <!-- Top accent glow line -->
    <div class="h-px w-full bg-gradient-to-r from-transparent via-accent/40 to-transparent"></div>

    <div class="max-w-[1400px] mx-auto px-6 md:px-10 pt-14 pb-12">
      <!-- Main Footer Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-14 border-b border-white/[0.06]">
        
        <!-- Left Column: ASCII Banner, Bio & Live Status (6 cols) -->
        <div class="lg:col-span-6 flex flex-col justify-between gap-6">
          <div class="space-y-4">
            <!-- ASCII Art Banner Signature inside the section -->
            <div class="w-full max-w-[440px] sm:max-w-[500px] select-none pointer-events-none opacity-85 hover:opacity-100 transition-opacity">
              <AsciiBanner :animated="false" />
            </div>
            
            <p class="text-sm text-secondary/70 leading-relaxed max-w-md font-sans">
              Computer Science student specializing in AI / Machine Learning, Embedded Systems, and Web Engineering.
            </p>
          </div>

          <!-- Live Status & Location Badge -->
          <div class="inline-flex flex-col gap-2.5 pt-2">
            <!-- Internship Availability (rounded) -->
            <div class="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs w-fit">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for Internship • June–July 2027</span>
            </div>

            <!-- Location & Local Time -->
            <div class="flex items-center gap-3 text-secondary/60 font-mono text-[0.75rem] pl-0.5">
              <span class="flex items-center gap-1.5">
                <Icon name="ph:map-pin" size="14px" class="text-accent" />
                <span>Strasbourg, France</span>
              </span>
              <span class="text-white/20">•</span>
              <ClientOnly>
                <span class="flex items-center gap-1.5">
                  <Icon name="ph:clock" size="14px" class="text-accent" />
                  <span>{{ localTime }}</span>
                </span>
                <!--suppress VueUnrecognizedSlot -->
                <template #fallback>
                  <span class="flex items-center gap-1.5">
                    <Icon name="ph:clock" size="14px" class="text-accent" />
                    <span>--:--:--</span>
                  </span>
                </template>
              </ClientOnly>
            </div>
          </div>
        </div>

        <!-- Middle Column: Navigation (3 cols) -->
        <div class="lg:col-span-3 flex flex-col justify-start">
          <span class="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-accent font-semibold block mb-4">
            Navigation
          </span>
          
          <div class="flex flex-col gap-2">
            <NuxtLink
              v-for="item in navLinks"
              :key="item.name"
              :to="getNavLink(item.href)"
              class="group inline-flex items-center gap-2 text-secondary/70 hover:text-primary font-mono text-xs transition-colors duration-200"
            >
              <span class="text-secondary/40 group-hover:text-accent transition-colors duration-200">{{ item.num }}.</span>
              <span>{{ item.name }}</span>
            </NuxtLink>

            <!-- All Works Link -->
            <NuxtLink
              to="/projects"
              class="group inline-flex items-center gap-2 text-secondary/70 hover:text-primary font-mono text-xs transition-colors duration-200 mt-1"
            >
              <span class="text-accent/60 group-hover:text-accent">→</span>
              <span>All Works</span>
            </NuxtLink>
          </div>
        </div>

        <!-- Right Column: Connect & Actions (3 cols) -->
        <div class="lg:col-span-3 flex flex-col justify-start items-start lg:items-end">
          <div class="w-full flex flex-col items-start lg:items-end gap-4">
            <span class="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-accent font-semibold block">
              Connect
            </span>

            <!-- Social Links Grid (sharp corners) -->
            <div class="flex flex-col gap-2 w-full max-w-[200px]">
              <a
                href="mailto:paul.thomas.stras@gmail.com"
                class="flex items-center justify-between px-3 py-2 border border-white/[0.06] bg-white/[0.02] font-mono text-xs text-secondary/80 hover:text-accent hover:border-accent/30 hover:bg-accent/[0.04] transition-all duration-300 group"
              >
                <span class="flex items-center gap-2">
                  <Icon name="uil:envelope" size="15px" class="group-hover:text-accent transition-colors" />
                  <span>Email</span>
                </span>
                <Icon name="material-symbols:arrow-outward" size="12px" class="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <a
                href="https://github.com/PLRpower"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-between px-3 py-2 border border-white/[0.06] bg-white/[0.02] font-mono text-xs text-secondary/80 hover:text-accent hover:border-accent/30 hover:bg-accent/[0.04] transition-all duration-300 group"
              >
                <span class="flex items-center gap-2">
                  <Icon name="uil:github" size="15px" class="group-hover:text-accent transition-colors" />
                  <span>GitHub</span>
                </span>
                <Icon name="material-symbols:arrow-outward" size="12px" class="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <a
                href="https://www.linkedin.com/in/paul-thomas-strasbourg/"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-between px-3 py-2 border border-white/[0.06] bg-white/[0.02] font-mono text-xs text-secondary/80 hover:text-accent hover:border-accent/30 hover:bg-accent/[0.04] transition-all duration-300 group"
              >
                <span class="flex items-center gap-2">
                  <Icon name="uil:linkedin" size="15px" class="group-hover:text-accent transition-colors" />
                  <span>LinkedIn</span>
                </span>
                <Icon name="material-symbols:arrow-outward" size="12px" class="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <a
                href="/CV_Paul_Thomas.pdf"
                download
                class="flex items-center justify-between px-3 py-2 border border-accent/20 bg-accent/[0.05] font-mono text-xs text-accent hover:bg-accent hover:text-black transition-all duration-300 group"
              >
                <span class="flex items-center gap-2 font-medium">
                  <Icon name="uil:file-download" size="15px" />
                  <span>Download CV</span>
                </span>
                <span class="text-[10px] opacity-70 group-hover:opacity-100 font-bold">[PDF]</span>
              </a>
            </div>
          </div>
        </div>

      </div>

      <!-- Bottom Bar: Copyright & How it was built link -->
      <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-secondary/50">
        <div>
          <span>© {{ currentYear }} Paul Thomas</span>
        </div>

        <div>
          <NuxtLink
            to="/behind-the-scenes"
            class="inline-flex items-center gap-1.5 text-secondary/60 hover:text-accent transition-colors duration-200 group"
          >
            <span>Behind the scenes</span>
            <Icon name="material-symbols:arrow-outward" size="13px" class="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
</style>
