<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps<{
  text: string
}>()

const titleRef = ref<HTMLElement | null>(null)
const isReady = ref(false)
const isVisible = ref(false)
let observer: IntersectionObserver | null = null

const words = computed(() => props.text.split(' '))

onMounted(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reduceMotion || !titleRef.value) {
    isVisible.value = true
    return
  }

  isReady.value = true
  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return
      isVisible.value = true
      observer?.disconnect()
    },
    { threshold: 0.45 }
  )
  observer.observe(titleRef.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <span
    ref="titleRef"
    class="section-title-reveal"
    :class="{ 'is-ready': isReady, 'is-visible': isVisible }"
  >
    <span
      v-for="(word, index) in words"
      :key="`${word}-${index}`"
      class="word-clip"
    >
      <span class="word" :style="{ '--word-index': index }">{{ word }}</span>
    </span>
    <span class="light-trail" aria-hidden="true"></span>
  </span>
</template>

<style scoped>
.section-title-reveal {
  position: relative;
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0 0.24em;
  padding-bottom: 0.12em;
}

.word-clip {
  display: inline-block;
  overflow: hidden;
  padding: 0.08em 0;
  margin: -0.08em 0;
}

.word {
  display: inline-block;
  transform-origin: left bottom;
  --word-index: 0;
}

.light-trail {
  position: absolute;
  left: 0;
  bottom: 0;
  width: min(68%, 6em);
  height: 1px;
  background: linear-gradient(90deg, var(--accent-color), #14b8a6, transparent);
  box-shadow: 0 0 14px rgba(45, 212, 191, 0.35);
  transform-origin: left;
}

.is-ready:not(.is-visible) .word {
  opacity: 0;
  transform: translateY(115%) rotate(3deg);
}

.is-ready.is-visible .word {
  animation: word-rise 850ms cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: calc(var(--word-index) * 110ms);
}

.is-ready:not(.is-visible) .light-trail {
  opacity: 0;
  transform: scaleX(0);
}

.is-ready.is-visible .light-trail {
  animation: trail-draw 1s cubic-bezier(0.16, 1, 0.3, 1) 220ms both;
}

@keyframes word-rise {
  from {
    opacity: 0;
    transform: translateY(115%) rotate(3deg);
  }
  to {
    opacity: 1;
    transform: translateY(0) rotate(0);
  }
}

@keyframes trail-draw {
  from {
    opacity: 0;
    transform: scaleX(0);
  }
  35% { opacity: 1; }
  to {
    opacity: 0.65;
    transform: scaleX(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .word,
  .light-trail {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
</style>
