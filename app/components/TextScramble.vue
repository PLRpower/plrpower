<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

const props = withDefaults(defineProps<{
  text: string
  tag?: string
  delay?: number
  duration?: number
  triggerOnScroll?: boolean
}>(), {
  tag: 'span',
  delay: 0,
  duration: 1500,
  triggerOnScroll: true
})

const containerRef = ref<HTMLElement | null>(null)
const isAnimating = ref(false)
const isComplete = ref(false)
const displayText = ref(props.text)

const scramblePool = '!@#$%^&*+=/?~.:;'
let animationFrameId: number | null = null
let observer: IntersectionObserver | null = null
let startTime = 0

const charTimings = computed(() => {
  return props.text.split('').map((char, i) => {
    if (char === ' ') return 0
    const progress = i / Math.max(props.text.length - 1, 1)
    return props.delay + progress * props.duration * 0.6 + Math.random() * props.duration * 0.35
  })
})

const animate = (timestamp: number) => {
  if (!startTime) startTime = timestamp
  const elapsed = timestamp - startTime

  let allResolved = true
  const chars = props.text.split('')
  const result: string[] = []

  for (let i = 0; i < chars.length; i++) {
    if (chars[i] === ' ') {
      result.push(' ')
      continue
    }
    
    if (elapsed >= (charTimings.value[i] || 0)) {
      result.push(chars[i] || ' ')
    } else {
      result.push(scramblePool[Math.floor(Math.random() * scramblePool.length)] || '.')
      allResolved = false
    }
  }

  displayText.value = result.join('')

  if (allResolved) {
    displayText.value = props.text
    isAnimating.value = false
    isComplete.value = true
    return
  }

  animationFrameId = requestAnimationFrame(animate)
}

const startAnimation = () => {
  if (isAnimating.value || isComplete.value) return
  isAnimating.value = true
  startTime = 0
  animationFrameId = requestAnimationFrame(animate)
}

onMounted(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion) {
    isComplete.value = true
    return
  }

  if (props.triggerOnScroll && containerRef.value) {
    observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          startAnimation()
          observer?.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(containerRef.value)
  } else if (!props.triggerOnScroll) {
    setTimeout(startAnimation, props.delay)
  }
})

onBeforeUnmount(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  observer?.disconnect()
})
</script>

<template>
  <component :is="tag" ref="containerRef" class="text-scramble" :class="{ 'text-accent/90 font-mono': isAnimating }">
    {{ displayText }}
  </component>
</template>

<style scoped>
.text-scramble {
  display: inline;
}
</style>
