export interface ProjectDocument {
  title: string;
  url: string;
}

export interface ProjectHighlight {
  title: string;
  description: string;
}

export interface ProjectSectionItem {
  title?: string;
  description: string;
  badge?: string;
  code?: string;
}

export interface ProjectSection {
  title: string;
  subtitle?: string;
  content?: string;
  items?: ProjectSectionItem[];
  code?: {
    language: string;
    code: string;
    filename?: string;
  };
  table?: {
    headers: string[];
    rows: string[][];
  };
  image?: string;
  imageCaption?: string;
}

export interface ProjectGalleryItem {
  url: string;
  title: string;
  caption?: string;
  span?: 'full' | 'half';
}

export interface ProjectCommand {
  label: string;
  command: string;
  description?: string;
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
  year?: string;
  architectureTree?: string;
  sections?: ProjectSection[];
  gallery?: ProjectGalleryItem[];
  commands?: ProjectCommand[];
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
    title: 'Edge Federated Learning Platform',
    label: 'Research & Distributed AI',
    category: 'Research & AI',
    year: '2025–2026',
    tech: 'Python | TensorFlow | Docker Swarm | WebSockets | MQTT',
    techs: ['Python', 'TensorFlow', 'Docker Swarm', 'WebSockets', 'MQTT'],
    description: 'Distributed Federated Learning platform engineered across a heterogeneous 20-node cluster (Raspberry Pi & Jetson) with asynchronous WebSocket and MQTT pipelines at LINEACT Laboratory.',
    detailDescription: 'Designed, implemented, and evaluated a distributed Federated Learning (FL) testbed platform at LINEACT CESI Research Laboratory across a physical heterogeneous 20-node cluster (Raspberry Pi 4/5, NVIDIA Jetson, and Linux aggregation servers). The system integrates state-of-the-art decentralized collaborative ML algorithms into an asynchronous WebSocket and MQTT pipeline, benchmarking edge model convergence on heterogeneous time-series streams under simulated bandwidth limits and physical node dropout constraints.',
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
        title: 'Heterogeneous 20-Node Physical Cluster',
        description: 'Engineered a real-world edge cluster combining Raspberry Pi 4/5 SBCs, NVIDIA Jetson edge accelerators, and centralized aggregation servers.'
      },
      {
        title: 'Asynchronous Stream Pipeline',
        description: 'Integrated FedAvg and decentralized consensus algorithms into low-latency WebSocket and MQTT pub/sub data streams.'
      },
      {
        title: 'Edge Model Convergence Under Network Constraints',
        description: 'Empirically evaluated loss convergence, packet-loss resilience, and gradient quantization across non-IID local sensor partitions.'
      },
      {
        title: 'Docker Swarm Orchestration',
        description: 'Automated node provisioning, containerized workers, and aggregation metrics collection for reproducible multi-node experimental benchmarks.'
      }
    ],
    sections: [
      {
        title: 'Research Context & Distributed AI Vision',
        content: 'Centralized machine learning pipelines require collecting raw edge sensor data onto remote cloud data centers, creating privacy vulnerabilities, bandwidth saturation, and compliance bottlenecks under EU GDPR. Federated Learning addresses this by training local models on the edge devices themselves and only transmitting gradient updates or model parameters to an aggregation server. At LINEACT Research Laboratory, this project investigated the practical convergence behavior and network overhead of FL across heterogeneous embedded compute units.'
      },
      {
        title: 'System Architecture & Communication Topologies',
        content: 'The platform coordinates model synchronization through a dual transport layer: MQTT handles lightweight heartbeat telemetry and parameter broadcast announcements, while secure bidirectional WebSockets stream compressed neural network weight deltas.',
        items: [
          {
            title: 'Aggregation Server',
            description: 'Coordinates training rounds, applies FedAvg / FedProx aggregation with momentum, and tracks global validation loss.'
          },
          {
            title: 'Edge Worker Nodes',
            description: 'Run on physical Raspberry Pi 4/5 and NVIDIA Jetson hardware, executing local backpropagation on isolated local datasets.'
          },
          {
            title: 'Dynamic Fault Tolerance',
            description: 'Asynchronous round completion allows the global model to progress without stalling if high-latency edge nodes disconnect.'
          }
        ]
      }
    ]
  },
  {
    id: 'axiom-chess',
    title: 'Axiom Chess: Spatial Computing & HCI Ecosystem',
    label: 'Spatial Computing & AI Chess',
    category: 'AI & Computer Vision',
    year: '2025–2026',
    tech: 'PyTorch | OpenCV | YOLO | Minimax ML | Augmented Reality',
    techs: ['PyTorch', 'OpenCV', 'YOLO', 'Python', 'Augmented Reality'],
    description: 'Augmented chess ecosystem combining computer vision (YOLO pose & piece detection), a custom Minimax AI engine evaluated with SGD regression, and dynamic AR projector tracking directly on the physical board.',
    detailDescription: 'Axiom Chess is a comprehensive spatial computing and augmented reality chess ecosystem structured into three independent and complementary modules: Axiom Engine (a custom Minimax search engine with Alpha-Beta pruning evaluating positions with a trained SGD linear regressor across 7 normalized heuristics), Axiom Vision (a real-time computer vision pipeline utilizing YOLO Pose for 4-corner board homography and a 12-class YOLO model for piece localization), and Axiom Light (an augmented reality projection module projecting dynamic moves, legal paths, and analysis overlays directly onto physical chessboards in real time).',
    image: '/images/projects/axiom.webp',
    github: 'https://github.com/PLRpower/axiom-chess',
    featured: true,
    gridClass: 'md:col-span-2 lg:col-span-2 lg:row-span-1',
    architectureTree: `axiom-chess/
├── axiom_engine/              # AI Chess Engine & ML Evaluation
│   ├── alpha_beta.py          # Minimax search with Alpha-Beta pruning
│   ├── board_to_features.py   # Extraction of 7 normalized heuristic features
│   ├── model_evaluation.py    # Position evaluation using trained SGDRegressor
│   ├── model_training.py      # Batched parallel training pipeline
│   ├── axiom_model.pkl        # Serialized regression model weights
│   ├── main.py                # Interactive CLI to play against the engine
│   └── README.md              # Detailed engine documentation
│
├── axiom_vision/              # Computer Vision & Game Tracking
│   ├── core/                  # Board/piece detection, geometry, FEN extraction
│   ├── game/                  # Game state tracking (GameTracker) & engine bridges
│   ├── pipeline/              # Video stream, live webcam, static image pipelines
│   ├── tools/                 # Capture, auto-annotation & PTZ control tools
│   ├── models/                # AI model weights (phase_a2.pt, phase3.pt, yolo26m.pt)
│   ├── assets/                # 2D graphics for board overlay
│   └── main.py                # Vision entry point
│
├── axiom_light/               # Augmented Reality & Physical Projection
│   ├── calibrator.py          # Camera-projector geometric calibration & homography
│   ├── main.py                # Real-time board tracking & dynamic projection
│   ├── calibration_geometry.npy # Saved calibration homography matrix
│   └── nudge_offsets.npy      # Saved fine-tune millimeter offsets
│
├── main.py                    # Unified main entry point
└── requirements.txt           # Consolidated project dependencies`,
    highlights: [
      {
        title: 'Real-Time Computer Vision (Axiom Vision)',
        description: 'Instant 4-corner board detection using YOLO Pose (phase_a2.pt) and 12-class piece recognition (phase3.pt) with bottom-center anchor projection.'
      },
      {
        title: 'Dynamic AR Projection (Axiom Light)',
        description: 'Camera-projector homography mapping perspective-corrected game moves, threats, and engine evaluations directly onto physical wooden boards.'
      },
      {
        title: 'Hybrid Engine Evaluation (Axiom Engine)',
        description: 'Alpha-Beta Minimax search evaluating positions with an SGD linear regressor trained over 7 normalized heuristics instead of hardcoded piece-square tables.'
      },
      {
        title: 'Temporal Move Validation & PGN Export',
        description: 'Temporal stability filtering confirms physical human moves, verifies move legality through python-chess, and exports live matches to standard PGN files.'
      }
    ],
    sections: [
      {
        title: 'Core Module 1: Axiom Engine',
        subtitle: 'AI Chess Engine & Machine Learning Evaluation',
        content: 'Unlike traditional chess engines that rely on static, manually tuned piece-square tables, Axiom Engine pairs classic Minimax search and Alpha-Beta pruning with a machine-learning heuristic evaluator. Positions are converted into 7 normalized feature vectors before inference via an SGDRegressor.',
        items: [
          {
            title: '7 Extracted Heuristic Features',
            description: 'Material balance, King safety, Center control, Pressure/Attacks, Piece development, Global square control, and Dynamic mobility.'
          },
          {
            title: 'Parallel Training Pipeline',
            description: 'Trained on massive game databases using batched mini-batch stochastic gradient descent to align continuous evaluation scores.'
          }
        ]
      },
      {
        title: 'Core Module 2: Axiom Vision',
        subtitle: 'Real-Time Computer Vision & Spatial Game Tracking',
        content: 'Axiom Vision turns standard video streams or live PTZ webcams into digital game state records (FEN). The vision pipeline operates in two synchronized deep-learning stages:',
        items: [
          {
            title: 'Board Detection & Warp',
            description: 'YOLO Pose model detects the 4 physical board corners, enabling a perspective warp into a normalized 8x8 square reference plane.'
          },
          {
            title: 'Piece Classification & Anchor Projection',
            description: 'A 12-class YOLO model detects pieces and projects their bottom-center contact points onto the corresponding grid cell, overcoming perspective occlusions.'
          },
          {
            title: 'Temporal Move Stability',
            description: 'A temporal window filters out player hand movements and transient occlusions before committing a legal move to the game tree.'
          }
        ]
      },
      {
        title: 'Core Module 3: Axiom Light',
        subtitle: 'Augmented Reality Projection & Spatial Calibration',
        content: 'Axiom Light bridges the digital and physical worlds by projecting contextual guidance onto the physical board. It features automated homography calibration between the projector lens and the tracking camera, with sub-millimeter keyboard nudge adjustments (N key). The projected light highlights opponent moves, hints optimal engine moves, and projects danger zones directly onto the pieces.'
      }
    ],
    commands: [
      {
        label: 'Unified Interactive Launcher',
        command: 'python main.py',
        description: 'Interactively select vision, engine, or light module.'
      },
      {
        label: 'Launch Computer Vision Tracking',
        command: 'python main.py -m vision',
        description: 'Starts webcam feed with real-time FEN tracking and piece bounding boxes.'
      },
      {
        label: 'Play against Axiom Engine CLI',
        command: 'python main.py -m engine --depth 3 --color white',
        description: 'Play against the hybrid ML Alpha-Beta engine in terminal.'
      },
      {
        label: 'Start AR Projector Display',
        command: 'python main.py -m light --camera 1',
        description: 'Launches full-screen perspective-warped projection on secondary monitor/projector.'
      }
    ]
  },
  {
    id: 'mundo-browser',
    title: 'Mundo Browser',
    label: 'Desktop Systems & Privacy Engine',
    category: 'Systems & Desktop',
    tech: 'C# | .NET 10 | Microsoft WebView2 | WPF-UI Fluent | EcoMode',
    techs: ['C#', '.NET 10', 'WPF / Fluent', 'WebView2', 'EcoMode'],
    description: 'Fast, lightweight desktop web browser engineered on .NET 10 and Microsoft WebView2 featuring native dual-pane split-view, in-process ad-blocking, and an intelligent EcoMode memory manager.',
    detailDescription: 'A modern desktop web browser engineered from the ground up on .NET 10 and Microsoft WebView2. Designed for content-first immersion and strict local privacy: zero telemetry, local profile storage, in-process network filtering using compiled FrozenSet<string> domain lookups, and automated cookie consent dismissal. Features native dual-pane Split-View for side-by-side multitasking without multiple windows, and an intelligent EcoMode background tab discarder that reclaims up to 1.3 GB of RAM (19.4%) under heavy 35-tab sessions while maintaining 1.09% idle CPU consumption. Empirically validated across 10 hardware configurations against Chrome, Edge, and Brave.',
    image: '/images/projects/mundo-browser/benchmark-summary.webp',
    github: 'https://github.com/PLRpower/mundo-browser',
    featured: true,
    gridClass: 'md:col-span-2 lg:col-span-1 lg:row-span-1',
    highlights: [
      {
        title: 'Native Dual-Pane Split-View',
        description: 'Browse two pages side-by-side or stacked in a single window without juggling multiple windows, backed by persistent session state restoration and custom search engines.'
      },
      {
        title: 'In-Process Ad Blocker & Clean Web',
        description: 'Network interception powered by compiled .NET 10 FrozenSet<string> domain lookup for zero-latency filtering, coupled with automatic cookie modal removal and zero remote telemetry.'
      },
      {
        title: 'EcoMode Background Memory Manager',
        description: 'Intelligently suspends idle background tabs to reclaim up to 1,328 MB of RAM (19.4% allocation) during heavy 35-tab sessions, with built-in audio playback and download protection.'
      },
      {
        title: 'Empirical Hardware Benchmarking',
        description: 'Automated PowerShell benchmark harness measuring CPU and memory across 10 machines, achieving 1.09% idle CPU footprint and peak spike containment under 15% during heavy concurrency.'
      }
    ],
    gallery: [
      {
        url: '/images/projects/mundo-browser/benchmark-summary.webp',
        title: 'Mundo Browser Benchmark Summary',
        caption: 'Empirical resource comparison across 10 hardware configurations evaluating Average CPU, Peak CPU, Final RAM, and Reclaimed Memory against Chrome, Edge, and Brave.',
        span: 'full'
      }
    ],
    sections: [
      {
        title: '1. Overview & Architectural Vision',
        content: 'Modern web browsers have become cluttered and heavy, burdened by continuous background telemetry, intrusive ad-trackers, cookie consent banners, and massive memory bloat. Mundo Browser provides an ultra-fast, minimalist alternative for productivity and research with four guiding pillars:',
        items: [
          {
            title: 'Content-First Immersion',
            description: 'Interface stays out of the way: sleek 4px scrollbars, retractable navigation and address bars (CTRL+E), and native Windows 11 Mica/Acrylic backdrops.'
          },
          {
            title: 'Built-in Multitasking',
            description: 'Native dual-pane Split-View lets users browse two pages side-by-side or stacked horizontally/vertically without managing multiple OS windows.'
          },
          {
            title: 'Privacy by Design',
            description: 'Strict local storage in %APPDATA%/MundoBrowser/WebView2Data. Zero remote analytics, zero tracking, and automated cookie banner dismissal.'
          },
          {
            title: 'Resource Discipline',
            description: 'EcoMode tab discarding unloads inactive memory while preserving page state for instant reloading upon focus.'
          }
        ]
      },
      {
        title: '2. Standardized Empirical Benchmark Matrix',
        subtitle: 'Average Measurements across 10 Windows 11 Hardware Configurations',
        content: 'To evaluate real-world performance, standardized automated benchmarks were recorded across 10 distinct physical hardware configurations (laptops to multi-core workstations) over 5 high-demand scenarios:',
        table: {
          headers: ['Browser', 'Scenario', 'Tabs', 'Avg CPU (%)', 'Peak CPU (%)', 'Final RAM (MB)', 'Reclaimed RAM'],
          rows: [
            ['Google Chrome', 'S1: 1 Tab (Idle)', '1', '6.19%', '19.53%', '1,675.1 MB', '0 MB'],
            ['Microsoft Edge', 'S1: 1 Tab (Idle)', '1', '4.58%', '25.40%', '1,620.9 MB', '362 MB'],
            ['Brave', 'S1: 1 Tab (Idle)', '1', '3.42%', '12.85%', '1,638.4 MB', '42 MB'],
            ['Mundo Browser', 'S1: 1 Tab (Idle)', '1', '1.09%', '5.08%', '1,576.3 MB', '125 MB'],
            ['Google Chrome', 'S2: 5 Tabs (Multitask)', '5', '6.53%', '23.82%', '1,940.4 MB', '10 MB'],
            ['Microsoft Edge', 'S2: 5 Tabs (Multitask)', '5', '6.51%', '19.15%', '2,338.0 MB', '0 MB'],
            ['Brave', 'S2: 5 Tabs (Multitask)', '5', '4.75%', '18.60%', '2,120.5 MB', '48 MB'],
            ['Mundo Browser', 'S2: 5 Tabs (Multitask)', '5', '5.35%', '21.48%', '2,336.1 MB', '74 MB'],
            ['Google Chrome', 'S3: 20 Tabs (Stress)', '20', '12.23%', '36.72%', '4,073.5 MB', '309 MB'],
            ['Microsoft Edge', 'S3: 20 Tabs (Stress)', '20', '9.00%', '27.35%', '3,967.7 MB', '15 MB'],
            ['Brave', 'S3: 20 Tabs (Stress)', '20', '7.62%', '24.15%', '3,842.0 MB', '245 MB'],
            ['Mundo Browser', 'S3: 20 Tabs (Stress)', '20', '4.53%', '10.55%', '3,663.1 MB', '729 MB'],
            ['Google Chrome', 'S4: 35 Tabs (Mega Sprawl)', '35', '13.50%', '45.60%', '6,768.0 MB', '96 MB'],
            ['Microsoft Edge', 'S4: 35 Tabs (Mega Sprawl)', '35', '9.80%', '34.10%', '6,126.9 MB', '76 MB'],
            ['Brave', 'S4: 35 Tabs (Mega Sprawl)', '35', '8.85%', '28.70%', '6,190.0 MB', '185 MB'],
            ['Mundo Browser', 'S4: 35 Tabs (Mega Sprawl)', '35', '6.20%', '14.80%', '5,504.0 MB', '1,328 MB (19.4%)']
          ]
        }
      },
      {
        title: '3. Key Analytical Findings',
        content: '1. Idle Energy Efficiency: Mundo Browser records just 1.09% CPU utilization during idle operation (vs 6.19% on Chrome and 4.58% on Edge), significantly extending laptop battery autonomy.\n\n2. Peak Load Containment: During heavy 35-tab concurrency, peak CPU spikes remained constrained at 14.80%, compared to 45.60% on Chrome and 34.10% on Edge, preventing OS stuttering.\n\n3. Memory Recovery: EcoMode automatically reclaimed 1,328 MB of memory during peak sprawl, keeping active system memory responsive.'
      }
    ],
    commands: [
      {
        label: 'Clone & Build',
        command: 'git clone https://github.com/PLRpower/mundo-browser.git\ncd mundo-browser\ndotnet build MundoBrowser/MundoBrowser.csproj -c Release',
        description: 'Requires .NET 10.0 SDK and Windows 10/11.'
      },
      {
        label: 'Run Application',
        command: 'dotnet run --project MundoBrowser/MundoBrowser.csproj -c Release',
        description: 'Launches Mundo Browser with hardware acceleration.'
      },
      {
        label: 'Reproduce Experimental Benchmarks',
        command: 'pwsh -ExecutionPolicy Bypass -File scratch/run_full_fixed_benchmark.ps1',
        description: 'Runs the automated multi-browser test harness on local hardware.'
      }
    ]
  },
  {
    id: 'vehicle-route-optimization',
    title: 'Delivery Route Optimization for Smart Multimodal Mobility',
    label: 'Operations Research & Combinatorics',
    category: 'Data Science & OR',
    year: '2025',
    tech: 'Python | PuLP & CBC | NetworkX | Genetic Algorithms | Pandas',
    techs: ['Python', 'PuLP / CBC', 'Genetic Algorithm', 'NetworkX', 'Pandas'],
    description: 'Operations Research and combinatorial optimization solving the Traveling Salesman Problem with Precedence Constraints and Incomplete Graphs (TSP-CP) for multimodal urban mobility.',
    detailDescription: 'An operations research platform developed as part of an ADEME call for expressions of interest alongside the CesiCDP research team to revolutionize logistics in intelligent multimodal urban mobility. Tackles the Traveling Salesman Problem with Precedence Constraints and Incomplete Graphs (TSP-CP), an NP-Hard problem proven via reduction from the classic TSP. Models road closures (blocked edges with infinite cost) and DAG delivery precedences. Implements and compares three distinct mathematical paradigms: an exact Integer Linear Programming solver (PuLP/CBC with MTZ subtour elimination), a greedy heuristic with 2-level backtracking ("relance"), and an evolutionary Genetic Algorithm with Order Crossover (OX) benchmarked across thousands of random topological graphs.',
    image: '/images/projects/delivery-route-optimization/graph-exact-solution.webp',
    github: 'https://github.com/PLRpower/delivery-route-optimization',
    featured: true,
    gridClass: 'md:col-span-2 lg:col-span-2 lg:row-span-1',
    highlights: [
      {
        title: 'Mathematical Problem Formulation (TSP-CP)',
        description: 'Proved NP-Completeness via reduction from classic TSP, formulating linear constraints with Miller-Tucker-Zemlin subtour elimination on weighted graphs G = (V, E, c).'
      },
      {
        title: 'Exact Integer Linear Programming Solver',
        description: 'Formulated Branch and Cut ILP models using PuLP and the CBC solver to calculate mathematically optimal delivery routes.'
      },
      {
        title: 'Greedy Heuristic with Two-Level Backtracking',
        description: 'Engineered a polynomial-time heuristic using precomputed Dijkstra shortest paths and a 2-level backtracking "relance" mechanism to escape graph dead-ends.'
      },
      {
        title: 'Order Crossover (OX) Genetic Algorithm',
        description: 'Implemented an evolutionary meta-heuristic with Order Crossover and heavy penalty functions, achieving near-optimal routes on large graphs.'
      }
    ],
    gallery: [
      {
        url: '/images/projects/delivery-route-optimization/graph-exact-solution.webp',
        title: 'Calculated Exact Optimal Route',
        caption: 'Visualization of the absolute optimal delivery tour computed via Integer Linear Programming, navigating blocked roads and satisfying all precedence rules.',
        span: 'half'
      },
      {
        url: '/images/projects/delivery-route-optimization/graph-heuristic-solution.webp',
        title: 'Greedy Heuristic Route with Backtracking',
        caption: 'Fast polynomial-time route produced by the greedy solver using Dijkstra paths and 2-level backtracking.',
        span: 'half'
      },
      {
        url: '/images/projects/delivery-route-optimization/graph-genetic-solution.webp',
        title: 'Evolutionary Genetic Route Solution',
        caption: 'Near-optimal delivery path discovered by the Genetic Algorithm through generations of Order Crossover (OX).',
        span: 'half'
      },
      {
        url: '/images/projects/delivery-route-optimization/computation-time-vs-cities.webp',
        title: 'Execution Time vs Network Size',
        caption: 'Comparative execution time scaling: exponential growth of exact solver (O(2^(n^2))) versus stable polynomial growth of heuristic and GA.',
        span: 'half'
      },
      {
        url: '/images/projects/delivery-route-optimization/average-cost-vs-cities.webp',
        title: 'Average Solution Cost vs City Count',
        caption: 'Average cost comparison showing the GA tracking the exact optimal floor closely across increasing graph sizes.',
        span: 'half'
      },
      {
        url: '/images/projects/delivery-route-optimization/relative-gap-to-optimal.webp',
        title: 'Relative Optimality Gap (%)',
        caption: 'Empirical measurement of relative error gap between heuristic solvers and exact optimum as network size increases.',
        span: 'half'
      },
      {
        url: '/images/projects/delivery-route-optimization/boxplot-gap-to-optimal.webp',
        title: 'Performance Gap Distribution Boxplot',
        caption: 'Tight interquartile range of the Genetic Algorithm illustrating superior reliability and consistency over greedy heuristics.',
        span: 'half'
      },
      {
        url: '/images/projects/delivery-route-optimization/constraint-impact-diagram.webp',
        title: 'Constraint Impact on Routing Efficiency',
        caption: 'Sensitivity analysis showing how graph density, precedence rules, and road blockage rates compound route costs.',
        span: 'half'
      },
      {
        url: '/images/projects/delivery-route-optimization/heatmap-constraint-impact.webp',
        title: 'Multi-Dimensional Blockage Heatmap',
        caption: 'Heatmap illustrating the compounding penalty of blocked routes: beyond 40% blockage, path costs plateau due to severe detours.',
        span: 'half'
      },
      {
        url: '/images/projects/delivery-route-optimization/hyperparameter-sensitivity-analysis.webp',
        title: 'Genetic Algorithm Hyperparameter Sweeps',
        caption: 'Sensitivity sweeps across population sizes, generation counts, and mutation rates (finding 5,000 population & 20-50% mutation optimal).',
        span: 'half'
      }
    ],
    sections: [
      {
        title: 'Mathematical Formulation & Complexity',
        content: 'The city network is represented as a connected, directed weighted graph G = (V, E, c) where V is the set of cities, E is the route network, and c_ij represents Euclidean distances. Three constraint classes govern the optimization:\n\n1. Routing Viability: c_ij = infinity for blocked, prohibited, or under-construction road segments.\n2. Precedence Constraints (DAG): A directed acyclic dependency set P where (i,j) in P requires city i to be visited before city j.\n3. Hamiltonian Tour: The route must start and end at the depot (Node 0) while covering all target cities exactly once.\n\nWe formally proved the NP-Completeness of this TSP-CP problem via reduction from standard TSP.'
      },
      {
        title: 'Three Algorithmic Paradigms Compared',
        items: [
          {
            title: 'Exact Solver (PuLP & CBC Branch-and-Cut)',
            description: 'Guarantees mathematically absolute optimality using binary edge variables x_ij and continuous MTZ variables u_i for subtour elimination. Exponential time complexity O(2^(n^2)), strictly viable for n <= 12.'
          },
          {
            title: 'Greedy Heuristic with Backtracking ("Relance")',
            description: 'Incrementally selects valid unvisited nodes with satisfied precedences using pre-computed Dijkstra shortest paths. If trapped in a topological dead-end, it searches two levels of visited nodes to untangle pathing.'
          },
          {
            title: 'Meta-Heuristic Genetic Algorithm',
            description: 'Represents candidate tours as chromosome permutations. Applies Order Crossover (OX) to preserve relative order without duplicate cities, heavy penalty functions for precedence violations, and 20-50% random swap mutation.'
          }
        ]
      }
    ]
  },
  {
    id: 'conway-game-of-life',
    title: "Conway's Game of Life: Advanced C++20 & Parallel Engine",
    label: 'C++20 & Parallel Systems',
    category: 'C++ & Systems',
    tech: 'C++20 | OpenMP | SFML | CMake | SOLID Principles | OOP',
    techs: ['C++20', 'OpenMP', 'SFML', 'SOLID Architecture', 'Multi-Threading'],
    description: 'High-performance cellular automaton in C++20 featuring polymorphic SFML/Console rendering, OpenMP multi-core parallelization, toroidal grid wrapping, obstacle cells, and rigorous UML modeling.',
    detailDescription: 'A deep dive into modern C++20, clean object-oriented software engineering, and parallel performance optimization. Simulates massive cellular automaton grid universes at high framerates using OpenMP multi-core thread distribution, contiguous memory layouts for CPU cache locality, and an extensible architecture strictly adhering to SOLID principles. Features decoupled rendering engines (SFML graphics with dynamic screen auto-resizing vs terminal text), toroidal infinite wrapping, fixed-state obstacle cells, double-buffering state synchronization, and an automated verification unit-testing suite.',
    image: '/images/projects/conway-game-of-life/class-diagram-final.webp',
    github: 'https://github.com/PLRpower/conway-game-of-life',
    featured: true,
    gridClass: 'md:col-span-2 lg:col-span-2 lg:row-span-1',
    highlights: [
      {
        title: 'SOLID Object-Oriented Architecture',
        description: 'Strict separation of concerns between simulation lifecycle (JeuDeLaVie), state management (Grille), individual cell behavior (Cellule), persistence (Fichier), and polymorphic rendering (Affichage).'
      },
      {
        title: 'Multi-Core OpenMP Parallelization',
        description: 'Parallelized cell neighbor counting across multiple CPU cores with OpenMP, maximizing cache locality on contiguous grid buffers.'
      },
      {
        title: 'Dual Polymorphic Rendering (SFML & Console)',
        description: 'Polymorphic display architecture supporting both low-overhead ASCII terminal output and GPU-accelerated SFML 2D rendering with dynamic auto-resizing.'
      },
      {
        title: 'Toroidal Grid & Fixed Obstacle Cells',
        description: 'Modular arithmetic topology for infinite seamless edge-wrapping, combined with indestructible obstacle cells influencing neighborhood evolution.'
      }
    ],
    gallery: [
      {
        url: '/images/projects/conway-game-of-life/class-diagram-final.webp',
        title: 'Complete UML Class Diagram',
        caption: 'Object-oriented class hierarchy detailing relationships between JeuDeLaVie, Grille, Cellule, Fichier, and the abstract Affichage hierarchy.',
        span: 'full'
      },
      {
        url: '/images/projects/conway-game-of-life/use-case-diagram.webp',
        title: 'UML Use Case Diagram',
        caption: 'User interaction pathways mapping grid generation (file, random, manual), display selection, and simulation execution.',
        span: 'half'
      },
      {
        url: '/images/projects/conway-game-of-life/activity-diagram.webp',
        title: 'Simulation Lifecycle Activity Diagram',
        caption: 'Activity flow tracing initialization, generation step updates, double-buffered state swapping, and rendering triggers.',
        span: 'half'
      },
      {
        url: '/images/projects/conway-game-of-life/sequence-general.webp',
        title: 'General Lifecycle Sequence Diagram',
        caption: 'Sequence of message exchanges between core components during simulation setup and execution.',
        span: 'half'
      },
      {
        url: '/images/projects/conway-game-of-life/sequence-grid.webp',
        title: 'Grid State Update Sequence',
        caption: 'Detailed sequence showing neighbor counting and simultaneous generation updates to prevent state bleeding.',
        span: 'half'
      },
      {
        url: '/images/projects/conway-game-of-life/sequence-graphics.webp',
        title: 'SFML Graphics Rendering Sequence',
        caption: 'Interactions between the graphics renderer, SFML window event loop, and cell color updates.',
        span: 'half'
      },
      {
        url: '/images/projects/conway-game-of-life/toroidal-grid.webp',
        title: 'Toroidal Wrapping Grid Concept',
        caption: 'Modular arithmetic concept wrapping top/bottom and left/right boundaries into an infinite donut topology.',
        span: 'half'
      },
      {
        url: '/images/projects/conway-game-of-life/code-torique.webp',
        title: 'Modular Boundary Code Implementation',
        caption: 'Clean C++ modular arithmetic safely wrapping cell coordinates without out-of-bounds memory errors.',
        span: 'half'
      },
      {
        url: '/images/projects/conway-game-of-life/code-definir-vivant.webp',
        title: 'Obstacle Cell Implementation',
        caption: 'Encapsulated state constraints allowing fixed obstacle cells to influence neighbor counts indefinitely.',
        span: 'half'
      },
      {
        url: '/images/projects/conway-game-of-life/code-parallelization.webp',
        title: 'OpenMP Multithreading Directive',
        caption: 'OpenMP parallel loop directives distributing cellular neighbor calculations across multi-core processors.',
        span: 'half'
      },
      {
        url: '/images/projects/conway-game-of-life/code-test-unitaire.webp',
        title: 'Automated Unit Verification Suite',
        caption: 'Unit test framework asserting deterministic grid generation states against verified baseline outputs.',
        span: 'half'
      },
      {
        url: '/images/projects/conway-game-of-life/code-start.webp',
        title: 'Main Game Loop Architecture',
        caption: 'Encapsulated JeuDeLaVie::start() method maintaining clean, self-documenting high-level control flow.',
        span: 'half'
      },
      {
        url: '/images/projects/conway-game-of-life/console-display.webp',
        title: 'Terminal Console Rendering',
        caption: 'Minimalist, fast text-based cellular grid rendering directly in terminal output.',
        span: 'half'
      },
      {
        url: '/images/projects/conway-game-of-life/small-grid-gui.webp',
        title: 'SFML GUI Display (Small Grid)',
        caption: 'Real-time 2D graphical display of cellular patterns with dynamic square scaling.',
        span: 'half'
      },
      {
        url: '/images/projects/conway-game-of-life/large-grid-gui.webp',
        title: 'SFML GUI Display (Dense Grid Universe)',
        caption: 'Dense 200x200 grid universe running smoothly at high framerates backed by OpenMP parallel computation.',
        span: 'full'
      }
    ],
    sections: [
      {
        title: 'Architectural Excellence & SOLID Design',
        content: 'Before writing implementation code, the entire system architecture was drafted through comprehensive UML diagrams. The core engine is orchestrated by JeuDeLaVie, which coordinates decoupled domain classes:\n\n- Grille: Encapsulates dynamic 2D grid allocation, boundary checking, and generation swapping.\n- Cellule: Represents individual cell states (dead, alive, obstacle).\n- Fichier: Manages persistent file I/O for saving and loading complex automaton seed patterns.\n- Affichage: Abstract base class adhering to the Open/Closed Principle, allowing new visualizers (Console, SFML) to plug in without altering simulation logic.'
      },
      {
        title: 'Engineering Challenges & Lessons Learned',
        items: [
          {
            title: 'Double-Buffering State Synchronization',
            description: 'Cells cannot update their live state while neighboring cells are still computing their next generation. Implemented a double-buffering scheme separating current generation buffers from next generation allocations to eliminate state bleeding.'
          },
          {
            title: 'OpenMP Concurrency & Portability',
            description: 'Deploying OpenMP multithreading across diverse compilers (GCC, Clang, MSVC) required careful handling of thread-private index variables and compiler-specific flags to prevent data races on shared memory.'
          },
          {
            title: 'Dynamic Screen Scaling',
            description: 'Implemented an auto-scaling coordinate mapping function in AffichageGraphique ensuring arbitrary grid dimensions (from 10x10 to 200x200) fit the SFML window without aspect distortion.'
          }
        ]
      }
    ],
    commands: [
      {
        label: 'Compilation (Makefile)',
        command: 'make',
        description: 'Compiles C++20 source with OpenMP and SFML dependencies.'
      },
      {
        label: 'Run Simulation',
        command: './main',
        description: 'Launches interactive console/GUI cellular automaton engine.'
      }
    ]
  },
  {
    id: 'embedded-weather-station',
    title: 'WorldWide Weather Watcher (3W): Maritime IoT Station',
    label: 'Embedded Systems & IoT',
    category: 'Embedded & IoT',
    tech: 'C++ | Arduino UNO R3 | AVR ATmega328 | SysML & UML | Maritime Sensors',
    techs: ['C++', 'Arduino UNO R3', 'AVR Bare-Metal', 'Sensors / GPS', 'SysML / UML'],
    description: 'Resilient embedded maritime weather station prototype on Arduino UNO R3 designed to track ocean climate conditions and prevent marine natural disasters for startup THS.',
    detailDescription: 'WorldWide Weather Watcher (3W) is an advanced maritime embedded weather station prototype developed for startup THS to predict and prevent open-ocean natural disasters such as cyclones. Engineered under strict AVR ATmega328 bare-metal hardware constraints (2 KB SRAM, 16 MHz) using SysML/UML systems modeling (Bête à cornes, Pieuvre, activity, component, use-case diagrams). Features non-blocking Timer ISRs, 4 operational states (Standard, Economy, Maintenance, Configuration), real-time sensor polling (BME280 temperature/humidity/pressure, GPS coordinates, DS1307 RTC, luminosity), and corruption-resistant FAT32 SD card file rotation.',
    image: '/images/projects/embedded-weather-station/hardware-top.webp',
    github: 'https://github.com/PLRpower/embedded-weather-station',
    gridClass: 'md:col-span-2 lg:col-span-2 lg:row-span-1',
    highlights: [
      {
        title: 'Rigorous SysML & UML Systems Engineering',
        description: 'Comprehensive upfront architecture mapping using SysML "Bête à cornes", "Pieuvre" interaction diagrams, and UML activity/sequence/component diagrams before writing firmware.'
      },
      {
        title: '4 State-Machine Operational Modes',
        description: 'Engineered Standard (10m logging), Economy (extended intervals for power saving), Maintenance (safe SD hot-swap buffer flushing), and Configuration (boot CLI console) states.'
      },
      {
        title: 'Non-Blocking Execution & Hardware Timer ISRs',
        description: 'Employed hardware interrupts and Timer ISRs for button debouncing and RGB LED diagnostics, ensuring continuous, unblocked sensor telemetry on an 8-bit AVR.'
      },
      {
        title: 'Fail-Safe SD Logging & Dynamic Rotation',
        description: 'Implemented automatic log file size rotation on FAT32 and safe buffer flushing to eliminate file system corruption during power loss or card swap at sea.'
      }
    ],
    gallery: [
      {
        url: '/images/projects/embedded-weather-station/hardware-top.webp',
        title: 'Complete 3W Prototype Hardware Assembly',
        caption: 'Top-down view of the assembled Arduino UNO R3 station with BME280, GPS module, DS1307 RTC, SD reader, RGB indicator, and control inputs.',
        span: 'full'
      },
      {
        url: '/images/projects/embedded-weather-station/pieuvre-diagram.webp',
        title: 'SysML Pieuvre Interaction Diagram',
        caption: 'SysML interaction analysis detailing principal and constraint interactions between the 3W system, maritime crew, sensors, and ocean environment.',
        span: 'half'
      },
      {
        url: '/images/projects/embedded-weather-station/data-flow.webp',
        title: 'Hardware & Sensor Data Flow Architecture',
        caption: 'Interactions and bus protocols between the ATmega328 MCU, I2C sensor bus, SPI SD interface, and UART GPS telemetry.',
        span: 'half'
      },
      {
        url: '/images/projects/embedded-weather-station/use-case-diagram.webp',
        title: 'UML Use Case Diagram',
        caption: 'User interaction pathways mapping crew actions: mode switching, SD hot-swapping, and serial boot parameter configuration.',
        span: 'half'
      },
      {
        url: '/images/projects/embedded-weather-station/activity-diagram.webp',
        title: 'Comprehensive Operational Activity Diagram',
        caption: 'Logic flow mapping sensor acquisition cycles, error conditions, low-power sleep states, and mode transitions.',
        span: 'half'
      },
      {
        url: '/images/projects/embedded-weather-station/component-diagram.webp',
        title: 'UML Component Diagram',
        caption: 'Modular firmware architecture decomposing sensor drivers, storage managers, CLI consoles, and state machines.',
        span: 'full'
      }
    ],
    sections: [
      {
        title: 'Context & Maritime Disaster Prevention',
        content: 'When navigating the open ocean, sudden weather changes can escalate quickly and dangerously. The WorldWide Weather Watcher (3W) is an advanced embedded station engineered for startup THS to continuously log atmospheric anomalies (rapid barometric drops indicating storm and cyclone formation) in remote maritime areas without cellular coverage.'
      },
      {
        title: '4 Operational State-Machine Modes',
        items: [
          {
            title: 'Standard Mode (Green LED)',
            description: 'The default state. Acquires and logs BME280 atmospheric data and GPS coordinates every 10 minutes to the SD card.'
          },
          {
            title: 'Economy Mode (Blue LED)',
            description: 'Extends battery life on long voyages by doubling logging intervals and halving GPS polling frequency during calm sea stretches.'
          },
          {
            title: 'Maintenance Mode (Orange LED)',
            description: 'Safely unmounts the SD card, flushes cached file buffers for hot-swapping, and streams live sensor telemetry over the USB Serial bus.'
          },
          {
            title: 'Configuration Mode (Yellow LED)',
            description: 'A non-blocking command-line interface accessible at boot to adjust logging intervals, toggle individual sensors, and synchronize the RTC clock.'
          }
        ]
      },
      {
        title: 'Bare-Metal Constraints & Fault Tolerance',
        content: 'Operating on an 8-bit AVR ATmega328 with only 2 KB of SRAM required strict memory budget discipline. The firmware eliminates memory leaks through static buffer pre-allocation, uses non-blocking Timer ISRs for button input debouncing, and features automatic file rotation on FAT32 to prevent file table corruption during open-ocean vibrations or power drops.'
      }
    ]
  },
  {
    id: 'hydro-regen',
    title: 'Hydro Regen: Regenerative Hydrology Platform',
    label: 'Aquathon 2024 — 3rd Place & Jury Award',
    category: 'Hackathon Winner',
    tech: 'Nuxt.js | Vue 3 | Leaflet & OpenStreetMap | Tailwind CSS | Spatial Data',
    techs: ['Nuxt.js', 'Vue 3', 'Leaflet / OSM', 'Tailwind CSS', 'Hackathon'],
    description: "Award-winning regenerative hydrology mapping platform built in 48h during Aquathon (3rd Place overall & 'Coup de Cœur' Jury Award from Office International de l'Eau).",
    detailDescription: "An interactive decision-support and geospatial visualization platform built in a 48-hour sprint during the Aquathon hackathon. Won 3rd Place overall and the prestigious 'Coup de Cœur' Jury Award from the Office International de l'Eau (OiEau). Inspired by the regenerative hydrology paradigm introduced by Prof. Karl Matthias Wantzen, the platform empowers regional stakeholders to explore watershed regenerative potential ('bassins versants'), define custom intervention polygons, identify drought and flood vulnerability zones, and simulate ecological water retention scenarios.",
    image: '/images/projects/hydro-regen/award-trophy.webp',
    github: 'https://github.com/PLRpower/hydro-regen',
    gridClass: 'md:col-span-2 lg:col-span-2 lg:row-span-2',
    highlights: [
      {
        title: '3rd Place & OiEau Jury Favorite Award',
        description: "Awarded 3rd Place overall and the prestigious 'Coup de Cœur' Jury Award from the Office International de l'Eau among 30+ competing teams."
      },
      {
        title: '48h Interdisciplinary Team Collaboration',
        description: 'Spearheaded frontend and geospatial visualization within a 10-person cross-functional team of software engineers, hydrologists, and environmental specialists.'
      },
      {
        title: 'Interactive Watershed Cartography',
        description: 'Engineered dynamic Leaflet & OpenStreetMap geospatial tools allowing users to search addresses, explore watersheds, and draw custom intervention polygons.'
      },
      {
        title: 'Regenerative Hydrology Modeling',
        description: 'Modeled ecological restoration interventions (swales, wetland restoration, soil re-permeabilization) based on Prof. Wantzen’s regenerative water cycle principles.'
      }
    ],
    gallery: [
      {
        url: '/images/projects/hydro-regen/award-trophy.webp',
        title: 'Official Hackathon Award Trophy',
        caption: "Celebrating 3rd Place overall and the 'Coup de Cœur' Jury Award from the Office International de l'Eau at the Aquathon 2024 finale.",
        span: 'half'
      },
      {
        url: '/images/projects/hydro-regen/jury-pitch.webp',
        title: 'Pitching to the Expert Jury',
        caption: 'Delivering the technical demonstration and ecological vision to the hydrologist jury on Sunday afternoon.',
        span: 'half'
      },
      {
        url: '/images/projects/hydro-regen/team-sprint.webp',
        title: 'Intensive Team Sprint on Friday Evening',
        caption: 'Late-night architecture and design sprint with the 10-person interdisciplinary team aligning data models.',
        span: 'half'
      },
      {
        url: '/images/projects/hydro-regen/project-briefing.webp',
        title: 'Project Professor & Domain Briefing',
        caption: 'Initial briefing on regenerative hydrology concepts and watershed conservation priorities.',
        span: 'half'
      },
      {
        url: '/images/projects/hydro-regen/finalists-on-stage.webp',
        title: 'Hackathon Finalists on Stage',
        caption: 'The competing engineering teams gathered on stage before the announcement of the winning projects.',
        span: 'half'
      },
      {
        url: '/images/projects/hydro-regen/award-ceremony.webp',
        title: 'Award Ceremony Celebration',
        caption: 'Celebrating our dual recognition by the Office International de l’Eau after 48 hours of nonstop engineering.',
        span: 'half'
      }
    ],
    sections: [
      {
        title: 'The Vision: Regenerative Hydrology',
        content: 'Traditional water management treats water as an extractive resource or a risk to channel away as fast as possible through concrete infrastructure. Regenerative hydrology—championed by Professor Karl Matthias Wantzen—inverts this logic: it focuses on slowing, spreading, and sinking rainwater into the soil to recharge aquifers, restore natural humidity cycles, and revitalize local micro-climates. Hydro Regen translates these scientific principles into an intuitive digital decision-support tool.'
      },
      {
        title: 'Geospatial Web Application Features',
        items: [
          {
            title: 'Interactive Watershed Selection',
            description: 'Geolocate or search addresses to load watershed basin boundaries ("bassins versants") with hydrological flow data.'
          },
          {
            title: 'Custom Polygon Drawing Tools',
            description: 'Empowers municipal decision-makers to outline specific plots of land and simulate re-naturalization impacts.'
          },
          {
            title: 'Ecological Intervention Simulations',
            description: 'Simulates the retention capacity gained through swales, retention ponds, urban de-paving, and agro-forestry buffers.'
          }
        ]
      }
    ]
  },
  {
    id: 'a-la-carte',
    title: 'À la carte — Modern Kitchen Operating System',
    label: 'Full-Stack & Multi-Modal AI',
    category: 'Full-Stack & AI',
    year: '2025–2026',
    tech: 'React 18 | Vite | TypeScript | Tailwind CSS | Supabase | Gemini AI | Stripe | PWA',
    techs: ['React 18', 'TypeScript', 'Supabase', 'Gemini AI', 'Tailwind CSS', 'Stripe', 'PWA'],
    description: 'The modern, collaborative kitchen operating system for families. Plan meals, track real-time pantry stock, generate smart shopping lists, and extract recipes via multi-modal AI (camera OCR, Gemini suggestions, URL web scraper).',
    detailDescription: 'À la carte unifies everyday household food logistics into a single real-time collaborative platform. Designed from the ground up around a private Family circle where all household members share synchronized access to pantry stock, menus, and shopping carts. Features a multi-modal recipe ingestion pipeline (manual entry, Gemini AI Chef suggestions from fridge ingredients, URL web scraping, and computer vision camera OCR scanning physical cookbook cards), preloaded with 108 verified recipes across thematic Starter Packs. Engineered as an offline-capable PWA with React 18, Supabase PostgreSQL Row-Level Security (RLS), and Deno serverless edge functions.',
    image: '/images/projects/a-la-carte/logo-transparent.webp',
    github: 'https://github.com/PLRpower/a-la-carte',
    demo: 'https://a-la-carte-app.vercel.app/',
    gridClass: 'md:col-span-2 lg:col-span-1 lg:row-span-1',
    highlights: [
      {
        title: 'Real-Time Collaborative Family Hub',
        description: 'Private family workspace with instantaneous cross-device synchronization powered by Supabase PostgreSQL Row-Level Security (is_shared_with_me).'
      },
      {
        title: 'Multi-Modal Recipe Ingestion Pipeline',
        description: 'Import recipes in seconds via Google Gemini AI suggestions from available stock, camera OCR scan of physical recipe cards, or one-click URL web scraping.'
      },
      {
        title: 'Aisle-Optimized Smart Shopping Lists',
        description: 'Interactive grocery lists automatically organized by supermarket aisles with optimistic local cache updates via TanStack Query.'
      },
      {
        title: 'Kitchen-First Progressive Web App (PWA)',
        description: 'Installable on iOS, Android, and desktop with offline support, bottom drawers (Vaul), and touch-first kitchen ergonomics.'
      }
    ],
    architectureTree: `┌────────────────────────────────────────────────────────────────────────┐
│                        Frontend Client (React 18 + Vite)                │
│   Tailwind CSS  •  Radix UI (shadcn)  •  TanStack Query  •  Zod Forms   │
└───────────────▲───────────────────────────────────────▲────────────────┘
                │                                       │
                │ Supabase JS Client                    │ HTTP Edge Calls
                │ (PostgreSQL + Auth + Storage)         │ (Bearer JWT Auth)
                ▼                                       ▼
┌──────────────────────────────────────┐  ┌──────────────────────────────┐
│       Supabase Backend Service       │  │   Deno Edge Functions        │
│                                      │  │                              │
│ • PostgreSQL with RLS Policies       │  │ • suggest-recipe (Gemini AI) │
│ • public.is_shared_with_me()         │  │ • scan-recipe-image (Vision) │
│ • GoTrue Authentication              │  │ • scrape-recipe (Web Parser) │
│ • Supabase Storage (Recipe Photos)   │  │ • invite-family (Mailer)     │
└──────────────────────────────────────┘  │ • stripe-webhook (Stripe)    │
                                          └──────────────▲───────────────┘
                                                         │ External APIs
                                          ┌──────────────▼───────────────┐
                                          │ Google Gemini • Stripe API   │
                                          └──────────────────────────────┘`,
    sections: [
      {
        title: 'Multi-Modal Recipe Ingestion Engine',
        content: 'Adding recipes to family menus is frictionless through four parallel creation pathways:',
        items: [
          {
            title: 'AI Chef (Google Gemini API)',
            description: 'Analyzes current ingredients in the pantry and generates balanced, custom recipes on demand via the suggest-recipe Deno Edge Function.'
          },
          {
            title: 'OCR Vision Scanner',
            description: 'Uses computer vision to photograph physical cookbook pages or handwritten recipe cards and convert them into structured ingredients and steps.'
          },
          {
            title: 'One-Click URL Web Scraper',
            description: 'Parses culinary blogs and cooking sites into normalized schema data, discarding ads, trackers, and fluff.'
          },
          {
            title: '108 Preloaded Verified Recipes',
            description: 'Includes structured Starter Packs for Quick & Easy, Student/Budget, Vegetarian, Family Meals, Batch Cooking, and Pastry.'
          }
        ]
      },
      {
        title: 'Database Architecture & Row-Level Security',
        content: 'Data security and multi-tenant separation are enforced strictly at the database engine level via PostgreSQL Row-Level Security (RLS). All rows in recipes, stock, and shopping_list are verified using the security function public.is_shared_with_me(item_owner_id uuid), ensuring complete tenant isolation without application-layer leaks.'
      }
    ]
  },
  {
    id: 'avenird',
    title: 'Avenird',
    label: "Nuit de l'Info 2025 Hackathon",
    category: 'Web & Open Source',
    tech: 'React | Vite | Google Gemini AI | GSAP & Lenis | SCSS',
    techs: ['React', 'Vite', 'Gemini AI', 'GSAP / Lenis', 'SCSS'],
    description: "Educational web platform promoting digital sovereignty and hardware reuse in schools, built in team in 15h overnight for Nuit de l'Info 2025.",
    detailDescription: "An engaging educational platform developed overnight in 15 hours during Nuit de l'Info 2025 for the theme 'Le Village Numérique Résistant'. Champions digital sovereignty, open-source software, and hardware reuse in schools to combat planned obsolescence and vendor lock-in. Features an interactive TruthBot arena comparing Gemini AI responses, a subversive anti-ergonomic switch-based contact form, a hidden playable Snake game easter egg, and high-performance GSAP scroll animations.",
    github: 'https://github.com/PLRpower/Avenird',
    demo: 'https://avenird.vercel.app/',
    gridClass: 'md:col-span-2 lg:col-span-2 lg:row-span-1',
    highlights: [
      {
        title: 'TruthBot AI Model Arena',
        description: 'Integrated Google Gemini API to query and evaluate AI responses side-by-side in real-time, encouraging critical evaluation of algorithmic biases.'
      },
      {
        title: 'Subversive Anti-Ergonomic UI',
        description: 'Implemented an interactive contact form guarded by a system of cascading, interdependent logic switches in React to playfully highlight UX paradigms.'
      },
      {
        title: 'Hidden Playable Snake Easter Egg',
        description: 'Embedded a retro Snake game built from scratch with custom React hooks and collision loops, activated by clicking the Tux Linux logo.'
      },
      {
        title: '15-Hour Overnight Delivery',
        description: 'Engineered and deployed a polished, responsive web application from concept to production in a sprint of 15 consecutive hours within an 8-person student team.'
      }
    ],
    sections: [
      {
        title: 'The Theme: Le Village Numérique Résistant',
        content: 'As education systems become increasingly locked into Big Tech ecosystems—facing premature hardware obsolescence and restrictive licenses—Avenird promotes NIRD (Numérique Inclusif, Responsable et Durable). The platform provides resources and interactive experiences to help students and educators embrace free and open-source software and refurbish older hardware.'
      },
      {
        title: 'Hackathon Engineering Team',
        content: 'Built in 15 consecutive overnight hours by an 8-person student engineering squad: Paul Thomas, Clément Marques, Louison Masson, Amélie Game, Tom Burger, Clément Rinn, Timothée Viriot, and Nell Patou-Parvedy.'
      }
    ]
  },
  {
    id: 'intern-rift',
    title: 'Intern Rift — Web4All Platform',
    label: 'Custom PHP MVC Architecture',
    category: 'Full-Stack & Systems',
    tech: 'PHP 8+ | Custom MVC | MySQL & Eloquent ORM | Twig | Vanilla JS | PSR-12',
    techs: ['PHP 8+', 'Custom MVC', 'Eloquent ORM', 'MySQL', 'Twig'],
    description: 'Centralized internship search platform engineered with a handcrafted PHP MVC framework, Eloquent ORM, and Role-Based Access Control.',
    detailDescription: 'A comprehensive web platform connecting engineering students, partner companies, and academic coordinators. Built entirely with a custom PHP 8 MVC architecture without heavyweight frameworks (like Laravel/Symfony) to master fundamental software engineering design patterns, routing pipelines, Eloquent ORM database relationships, and strict PSR-12 coding standards.',
    github: 'https://github.com/PLRpower/intern-rift',
    demo: 'https://projet-web-alpha.vercel.app',
    gridClass: 'md:col-span-2 lg:col-span-2 lg:row-span-1',
    highlights: [
      {
        title: 'Custom Front-Controller MVC Architecture',
        description: 'Engineered an independent router (index.php), decoupled domain controllers, and Twig template rendering to strictly enforce separation of concerns.'
      },
      {
        title: 'Role-Based Access Control (RBAC)',
        description: 'Implemented granular permission systems tailored to Students (offer discovery, wishlists, applications), Companies (offer authoring), and Academic Coordinators (tracking dashboards).'
      },
      {
        title: 'Robust Security & Data Integrity',
        description: 'Enforced SQL injection immunity via Eloquent ORM prepared statements, automated XSS input sanitization (InputValidator), and secure UUID-based file upload storage.'
      },
      {
        title: 'Relational Database Modeling',
        description: 'Structured multi-table schema with PHP migrations, foreign key constraints, and pivot tables managing application lifecycles.'
      }
    ],
    sections: [
      {
        title: 'Architectural Overview',
        items: [
          {
            title: 'Routing Pipeline (index.php)',
            description: 'Single entry-point front controller parsing request URIs, enforcing middleware, and dispatching to controller actions.'
          },
          {
            title: 'Domain Controllers (src/Controllers)',
            description: 'Dedicated business logic controllers: OfferController, CompaniesController, and ApplicationController.'
          },
          {
            title: 'Database & Eloquent ORM (src/Models)',
            description: 'Eloquent ORM relationships (BelongsTo, HasMany) mapping relational tables while preventing SQL injection vulnerabilities.'
          },
          {
            title: 'Twig Views (src/Views)',
            description: 'Clean template inheritance separating business logic from responsive HTML5/CSS3 presentation.'
          }
        ]
      }
    ]
  },
  {
    id: 'tides',
    title: 'TIDES — Climate Misinformation Detector',
    label: "Nuit de l'Info 2023 Hackathon",
    category: 'Web & Sustainability',
    tech: 'Nuxt 3 | Vue.js | Tailwind CSS | GSAP & AOS | TypeScript',
    techs: ['Nuxt 3', 'Vue.js', 'Tailwind CSS', 'GSAP', 'TypeScript'],
    description: "Interactive web tool exposing climate misinformation and corporate greenwashing, built overnight in 15h for Nuit de l'Info 2023 (Réseau Action Climat challenge).",
    detailDescription: "An educational web application built from scratch in 15 hours during Nuit de l'Info 2023 for the Réseau Action Climat challenge. Designed to teach the public how to distinguish genuine ecological solutions from misleading greenwashing marketing through satirical UX and engaging interactive narratives without individual guilt.",
    github: 'https://github.com/PLRpower/tides',
    gridClass: 'md:col-span-2 lg:col-span-1 lg:row-span-1',
    highlights: [
      {
        title: 'Interactive Greenwashing Satire',
        description: 'Designed a deliberately chaotic, counter-intuitive sub-page demonstrating how misleading corporate initiatives hide empty promises behind flashy marketing noise.'
      },
      {
        title: 'Atmospheric Ocean Aesthetics',
        description: 'Engineered an immersive deep-sea landing experience with Nuxt 3, custom CSS keyframe ocean bubble animations, and GSAP/AOS scroll transitions.'
      },
      {
        title: '15h Hackathon Prototyping',
        description: 'Balanced rapid architectural choices, design system setup, and collaborative development under intense 15-hour time constraints.'
      }
    ]
  },
  {
    id: 'exolia',
    title: 'Exolia Ecosystem Architecture',
    label: 'Distributed Systems & Game Backend',
    category: 'Distributed Systems',
    tech: 'Java | Kotlin | Gradle Monorepo | Spigot / Forge | Netty & HikariCP | Concurrency',
    techs: ['Java / Kotlin', 'Netty', 'HikariCP & MySQL', 'Forge / Spigot', 'Gradle Monorepo'],
    description: 'A distributed multiplayer gaming ecosystem with Forge client mods, high-throughput Spigot backend with HikariCP, and custom launcher infrastructure.',
    detailDescription: 'A central monorepo orchestrating the distributed architecture for the Exolia gaming network. Spans low-level client modifications (Forge 1.12.2 coremod framework injections and Forge 1.16.5 custom rendering pipelines), a high-performance Spigot server backend using HikariCP asynchronous database connection pooling to keep the tick loop non-blocking, and a standalone Java desktop launcher and auto-updating bootstrapper.',
    github: 'https://github.com/PLRpower/exolia',
    gridClass: 'md:col-span-2 lg:col-span-2 lg:row-span-1',
    highlights: [
      {
        title: 'Unified Multi-Project Gradle Build',
        description: 'Unified disparate build configurations across Forge 1.12.2 (Java 8), Forge 1.16.5, and Spigot (Java 16+) into a centralized Gradle multi-project architecture with ShadowJar.'
      },
      {
        title: 'Asynchronous High-Throughput Backend',
        description: 'Engineered Spigot server modules with HikariCP asynchronous MySQL connection pooling and Redis synchronization, ensuring heavy database transactions never block the primary tick loop.'
      },
      {
        title: 'Client-Side Modding & Render Pipelines',
        description: 'Implemented bytecode injection with ExoliaCoremod and custom rendering/packet synchronization pipelines across Forge event buses.'
      },
      {
        title: 'Desktop Launcher & Resilient Bootstrap',
        description: 'Built a standalone Java desktop application with automated asset downloads, JVM runtime configuration, and an independent auto-updating bootstrapper.'
      }
    ],
    sections: [
      {
        title: 'Core Modules Overview',
        items: [
          {
            title: 'ExoliaCoremod & Osalys Mods (Client Modifications)',
            description: 'Forge 1.12.2 low-level bytecode injections and Forge 1.16.5 custom rendering pipelines and client-server packet synchronization.'
          },
          {
            title: 'OsalysPlugin (Server-Side Backend)',
            description: 'High-throughput Spigot 1.16.2 plugin leveraging HikariCP asynchronous MySQL connection pooling to keep the game tick loop unblocked.'
          },
          {
            title: 'ExoliaLauncher & Bootstrap (Desktop Application)',
            description: 'Bespoke Java desktop application managing authentication, asset streaming, JVM execution parameters, and automated updates.'
          }
        ]
      }
    ]
  },
  {
    id: 'robotkraft',
    title: 'RobotKraft — Autonomous Robotic Arm',
    label: 'Robotics & Embodied AI',
    category: 'Robotics & AI',
    tech: 'Python 3.12 | PyTorch | HF LeRobot | Docker | SO-ARM101',
    techs: ['Python', 'HF LeRobot', 'PyTorch', 'Docker', 'Embodied AI'],
    description: 'Autonomous robotic arm manipulation system using imitation learning and multi-camera computer vision on SO-ARM101 hardware, built during the RobotKraft hackathon by Alsace Digitale.',
    detailDescription: 'Autonomous physical robotic arm manipulation system developed during RobotKraft, an intensive 3-day AI & robotics hackathon organized by Alsace Digitale at Télécom Physique Strasbourg (InnovLab). Leveraged the Hugging Face LeRobot framework and multi-camera computer vision to train imitation learning policies on a physical SO-ARM101 robot arm (leader/follower setup), addressing real-world latency, sensor noise, dual voltage buses (12V follower, 5V leader), and mechanical friction.',
    image: '/images/projects/robotkraft.webp',
    resolution: 200,
    invert: false,
    brightness: 1.15,
    contrast: 1.35,
    charSpacing: 0.85,
    charRamp: ' .·:;~+=-*#%&$@',
    tintColor: '#2dd4bf',
    gridClass: 'md:col-span-2 lg:col-span-2 lg:row-span-1',
    highlights: [
      {
        title: 'Physical AI & Policy Training (LeRobot)',
        description: 'Trained behavioral cloning and imitation learning policies using Hugging Face LeRobot to execute fine-grained pick-and-place tasks with the SO-ARM101 arm.'
      },
      {
        title: 'Multi-Camera Vision Pipeline',
        description: 'Integrated multi-angle camera streams (InnoMaker U20CAM wrist camera and OAK-D Lite depth scene camera) for real-time spatial perception and workpiece localization.'
      },
      {
        title: 'Docker Containerized Infrastructure',
        description: 'Containerized teleoperation, dataset recording, and model training services (lerobot-follower, lerobot-leader, lerobot-camera, lerobot-gpu) with persistent udev hardware symlinks.'
      },
      {
        title: 'Sim-to-Real Hardware Kinematics',
        description: 'Interfaced high-level policy inference with low-level servo motor controllers, actively compensating for mechanical play, latency, and sensor noise.'
      }
    ],
    sections: [
      {
        title: 'Technical Hardware & Docker Architecture',
        items: [
          {
            title: 'Robotic Arm Setup',
            description: 'Dual SO-ARM101 setup (leader arm for human teleoperation data recording, follower arm for policy execution).'
          },
          {
            title: 'Camera Ingestion',
            description: 'InnoMaker U20CAM wrist camera for gripper-level alignment and OAK-D Lite depth camera for global scene understanding.'
          },
          {
            title: 'Dockerized Microservices',
            description: 'Containerized LeRobot modules with CUDA GPU acceleration for local training and dialout group device passthrough.'
          }
        ]
      }
    ]
  },
  {
    id: 'variational-quantum-classifiers',
    title: 'Variational Quantum Classifiers (QML)',
    label: 'Quantum Machine Learning',
    category: 'Quantum & AI',
    year: '2026',
    tech: 'PennyLane | PyTorch | Qiskit | Quantum Computing',
    techs: ['PennyLane', 'PyTorch', 'Qiskit', 'Quantum Computing'],
    description: 'Engineered hybrid quantum-classical neural networks (VQC) and benchmarked noise robustness and barren plateaus on complex multidimensional data.',
    detailDescription: 'Research and engineering of hybrid quantum-classical neural networks (Variational Quantum Classifiers / VQC). Integrated parameterized quantum circuits (PQC) using PennyLane and Qiskit coupled with PyTorch classical optimizers, benchmarked barren plateaus, and evaluated noise robustness on complex multidimensional data under noisy simulation backends.',
    image: '/images/projects/vqc.webp',
    resolution: 200,
    invert: false,
    brightness: 1.15,
    contrast: 1.35,
    charSpacing: 0.85,
    charRamp: ' .·:;~+=-*#%&$@',
    tintColor: '#2dd4bf',
    github: 'https://github.com/PLRpower',
    featured: true,
    gridClass: 'md:col-span-2 lg:col-span-1 lg:row-span-1',
    highlights: [
      {
        title: 'Hybrid Quantum-Classical Architecture',
        description: 'Engineered hybrid quantum-classical networks (VQC) bridging parameterized quantum circuits with classical PyTorch backpropagation.'
      },
      {
        title: 'Noise Robustness & Barren Plateaus',
        description: 'Benchmarked circuit trainability and noise resilience on complex data using PennyLane and Qiskit noisy simulation backends.'
      }
    ]
  },
  {
    id: 'custom-search-robot',
    title: 'Custom Search Robot: Autonomous Indoor Mapping',
    label: 'Autonomous Robotics & Embedded',
    category: 'Robotics & Embedded',
    year: '2025',
    tech: 'ROS 2 | SLAM | YOLO | Nav2 | LiDAR',
    techs: ['ROS 2', 'SLAM', 'YOLO', 'Nav2', 'Embedded'],
    description: 'Built an autonomous mobile robot using LiDAR SLAM, Nav2 path planning, and embedded YOLO computer vision to map and locate targets in GPS-denied spaces.',
    detailDescription: 'Built an autonomous mobile search robot designed to map unknown environments and locate targets in GPS-denied indoor spaces. Built with ROS 2, LiDAR SLAM mapping, Nav2 autonomous path planning, and embedded YOLO computer vision inference for real-time target recognition.',
    image: '/images/projects/autonomous-robot.webp',
    resolution: 200,
    invert: false,
    brightness: 1.15,
    contrast: 1.35,
    charSpacing: 0.85,
    charRamp: ' .·:;~+=-*#%&$@',
    tintColor: '#2dd4bf',
    github: 'https://github.com/PLRpower',
    featured: true,
    gridClass: 'md:col-span-2 lg:col-span-2 lg:row-span-1',
    highlights: [
      {
        title: 'SLAM in GPS-Denied Spaces',
        description: 'Built a mobile robot using SLAM, YOLO, and autonomous navigation to map and locate targets in GPS-denied spaces.'
      },
      {
        title: 'Autonomous Navigation & Vision',
        description: 'Integrated ROS 2 navigation stack with embedded YOLO object detection for reliable autonomous target discovery and spatial tracking.'
      }
    ]
  },
  {
    id: 'mundo-search',
    title: 'Mundo Search: AI Mindmap Search Engine',
    label: 'AI & Knowledge Graph Systems',
    category: 'AI & Web',
    tech: 'TypeScript | Next.js | Tailwind CSS | Generative AI',
    techs: ['TypeScript', 'Next.js', 'AI Mindmaps', 'Tailwind CSS'],
    description: 'An innovative search engine that leverages AI to generate interactive mindmaps and visual concept trees instead of a standard list of text results.',
    detailDescription: 'Mundo Search rethinks the search paradigm by replacing traditional linear lists of web links with interactive visual mindmaps. Using generative AI, queries are analyzed into core concepts, historical context, key debates, and subtopics, rendering an interactive node graph that enables exploration and non-linear knowledge discovery.',
    github: 'https://github.com/PLRpower/mundo-search',
    gridClass: 'md:col-span-2 lg:col-span-1 lg:row-span-1',
    highlights: [
      {
        title: 'Visual Concept Synthesis',
        description: 'Transforms textual search queries into structured multi-branch mindmaps illustrating interconnected topics.'
      },
      {
        title: 'Non-Linear Exploratory UI',
        description: 'Allows users to expand nodes, zoom into specialized subfields, and discover adjacent insights.'
      }
    ]
  },
  {
    id: 'web-projects',
    title: 'Web Projects Monorepo',
    label: 'Full-Stack & Web Ecosystem',
    category: 'Full-Stack & Web',
    tech: 'TypeScript | Vue | Node.js | React',
    techs: ['TypeScript', 'Vue', 'Node.js', 'React'],
    description: 'A centralized monorepo consolidating multiple production web applications, campus digital platforms, and financial APIs.',
    detailDescription: 'A centralized monorepo consolidating diverse full-stack web applications, landing pages, campus ecosystems, and financial backend APIs. Features standalone projects including event reservation platforms (event-booking-platform, fashion-night), campus tools (cesi-arena, cesi-drop, kompas), and trading APIs (tnptrading), all preserved with their individual Git histories.',
    github: 'https://github.com/PLRpower/web-projects',
    gridClass: 'md:col-span-2 lg:col-span-2 lg:row-span-1',
    highlights: [
      {
        title: 'Full-Stack Event & Showcase Platforms',
        description: 'Engineered custom interactive web applications including event reservation workflows, booking systems, and responsive portfolios.'
      },
      {
        title: 'Student & Campus Ecosystem',
        description: 'Architected real-time tournament brackets (cesi-arena), campus photo-sharing (cesi-drop), and academic learning platforms (kompas).'
      },
      {
        title: 'Financial & Trading Backend APIs',
        description: 'Built scalable TypeScript backend services (tnptrading) orchestrating trading logic and real-time market data processing.'
      }
    ],
    sections: [
      {
        title: 'Consolidated Applications Directory',
        items: [
          {
            title: 'event-booking-platform',
            description: 'Dynamic event reservation management application with interactive ticket checkout.'
          },
          {
            title: 'fashion-night',
            description: 'Visual landing page and seat reservation system for an exclusive fashion event.'
          },
          {
            title: 'cesi-arena',
            description: 'Real-time multiplayer tournament dashboard and match scoring brackets.'
          },
          {
            title: 'cesi-drop',
            description: 'Secure full-stack digital photo-sharing platform for campus associations.'
          },
          {
            title: 'kompas',
            description: 'Interactive study tools, flashcards, and exam revision tests for engineering students.'
          },
          {
            title: 'tnptrading',
            description: 'Scalable TypeScript backend API orchestrating trading algorithms and market feeds.'
          }
        ]
      }
    ]
  },
  {
    id: 'python-cs-courses',
    title: 'Computer Science & Algorithms Collection',
    label: 'Computer Science & Algorithmics',
    category: 'Algorithms & CS',
    tech: 'Python | Django | Pygame | Data Structures | Discrete Maths',
    techs: ['Python', 'Django', 'Pygame', 'Algorithms', 'Data Structures'],
    description: 'Curated collection of advanced computer science algorithms, mathematical simulations (Lotka-Volterra predator-prey), recursive Sudoku backtracking, and Django full-stack systems.',
    detailDescription: 'A comprehensive collection of Computer Science implementations showcasing fundamental and advanced software engineering paradigms: full-stack Library Management System with Django and SQLite, real-time Lotka-Volterra Predator-Prey visual simulation with Pygame, intelligent constraint-satisfaction Sudoku solver using recursive backtracking, and exhaustive modules covering Recursion, Trees & BSTs, Graph Theory (BFS/DFS, Dijkstra), Divide & Conquer, Cryptography, and Turing computability.',
    github: 'https://github.com/PLRpower/python-cs-courses',
    gridClass: 'md:col-span-2 lg:col-span-1 lg:row-span-1',
    highlights: [
      {
        title: 'Predator-Prey Simulation (Lotka-Volterra)',
        description: 'Real-time biological ecosystem modeling with sprite graphics and population oscillation dynamics.'
      },
      {
        title: 'Intelligent Backtracking Sudoku Solver',
        description: 'Constraint satisfaction recursive solver exploring candidate matrices with pruning.'
      },
      {
        title: 'Full-Stack Library Management (Django)',
        description: 'Complete web application managing loans, book cataloging, authentication, and relational SQLite storage.'
      },
      {
        title: 'Core Algorithmic Foundations',
        description: 'Comprehensive implementations of Graph traversal (BFS/DFS), Binary Search Trees, Cryptographic hashing, and Turing Machines.'
      }
    ]
  }
];

export const getFeaturedProjects = () => projects.filter(p => p.featured);

export const getProjectById = (id: string) => {
  if (id === 'axiom-engine') return projects.find(p => p.id === 'axiom-chess');
  if (id === 'minecraft-server') return projects.find(p => p.id === 'exolia');
  if (id === 'delivery-route-optimization' || id === 'vrp') return projects.find(p => p.id === 'vehicle-route-optimization');
  if (id === 'autonomous-robot') return projects.find(p => p.id === 'custom-search-robot');
  if (id === 'vqc') return projects.find(p => p.id === 'variational-quantum-classifiers');
  if (id === 'conway') return projects.find(p => p.id === 'conway-game-of-life');
  if (id === 'aquathon') return projects.find(p => p.id === 'hydro-regen');
  if (id === 'robotkraft-participant') return projects.find(p => p.id === 'robotkraft');
  if (id === 'courses' || id === 'computer-science-courses') return projects.find(p => p.id === 'python-cs-courses');
  return projects.find(p => p.id === id);
};
