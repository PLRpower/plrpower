<script setup lang="ts">
useHead({
  title: 'Behind the Build — Architecture & Canvas ASCII Engine | Paul Thomas',
  meta: [
    {
      name: 'description',
      content: 'A technical deep-dive into the software architecture, custom Canvas ASCII shader algorithms, and performance optimizations powering this portfolio.'
    }
  ]
});
</script>

<template>
  <main class="min-h-screen bg-bg text-primary pt-28 pb-36 px-6 md:px-10 selection:bg-accent selection:text-black light:selection:text-white">
    <article class="max-w-[760px] mx-auto font-sans leading-[1.85] text-[1.05rem] text-secondary/90">
      
      <!-- Back Link -->
      <div class="mb-10">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-secondary/70 hover:text-accent font-mono text-xs tracking-wider uppercase transition-colors duration-200 group no-underline"
        >
          <Icon name="uil:arrow-left" size="14px" class="transition-transform duration-200 group-hover:-translate-x-1" />
          <span>Back to Portfolio</span>
        </NuxtLink>
      </div>

      <!-- Post Meta -->
      <div class="flex items-center gap-3 font-mono text-xs text-secondary/50 mb-3 uppercase tracking-widest">
        <span>Engineering Write-Up</span>
        <span>•</span>
        <span>Paul Thomas</span>
        <span>•</span>
        <span>Nuxt 3 & 2D Canvas</span>
      </div>

      <!-- Article Title -->
      <h1 class="font-display text-[clamp(2.2rem,5vw,3.5rem)] font-extrabold text-primary tracking-tight leading-[1.1] mb-8">
        Behind the Build: Architecture, Canvas ASCII & Optimizations
      </h1>

      <!-- Intro Paragraph -->
      <p class="text-lg md:text-xl text-primary font-normal leading-relaxed mb-10 border-l-2 border-accent pl-5">
        When I started building this portfolio, I didn't want to rely on pre-packaged component libraries or a generic Astro/Next template. As a computer science student passionate about AI, low-level systems, and computer graphics, my goal was to build a tailored software architecture from scratch: fast, resilient, and powered by hand-crafted rendering algorithms.
      </p>

      <!-- Section: ASCII Engine -->
      <h2 class="font-display text-2xl md:text-3xl font-bold text-primary tracking-tight mt-14 mb-6">
        1. The Procedural ASCII Engine & Ping-Pong Wave Animation
      </h2>

      <p class="mb-6">
        The signature element of the site is a custom procedural ASCII rendering engine built on HTML5 Canvas 2D. Unlike a naive DOM-based approach (where each glyph is an individual <code class="font-mono text-xs px-1.5 py-0.5 bg-white/[0.06] text-accent">&lt;span&gt;</code> element), 2D Canvas allows drawing and mutating thousands of cells at 60 FPS with zero DOM thrashing or layout reflows.
      </p>

      <!-- Live ASCII Banner with Ping-Pong Loop -->
      <div class="my-10 border border-white/[0.08] light:border-black/[0.08] bg-[#040404] light:bg-slate-900 p-6 md:p-10">
        <div class="flex items-center justify-center">
          <AsciiBanner :animated="true" :ping-pong="true" class="w-full max-w-[680px]" />
        </div>
        <p class="font-mono text-[0.7rem] text-secondary/50 text-center mt-6 tracking-wide">
          ▲ Real-time render: continuous bidirectional loop (Forward Reveal → Hold → Reverse Dissolve → Hold). Hover with mouse to interact.
        </p>
      </div>

      <h3 class="font-display text-xl font-bold text-primary mt-8 mb-4">
        Mathematical Formulation of the Non-Linear Wavefront
      </h3>

      <p class="mb-6">
        To avoid a mechanical linear fade, each character in the matrix computes its arrival timestamp based on a diagonal wavefront distorted by a harmonic sine perturbation:
      </p>

      <div class="bg-[#080808] border border-white/[0.08] p-4 my-6 font-mono text-xs overflow-x-auto text-accent/90">
        <code>const waveDist = normX * 0.85 + normY * 0.15 + Math.sin(normX * 10 + normY * 3) * 0.025;</code>
      </div>

      <p class="mb-6">
        During the bloom phase, the character undergoes high-frequency shutter oscillation by sampling glyphs across a density ramp (<code class="font-mono text-xs text-accent">@, #, $, %, &, W, M, 8, 0, X, Z, *, +, =, ~, :</code>) with deterministic per-character color and saturation offsets until the leading edge settles.
      </p>

      <h3 class="font-display text-xl font-bold text-primary mt-8 mb-4">
        Reverse Sweep & Ping-Pong State Machine
      </h3>

      <p class="mb-6">
        To achieve a seamless, continuous back-and-forth loop without memory allocations or Garbage Collector spikes, the animation loop partitions a fixed 4200 ms cycle into deterministic phases:
      </p>

      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li><strong>0 ms → 1200 ms (Forward Sweep):</strong> Left-to-right wavefront reveal with high-frequency shutter scrambling.</li>
        <li><strong>1200 ms → 2200 ms (Resolved Hold):</strong> Fully settled state where all characters remain static.</li>
        <li><strong>2200 ms → 3400 ms (Reverse Dissolve):</strong> Inverse wavefront sweep calculated via <code class="font-mono text-xs text-accent">(1 - clampedWave)</code>, dissolving characters back into empty space.</li>
        <li><strong>3400 ms → 4200 ms (Hidden Hold):</strong> Idle rest interval before seamlessly repeating the cycle.</li>
      </ul>

      <h3 class="font-display text-xl font-bold text-primary mt-8 mb-4">
        Cursor Interaction & Kinetic Dissipation Physics
      </h3>

      <p class="mb-6">
        When hovered, the canvas computes pointer velocity to apply an elastic magnetic repulsion vector field. Displaced cells accumulate kinetic energy that decays exponentially with a 0.91 damping factor per frame:
      </p>

      <div class="bg-[#080808] border border-white/[0.08] p-4 my-6 font-mono text-xs overflow-x-auto text-accent/90">
        <code>// Elastic kinetic restitution and damping<br>state.dispX += (0 - state.dispX) * 0.15;<br>state.dispY += (0 - state.dispY) * 0.15;<br>state.kineticEnergy *= 0.91;</code>
      </div>

      <!-- Section: Image Quantization Pipeline -->
      <h2 class="font-display text-2xl md:text-3xl font-bold text-primary tracking-tight mt-14 mb-6">
        2. Real-Time ASCII Image Rasterization Pipeline
      </h2>

      <p class="mb-6">
        For project showcase visuals ([AsciiImage.vue](file:///C:/Users/pault/WebstormProjects/portfolio/app/components/AsciiImage.vue)), I built a dynamic client-side rasterization pipeline. Source WebP assets are sampled into an off-screen memory canvas and converted on the fly:
      </p>

      <ol class="list-decimal pl-6 mb-6 space-y-2">
        <li><strong>Perceived Luminance Extraction:</strong> ITU-R BT.601 photometric standard weighting (<code class="font-mono text-xs text-accent">Y = 0.299R + 0.587G + 0.114B</code>).</li>
        <li><strong>Gamma & Contrast Shaping:</strong> Non-linear tone curve transformation preserving subtle shadow gradients and specular highlights.</li>
        <li><strong>LUT Quantization:</strong> Direct scalar mapping from <span class="font-mono text-sm">[0, 255]</span> into pre-compiled ASCII density ramps.</li>
        <li><strong>Sub-Pixel Layout Alignment:</strong> Monospace horizontal step scaling preventing glyph overlap across arbitrary viewport widths.</li>
      </ol>

      <!-- Section: Nuxt 3 & Core Architecture -->
      <h2 class="font-display text-2xl md:text-3xl font-bold text-primary tracking-tight mt-14 mb-6">
        3. Core Architecture: Nuxt 3, Nitro & Strict TypeScript
      </h2>

      <p class="mb-6">
        The application is structured on Nuxt 3 with the Nitro server engine, configured for hybrid static/server rendering:
      </p>

      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li><strong>Strict TypeScript:</strong> End-to-end typed contracts for project data models, canvas cell memory states, and Schema.org structured metadata.</li>
        <li><strong>Tree-Shaking & Auto-Imports:</strong> Composition API architecture eliminating dead code and keeping runtime bundle weight minimal.</li>
        <li><strong>File-Based Routing:</strong> Dynamic typed project pages (<code class="font-mono text-xs text-accent">/projects/[id].vue</code>) with automated edge Open Graph image generation powered by Sharp.</li>
      </ul>

      <!-- Section: Performance & Rendering Discipline -->
      <h2 class="font-display text-2xl md:text-3xl font-bold text-primary tracking-tight mt-14 mb-6">
        4. Performance & Rendering Discipline
      </h2>

      <p class="mb-6">
        Achieving a locked 60 FPS during fast scrolling and browser zooming required strict rendering discipline:
      </p>

      <ul class="list-disc pl-6 mb-6 space-y-3">
        <li>
          <strong>Single Ticker Synchronization:</strong> Lenis inertial momentum scrolling hooks directly into <code class="font-mono text-xs text-accent">gsap.ticker</code>, eliminating frame desynchronization and redundant animation frame callbacks.
        </li>
        <li>
          <strong>Static OKLab Glow Meshes:</strong> Removing per-frame mouse-tracking style recalculations in favor of static OKLab gradients, preventing GPU compositing bottlenecks.
        </li>
        <li>
          <strong>Strict CSS Containment:</strong> Extensive use of <code class="font-mono text-xs text-accent">contain: layout style paint</code> on heavy UI modules to isolate layout boundaries.
        </li>
        <li>
          <strong>Bot & Crawler SSR Bypass:</strong> Server headers inspection detects web crawlers (Googlebot, Lighthouse) to disable resource-heavy canvas loops and serve instant pre-rendered markup.
        </li>
      </ul>

      <!-- Section: Summary -->
      <h2 class="font-display text-2xl md:text-3xl font-bold text-primary tracking-tight mt-14 mb-6">
        5. Engineering Summary
      </h2>

      <p class="mb-6">
        This project was an opportunity to apply real systems engineering principles to frontend architecture: custom 2D canvas shader pipelines, tight memory management, rigorous static typing, and browser rendering pipeline optimization.
      </p>

      <!-- Final Links -->
      <div class="mt-14 pt-8 border-t border-white/[0.08] light:border-black/[0.08] flex flex-wrap gap-6 font-mono text-xs">
        <a
          href="https://github.com/PLRpower/portfolio"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 text-accent hover:underline"
        >
          <span>Inspect source on GitHub</span>
          <Icon name="material-symbols:arrow-outward" size="13px" />
        </a>

        <NuxtLink
          to="/projects"
          class="inline-flex items-center gap-1.5 text-secondary/70 hover:text-primary transition-colors"
        >
          <span>Explore engineering projects</span>
          <Icon name="material-symbols:arrow-outward" size="13px" />
        </NuxtLink>
      </div>

    </article>
  </main>
</template>

<style scoped>
</style>
