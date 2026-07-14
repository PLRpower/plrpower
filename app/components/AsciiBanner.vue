<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';

const colorMode = useColorMode();
const props = defineProps<{
  delay?: number;
  instant?: boolean;
}>();

const rawLines = [
  "                                                                          ++++++++                                                 +++++++                                                                                                                                   ",
  "++++++++++++++++++++                                                          ++++                 ++++++++++++++++++++++++++++++     ++++                                                                                                                                  ",
  "    ++++#        +++++*                                                       ++++                 +++          +++++         +++     ++++                                                                                                                                   ",
  "    ++++#         #+++++                                                      ++++                 ++           +++++          ++     *+++                                                                                                                                   ",
  "    ++++#          +++++                                                      *+++                 +*           +++++           +     *+++                                                                                                                                   ",
  "    ++++#          +++++                                                      *+++                              +++++                 *+++                                                                                                                                   ",
  "    ++++#          +++++     *+++++++++++       +++++++       +++++++#        *+++                              +++++                 *+++   *+++++++++              +++++++++++          +++++*   *+++++++++     ++++++++++          #+++++++++++           ++++++++++      ",
  "    ++++#         +++++     ++++      ++++         ++++          ++++#        *+++                              +++++                 *+++ +++     #++++%         #++++       ++++*       #+++++ ++*     #++++* ++*     *++++        ++++*     *+++*       %++*     +++      ",
  "    ++++#      *++++++      +++%       ++++        ++++          *+++#        *+++                              +++++                 *++++*         ++++        ++++%         *++++        +++++*        #+++++*        #++++       +++*       ++++       +++#      ++      ",
  "    +++++++++++++++                    ++++        ++++          #+++#        *+++                              +++++                 *++++          ++++       ++++*           #++++       *+++*          ++++*          ++++                  ++++       ++++*             ",
  "    ++++#                            *+++++        ++++          #+++#        *+++                              +++++                 *+++           ++++      *++++             ++++#      *+++%          ++++           ++++                 +++++       #++++++           ",
  "    ++++#                        *+++* ++++        ++++          #+++#        *+++                              +++++                 *+++           ++++      *++++             ++++*      *+++           ++++           ++++            #+++* ++++         ++++++++        ",
  "    ++++#                     ++++     ++++        ++++          *+++#        *+++                              +++++                 *+++           ++++      #++++             +++++      *+++           ++++           ++++         ++++     ++++            +++++++      ",
  "    ++++#                   +++*       ++++        ++++          ++++#        *+++                              +++++                 *+++           ++++       ++++             ++++       *+++           ++++           ++++       ++++       ++++              *+++++%    ",
  "    ++++#                  ++++       +++++        ++++*        *++++*        *+++                              +++++                 *+++           ++++       #++++           ++++*       *+++           ++++           ++++      ++++       %++++       +         +++*    ",
  "    ++++*                 %++++      ++++++        #++++       ++#+++*        ++++                             *+++++                 ++++#          ++++%       *++++         ++++         ++++#          ++++%          ++++      ++++      #+*+++%      ++        +++#    ",
  "  #+++++++                 +++++++*++* *++++#*+     *+++++*+*+++  ++++       ++++++                          *++++++++*              *+++++         *+++++         *++++*   *++++*         *+++++         *+++++         *+++++     #+++++**+++  ++++*#+%  ++++     +++#     ",
  "+++++++++++++++               *++++*     #++++*         ++++++     +++++++ *++++++++++*                    *++++++++++++++*         +++++++++++    +++++++++++         *+++++++#          ++++++++++*    ++++++++++*    ++++++++++*    *+++++#     ++++*    +  *++++++       "
];

const asciiCanvas = ref<HTMLCanvasElement | null>(null);
const isReady = ref(false);
const scramblePool = ['.', '*', '+', 'x'];
const hoverPool = ['#', '@', '%', '&', 'W', '$'];

let animationFrameId: number;
let isVisible = true;

// Paramètres d'allumage (60 FPS)
const CHAR_MAP = rawLines.map(line => line.split(''));
const maxCols = rawLines[0]?.length || 0;
const totalAnimationTime = maxCols * 10; // Original state

const charStates = CHAR_MAP.map((line, lIdx) => 
  line.map((char, cIdx) => {
    const t = cIdx / maxCols;
    const f = (x : number) => 0.1 * x + 0.2 * (4 * Math.pow(x - 0.3, 3) + 0.432);
    const easedT = (f(t) - f(0)) / (f(1) - f(0));
    
    return {
      targetChar: char,
      currentOpacity: 0,
      startTime: props.instant ? 0 : (easedT * totalAnimationTime) + (Math.random() * 50),
      duration: props.instant ? 0 : 400 + Math.random() * 150,
      flickerFreq: 0.05 + Math.random() * 0.1,
      flickerPhase: Math.random() * Math.PI * 2,
      isFinished: props.instant,
      hoverChar: null as string | null
    };
  })
);

const mouseX = ref(-1000);
const mouseY = ref(-1000);
const isAnimationFinished = ref(false);
let initialStartTime = 0;
let dpr = 1;

let _cachedFontSize = 0;
let _cachedCharWidth = 0;

const draw = (timestamp: number) => {
  if (!isVisible || !asciiCanvas.value) return;
  const ctx = asciiCanvas.value.getContext('2d', { alpha: true });
  if (!ctx) return;

  if (!initialStartTime) initialStartTime = timestamp;
  const elapsed = timestamp - initialStartTime;
  
  const canvas = asciiCanvas.value;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  const logicalWidth = canvas.width / dpr;
  const fontSize = logicalWidth * 0.005; 
  
  ctx.save();
  ctx.scale(dpr, dpr);
  
  ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
  ctx.textBaseline = 'top';
  
  if (!_cachedFontSize || _cachedFontSize !== fontSize) {
    _cachedFontSize = fontSize;
    _cachedCharWidth = ctx.measureText('M').width;
  }
  const charWidth = _cachedCharWidth;
  const lineHeight = fontSize * 1.3;

  let stillAnimating = false;

  charStates.forEach((line, lIdx) => {
    const charY = lIdx * lineHeight;
    line.forEach((state, cIdx) => {
      if (state.targetChar === ' ') return;
      
      const charX = cIdx * charWidth;
      const dx = charX - (mouseX.value / dpr);
      const dy = charY - (mouseY.value / dpr);
      const distSq = dx*dx + dy*dy;
      
      const isHovered = distSq < 2500; // 50*50, avoid sqrt
      const charElapsed = elapsed - state.startTime;

      if (charElapsed < 0 && !isHovered) {
        stillAnimating = true;
        return;
      }

      let charToDraw = state.targetChar;
      let opacity = state.currentOpacity;

      if (isHovered) {
        opacity = 1.0; 
        
        if (!state.hoverChar) {
          state.hoverChar = hoverPool[Math.floor(Math.random() * hoverPool.length)] || '#';
        }
        charToDraw = state.hoverChar;
      } else {
        state.hoverChar = null;
        
        if (charElapsed >= state.duration) {
          opacity = 1.0;
          state.isFinished = true;
        } else {
          stillAnimating = true;
          const progress = Math.min(charElapsed / state.duration, 1);
          const flickerIntensity = Math.sin(timestamp * state.flickerFreq + state.flickerPhase);
          const flickerOn = flickerIntensity > -0.4;
          
          if (flickerOn) {
            opacity = 0.4 + 0.6 * (1 - progress); 
            if (flickerIntensity > 0.8 && Math.random() > 0.6) {
              opacity = 1.0;
            }
          } else {
            opacity = 0;
          }
        }
      }

      const isLight = colorMode.value === 'light';
      ctx.fillStyle = isHovered ? '#2dd4bf' : `rgba(${isLight ? '15, 23, 42' : '255, 255, 255'}, ${opacity})`;
      
      if (!state.isFinished && !isHovered) {
        charToDraw = scramblePool[Math.floor(Math.random() * scramblePool.length)] || '.';
      }

      ctx.fillText(charToDraw, charX, charY);
    });
  });
  
  ctx.restore();

  const isInteracting = mouseX.value > -100;
  if (stillAnimating || isInteracting) {
    animationFrameId = requestAnimationFrame(draw);
  } else {
    isAnimationFinished.value = true;
  }
};

let canvasRect: DOMRect | null = null;
let observer: IntersectionObserver | null = null;

const updateRect = () => {
  if (asciiCanvas.value) {
    canvasRect = asciiCanvas.value.getBoundingClientRect();
  }
};

let mouseMoveThrottled = false;
const handleMouseMove = (e: MouseEvent) => {
  if (mouseMoveThrottled) return;
  mouseMoveThrottled = true;
  
  const canvas = asciiCanvas.value;
  if (!canvas) { mouseMoveThrottled = false; return; }

  if (!canvasRect) updateRect();
  const rect = canvasRect;
  
  if (rect) {
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    mouseX.value = (e.clientX - rect.left) * scaleX;
    mouseY.value = (e.clientY - rect.top) * scaleY;
    
    if (isAnimationFinished.value) {
      // Only restart loop if animation was done
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(draw);
    }
  }
  
  requestAnimationFrame(() => { mouseMoveThrottled = false; });
};

const handleMouseLeave = () => {
  mouseX.value = -1000;
  mouseY.value = -1000;
};

let resizeTimeout: any = null;
const handleResize = () => {
  if (resizeTimeout) clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    if (asciiCanvas.value) {
      dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      
      // On calcule la hauteur exacte nécessaire en fonction du nombre de lignes
      // C'est le ratio utilisé dans draw() : fontSize = width * 0.005, lineHeight = fontSize * 1.3
      const fontSize = width * 0.005;
      const lineHeight = fontSize * 1.3;
      const height = (rawLines.length + 2) * lineHeight; // +2 pour un léger padding
      
      asciiCanvas.value.width = width * dpr;
      asciiCanvas.value.height = height * dpr;
      
      // On garde le style CSS
      asciiCanvas.value.style.width = `${width}px`;
      asciiCanvas.value.style.height = `${height}px`;

      // Met à jour le cache du rect
      updateRect();
    }
  }, 150); // Debounce de 150ms pour le zoom au trackpad
};

onMounted(() => {
  const init = () => {
    if (asciiCanvas.value) {
      handleResize();

      // Intersection Observer pour économiser le CPU
      observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (!entry) return;
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        
        if (isVisible && !wasVisible) {
          // Relancer l'animation si elle était arrêtée
          animationFrameId = requestAnimationFrame(draw);
        }
      }, { threshold: 0.1 });
      
      observer.observe(asciiCanvas.value);

      setTimeout(() => {
        requestAnimationFrame(draw);
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
  window.removeEventListener('resize', handleResize);
});

watch(() => colorMode.value, () => {
  if (isAnimationFinished.value) {
    animationFrameId = requestAnimationFrame(draw);
  }
});
</script>

<template>
  <div class="my-2 w-full min-h-[260px] [contain:layout]" 
       :style="{ opacity: isReady || instant ? 1 : 0, transition: 'opacity 0.8s ease' }"
       @mousemove.passive="handleMouseMove"
       @mouseleave="handleMouseLeave">
    <div v-if="instant" class="text-white light:text-primary font-mono text-[0.5vw] leading-tight select-none pointer-events-none" aria-hidden="true">
      <pre v-for="(line, idx) in rawLines" :key="idx" class="m-0 pre-wrap">{{ line }}</pre>
    </div>
    <canvas v-else ref="asciiCanvas" class="w-full h-auto block"></canvas>
  </div>
</template>

<style scoped>
/* Les styles très spécifiques comme min-height ou contain sont parfois plus clairs en CSS mais ici convertis en classes arbitraires Tailwind */
</style>
