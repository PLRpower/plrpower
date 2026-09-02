export interface ProjectDocument {
  title: string;
  url: string;
}

export interface ProjectHighlight {
  title: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  label: string;
  category: string;
  tech: string;
  techs: string[];
  description: string;
  detailDescription?: string;
  image?: string;
  github?: string;
  demo?: string;
  documents?: ProjectDocument[];
  highlights?: ProjectHighlight[];
  gridClass: string;
  featured?: boolean;
  // ASCII image configuration
  resolution?: number;
  invert?: boolean;
  brightness?: number;
  contrast?: number;
  charSpacing?: number;
  charRamp?: string;
  tintColor?: string;
  colorMode?: 'monochrome' | 'original';
  useOriginalColors?: boolean;
}

export const projects: Project[] = [
  {
    id: 'federated-learning',
    title: 'Federated Learning Platform',
    label: 'Research & Distributed AI',
    category: 'Research & AI',
    tech: 'Distributed ML | Python | PyTorch / TensorFlow | Edge AI | Sockets & MQTT | Docker Swarm',
    techs: ['Python', 'PyTorch / TF', 'Distributed ML', 'Edge AI'],
    description: 'Researched and evaluated distributed Federated Learning architectures on physical Raspberry Pi clusters at LINEACT Research Laboratory.',
    detailDescription: 'Designed and evaluated a distributed Federated Learning (FL) platform at LINEACT Research Laboratory, benchmarking decentralized collaborative model training across a cluster of physical Raspberry Pi edge nodes and high-performance aggregation servers.',
    image: '/images/projects/federated-learning.webp',
    resolution: 200,
    invert: false,
    brightness: 1.15,
    contrast: 1.4,
    charSpacing: 0.85,
    charRamp: ' .·:;~+=-*#%&$@',
    tintColor: '#2dd4bf',
    github: 'https://github.com/PLRpower',
    documents: [
      {
        title: 'Mémoire Technique (LINEACT)',
        url: '/THOMAS_Paul_Memoire_Technique_LINEACT.pdf'
      },
      {
        title: 'Rapport de Stage (LINEACT)',
        url: '/THOMAS_Paul_Rapport_de_Stage.pdf'
      }
    ],
    featured: true,
    gridClass: 'md:col-span-2 lg:col-span-2 lg:row-span-2',
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
    category: 'AI & Algorithms',
    tech: 'Python | Game Theory | Alpha-Beta Pruning | Heuristic Evaluation | ML',
    techs: ['Python', 'Heuristics', 'Game Tree Search', 'ML'],
    description: 'A custom chess engine combining classical Alpha-Beta pruning with machine learning-inspired evaluation functions.',
    detailDescription: 'A custom chess engine combining classical game tree search algorithms (Alpha-Beta pruning, iterative deepening, transposition tables) with machine learning-inspired position evaluation functions.',
    image: '/images/projects/axiom.webp',
    github: 'https://github.com/PLRpower/axiom-engine',
    featured: true,
    gridClass: 'md:col-span-2 lg:col-span-2 lg:row-span-1',
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
    title: 'Embedded Weather Station',
    label: 'Embedded Systems & IoT',
    category: 'Embedded & IoT',
    tech: 'C++ | Arduino / ESP32 | Sensor Interfacing | Hardware | Low-Power Telemetry',
    techs: ['C++', 'Arduino / ESP32', 'Sensors', 'Telemetry'],
    description: 'A resilient embedded sensor payload designed for environmental monitoring, maritime hazard mitigation, and low-power telemetry.',
    detailDescription: 'A resilient embedded sensor payload designed for environmental monitoring and maritime hazard prevention, featuring multi-sensor acquisition, fail-safe logging, and low-latency telemetry.',
    image: '/images/projects/weather-station.webp',
    resolution: 200,
    invert: true,
    brightness: 1.2,
    contrast: 1.65,
    charSpacing: 0.85,
    charRamp: ' .·:;~+=-*#%&$@',
    tintColor: '#2dd4bf',
    github: 'https://github.com/PLRpower/embedded-weather-station',
    featured: true,
    gridClass: 'md:col-span-2 lg:col-span-2 lg:row-span-1',
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
    title: 'Route & Fleet Optimization',
    label: 'Data Science & Operations Research',
    category: 'Data Science & OR',
    tech: 'Python | Jupyter | Graph Theory | Combinatorial Optimization | Pandas / NumPy',
    techs: ['Python', 'Jupyter', 'Graph Theory', 'Optimization'],
    description: 'Operations research and data science algorithms solving Vehicle Routing Problems (VRP) with time-window constraints.',
    detailDescription: 'An operations research and data analytics system solving complex Vehicle Routing Problems (VRP) with capacity and time-window constraints using heuristic and exact graph algorithms.',
    github: 'https://github.com/PLRpower/delivery-route-optimization',
    featured: true,
    gridClass: 'md:col-span-2 lg:col-span-1 lg:row-span-1',
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
    id: 'a-la-carte',
    title: 'À la carte — Smart Kitchen',
    label: 'Full-Stack & Mobile AI',
    category: 'Mobile & AI',
    tech: 'TypeScript | Vue / Nuxt | Mobile | Computer Vision / OCR | REST APIs',
    techs: ['TypeScript', 'Vue/Nuxt', 'OCR / Vision', 'REST APIs'],
    description: 'A smart meal planner and pantry inventory manager using computer vision and NLP to extract recipes from photos.',
    detailDescription: 'A smart inventory and recipe management application that uses computer vision and natural language processing to extract recipes from photos and generate meals based on real-time pantry inventory.',
    github: 'https://github.com/PLRpower/a-la-carte',
    featured: true,
    gridClass: 'md:col-span-2 lg:col-span-1 lg:row-span-1',
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
    title: 'Mundo Search',
    label: 'Full-Stack & Applied AI',
    category: 'Full-Stack & AI',
    tech: 'TypeScript | Vue.js | AI / NLP | Canvas / SVG Graph | Node.js',
    techs: ['TypeScript', 'Vue.js', 'NLP & AI', 'Graph UI'],
    description: 'An innovative search engine leveraging AI to generate interactive mindmaps and concept graphs.',
    detailDescription: 'An exploratory search engine prototype that transforms conventional linear query results into interactive, structured mindmaps and semantic knowledge graphs.',
    image: '/images/projects/search.webp',
    github: 'https://github.com/PLRpower/mundo-search',
    gridClass: 'md:col-span-1 lg:col-span-1 lg:row-span-2',
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
    id: 'hydro-regen',
    title: 'Hydro Regen',
    label: 'Hackathon Award Winner',
    category: 'Hackathon Winner',
    tech: 'Vue.js | TypeScript | Tailwind CSS | Spatial Data | REST APIs',
    techs: ['Vue.js', 'TypeScript', 'Spatial Data', 'Tailwind'],
    description: 'Award-winning regenerative hydrology mapping platform built by a 10-person team during Aquathon (3rd Place & Jury Award).',
    detailDescription: 'Award-winning interactive mapping and environmental decision-support tool built during the 48h Aquathon hackathon (Won 3rd Place & Jury\'s Favorite Award).',
    image: '/images/projects/hydro.webp',
    github: 'https://github.com/PLRpower/hydro-regen',
    gridClass: 'md:col-span-1 lg:col-span-2 lg:row-span-2',
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
    id: 'conway-game-of-life',
    title: 'Game of Life Simulation',
    label: 'C++ & Parallel Systems',
    category: 'C++ & Systems',
    tech: 'C++20 | OpenMP | Parallel Computing | OOP Architecture | Benchmarking',
    techs: ['C++20', 'OpenMP', 'Parallel Computing', 'OOP'],
    description: 'High-performance cellular automaton in modern C++20 with OpenMP multi-threading and SOLID architecture.',
    detailDescription: 'A high-performance cellular automaton engine in modern C++20, utilizing multi-threaded OpenMP parallelism and clean object-oriented architecture to simulate massive grid universes at 60+ FPS.',
    github: 'https://github.com/PLRpower/conway-game-of-life',
    gridClass: 'md:col-span-1 lg:col-span-2 lg:row-span-1',
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
    title: 'Exolia Server Infrastructure',
    label: 'Distributed Systems & Game Backend',
    category: 'Distributed Systems',
    tech: 'Java | Netty | MySQL / Redis | Concurrency | Systems Architecture',
    techs: ['Java', 'Netty', 'Concurrency', 'Redis / SQL'],
    description: 'Multiplayer server infrastructure serving 500+ players with asynchronous Netty plugins and Redis synchronization.',
    detailDescription: 'Architected and operated a distributed multiplayer game server infrastructure serving 500+ registered players, developing custom asynchronous plugins, database synchronization, and event-driven systems.',
    gridClass: 'md:col-span-1 lg:col-span-2 lg:row-span-1',
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

export const getFeaturedProjects = () => projects.filter(p => p.featured);
export const getProjectById = (id: string) => projects.find(p => p.id === id);
