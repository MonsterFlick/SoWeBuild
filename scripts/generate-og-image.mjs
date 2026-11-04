import { createCanvas, GlobalFonts } from '@napi-rs/canvas';
import fs from 'node:fs';
import path from 'node:path';

// Register brand fonts
GlobalFonts.registerFromPath('src/fonts/Syne-Bold.ttf', 'Syne');
GlobalFonts.registerFromPath('src/fonts/Syne-ExtraBold.ttf', 'Syne ExtraBold');
GlobalFonts.registerFromPath('src/fonts/PlusJakartaSans-Bold.ttf', 'Plus Jakarta Sans Bold');
GlobalFonts.registerFromPath('src/fonts/PlusJakartaSans-Medium.ttf', 'Plus Jakarta Sans');
GlobalFonts.registerFromPath('src/fonts/InstrumentSerif-Italic.ttf', 'Instrument Serif');

console.log('✅ Fonts registered.');

/**
 * Draw the official 56-degree SoWeBuild slash glyph
 */
function drawSlash(ctx, x, y, width, height, options = {}) {
  ctx.save();

  if (options.shadow) {
    ctx.shadowColor = options.shadowColor || 'rgba(124, 58, 237, 0.35)';
    ctx.shadowBlur = options.shadowBlur || 32;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = options.shadowOffsetY || 12;
  }

  const grad = ctx.createLinearGradient(x, y, x + width, y + height);
  grad.addColorStop(0, '#9333EA');
  grad.addColorStop(0.5, '#7C3AED');
  grad.addColorStop(1, '#6D28D9');
  ctx.fillStyle = grad;

  ctx.beginPath();
  ctx.moveTo(x + width * 0.65, y + height * 0.0333);
  ctx.lineTo(x + width * 0.95, y + height * 0.0333);
  ctx.lineTo(x + width * 0.35, y + height * 0.9667);
  ctx.lineTo(x + width * 0.05, y + height * 0.9667);
  ctx.closePath();
  ctx.fill();

  // Subtle specular highlight on the left edge
  if (options.specular) {
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.lineWidth = Math.max(1.5, width * 0.012);
    ctx.beginPath();
    ctx.moveTo(x + width * 0.05, y + height * 0.9667);
    ctx.lineTo(x + width * 0.65, y + height * 0.0333);
    ctx.stroke();
  }

  ctx.restore();
}

/**
 * Vector Lightning Bolt Icon
 */
function drawBoltIcon(ctx, x, y, size, color) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x + size * 0.58, y);
  ctx.lineTo(x + size * 0.15, y + size * 0.54);
  ctx.lineTo(x + size * 0.50, y + size * 0.54);
  ctx.lineTo(x + size * 0.42, y + size);
  ctx.lineTo(x + size * 0.88, y + size * 0.44);
  ctx.lineTo(x + size * 0.54, y + size * 0.44);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

/**
 * Vector Chip / AI Node Icon
 */
function drawCpuIcon(ctx, x, y, size, color) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 1.5;

  // Center chip body
  const inset = size * 0.22;
  const bodySize = size - inset * 2;
  ctx.strokeRect(x + inset, y + inset, bodySize, bodySize);

  // Inner core
  ctx.fillRect(x + size * 0.38, y + size * 0.38, size * 0.24, size * 0.24);

  // Pins (top & bottom)
  const pinLen = size * 0.14;
  for (let i = 0; i < 2; i++) {
    const px = x + size * (0.35 + i * 0.3);
    ctx.beginPath();
    ctx.moveTo(px, y);
    ctx.lineTo(px, y + pinLen);
    ctx.moveTo(px, y + size - pinLen);
    ctx.lineTo(px, y + size);
    ctx.stroke();
  }

  // Pins (left & right)
  for (let i = 0; i < 2; i++) {
    const py = y + size * (0.35 + i * 0.3);
    ctx.beginPath();
    ctx.moveTo(x, py);
    ctx.lineTo(x + pinLen, py);
    ctx.moveTo(x + size - pinLen, py);
    ctx.lineTo(x + size, py);
    ctx.stroke();
  }
  ctx.restore();
}

/**
 * Vector Shield / IP Lock Icon
 */
function drawShieldIcon(ctx, x, y, size, color) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.8;
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(x + size * 0.5, y + size * 0.08);
  ctx.lineTo(x + size * 0.88, y + size * 0.22);
  ctx.lineTo(x + size * 0.88, y + size * 0.58);
  ctx.quadraticCurveTo(x + size * 0.88, y + size * 0.88, x + size * 0.5, y + size * 0.98);
  ctx.quadraticCurveTo(x + size * 0.12, y + size * 0.88, x + size * 0.12, y + size * 0.58);
  ctx.lineTo(x + size * 0.12, y + size * 0.22);
  ctx.closePath();
  ctx.stroke();

  // Checkmark inside shield
  ctx.beginPath();
  ctx.moveTo(x + size * 0.34, y + size * 0.52);
  ctx.lineTo(x + size * 0.46, y + size * 0.65);
  ctx.lineTo(x + size * 0.68, y + size * 0.40);
  ctx.stroke();

  ctx.restore();
}

/**
 * Vector Diagonal Arrow (↗)
 */
function drawArrowUpRight(ctx, x, y, size, color, strokeWidth = 2) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = strokeWidth;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.beginPath();
  ctx.moveTo(x, y + size);
  ctx.lineTo(x + size, y);
  ctx.moveTo(x + size * 0.35, y);
  ctx.lineTo(x + size, y);
  ctx.lineTo(x + size, y + size * 0.65);
  ctx.stroke();

  ctx.restore();
}

/* ========================================================================== */
/* Build Luxury OG Image (1200 x 630)                                         */
/* ========================================================================== */
const ogWidth = 1200;
const ogHeight = 630;
const canvas = createCanvas(ogWidth, ogHeight);
const ctx = canvas.getContext('2d');

// 1. Base Canvas - Warm Ivory
ctx.fillStyle = '#FAF8F5';
ctx.fillRect(0, 0, ogWidth, ogHeight);

// 2. Outer Framed Card (Pure Surface with Hairline Border)
const cardX = 32;
const cardY = 32;
const cardW = ogWidth - 64;
const cardH = ogHeight - 64;
const cardR = 24;

ctx.save();
ctx.shadowColor = 'rgba(22, 17, 36, 0.05)';
ctx.shadowBlur = 30;
ctx.shadowOffsetY = 8;
ctx.fillStyle = '#FFFFFF';
ctx.beginPath();
ctx.roundRect(cardX, cardY, cardW, cardH, cardR);
ctx.fill();
ctx.restore();

// Card Border
ctx.strokeStyle = '#E8DFF2';
ctx.lineWidth = 1.5;
ctx.beginPath();
ctx.roundRect(cardX, cardY, cardW, cardH, cardR);
ctx.stroke();

// Subtle ambient purple radial glow in the right quadrant
const bgGlow = ctx.createRadialGradient(920, 240, 20, 920, 240, 420);
bgGlow.addColorStop(0, 'rgba(124, 58, 237, 0.12)');
bgGlow.addColorStop(0.6, 'rgba(147, 51, 234, 0.04)');
bgGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
ctx.fillStyle = bgGlow;
ctx.beginPath();
ctx.roundRect(cardX + 1, cardY + 1, cardW - 2, cardH - 2, cardR);
ctx.fill();

// 3. Header Row (Left)
const leftMargin = 80;

// Mini Brand Glyph
drawSlash(ctx, leftMargin, 72, 22, 34);

// Brand Wordmark
ctx.save();
ctx.font = '700 28px Syne';
ctx.fillStyle = '#161124';
ctx.fillText('SoWeBuild', leftMargin + 32, 98);

// Purple period dot
const nameWidth = ctx.measureText('SoWeBuild').width;
ctx.fillStyle = '#7C3AED';
ctx.fillText('.', leftMargin + 32 + nameWidth, 98);

// Elegant Separator Dot
ctx.fillStyle = '#CBD5E1';
ctx.beginPath();
ctx.arc(leftMargin + 32 + nameWidth + 22, 90, 2.5, 0, Math.PI * 2);
ctx.fill();

// Eyebrow Studio Pill
const pillX = leftMargin + 32 + nameWidth + 36;
const pillY = 76;
const pillW = 280;
const pillH = 28;
ctx.fillStyle = '#F5EDFA';
ctx.beginPath();
ctx.roundRect(pillX, pillY, pillW, pillH, 14);
ctx.fill();
ctx.strokeStyle = '#E8DFF2';
ctx.lineWidth = 1;
ctx.stroke();

ctx.font = '700 11px "Plus Jakarta Sans Bold"';
ctx.fillStyle = '#7C3AED';
ctx.fillText('DIGITAL PRODUCT & ENGINEERING STUDIO', pillX + 14, pillY + 18);
ctx.restore();

// 4. Hero Headline
ctx.save();
ctx.font = '700 46px Syne';
ctx.fillStyle = '#161124';
ctx.fillText('Architected for scale.', leftMargin, 184);

ctx.font = 'italic 48px "Instrument Serif", Georgia, serif';
const headlineGrad = ctx.createLinearGradient(leftMargin, 0, leftMargin + 500, 0);
headlineGrad.addColorStop(0, '#7C3AED');
headlineGrad.addColorStop(1, '#9333EA');
ctx.fillStyle = headlineGrad;
ctx.fillText('Engineered with senior-led rigor.', leftMargin, 240);
ctx.restore();

// 5. Studio Description Subhead
ctx.save();
ctx.font = '500 16px "Plus Jakarta Sans"';
ctx.fillStyle = '#5A5068';
ctx.fillText('High-performance web applications, autonomous AI automation, and', leftMargin, 294);
ctx.fillText('distributed cloud infrastructure. 100% full client IP & code ownership.', leftMargin, 320);
ctx.restore();

// 6. Three Value Badges with Vector Icons (NO EMOJIS!)
const badges = [
  { icon: 'bolt', text: 'High-Throughput Web Apps' },
  { icon: 'cpu', text: 'Production AI Systems' },
  { icon: 'shield', text: '100% Client Code Ownership' }
];

let badgeX = leftMargin;
const badgeY = 374;
const badgeH = 40;

badges.forEach((b) => {
  ctx.save();
  ctx.font = '700 13px "Plus Jakarta Sans Bold"';
  const textW = ctx.measureText(b.text).width;
  const badgeW = textW + 52;

  // Pill surface
  ctx.fillStyle = '#FAF8F5';
  ctx.strokeStyle = '#E8DFF2';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 12);
  ctx.fill();
  ctx.stroke();

  // Vector Icon
  if (b.icon === 'bolt') {
    drawBoltIcon(ctx, badgeX + 14, badgeY + 11, 18, '#7C3AED');
  } else if (b.icon === 'cpu') {
    drawCpuIcon(ctx, badgeX + 14, badgeY + 11, 18, '#7C3AED');
  } else if (b.icon === 'shield') {
    drawShieldIcon(ctx, badgeX + 14, badgeY + 11, 18, '#7C3AED');
  }

  // Label text
  ctx.fillStyle = '#161124';
  ctx.fillText(b.text, badgeX + 40, badgeY + 25);
  ctx.restore();

  badgeX += badgeW + 12;
});

// 7. Right Showcase Slab (Dedicated Floating Glass Card)
const slabX = 770;
const slabY = 72;
const slabW = 350;
const slabH = 430;
const slabR = 20;

ctx.save();
// Slab shadow
ctx.shadowColor = 'rgba(22, 17, 36, 0.06)';
ctx.shadowBlur = 24;
ctx.shadowOffsetY = 6;
ctx.fillStyle = '#FAF8F5';
ctx.beginPath();
ctx.roundRect(slabX, slabY, slabW, slabH, slabR);
ctx.fill();
ctx.restore();

// Slab border
ctx.strokeStyle = '#E8DFF2';
ctx.lineWidth = 1.5;
ctx.beginPath();
ctx.roundRect(slabX, slabY, slabW, slabH, slabR);
ctx.stroke();

// Subtle concentric aura inside slab
const slabAura = ctx.createRadialGradient(slabX + slabW / 2, slabY + 160, 20, slabX + slabW / 2, slabY + 160, 180);
slabAura.addColorStop(0, 'rgba(124, 58, 237, 0.20)');
slabAura.addColorStop(0.6, 'rgba(124, 58, 237, 0.04)');
slabAura.addColorStop(1, 'rgba(250, 248, 245, 0)');
ctx.fillStyle = slabAura;
ctx.beginPath();
ctx.roundRect(slabX + 1, slabY + 1, slabW - 2, slabH - 2, slabR);
ctx.fill();

// Centered Hero Slash Glyph in Showcase Slab
const heroGlyphW = 154;
const heroGlyphH = 240;
drawSlash(
  ctx,
  slabX + (slabW - heroGlyphW) / 2,
  slabY + 42,
  heroGlyphW,
  heroGlyphH,
  {
    shadow: true,
    shadowBlur: 36,
    shadowOffsetY: 14,
    shadowColor: 'rgba(124, 58, 237, 0.45)',
    specular: true
  }
);

// Slab Divider
ctx.strokeStyle = '#E8DFF2';
ctx.lineWidth = 1;
ctx.beginPath();
ctx.moveTo(slabX + 24, slabY + 320);
ctx.lineTo(slabX + slabW - 24, slabY + 320);
ctx.stroke();

// Slab Spec Grid (3 columns)
const specs = [
  { top: '0 → 100', bottom: 'PRODUCTION' },
  { top: 'ZERO', bottom: 'AGENCY BLOAT' },
  { top: '100%', bottom: 'CODE OWN' }
];
const colW = (slabW - 48) / 3;
specs.forEach((s, idx) => {
  const cx = slabX + 24 + idx * colW + colW / 2;
  ctx.save();
  ctx.textAlign = 'center';

  ctx.font = '700 14px "Plus Jakarta Sans Bold"';
  ctx.fillStyle = '#161124';
  ctx.fillText(s.top, cx, slabY + 355);

  ctx.font = '700 9px "Plus Jakarta Sans Bold"';
  ctx.fillStyle = '#8C8299';
  ctx.fillText(s.bottom, cx, slabY + 375);
  ctx.restore();
});

// 8. Bottom Footer Row (Inside Main Card)
const footerY = 515;
ctx.save();
ctx.strokeStyle = '#E8DFF2';
ctx.lineWidth = 1;
ctx.beginPath();
ctx.moveTo(leftMargin, footerY);
ctx.lineTo(cardX + cardW - 48, footerY);
ctx.stroke();

// Founder Credit (Left)
ctx.font = '700 11px "Plus Jakarta Sans Bold"';
ctx.fillStyle = '#8C8299';
ctx.fillText('ENGINEERING LEAD: ', leftMargin, footerY + 37);

const leadW = ctx.measureText('ENGINEERING LEAD: ').width;
ctx.fillStyle = '#161124';
ctx.fillText('OM THAKUR', leftMargin + leadW, footerY + 37);

const nameW2 = ctx.measureText('OM THAKUR').width;
ctx.font = '500 11px "Plus Jakarta Sans"';
ctx.fillStyle = '#8C8299';
ctx.fillText(' • BACKEND & DISTRIBUTED SYSTEMS • MUMBAI', leftMargin + leadW + nameW2, footerY + 37);

// URL Button Pill (Right)
const urlW = 186;
const urlH = 38;
const urlX = cardX + cardW - 48 - urlW;
const urlY = footerY + 17;

ctx.fillStyle = '#161124';
ctx.beginPath();
ctx.roundRect(urlX, urlY, urlW, urlH, 10);
ctx.fill();

ctx.font = '700 14px "Plus Jakarta Sans Bold"';
ctx.fillStyle = '#FAF8F5';
ctx.fillText('sowebuild.in', urlX + 28, urlY + 24);

// Crisp Vector Arrow ↗
drawArrowUpRight(ctx, urlX + 138, urlY + 13, 12, '#A78BFA', 2.2);

ctx.restore();

// 9. Save to output paths
const ogPngBuf = canvas.toBuffer('image/png');

fs.writeFileSync('src/app/opengraph-image.png', ogPngBuf);
fs.writeFileSync('src/app/twitter-image.png', ogPngBuf);
fs.writeFileSync('public/og-image.png', ogPngBuf);
fs.writeFileSync('public/og.png', ogPngBuf);

// Also sync to SoWeBuild-assets
const extPath = 'd:/om/swb-system/SoWeBuild-assets/banners/sowebuild-og-image.png';
if (fs.existsSync(path.dirname(extPath))) {
  fs.writeFileSync(extPath, ogPngBuf);
}

console.log('✨ Ultra-High-End Open Graph image generated successfully!');
