import fs from 'fs';
import path from 'path';
import { createCanvas, GlobalFonts } from '@napi-rs/canvas';
import gifencPkg from 'gifenc';
const { GIFEncoder, quantize, applyPalette } = gifencPkg;
import H264EncoderPkg from 'h264-mp4-encoder';

const { createH264MP4Encoder } = H264EncoderPkg;

const BRAND_DIR = path.resolve('public', 'brand');
fs.mkdirSync(BRAND_DIR, { recursive: true });

// Register Google Fonts
const fontSpaceGrotesk = path.resolve('scripts', 'fonts', 'SpaceGrotesk.ttf');
const fontManrope = path.resolve('scripts', 'fonts', 'Manrope.ttf');
const fontMono = path.resolve('scripts', 'fonts', 'JetBrainsMono.ttf');

if (fs.existsSync(fontSpaceGrotesk)) {
  GlobalFonts.registerFromPath(fontSpaceGrotesk, 'Space Grotesk');
}
if (fs.existsSync(fontManrope)) {
  GlobalFonts.registerFromPath(fontManrope, 'Manrope');
}
if (fs.existsSync(fontMono)) {
  GlobalFonts.registerFromPath(fontMono, 'JetBrains Mono');
}

console.log('Registered fonts successfully.');

/* -------------------------------------------------------------------------- */
/* 1. Generate Vector SVGs                                                    */
/* -------------------------------------------------------------------------- */

const SVG_SYMBOL = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 60" fill="none">
  <polygon points="26,2 38,2 14,58 2,58" fill="url(#violetGlow)" />
  <defs>
    <linearGradient id="violetGlow" x1="2" y1="2" x2="38" y2="58" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#E870FD" />
      <stop offset="45%" stop-color="#BC37ED" />
      <stop offset="100%" stop-color="#7C3AED" />
    </linearGradient>
  </defs>
</svg>`;

const SVG_SYMBOL_GLOW = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
  <rect width="120" height="120" rx="28" fill="#120F1D" />
  <rect width="120" height="120" rx="28" stroke="rgba(255,255,255,0.08)" stroke-width="1.5" />
  <circle cx="60" cy="60" r="38" fill="url(#aura)" opacity="0.65" filter="blur(16px)" />
  <g transform="translate(40, 30)">
    <polygon points="26,2 38,2 14,58 2,58" fill="url(#symbolGrad)" filter="drop-shadow(0 0 12px rgba(188,55,237,0.7))" />
  </g>
  <defs>
    <radialGradient id="aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#E870FD" stop-opacity="0.9" />
      <stop offset="60%" stop-color="#BC37ED" stop-opacity="0.5" />
      <stop offset="100%" stop-color="#120F1D" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="symbolGrad" x1="2" y1="2" x2="38" y2="58" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="35%" stop-color="#E870FD" />
      <stop offset="100%" stop-color="#BC37ED" />
    </linearGradient>
  </defs>
</svg>`;

const SVG_LOGO_DARK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 80" fill="none">
  <!-- Symbol -->
  <g transform="translate(20, 10)">
    <polygon points="26,2 38,2 14,58 2,58" fill="url(#violetGlowDark)" filter="drop-shadow(0 0 8px rgba(232,112,253,0.45))" />
  </g>
  <!-- Wordmark -->
  <text x="74" y="34" font-family="'Space Grotesk', system-ui, sans-serif" font-weight="700" font-size="20" letter-spacing="0.14em" fill="#F8F7FA">SO WE</text>
  <text x="74" y="60" font-family="'Space Grotesk', system-ui, sans-serif" font-weight="700" font-size="24" letter-spacing="0.14em" fill="#F8F7FA">
    BUILD<tspan fill="#E870FD">.IN</tspan>
  </text>
  <defs>
    <linearGradient id="violetGlowDark" x1="2" y1="2" x2="38" y2="58" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="40%" stop-color="#E870FD" />
      <stop offset="100%" stop-color="#BC37ED" />
    </linearGradient>
  </defs>
</svg>`;

const SVG_LOGO_LIGHT = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 80" fill="none">
  <!-- Symbol -->
  <g transform="translate(20, 10)">
    <polygon points="26,2 38,2 14,58 2,58" fill="url(#violetGlowLight)" />
  </g>
  <!-- Wordmark -->
  <text x="74" y="34" font-family="'Space Grotesk', system-ui, sans-serif" font-weight="700" font-size="20" letter-spacing="0.14em" fill="#0F172A">SO WE</text>
  <text x="74" y="60" font-family="'Space Grotesk', system-ui, sans-serif" font-weight="700" font-size="24" letter-spacing="0.14em" fill="#0F172A">
    BUILD<tspan fill="#9333EA">.IN</tspan>
  </text>
  <defs>
    <linearGradient id="violetGlowLight" x1="2" y1="2" x2="38" y2="58" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#A855F7" />
      <stop offset="60%" stop-color="#7E22CE" />
      <stop offset="100%" stop-color="#581C87" />
    </linearGradient>
  </defs>
</svg>`;

const SVG_LOGO_STACKED = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none">
  <rect width="200" height="200" rx="36" fill="#120F1D" />
  <rect width="200" height="200" rx="36" stroke="rgba(255,255,255,0.08)" stroke-width="1.5" />
  <circle cx="100" cy="80" r="45" fill="#BC37ED" opacity="0.25" filter="blur(24px)" />
  <!-- Symbol Center -->
  <g transform="translate(80, 42)">
    <polygon points="26,2 38,2 14,58 2,58" fill="url(#violetStacked)" filter="drop-shadow(0 0 12px rgba(188,55,237,0.6))" />
  </g>
  <!-- Centered Typography -->
  <text x="100" y="138" text-anchor="middle" font-family="'Space Grotesk', system-ui, sans-serif" font-weight="700" font-size="14" letter-spacing="0.22em" fill="#F8F7FA">SO WE</text>
  <text x="100" y="162" text-anchor="middle" font-family="'Space Grotesk', system-ui, sans-serif" font-weight="700" font-size="18" letter-spacing="0.18em" fill="#F8F7FA">
    BUILD<tspan fill="#E870FD">.IN</tspan>
  </text>
  <defs>
    <linearGradient id="violetStacked" x1="2" y1="2" x2="38" y2="58" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="45%" stop-color="#E870FD" />
      <stop offset="100%" stop-color="#BC37ED" />
    </linearGradient>
  </defs>
</svg>`;

fs.writeFileSync(path.join(BRAND_DIR, 'sowebuild-symbol.svg'), SVG_SYMBOL);
fs.writeFileSync(path.join(BRAND_DIR, 'sowebuild-symbol-glow.svg'), SVG_SYMBOL_GLOW);
fs.writeFileSync(path.join(BRAND_DIR, 'sowebuild-logo-dark.svg'), SVG_LOGO_DARK);
fs.writeFileSync(path.join(BRAND_DIR, 'sowebuild-logo-light.svg'), SVG_LOGO_LIGHT);
fs.writeFileSync(path.join(BRAND_DIR, 'sowebuild-logo-stacked.svg'), SVG_LOGO_STACKED);

console.log('Wrote all 5 vector SVG files.');

/* -------------------------------------------------------------------------- */
/* 2. Generate High-Res PNGs                                                  */
/* -------------------------------------------------------------------------- */

function renderLogoToCanvas(width, height, isDark = true) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  if (isDark) {
    ctx.fillStyle = '#120F1D';
    ctx.fillRect(0, 0, width, height);

    // Subtle ambient glow
    const radial = ctx.createRadialGradient(width * 0.18, height * 0.5, 10, width * 0.18, height * 0.5, height * 0.8);
    radial.addColorStop(0, 'rgba(188, 55, 237, 0.25)');
    radial.addColorStop(1, 'rgba(18, 15, 29, 0)');
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
    sGrad.addColorStop(0, '#FFFFFF');
    sGrad.addColorStop(0.4, '#E870FD');
    sGrad.addColorStop(1, '#BC37ED');
    ctx.shadowColor = 'rgba(232, 112, 253, 0.6)';
    ctx.shadowBlur = 18 * scale;
  } else {
    sGrad.addColorStop(0, '#A855F7');
    sGrad.addColorStop(0.6, '#7E22CE');
    sGrad.addColorStop(1, '#581C87');
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

  // Draw Typography
  ctx.save();
  ctx.fillStyle = isDark ? '#F8F7FA' : '#0F172A';
  ctx.font = `700 ${22 * scale}px "Space Grotesk", system-ui, sans-serif`;
  ctx.letterSpacing = `${2 * scale}px`;
  ctx.fillText('SO WE', 95 * scale, 46 * scale);

  ctx.font = `700 ${26 * scale}px "Space Grotesk", system-ui, sans-serif`;
  ctx.fillText('BUILD', 95 * scale, 76 * scale);

  const buildMetrics = ctx.measureText('BUILD');
  ctx.fillStyle = isDark ? '#E870FD' : '#9333EA';
  if (isDark) {
    ctx.shadowColor = 'rgba(232, 112, 253, 0.7)';
    ctx.shadowBlur = 12 * scale;
  }
  ctx.fillText('.IN', 95 * scale + buildMetrics.width + 1 * scale, 76 * scale);
  ctx.restore();

  return canvas;
}

const logoCanvasDark = renderLogoToCanvas(1280, 400, true);
fs.writeFileSync(path.join(BRAND_DIR, 'sowebuild-logo-dark.png'), logoCanvasDark.toBuffer('image/png'));

const symbolCanvas = createCanvas(800, 800);
{
  const ctx = symbolCanvas.getContext('2d');
  ctx.fillStyle = '#120F1D';
  ctx.fillRect(0, 0, 800, 800);

  const radial = ctx.createRadialGradient(400, 400, 40, 400, 400, 360);
  radial.addColorStop(0, 'rgba(188, 55, 237, 0.45)');
  radial.addColorStop(0.5, 'rgba(124, 58, 237, 0.2)');
  radial.addColorStop(1, 'rgba(18, 15, 29, 0)');
  ctx.fillStyle = radial;
  ctx.fillRect(0, 0, 800, 800);

  ctx.save();
  ctx.translate(400 - (40 * 6) / 2, 400 - (60 * 6) / 2);
  const sGrad = ctx.createLinearGradient(0, 0, 40 * 6, 60 * 6);
  sGrad.addColorStop(0, '#FFFFFF');
  sGrad.addColorStop(0.4, '#E870FD');
  sGrad.addColorStop(1, '#BC37ED');
  ctx.shadowColor = 'rgba(232, 112, 253, 0.8)';
  ctx.shadowBlur = 40;
  ctx.fillStyle = sGrad;

  ctx.beginPath();
  ctx.moveTo(26 * 6, 2 * 6);
  ctx.lineTo(38 * 6, 2 * 6);
  ctx.lineTo(14 * 6, 58 * 6);
  ctx.lineTo(2 * 6, 58 * 6);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}
fs.writeFileSync(path.join(BRAND_DIR, 'sowebuild-symbol.png'), symbolCanvas.toBuffer('image/png'));
console.log('Wrote PNG raster files.');

/* -------------------------------------------------------------------------- */
/* 3. Generate Looping Animated GIF via pure code                             */
/* -------------------------------------------------------------------------- */

async function generateAnimatedGIF() {
  console.log('Rendering Animated GIF frames...');
  const width = 640;
  const height = 360;
  const totalFrames = 36;
  const fps = 18;

  const encoder = new GIFEncoder();
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  for (let i = 0; i < totalFrames; i++) {
    const t = i / totalFrames; // 0 to 1

    // Background Void
    ctx.fillStyle = '#120F1D';
    ctx.fillRect(0, 0, width, height);

    // Subtle grid dots in background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    for (let gx = 20; gx < width; gx += 40) {
      for (let gy = 20; gy < height; gy += 40) {
        ctx.fillRect(gx, gy, 1.5, 1.5);
      }
    }

    // Radial breathing violet glow
    const glowPulse = 0.35 + 0.2 * Math.sin(t * Math.PI * 2);
    const rad = ctx.createRadialGradient(220, 180, 20, 220, 180, 260);
    rad.addColorStop(0, `rgba(232, 112, 253, ${glowPulse})`);
    rad.addColorStop(0.5, `rgba(188, 55, 237, ${glowPulse * 0.6})`);
    rad.addColorStop(1, 'rgba(18, 15, 29, 0)');
    ctx.fillStyle = rad;
    ctx.fillRect(0, 0, width, height);

    // Slash animation: entrance & light flare sweep
    const slashScale = 2.4;
    const slashX = 140;
    const slashY = 110;

    // Laser flare position moving across slash
    const sweepProgress = (t * 1.5) % 1;
    const flareY = sweepProgress * (60 * slashScale);

    ctx.save();
    ctx.translate(slashX, slashY);

    // Base slash gradient
    const polyGrad = ctx.createLinearGradient(0, 0, 40 * slashScale, 60 * slashScale);
    polyGrad.addColorStop(0, '#FFFFFF');
    polyGrad.addColorStop(0.4, '#E870FD');
    polyGrad.addColorStop(1, '#BC37ED');

    ctx.shadowColor = 'rgba(232, 112, 253, 0.8)';
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
    const flareGrad = ctx.createLinearGradient(0, flareY - 30, 0, flareY + 30);
    flareGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
    flareGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.95)');
    flareGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = flareGrad;
    ctx.fillRect(0, flareY - 30, 40 * slashScale, 60);
    ctx.restore();

    ctx.restore();

    // Kinetic Typography "SO WE" and "BUILD.IN"
    const textFloatY = Math.sin(t * Math.PI * 2) * 2;

    ctx.save();
    ctx.translate(slashX + 115, slashY + 54 + textFloatY);

    // "SO WE"
    ctx.fillStyle = '#F8F7FA';
    ctx.font = '700 36px "Space Grotesk", system-ui, sans-serif';
    ctx.letterSpacing = '5px';
    ctx.fillText('SO WE', 0, 0);

    // "BUILD"
    ctx.font = '700 44px "Space Grotesk", system-ui, sans-serif';
    ctx.fillText('BUILD', 0, 46);

    // ".IN" with pulsing neon bloom
    const buildWidth = ctx.measureText('BUILD').width;
    ctx.fillStyle = '#E870FD';
    ctx.shadowColor = 'rgba(232, 112, 253, 0.85)';
    ctx.shadowBlur = 16 + 8 * Math.cos(t * Math.PI * 2);
    ctx.fillText('.IN', buildWidth + 4, 46);

    ctx.restore();

    // Tech metadata subtitle
    ctx.font = '500 11px "JetBrains Mono", monospace';
    ctx.letterSpacing = '4px';
    ctx.fillStyle = 'rgba(159, 160, 172, 0.7)';
    ctx.fillText('TECHNOLOGY STUDIO // SOWEBUILD.IN', slashX + 115, slashY + 130 + textFloatY);

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
/* 4. Generate Animated MP4 via pure code (H.264 WASM Encoder)                */
/* -------------------------------------------------------------------------- */

async function generateAnimatedMP4() {
  console.log('Rendering Animated MP4 frames...');
  const width = 960;
  const height = 540;
  const fps = 30;
  const totalFrames = 90; // 3.0 seconds loop

  const encoder = await createH264MP4Encoder();
  encoder.width = width;
  encoder.height = height;
  encoder.frameRate = fps;
  encoder.kbps = 4500;
  encoder.speed = 0; // highest quality
  encoder.quantizationParameter = 18;
  encoder.initialize();

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  for (let i = 0; i < totalFrames; i++) {
    const t = i / totalFrames; // 0 to 1

    // Background Void
    ctx.fillStyle = '#120F1D';
    ctx.fillRect(0, 0, width, height);

    // Cyber Grid
    ctx.fillStyle = 'rgba(255, 255, 255, 0.035)';
    for (let gx = 0; gx < width; gx += 48) {
      for (let gy = 0; gy < height; gy += 48) {
        ctx.fillRect(gx, gy, 1.5, 1.5);
      }
    }

    // Glowing energy aura
    const pulse = 0.4 + 0.25 * Math.sin(t * Math.PI * 2);
    const rad = ctx.createRadialGradient(width * 0.32, height * 0.5, 40, width * 0.32, height * 0.5, 380);
    rad.addColorStop(0, `rgba(232, 112, 253, ${pulse})`);
    rad.addColorStop(0.45, `rgba(188, 55, 237, ${pulse * 0.65})`);
    rad.addColorStop(1, 'rgba(18, 15, 29, 0)');
    ctx.fillStyle = rad;
    ctx.fillRect(0, width, height); // clear

    // Redraw rect
    ctx.fillStyle = '#120F1D';
    ctx.fillRect(0, 0, width, height);

    // Cyber Grid
    ctx.fillStyle = 'rgba(255, 255, 255, 0.035)';
    for (let gx = 0; gx < width; gx += 48) {
      for (let gy = 0; gy < height; gy += 48) {
        ctx.fillRect(gx, gy, 1.5, 1.5);
      }
    }

    ctx.fillStyle = rad;
    ctx.fillRect(0, 0, width, height);

    // Slash geometry
    const slashScale = 3.6;
    const slashX = width * 0.2;
    const slashY = height * 0.5 - (30 * slashScale);

    // Flare sweep
    const sweepProgress = (t * 1.3) % 1;
    const flareY = sweepProgress * (60 * slashScale);

    ctx.save();
    ctx.translate(slashX, slashY);

    const polyGrad = ctx.createLinearGradient(0, 0, 40 * slashScale, 60 * slashScale);
    polyGrad.addColorStop(0, '#FFFFFF');
    polyGrad.addColorStop(0.35, '#E870FD');
    polyGrad.addColorStop(1, '#BC37ED');

    ctx.shadowColor = 'rgba(232, 112, 253, 0.85)';
    ctx.shadowBlur = 35 + 15 * Math.sin(t * Math.PI * 2);
    ctx.fillStyle = polyGrad;

    ctx.beginPath();
    ctx.moveTo(26 * slashScale, 2 * slashScale);
    ctx.lineTo(38 * slashScale, 2 * slashScale);
    ctx.lineTo(14 * slashScale, 58 * slashScale);
    ctx.lineTo(2 * slashScale, 58 * slashScale);
    ctx.closePath();
    ctx.fill();

    // Specular highlight
    ctx.save();
    ctx.clip();
    const flareGrad = ctx.createLinearGradient(0, flareY - 45, 0, flareY + 45);
    flareGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
    flareGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.98)');
    flareGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = flareGrad;
    ctx.fillRect(0, flareY - 45, 40 * slashScale, 90);
    ctx.restore();

    ctx.restore();

    // Typography
    const floatY = Math.sin(t * Math.PI * 2) * 3;
    ctx.save();
    ctx.translate(slashX + 175, slashY + 84 + floatY);

    // "SO WE"
    ctx.fillStyle = '#F8F7FA';
    ctx.font = '700 52px "Space Grotesk", system-ui, sans-serif';
    ctx.letterSpacing = '6px';
    ctx.fillText('SO WE', 0, 0);

    // "BUILD"
    ctx.font = '700 64px "Space Grotesk", system-ui, sans-serif';
    ctx.fillText('BUILD', 0, 68);

    // ".IN"
    const bMetrics = ctx.measureText('BUILD');
    ctx.fillStyle = '#E870FD';
    ctx.shadowColor = 'rgba(232, 112, 253, 0.9)';
    ctx.shadowBlur = 25 + 10 * Math.sin(t * Math.PI * 2);
    ctx.fillText('.IN', bMetrics.width + 6, 68);

    ctx.restore();

    // Subtitle Spec
    ctx.font = '500 14px "JetBrains Mono", monospace';
    ctx.letterSpacing = '6px';
    ctx.fillStyle = 'rgba(159, 160, 172, 0.75)';
    ctx.fillText('STUDIO // SOWEBUILD.IN', slashX + 175, slashY + 188 + floatY);

    // Subtle laser beam scanline
    const scanY = ((t * 1.5) % 1) * height;
    const scanGrad = ctx.createLinearGradient(0, scanY - 2, 0, scanY + 2);
    scanGrad.addColorStop(0, 'rgba(232, 112, 253, 0)');
    scanGrad.addColorStop(0.5, 'rgba(232, 112, 253, 0.25)');
    scanGrad.addColorStop(1, 'rgba(232, 112, 253, 0)');
    ctx.fillStyle = scanGrad;
    ctx.fillRect(0, scanY - 2, width, 4);

    const imgData = ctx.getImageData(0, 0, width, height);
    encoder.addFrameRgba(imgData.data);
  }

  encoder.finalize();
  const mp4Bytes = encoder.FS.readFile(encoder.outputFilename);
  fs.writeFileSync(path.join(BRAND_DIR, 'sowebuild-animated.mp4'), Buffer.from(mp4Bytes));
  encoder.delete();
  console.log('Saved sowebuild-animated.mp4 (', mp4Bytes.length, 'bytes).');
}

/* -------------------------------------------------------------------------- */
/* Execute Script                                                             */
/* -------------------------------------------------------------------------- */

async function main() {
  await generateAnimatedGIF();
  await generateAnimatedMP4();
  console.log('All brand assets successfully generated via 100% code!');
}

main().catch(err => {
  console.error('Generation failed:', err);
  process.exit(1);
});
