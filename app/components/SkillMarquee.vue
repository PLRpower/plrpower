<script setup lang="ts">
withDefaults(defineProps<{
  skills: string[]
  direction?: 'left' | 'right'
  speed?: number
  pauseOnHover?: boolean
}>(), {
  direction: 'left',
  speed: 30,
  pauseOnHover: true
})
</script>

<template>
  <div class="marquee-container relative overflow-hidden" :class="{ 'pause-on-hover': pauseOnHover }">
    <!-- Edge fades -->
    <div class="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-bg-primary to-transparent z-10 pointer-events-none"></div>
    <div class="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-bg-primary to-transparent z-10 pointer-events-none"></div>
    
    <div 
      class="marquee-track flex gap-4 w-max"
      :class="direction === 'right' ? 'animate-marquee-right' : 'animate-marquee-left'"
      :style="{ animationDuration: `${speed}s` }"
    >
      <template v-for="repeat in 3" :key="repeat">
        <span 
          v-for="skill in skills" 
          :key="`${repeat}-${skill}`"
          class="marquee-tag shrink-0 px-5 py-2.5 font-mono text-[0.8rem] tracking-wide rounded-full border border-white/[0.06] bg-white/[0.02] light:border-black/10 light:bg-black/5 text-secondary/70 whitespace-nowrap transition-all duration-300 hover:text-accent hover:border-accent/30 hover:bg-accent/[0.05] hover:shadow-[0_0_20px_rgba(45,212,191,0.1)] cursor-default select-none"
        >
          {{ skill }}
        </span>
      </template>
    </div>
  </div>
</template>

<style scoped>
@keyframes marquee-left {
  from { transform: translateX(0); }
  to { transform: translateX(-33.333%); }
}

@keyframes marquee-right {
  from { transform: translateX(-33.333%); }
  to { transform: translateX(0); }
}

.animate-marquee-left {
  animation: marquee-left linear infinite;
}

.animate-marquee-right {
  animation: marquee-right linear infinite;
}

.pause-on-hover:hover .marquee-track {
  animation-play-state: paused;
}
</style>
