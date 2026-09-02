<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';

const props = withDefaults(
  defineProps<{
    src: string;
    alt?: string;
    aspectRatio?: string;
    resolution?: number;
    invert?: boolean;
    brightness?: number;
    contrast?: number;
    charSpacing?: number;
    charRamp?: string;
    tintColor?: string;
    colorMode?: 'monochrome' | 'original';
    useOriginalColors?: boolean;
    mode?: 'default-ascii' | 'default-photo' | 'always-ascii';
    groupHover?: boolean;
    hovered?: boolean;
    imageClass?: string;
  }>(),
  {
    alt: '',
    aspectRatio: '16/9',
    resolution: 180,
    invert: false,
    brightness: 1.0,
    contrast: 1.2,
    charSpacing: 0.85,
    charRamp: ' .·:;~+=-*#%&$@',
    colorMode: 'monochrome',
    useOriginalColors: false,
    mode: 'default-ascii',
    groupHover: false,
    hovered: undefined,
    imageClass: '',
  }
);

const containerRef = ref<HTMLElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const isHovered = ref(false);
const isHoverActive = computed(() => (props.hovered !== undefined ? props.hovered : isHovered.value));
const isReady = ref(false);

let ctx: CanvasRenderingContext2D | null = null;
let asciiData: { char: string; r: number; g: number; b: number; a: number }[][] = [];
let cols = 0;
let rows = 0;
let imgElement: HTMLImageElement | null = null;
let resizeObserver: ResizeObserver | null = null;
let lastAspect = 0;
let cachedWidth = 0;
let cachedHeight = 0;

// Pre-compute high-resolution ASCII character map matching exact object-cover crop
const precomputeAscii = (w?: number, h?: number) => {
  if (!imgElement || !imgElement.complete || imgElement.naturalWidth === 0) return;

  const width = w || cachedWidth || containerRef.value?.clientWidth || 0;
  const height = h || cachedHeight || containerRef.value?.clientHeight || 0;

  if (width > 0 && height > 0) {
    cachedWidth = width;
    cachedHeight = height;
  }

  const containerAspect = (width > 0 && height > 0)
    ? width / height
    : (imgElement.naturalWidth / imgElement.naturalHeight);

  lastAspect = containerAspect;

  const imgW = imgElement.naturalWidth;
  const imgH = imgElement.naturalHeight;
  const imgAspect = imgW / imgH;

  // Exact object-fit: cover crop box (centered)
  let sx = 0;
  let sy = 0;
  let sWidth = imgW;
  let sHeight = imgH;

  if (imgAspect > containerAspect) {
    // Image is wider than container: crop left & right
    sWidth = imgH * containerAspect;
    sx = (imgW - sWidth) / 2;
  } else {
    // Image is taller than container: crop top & bottom
    sHeight = imgW / containerAspect;
    sy = (imgH - sHeight) / 2;
  }

  cols = props.resolution;
  // Font aspect ratio correction for monospace (~1.85:1 height:width ratio)
  rows = Math.max(10, Math.round((cols / containerAspect) * 0.54));

  const offscreen = document.createElement('canvas');
  offscreen.width = cols;
  offscreen.height = rows;
  const offCtx = offscreen.getContext('2d', { willReadFrequently: true });
  if (!offCtx) return;

  offCtx.drawImage(imgElement, sx, sy, sWidth, sHeight, 0, 0, cols, rows);
  const imgData = offCtx.getImageData(0, 0, cols, rows).data;

  const ramp = props.charRamp || ' .·:;~+=-*#%&$@';
  const rampLen = ramp.length;

  asciiData = [];
  for (let y = 0; y < rows; y++) {
    const row = [];
    for (let x = 0; x < cols; x++) {
      const idx = (y * cols + x) * 4;
      const r = imgData[idx] ?? 0;
      const g = imgData[idx + 1] ?? 0;
      const b = imgData[idx + 2] ?? 0;
      const a = (imgData[idx + 3] ?? 255) / 255;

      // Photometric luminance with user brightness multiplier
      let lum = ((0.299 * r + 0.587 * g + 0.114 * b) / 255) * props.brightness;

      if (props.invert) {
        lum = 1 - lum;
      }

      // Dynamic range contrast curve
      const contrastLum = Math.pow(Math.max(0, Math.min(1, lum)), props.contrast);

      if (contrastLum < 0.04 || a < 0.08) {
        row.push({ char: ' ', r, g, b, a: 0 });
        continue;
      }

      const charIndex = Math.floor(contrastLum * (rampLen - 1));
      const char = ramp[Math.min(Math.max(0, charIndex), rampLen - 1)] || ' ';

      row.push({ char, r, g, b, a });
    }
    asciiData.push(row);
  }

  isReady.value = true;
  drawCachedAscii(width, height);
};

// Paint from pre-computed buffer with strict column spacing
const drawCachedAscii = (w?: number, h?: number) => {
  if (!canvasRef.value || !containerRef.value || asciiData.length === 0) return;
  const canvas = canvasRef.value;
  const width = w || cachedWidth || containerRef.value.clientWidth || 0;
  const height = h || cachedHeight || containerRef.value.clientHeight || 0;
  
  if (width === 0 || height === 0) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const targetW = Math.round(width * dpr);
  const targetH = Math.round(height * dpr);

  if (canvas.width !== targetW || canvas.height !== targetH) {
    canvas.width = targetW;
    canvas.height = targetH;
  }

  if (!ctx) ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, width, height);

  const cellW = width / cols;
  const cellH = height / rows;

  // Strict column sizing: glyph advance width is ~0.6 * fontSize in monospace.
  // We clamp fontSize so glyph width never exceeds cellW * charSpacing (leaves crisp column gap).
  const maxFontForWidth = (cellW * props.charSpacing) / 0.60;
  const maxFontForHeight = cellH * 0.88;
  const fontSize = Math.max(6, Math.floor(Math.min(maxFontForWidth, maxFontForHeight)));

  ctx.font = `${fontSize}px "JetBrains Mono", "Courier New", monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  for (let y = 0; y < rows; y++) {
    const row = asciiData[y];
    if (!row) continue;
    
    for (let x = 0; x < cols; x++) {
      const cell = row[x];
      if (!cell || cell.char === ' ' || cell.a === 0) continue;

      // Exact centered grid position for straight, uniform columns
      const posX = x * cellW + cellW / 2;
      const posY = y * cellH + cellH / 2;

      let lum = (0.299 * cell.r + 0.587 * cell.g + 0.114 * cell.b) / 255;
      if (props.invert) {
        lum = 1 - lum;
      }
      const alpha = Math.max(0.35, Math.min(1, Math.pow(lum, 0.85) * 1.1));

      const isOriginalColor = props.useOriginalColors || props.colorMode === 'original' || props.tintColor === 'original';

      if (isOriginalColor) {
        let r = cell.r;
        let g = cell.g;
        let b = cell.b;
        if (props.invert) {
          r = 255 - r;
          g = 255 - g;
          b = 255 - b;
        }
        if (props.brightness !== 1.0) {
          r = Math.min(255, Math.round(r * props.brightness));
          g = Math.min(255, Math.round(g * props.brightness));
          b = Math.min(255, Math.round(b * props.brightness));
        }
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.fillText(cell.char, posX, posY);
      } else if (props.tintColor) {
        ctx.fillStyle = props.tintColor;
        ctx.globalAlpha = alpha;
        ctx.fillText(cell.char, posX, posY);
        ctx.globalAlpha = 1.0;
      } else {
        ctx.fillStyle = `rgba(45, 212, 191, ${alpha})`;
        ctx.fillText(cell.char, posX, posY);
      }
    }
  }
};

const handleMouseEnter = () => {
  isHovered.value = true;
};

const handleMouseLeave = () => {
  isHovered.value = false;
};

let intersectionObserver: IntersectionObserver | null = null;
let hasComputed = false;

const triggerPrecompute = () => {
  if (hasComputed || !imgElement) return;
  if (imgElement.complete && imgElement.naturalWidth > 0) {
    hasComputed = true;
    precomputeAscii();
  } else {
    imgElement.onload = () => {
      hasComputed = true;
      precomputeAscii();
    };
  }
};

onMounted(() => {
  imgElement = new Image();
  imgElement.crossOrigin = 'anonymous';
  imgElement.src = props.src;
  
  if (containerRef.value && typeof IntersectionObserver !== 'undefined') {
    intersectionObserver = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry?.isIntersecting) {
        triggerPrecompute();
        if (intersectionObserver) {
          intersectionObserver.disconnect();
          intersectionObserver = null;
        }
      }
    }, { rootMargin: '350px' });
    intersectionObserver.observe(containerRef.value);
  } else {
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      (window as any).requestIdleCallback(triggerPrecompute);
    } else {
      setTimeout(triggerPrecompute, 200);
    }
  }

  if (containerRef.value && typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry || !hasComputed) return;
      const width = entry.contentRect.width;
      const height = entry.contentRect.height;
      if (width > 0 && height > 0) {
        const aspect = width / height;
        if (Math.abs(aspect - lastAspect) > 0.03) {
          precomputeAscii(width, height);
        } else {
          drawCachedAscii(width, height);
        }
      }
    });
    resizeObserver.observe(containerRef.value);
  }
});

onBeforeUnmount(() => {
  if (intersectionObserver) intersectionObserver.disconnect();
  if (resizeObserver) resizeObserver.disconnect();
});

watch(() => [props.src, props.invert, props.resolution, props.brightness, props.contrast, props.charSpacing, props.charRamp, props.tintColor, props.colorMode, props.useOriginalColors], () => {
  if (imgElement) {
    isReady.value = false;
    hasComputed = false;
    imgElement.src = props.src;
    triggerPrecompute();
  }
});

const canvasDynamicClass = computed(() => {
  if (!isReady.value) return '!opacity-0';
  if (props.groupHover) {
    if (props.mode === 'default-ascii') return 'opacity-100 group-hover:opacity-0';
    if (props.mode === 'default-photo') return 'opacity-0 group-hover:opacity-100';
    if (props.mode === 'always-ascii') return 'opacity-100';
    return '';
  }
  if (props.mode === 'default-ascii') return isHoverActive.value ? 'opacity-0' : 'opacity-100';
  if (props.mode === 'default-photo') return isHoverActive.value ? 'opacity-100' : 'opacity-0';
  if (props.mode === 'always-ascii') return 'opacity-100';
  return '';
});

const imgDynamicClass = computed(() => {
  if (props.groupHover) {
    if (props.mode === 'default-ascii') return 'opacity-0 group-hover:opacity-100';
    if (props.mode === 'default-photo') return 'opacity-100 group-hover:opacity-0';
    if (props.mode === 'always-ascii') return 'opacity-0';
    return '';
  }
  if (props.mode === 'default-ascii') return isHoverActive.value ? 'opacity-100' : 'opacity-0';
  if (props.mode === 'default-photo') return isHoverActive.value ? 'opacity-0' : 'opacity-100';
  if (props.mode === 'always-ascii') return 'opacity-0';
  return '';
});
</script>

<template>
  <div
    ref="containerRef"
    class="ascii-image-container relative w-full h-full overflow-hidden select-none"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Pre-rendered High-Detail Canvas ASCII Art (Default State) -->
    <canvas
      ref="canvasRef"
      class="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-500 ease-in-out"
      :class="canvasDynamicClass"
      aria-hidden="true"
    />

    <!-- Original Photo (Revealed on Hover - Pure Dissolve / Fade) -->
    <img
      :src="src"
      :alt="alt"
      class="w-full h-full object-cover transition-opacity duration-500 ease-in-out pointer-events-none"
      :class="[imgDynamicClass, imageClass]"
      loading="lazy"
    />
  </div>
</template>

<style scoped>
.ascii-image-container {
  background: transparent;
}
</style>
