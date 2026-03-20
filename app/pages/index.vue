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
          Passionate Computer Science student specializing in AI, Embedded Systems, and Application Development. Currently in apprenticeship at the LINEACT Research Laboratory, working mainly on Federated Learning, and seeking a 3-month internship abroad in 2026 to expand my technical expertise internationally.        </p>
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
          <h3 class="category-title">AI & Data Engineering</h3>
          <ul class="skill-list">
            <li>Python | TensorFlow / PyTorch</li>
            <li>Machine Learning / Deep Learning</li>
            <li>Neural Networks Architecture</li>
            <li>Federated Learning</li>
            <li>Advanced Algorithms & Data Structures</li>
          </ul>
        </div>
        <div class="skill-category">
          <h3 class="category-title">Systems & Embedded</h3>
          <ul class="skill-list">
            <li>Real-time Systems (RTOS)</li>
            <li>C / C++ | Linux Kernels</li>
            <li>System Performance Optimization</li>
            <li>Microcontrollers & Sensors</li>
            <li>Object-Oriented Programming (OOP)</li>
          </ul>
        </div>
        <div class="skill-category">
          <h3 class="category-title">Application Development</h3>
          <ul class="skill-list">
            <li>Modern Web | Vue / React</li>
            <li>Node.js / API Design</li>
            <li>SQL & Databases</li>
            <li>Docker | Git | CI/CD</li>
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
      <div class="projects-carousel-wrapper">
        <button class="carousel-btn prev" @click="scrollProjects('left')" aria-label="Previous project">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        
        <div class="projects-carousel" ref="carouselRef">
          <div class="project-card">
            <div class="project-header">
              <span class="project-label">Research & ML</span>
              <h3 class="project-title">Federated Learning — Lab</h3>
            </div>
            <p class="project-tech">Distributed ML | Python | TensorFlow/PyTorch</p>
            <p class="project-description">Implementation and research on Federated Learning models in a professional research lab context at LINEACT Research Laboratory.</p>
          </div>

          <div class="project-card">
            <div class="project-header">
              <span class="project-label">Server Architecture</span>
              <h3 class="project-title">Minecraft Server — Exolia</h3>
            </div>
            <p class="project-tech">Java | Architecture | Team Management</p>
            <p class="project-description">Built and managed a Minecraft server reaching <span class="highlight">500+ registered players</span>, including mod/plugin development and team coordination.</p>
          </div>

          <div class="project-card">
            <div class="project-header">
              <span class="project-label">AI & Algorithms</span>
              <h3 class="project-title">Chess Engine</h3>
            </div>
            <p class="project-tech">C / C++ | Algorithms | AI</p>
            <p class="project-description">Built a chess engine from scratch, implementing move generation, game tree search and evaluation functions.</p>
          </div>

          <div class="project-card">
            <div class="project-header">
              <span class="project-label">Embedded Systems</span>
              <h3 class="project-title">Chess Clock — ESP32</h3>
            </div>
            <p class="project-tech">C | Systems | ESP32</p>
            <p class="project-description">Designed and programmed a chess clock on ESP32 microcontroller, illustrating concrete hardware expertise.</p>
          </div>

          <div class="project-card">
            <div class="project-header">
              <span class="project-label">Simulation</span>
              <h3 class="project-title">Conway's Game of Life</h3>
            </div>
            <p class="project-tech">C++ | Simulation | OOP</p>
            <p class="project-description">Full implementation of Conway's Game of Life with custom rendering and optimized object-oriented design.</p>
          </div>
        </div>

        <button class="carousel-btn next" @click="scrollProjects('right')" aria-label="Next project">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
    </section>

    <!-- SECTION 04: EXPERIENCE -->
    <section id="experience" class="section-container">
      <div class="section-header">
        <span class="section-number">04.</span>
        <h2 class="section-title">Experience</h2>
      </div>
      <div class="timeline">
        <!-- EXP 01 -->
        <div class="timeline-item" :class="{ expanded: expandedIdx === 0 }" @click="toggleExp(0)">
          <div class="timeline-header">
            <h3 class="item-title">
              <span class="exp-arrow" :class="{ rotated: expandedIdx === 0 }">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
              </span>
              Apprentice Research Engineer — LINEACT Lab
            </h3>
            <span class="item-date">Oct 2025 – Present</span>
          </div>
          <div class="exp-content" :class="{ active: expandedIdx === 0 }">
            <div class="exp-inner">
              <p class="item-description">
                R&D in Artificial Intelligence, Embedded Systems and Web Technologies. Focus on Federated Learning infrastructure using Raspberry Pi clusters and a central server — <span class="highlight">Python, TensorFlow, Keras, MQTT, Linux.</span>
              </p>
            </div>
          </div>
        </div>

        <!-- EXP 02 -->
        <div class="timeline-item" :class="{ expanded: expandedIdx === 1 }" @click="toggleExp(1)">
          <div class="timeline-header">
            <h3 class="item-title">
              <span class="exp-arrow" :class="{ rotated: expandedIdx === 1 }">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
              </span>
              R&D Intern – Federated Learning — LINEACT Lab
            </h3>
            <span class="item-date">Apr 2025 – Jun 2025</span>
          </div>
          <div class="exp-content" :class="{ active: expandedIdx === 1 }">
            <div class="exp-inner">
              <p class="item-description">
                Development of a distributed Federated Learning infrastructure using Raspberry Pi and a central server. Built a shared AI model, implemented communication protocols, optimized performance and client selection algorithms.
              </p>
            </div>
          </div>
        </div>

        <!-- EXP 03 -->
        <div class="timeline-item" :class="{ expanded: expandedIdx === 2 }" @click="toggleExp(2)">
          <div class="timeline-header">
            <h3 class="item-title">
              <span class="exp-arrow" :class="{ rotated: expandedIdx === 2 }">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
              </span>
              Founder & Full-Stack Developer — Studio Osalys
            </h3>
            <span class="item-date">Jun 2022 – Nov 2024</span>
          </div>
          <div class="exp-content" :class="{ active: expandedIdx === 2 }">
            <div class="exp-inner">
              <p class="item-description">
                Built custom web applications (showcase sites, e-commerce, SaaS, mobile) for businesses and individuals. Full-stack development, client management and deployment — <span class="highlight">Vue.js, Nuxt, React, Next, Laravel, SQL.</span>
              </p>
            </div>
          </div>
        </div>

        <!-- EXP 04 -->
        <div class="timeline-item" :class="{ expanded: expandedIdx === 3 }" @click="toggleExp(3)">
          <div class="timeline-header">
            <h3 class="item-title">
              <span class="exp-arrow" :class="{ rotated: expandedIdx === 3 }">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
              </span>
              Shadowing / Full-Stack Discovery — Pixacare
            </h3>
            <span class="item-date">Jul 2021</span>
          </div>
          <div class="exp-content" :class="{ active: expandedIdx === 3 }">
            <div class="exp-inner">
              <p class="item-description">
                Observed and assisted in the development of a medical monitoring platform for patients and doctors — JS, REST API, SQL, Git.
              </p>
            </div>
          </div>
        </div>

        <!-- EXP 05 -->
        <div class="timeline-item" :class="{ expanded: expandedIdx === 4 }" @click="toggleExp(4)">
          <div class="timeline-header">
            <h3 class="item-title">
              <span class="exp-arrow" :class="{ rotated: expandedIdx === 4 }">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
              </span>
              Discovery Intern — Elixir Health
            </h3>
            <span class="item-date">Jul 2021</span>
          </div>
          <div class="exp-content" :class="{ active: expandedIdx === 4 }">
            <div class="exp-inner">
              <p class="item-description">
                Introduction to mobile health app development and startup workflows — HTML, CSS, JS, Git.
              </p>
            </div>
          </div>
        </div>

        <!-- EXP 06 -->
        <div class="timeline-item" :class="{ expanded: expandedIdx === 5 }" @click="toggleExp(5)">
          <div class="timeline-header">
            <h3 class="item-title">
              <span class="exp-arrow" :class="{ rotated: expandedIdx === 5 }">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
              </span>
              Embedded Systems Discovery — neverMind GmbH
            </h3>
            <span class="item-date">Dec 2019</span>
          </div>
          <div class="exp-content" :class="{ active: expandedIdx === 5 }">
            <div class="exp-inner">
              <p class="item-description">
                First professional immersion in embedded development in Germany. Designed and built a controllable LED system using Arduino, including development of a local graphical interface — Arduino, C/C++, Microcontrollers.              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 05: EDUCATION -->
    <section id="education" class="section-container">
      <div class="section-header">
        <span class="section-number">05.</span>
        <h2 class="section-title">Education</h2>
      </div>
      <div class="edu-grid">
        <div class="edu-item">
          <h3 class="item-title">Engineer's Degree — Computer Science</h3>
          <p class="item-subtitle">CESI École d'Ingénieurs · 2023 – 2028</p>
        </div>
        <div class="edu-item">
          <h3 class="item-title">French Baccalauréat · Lycée Marie Curie</h3>
          <p class="item-subtitle">2020 – 2023 · Specializations: Computer Science (NSI) & Mathematics</p>
        </div>
      </div>
    </section>

    <!-- SECTION 06: AWARDS & CERTIFICATIONS -->
    <section id="awards" class="section-container">
      <div class="section-header">
        <span class="section-number">06.</span>
        <h2 class="section-title">Awards & Certifications</h2>
      </div>
      <div class="awards-content">
        <div class="certs-list">
          <div class="cert-item">
            <span class="cert-date">2024–2025</span>
            <span class="cert-title">TOP Scorer — AXA Challenge "Best CS Student in France"</span>
          </div>
          <div class="cert-item">
            <span class="cert-date">Mar 2025</span>
            <span class="cert-title">TOEIC — 875/990 · GlobalExam</span>
          </div>
          <div class="cert-item">
            <span class="cert-date">Nov 2025</span>
            <span class="cert-title">Participant — Aquathon 2025 · Alsace Digitale</span>
          </div>
          <div class="cert-item">
            <span class="cert-date">Mar 2023</span>
            <span class="cert-title">Pix Certification — 553/768 · Pix</span>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 07: CONTACT -->
    <section id="contact" class="section-container">
      <div class="section-header">
        <span class="section-number">07.</span>
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
import { ref } from 'vue';

const carouselRef = ref<HTMLElement | null>(null);

const expandedIdx = ref<number | null>(null);

const toggleExp = (index: number) => {
  expandedIdx.value = expandedIdx.value === index ? null : index;
};

const scrollProjects = (direction: 'left' | 'right') => {
  if (!carouselRef.value) return;
  
  const cardWidth = 380;
  const gap = 32;
  const scrollAmount = cardWidth + gap;
  const target = carouselRef.value.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
  
  carouselRef.value.scrollTo({
    left: target,
    behavior: 'smooth'
  });
};
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
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 700;
  letter-spacing: -0.02em;
}

.section-content {
  max-width: 850px;
}

.about-text {
  font-size: clamp(0.95rem, 2vw, 1.05rem);
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
  font-size: 0.95rem;
  padding: 0.5rem 0;
  color: var(--text-primary);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.projects-carousel-wrapper {
  position: relative;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.projects-carousel {
  display: flex;
  overflow-x: auto;
  gap: 2rem;
  padding: 1rem 0 2rem;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.projects-carousel::-webkit-scrollbar {
  display: none;
}

.projects-carousel .project-card {
  flex: 0 0 380px;
  scroll-snap-align: start;
}

.carousel-btn {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  color: var(--text-primary);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  flex-shrink: 0;
}

.carousel-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

.carousel-btn svg {
  width: 20px;
  height: 20px;
}

.project-card {
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.project-card:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-5px);
}

.project-label {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--text-secondary);
}

.project-title {
  font-family: var(--font-title);
  font-size: 1.3rem;
  font-weight: 600;
  margin-top: 0.5rem;
  color: var(--text-primary);
}

.project-tech {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-secondary);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 1rem;
}

.project-description {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-secondary);
}

.placeholder-text {
  color: var(--text-secondary);
  font-style: italic;
}

/* Experience & Timeline */
.timeline {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
  padding-left: 3rem;
  margin-top: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0.75rem;
  top: 0;
  bottom: 0;
  width: 1px;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(255, 255, 255, 0.1) 5%,
    rgba(255, 255, 255, 0.1) 95%,
    transparent
  );
}

.timeline-item {
  position: relative;
  max-width: 900px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 1.5rem 2.5rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: -2.25rem;
  top: 2.5rem;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--bg-color);
  border: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 2;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate(-50%, -50%);
}

.timeline-item:hover::before {
  border-color: var(--text-primary);
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
}

.timeline-item.expanded::before {
  background: var(--text-primary);
  border-color: var(--text-primary);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
}

.timeline-item:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.1);
  transform: translateX(8px);
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 2rem;
  gap: 2rem;
  flex-wrap: wrap;
}

.item-title {
  margin: 0;
  font-family: var(--font-title);
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.exp-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  color: var(--text-secondary);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.exp-arrow.rotated {
  transform: rotate(180deg);
}

.exp-content {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  transition: grid-template-rows 0.4s cubic-bezier(0.4, 0, 0.2, 1), 
              opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.exp-content.active {
  grid-template-rows: 1fr;
  opacity: 1;
}

.exp-inner {
  overflow: hidden;
  padding-top: 1rem;
  margin-top: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.item-date {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--text-secondary);
  white-space: nowrap;
}

.item-description {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-secondary);
}


/* Education */
.edu-grid {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.item-subtitle {
  font-family: var(--font-mono);
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin-top: 0.5rem;
}

.certs-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 0.5rem 2rem;
}

.cert-item {
  display: flex;
  gap: 2rem;
  align-items: center;
  padding: 0.8rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
}

.cert-date {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-secondary);
  min-width: 80px;
}

.cert-title {
  font-size: 0.95rem;
  color: var(--text-primary);
}

.contact-links {
  display: flex;
  gap: 3rem;
  margin-top: 2rem;
}

.contact-link {
  font-family: var(--font-mono);
  font-size: 1.25rem;
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

  .timeline {
    padding-left: 1.5rem;
  }

  .timeline::before {
    left: 0.25rem;
  }

  .timeline-item {
    padding: 1.25rem 1.5rem;
  }

  .timeline-item::before {
    left: -1.25rem;
    top: 2rem;
  }
}
</style>
