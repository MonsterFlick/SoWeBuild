import { createCanvas, GlobalFonts } from '@napi-rs/canvas';
import fs from 'node:fs';
import path from 'node:path';

// Try registering Instrument Serif if available
const serifPath = path.resolve('src/fonts/InstrumentSerif-Italic.ttf');
if (fs.existsSync(serifPath)) {
  GlobalFonts.registerFromPath(serifPath, 'Instrument Serif');
}

/**
 * Creates an ICO buffer containing multiple PNG images.
 * @param {Buffer[]} pngBuffers Array of PNG buffers (sorted largest to smallest)
 * @param {number[]} sizes Array of dimensions matching the buffers (e.g. [48, 32, 16])
 */
function createIco(pngBuffers, sizes) {
  const count = pngBuffers.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  let offset = headerSize + count * dirEntrySize;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // 1 = ICO
  header.writeUInt16LE(count, 4); // Number of images

  const entries = [];
  for (let i = 0; i < count; i++) {
    const size = sizes[i];
    const buf = pngBuffers[i];
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // Width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // Height
    entry.writeUInt8(0, 2); // Color palette
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(buf.length, 8); // Size of image data
    entry.writeUInt32LE(offset, 12); // Offset of image data
    entries.push(entry);
    offset += buf.length;
  }

  return Buffer.concat([header, ...entries, ...pngBuffers]);
}

/**
 * Draws the official 56-degree SoWeBuild slash glyph.
 */
function drawSlash(ctx, x, y, width, height, options = {}) {
  ctx.save();

  if (options.shadow) {
    ctx.shadowColor = options.shadowColor || 'rgba(124, 58, 237, 0.45)';
    ctx.shadowBlur = options.shadowBlur || 30;
    ctx.shadowOffsetX = options.shadowOffsetX || 0;
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

  ctx.restore();
}

/* ========================================================================== */
/* 1. Generate Favicon & App Icons                                            */
/* ========================================================================== */
console.log('🎨 Generating Site Favicons & Icons...');

// A. 512x512 Master Icon (Canvas on Warm Ivory)
const icon512Canvas = createCanvas(512, 512);
{
  const ctx = icon512Canvas.getContext('2d');
  // Background Warm Ivory with soft rounded corners
  ctx.fillStyle = '#FAF8F5';
  ctx.fillRect(0, 0, 512, 512);

  // Subtle circular ambient aura
  const aura = ctx.createRadialGradient(256, 256, 40, 256, 256, 240);
  aura.addColorStop(0, 'rgba(124, 58, 237, 0.16)');
  aura.addColorStop(1, 'rgba(250, 248, 245, 0)');
  ctx.fillStyle = aura;
  ctx.fillRect(0, 0, 512, 512);

  // Centered slash glyph
  const sw = 200;
  const sh = 340;
  drawSlash(ctx, 256 - sw / 2, 256 - sh / 2, sw, sh, {
    shadow: true,
    shadowBlur: 24,
    shadowOffsetY: 8,
    shadowColor: 'rgba(124, 58, 237, 0.35)'
  });
}
const icon512Buf = icon512Canvas.toBuffer('image/png');

// B. 180x180 Apple Touch Icon (iOS home screen)
const appleIconCanvas = createCanvas(180, 180);
{
  const ctx = appleIconCanvas.getContext('2d');
  ctx.fillStyle = '#FAF8F5';
  ctx.fillRect(0, 0, 180, 180);

  // Soft border line
  ctx.strokeStyle = '#E8DFF2';
  ctx.lineWidth = 4;
  ctx.strokeRect(2, 2, 176, 176);

  const aura = ctx.createRadialGradient(90, 90, 15, 90, 90, 85);
  aura.addColorStop(0, 'rgba(124, 58, 237, 0.18)');
  aura.addColorStop(1, 'rgba(250, 248, 245, 0)');
  ctx.fillStyle = aura;
  ctx.fillRect(0, 0, 180, 180);

  const sw = 70;
  const sh = 120;
  drawSlash(ctx, 90 - sw / 2, 90 - sh / 2, sw, sh, {
    shadow: true,
    shadowBlur: 10,
    shadowOffsetY: 3,
    shadowColor: 'rgba(124, 58, 237, 0.35)'
  });
}
const appleIconBuf = appleIconCanvas.toBuffer('image/png');

// C. 48x48, 32x32, 16x16 Favicon PNGs
function renderFaviconPng(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  // Crisp transparent or ivory background
  // For favicon, slightly transparent warm ivory circle or square gives best contrast in both dark & light browser tabs
  const r = size * 0.2;
  ctx.fillStyle = '#FAF8F5';
  ctx.beginPath();
  ctx.roundRect(0, 0, size, size, r);
  ctx.fill();

  ctx.strokeStyle = '#E8DFF2';
  ctx.lineWidth = Math.max(1, size * 0.04);
  ctx.stroke();

  const sw = size * 0.46;
  const sh = size * 0.72;
  drawSlash(ctx, (size - sw) / 2, (size - sh) / 2, sw, sh, {
    shadow: size >= 32,
    shadowBlur: 4,
    shadowOffsetY: 1,
    shadowColor: 'rgba(124, 58, 237, 0.4)'
  });
  return canvas.toBuffer('image/png');
}

const p48 = renderFaviconPng(48);
const p32 = renderFaviconPng(32);
const p16 = renderFaviconPng(16);
const icoBuffer = createIco([p48, p32, p16], [48, 32, 16]);

// D. Scalable Vector SVG Favicon
const svgFavicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <rect width="64" height="64" rx="14" fill="#FAF8F5" stroke="#E8DFF2" stroke-width="2"/>
  <defs>
    <linearGradient id="swb-ico-grad" x1="12" y1="8" x2="52" y2="56" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#9333EA"/>
      <stop offset="50%" stop-color="#7C3AED"/>
      <stop offset="100%" stop-color="#6D28D9"/>
    </linearGradient>
    <filter id="swb-ico-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#7C3AED" flood-opacity="0.35"/>
    </filter>
  </defs>
  <polygon points="41.6,10 52.8,10 22.4,54 11.2,54" fill="url(#swb-ico-grad)" filter="url(#swb-ico-shadow)"/>
</svg>`;

// Save all icon files to both src/app and public
fs.writeFileSync('src/app/favicon.ico', icoBuffer);
fs.writeFileSync('public/favicon.ico', icoBuffer);

fs.writeFileSync('src/app/icon.svg', svgFavicon);
fs.writeFileSync('public/icon.svg', svgFavicon);

fs.writeFileSync('src/app/icon.png', p32);
fs.writeFileSync('public/icon.png', p32);

fs.writeFileSync('src/app/apple-icon.png', appleIconBuf);
fs.writeFileSync('public/apple-touch-icon.png', appleIconBuf);

console.log('✅ Favicons & Icons generated:');
console.log('  - src/app/favicon.ico & public/favicon.ico (Multi-size 48/32/16)');
console.log('  - src/app/icon.svg & public/icon.svg (Scalable vector)');
console.log('  - src/app/icon.png & public/icon.png (32x32)');
console.log('  - src/app/apple-icon.png & public/apple-touch-icon.png (180x180)');


/* ========================================================================== */
/* 2. Generate Open Graph (OG) Social Image (1200 x 630)                      */
/* ========================================================================== */
console.log('\n🎨 Generating 1200x630 Open Graph (OG) Preview Image...');

const ogWidth = 1200;
const ogHeight = 630;
const ogCanvas = createCanvas(ogWidth, ogHeight);
const ctx = ogCanvas.getContext('2d');

// 1. Background - Warm Ivory
ctx.fillStyle = '#FAF8F5';
ctx.fillRect(0, 0, ogWidth, ogHeight);

// 2. Subtle luxury ambient radial glows
const glow1 = ctx.createRadialGradient(980, 180, 30, 980, 180, 480);
glow1.addColorStop(0, 'rgba(124, 58, 237, 0.12)');
glow1.addColorStop(0.6, 'rgba(147, 51, 234, 0.05)');
glow1.addColorStop(1, 'rgba(250, 248, 245, 0)');
ctx.fillStyle = glow1;
ctx.fillRect(0, 0, ogWidth, ogHeight);

const glow2 = ctx.createRadialGradient(200, 520, 20, 200, 520, 320);
glow2.addColorStop(0, 'rgba(124, 58, 237, 0.06)');
glow2.addColorStop(1, 'rgba(250, 248, 245, 0)');
ctx.fillStyle = glow2;
ctx.fillRect(0, 0, ogWidth, ogHeight);

// 3. Elegant Outer Inset Border Card
ctx.save();
ctx.strokeStyle = '#E8DFF2';
ctx.lineWidth = 1.5;
ctx.beginPath();
ctx.roundRect(32, 32, ogWidth - 64, ogHeight - 64, 24);
ctx.stroke();

// Subtle grid accent inside the card
ctx.strokeStyle = 'rgba(232, 223, 242, 0.5)';
ctx.lineWidth = 1;
const gridStep = 72;
for (let x = 32 + gridStep; x < ogWidth - 32; x += gridStep) {
  ctx.beginPath();
  ctx.moveTo(x, 32);
  ctx.lineTo(x, 32 + 20);
  ctx.moveTo(x, ogHeight - 52);
  ctx.lineTo(x, ogHeight - 32);
  ctx.stroke();
}
for (let y = 32 + gridStep; y < ogHeight - 32; y += gridStep) {
  ctx.beginPath();
  ctx.moveTo(32, y);
  ctx.lineTo(52, y);
  ctx.moveTo(ogWidth - 52, y);
  ctx.lineTo(ogWidth - 32, y);
  ctx.stroke();
}
ctx.restore();

// 4. Studio Eyebrow Pill (Top-Left)
const pillX = 80;
const pillY = 76;
ctx.save();
ctx.fillStyle = '#F5EDFA';
ctx.strokeStyle = '#E8DFF2';
ctx.lineWidth = 1;
ctx.beginPath();
ctx.roundRect(pillX, pillY, 210, 36, 18);
ctx.fill();
ctx.stroke();

// Purple pulse indicator inside pill
ctx.fillStyle = '#7C3AED';
ctx.beginPath();
ctx.arc(pillX + 20, pillY + 18, 5, 0, Math.PI * 2);
ctx.fill();

ctx.font = '700 11px sans-serif';
ctx.fillStyle = '#7C3AED';
ctx.letterSpacing = '1px';
ctx.fillText('PREMIUM DIGITAL AGENCY', pillX + 34, pillY + 22);
ctx.restore();

// 5. Giant Geometric Slash Glyph Graphic on the Right
const glyphX = 830;
const glyphY = 90;
const glyphW = 270;
const glyphH = 430;

// Backing circular aura behind the glyph
const glyphAura = ctx.createRadialGradient(glyphX + glyphW / 2, glyphY + glyphH / 2, 50, glyphX + glyphW / 2, glyphY + glyphH / 2, 260);
glyphAura.addColorStop(0, 'rgba(124, 58, 237, 0.22)');
glyphAura.addColorStop(0.7, 'rgba(124, 58, 237, 0.04)');
glyphAura.addColorStop(1, 'rgba(250, 248, 245, 0)');
ctx.fillStyle = glyphAura;
ctx.fillRect(glyphX - 100, glyphY - 50, glyphW + 200, glyphH + 100);

drawSlash(ctx, glyphX, glyphY, glyphW, glyphH, {
  shadow: true,
  shadowBlur: 48,
  shadowOffsetY: 16,
  shadowColor: 'rgba(124, 58, 237, 0.4)'
});

// 6. Wordmark & Identity (Left)
ctx.save();
ctx.font = '800 48px sans-serif';
ctx.fillStyle = '#161124';
ctx.fillText('SoWeBuild', 80, 180);

// Purple dot after SoWeBuild
ctx.fillStyle = '#7C3AED';
ctx.fillText('.', 326, 180);

// Location / Status Badge next to wordmark
ctx.font = '500 12px monospace';
ctx.fillStyle = '#5A5068';
ctx.fillText('EST. MUMBAI // GLOBAL DELIVERY', 360, 168);
ctx.restore();

// 7. Punchy Studio Headline
ctx.save();
ctx.font = '700 40px sans-serif';
ctx.fillStyle = '#161124';
ctx.fillText('Building businesses & brands.', 80, 248);

// Gradient italic subhead
const textGrad = ctx.createLinearGradient(80, 0, 700, 0);
textGrad.addColorStop(0, '#7C3AED');
textGrad.addColorStop(1, '#9333EA');
ctx.fillStyle = textGrad;
ctx.font = 'italic 42px "Instrument Serif", Georgia, serif';
ctx.fillText('Websites, smart tools, and digital growth.', 80, 300);
ctx.restore();

// 8. Description paragraph
ctx.save();
ctx.font = '400 17px sans-serif';
ctx.fillStyle = '#5A5068';
const desc = 'We help businesses build a powerful online presence with premium websites,';
const desc2 = 'intelligent digital tools, and 100% full client ownership.';
ctx.fillText(desc, 80, 355);
ctx.fillText(desc2, 80, 382);
ctx.restore();

// 9. Value Badges (3 horizontal tags - NO EMOJIS)
const tags = [
  'Modern Websites & Apps',
  'WhatsApp & AI Automation',
  '100% Full Ownership'
];
let tagStartX = 80;
const tagY = 430;

tags.forEach((tag) => {
  ctx.save();
  ctx.font = '600 12px monospace';
  const metrics = ctx.measureText(tag);
  const tagW = metrics.width + 26;

  ctx.fillStyle = '#FFFFFF';
  ctx.strokeStyle = '#E8DFF2';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(tagStartX, tagY, tagW, 32, 8);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#161124';
  ctx.fillText(tag, tagStartX + 13, tagY + 20);
  ctx.restore();

  tagStartX += tagW + 12;
});

// 10. Footer Section inside Card
ctx.save();
ctx.strokeStyle = '#E8DFF2';
ctx.lineWidth = 1;
ctx.beginPath();
ctx.moveTo(80, 505);
ctx.lineTo(ogWidth - 80, 505);
ctx.stroke();

// Founder / Engineering Credit on Bottom Left
ctx.font = '500 13px monospace';
ctx.fillStyle = '#5A5068';
ctx.fillText('FOUNDER & ENGINEERING: ', 80, 546);

ctx.font = '700 13px monospace';
ctx.fillStyle = '#161124';
ctx.fillText('OM THAKUR', 260, 546);

// Website Domain Pill on Bottom Right
const urlPillW = 200;
const urlPillH = 38;
const urlPillX = ogWidth - 80 - urlPillW;
const urlPillY = 527;

ctx.fillStyle = '#161124';
ctx.beginPath();
ctx.roundRect(urlPillX, urlPillY, urlPillW, urlPillH, 10);
ctx.fill();

ctx.font = '700 14px monospace';
ctx.fillStyle = '#FAF8F5';
ctx.fillText('sowebuild.in', urlPillX + 36, urlPillY + 24);

// Purple arrow glyph
ctx.fillStyle = '#7C3AED';
ctx.fillText('↗', urlPillX + 160, urlPillY + 24);
ctx.restore();

// 11. Save OG Image Buffers
const ogPngBuf = ogCanvas.toBuffer('image/png');

// Next.js App Router root open graph image
fs.writeFileSync('src/app/opengraph-image.png', ogPngBuf);
fs.writeFileSync('src/app/twitter-image.png', ogPngBuf);

// Public static fallbacks for external bots and Schema.org
fs.writeFileSync('public/og-image.png', ogPngBuf);
fs.writeFileSync('public/og.png', ogPngBuf);

console.log('✅ Open Graph (OG) Images generated:');
console.log('  - src/app/opengraph-image.png (1200x630 App Router metadata)');
console.log('  - src/app/twitter-image.png (1200x630 Twitter Card)');
console.log('  - public/og-image.png (1200x630 Static fallback)');
console.log('  - public/og.png (1200x630 Short canonical)');

