<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    text: string;
    to?: string;
    href?: string;
    target?: string;
    num?: string;
    active?: boolean;
    as?: string;
  }>(),
  {
    target: '_self',
    active: false,
  }
);

const glyphPool = ['*', '#', '+', '%', '$', '@', '0', '1', '8', 'X', '_', '~', '&', '/'];

// Deterministic or seeded pseudo-random reel per char for performance
const charReels = computed(() => {
  return props.text.split('').map((char, index) => {
    if (char === ' ') return { char: ' ', reel: [' ', ' ', ' ', ' ', ' '] };
    
    // Pick 3 pseudo-random intermediate glyphs
    const g1 = glyphPool[(char.charCodeAt(0) + index * 3) % glyphPool.length];
    const g2 = glyphPool[(char.charCodeAt(0) * 7 + index * 5) % glyphPool.length];
    const g3 = glyphPool[(char.charCodeAt(0) * 13 + index * 7) % glyphPool.length];
    
    return {
      char,
      reel: [char, g1, g2, g3, char]
    };
  });
});
</script>

<template>
  <NuxtLink
    v-if="to && as !== 'span'"
    :to="to"
    class="ascii-odometer-link group inline-flex items-center gap-1.5 font-mono no-underline select-none cursor-pointer"
  >
    <!-- Optional Prefix Number -->
    <span v-if="num" class="text-accent/60 group-hover:text-accent transition-colors duration-300">
      {{ num }}.
    </span>

    <!-- Screen-reader accessible label -->
    <span class="sr-only">{{ text }}</span>

    <!-- Visual glyph reel container -->
    <span aria-hidden="true" class="inline-flex items-center overflow-hidden">
      <span
        v-for="(item, i) in charReels"
        :key="i"
        class="char-slot relative inline-block h-[1.15em] overflow-hidden align-baseline"
      >
        <!-- Invisible ghost char to set exact dimensions -->
        <span class="invisible block leading-[1.15em]">{{ item.char === ' ' ? '&nbsp;' : item.char }}</span>

        <!-- Rolling reel -->
        <span
          class="char-reel absolute inset-x-0 top-0 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-[4.6em]"
          :style="{ transitionDelay: `${i * 22}ms` }"
        >
          <span
            v-for="(g, gi) in item.reel"
            :key="gi"
            class="block h-[1.15em] leading-[1.15em] text-center"
            :class="{ 'text-accent': gi > 0 && gi < item.reel.length - 1 }"
          >
            {{ g }}
          </span>
        </span>
      </span>
    </span>

    <slot name="suffix" />
  </NuxtLink>

  <a
    v-else-if="href && as !== 'span'"
    :href="href"
    :target="href?.startsWith('http') ? '_blank' : target"
    :rel="href?.startsWith('http') ? 'noopener noreferrer' : undefined"
    class="ascii-odometer-link group inline-flex items-center gap-1.5 font-mono no-underline select-none cursor-pointer"
  >
    <!-- Optional Prefix Number -->
    <span v-if="num" class="text-accent/60 group-hover:text-accent transition-colors duration-300">
      {{ num }}.
    </span>

    <!-- Screen-reader accessible label -->
    <span class="sr-only">{{ text }}</span>

    <!-- Visual glyph reel container -->
    <span aria-hidden="true" class="inline-flex items-center overflow-hidden">
      <span
        v-for="(item, i) in charReels"
        :key="i"
        class="char-slot relative inline-block h-[1.15em] overflow-hidden align-baseline"
      >
        <!-- Invisible ghost char to set exact dimensions -->
        <span class="invisible block leading-[1.15em]">{{ item.char === ' ' ? '&nbsp;' : item.char }}</span>

        <!-- Rolling reel -->
        <span
          class="char-reel absolute inset-x-0 top-0 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-[4.6em]"
          :style="{ transitionDelay: `${i * 22}ms` }"
        >
          <span
            v-for="(g, gi) in item.reel"
            :key="gi"
            class="block h-[1.15em] leading-[1.15em] text-center"
            :class="{ 'text-accent': gi > 0 && gi < item.reel.length - 1 }"
          >
            {{ g }}
          </span>
        </span>
      </span>
    </span>

    <slot name="suffix" />
  </a>

  <span
    v-else
    class="ascii-odometer-link inline-flex items-center gap-1.5 font-mono select-none"
  >
    <!-- Optional Prefix Number -->
    <span v-if="num" class="text-accent/60 group-hover:text-accent transition-colors duration-300">
      {{ num }}.
    </span>

    <!-- Screen-reader accessible label -->
    <span class="sr-only">{{ text }}</span>

    <!-- Visual glyph reel container -->
    <span aria-hidden="true" class="inline-flex items-center overflow-hidden">
      <span
        v-for="(item, i) in charReels"
        :key="i"
        class="char-slot relative inline-block h-[1.15em] overflow-hidden align-baseline"
      >
        <!-- Invisible ghost char to set exact dimensions -->
        <span class="invisible block leading-[1.15em]">{{ item.char === ' ' ? '&nbsp;' : item.char }}</span>

        <!-- Rolling reel -->
        <span
          class="char-reel absolute inset-x-0 top-0 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-[4.6em]"
          :style="{ transitionDelay: `${i * 22}ms` }"
        >
          <span
            v-for="(g, gi) in item.reel"
            :key="gi"
            class="block h-[1.15em] leading-[1.15em] text-center"
            :class="{ 'text-accent': gi > 0 && gi < item.reel.length - 1 }"
          >
            {{ g }}
          </span>
        </span>
      </span>
    </span>

    <slot name="suffix" />
  </span>
</template>

<style scoped>
.ascii-odometer-link {
  --odometer-speed: 520ms;
}

.char-slot {
  line-height: 1.15em;
}

.char-reel {
  will-change: transform;
}
</style>
