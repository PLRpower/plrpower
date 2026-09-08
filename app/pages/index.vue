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
  title: 'Paul Thomas — AI & Embedded Systems Engineer | CS Student & Researcher',
  description: 'CS engineering student & apprentice researcher at LINEACT Laboratory in AI, Embedded Systems and Federated Learning. Seeking an international internship for 2027.',
  keywords: 'Paul Thomas, Engineer, Researcher, Student, Internship, Federated Learning, Laboratory, Apprentice, Artificial Intelligence, Machine learning, Embedded, Systems',
  ogTitle: 'Paul Thomas — AI & Embedded Systems Engineer | CS Student & Researcher',
  ogDescription: 'CS engineering student & apprentice researcher at LINEACT Laboratory in AI, Embedded Systems and Federated Learning. Seeking an international internship for 2027.',
  ogImage: '/images/og-image.webp',
  twitterCard: 'summary_large_image',
});

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Paul Thomas',
        jobTitle: 'AI & Embedded Systems Engineering Student & Apprentice Researcher',
        description: 'CS engineering student and apprentice researcher at LINEACT Laboratory specializing in Artificial Intelligence, Machine Learning, Embedded Systems, and Federated Learning.',
        url: 'https://paul-thomas.vercel.app',
        sameAs: [
          'https://github.com/PLRpower',
          'https://www.linkedin.com/in/paul-thomas-strasbourg/'
        ],
        knowsAbout: [
          'Artificial Intelligence',
          'Machine Learning',
          'Embedded Systems',
          'Federated Learning',
          'Systems Engineering',
          'Research'
        ],
        worksFor: {
          '@type': 'ResearchOrganization',
          name: 'LINEACT Research Laboratory'
        },
        alumniOf: {
          '@type': 'EducationalOrganization',
          name: 'CESI Graduate School of Engineering'
        }
      })
    }
  ]
});

onMounted(() => {
  if (import.meta.client && !window.location.hash) {
    window.scrollTo(0, 0);
  }
});
</script>

