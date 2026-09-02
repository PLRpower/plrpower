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

const emit = defineEmits<{
  (e: 'ready'): void;
}>();

const rawLines = [
  "*******************=:                                                                             .****                   ******************************      *****                                                                                                                                                                       ",
  "++#+%#############++#**:                                                                          .++##                   =############++#+%###########%      =++##                                                                                                                                                                       ",
  "+#++-             =##+##*                                                                         .+#+#                                +#++.                  =+#+#                                                                                                                                                                       ",
  "+++#-                *++#*.                                                                       .#++#                                +++#.                  =#++#                                                                                                                                                                       ",
  "++#+-                 +#++=                                                                       .++##                                ++#+.                  =++##                                                                                                                                                                       ",
  "+#++-                 =++##                                                                       .+#+#                                +#++.                  =+#+#                                                                                                                                                                       ",
  "+++#-                 =+#+#          .************.             ****:                ****:        .#++#                                +++#.                  =#++#    ***********                    .*************               ****=   **********       -*********                  *************                  *************      ",
  "++#+-                 +#++#        ***%#########++#*-           =#++:                +#++:        .++##                                ++#+.                  =++##  ***########+#**-              .***+%#########+#**=            =++#= **#######++#**   ***#######+#**:            .***%#########+#**.            .***%#########+#**.   ",
  "+#++-                **++%.      :**+%%         :#++#*          =++#:                +++#:        .+#+#                                +#++.                  =+#+#=*##:        =#++#*            **#%##:         =#++#*=          =+#+#*#=       :#++#****#.       =+#+#=          **+%#=         =+++#-          -*+#%:         -#+##-  ",
  "+++#-              ***+%#:      :*++%.            =#+#=         =+#+:                ++#+:        .#++#                                +++#.                  =#++#%%             =+##*          **#%%              :#++#*         =#++%%           =+#++%:          :++##.        **+%%            .+#+#.         ++#+:            +%##: ",
  "++#+#***************#%#%         .-#:             .++##         =#++:                +#++:        .++##                                ++#+.                  =++#%=               +++#-        **#%=                 +#+#-        =++##            .+++#=            =#++#         :=%              =++#=         +#++-            .:    ",
  "+#++%################.                            .+#+#         =++#:                +++#:        .+#+#                                +#++.                  =+#+#                =+#+=       .*#+#                  :++##        =+#+#             ++#+.            =++##                          -+#+=         .#+##*:                ",
  "+++#-                                -*************#++#         =+#+:                ++#+:        .#++#                                +++#.                  =#++#                -#++=       =#++#                   +#+#        =#++#             +#++.            =+#+#            .=*************#++=           =##+#******-.        ",
  "++#+-                            :****############+++##         =#++:                +#++:        .++##                                ++#+.                  =++##                -++#=       +++#=                   +++#.       =++##             +++#.            =#++#         ****%############+++#=              =######+##****.   ",
  "+#++-                           **#%#-            .+#+#         =++#:                +++#:        .+#+#                                +#++-                  =+#+#                -+#+=       =+#+#                   ++##        =+#+#             ++#+.            =++##       .**#%#:            -+#+=                     .-###+##*: ",
  "+++#-                          **#+#              :#++#         =+#+=               .*+#+:        .#++#                                +++#-                  =#++#                -#++=       .+++#                  -*#+#        =#++#             +#++.            =+#+#       ++#+:              =#++=          .=              -++##:",
  "++#+-                          =#++-              +++##         -+++#               ++#++:        .++##                                ++#+-                  =++##                -++#=        *+##*                .*#+%.        =++##             +++#.            =#++#       +#++.             :*++#=        ***#:              =#++-",
  "+#++-                          =++##             **+#+#          *+##=            .*#+++#:        .+#+#                                +#++-                  =+#+#                -+#+=         *++#*.             -*#+%=         =+#+#             ++#+.            =++##       +++#:            -*++#+=        .+++#:             +++#-",
  "+++#-                           *++#*-        :**#-+++#-          *++#**:      .=**% ++#+:        .#++#                                +++#-                  =#++#                -#++=          =#++#*=        :=**#%#.          =#++#             +#++.            =+#+#       :#++#*:        -**#=+++#.        :#++#*-         -**+%= ",
  "++#+-                            -##+#*********#%  :#++#***        :##+##*******##-  +#++:        .++##                                ++#+-                  =++##                -++#=            =##+#*********+%##:            =++##             +++#.            =#++#         *#++#*********#=  =#++#**=       =##+#**********%##-  ",
  "*###-                               =#########=      .####%           .########=     *###:        .###%                                *###-                  =###%                -###=               -###########.               =###%             *###.            =###%           .##########.      -####=          :###########-     "
];

const containerRef = ref<HTMLElement | null>(null);
const asciiCanvas = ref<HTMLCanvasElement | null>(null);
const isReady = ref(false);

const BLOOM_RAMP = ['@', '#', '$', '%', '&', 'W', 'M', '8', '0', 'X', 'Z', '*', '+', '=', '~', ':', '·'];
const HOVER_RAMP = ['#', '@', '%', '&', 'W', '$', '8', '0', 'X', '+'];
const AMBIENT_RAMP = ['.', ':', '+', '*', '·'];

const HOVER_RADIUS = 220;
const PUSH_RADIUS = 50;

let animationFrameId: number;
let isVisible = true;

const maxCols = rawLines[0]?.length || 0;
const totalRows = rawLines.length;

// Timing parameters for sharp, narrow wave reveal
const TOTAL_SWEEP_DURATION = 900; // ms for wave to cross entire banner
const BLOOM_DURATION = 130; // ms for individual character bloom phase (narrow beam)

interface CharCellState {
  targetChar: string;
  deterministicHoverChar: string;
  activationThreshold: number;
  isSpace: boolean;
  revealStart: number;
  bloomDuration: number;
  clampedWave: number;
  flickerFreq: number;
  flickerPhase: number;
  isFinished: boolean;
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

    // Deterministic visual fingerprint and alternate character mapping per cell
    const seed = Math.sin(cIdx * 12.9898 + lIdx * 78.233) * 43758.5453;
    const randVal = seed - Math.floor(seed);
    const randVal2 = Math.abs((Math.sin(cIdx * 39.34 + lIdx * 11.78) * 24634.63) % 1);
    
    const hoverIndex = Math.floor(randVal * HOVER_RAMP.length);
    const deterministicHoverChar = HOVER_RAMP[hoverIndex] || '#';
    // Activation threshold: 100% transform at cursor center (threshold <= 0.8), fewer towards edge
    const activationThreshold = 0.05 + randVal2 * 0.75;

    const satOffset = (randVal - 0.5) * 55; // -27% to +27%
    const lightnessOffset = (randVal2 - 0.5) * 50; // -25% to +25%
    const glowStrength = 0.6 + randVal * 0.8;

    return {
      targetChar: char,
      deterministicHoverChar,
      activationThreshold,
      isSpace,
      revealStart,
      bloomDuration,
      clampedWave,
      flickerFreq: 0.1 + Math.random() * 0.15,
      flickerPhase: Math.random() * Math.PI * 2,
      isFinished: props.instant,
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

// Pre-computed static list of non-space cell indices (0 allocation during rAF runtime)
const activeCells: { r: number; c: number }[] = [];
for (let r = 0; r < totalRows; r++) {
  for (let c = 0; c < maxCols; c++) {
    if (!charStates[r]?.[c]?.isSpace) {
      activeCells.push({ r, c });
    }
  }
}

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
let glitchTimeout: any = null;

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

  ctx.font = `${fontSize}px "Geist Mono", monospace`;
  ctx.textBaseline = 'top';

  // Smooth mouse interpolation for fluid magnetic feel
  if (targetMouseX > -100) {
    if (mouseX.value < -100) {
      mouseX.value = targetMouseX;
      mouseY.value = targetMouseY;
    } else {
      mouseX.value += (targetMouseX - mouseX.value) * 0.35;
      mouseY.value += (targetMouseY - mouseY.value) * 0.35;
    }
  } else {
    mouseX.value = -1000;
    mouseY.value = -1000;
  }

  if (performance.now() - lastMouseTime > 80) {
    mouseVelocity *= 0.8;
    if (mouseVelocity < 0.05) mouseVelocity = 0;
  }

  const baseRgb = '255, 255, 255';

  let stillAnimating = false;
  let hasActiveKineticEnergy = false;
  let hasActiveGlitch = false;

  // Trigger occasional ambient quantum glitch when idle (0 allocations via precomputed activeCells)
  if (isAnimationFinished.value && timestamp > nextAmbientGlitchTime && activeCells.length > 0) {
    const chosen = activeCells[Math.floor(Math.random() * activeCells.length)];
    if (chosen) {
      const targetCell = charStates[chosen.r]?.[chosen.c];
      if (targetCell) {
        targetCell.ambientGlitchUntil = timestamp + 140 + Math.random() * 120;
        targetCell.ambientGlitchChar = AMBIENT_RAMP[Math.floor(Math.random() * AMBIENT_RAMP.length)] || '+';
        hasActiveGlitch = true;
      }
    }
    nextAmbientGlitchTime = timestamp + 1200 + Math.random() * 2000;
  }

  const curMouseX = mouseX.value / dpr;
  const curMouseY = mouseY.value / dpr;
  const hoverRadius = HOVER_RADIUS;
  const hoverRadiusSq = hoverRadius * hoverRadius;
  const pushRadius = PUSH_RADIUS;

  const numActive = activeCells.length;
  for (let i = 0; i < numActive; i++) {
    const { r: lIdx, c: cIdx } = activeCells[i]!;
    const state = charStates[lIdx]![cIdx]!;
    const charY = lIdx * lineHeight;
    const charX = cIdx * charWidth;
    const dx = charX - curMouseX;
    const dy = charY - curMouseY;
    const distSq = dx * dx + dy * dy;
    const isHovered = curMouseX > -100 && distSq < hoverRadiusSq;

    // Magnetic lens repulsion & kinetic dissipation (concentrated in close core)
    if (isHovered) {
      const dist = Math.sqrt(distSq) || 1;
      if (dist < pushRadius) {
        const pushNorm = 1 - (dist / pushRadius);
        const force = pushNorm * pushNorm * 1.8;
        state.dispX += ((dx / dist) * force - state.dispX) * 0.3;
        state.dispY += ((dy / dist) * force - state.dispY) * 0.3;

        // Only deposit kinetic wake energy in the close core (avoids circular trail stamping)
        state.kineticEnergy = Math.min(1.0, state.kineticEnergy + pushNorm * 0.2 + mouseVelocity * pushNorm * 0.025);
      } else {
        state.dispX += (0 - state.dispX) * 0.15;
        state.dispY += (0 - state.dispY) * 0.15;
        state.kineticEnergy *= 0.88;
      }
    } else {
      state.dispX += (0 - state.dispX) * 0.15;
      state.dispY += (0 - state.dispY) * 0.15;
      state.kineticEnergy *= 0.88;
    }

    if (state.kineticEnergy > 0.01) {
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

    // Handle hover character change (deterministic per cell based on cursor proximity)
    if (isHovered) {
      const dist = Math.sqrt(distSq) || 1;
      const normDist = Math.max(0, 1 - (dist / hoverRadius));
      
      if (normDist > state.activationThreshold) {
        charToDraw = state.deterministicHoverChar;
      } else {
        charToDraw = state.targetChar;
      }
    }

    // Handle ambient micro-glitch
    if (state.ambientGlitchUntil > timestamp) {
      charToDraw = state.ambientGlitchChar;
      opacity = 0.9;
      waveGlow = 0.6;
      hasActiveKineticEnergy = true;
      hasActiveGlitch = true;
    }

    // Render styles & glowing bloom
    const drawX = charX + state.dispX;
    const drawY = charY + state.dispY;

    if (isHovered) {
      const dist = Math.sqrt(distSq) || 1;
      const t = Math.max(0, 1 - (dist / hoverRadius));
      // Smoothstep easing for silky continuous radial gradient
      const easeT = t * t * (3 - 2 * t);

      // Center (easeT = 1): flashy neon cyan/green -> Outer perimeter (easeT = 0): pure white
      const baseHue = 172;
      const sat = 100 * easeT;
      const lightness = 100 - 46 * easeT; // 54% at center (electric neon #0affde / #1affd9) -> 100% at outer edge (white)
      const glowAlpha = Math.min(1, Math.max(opacity, 0.9));

      ctx.fillStyle = `hsla(${baseHue}, ${sat}%, ${lightness}%, ${glowAlpha})`;

      if (easeT > 0.3) {
        ctx.shadowColor = `hsla(${baseHue}, 100%, 55%, ${easeT * 0.65})`;
        ctx.shadowBlur = Math.min(10, easeT * 8);
        ctx.fillText(charToDraw, drawX, drawY);
        ctx.shadowBlur = 0;
      } else {
        ctx.fillText(charToDraw, drawX, drawY);
      }
    } else if (state.kineticEnergy > 0.05 || waveGlow > 0.3) {
      // Soft localized kinetic trail dissipation (smoothly fades into white with no circular ring)
      const energy = Math.max(state.kineticEnergy, waveGlow);
      const easeK = energy * energy * (3 - 2 * energy);
      const baseHue = 172;
      const sat = 100 * easeK;
      const lightness = 100 - 46 * easeK;

      ctx.fillStyle = `hsla(${baseHue}, ${sat}%, ${lightness}%, ${opacity})`;
      ctx.fillText(charToDraw, drawX, drawY);
    } else {
      // Normal crisp settled state
      ctx.fillStyle = `rgba(${baseRgb}, ${opacity})`;
      ctx.fillText(charToDraw, drawX, drawY);
    }
  }

  ctx.restore();

  const isInteracting = targetMouseX > -100 || mouseX.value > -100;
  if (stillAnimating || isInteracting || hasActiveKineticEnergy || hasActiveGlitch) {
    animationFrameId = requestAnimationFrame(draw);
  } else {
    isAnimationFinished.value = true;
    // Sleep when completely idle (0% CPU / 0 FPS). Wake up on mouse interaction or scheduled ambient glitch.
    if (glitchTimeout) clearTimeout(glitchTimeout);
    const sleepDelay = Math.max(300, nextAmbientGlitchTime - timestamp);
    glitchTimeout = setTimeout(() => {
      if (isVisible) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(draw);
      }
    }, sleepDelay);
  }
};

const DENSITY_MAP: Record<string, number> = {
  '#': 1.0,
  '%': 0.95,
  '@': 1.0,
  '&': 0.95,
  'W': 0.95,
  'M': 0.95,
  '+': 0.85,
  '=': 0.78,
  '*': 0.75,
  '~': 0.72,
  '-': 0.65,
  ':': 0.55,
  '.': 0.45,
  '·': 0.45,
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

  for (let lIdx = 0; lIdx < totalRows; lIdx++) {
    const line = rawLines[lIdx];
    if (!line) continue;
    const charY = lIdx * lineHeight;

    for (let cIdx = 0; cIdx < maxCols; cIdx++) {
      const char = line[cIdx];
      if (!char || char === ' ') continue;

      const charX = cIdx * charWidth;
      const cx = charX + charWidth * 0.5;
      const cy = charY + lineHeight * 0.5;
      const w = charWidth;
      const h = lineHeight;

      const opacity = DENSITY_MAP[char] ?? 0.8;
      ctx.fillStyle = props.color || `rgba(255, 255, 255, ${opacity})`;

      const minW = Math.max(0.6, w * 0.28);
      const minH = Math.max(0.6, h * 0.28);

      switch (char) {
        case '#':
        case '@':
          ctx.fillRect(charX + w * 0.08, charY + h * 0.1, w * 0.84, h * 0.8);
          break;
        case '%':
        case '&':
        case 'W':
        case 'M':
          ctx.fillRect(charX + w * 0.08, charY + h * 0.1, w * 0.84, h * 0.8);
          break;
        case '+':
          // Cross: horizontal bar + vertical bar
          ctx.fillRect(charX + w * 0.1, cy - minH * 0.5, w * 0.8, minH);
          ctx.fillRect(cx - minW * 0.5, charY + h * 0.12, minW, h * 0.76);
          break;
        case '*':
          // Asterisk: center + cross
          ctx.fillRect(charX + w * 0.12, cy - minH * 0.45, w * 0.76, minH * 0.9);
          ctx.fillRect(cx - minW * 0.45, charY + h * 0.18, minW * 0.9, h * 0.64);
          break;
        case '=':
          // Double bar
          ctx.fillRect(charX + w * 0.08, cy - h * 0.24, w * 0.84, minH * 0.9);
          ctx.fillRect(charX + w * 0.08, cy + h * 0.1, w * 0.84, minH * 0.9);
          break;
        case '-':
        case '~':
          // Single horizontal bar
          ctx.fillRect(charX + w * 0.08, cy - minH * 0.5, w * 0.84, minH);
          break;
        case ':':
          // Two vertical dots
          ctx.fillRect(cx - minW * 0.5, charY + h * 0.18, minW, minH * 0.9);
          ctx.fillRect(cx - minW * 0.5, charY + h * 0.58, minW, minH * 0.9);
          break;
        case '.':
        case '·':
          // Bottom dot
          ctx.fillRect(cx - minW * 0.5, charY + h * 0.62, minW, minH * 0.9);
          break;
        default:
          ctx.fillRect(charX + w * 0.1, charY + h * 0.15, w * 0.8, h * 0.7);
          break;
      }
    }
  }

  ctx.restore();
};

let observer: IntersectionObserver | null = null;
let resizeObserver: ResizeObserver | null = null;
let cachedCanvasRect: DOMRect | null = null;

const updateCachedRect = () => {
  if (asciiCanvas.value) {
    cachedCanvasRect = asciiCanvas.value.getBoundingClientRect();
  }
};

const handleWindowMouseMove = (e: MouseEvent) => {
  if (!props.animated || !isVisible || !asciiCanvas.value) return;

  if (!cachedCanvasRect) {
    updateCachedRect();
  }
  const rect = cachedCanvasRect;
  if (!rect || rect.width === 0 || rect.height === 0) return;

  const scaleX = asciiCanvas.value.width / rect.width;
  const scaleY = asciiCanvas.value.height / rect.height;

  const newX = (e.clientX - rect.left) * scaleX;
  const newY = (e.clientY - rect.top) * scaleY;

  // Generous envelope: allow mouse to move beyond canvas boundary so the 220px gradient fades out naturally
  const maxEnvelope = (HOVER_RADIUS + 80) * scaleX;
  const isNear = 
    newX >= -maxEnvelope &&
    newX <= asciiCanvas.value.width + maxEnvelope &&
    newY >= -maxEnvelope &&
    newY <= asciiCanvas.value.height + maxEnvelope;

  if (isNear) {
    const isFirstEntry = targetMouseX <= -100;
    targetMouseX = newX;
    targetMouseY = newY;

    if (isFirstEntry) {
      mouseX.value = newX;
      mouseY.value = newY;
      lastMouseX = newX;
      lastMouseY = newY;
      mouseVelocity = 0;
    } else {
      const now = performance.now();
      if (lastMouseTime > 0) {
        const dt = Math.max(1, now - lastMouseTime);
        const dMouseDist = Math.hypot(newX - lastMouseX, newY - lastMouseY);
        mouseVelocity = Math.min(15, (dMouseDist / dt) * 1.5);
      }
      lastMouseX = newX;
      lastMouseY = newY;
      lastMouseTime = now;
    }

    if (isAnimationFinished.value) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(draw);
    }
  } else if (targetMouseX > -100) {
    targetMouseX = -1000;
    targetMouseY = -1000;
    mouseVelocity = 0;
  }
};

const handleMouseLeave = () => {
  if (!props.animated) return;
  targetMouseX = -1000;
  targetMouseY = -1000;
  mouseVelocity = 0;
};

const updateDimensions = (widthOverride?: number) => {
  if (!asciiCanvas.value || !containerRef.value) return;
  dpr = window.devicePixelRatio || 1;
  const width = widthOverride || containerRef.value.clientWidth || window.innerWidth;
  if (width === 0) return;

  const charWidth = width / maxCols;
  const fontSize = charWidth / 0.58;
  const lineHeight = fontSize * 1.15;
  const height = totalRows * lineHeight;

  const newW = Math.round(width * dpr);
  const newH = Math.round(height * dpr);

  if (asciiCanvas.value.width === newW && asciiCanvas.value.height === newH) {
    return;
  }

  asciiCanvas.value.width = newW;
  asciiCanvas.value.height = newH;

  asciiCanvas.value.style.width = `${width}px`;
  asciiCanvas.value.style.height = `${height}px`;
  updateCachedRect();
};

let resizeTimeout: any = null;
const handleResize = () => {
  if (resizeTimeout) clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    updateDimensions();
    updateCachedRect();
    if (!props.animated) {
      drawStatic();
    } else if (isAnimationFinished.value) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(draw);
    }
  }, 100);
};

onMounted(async () => {
  if (typeof document !== 'undefined' && document.fonts?.ready) {
    try {
      await Promise.race([
        document.fonts.ready,
        new Promise((resolve) => setTimeout(resolve, 250)),
      ]);
    } catch {
      // ignore
    }
  }

  const init = () => {
    if (asciiCanvas.value && containerRef.value) {
      updateDimensions();
      updateCachedRect();

      if (!props.animated) {
        drawStatic();
        isReady.value = true;
        emit('ready');

        if (typeof ResizeObserver !== 'undefined') {
          resizeObserver = new ResizeObserver((entries) => {
            const entry = entries[0];
            const w = entry?.contentRect?.width;
            updateDimensions(w);
            updateCachedRect();
            drawStatic();
          });
          resizeObserver.observe(containerRef.value);
        }
        return;
      }

      if (typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver((entries) => {
          const entry = entries[0];
          const w = entry?.contentRect?.width;
          updateDimensions(w);
          updateCachedRect();
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
        if (isVisible) {
          updateCachedRect();
        }

        if (isVisible && !wasVisible) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(draw);
        }
      }, { threshold: 0.1 });

      observer.observe(asciiCanvas.value);

      window.addEventListener('mousemove', handleWindowMouseMove, { passive: true });
      window.addEventListener('mouseleave', handleMouseLeave);
      window.addEventListener('scroll', updateCachedRect, { passive: true });

      if (props.delay) {
        setTimeout(() => {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(draw);
          isReady.value = true;
          emit('ready');
        }, props.delay);
      } else {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(draw);
        isReady.value = true;
        emit('ready');
      }
    } else {
      setTimeout(init, 20);
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
  if (glitchTimeout) clearTimeout(glitchTimeout);
  window.removeEventListener('resize', handleResize);
  window.removeEventListener('mousemove', handleWindowMouseMove);
  window.removeEventListener('mouseleave', handleMouseLeave);
  window.removeEventListener('scroll', updateCachedRect);
});
</script>

<template>
  <div ref="containerRef"
       class="my-2 w-full max-w-[1180px] [contain:layout] aspect-[13166/2415]" 
       @mousemove.passive="handleWindowMouseMove">
    <div v-if="instant" class="text-white font-mono text-[clamp(0.35rem,0.7vw,0.75rem)] leading-tight select-none pointer-events-none" aria-hidden="true">
      <pre v-for="(line, idx) in rawLines" :key="idx" class="m-0 pre-wrap">{{ line }}</pre>
    </div>
    <canvas v-else ref="asciiCanvas" class="w-full h-full block"></canvas>
  </div>
</template>

<style scoped>
</style>

