<template>
  <div class="content-wrapper">
    <!-- SECTION 01: ABOUT -->
    <section id="about" class="section-container">
      <div class="section-header">
        <span class="section-number">01.</span>
        <h2 class="section-title">About Me</h2>
      </div>
      <div class="section-content">
        <p class="about-text">
          Passionate Computer Science student with a strong interest in Artificial Intelligence, Embedded Systems, and Application Development. 
          Currently looking for a <span class="highlight">3-month internship abroad</span> starting in 2026 to expand my cross-cultural perspectives and technical expertise.
        </p>
      </div>
    </section>

    <!-- SECTION 02: SKILLS -->
    <section id="skills" class="section-container">
      <div class="section-header">
        <span class="section-number">02.</span>
        <h2 class="section-title">Technical Skills</h2>
      </div>
      <div class="skills-grid">
        <div class="skill-category">
          <h3 class="category-title">AI & Data</h3>
          <ul class="skill-list">
            <li>Machine Learning</li>
            <li>Deep Learning</li>
            <li>Neural Networks</li>
            <li>Python / PyTorch</li>
          </ul>
        </div>
        <div class="skill-category">
          <h3 class="category-title">Systems & Embedded</h3>
          <ul class="skill-list">
            <li>C / C++</li>
            <li>RTOS / Linux</li>
            <li>Microcontrollers (STM32, ESP32)</li>
            <li>Hardware Abstraction</li>
          </ul>
        </div>
        <div class="skill-category">
          <h3 class="category-title">Application Development</h3>
          <ul class="skill-list">
            <li>Vue.js / Nuxt</li>
            <li>Node.js</li>
            <li>Mobile (Flutter/Native)</li>
            <li>UI/UX Design</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- SECTION 03: PROJECTS -->
    <section id="projects" class="section-container">
      <div class="section-header">
        <span class="section-number">03.</span>
        <h2 class="section-title">Featured Projects</h2>
      </div>
      <p class="placeholder-text">Curating my most representative projects... Stay tuned.</p>
    </section>

    <!-- SECTION 04: CONTACT -->
    <section id="contact" class="section-container">
      <div class="section-header">
        <span class="section-number">04.</span>
        <h2 class="section-title">Connect</h2>
      </div>
      <div class="contact-links">
        <a href="#" class="contact-link">Github</a>
        <a href="#" class="contact-link">Linkedin</a>
        <a href="#" class="contact-link">Email</a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// On pourra ajouter ici l'intersection observer pour les animations de scroll
</script>

<style scoped>
.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px 100px;
}

.section-container {
  margin-top: 20rem; /* On laisse de l'espace après le Hero */
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 3.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 1rem;
}

.section-number {
  font-family: var(--font-mono);
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.section-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  letter-spacing: -0.02em;
}

.section-content {
  max-width: 850px;
}

.about-text {
  font-size: 1.5rem;
  line-height: 1.6;
  color: var(--text-secondary);
}

.highlight {
  color: var(--text-primary);
  font-weight: 600;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 3rem;
  margin-top: 2rem;
}

.category-title {
  font-family: var(--font-mono);
  font-size: 0.9rem;
  letter-spacing: 0.1em;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.skill-list {
  list-style: none;
  padding: 0;
}

.skill-list li {
  font-size: 1.25rem;
  padding: 0.5rem 0;
  color: var(--text-primary);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.placeholder-text {
  color: var(--text-secondary);
  font-style: italic;
}

.contact-links {
  display: flex;
  gap: 3rem;
  margin-top: 2rem;
}

.contact-link {
  font-family: var(--font-mono);
  font-size: 1.5rem;
  color: var(--text-primary);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: all 0.3s ease;
}

.contact-link:hover {
  border-bottom: 1px solid var(--text-primary);
  opacity: 0.7;
}

@media (max-width: 768px) {
  .content-wrapper {
    padding: 0 20px 60px;
  }
  
  .section-container {
    margin-top: 10rem;
  }
}
</style>
