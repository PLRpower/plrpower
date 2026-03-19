<script setup lang="ts">
// Hero component - structural wrapper
const props = defineProps<{
  year?: string;
  subtitle?: string;
}>();
</script>

<template>
  <div class="hero">
    <main class="hero-content">

      <div class="intro-handwritten animate-fade-in" style="animation-delay: 0.2s">
        Hello, i am
      </div>

      <AsciiBanner :delay="900" />

      <div class="subtitle-wrap animate-fade-in" style="animation-delay: 4.5s">
        <h2 class="hero-subtitle"><span class="handwritten-inline">An</span> Engineering Student & <span class="accent-text">Apprentice</span></h2>
        <p class="tagline">
          <span class="handwritten-inline">Seeking a</span> 3-month international internship in AI, Embedded Systems or Software Development.
        </p>
      </div>
    </main>

    <footer class="hero-footer">
      <div class="scroll-indicator">
        <span class="scroll-text">Scroll</span>
        <div class="scroll-line"></div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.hero {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 40px;
  position: relative;
  z-index: 10;
}

.hero-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: left;
}

.top-meta {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  letter-spacing: 0.4em;
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.intro-handwritten {
  font-family: 'Caveat', cursive;
  font-size: clamp(2rem, 6vw, 3rem);
  color: var(--text-secondary);
  margin-bottom: -1rem;
  margin-left: 0;
  opacity: 0.8;
  letter-spacing: 0.05em;
}

.hero-subtitle {
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  font-weight: 600;
  letter-spacing: 0.1em;
  color: var(--text-primary);
  margin-top: 1.5rem;
}

.handwritten-inline {
  font-family: 'Caveat', cursive;
  font-size: clamp(1.4rem, 3.5vw, 2.1rem); 
  vertical-align: baseline;
  color: var(--text-secondary);
  font-weight: 400;
  margin-right: 0.3rem;
}

.tagline {
  font-size: clamp(0.9rem, 1.5vw, 1.1rem);
  color: var(--text-secondary);
  margin-top: 0.8rem;
  max-width: 600px;
  line-height: 1.6;
}

.accent-text {
  color: var(--text-secondary);
  font-weight: 400;
}

.subtitle-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.hero-footer {
  display: flex;
  justify-content: center;
  align-items: center;
}

.scroll-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.scroll-text {
  font-size: 0.6rem;
  letter-spacing: 0.3em;
  color: var(--text-secondary);
}

.scroll-line {
  width: 1px;
  height: 60px;
  background: linear-gradient(to bottom, var(--text-secondary), transparent);
  position: relative;
  overflow: hidden;
}

.scroll-line::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  animation: scrollIndicator 2s cubic-bezier(0.15, 0.41, 0.69, 0.94) infinite;
}

@keyframes scrollIndicator {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}

.animate-fade-in {
  opacity: 0;
  animation: fadeIn 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .hero {
    padding: 20px;
  }
}
</style>
