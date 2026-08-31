<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = withDefaults(defineProps<{
  delay?: number;
  instant?: boolean;
  animated?: boolean;
  color?: string;
  pingPong?: boolean;
}>(), {
  delay: 0,
  instant: false,
  animated: true,
  pingPong: false,
});

const rawLines = [
  "                                                                          ++++++++                                                 +++++++                                                                                                                               ",
  "++++++++++++++++++++                                                          ++++                 ++++++++++++++++++++++++++++++     ++++                                                                                                                               ",
  "    ++++#        +++++*                                                       ++++                 +++          +++++         +++     ++++                                                                                                                               ",
  "    ++++#         #+++++                                                      ++++                 ++           +++++          ++     *+++                                                                                                                               ",
  "    ++++#          +++++                                                      *+++                 +*           +++++           +     *+++                                                                                                                               ",
  "    ++++#          +++++                                                      *+++                              +++++                 *+++                                                                                                                               ",
  "    ++++#          +++++     *+++++++++++       +++++++       +++++++#        *+++                              +++++                 *+++   *+++++++++              +++++++++++          +++++*   *+++++++++     ++++++++++          #+++++++++++           ++++++++++  ",
  "    ++++#         +++++     ++++      ++++         ++++          ++++#        *+++                              +++++                 *+++ +++     #++++%         #++++       ++++*       #+++++ ++*     #++++* ++*     *++++        ++++*     *+++*       %++*     +++  ",
  "    ++++#      *++++++      +++%       ++++        ++++          *+++#        *+++                              +++++                 *++++*         ++++        ++++%         *++++        +++++*        #+++++*        #++++       +++*       ++++       +++#      ++  ",
  "    +++++++++++++++                    ++++        ++++          #+++#        *+++                              +++++                 *++++          ++++       ++++*           #++++       *+++*          ++++*          ++++                  ++++       ++++*         ",
  "    ++++#                            *+++++        ++++          #+++#        *+++                              +++++                 *+++           ++++      *++++             ++++#      *+++%          ++++           ++++                 +++++       #++++++       ",
  "    ++++#                        *+++* ++++        ++++          #+++#        *+++                              +++++                 *+++           ++++      *++++             ++++*      *+++           ++++           ++++            #+++* ++++         ++++++++    ",
  "    ++++#                     ++++     ++++        ++++          *+++#        *+++                              +++++                 *+++           ++++      #++++             +++++      *+++           ++++           ++++         ++++     ++++            +++++++  ",
  "    ++++#                   +++*       ++++        ++++          ++++#        *+++                              +++++                 *+++           ++++       ++++             ++++       *+++           ++++           ++++       ++++       ++++              *+++++%",
  "    ++++#                  ++++       +++++        ++++*        *++++*        *+++                              +++++                 *+++           ++++       #++++           ++++*       *+++           ++++           ++++      ++++       %++++       +         +++*",
  "    ++++*                 %++++      ++++++        #++++       ++#+++*        ++++                             *+++++                 ++++#          ++++%       *++++         ++++         ++++#          ++++%          ++++      ++++      #+*+++%      ++        +++#",
  "  #+++++++                 +++++++*++* *++++#*+     *+++++*+*+++  ++++       ++++++                          *++++++++*              *+++++         *+++++         *++++*   *++++*         *+++++         *+++++         *+++++     #+++++**+++  ++++*#+%  ++++     +++# ",
  "+++++++++++++++               *++++*     #++++*         ++++++     +++++++ *++++++++++*                    *++++++++++++++*         +++++++++++    +++++++++++         *+++++++#          ++++++++++*    ++++++++++*    ++++++++++*    *+++++#     ++++*    +  *++++++   "
];

const containerRef = ref<HTMLElement | null>(null);
const asciiCanvas = ref<HTMLCanvasElement | null>(null);
const isReady = ref(false);

const BLOOM_RAMP = ['@', '#', '$', '%', '&', 'W', 'M', '8', '0', 'X', 'Z', '*', '+', '=', '~', ':', '·'];
const HOVER_RAMP = ['#', '@', '%', '&', 'W', '$', '8', '0', 'X', '+'];
const AMBIENT_RAMP = ['.', ':', '+', '*', '·'];

let animationFrameId: number;
let isVisible = true;

const maxCols = rawLines[0]?.length || 0;
const totalRows = rawLines.length;

// Timing parameters for sharp, narrow wave reveal
const TOTAL_SWEEP_DURATION = 1200; // ms for wave to cross entire banner
const BLOOM_DURATION = 150; // ms for individual character bloom phase (narrow beam)

interface CharCellState {
  targetChar: string;
  isSpace: boolean;
  revealStart: number;
  bloomDuration: number;
  clampedWave: number;
  flickerFreq: number;
  flickerPhase: number;
  isFinished: boolean;
  hoverChar: string | null;
  kineticEnergy: number;
  dispX: number;
  dispY: number;
  ambientGlitchUntil: number;
  ambientGlitchChar: string;
  satOffset: number;
  lightnessOffset: number;
  glowStrength: number;
}

const charStates: CharCellState[][] = rawLines.map((line, lIdx) =>
  line.split('').map((char, cIdx) => {
    const isSpace = char === ' ';
    const normX = cIdx / Math.max(1, maxCols - 1);
    const normY = lIdx / Math.max(1, totalRows - 1);
    
    // Wavefront with dynamic diagonal curvature
    const waveDist = normX * 0.85 + normY * 0.15 + Math.sin(normX * 10 + normY * 3) * 0.025;
    const clampedWave = Math.max(0, Math.min(1, waveDist));
    
    const revealStart = props.instant ? 0 : (clampedWave * TOTAL_SWEEP_DURATION) + (Math.random() * 20);
    const bloomDuration = props.instant ? 0 : BLOOM_DURATION + (Math.random() * 40);

    // Highly pronounced deterministic visual footprint per character
    const seed = Math.sin(cIdx * 12.9898 + lIdx * 78.233) * 43758.5453;
    const randVal = seed - Math.floor(seed);
    const randVal2 = Math.abs((Math.sin(cIdx * 39.34 + lIdx * 11.78) * 24634.63) % 1);
    const satOffset = (randVal - 0.5) * 55; // -27% to +27%
    const lightnessOffset = (randVal2 - 0.5) * 50; // -25% to +25%
    const glowStrength = 0.6 + randVal * 0.8;

    return {
      targetChar: char,
      isSpace,
      revealStart,
      bloomDuration,
      clampedWave,
      flickerFreq: 0.1 + Math.random() * 0.15,
      flickerPhase: Math.random() * Math.PI * 2,
      isFinished: !!props.instant,
      hoverChar: null,
      kineticEnergy: 0,
      dispX: 0,
      dispY: 0,
      ambientGlitchUntil: 0,
      ambientGlitchChar: '',
      satOffset,
      lightnessOffset,
      glowStrength
    };
  })
);

// Mouse and interaction state
const mouseX = ref(-1000);
const mouseY = ref(-1000);
let targetMouseX = -1000;
let targetMouseY = -1000;
let lastMouseX = -1000;
let lastMouseY = -1000;
let lastMouseTime = 0;
let mouseVelocity = 0;

const isAnimationFinished = ref(false);
let initialStartTime = 0;
let dpr = 1;

let nextAmbientGlitchTime = 0;

const draw = (timestamp: number) => {
  if (!isVisible || !asciiCanvas.value) return;
  const ctx = asciiCanvas.value.getContext('2d', { alpha: true });
  if (!ctx) return;

  if (!initialStartTime) initialStartTime = timestamp;
  const elapsed = timestamp - initialStartTime;

  const canvas = asciiCanvas.value;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const logicalWidth = canvas.width / dpr;
  const logicalHeight = canvas.height / dpr;
  const charWidth = logicalWidth / maxCols;
  const fontSize = charWidth / 0.58;
  const lineHeight = logicalHeight / totalRows;

  ctx.save();
  ctx.scale(dpr, dpr);

  ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
  ctx.textBaseline = 'top';

  // Smooth mouse interpolation for fluid magnetic feel
  if (targetMouseX > -100) {
    mouseX.value += (targetMouseX - mouseX.value) * 0.35;
    mouseY.value += (targetMouseY - mouseY.value) * 0.35;
  } else {
    mouseX.value = -1000;
    mouseY.value = -1000;
  }

  const baseRgb = '255, 255, 255';

  let stillAnimating = false;
  let hasActiveKineticEnergy = false;

  // Trigger occasional ambient quantum glitch when idle
  if (isAnimationFinished.value && timestamp > nextAmbientGlitchTime) {
    const randomRow = Math.floor(Math.random() * totalRows);
    const line = charStates[randomRow];
    if (line) {
      const nonSpaces = line.filter(c => !c.isSpace);
      if (nonSpaces.length > 0) {
        const targetCell = nonSpaces[Math.floor(Math.random() * nonSpaces.length)];
        if (targetCell) {
          targetCell.ambientGlitchUntil = timestamp + 140 + Math.random() * 120;
          targetCell.ambientGlitchChar = AMBIENT_RAMP[Math.floor(Math.random() * AMBIENT_RAMP.length)] || '+';
        }
      }
    }
    nextAmbientGlitchTime = timestamp + 600 + Math.random() * 900;
  }

  const curMouseX = mouseX.value / dpr;
  const curMouseY = mouseY.value / dpr;
  const hoverRadius = 42;
  const hoverRadiusSq = hoverRadius * hoverRadius;

  for (let lIdx = 0; lIdx < totalRows; lIdx++) {
    const line = charStates[lIdx];
    if (!line) continue;
    const charY = lIdx * lineHeight;

    for (let cIdx = 0; cIdx < maxCols; cIdx++) {
      const state = line[cIdx];
      if (!state) continue;

      if (state.isSpace) {
        // Empty space: skip
        continue;
      }

      const charX = cIdx * charWidth;
      const dx = charX - curMouseX;
      const dy = charY - curMouseY;
      const distSq = dx * dx + dy * dy;
      const isHovered = curMouseX > -100 && distSq < hoverRadiusSq;

      // Magnetic lens repulsion & kinetic dissipation
      if (isHovered) {
        const dist = Math.sqrt(distSq) || 1;
        const normDist = 1 - (dist / hoverRadius);
        const force = normDist * normDist * 2.2;
        state.dispX += ((dx / dist) * force - state.dispX) * 0.3;
        state.dispY += ((dy / dist) * force - state.dispY) * 0.3;

        // Deposit energy
        state.kineticEnergy = Math.min(1.0, state.kineticEnergy + 0.35 + mouseVelocity * 0.02);
      } else {
        state.dispX += (0 - state.dispX) * 0.15;
        state.dispY += (0 - state.dispY) * 0.15;
        state.kineticEnergy *= 0.91;
      }

      if (state.kineticEnergy > 0.02) {
        hasActiveKineticEnergy = true;
      }

      let charToDraw = state.targetChar;
      let opacity = 1.0;
      let isWaveActive = false;
      let waveGlow = 0;

      if (props.pingPong) {
        stillAnimating = true;
        const cycleTime = 4200;
        const revealDuration = 1200;
        const holdRevealed = 1000;
        const dissolveDuration = 1200;
        const cycleElapsed = elapsed % cycleTime;

        if (cycleElapsed < revealDuration) {
          // Forward sweep reveal
          const charElapsed = cycleElapsed - state.revealStart;
          if (charElapsed < 0) {
            if (!isHovered && state.kineticEnergy < 0.05) continue;
            opacity = 0;
          } else if (charElapsed >= state.bloomDuration) {
            opacity = 1.0;
          } else {
            isWaveActive = true;
            const progress = Math.max(0, Math.min(1, charElapsed / state.bloomDuration));
            const flicker = Math.sin(timestamp * state.flickerFreq + state.flickerPhase);
            opacity = flicker > -0.55 ? 0.5 + 0.5 * progress : 0.15;
            waveGlow = 1 - progress;
            const rampIdx = Math.floor(Math.random() * BLOOM_RAMP.length);
            charToDraw = BLOOM_RAMP[rampIdx] || state.targetChar;
          }
        } else if (cycleElapsed < revealDuration + holdRevealed) {
          // Hold visible
          opacity = 1.0;
        } else if (cycleElapsed < revealDuration + holdRevealed + dissolveDuration) {
          // Reverse sweep dissolve
          const dissolveElapsed = cycleElapsed - (revealDuration + holdRevealed);
          const reverseStart = ((1 - state.clampedWave) * dissolveDuration) + (Math.random() * 15);
          const charElapsed = dissolveElapsed - reverseStart;

          if (charElapsed < 0) {
            opacity = 1.0;
          } else if (charElapsed >= state.bloomDuration) {
            if (!isHovered && state.kineticEnergy < 0.05) continue;
            opacity = 0;
          } else {
            isWaveActive = true;
            const progress = 1 - Math.max(0, Math.min(1, charElapsed / state.bloomDuration));
            const flicker = Math.sin(timestamp * state.flickerFreq + state.flickerPhase);
            opacity = flicker > -0.55 ? 0.2 + 0.8 * progress : 0.05;
            waveGlow = 1 - progress;
            const rampIdx = Math.floor(Math.random() * BLOOM_RAMP.length);
            charToDraw = BLOOM_RAMP[rampIdx] || state.targetChar;
          }
        } else {
          // Hold hidden before restart
          if (!isHovered && state.kineticEnergy < 0.05) continue;
          opacity = 0;
        }
      } else {
        const charElapsed = elapsed - state.revealStart;

        // Not yet reached by reveal wavefront
        if (charElapsed < 0 && !isHovered && state.kineticEnergy < 0.05) {
          stillAnimating = true;
          continue;
        }

        if (charElapsed >= state.bloomDuration || state.isFinished) {
          state.isFinished = true;
          opacity = 1.0;
        } else {
          stillAnimating = true;
          isWaveActive = true;
          const progress = Math.max(0, Math.min(1, charElapsed / state.bloomDuration));
          
          // High frequency shutter flicker on the wavefront
          const flicker = Math.sin(timestamp * state.flickerFreq + state.flickerPhase);
          const flickerOn = flicker > -0.55;
          
          if (flickerOn) {
            opacity = 0.5 + 0.5 * progress;
          } else {
            opacity = 0.15;
          }
          
          waveGlow = 1 - progress; // Strong glow at leading edge of wave
          
          // Rapid bloom scramble
          const rampIdx = Math.floor(Math.random() * BLOOM_RAMP.length);
          charToDraw = BLOOM_RAMP[rampIdx] || state.targetChar;
        }
      }

      // Handle hover & kinetic trail
      if (isHovered || state.kineticEnergy > 0.1) {
        if (!state.hoverChar || Math.random() < 0.25) {
          state.hoverChar = HOVER_RAMP[Math.floor(Math.random() * HOVER_RAMP.length)] || '#';
        }
        charToDraw = state.hoverChar;
      } else {
        state.hoverChar = null;
      }

      // Handle ambient micro-glitch
      if (state.ambientGlitchUntil > timestamp) {
        charToDraw = state.ambientGlitchChar;
        opacity = 0.9;
        waveGlow = 0.6;
        hasActiveKineticEnergy = true;
      }

      // Render styles & glowing bloom
      const drawX = charX + state.dispX;
      const drawY = charY + state.dispY;

      if (isHovered || state.kineticEnergy > 0.15 || waveGlow > 0.3) {
        // Fixed hue (portfolio accent teal/emerald), variation through per-character static properties
        const baseHue = 172;
        const hoverIntensity = isHovered ? (1 - Math.sqrt(distSq) / hoverRadius) : state.kineticEnergy;

        // Static per-character saturation & lightness offsets + proximity boost
        const sat = Math.max(35, Math.min(100, 80 + state.satOffset));
        const lightness = Math.max(26, Math.min(96, 50 + state.lightnessOffset + hoverIntensity * 32));

        const glowAlpha = Math.min(1, Math.max(opacity, waveGlow, state.kineticEnergy, 0.75));

        ctx.fillStyle = `hsla(${baseHue}, ${sat}%, ${lightness}%, ${glowAlpha})`;
        ctx.shadowColor = `hsla(${baseHue}, ${sat}%, 60%, 0.8)`;
        ctx.shadowBlur = Math.min(12, (3 + waveGlow * 6 + hoverIntensity * 6) * state.glowStrength);
        ctx.fillText(charToDraw, drawX, drawY);
        ctx.shadowBlur = 0;
      } else {
        // Normal crisp settled state
        ctx.fillStyle = `rgba(${baseRgb}, ${opacity})`;
        ctx.fillText(charToDraw, drawX, drawY);
      }
    }
  }

  ctx.restore();

  const isInteracting = mouseX.value > -100;
  if (stillAnimating || isInteracting || hasActiveKineticEnergy) {
    animationFrameId = requestAnimationFrame(draw);
  } else {
    isAnimationFinished.value = true;
    // Keep a lightweight pulse loop running for ambient quantum effects
    animationFrameId = requestAnimationFrame(draw);
  }
};

const drawStatic = () => {
  if (!asciiCanvas.value) return;
  const ctx = asciiCanvas.value.getContext('2d', { alpha: true });
  if (!ctx) return;

  const canvas = asciiCanvas.value;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const logicalWidth = canvas.width / dpr;
  const logicalHeight = canvas.height / dpr;
  const charWidth = logicalWidth / maxCols;
  const lineHeight = logicalHeight / totalRows;

  ctx.save();
  ctx.scale(dpr, dpr);

  ctx.fillStyle = props.color || 'rgba(255, 255, 255, 1)';

  const blockW = Math.max(0.8, charWidth * 0.6);
  const blockH = Math.max(0.9, lineHeight * 0.6);
  const offsetX = (charWidth - blockW) / 2;
  const offsetY = (lineHeight - blockH) / 2;

  for (let lIdx = 0; lIdx < totalRows; lIdx++) {
    const line = rawLines[lIdx];
    if (!line) continue;
    const charY = lIdx * lineHeight + offsetY;

    for (let cIdx = 0; cIdx < maxCols; cIdx++) {
      const char = line[cIdx];
      if (!char || char === ' ') continue;
      const charX = cIdx * charWidth + offsetX;
      ctx.fillRect(charX, charY, blockW, blockH);
    }
  }

  ctx.restore();
};

let canvasRect: DOMRect | null = null;
let observer: IntersectionObserver | null = null;
let resizeObserver: ResizeObserver | null = null;

const updateRect = () => {
  if (asciiCanvas.value) {
    canvasRect = asciiCanvas.value.getBoundingClientRect();
  }
};

let mouseMoveThrottled = false;
const handleMouseMove = (e: MouseEvent) => {
  if (!props.animated || mouseMoveThrottled) return;
  mouseMoveThrottled = true;

  const canvas = asciiCanvas.value;
  if (!canvas) { mouseMoveThrottled = false; return; }

  if (!canvasRect) updateRect();
  const rect = canvasRect;

  if (rect && rect.width > 0 && rect.height > 0) {
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const newX = (e.clientX - rect.left) * scaleX;
    const newY = (e.clientY - rect.top) * scaleY;

    const now = performance.now();
    if (lastMouseTime > 0) {
      const dt = Math.max(1, now - lastMouseTime);
      const dMouseDist = Math.hypot(newX - lastMouseX, newY - lastMouseY);
      mouseVelocity = Math.min(15, (dMouseDist / dt) * 1.5);
    }
    lastMouseX = newX;
    lastMouseY = newY;
    lastMouseTime = now;

    targetMouseX = newX;
    targetMouseY = newY;

    if (isAnimationFinished.value) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(draw);
    }
  }

  requestAnimationFrame(() => { mouseMoveThrottled = false; });
};

const handleMouseLeave = () => {
  if (!props.animated) return;
  targetMouseX = -1000;
  targetMouseY = -1000;
  mouseVelocity = 0;
};

const updateDimensions = () => {
  if (!asciiCanvas.value || !containerRef.value) return;
  dpr = window.devicePixelRatio || 1;
  const rect = containerRef.value.getBoundingClientRect();
  const width = rect.width || containerRef.value.clientWidth || window.innerWidth;
  if (width === 0) return;

  const charWidth = width / maxCols;
  const fontSize = charWidth / 0.58;
  const lineHeight = fontSize * 1.15;
  const height = totalRows * lineHeight;

  asciiCanvas.value.width = Math.round(width * dpr);
  asciiCanvas.value.height = Math.round(height * dpr);

  asciiCanvas.value.style.width = `${width}px`;
  asciiCanvas.value.style.height = `${height}px`;

  updateRect();
};

let resizeTimeout: any = null;
const handleResize = () => {
  if (resizeTimeout) clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    updateDimensions();
    if (!props.animated) {
      drawStatic();
    } else if (isAnimationFinished.value) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(draw);
    }
  }, 100);
};

onMounted(() => {
  const init = () => {
    if (asciiCanvas.value && containerRef.value) {
      updateDimensions();

      if (!props.animated) {
        drawStatic();
        isReady.value = true;

        if (typeof ResizeObserver !== 'undefined') {
          resizeObserver = new ResizeObserver(() => {
            updateDimensions();
            drawStatic();
          });
          resizeObserver.observe(containerRef.value);
        }
        return;
      }

      if (typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(() => {
          updateDimensions();
          if (isAnimationFinished.value) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = requestAnimationFrame(draw);
          }
        });
        resizeObserver.observe(containerRef.value);
      }

      observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (!entry) return;
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;

        if (isVisible && !wasVisible) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(draw);
        }
      }, { threshold: 0.1 });

      observer.observe(asciiCanvas.value);

      setTimeout(() => {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(draw);
        isReady.value = true;
      }, props.instant ? 0 : (props.delay || 0));
    } else {
      setTimeout(init, 50);
    }
  };
  init();
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  if (observer) observer.disconnect();
  if (resizeObserver) resizeObserver.disconnect();
  if (resizeTimeout) clearTimeout(resizeTimeout);
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <div ref="containerRef"
       class="my-2 w-full max-w-[1180px] [contain:layout]" 
       :style="{ opacity: isReady || instant ? 1 : 0, transition: 'opacity 0.8s ease' }"
       @mousemove.passive="handleMouseMove"
       @mouseleave="handleMouseLeave">
    <div v-if="instant" class="text-white font-mono text-[clamp(0.35rem,0.7vw,0.75rem)] leading-tight select-none pointer-events-none" aria-hidden="true">
      <pre v-for="(line, idx) in rawLines" :key="idx" class="m-0 pre-wrap">{{ line }}</pre>
    </div>
    <canvas v-else ref="asciiCanvas" class="w-full h-auto block"></canvas>
  </div>
</template>

<style scoped>
</style>

