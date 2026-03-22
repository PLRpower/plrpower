<script setup lang="ts">
const route = useRoute();
const projectId = route.params.id as string;

// On récupère les données (à terme elles seront centralisées)
const projects = [
  {
    id: 'federated-learning',
    title: 'Federated Learning — Lab',
    label: 'Research & ML',
    tech: 'Distributed ML | Python | TensorFlow/PyTorch',
    description: 'Implementation and research on Federated Learning models in a professional research lab context at LINEACT Research Laboratory.',
    image: '/images/projects/federated-learning.webp'
  },
  {
    id: 'minecraft-server',
    title: 'Minecraft Server — Exolia',
    label: 'Server Architecture',
    tech: 'Java | Architecture | Team Management',
    description: 'Built and managed a Minecraft server reaching 500+ registered players, including mod/plugin development and team coordination.',
  },
  {
    id: 'chess-engine',
    title: 'Chess Engine',
    label: 'AI & Algorithms',
    tech: 'C / C++ | Algorithms | AI',
    description: 'Built a chess engine from scratch, implementing move generation, game tree search and evaluation functions.',
  },
  {
    id: 'chess-clock',
    title: 'Chess Clock — ESP32',
    label: 'Embedded Systems',
    tech: 'C | Systems | ESP32',
    description: 'Designed and programmed a chess clock on ESP32 microcontroller, illustrating concrete hardware expertise.',
  },
  {
    id: 'conway-game-of-life',
    title: 'Conway\'s Game of Life',
    label: 'Simulation',
    tech: 'C++ | Simulation | OOP',
    description: 'Full implementation of Conway\'s Game of Life with custom rendering and optimized object-oriented design.',
  },
  {
    id: 'a-la-carte',
    title: 'A la carte',
    label: 'Mobile App',
    tech: 'Vue/Nuxt | Mobile Dev | SQL',
    description: 'Mobile application for storing recipes easily and simplifying daily kitchen management.',
  }
];

const project = computed(() => projects.find(p => p.id === projectId));

if (!project.value) {
  throw showError({ statusCode: 404, statusMessage: 'Project not found' });
}
</script>

<template>
  <div class="project-detail-container" v-if="project">
    <div class="back-link-wrapper">
      <NuxtLink to="/#projects" class="back-link">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5m7 7l-7-7 7-7"/></svg>
        Back to projects
      </NuxtLink>
    </div>

    <header class="project-detail-header">
      <span class="project-label">{{ project.label }}</span>
      <h1 class="project-title">{{ project.title }}</h1>
      <p class="project-tech">{{ project.tech }}</p>
    </header>

    <div class="project-visual-wrapper" v-if="project.image">
      <div class="image-container">
        <img :src="project.image" :alt="project.title" />
      </div>
    </div>

    <div class="project-description-section">
      <h2 class="section-subtitle">Project Overview</h2>
      <p class="description-text">{{ project.description }}</p>
      
      <div class="info-placeholder">
        <p>Plus d'informations sur ce projet seront ajoutées prochainement...</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-detail-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 120px 40px 100px;
}

.back-link-wrapper {
  margin-bottom: 3rem;
  animation: fadeIn 0.8s ease forwards;
}

.back-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: 0.85rem;
  transition: all 0.3s ease;
}

.back-link:hover {
  color: var(--accent-color);
  transform: translateX(-5px);
}

.back-link svg {
  width: 18px;
  height: 18px;
}

.project-detail-header {
  margin-bottom: 4rem;
  animation: fadeIn 1s ease forwards;
  animation-delay: 0.1s;
}

.project-label {
  font-family: var(--font-mono);
  color: var(--accent-color);
  font-size: 0.9rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.project-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin: 1rem 0;
  font-weight: 700;
}

.project-tech {
  font-family: var(--font-mono);
  color: var(--text-secondary);
  font-size: 1rem;
}

.project-visual-wrapper {
  margin-bottom: 5rem;
  animation: fadeIn 1.2s ease forwards;
  animation-delay: 0.2s;
}

.image-container {
  width: 100%;
  background: #ffffff;
  padding: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-container img {
  max-width: 100%;
  height: auto;
  box-shadow: 0 20px 50px rgba(0,0,0,0.1);
}

.project-description-section {
  max-width: 800px;
  animation: fadeIn 1.4s ease forwards;
  animation-delay: 0.3s;
}

.section-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.description-text {
  font-size: 1.15rem;
  line-height: 1.8;
  color: var(--text-secondary);
  margin-bottom: 3rem;
}

.info-placeholder {
  border-left: 2px solid var(--accent-color);
  padding: 1.5rem 2rem;
  background: rgba(52, 211, 153, 0.03);
  font-style: italic;
  color: var(--text-secondary);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .project-detail-container {
    padding: 100px 24px 60px;
  }
}
</style>
