<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps<{
  delay?: number;
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
let isFirefox = false;

// Paramètres d'allumage (60 FPS)
const CHAR_MAP = rawLines.map(line => line.split(''));
const maxCols = rawLines[0].length;
const totalAnimationTime = maxCols * 10; // Ajuste ce chiffre pour la vitesse globale

const charStates = CHAR_MAP.map((line, lIdx) => 
  line.map((char, cIdx) => {
    // Ease-in-out progress (0 à 1)
    const t = cIdx / maxCols;
    // On mélange vitesse linéaire et courbe cubique asymétrique
    // Le centre est à 0.4 pour ralentir plus tôt à la fin
    const f = (x : number) => 0.1 * x + 0.2 * (4 * Math.pow(x - 0.3, 3) + 0.432);
    const easedT = (f(t) - f(0)) / (f(1) - f(0));
    
    return {
      targetChar: char,
      currentOpacity: 0,
      startTime: (easedT * totalAnimationTime) + (Math.random() * 50),
      duration: 400 + Math.random() * 150,
      flickerFreq: 0.05 + Math.random() * 0.1,
      flickerPhase: Math.random() * Math.PI * 2,
      isFinished: false,
      hoverChar: null as string | null
    };
  })
);

const mouseX = ref(-1000);
const mouseY = ref(-1000);
const isAnimationFinished = ref(false);
let initialStartTime = 0;
let dpr = 1;

const draw = (timestamp: number) => {
  if (!asciiCanvas.value) return;
  const ctx = asciiCanvas.value.getContext('2d');
  if (!ctx) return;

  if (!initialStartTime) initialStartTime = timestamp;
  const elapsed = timestamp - initialStartTime;
  
  const canvas = asciiCanvas.value;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // On divise par le dpr pour que la taille logique reste la même
  const logicalWidth = canvas.width / dpr;
  const fontSize = logicalWidth * 0.005; 
  
  ctx.save();
  ctx.scale(dpr, dpr);
  
  ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
  ctx.textBaseline = 'top';
  
  const charWidth = ctx.measureText('M').width;
  const lineHeight = fontSize * 1.3;

  let stillAnimating = false;

  let lastBlur = 0;
  ctx.shadowBlur = 0;

  charStates.forEach((line, lIdx) => {
    line.forEach((state, cIdx) => {
      if (state.targetChar === ' ') return;
      
      const charX = cIdx * charWidth;
      const charY = lIdx * lineHeight;
      const dx = charX - (mouseX.value / dpr);
      const dy = charY - (mouseY.value / dpr);
      const dist = Math.sqrt(dx*dx + dy*dy);
      
      const isHovered = dist < 50;
      const charElapsed = elapsed - state.startTime;

      if (charElapsed < 0 && !isHovered) {
        stillAnimating = true;
        return;
      }

      let charToDraw = state.targetChar;
      let opacity = state.currentOpacity;

      const glowScale = Math.max(0, 1 - dist / 60);

      if (isHovered) {
        if (!isFirefox) {
          const blur = 60 * glowScale;
          ctx.shadowBlur = blur;
          ctx.shadowColor = `rgba(52, 211, 153, ${glowScale})`;
          lastBlur = blur;
        }
        opacity = 1.0; 
        
        if (!state.hoverChar) {
          state.hoverChar = hoverPool[Math.floor(Math.random() * hoverPool.length)] || '#';
        }
        charToDraw = state.hoverChar;
      } else {
        if (lastBlur !== 0) {
          ctx.shadowBlur = 0;
          lastBlur = 0;
        }
        state.hoverChar = null;
        
        if (charElapsed >= state.duration) {
          opacity = 1.0; // FULL OPACITÉ (VEILLE)
          state.isFinished = true;
        } else {
          stillAnimating = true;
          const progress = Math.min(charElapsed / state.duration, 1);
          const flickerIntensity = Math.sin(timestamp * state.flickerFreq + state.flickerPhase);
          const flickerOn = flickerIntensity > -0.4;
          
          if (flickerOn) {
            if (!isFirefox) {
              // Rétablissement du glow pour les navigateurs performants (Chrome/Safari/Edge)
              const animBlur = 50 * (1 - progress);
              ctx.shadowBlur = animBlur;
              ctx.shadowColor = '#34d399';
              lastBlur = animBlur;
              opacity = 0.6 + 0.4 * (1 - progress); 
              
              if (flickerIntensity > 0.8 && Math.random() > 0.6) {
                ctx.shadowBlur = 80;
                lastBlur = 80;
                opacity = 1.0;
              }
            } else {
              // Optimisation Firefox : Uniquement opacité
              opacity = 0.4 + 0.6 * (1 - progress); 
              if (flickerIntensity > 0.8 && Math.random() > 0.6) {
                opacity = 1.0;
              }
            }
          } else {
            opacity = 0;
          }
        }
      }

      ctx.fillStyle = isHovered ? '#beffcc' : `rgba(255, 255, 255, ${opacity})`;
      
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

const updateRect = () => {
  if (asciiCanvas.value) {
    canvasRect = asciiCanvas.value.getBoundingClientRect();
  }
};

const handleMouseMove = (e: MouseEvent) => {
  const canvas = asciiCanvas.value;
  if (!canvas) return;

  if (!canvasRect) updateRect();
  const rect = canvasRect;
  
  if (rect) {
    // Les coordonnées ici doivent correspondre à la taille interne (multipliée par dpr)
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    mouseX.value = (e.clientX - rect.left) * scaleX;
    mouseY.value = (e.clientY - rect.top) * scaleY;
    
    cancelAnimationFrame(animationFrameId);
    animationFrameId = requestAnimationFrame(draw);
  }
};

const handleMouseLeave = () => {
  mouseX.value = -1000;
  mouseY.value = -1000;
};

const handleResize = () => {
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
};

onMounted(() => {
  const init = () => {
    if (asciiCanvas.value) {
      isFirefox = navigator.userAgent.toLowerCase().includes('firefox');
      handleResize();
      setTimeout(() => {
        requestAnimationFrame(draw);
        isReady.value = true;
      }, props.delay || 0);
    } else {
      setTimeout(init, 50);
    }
  };
  init();
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <div class="ascii-wrapper" 
       :style="{ opacity: isReady ? 1 : 0, transition: 'opacity 0.8s ease' }"
       @mousemove="handleMouseMove"
       @mouseleave="handleMouseLeave">
    <canvas ref="asciiCanvas" class="ascii-canvas"></canvas>
  </div>
</template>

<style scoped>
.ascii-wrapper {
  margin: 0.5rem 0;
  width: 100%;
  min-height: 260px; /* Réserve l'espace pour éviter le saut vertical au chargement */
  contain: layout;
}

.ascii-canvas {
  width: 100%;
  height: auto;
  display: block;
}
</style>
