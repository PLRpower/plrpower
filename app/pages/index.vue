<template>
  <div class="selection:bg-accent selection:text-black">
    <Hero />
    
    <AboutSection />
    <ProjectsSection />
    <ExperienceSection />
    <EducationSection />
    <SkillsSection />
    <AwardsSection />
    <ContactSection />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

// ─── SEO ───────────────────────────────────────────────────────────

useSeoMeta({
  title: 'Paul Thomas — AI / ML, Embedded Systems & Full-Stack Developer',
  description: 'Passionate Computer Science student specializing in AI & Machine Learning, Embedded Systems, and Application Development. Seeking a 3 to 4-month international internship starting June–July 2027.',
  ogTitle: 'Paul Thomas — Computer Science Student Portfolio',
  ogDescription: 'Explore my projects in AI & Machine Learning, Federated Learning, and Embedded Systems.',
  ogImage: '/images/og-image.webp',
  twitterCard: 'summary_large_image',
});

onMounted(() => {
  if (import.meta.client && !window.location.hash) {
    window.scrollTo(0, 0);
  }
});
</script>

