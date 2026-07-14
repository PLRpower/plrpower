<template>
  <div class="selection:bg-accent selection:text-black light:selection:text-white">
    <Hero />
    
    <LazyAboutSection />
    <LazyProjectsSection />
    <LazyExperienceSection />
    <LazyEducationSection />
    <LazySkillsSection />
    <LazyAwardsSection />
    <LazyContactSection />

    <!-- Footer -->
    <footer class="mt-32 py-4 px-6 md:px-10 bg-accent light:bg-teal-200 text-[#030303]">
      <div class="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="font-mono text-[0.65rem] text-[#030303]/80 font-semibold tracking-[0.2em] uppercase">
          Portfolio · Paul Thomas · {{ new Date().getFullYear() }}
        </p>
        <a href="/CV_Paul_Thomas.pdf" download class="font-mono text-[0.65rem] text-[#030303] font-bold hover:text-[#030303]/60 tracking-wider no-underline transition-colors duration-300 flex items-center gap-1.5">
          <Icon name="uil:file-download" size="14px" />
          Download CV
        </a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// ─── SEO ───────────────────────────────────────────────────────────

useSeoMeta({
  title: 'Paul Thomas — AI / ML, Embedded Systems & Full-Stack Developer',
  description: 'Passionate Computer Science student specializing in AI & Machine Learning, Embedded Systems, and Application Development. Seeking an international internship for 2027.',
  ogTitle: 'Paul Thomas — Computer Science Student & Developer Portfolio',
  ogDescription: 'Explore my projects in AI & Machine Learning, Federated Learning, and Embedded Systems.',
  ogImage: '/images/og-image.webp',
  twitterCard: 'summary_large_image',
});
</script>
