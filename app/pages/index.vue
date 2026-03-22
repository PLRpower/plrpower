<template>
  <div class="content-wrapper">
    <Hero />
    <!-- SECTION 01: ABOUT -->
    <section id="about" class="section-container reveal">
      <div class="section-header">
        <span class="section-number">01.</span>
        <h2 class="section-title">About Me</h2>
      </div>
      <div class="section-content">
        <p class="about-text">
          Passionate Computer Science student specializing in AI, Embedded Systems, and Application Development. Currently in apprenticeship at the LINEACT Research Laboratory, working mainly on Federated Learning, and seeking a 3-month internship abroad in 2026 to expand my technical expertise internationally.        </p>
      </div>
    </section>

    <!-- SECTION 02: PROJECTS -->
    <section id="projects" class="section-container reveal">
      <div class="section-header">
        <span class="section-number">02.</span>
        <h2 class="section-title">Personal projects</h2>
      </div>
      <div class="projects-carousel-wrapper">
        <button class="carousel-btn prev" @click="scrollProjects('left')" aria-label="Previous project">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        
        <div class="projects-carousel" ref="carouselRef">
          <NuxtLink 
            v-for="project in projectsData" 
            :key="project.id"
            :to="'/projects/' + project.id"
            class="project-card"
          >
            <div v-if="project.image" class="project-image-wrapper">
              <img :src="project.image" :alt="project.title" class="project-img" />
            </div>
            <div class="project-body">
              <div class="project-header">
                <span class="project-label">{{ project.label }}</span>
                <h3 class="project-title">{{ project.title }}</h3>
              </div>
              <p class="project-tech">{{ project.tech }}</p>
              <p class="project-description">{{ project.description }}</p>
            </div>
          </NuxtLink>
        </div>

        <button class="carousel-btn next" @click="scrollProjects('right')" aria-label="Next project">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
    </section>

    <!-- SECTION 03: EDUCATION -->
    <section id="education" class="section-container reveal">
      <div class="section-header">
        <span class="section-number">03.</span>
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

    <!-- SECTION 04: EXPERIENCE -->
    <section id="experience" class="section-container reveal">
      <div class="section-header">
        <span class="section-number">04.</span>
        <h2 class="section-title">Experience</h2>
      </div>
      <div class="timeline">
        <!-- EXP 01 -->
        <div class="timeline-item" :class="{ expanded: expandedIdx === 0 }" @click="toggleExp(0)">
          <div class="item-duration">3 years</div>
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
          <div class="item-duration">3 months</div>
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
          <div class="item-duration">2 years</div>
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
          <div class="item-duration">2 weeks</div>
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
          <div class="item-duration">2 weeks</div>
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
          <div class="item-duration">1 week</div>
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

    <!-- SECTION 05: SKILLS -->
    <section id="skills" class="section-container reveal">
      <div class="section-header">
        <span class="section-number">05.</span>
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

    <!-- SECTION 06: AWARDS & CERTIFICATIONS -->
    <section id="awards" class="section-container reveal">
      <div class="section-header">
        <span class="section-number">06.</span>
        <h2 class="section-title">Awards & Certifications</h2>
      </div>
      <div class="awards-grid">
        <!-- TOEIC -->
        <div class="award-item">
          <div class="award-icon-wrapper">
            <img src="/images/awards/toeic.png" alt="TOEIC" class="award-icon" />
          </div>
          <div class="award-content">
            <span class="award-date">Mar 2025</span>
            <div class="award-info">
              <span class="award-title">TOEIC — 875/990</span>
              <p class="award-subtitle">Standardized test for English proficiency in work environments.</p>
            </div>
          </div>
        </div>

        <!-- Aquathon -->
        <div class="award-item">
          <div class="award-icon-wrapper">
            <img src="/images/awards/aquathon.png" alt="Aquathon" class="award-icon" />
          </div>
          <div class="award-content">
            <span class="award-date">Nov 2025</span>
            <div class="award-info">
              <span class="award-title">3rd Prize & Special Award — Aquathon 2025</span>
              <p class="award-subtitle">Hydro Regen project with Prof. Karl Matthias Wantzen.</p>
            </div>
          </div>
        </div>

        <!-- PIX -->
        <div class="award-item">
          <div class="award-icon-wrapper">
            <img src="/images/awards/pix.png" alt="Pix" class="award-icon" />
          </div>
          <div class="award-content">
            <span class="award-date">Mar 2023</span>
            <div class="award-info">
              <span class="award-title">Pix Certification — 553/768</span>
              <p class="award-subtitle">Official French certification for digital skills across 5 activity domains.</p>
            </div>
          </div>
        </div>

        <!-- AXA -->
        <div class="award-item">
          <div class="award-icon-wrapper">
            <img src="/images/awards/axa.png" alt="AXA" class="award-icon" />
          </div>
          <div class="award-content">
            <span class="award-date">2024 & 2025</span>
            <div class="award-info">
              <span class="award-title">TOP Scorer — AXA Challenge "Best CS Student in France"</span>
              <p class="award-subtitle">National challenge evaluating Cyber, AI, Dev, and Cloud.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 07: CONTACT -->
    <section id="contact" class="section-container reveal">
      <div class="section-header">
        <span class="section-number">07.</span>
        <h2 class="section-title">Contact</h2>
      </div>
      <div class="contact-content">
        <div class="contact-left">
          <p class="contact-description">
            I'm currently seeking a 3-month international internship. 
            Whether you have a project in mind or just want to connect, feel free to reach out.
          </p>
          <div class="email-display">
            <span class="email-label">Send me an email</span>
            <a href="mailto:paul.thomas.stras@gmail.com" class="email-link-large">
              paul.thomas.stras@gmail.com
            </a>
          </div>
          <div class="social-links-minimal">
            <a href="https://github.com/PLRpower" target="_blank" rel="noopener noreferrer" class="social-min">
              <Icon name="uil:github" size="20px" class="social-icon" />
              Github
            </a>
            <a href="https://www.linkedin.com/in/paul-thomas-strasbourg/" target="_blank" rel="noopener noreferrer" class="social-min">
              <Icon name="uil:linkedin" size="20px" class="social-icon" />
              LinkedIn
            </a>
          </div>
        </div>

        <form class="contact-form" @submit.prevent="handleContactSubmit">
          <div class="form-row">
            <div class="input-group">
              <input type="text" id="name" name="name" placeholder=" " required />
              <label for="name">Name</label>
            </div>
            <div class="input-group">
              <input type="email" id="email" name="email" placeholder=" " required />
              <label for="email">Email</label>
            </div>
          </div>
          <div class="input-group">
            <textarea id="message" name="message" rows="5" placeholder=" " required></textarea>
            <label for="message">Your Message</label>
          </div>
          <button type="submit" class="contact-submit" :disabled="isSubmitting">
            <span v-if="!isSubmitting">Send Message</span>
            <span v-else>Sending...</span>
            <svg v-if="!isSubmitting" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
            <Icon v-else name="line-md:loading-twotone-loop" size="18px" />
          </button>
          
          <div v-if="submitStatus === 'success'" class="submit-msg success">
            Message sent successfully!
          </div>
          <div v-if="submitStatus === 'error'" class="submit-msg error">
            An error occurred. Please try again or send a direct email.
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const carouselRef = ref<HTMLElement | null>(null);

const projectsData = [
  {
    id: 'federated-learning',
    title: 'Federated Learning — Lab',
    label: 'Research & ML',
    tech: 'Distributed ML | Python | TensorFlow',
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

const isSubmitting = ref(false);
const submitStatus = ref<'success' | 'error' | null>(null);

const handleContactSubmit = async (e: Event) => {
  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);
  
  const payload = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message')
  };

  isSubmitting.value = true;
  submitStatus.value = null;

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: payload
    });
    submitStatus.value = 'success';
    form.reset();
    setTimeout(() => { submitStatus.value = null; }, 5000);
  } catch (err) {
    console.error('Submission error:', err);
    submitStatus.value = 'error';
  } finally {
    isSubmitting.value = false;
  }
};

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

onMounted(() => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });
});
</script>

<style scoped>
.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px 100px;
}

.section-container {
  margin-top: 15rem; /* On laisse de l'espace après le Hero */
}

.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: all 1s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
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
  color: var(--accent-color);
  font-size: 1.1rem;
  opacity: 0.8;
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
  color: var(--accent-color);
  font-weight: 600;
  text-shadow: 0 0 10px rgba(52, 211, 153, 0.2);
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

.project-card {
  flex: 0 0 380px;
  scroll-snap-align: start;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  text-decoration: none; /* For NuxtLink */
  color: inherit;
}

.project-card:hover {
  background: rgba(52, 211, 153, 0.04);
  border-color: rgba(52, 211, 153, 0.3);
  box-shadow: 0 10px 40px -15px rgba(52, 211, 153, 0.15);
  transform: translateY(-8px);
}

.project-image-wrapper {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: #ffffff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.project-img {
  width: 100%;
  height: 100%;
  object-fit: contain; /* Don't crop, preserve transparency */
  padding: 0.5rem; /* Minimal padding to avoid being too small */
  transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.project-card:hover .project-img {
  transform: scale(1.1);
}

.project-body {
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
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

.project-label {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--accent-color);
  opacity: 0.8;
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
  padding-left: 8.5rem; /* Increased for wider durations gap */
  margin-top: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 5.75rem; /* Adjusted based on new padding */
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
  padding: 1.1rem 2.5rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.item-duration {
  position: absolute;
  left: -8.5rem; /* Shifted further left */
  top: 2.5rem;
  transform: translateY(-50%);
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--text-secondary);
  opacity: 0.5;
  text-align: right;
  width: 5rem; /* Slightly wider to accommodate longer strings */
  pointer-events: none;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: -2.85rem;
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
  background: rgba(52, 211, 153, 0.02);
  border-color: rgba(52, 211, 153, 0.15);
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
  padding-top: 0.75rem;
  margin-top: 0.4rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.item-date {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--accent-color);
  opacity: 0.8;
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

.awards-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem 4rem;
  margin-top: 1rem;
}

.award-item {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  transition: all 0.3s ease;
}

.award-item:hover {
  transform: translateX(8px);
}

.award-icon-wrapper {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  flex-shrink: 0;
  padding: 0.6rem;
  transition: all 0.3s ease;
}

.award-item:hover .award-icon-wrapper {
  background: rgba(52, 211, 153, 0.08);
  border-color: rgba(52, 211, 153, 0.3);
  box-shadow: 0 0 15px rgba(52, 211, 153, 0.1);
}

.award-icon {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  filter: grayscale(0.2) contrast(1.1);
  transition: all 0.3s ease;
}

.award-item:hover .award-icon {
  filter: grayscale(0) contrast(1.2);
  transform: scale(1.1);
}

.award-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.award-date {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--accent-color);
  opacity: 0.8;
}

.award-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.award-title {
  font-size: 0.95rem;
  color: var(--text-primary);
  font-weight: 500;
  line-height: 1.4;
}

.award-subtitle {
  font-size: 0.8rem;
  color: var(--text-secondary);
  line-height: 1.4;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: start;
}

.contact-description {
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 3rem;
  max-width: 480px;
}

.email-display {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 3rem;
}

.email-label {
  font-family: var(--font-mono);
  color: var(--accent-color);
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.8;
}

.email-link-large {
  font-size: clamp(1.2rem, 2.5vw, 1.8rem);
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  width: fit-content;
  position: relative;
}

.email-link-large::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--accent-color);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.email-link-large:hover {
  color: var(--accent-color);
}

.email-link-large:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.social-links-minimal {
  display: flex;
  gap: 2rem;
}

.social-min {
  font-family: var(--font-mono);
  font-size: 0.9rem;
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.social-min:hover {
  color: var(--accent-color);
  transform: translateY(-2px);
}

.social-icon {
  transition: transform 0.3s ease;
}

.social-min:hover .social-icon {
  color: var(--accent-color);
}

/* Form Styles */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.input-group {
  position: relative;
}

.input-group input,
.input-group textarea {
  width: 100%;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 4px;
  color: var(--text-primary);
  font-family: inherit;
  font-size: 1rem;
  transition: all 0.3s ease;
  outline: none;
}

.input-group textarea {
  resize: vertical;
}

.input-group label {
  position: absolute;
  left: 1rem;
  top: 1rem;
  color: var(--text-secondary);
  pointer-events: none;
  transition: all 0.3s ease;
  opacity: 0.6;
}

.input-group input:focus,
.input-group textarea:focus,
.input-group input:not(:placeholder-shown),
.input-group textarea:not(:placeholder-shown) {
  border-color: #ffffff;
  background: transparent;
}

.input-group input:focus + label,
.input-group textarea:focus + label,
.input-group input:not(:placeholder-shown) + label,
.input-group textarea:not(:placeholder-shown) + label {
  top: -0.6rem;
  left: 0.5rem;
  font-size: 0.75rem;
  background: var(--bg-color);
  padding: 0 0.5rem;
  opacity: 1;
  color: #ffffff;
  font-family: var(--font-mono);
}

.contact-submit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  background: transparent;
  border: 1px solid var(--accent-color);
  color: var(--accent-color);
  padding: 1rem 2rem;
  font-family: var(--font-mono);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 4px;
}

.contact-submit svg {
  width: 18px;
  height: 18px;
  transition: transform 0.3s ease;
}

.contact-submit:hover {
  background: rgba(52, 211, 153, 0.1);
  box-shadow: 0 0 20px rgba(52, 211, 153, 0.2);
}

.contact-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: rgba(255, 255, 255, 0.05);
}

.submit-msg {
  margin-top: 1rem;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  padding: 1rem;
  border-radius: 4px;
  animation: fadeInDown 0.4s ease forwards;
}

.submit-msg.success {
  background: rgba(52, 211, 153, 0.1);
  color: #34d399;
  border-left: 3px solid #34d399;
}

.submit-msg.error {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border-left: 3px solid #ef4444;
}

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 1024px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
  
  .contact-description {
    max-width: 100%;
  }
}

@media (max-width: 600px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .awards-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
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
    left: 4.2rem; /* Adjusted for mobile */
  }

  .timeline-item {
    padding: 1.25rem 1.5rem;
  }

  .timeline-item::before {
    left: -2.3rem; /* Mobile alignment */
    top: 2rem;
  }

  .item-duration {
    left: -5.5rem;
    width: 3.5rem;
    font-size: 0.6rem;
    top: 2rem;
  }
}
</style>
