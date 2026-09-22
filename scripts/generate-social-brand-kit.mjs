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
    // ignore if already exists or path mismatch
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
      console.error(`Failed to write ${filename} to ${dir}:`, err.message);
    }
  });
  console.log(`  [✓] Generated & Saved: ${filename}`);
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
console.log('🎨 Generating Official Social Media Brand Kit');
console.log('==============================================\n');

/* -------------------------------------------------------------------------- */
/* 1. Profile Picture: Glow Avatar (1080 x 1080) - Primary Social Profile     */
/* -------------------------------------------------------------------------- */
{
  const canvas = createCanvas(1080, 1080);
  const ctx = canvas.getContext('2d');

  // Background - Deep cyber obsidian
  ctx.fillStyle = '#08090C';
  ctx.fillRect(0, 0, 1080, 1080);

  // Deep ambient violet/cyan radial aura
  const aura = ctx.createRadialGradient(540, 540, 40, 540, 540, 480);
  aura.addColorStop(0, 'rgba(232, 112, 253, 0.45)');
  aura.addColorStop(0.4, 'rgba(188, 55, 237, 0.28)');
  aura.addColorStop(0.75, 'rgba(124, 58, 237, 0.12)');
  aura.addColorStop(1, 'rgba(8, 9, 12, 0)');
  ctx.fillStyle = aura;
  ctx.fillRect(0, 0, 1080, 1080);

  // Subtle cyan counter-glow in bottom-left
  const cyanGlow = ctx.createRadialGradient(280, 800, 20, 280, 800, 320);
  cyanGlow.addColorStop(0, 'rgba(0, 240, 255, 0.1)');
  cyanGlow.addColorStop(1, 'rgba(8, 9, 12, 0)');
  ctx.fillStyle = cyanGlow;
  ctx.fillRect(0, 0, 1080, 1080);

  // Subtle circular framing guide (safe zone for circular crop)
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(540, 540, 490, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Draw Glowing Symbol - 320 x 480 px (Perfect safe zone within 800px diameter)
  const symW = 320;
  const symH = 480;
  drawSlashSymbol(ctx, 540 - symW / 2, 540 - symH / 2, symW, symH, {
    isDark: true,
    glow: true,
    glowBlur: 60,
    glowColor: 'rgba(232, 112, 253, 0.9)'
  });

  saveToAll('sowebuild-avatar-glow.png', canvas.toBuffer('image/png'));
}

/* -------------------------------------------------------------------------- */
/* 2. Profile Picture: Stacked Brand Avatar (1080 x 1080)                     */
/* -------------------------------------------------------------------------- */
{
  const canvas = createCanvas(1080, 1080);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#0B0D13';
  ctx.fillRect(0, 0, 1080, 1080);

  // Radial Glow behind symbol
  const radial = ctx.createRadialGradient(540, 420, 20, 540, 420, 380);
  radial.addColorStop(0, 'rgba(188, 55, 237, 0.35)');
  radial.addColorStop(0.6, 'rgba(124, 58, 237, 0.12)');
  radial.addColorStop(1, 'rgba(11, 13, 19, 0)');
  ctx.fillStyle = radial;
  ctx.fillRect(0, 0, 1080, 1080);

  // Draw Symbol
  const symW = 200;
  const symH = 300;
  drawSlashSymbol(ctx, 540 - symW / 2, 240, symW, symH, {
    isDark: true,
    glow: true,
    glowBlur: 45,
    glowColor: 'rgba(232, 112, 253, 0.8)'
  });

  // Typography
  ctx.save();
  ctx.textAlign = 'center';
  ctx.fillStyle = '#F8F7FA';
  ctx.font = '700 76px "Space Grotesk", sans-serif';
  ctx.letterSpacing = '12px';
  ctx.fillText('SO WE', 540, 680);

  ctx.font = '800 102px "Space Grotesk", sans-serif';
  ctx.letterSpacing = '8px';

  // Measure to color .IN
  const buildText = 'BUILD';
  const inText = '.IN';
  ctx.font = '800 102px "Space Grotesk", sans-serif';
  const buildW = ctx.measureText(buildText).width;
  const inW = ctx.measureText(inText).width;
  const totalW = buildW + inW;
  const startX = 540 - totalW / 2;

  ctx.textAlign = 'left';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(buildText, startX, 800);

  ctx.fillStyle = '#E870FD';
  ctx.shadowColor = 'rgba(232, 112, 253, 0.8)';
  ctx.shadowBlur = 24;
  ctx.fillText(inText, startX + buildW, 800);
  ctx.restore();

  // Subtle Tagline at bottom (within circular crop safe area)
  ctx.save();
  ctx.textAlign = 'center';
  ctx.font = '600 30px "Manrope", sans-serif';
  ctx.fillStyle = '#94A3B8';
  ctx.letterSpacing = '4px';
  ctx.fillText('TECHNOLOGY PARTNER', 540, 880);
  ctx.restore();

  saveToAll('sowebuild-avatar-stacked.png', canvas.toBuffer('image/png'));
}

/* -------------------------------------------------------------------------- */
/* 3. Profile Picture: Minimal High-Contrast (1080 x 1080)                    */
/* -------------------------------------------------------------------------- */
{
  const canvas = createCanvas(1080, 1080);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#050608';
  ctx.fillRect(0, 0, 1080, 1080);

  // Clean, crisp symbol without heavy ambient dispersion for ultra-crisp small icon visibility
  const symW = 340;
  const symH = 510;
  drawSlashSymbol(ctx, 540 - symW / 2, 540 - symH / 2, symW, symH, {
    isDark: true,
    glow: true,
    glowBlur: 20,
    glowColor: 'rgba(232, 112, 253, 0.6)'
  });

  saveToAll('sowebuild-avatar-minimal.png', canvas.toBuffer('image/png'));
}

/* -------------------------------------------------------------------------- */
/* 4. Profile Picture: Transparent High-Res PNG (1080 x 1080)                 */
/* -------------------------------------------------------------------------- */
{
  const canvas = createCanvas(1080, 1080);
  const ctx = canvas.getContext('2d');

  const symW = 380;
  const symH = 570;
  drawSlashSymbol(ctx, 540 - symW / 2, 540 - symH / 2, symW, symH, {
    isDark: true,
    glow: true,
    glowBlur: 40,
    glowColor: 'rgba(232, 112, 253, 0.85)'
  });

  saveToAll('sowebuild-avatar-transparent.png', canvas.toBuffer('image/png'));
}

/* -------------------------------------------------------------------------- */
/* 5. Profile Picture: Light Mode Avatar (1080 x 1080)                        */
/* -------------------------------------------------------------------------- */
{
  const canvas = createCanvas(1080, 1080);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, 1080, 1080);

  const symW = 340;
  const symH = 510;
  drawSlashSymbol(ctx, 540 - symW / 2, 540 - symH / 2, symW, symH, {
    isDark: false,
    glow: false
  });

  saveToAll('sowebuild-avatar-white.png', canvas.toBuffer('image/png'));
}

function drawVectorIcon(ctx, iconName, x, y, size = 18, color = '#FFFFFF', strokeWidth = 2) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = strokeWidth;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  if (iconName === 'sparkle') {
    const rOuter = size * 0.45;
    const rInner = size * 0.15;
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4 - Math.PI / 2;
      const r = i % 2 === 0 ? rOuter : rInner;
      const px = x + Math.cos(angle) * r;
      const py = y + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
  } else if (iconName === 'bolt') {
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
    roundRect(ctx, x - pw, y - ph, pw * 2, ph * 2, 4);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y + ph - 4, 1.5, 0, Math.PI * 2);
    ctx.fill();
  } else if (iconName === 'chip') {
    const s = size * 0.35;
    roundRect(ctx, x - s, y - s, s * 2, s * 2, 3);
    ctx.stroke();
    // Pins
    ctx.beginPath();
    ctx.moveTo(x - s, y - s * 0.4); ctx.lineTo(x - s - 4, y - s * 0.4);
    ctx.moveTo(x - s, y + s * 0.4); ctx.lineTo(x - s - 4, y + s * 0.4);
    ctx.moveTo(x + s, y - s * 0.4); ctx.lineTo(x + s + 4, y - s * 0.4);
    ctx.moveTo(x + s, y + s * 0.4); ctx.lineTo(x + s + 4, y + s * 0.4);
    ctx.stroke();
  } else if (iconName === 'check') {
    ctx.beginPath();
    ctx.moveTo(x - size * 0.35, y);
    ctx.lineTo(x - size * 0.1, y + size * 0.3);
    ctx.lineTo(x + size * 0.35, y - size * 0.3);
    ctx.stroke();
  }
  ctx.restore();
}

/* -------------------------------------------------------------------------- */
/* 6. LinkedIn Company Banner (1584 x 396)                                    */
/* -------------------------------------------------------------------------- */
{
  const width = 1584;
  const height = 396;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#08090C';
  ctx.fillRect(0, 0, width, height);

  // Ambient glows
  const grad1 = ctx.createRadialGradient(240, height / 2, 20, 240, height / 2, 450);
  grad1.addColorStop(0, 'rgba(188, 55, 237, 0.24)');
  grad1.addColorStop(1, 'rgba(8, 9, 12, 0)');
  ctx.fillStyle = grad1;
  ctx.fillRect(0, 0, width, height);

  const grad2 = ctx.createRadialGradient(width - 200, height / 2, 20, width - 200, height / 2, 400);
  grad2.addColorStop(0, 'rgba(0, 240, 255, 0.12)');
  grad2.addColorStop(1, 'rgba(8, 9, 12, 0)');
  ctx.fillStyle = grad2;
  ctx.fillRect(0, 0, width, height);

  // Subtle grid lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += 60) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  // Border frame
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 2;
  roundRect(ctx, 16, 16, width - 32, height - 32, 16);
  ctx.stroke();

  // Left Brand Lockup (Starting at x: 80)
  const symW = 76;
  const symH = 114;
  drawSlashSymbol(ctx, 80, (height - symH) / 2, symW, symH, {
    isDark: true,
    glow: true,
    glowBlur: 24,
    glowColor: 'rgba(232, 112, 253, 0.85)'
  });

  ctx.save();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 44px "Space Grotesk", sans-serif';
  ctx.letterSpacing = '4px';
  ctx.fillText('SO WE', 185, height / 2 - 12);

  ctx.font = '800 54px "Space Grotesk", sans-serif';
  ctx.fillText('BUILD', 185, height / 2 + 50);

  const bMetrics = ctx.measureText('BUILD');
  ctx.fillStyle = '#E870FD';
  ctx.shadowColor = 'rgba(232, 112, 253, 0.8)';
  ctx.shadowBlur = 16;
  ctx.fillText('.IN', 185 + bMetrics.width + 4, height / 2 + 50);
  ctx.restore();

  // Divider line
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(490, 65);
  ctx.lineTo(490, height - 65);
  ctx.stroke();

  // Right Value Proposition & Capabilities
  ctx.save();
  ctx.font = '800 32px "Space Grotesk", sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText('You have a problem. We build the solution.', 530, 130);

  ctx.font = '500 20px "Manrope", sans-serif';
  ctx.fillStyle = '#94A3B8';
  ctx.fillText('Done-for-you technology partner · Turnkey delivery · Zero tech stress.', 530, 175);

  // 3 Capability Badges with vector icons
  const badges = [
    { text: 'Bespoke Websites & Web Apps', icon: 'bolt', col: '#BC37ED' },
    { text: '24/7 AI Assistants', icon: 'chip', col: '#00F0FF' },
    { text: 'WhatsApp Lead Pipelines', icon: 'phone', col: '#10B981' }
  ];

  let bX = 530;
  const bY = 220;
  ctx.font = '700 16px "Space Grotesk", sans-serif';

  badges.forEach(b => {
    const tW = ctx.measureText(b.text).width;
    const padL = 40;
    const padR = 20;
    const pW = tW + padL + padR;
    const pH = 44;

    ctx.fillStyle = '#0F131D';
    roundRect(ctx, bX, bY, pW, pH, 22);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    drawVectorIcon(ctx, b.icon, bX + 22, bY + 22, 18, b.col);

    ctx.fillStyle = b.col;
    ctx.fillText(b.text, bX + padL, bY + 28);

    bX += pW + 16;
  });

  // Website & CTA at bottom right
  ctx.textAlign = 'right';
  ctx.font = '700 20px "Space Grotesk", sans-serif';
  ctx.fillStyle = '#E870FD';
  ctx.fillText('sowebuild.in  →', width - 70, height - 55);
  ctx.restore();

  saveToAll('sowebuild-banner-linkedin.png', canvas.toBuffer('image/png'));
}

/* -------------------------------------------------------------------------- */
/* 7. Twitter / X Header Banner (1500 x 500)                                  */
/* -------------------------------------------------------------------------- */
{
  const width = 1500;
  const height = 500;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#08090C';
  ctx.fillRect(0, 0, width, height);

  // Radial Glows
  const glowL = ctx.createRadialGradient(width * 0.25, height * 0.5, 20, width * 0.25, height * 0.5, 550);
  glowL.addColorStop(0, 'rgba(188, 55, 237, 0.25)');
  glowL.addColorStop(1, 'rgba(8, 9, 12, 0)');
  ctx.fillStyle = glowL;
  ctx.fillRect(0, 0, width, height);

  const glowR = ctx.createRadialGradient(width * 0.8, height * 0.5, 20, width * 0.8, height * 0.5, 500);
  glowR.addColorStop(0, 'rgba(0, 240, 255, 0.15)');
  glowR.addColorStop(1, 'rgba(8, 9, 12, 0)');
  ctx.fillStyle = glowR;
  ctx.fillRect(0, 0, width, height);

  // Grid
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += 60) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  // Border frame
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 2;
  roundRect(ctx, 20, 20, width - 40, height - 40, 20);
  ctx.stroke();

  // Brand lockup on right / center-right to avoid Twitter's avatar on the bottom-left
  const lockupX = 460;
  const symW = 90;
  const symH = 135;
  drawSlashSymbol(ctx, lockupX, 115, symW, symH, {
    isDark: true,
    glow: true,
    glowBlur: 30,
    glowColor: 'rgba(232, 112, 253, 0.85)'
  });

  ctx.save();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 58px "Space Grotesk", sans-serif';
  ctx.letterSpacing = '5px';
  ctx.fillText('SO WE', lockupX + 115, 175);

  ctx.font = '800 72px "Space Grotesk", sans-serif';
  ctx.fillText('BUILD', lockupX + 115, 245);

  const bMet = ctx.measureText('BUILD');
  ctx.fillStyle = '#E870FD';
  ctx.shadowColor = 'rgba(232, 112, 253, 0.8)';
  ctx.shadowBlur = 18;
  ctx.fillText('.IN', lockupX + 115 + bMet.width + 6, 245);

  // Headline & Subtitle
  ctx.font = '700 28px "Space Grotesk", sans-serif';
  ctx.fillStyle = '#CBD5E1';
  ctx.fillText('The Modern Done-For-You Technology Partner', lockupX, 315);

  ctx.font = '500 19px "Manrope", sans-serif';
  ctx.fillStyle = '#94A3B8';
  ctx.fillText('Websites · Web Apps · AI Assistants · WhatsApp Automation · Cloud Hosting', lockupX, 360);
  ctx.restore();

  saveToAll('sowebuild-banner-twitter.png', canvas.toBuffer('image/png'));
}

/* -------------------------------------------------------------------------- */
/* 8. Dedicated Instagram Profile Pictures (1080 x 1080)                     */
/* -------------------------------------------------------------------------- */
{
  // Primary Instagram PFP - Glowing Cyber Symbol (Optimized for Circular Mask)
  const canvas = createCanvas(1080, 1080);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#08090C';
  ctx.fillRect(0, 0, 1080, 1080);

  // Radial Aura
  const aura = ctx.createRadialGradient(540, 540, 30, 540, 540, 480);
  aura.addColorStop(0, 'rgba(232, 112, 253, 0.48)');
  aura.addColorStop(0.38, 'rgba(188, 55, 237, 0.28)');
  aura.addColorStop(0.72, 'rgba(124, 58, 237, 0.12)');
  aura.addColorStop(1, 'rgba(8, 9, 12, 0)');
  ctx.fillStyle = aura;
  ctx.fillRect(0, 0, 1080, 1080);

  // Subtle cyan edge illumination
  const cyanAura = ctx.createRadialGradient(340, 760, 20, 340, 760, 300);
  cyanAura.addColorStop(0, 'rgba(0, 240, 255, 0.12)');
  cyanAura.addColorStop(1, 'rgba(8, 9, 12, 0)');
  ctx.fillStyle = cyanAura;
  ctx.fillRect(0, 0, 1080, 1080);

  // Centered Slash Symbol (Safe Zone: 320 x 480 within 800px circular mask)
  const symW = 320;
  const symH = 480;
  drawSlashSymbol(ctx, 540 - symW / 2, 540 - symH / 2, symW, symH, {
    isDark: true,
    glow: true,
    glowBlur: 55,
    glowColor: 'rgba(232, 112, 253, 0.95)'
  });

  const buffer = canvas.toBuffer('image/png');
  saveToAll('sowebuild-instagram-pfp.png', buffer);
  saveToAll('instagram-pfp.png', buffer);
}

{
  // Variant B: Instagram PFP with Sleek Gradient Ring
  const canvas = createCanvas(1080, 1080);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#08090C';
  ctx.fillRect(0, 0, 1080, 1080);

  // Radial Aura
  const aura = ctx.createRadialGradient(540, 540, 30, 540, 540, 480);
  aura.addColorStop(0, 'rgba(232, 112, 253, 0.42)');
  aura.addColorStop(0.4, 'rgba(188, 55, 237, 0.22)');
  aura.addColorStop(1, 'rgba(8, 9, 12, 0)');
  ctx.fillStyle = aura;
  ctx.fillRect(0, 0, 1080, 1080);

  // Sleek cyber neon ring near the edge of the circular crop
  ctx.save();
  const ringGrad = ctx.createLinearGradient(100, 100, 980, 980);
  ringGrad.addColorStop(0, '#E870FD');
  ringGrad.addColorStop(0.5, '#BC37ED');
  ringGrad.addColorStop(1, '#00F0FF');
  ctx.strokeStyle = ringGrad;
  ctx.lineWidth = 4;
  ctx.shadowColor = 'rgba(232, 112, 253, 0.6)';
  ctx.shadowBlur = 18;
  ctx.beginPath();
  ctx.arc(540, 540, 490, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Centered Slash Symbol
  const symW = 310;
  const symH = 465;
  drawSlashSymbol(ctx, 540 - symW / 2, 540 - symH / 2, symW, symH, {
    isDark: true,
    glow: true,
    glowBlur: 50,
    glowColor: 'rgba(232, 112, 253, 0.95)'
  });

  saveToAll('sowebuild-instagram-pfp-ring.png', canvas.toBuffer('image/png'));
}

/* -------------------------------------------------------------------------- */
/* 8. Vector SVG Avatar (Scalable & Infinitely Sharp)                         */
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

console.log('\n✨ All Social Media Logo & Banner Assets generated successfully!\n');
