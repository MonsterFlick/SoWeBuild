import fs from 'fs';
import path from 'path';
import { createCanvas, GlobalFonts } from '@napi-rs/canvas';
import gifencPkg from 'gifenc';
const { GIFEncoder, quantize, applyPalette } = gifencPkg;
import H264EncoderPkg from 'h264-mp4-encoder';

const { createH264MP4Encoder } = H264EncoderPkg;

const BRAND_DIR = path.resolve('public', 'brand');
fs.mkdirSync(BRAND_DIR, { recursive: true });

// Register Fonts
const fontSyne = path.resolve('scripts', 'fonts', 'Syne-Variable.ttf');
const fontManrope = path.resolve('scripts', 'fonts', 'Manrope.ttf');
const fontMono = path.resolve('scripts', 'fonts', 'JetBrainsMono.ttf');
const fontSpaceGrotesk = path.resolve('scripts', 'fonts', 'SpaceGrotesk.ttf');

if (fs.existsSync(fontSyne)) {
  GlobalFonts.registerFromPath(fontSyne, 'Syne');
}
if (fs.existsSync(fontManrope)) {
  GlobalFonts.registerFromPath(fontManrope, 'Manrope');
}
if (fs.existsSync(fontMono)) {
  GlobalFonts.registerFromPath(fontMono, 'JetBrains Mono');
}
if (fs.existsSync(fontSpaceGrotesk)) {
  GlobalFonts.registerFromPath(fontSpaceGrotesk, 'Space Grotesk');
}

console.log('Registered fonts successfully for Ivory Violet Brand Suite.');

/* -------------------------------------------------------------------------- */
/* 1. Generate Vector SVGs (Ivory Violet Theme)                               */
/* -------------------------------------------------------------------------- */

const SVG_SYMBOL = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 60" fill="none">
  <polygon points="26,2 38,2 14,58 2,58" fill="url(#violetGlow)" />
  <defs>
    <linearGradient id="violetGlow" x1="2" y1="2" x2="38" y2="58" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#9333EA" />
      <stop offset="60%" stop-color="#7C3AED" />
      <stop offset="100%" stop-color="#6D28D9" />
    </linearGradient>
  </defs>
</svg>`;

const SVG_SYMBOL_GLOW = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
  <rect width="120" height="120" rx="28" fill="#FFFFFF" />
  <rect width="120" height="120" rx="28" stroke="#E8DFF2" stroke-width="1.5" />
  <circle cx="60" cy="60" r="38" fill="url(#aura)" opacity="0.15" filter="blur(16px)" />
  <g transform="translate(40, 30)">
    <polygon points="26,2 38,2 14,58 2,58" fill="url(#symbolGrad)" filter="drop-shadow(0 4px 12px rgba(124,58,237,0.28))" />
  </g>
  <defs>
    <radialGradient id="aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#7C3AED" stop-opacity="0.9" />
      <stop offset="60%" stop-color="#9333EA" stop-opacity="0.5" />
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="symbolGrad" x1="2" y1="2" x2="38" y2="58" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#9333EA" />
      <stop offset="60%" stop-color="#7C3AED" />
      <stop offset="100%" stop-color="#6D28D9" />
    </linearGradient>
  </defs>
</svg>`;

const SVG_LOGO_DARK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 80" fill="none">
  <!-- Symbol -->
  <g transform="translate(20, 10)">
    <polygon points="26,2 38,2 14,58 2,58" fill="url(#violetGlowDark)" filter="drop-shadow(0 0 10px rgba(124,58,237,0.5))" />
  </g>
  <!-- Wordmark -->
  <text x="74" y="34" font-family="'Syne', system-ui, -apple-system, sans-serif" font-weight="700" font-size="20" letter-spacing="0.14em" fill="#FAF8F5">SO WE</text>
  <text x="74" y="60" font-family="'Syne', system-ui, -apple-system, sans-serif" font-weight="700" font-size="24" letter-spacing="0.14em" fill="#FAF8F5">
    BUILD<tspan fill="#c6ff3d">.IN</tspan>
  </text>
  <defs>
    <linearGradient id="violetGlowDark" x1="2" y1="2" x2="38" y2="58" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#C4B5FD" />
      <stop offset="40%" stop-color="#8B5CF6" />
      <stop offset="100%" stop-color="#7C3AED" />
    </linearGradient>
  </defs>
</svg>`;

const SVG_LOGO_LIGHT = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 80" fill="none">
  <!-- Symbol -->
  <g transform="translate(20, 10)">
    <polygon points="26,2 38,2 14,58 2,58" fill="url(#violetGlowLight)" />
  </g>
  <!-- Wordmark -->
  <text x="74" y="34" font-family="'Syne', system-ui, -apple-system, sans-serif" font-weight="700" font-size="20" letter-spacing="0.14em" fill="#161124">SO WE</text>
  <text x="74" y="60" font-family="'Syne', system-ui, -apple-system, sans-serif" font-weight="700" font-size="24" letter-spacing="0.14em" fill="#161124">
    BUILD<tspan fill="#7C3AED">.IN</tspan>
  </text>
  <defs>
    <linearGradient id="violetGlowLight" x1="2" y1="2" x2="38" y2="58" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#9333EA" />
      <stop offset="60%" stop-color="#7C3AED" />
      <stop offset="100%" stop-color="#6D28D9" />
    </linearGradient>
  </defs>
</svg>`;

const SVG_LOGO_STACKED = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none">
  <rect width="200" height="200" rx="36" fill="#FAF8F5" />
  <rect width="200" height="200" rx="36" stroke="#E8DFF2" stroke-width="1.5" />
  <circle cx="100" cy="80" r="45" fill="#7C3AED" opacity="0.12" filter="blur(18px)" />
  <!-- Symbol Center -->
  <g transform="translate(80, 42)">
    <polygon points="26,2 38,2 14,58 2,58" fill="url(#violetStacked)" filter="drop-shadow(0 4px 12px rgba(124,58,237,0.25))" />
  </g>
  <!-- Centered Typography -->
  <text x="100" y="138" text-anchor="middle" font-family="'Syne', system-ui, -apple-system, sans-serif" font-weight="700" font-size="14" letter-spacing="0.22em" fill="#161124">SO WE</text>
  <text x="100" y="162" text-anchor="middle" font-family="'Syne', system-ui, -apple-system, sans-serif" font-weight="700" font-size="18" letter-spacing="0.18em" fill="#161124">
    BUILD<tspan fill="#7C3AED">.IN</tspan>
  </text>
  <defs>
    <linearGradient id="violetStacked" x1="2" y1="2" x2="38" y2="58" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#9333EA" />
      <stop offset="60%" stop-color="#7C3AED" />
      <stop offset="100%" stop-color="#6D28D9" />
    </linearGradient>
  </defs>
</svg>`;

fs.writeFileSync(path.join(BRAND_DIR, 'sowebuild-symbol.svg'), SVG_SYMBOL);
fs.writeFileSync(path.join(BRAND_DIR, 'sowebuild-symbol-glow.svg'), SVG_SYMBOL_GLOW);
fs.writeFileSync(path.join(BRAND_DIR, 'sowebuild-logo-dark.svg'), SVG_LOGO_DARK);
fs.writeFileSync(path.join(BRAND_DIR, 'sowebuild-logo-light.svg'), SVG_LOGO_LIGHT);
fs.writeFileSync(path.join(BRAND_DIR, 'sowebuild-logo-stacked.svg'), SVG_LOGO_STACKED);

console.log('Wrote all 5 vector SVG files in Ivory Violet identity.');

/* -------------------------------------------------------------------------- */
/* 2. Generate True 4K Ultra-DPI PNGs (3840 x 1200 & 3840 x 3840)             */
/* -------------------------------------------------------------------------- */

function renderLogoToCanvas4K(width, height, isDark = false) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  if (isDark) {
    // Deep Purple Ink / Obsidian Void
    ctx.fillStyle = '#161124';
    ctx.fillRect(0, 0, width, height);

    // Subtle 4K grid pattern
    ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
    const gridStep = Math.round(width / 80);
    for (let gx = 0; gx < width; gx += gridStep) {
      for (let gy = 0; gy < height; gy += gridStep) {
        ctx.fillRect(gx, gy, 2, 2);
      }
    }

    // Radial royal violet glow
    const radial = ctx.createRadialGradient(width * 0.18, height * 0.5, 20, width * 0.18, height * 0.5, height * 0.85);
    radial.addColorStop(0, 'rgba(124, 58, 237, 0.28)');
    radial.addColorStop(0.6, 'rgba(109, 40, 217, 0.12)');
    radial.addColorStop(1, 'rgba(22, 17, 36, 0)');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, width, height);
  } else {
    // Warm Ivory Canvas (#FAF8F5)
    ctx.fillStyle = '#FAF8F5';
    ctx.fillRect(0, 0, width, height);

    // Subtle 4K dot matrix
    ctx.fillStyle = 'rgba(22, 17, 36, 0.035)';
    const gridStep = Math.round(width / 80);
    for (let gx = 0; gx < width; gx += gridStep) {
      for (let gy = 0; gy < height; gy += gridStep) {
        ctx.fillRect(gx, gy, 2, 2);
      }
    }

    // Soft warm violet ambient aura
    const radial = ctx.createRadialGradient(width * 0.18, height * 0.5, 20, width * 0.18, height * 0.5, height * 0.9);
    radial.addColorStop(0, 'rgba(124, 58, 237, 0.08)');
    radial.addColorStop(0.6, 'rgba(198, 255, 61, 0.04)');
    radial.addColorStop(1, 'rgba(250, 248, 245, 0)');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, width, height);
  }

  const scale = height / 100;
  const markX = 40 * scale;
  const markY = 20 * scale;

  ctx.save();
  ctx.translate(markX, markY);

  // Draw slash polygon
  const sGrad = ctx.createLinearGradient(0, 0, 40 * scale, 60 * scale);
  if (isDark) {
    sGrad.addColorStop(0, '#C4B5FD');
    sGrad.addColorStop(0.5, '#8B5CF6');
    sGrad.addColorStop(1, '#7C3AED');
    ctx.shadowColor = 'rgba(124, 58, 237, 0.6)';
    ctx.shadowBlur = 28 * (scale / 4);
  } else {
    sGrad.addColorStop(0, '#9333EA');
    sGrad.addColorStop(0.6, '#7C3AED');
    sGrad.addColorStop(1, '#6D28D9');
    ctx.shadowColor = 'rgba(124, 58, 237, 0.35)';
    ctx.shadowBlur = 20 * (scale / 4);
  }

  ctx.fillStyle = sGrad;
  ctx.beginPath();
  ctx.moveTo(26 * scale, 2 * scale);
  ctx.lineTo(38 * scale, 2 * scale);
  ctx.lineTo(14 * scale, 58 * scale);
  ctx.lineTo(2 * scale, 58 * scale);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Draw 4K Typography using Syne
  ctx.save();
  ctx.fillStyle = isDark ? '#FAF8F5' : '#161124';
  ctx.font = `700 ${22 * scale}px "Syne", system-ui, sans-serif`;
  ctx.letterSpacing = `${2 * scale}px`;
  ctx.fillText('SO WE', 95 * scale, 46 * scale);

  ctx.font = `700 ${26 * scale}px "Syne", system-ui, sans-serif`;
  ctx.fillText('BUILD', 95 * scale, 76 * scale);

  const buildMetrics = ctx.measureText('BUILD');
  if (isDark) {
    ctx.fillStyle = '#c6ff3d';
    ctx.shadowColor = 'rgba(198, 255, 61, 0.7)';
    ctx.shadowBlur = 20 * (scale / 4);
  } else {
    ctx.fillStyle = '#7C3AED';
    ctx.shadowColor = 'rgba(124, 58, 237, 0.4)';
    ctx.shadowBlur = 12 * (scale / 4);
  }
  ctx.fillText('.IN', 95 * scale + buildMetrics.width + 1 * scale, 76 * scale);
  ctx.restore();

  return canvas;
}

// 4K Ultra-Wide Logos (3840 x 1200)
console.log('Rendering 4K Ultra-Wide Light Master Logo (3840 x 1200)...');
const logoCanvasLight = renderLogoToCanvas4K(3840, 1200, false);
fs.writeFileSync(path.join(BRAND_DIR, 'sowebuild-logo-light.png'), logoCanvasLight.toBuffer('image/png'));

console.log('Rendering 4K Ultra-Wide Dark Inverted Master Logo (3840 x 1200)...');
const logoCanvasDark = renderLogoToCanvas4K(3840, 1200, true);
fs.writeFileSync(path.join(BRAND_DIR, 'sowebuild-logo-dark.png'), logoCanvasDark.toBuffer('image/png'));

// 4K Square Symbol Icon Master (3840 x 3840)
console.log('Rendering 4K Square Symbol Icon Master in Warm Ivory (3840 x 3840)...');
const symbolCanvas = createCanvas(3840, 3840);
{
  const ctx = symbolCanvas.getContext('2d');
  ctx.fillStyle = '#FAF8F5';
  ctx.fillRect(0, 0, 3840, 3840);

  // Elegant subtle radial glow
  const radial = ctx.createRadialGradient(1920, 1920, 100, 1920, 1920, 1800);
  radial.addColorStop(0, 'rgba(124, 58, 237, 0.18)');
  radial.addColorStop(0.5, 'rgba(198, 255, 61, 0.05)');
  radial.addColorStop(1, 'rgba(250, 248, 245, 0)');
  ctx.fillStyle = radial;
  ctx.fillRect(0, 0, 3840, 3840);

  // Border frame
  ctx.strokeStyle = '#E8DFF2';
  ctx.lineWidth = 16;
  ctx.strokeRect(120, 120, 3600, 3600);

  ctx.save();
  const scale = 3840 / 120; // 32x scale
  const markW = 40 * scale * 0.7;
  const markH = 60 * scale * 0.7;
  ctx.translate(1920 - markW / 2, 1920 - markH / 2);

  const sGrad = ctx.createLinearGradient(0, 0, markW, markH);
  sGrad.addColorStop(0, '#9333EA');
  sGrad.addColorStop(0.6, '#7C3AED');
  sGrad.addColorStop(1, '#6D28D9');

  ctx.shadowColor = 'rgba(124, 58, 237, 0.4)';
  ctx.shadowBlur = 80;
  ctx.fillStyle = sGrad;

  const scX = markW / 40;
  const scY = markH / 60;
  ctx.beginPath();
  ctx.moveTo(26 * scX, 2 * scY);
  ctx.lineTo(38 * scX, 2 * scY);
  ctx.lineTo(14 * scX, 58 * scY);
  ctx.lineTo(2 * scX, 58 * scY);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}
fs.writeFileSync(path.join(BRAND_DIR, 'sowebuild-symbol.png'), symbolCanvas.toBuffer('image/png'));
console.log('Wrote 4K PNG raster files.');

/* -------------------------------------------------------------------------- */
/* 3. Generate High-Definition Looping Animated GIF (960 x 540)               */
/* -------------------------------------------------------------------------- */

async function generateAnimatedGIF() {
  console.log('Rendering High-Definition Animated GIF in Ivory Violet (960 x 540)...');
  const width = 960;
  const height = 540;
  const totalFrames = 36;
  const fps = 18;

  const encoder = new GIFEncoder();
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  for (let i = 0; i < totalFrames; i++) {
    const t = i / totalFrames; // 0 to 1

    // Background Warm Ivory Canvas (#FAF8F5)
    ctx.fillStyle = '#FAF8F5';
    ctx.fillRect(0, 0, width, height);

    // Subtle dot grid
    ctx.fillStyle = 'rgba(22, 17, 36, 0.04)';
    for (let gx = 20; gx < width; gx += 40) {
      for (let gy = 20; gy < height; gy += 40) {
        ctx.fillRect(gx, gy, 1.5, 1.5);
      }
    }

    // Radial breathing violet glow
    const glowPulse = 0.12 + 0.08 * Math.sin(t * Math.PI * 2);
    const rad = ctx.createRadialGradient(width * 0.35, height * 0.5, 30, width * 0.35, height * 0.5, 380);
    rad.addColorStop(0, `rgba(124, 58, 237, ${glowPulse})`);
    rad.addColorStop(0.6, `rgba(109, 40, 217, ${glowPulse * 0.4})`);
    rad.addColorStop(1, 'rgba(250, 248, 245, 0)');
    ctx.fillStyle = rad;
    ctx.fillRect(0, 0, width, height);

    // Slash animation: entrance & light flare sweep
    const slashScale = 3.6;
    const slashX = width * 0.2;
    const slashY = height * 0.5 - (30 * slashScale);

    // Laser flare position moving across slash
    const sweepProgress = (t * 1.5) % 1;
    const flareY = sweepProgress * (60 * slashScale);

    ctx.save();
    ctx.translate(slashX, slashY);

    // Base slash gradient
    const polyGrad = ctx.createLinearGradient(0, 0, 40 * slashScale, 60 * slashScale);
    polyGrad.addColorStop(0, '#9333EA');
    polyGrad.addColorStop(0.6, '#7C3AED');
    polyGrad.addColorStop(1, '#6D28D9');

    ctx.shadowColor = 'rgba(124, 58, 237, 0.35)';
    ctx.shadowBlur = 24 + 10 * Math.sin(t * Math.PI * 2);
    ctx.fillStyle = polyGrad;

    ctx.beginPath();
    ctx.moveTo(26 * slashScale, 2 * slashScale);
    ctx.lineTo(38 * slashScale, 2 * slashScale);
    ctx.lineTo(14 * slashScale, 58 * slashScale);
    ctx.lineTo(2 * slashScale, 58 * slashScale);
    ctx.closePath();
    ctx.fill();

    // Specular flare highlight across the slash
    ctx.save();
    ctx.clip();
    const flareGrad = ctx.createLinearGradient(0, flareY - 45, 0, flareY + 45);
    flareGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
    flareGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.95)');
    flareGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = flareGrad;
    ctx.fillRect(0, flareY - 45, 40 * slashScale, 90);
    ctx.restore();

    ctx.restore();

    // Kinetic Typography "SO WE" and "BUILD.IN"
    const textFloatY = Math.sin(t * Math.PI * 2) * 3;

    ctx.save();
    ctx.translate(slashX + 175, slashY + 84 + textFloatY);

    // "SO WE"
    ctx.fillStyle = '#161124';
    ctx.font = '700 52px "Syne", system-ui, sans-serif';
    ctx.letterSpacing = '6px';
    ctx.fillText('SO WE', 0, 0);

    // "BUILD"
    ctx.font = '700 64px "Syne", system-ui, sans-serif';
    ctx.fillText('BUILD', 0, 68);

    // ".IN" with Royal Violet & Neon Spark accent
    const buildWidth = ctx.measureText('BUILD').width;
    ctx.fillStyle = '#7C3AED';
    ctx.shadowColor = 'rgba(124, 58, 237, 0.4)';
    ctx.shadowBlur = 14 + 6 * Math.cos(t * Math.PI * 2);
    ctx.fillText('.IN', buildWidth + 6, 68);

    // Neon Spark dot
    ctx.fillStyle = '#c6ff3d';
    ctx.shadowColor = 'rgba(198, 255, 61, 0.8)';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(buildWidth + 88, 56, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // Tech metadata subtitle
    ctx.font = '500 14px "JetBrains Mono", monospace';
    ctx.letterSpacing = '6px';
    ctx.fillStyle = '#5A5068';
    ctx.fillText('TECHNOLOGY STUDIO // SOWEBUILD.IN', slashX + 175, slashY + 188 + textFloatY);

    // Get RGBA pixel data
    const imgData = ctx.getImageData(0, 0, width, height);
    const palette = quantize(imgData.data, 256);
    const index = applyPalette(imgData.data, palette);

    encoder.writeFrame(index, width, height, {
      palette,
      delay: Math.round(1000 / fps),
      repeat: 0,
    });
  }

  encoder.finish();
  const buffer = encoder.bytes();
  fs.writeFileSync(path.join(BRAND_DIR, 'sowebuild-animated.gif'), Buffer.from(buffer));
  console.log('Saved sowebuild-animated.gif (', buffer.length, 'bytes).');
}

/* -------------------------------------------------------------------------- */
/* 4. Generate Animated 4K MP4 Video Intro (3840 x 2160 UHD @ 30 FPS)        */
/* -------------------------------------------------------------------------- */

async function generateAnimatedMP4() {
  console.log('Rendering 4K UHD Animated Video Intro in Ivory Violet (3840 x 2160 @ 30 FPS)...');
  const width = 3840;
  const height = 2160;
  const fps = 30;
  const totalFrames = 60; // 2.0s loop

  const encoder = await createH264MP4Encoder();
  encoder.width = width;
  encoder.height = height;
  encoder.frameRate = fps;
  encoder.kbps = 16000;
  encoder.speed = 10;
  encoder.initialize();

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  for (let i = 0; i < totalFrames; i++) {
    const t = i / totalFrames; // 0 to 1

    // Background Warm Ivory Canvas (#FAF8F5)
    ctx.fillStyle = '#FAF8F5';
    ctx.fillRect(0, 0, width, height);

    // 4K Subtle Grid
    ctx.fillStyle = 'rgba(22, 17, 36, 0.035)';
    for (let gx = 0; gx < width; gx += 96) {
      for (let gy = 0; gy < height; gy += 96) {
        ctx.fillRect(gx, gy, 3, 3);
      }
    }

    // Glowing energy aura in Royal Violet
    const pulse = 0.14 + 0.08 * Math.sin(t * Math.PI * 2);
    const rad = ctx.createRadialGradient(width * 0.32, height * 0.5, 80, width * 0.32, height * 0.5, 1200);
    rad.addColorStop(0, `rgba(124, 58, 237, ${pulse})`);
    rad.addColorStop(0.5, `rgba(198, 255, 61, ${pulse * 0.3})`);
    rad.addColorStop(1, 'rgba(250, 248, 245, 0)');
    ctx.fillStyle = rad;
    ctx.fillRect(0, 0, width, height);

    // Slash geometry scaled for 4K
    const slashScale = 14.4;
    const slashX = width * 0.2;
    const slashY = height * 0.5 - (30 * slashScale);

    // Flare sweep
    const sweepProgress = (t * 1.3) % 1;
    const flareY = sweepProgress * (60 * slashScale);

    ctx.save();
    ctx.translate(slashX, slashY);

    const polyGrad = ctx.createLinearGradient(0, 0, 40 * slashScale, 60 * slashScale);
    polyGrad.addColorStop(0, '#9333EA');
    polyGrad.addColorStop(0.6, '#7C3AED');
    polyGrad.addColorStop(1, '#6D28D9');

    ctx.shadowColor = 'rgba(124, 58, 237, 0.45)';
    ctx.shadowBlur = 80 + 30 * Math.sin(t * Math.PI * 2);
    ctx.fillStyle = polyGrad;

    ctx.beginPath();
    ctx.moveTo(26 * slashScale, 2 * slashScale);
    ctx.lineTo(38 * slashScale, 2 * slashScale);
    ctx.lineTo(14 * slashScale, 58 * slashScale);
    ctx.lineTo(2 * slashScale, 58 * slashScale);
    ctx.closePath();
    ctx.fill();

    // Specular highlight flare
    ctx.save();
    ctx.clip();
    const flareGrad = ctx.createLinearGradient(0, flareY - 180, 0, flareY + 180);
    flareGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
    flareGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.98)');
    flareGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = flareGrad;
    ctx.fillRect(0, flareY - 180, 40 * slashScale, 360);
    ctx.restore();

    ctx.restore();

    // Typography in 4K resolution
    const floatY = Math.sin(t * Math.PI * 2) * 12;
    ctx.save();
    ctx.translate(slashX + 700, slashY + 336 + floatY);

    // "SO WE"
    ctx.fillStyle = '#161124';
    ctx.font = '700 208px "Syne", system-ui, sans-serif';
    ctx.letterSpacing = '24px';
    ctx.fillText('SO WE', 0, 0);

    // "BUILD"
    ctx.font = '700 256px "Syne", system-ui, sans-serif';
    ctx.fillText('BUILD', 0, 272);

    // ".IN"
    const bMetrics = ctx.measureText('BUILD');
    ctx.fillStyle = '#7C3AED';
    ctx.shadowColor = 'rgba(124, 58, 237, 0.45)';
    ctx.shadowBlur = 48 + 20 * Math.sin(t * Math.PI * 2);
    ctx.fillText('.IN', bMetrics.width + 24, 272);

    // Neon Spark dot
    ctx.fillStyle = '#c6ff3d';
    ctx.shadowColor = 'rgba(198, 255, 61, 0.9)';
    ctx.shadowBlur = 36;
    ctx.beginPath();
    ctx.arc(bMetrics.width + 360, 220, 20, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // Subtitle Spec
    ctx.font = '500 56px "JetBrains Mono", monospace';
    ctx.letterSpacing = '24px';
    ctx.fillStyle = '#5A5068';
    ctx.fillText('STUDIO // SOWEBUILD.IN', slashX + 700, slashY + 750 + floatY);

    const imgData = ctx.getImageData(0, 0, width, height);
    encoder.addFrameRgba(imgData.data);
  }

  encoder.finalize();
  const mp4Bytes = encoder.FS.readFile(encoder.outputFilename);
  fs.writeFileSync(path.join(BRAND_DIR, 'sowebuild-animated.mp4'), Buffer.from(mp4Bytes));
  encoder.delete();
  console.log('Saved 4K sowebuild-animated.mp4 (', mp4Bytes.length, 'bytes).');
}

/* -------------------------------------------------------------------------- */
/* Execute Script                                                             */
/* -------------------------------------------------------------------------- */

async function main() {
  await generateAnimatedGIF();
  await generateAnimatedMP4();
  console.log('All brand assets successfully updated to Ivory Violet identity!');
}

main().catch(err => {
  console.error('Generation failed:', err);
  process.exit(1);
});
