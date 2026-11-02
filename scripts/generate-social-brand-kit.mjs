import fs from 'fs';
import path from 'path';
import { createCanvas, GlobalFonts } from '@napi-rs/canvas';

const BRAND_DIRS = [
  path.resolve('public', 'brand'),
  path.resolve('swb-social', 'brand'),
  path.resolve('d:/Progency/swb-social/brand')
];

// Ensure all output directories exist
BRAND_DIRS.forEach(dir => {
  try {
    fs.mkdirSync(dir, { recursive: true });
  } catch (err) {
    // ignore
  }
});

// Register Fonts
const fontSpaceGrotesk = path.resolve('scripts', 'fonts', 'SpaceGrotesk.ttf');
const fontManrope = path.resolve('scripts', 'fonts', 'Manrope.ttf');
const fontMono = path.resolve('scripts', 'fonts', 'JetBrainsMono.ttf');

if (fs.existsSync(fontSpaceGrotesk)) GlobalFonts.registerFromPath(fontSpaceGrotesk, 'Space Grotesk');
if (fs.existsSync(fontManrope)) GlobalFonts.registerFromPath(fontManrope, 'Manrope');
if (fs.existsSync(fontMono)) GlobalFonts.registerFromPath(fontMono, 'JetBrains Mono');

function saveToAll(filename, buffer) {
  BRAND_DIRS.forEach(dir => {
    try {
      if (fs.existsSync(dir)) {
        fs.writeFileSync(path.join(dir, filename), buffer);
      }
    } catch (err) {
      // ignore
    }
  });
  console.log(`  [✓] Generated & Saved in 4K: ${filename}`);
}

function roundRect(ctx, x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/**
 * Draw the signature SoWeBuild Slash Symbol
 * Polygon: (26,2), (38,2), (14,58), (2,58) in a 40x60 coordinate box
 */
function drawSlashSymbol(ctx, x, y, width, height, options = {}) {
  const {
    isDark = true,
    glow = true,
    glowBlur = 36,
    glowColor = 'rgba(232, 112, 253, 0.85)',
    gradientStops = null
  } = options;

  ctx.save();
  ctx.translate(x, y);

  const scaleX = width / 40;
  const scaleY = height / 60;

  const grad = ctx.createLinearGradient(0, 0, width, height);
  if (gradientStops && gradientStops.length) {
    gradientStops.forEach(st => grad.addColorStop(st.offset, st.color));
  } else if (isDark) {
    grad.addColorStop(0, '#FFFFFF');
    grad.addColorStop(0.35, '#E870FD');
    grad.addColorStop(0.75, '#BC37ED');
    grad.addColorStop(1, '#7C3AED');
  } else {
    grad.addColorStop(0, '#A855F7');
    grad.addColorStop(0.5, '#7E22CE');
    grad.addColorStop(1, '#581C87');
  }

  if (glow) {
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = glowBlur;
  }

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.moveTo(26 * scaleX, 2 * scaleY);
  ctx.lineTo(38 * scaleX, 2 * scaleY);
  ctx.lineTo(14 * scaleX, 58 * scaleY);
  ctx.lineTo(2 * scaleX, 58 * scaleY);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

console.log('\n==============================================');
console.log('🎨 Generating Official Social Media Brand Kit in 4K Quality');
console.log('==============================================\n');

/* -------------------------------------------------------------------------- */
/* 1. Profile Picture: Glow Avatar (2160 x 2160 UHD Master)                  */
/* -------------------------------------------------------------------------- */
{
  const size = 2160;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Background - Deep cyber obsidian
  ctx.fillStyle = '#08090C';
  ctx.fillRect(0, 0, size, size);

  // Deep ambient violet/cyan radial aura
  const aura = ctx.createRadialGradient(size / 2, size / 2, 80, size / 2, size / 2, 960);
  aura.addColorStop(0, 'rgba(232, 112, 253, 0.48)');
  aura.addColorStop(0.4, 'rgba(188, 55, 237, 0.28)');
  aura.addColorStop(0.75, 'rgba(124, 58, 237, 0.12)');
  aura.addColorStop(1, 'rgba(8, 9, 12, 0)');
  ctx.fillStyle = aura;
  ctx.fillRect(0, 0, size, size);

  // Subtle cyan counter-glow in bottom-left
  const cyanGlow = ctx.createRadialGradient(size * 0.26, size * 0.74, 40, size * 0.26, size * 0.74, 640);
  cyanGlow.addColorStop(0, 'rgba(0, 240, 255, 0.12)');
  cyanGlow.addColorStop(1, 'rgba(8, 9, 12, 0)');
  ctx.fillStyle = cyanGlow;
  ctx.fillRect(0, 0, size, size);

  // Subtle circular framing guide (safe zone for circular crop)
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, 980, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Draw Glowing Symbol - 640 x 960 px in 4K
  const symW = 640;
  const symH = 960;
  drawSlashSymbol(ctx, size / 2 - symW / 2, size / 2 - symH / 2, symW, symH, {
    isDark: true,
    glow: true,
    glowBlur: 120,
    glowColor: 'rgba(232, 112, 253, 0.95)'
  });

  saveToAll('sowebuild-avatar-glow.png', canvas.toBuffer('image/png'));
}

/* -------------------------------------------------------------------------- */
/* 2. Profile Picture: Stacked Brand Avatar (2160 x 2160 UHD Master)          */
/* -------------------------------------------------------------------------- */
{
  const size = 2160;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#0B0D13';
  ctx.fillRect(0, 0, size, size);

  // Radial Glow behind symbol
  const radial = ctx.createRadialGradient(size / 2, 840, 40, size / 2, 840, 760);
  radial.addColorStop(0, 'rgba(188, 55, 237, 0.38)');
  radial.addColorStop(0.6, 'rgba(124, 58, 237, 0.14)');
  radial.addColorStop(1, 'rgba(11, 13, 19, 0)');
  ctx.fillStyle = radial;
  ctx.fillRect(0, 0, size, size);

  // Draw Symbol
  const symW = 400;
  const symH = 600;
  drawSlashSymbol(ctx, size / 2 - symW / 2, 480, symW, symH, {
    isDark: true,
    glow: true,
    glowBlur: 90,
    glowColor: 'rgba(232, 112, 253, 0.85)'
  });

  // Typography in 4K
  ctx.save();
  ctx.textAlign = 'center';
  ctx.fillStyle = '#F8F7FA';
  ctx.font = '700 152px "Space Grotesk", sans-serif';
  ctx.letterSpacing = '24px';
  ctx.fillText('SO WE', size / 2, 1360);

  ctx.font = '800 204px "Space Grotesk", sans-serif';
  ctx.letterSpacing = '16px';

  // Measure to color .IN
  const buildText = 'BUILD';
  const inText = '.IN';
  ctx.font = '800 204px "Space Grotesk", sans-serif';
  const buildW = ctx.measureText(buildText).width;
  const inW = ctx.measureText(inText).width;
  const totalW = buildW + inW;
  const startX = size / 2 - totalW / 2;

  ctx.textAlign = 'left';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(buildText, startX, 1600);

  ctx.fillStyle = '#E870FD';
  ctx.shadowColor = 'rgba(232, 112, 253, 0.85)';
  ctx.shadowBlur = 48;
  ctx.fillText(inText, startX + buildW, 1600);
  ctx.restore();

  // Subtle Tagline at bottom
  ctx.save();
  ctx.textAlign = 'center';
  ctx.font = '600 60px "Manrope", sans-serif';
  ctx.fillStyle = '#94A3B8';
  ctx.letterSpacing = '8px';
  ctx.fillText('TECHNOLOGY PARTNER', size / 2, 1760);
  ctx.restore();

  saveToAll('sowebuild-avatar-stacked.png', canvas.toBuffer('image/png'));
}

/* -------------------------------------------------------------------------- */
/* 3. Profile Picture: Minimal High-Contrast (2160 x 2160 UHD Master)         */
/* -------------------------------------------------------------------------- */
{
  const size = 2160;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#050608';
  ctx.fillRect(0, 0, size, size);

  const symW = 680;
  const symH = 1020;
  drawSlashSymbol(ctx, size / 2 - symW / 2, size / 2 - symH / 2, symW, symH, {
    isDark: true,
    glow: true,
    glowBlur: 40,
    glowColor: 'rgba(232, 112, 253, 0.65)'
  });

  saveToAll('sowebuild-avatar-minimal.png', canvas.toBuffer('image/png'));
}

/* -------------------------------------------------------------------------- */
/* 4. Profile Picture: Transparent High-Res PNG (2160 x 2160 UHD Master)      */
/* -------------------------------------------------------------------------- */
{
  const size = 2160;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  const symW = 760;
  const symH = 1140;
  drawSlashSymbol(ctx, size / 2 - symW / 2, size / 2 - symH / 2, symW, symH, {
    isDark: true,
    glow: true,
    glowBlur: 80,
    glowColor: 'rgba(232, 112, 253, 0.9)'
  });

  saveToAll('sowebuild-avatar-transparent.png', canvas.toBuffer('image/png'));
}

/* -------------------------------------------------------------------------- */
/* 5. Profile Picture: Light Mode Avatar (2160 x 2160 Master)                 */
/* -------------------------------------------------------------------------- */
{
  const size = 2160;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, size, size);

  const symW = 680;
  const symH = 1020;
  drawSlashSymbol(ctx, size / 2 - symW / 2, size / 2 - symH / 2, symW, symH, {
    isDark: false,
    glow: false
  });

  saveToAll('sowebuild-avatar-white.png', canvas.toBuffer('image/png'));
}

function drawVectorIcon(ctx, iconName, x, y, size = 36, color = '#FFFFFF', strokeWidth = 4) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = strokeWidth;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  if (iconName === 'bolt') {
    ctx.beginPath();
    ctx.moveTo(x + size * 0.1, y - size * 0.45);
    ctx.lineTo(x - size * 0.35, y + size * 0.05);
    ctx.lineTo(x, y + size * 0.05);
    ctx.lineTo(x - size * 0.1, y + size * 0.45);
    ctx.lineTo(x + size * 0.35, y - size * 0.05);
    ctx.lineTo(x, y - size * 0.05);
    ctx.closePath();
    ctx.fill();
  } else if (iconName === 'phone') {
    const pw = size * 0.28;
    const ph = size * 0.45;
    roundRect(ctx, x - pw, y - ph, pw * 2, ph * 2, 8);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y + ph - 8, 3, 0, Math.PI * 2);
    ctx.fill();
  } else if (iconName === 'chip') {
    const s = size * 0.35;
    roundRect(ctx, x - s, y - s, s * 2, s * 2, 6);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x - s, y - s * 0.4); ctx.lineTo(x - s - 8, y - s * 0.4);
    ctx.moveTo(x - s, y + s * 0.4); ctx.lineTo(x - s - 8, y + s * 0.4);
    ctx.moveTo(x + s, y - s * 0.4); ctx.lineTo(x + s + 8, y - s * 0.4);
    ctx.moveTo(x + s, y + s * 0.4); ctx.lineTo(x + s + 8, y + s * 0.4);
    ctx.stroke();
  }
  ctx.restore();
}

/* -------------------------------------------------------------------------- */
/* 6. LinkedIn Company Banner (3168 x 792 - 2x 4K Master)                     */
/* -------------------------------------------------------------------------- */
{
  const width = 3168;
  const height = 792;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#08090C';
  ctx.fillRect(0, 0, width, height);

  // Ambient glows
  const grad1 = ctx.createRadialGradient(480, height / 2, 40, 480, height / 2, 900);
  grad1.addColorStop(0, 'rgba(188, 55, 237, 0.26)');
  grad1.addColorStop(1, 'rgba(8, 9, 12, 0)');
  ctx.fillStyle = grad1;
  ctx.fillRect(0, 0, width, height);

  const grad2 = ctx.createRadialGradient(width - 400, height / 2, 40, width - 400, height / 2, 800);
  grad2.addColorStop(0, 'rgba(0, 240, 255, 0.14)');
  grad2.addColorStop(1, 'rgba(8, 9, 12, 0)');
  ctx.fillStyle = grad2;
  ctx.fillRect(0, 0, width, height);

  // Subtle grid lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
  ctx.lineWidth = 2;
  for (let x = 0; x < width; x += 120) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  // Border frame
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 4;
  roundRect(ctx, 32, 32, width - 64, height - 64, 32);
  ctx.stroke();

  // Left Brand Lockup (Starting at x: 160)
  const symW = 152;
  const symH = 228;
  drawSlashSymbol(ctx, 160, (height - symH) / 2, symW, symH, {
    isDark: true,
    glow: true,
    glowBlur: 48,
    glowColor: 'rgba(232, 112, 253, 0.85)'
  });

  ctx.save();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 88px "Space Grotesk", sans-serif';
  ctx.letterSpacing = '8px';
  ctx.fillText('SO WE', 370, height / 2 - 24);

  ctx.font = '800 108px "Space Grotesk", sans-serif';
  ctx.fillText('BUILD', 370, height / 2 + 100);

  const bMetrics = ctx.measureText('BUILD');
  ctx.fillStyle = '#E870FD';
  ctx.shadowColor = 'rgba(232, 112, 253, 0.85)';
  ctx.shadowBlur = 32;
  ctx.fillText('.IN', 370 + bMetrics.width + 8, height / 2 + 100);
  ctx.restore();

  // Divider line
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(980, 130);
  ctx.lineTo(980, height - 130);
  ctx.stroke();

  // Right Value Proposition & Capabilities
  ctx.save();
  ctx.font = '800 64px "Space Grotesk", sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText('You have a problem. We build the solution.', 1060, 260);

  ctx.font = '500 40px "Manrope", sans-serif';
  ctx.fillStyle = '#94A3B8';
  ctx.fillText('Done-for-you technology partner · Turnkey delivery · Zero tech stress.', 1060, 350);

  // 3 Capability Badges with vector icons in 4K
  const badges = [
    { text: 'Bespoke Websites & Web Apps', icon: 'bolt', col: '#BC37ED' },
    { text: '24/7 AI Assistants', icon: 'chip', col: '#00F0FF' },
    { text: 'WhatsApp Lead Pipelines', icon: 'phone', col: '#10B981' }
  ];

  let bX = 1060;
  const bY = 440;
  ctx.font = '700 32px "Space Grotesk", sans-serif';

  badges.forEach(b => {
    const tW = ctx.measureText(b.text).width;
    const padL = 80;
    const padR = 40;
    const pW = tW + padL + padR;
    const pH = 88;

    ctx.fillStyle = '#0F131D';
    roundRect(ctx, bX, bY, pW, pH, 44);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 2.4;
    ctx.stroke();

    drawVectorIcon(ctx, b.icon, bX + 44, bY + 44, 36, b.col);

    ctx.fillStyle = b.col;
    ctx.fillText(b.text, bX + padL, bY + 56);

    bX += pW + 32;
  });

  // Website & CTA at bottom right
  ctx.textAlign = 'right';
  ctx.font = '700 40px "Space Grotesk", sans-serif';
  ctx.fillStyle = '#E870FD';
  ctx.fillText('sowebuild.in  →', width - 140, height - 110);
  ctx.restore();

  saveToAll('sowebuild-banner-linkedin.png', canvas.toBuffer('image/png'));
}

/* -------------------------------------------------------------------------- */
/* 7. Twitter / X Header Banner (3000 x 1000 - 2x 4K Master)                  */
/* -------------------------------------------------------------------------- */
{
  const width = 3000;
  const height = 1000;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#08090C';
  ctx.fillRect(0, 0, width, height);

  // Radial Glows
  const glowL = ctx.createRadialGradient(width * 0.25, height * 0.5, 40, width * 0.25, height * 0.5, 1100);
  glowL.addColorStop(0, 'rgba(188, 55, 237, 0.26)');
  glowL.addColorStop(1, 'rgba(8, 9, 12, 0)');
  ctx.fillStyle = glowL;
  ctx.fillRect(0, 0, width, height);

  const glowR = ctx.createRadialGradient(width * 0.8, height * 0.5, 40, width * 0.8, height * 0.5, 1000);
  glowR.addColorStop(0, 'rgba(0, 240, 255, 0.16)');
  glowR.addColorStop(1, 'rgba(8, 9, 12, 0)');
  ctx.fillStyle = glowR;
  ctx.fillRect(0, 0, width, height);

  // Grid
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
  ctx.lineWidth = 2;
  for (let x = 0; x < width; x += 120) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  // Border frame
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 4;
  roundRect(ctx, 40, 40, width - 80, height - 80, 40);
  ctx.stroke();

  // Brand lockup on right / center-right
  const lockupX = 920;
  const symW = 180;
  const symH = 270;
  drawSlashSymbol(ctx, lockupX, 230, symW, symH, {
    isDark: true,
    glow: true,
    glowBlur: 60,
    glowColor: 'rgba(232, 112, 253, 0.85)'
  });

  ctx.save();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 116px "Space Grotesk", sans-serif';
  ctx.letterSpacing = '10px';
  ctx.fillText('SO WE', lockupX + 230, 350);

  ctx.font = '800 144px "Space Grotesk", sans-serif';
  ctx.fillText('BUILD', lockupX + 230, 490);

  const bMet = ctx.measureText('BUILD');
  ctx.fillStyle = '#E870FD';
  ctx.shadowColor = 'rgba(232, 112, 253, 0.85)';
  ctx.shadowBlur = 36;
  ctx.fillText('.IN', lockupX + 230 + bMet.width + 12, 490);

  // Headline & Subtitle in 4K
  ctx.font = '700 56px "Space Grotesk", sans-serif';
  ctx.fillStyle = '#CBD5E1';
  ctx.fillText('The Modern Done-For-You Technology Partner', lockupX, 630);

  ctx.font = '500 38px "Manrope", sans-serif';
  ctx.fillStyle = '#94A3B8';
  ctx.fillText('Websites · Web Apps · AI Assistants · WhatsApp Automation · Cloud Hosting', lockupX, 720);
  ctx.restore();

  saveToAll('sowebuild-banner-twitter.png', canvas.toBuffer('image/png'));
}

/* -------------------------------------------------------------------------- */
/* 8. Dedicated Instagram Profile Pictures (2160 x 2160 UHD Master)          */
/* -------------------------------------------------------------------------- */
{
  const size = 2160;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#08090C';
  ctx.fillRect(0, 0, size, size);

  // Radial Aura
  const aura = ctx.createRadialGradient(size / 2, size / 2, 60, size / 2, size / 2, 960);
  aura.addColorStop(0, 'rgba(232, 112, 253, 0.48)');
  aura.addColorStop(0.38, 'rgba(188, 55, 237, 0.28)');
  aura.addColorStop(0.72, 'rgba(124, 58, 237, 0.12)');
  aura.addColorStop(1, 'rgba(8, 9, 12, 0)');
  ctx.fillStyle = aura;
  ctx.fillRect(0, 0, size, size);

  // Subtle cyan edge illumination
  const cyanAura = ctx.createRadialGradient(size * 0.31, size * 0.7, 40, size * 0.31, size * 0.7, 600);
  cyanAura.addColorStop(0, 'rgba(0, 240, 255, 0.12)');
  cyanAura.addColorStop(1, 'rgba(8, 9, 12, 0)');
  ctx.fillStyle = cyanAura;
  ctx.fillRect(0, 0, size, size);

  // Centered Slash Symbol in 4K
  const symW = 640;
  const symH = 960;
  drawSlashSymbol(ctx, size / 2 - symW / 2, size / 2 - symH / 2, symW, symH, {
    isDark: true,
    glow: true,
    glowBlur: 110,
    glowColor: 'rgba(232, 112, 253, 0.95)'
  });

  const buffer = canvas.toBuffer('image/png');
  saveToAll('sowebuild-instagram-pfp.png', buffer);
  saveToAll('instagram-pfp.png', buffer);
}

{
  // Variant B: Instagram PFP with Sleek Gradient Ring in 4K
  const size = 2160;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#08090C';
  ctx.fillRect(0, 0, size, size);

  // Radial Aura
  const aura = ctx.createRadialGradient(size / 2, size / 2, 60, size / 2, size / 2, 960);
  aura.addColorStop(0, 'rgba(232, 112, 253, 0.44)');
  aura.addColorStop(0.4, 'rgba(188, 55, 237, 0.24)');
  aura.addColorStop(1, 'rgba(8, 9, 12, 0)');
  ctx.fillStyle = aura;
  ctx.fillRect(0, 0, size, size);

  // Sleek cyber neon ring near the edge of the circular crop
  ctx.save();
  const ringGrad = ctx.createLinearGradient(200, 200, size - 200, size - 200);
  ringGrad.addColorStop(0, '#E870FD');
  ringGrad.addColorStop(0.5, '#BC37ED');
  ringGrad.addColorStop(1, '#00F0FF');
  ctx.strokeStyle = ringGrad;
  ctx.lineWidth = 8;
  ctx.shadowColor = 'rgba(232, 112, 253, 0.65)';
  ctx.shadowBlur = 36;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, 980, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Centered Slash Symbol in 4K
  const symW = 620;
  const symH = 930;
  drawSlashSymbol(ctx, size / 2 - symW / 2, size / 2 - symH / 2, symW, symH, {
    isDark: true,
    glow: true,
    glowBlur: 100,
    glowColor: 'rgba(232, 112, 253, 0.95)'
  });

  saveToAll('sowebuild-instagram-pfp-ring.png', canvas.toBuffer('image/png'));
}

/* -------------------------------------------------------------------------- */
/* 9. Vector SVG Avatar (Scalable & Infinitely Sharp)                         */
/* -------------------------------------------------------------------------- */
{
  const SVG_AVATAR = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" fill="none">
  <!-- Background -->
  <rect width="1080" height="1080" fill="#08090C" />
  <!-- Ambient Radial Glow -->
  <circle cx="540" cy="540" r="480" fill="url(#bgGlow)" />
  <!-- Safe Zone Border -->
  <circle cx="540" cy="540" r="490" stroke="rgba(255,255,255,0.06)" stroke-width="2" />
  <!-- Center Glowing Slash Symbol -->
  <g transform="translate(380, 300) scale(8)">
    <polygon points="26,2 38,2 14,58 2,58" fill="url(#symbolGrad)" filter="url(#glowFilter)" />
  </g>
  <defs>
    <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#E870FD" stop-opacity="0.45" />
      <stop offset="40%" stop-color="#BC37ED" stop-opacity="0.25" />
      <stop offset="75%" stop-color="#7C3AED" stop-opacity="0.1" />
      <stop offset="100%" stop-color="#08090C" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="symbolGrad" x1="2" y1="2" x2="38" y2="58" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="35%" stop-color="#E870FD" />
      <stop offset="75%" stop-color="#BC37ED" />
      <stop offset="100%" stop-color="#7C3AED" />
    </linearGradient>
    <filter id="glowFilter" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="0" stdDeviation="5" flood-color="#E870FD" flood-opacity="0.9" />
    </filter>
  </defs>
</svg>`;

  saveToAll('sowebuild-avatar-glow.svg', Buffer.from(SVG_AVATAR, 'utf-8'));
}

console.log('\n✨ All Social Media Logo & Banner Assets generated in 4K Quality!\n');
