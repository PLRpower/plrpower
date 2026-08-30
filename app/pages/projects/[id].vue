<script setup lang="ts">
import { useSchemaOrg } from '#imports';

const route = useRoute();
const projectId = route.params.id as string;

// On récupère les données (à terme elles seront centralisées)
const projects = [
  {
    id: 'federated-learning',
    title: 'Federated Learning Research Platform',
    label: 'Research & Distributed AI',
    tech: 'Distributed ML | Python | PyTorch / TensorFlow | Edge AI | Sockets & MQTT | Docker Swarm',
    description: 'Designed and evaluated a distributed Federated Learning (FL) platform at LINEACT Research Laboratory, benchmarking decentralized collaborative model training across a cluster of physical Raspberry Pi edge nodes and high-performance aggregation servers.',
    image: '/images/projects/federated-learning.webp',
    invert: true,
    github: 'https://github.com/PLRpower',
    highlights: [
      {
        title: 'Edge-to-Cloud Distributed Training',
        description: 'Deployed local training nodes on ARM-based single-board computers (Raspberry Pi), running decentralized gradient computations without transmitting raw private data.'
      },
      {
        title: 'Federated Aggregation & Non-IID Robustness',
        description: 'Implemented Federated Averaging (FedAvg) algorithms and evaluated convergence stability under severe non-IID (heterogeneous) data partitions across clients.'
      },
      {
        title: 'Optimized Communication Pipeline',
        description: 'Built lightweight network communication protocols using sockets and MQTT to minimize bandwidth overhead and transmission latency during parameter exchange.'
      },
      {
        title: 'Containerized Cluster Orchestration',
        description: 'Containerized workers and aggregation servers using Docker and Docker Swarm for reproducible multi-node experimentation and metrics collection.'
      }
    ]
  },
  {
    id: 'axiom-engine',
    title: 'Axiom Chess Engine & AI',
    label: 'AI / ML & Algorithms',
    tech: 'Python | Game Theory | Alpha-Beta Pruning | Heuristic Evaluation | ML',
    description: 'A custom chess engine combining classical game tree search algorithms (Alpha-Beta pruning, iterative deepening, transposition tables) with machine learning-inspired position evaluation functions.',
    image: '/images/projects/axiom.webp',
    github: 'https://github.com/PLRpower/axiom-engine',
    highlights: [
      {
        title: 'High-Efficiency Move Generation',
        description: 'Designed bitboard-inspired board representation and move generation logic to maximize nodes evaluated per second.'
      },
      {
        title: 'Optimized Search Tree',
        description: 'Implemented minimax search with Alpha-Beta pruning, move ordering (MVV-LVA, killer moves), and quiescence search to avoid the horizon effect.'
      },
      {
        title: 'Evaluation Function',
        description: 'Blended material weighting, piece-square tables, king safety, and positional pawn structure analysis to assess complex game states.'
      }
    ]
  },
  {
    id: 'embedded-weather-station',
    title: 'Resilient Embedded Weather Station',
    label: 'Embedded Systems & IoT',
    tech: 'C++ | Arduino / ESP32 | Sensor Interfacing | Hardware | Low-Power Telemetry',
    description: 'A resilient embedded sensor payload designed for environmental monitoring and maritime hazard prevention, featuring multi-sensor acquisition, fail-safe logging, and low-latency telemetry.',
    image: '/images/projects/weather.jpg',
    github: 'https://github.com/PLRpower/embedded-weather-station',
    highlights: [
      {
        title: 'Multi-Sensor Interfacing',
        description: 'Interfaced temperature, pressure, humidity, and atmospheric sensors via I2C and SPI protocols with hardware-level interrupt handling.'
      },
      {
        title: 'Fault-Tolerant Firmware',
        description: 'Implemented watchdog timers, EEPROM/SD-card fail-safe buffer mechanisms, and power-saving sleep modes for continuous off-grid operation.'
      },
      {
        title: 'Telemetry & Data Stream',
        description: 'Engineered serial and wireless data packet formatting for real-time telemetry streaming to ground monitoring stations.'
      }
    ]
  },
  {
    id: 'delivery-route-optimization',
    title: 'Delivery Route & Fleet Optimization',
    label: 'Data Science & Operations Research',
    tech: 'Python | Jupyter | Graph Theory | Combinatorial Optimization | Pandas / NumPy',
    description: 'An operations research and data analytics system solving complex Vehicle Routing Problems (VRP) with capacity and time-window constraints using heuristic and exact graph algorithms.',
    github: 'https://github.com/PLRpower/delivery-route-optimization',
    highlights: [
      {
        title: 'Graph-Based Logistics Modeling',
        description: 'Represented road networks and depot-to-customer logistics using weighted spatial graphs and distance matrices.'
      },
      {
        title: 'Optimization Algorithms',
        description: 'Implemented and compared Dijkstra/A* pathfinding, Genetic Algorithms, and Clarke-Wright savings heuristics to minimize total transit distance and fuel consumption.'
      },
      {
        title: 'Interactive Analytics Pipeline',
        description: 'Built comprehensive Jupyter Notebook analytics pipelines with geospatial visualizations for route inspection and benchmark reporting.'
      }
    ]
  },
  {
    id: 'hydro-regen',
    title: 'Hydro Regen — Eco-Hydrology Platform',
    label: 'Hackathon Award Winner',
    tech: 'Vue.js | TypeScript | Tailwind CSS | Spatial Data | REST APIs',
    description: 'Award-winning interactive mapping and environmental decision-support tool built during the 48h Aquathon hackathon (Won 3rd Place & Jury\'s Favorite Award).',
    image: '/images/projects/hydro.jpg',
    github: 'https://github.com/PLRpower/hydro-regen',
    highlights: [
      {
        title: '48h Rapid Prototyping',
        description: 'Led the frontend and data visualization development within a multidisciplinary team of 10 engineers and environmental specialists.'
      },
      {
        title: 'Interactive Geospatial Visualizations',
        description: 'Created dynamic map overlays illustrating watershed regenerative potential and hydrological risk zones.'
      },
      {
        title: 'High Performance UI',
        description: 'Designed a responsive, accessible interface with real-time scenario simulation controls.'
      }
    ]
  },
  {
    id: 'a-la-carte',
    title: 'À la carte — AI Recipe & Inventory Assistant',
    label: 'Full-Stack & Mobile AI',
    tech: 'TypeScript | Vue / Nuxt | Mobile | Computer Vision / OCR | REST APIs',
    description: 'A smart inventory and recipe management application that uses computer vision and natural language processing to extract recipes from photos and generate meals based on real-time pantry inventory.',
    github: 'https://github.com/PLRpower/a-la-carte',
    highlights: [
      {
        title: 'Intelligent Recipe Extraction',
        description: 'Integrated OCR and vision APIs to parse printed and handwritten recipe sheets into structured digital ingredients and step-by-step instructions.'
      },
      {
        title: 'Dynamic Meal Suggestion Engine',
        description: 'Developed an ingredient matching algorithm minimizing food waste by proposing recipes with available pantry items.'
      },
      {
        title: 'Modern Full-Stack Architecture',
        description: 'Built with Nuxt and TypeScript, featuring smooth transitions, offline persistence, and cloud sync.'
      }
    ]
  },
  {
    id: 'mundo-search',
    title: 'Mundo Search — Visual AI Knowledge Engine',
    label: 'Full-Stack & Applied AI',
    tech: 'TypeScript | Vue.js | AI / NLP | Canvas / SVG Graph | Node.js',
    description: 'An exploratory search engine prototype that transforms conventional linear query results into interactive, structured mindmaps and semantic knowledge graphs.',
    image: '/images/projects/search.jpg',
    github: 'https://github.com/PLRpower/mundo-search',
    highlights: [
      {
        title: 'Semantic Graph Generation',
        description: 'Uses NLP algorithms to cluster related query entities and synthesize concept relationships.'
      },
      {
        title: 'Interactive Graph Visualization',
        description: 'Rendered smooth, pan-and-zoom force-directed graphs using interactive canvas/SVG nodes.'
      }
    ]
  },
  {
    id: 'conway-game-of-life',
    title: 'High-Performance Game of Life Simulation',
    label: 'C++ & Parallel Systems',
    tech: 'C++20 | OpenMP | Parallel Computing | OOP Architecture | Benchmarking',
    description: 'A high-performance cellular automaton engine in modern C++20, utilizing multi-threaded OpenMP parallelism and clean object-oriented architecture to simulate massive grid universes at 60+ FPS.',
    github: 'https://github.com/PLRpower/conway-game-of-life',
    highlights: [
      {
        title: 'Multi-Core Parallelization',
        description: 'Leveraged OpenMP loop parallelization and cache-conscious memory layout to accelerate grid state evaluations across multiple CPU threads.'
      },
      {
        title: 'SOLID & Extensible Design',
        description: 'Structured with clear separation between simulation core, grid memory managers, and rendering backends.'
      }
    ]
  },
  {
    id: 'minecraft-server',
    title: 'Exolia Network — High-Concurrency Architecture',
    label: 'Distributed Systems & Game Backend',
    tech: 'Java | Netty | MySQL / Redis | Concurrency | Systems Architecture',
    description: 'Architected and operated a distributed multiplayer game server infrastructure serving 500+ registered players, developing custom asynchronous plugins, database synchronization, and event-driven systems.',
    highlights: [
      {
        title: 'Asynchronous Event Pipelines',
        description: 'Engineered multi-threaded Java modules interacting with Netty network pipelines without blocking the primary server tick loop.'
      },
      {
        title: 'Distributed State Management',
        description: 'Synchronized player inventories and transaction states across multiple server instances using Redis pub/sub and relational databases.'
      }
    ]
  }
];

const project = computed(() => projects.find(p => p.id === projectId));

if (!project.value) {
  throw showError({ statusCode: 404, statusMessage: 'Project not found' });
}

useSeoMeta({
  title: `${project.value.title} | Paul Thomas — Portfolio`,
  description: project.value.description,
  ogTitle: project.value.title,
  ogDescription: project.value.description,
  ogImage: project.value.image,
  twitterCard: 'summary_large_image',
});

useSchemaOrg([
  defineWebPage({
    name: project.value.title,
    description: project.value.description,
  })
]);
</script>

<template>
  <div class="max-w-[1000px] mx-auto px-6 md:px-10 py-32 md:py-24 selection:bg-accent selection:text-black light:selection:text-white" v-if="project">
    <!-- Back link -->
    <div class="mb-14 animate-project-in">
      <NuxtLink to="/#projects" class="inline-flex items-center gap-3 no-underline text-secondary/60 font-mono text-[0.8rem] tracking-wider transition-all duration-400 hover:text-accent hover:-translate-x-1 group">
        <svg class="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5m7 7l-7-7 7-7"/></svg>
        <span>Back to projects</span>
      </NuxtLink>
    </div>

    <!-- Header -->
    <header class="mb-16 animate-project-in" style="animation-delay: 0.1s;">
      <div class="flex items-center gap-3 mb-4">
        <span class="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-accent/90 font-semibold">{{ project.label }}</span>
        <div class="h-px flex-1 bg-gradient-to-r from-accent/20 to-transparent"></div>
      </div>
      <h1 class="font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold tracking-tight text-primary leading-[1.05]">
        <TextScramble :text="project.title" tag="span" :duration="1200" />
      </h1>
      
      <!-- Tech badges -->
      <div class="mt-6 flex flex-wrap gap-2">
        <span v-for="tech in project.tech.split(' | ')" :key="tech" 
              class="px-3 py-1.5 text-[0.75rem] font-mono rounded-md bg-white/[0.03] light:bg-black/[0.03] border border-white/[0.06] light:border-black/[0.06] text-secondary/80">
          {{ tech }}
        </span>
      </div>

      <!-- Action Links (GitHub, Demo) -->
      <div v-if="project.github" class="mt-8 flex flex-wrap gap-4">
        <a :href="project.github" target="_blank" rel="noopener noreferrer"
           class="inline-flex items-center gap-2 px-4 py-2 border border-white/[0.1] bg-white/[0.02] light:border-black/10 light:bg-black/5 text-primary hover:border-accent hover:text-accent transition-all duration-300 font-mono text-xs">
          <Icon name="uil:github" size="16px" />
          <span>View Source on GitHub</span>
          <Icon name="material-symbols:arrow-outward" size="14px" />
        </a>
      </div>
    </header>

    <!-- Project image -->
    <div class="mb-16 animate-project-in" style="animation-delay: 0.2s;" v-if="project.image">
      <div class="relative w-full overflow-hidden border border-white/[0.06] light:border-black/[0.06] bg-white/[0.98] light:bg-slate-50 group">
        <div class="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-[#14b8a6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none"></div>
        <div class="p-8 md:p-12 flex justify-center items-center">
          <AsciiImage 
            :src="project.image" 
            :alt="project.title" 
            class="max-w-full h-auto min-h-[300px]"
            mode="default-ascii"
            :resolution="180"
            :invert="project.invert"
          />
        </div>
      </div>
    </div>

    <!-- Content Sections -->
    <div class="space-y-16 animate-project-in" style="animation-delay: 0.3s;">
      
      <!-- Overview -->
      <section>
        <h2 class="font-display text-2xl mb-4 font-bold text-primary">Overview & Objective</h2>
        <p class="text-base md:text-lg leading-[1.9] text-secondary/80">{{ project.description }}</p>
      </section>

      <!-- Key Technical Highlights -->
      <section v-if="project.highlights && project.highlights.length">
        <h2 class="font-display text-2xl mb-6 font-bold text-primary">Key Engineering Highlights</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="item in project.highlights" :key="item.title"
               class="p-6 border border-white/[0.05] light:border-black/[0.05] bg-white/[0.015] light:bg-black/[0.015]">
            <h3 class="font-display text-lg font-bold text-primary mb-2 text-accent/90">{{ item.title }}</h3>
            <p class="text-sm text-secondary/70 leading-relaxed">{{ item.description }}</p>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<style scoped>
.animate-project-in {
  opacity: 0;
  animation: projectFadeIn 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

@keyframes projectFadeIn {
  from { 
    opacity: 0; 
    transform: translateY(25px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}
</style>