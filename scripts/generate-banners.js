const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const BRAIN_DIR = 'C:/Users/AMIT SHARMA/.gemini/antigravity-ide/brain/f827629b-8f8e-40cb-994a-da4ccb3a055a';
const B2_SOURCE = path.join(BRAIN_DIR, 'luxe_glow_banner_v2_1791530127130.jpg');
const B3_SOURCE = path.join(BRAIN_DIR, 'aura_botanics_v2_1791530146711.jpg');

async function generateBanner2() {
  console.log('Generating Banner 2 (Luxe Glow) at 1600x639...');
  
  // 1. Prepare base photo: 1200 x 639
  const basePhoto = await sharp(B2_SOURCE)
    .resize(1200, 639, { fit: 'cover', position: 'left' })
    .toBuffer();

  // 2. Right background extension using dark silk texture
  const silkExtension = await sharp(B2_SOURCE)
    .extract({ left: 950, top: 100, width: 420, height: 560 })
    .resize(500, 639, { fit: 'fill' })
    .blur(1.5)
    .toBuffer();

  // 3. Composite base background
  const baseImage = await sharp({
    create: {
      width: 1600,
      height: 639,
      channels: 3,
      background: { r: 12, g: 10, b: 9 }
    }
  })
  .composite([
    { input: silkExtension, left: 1100, top: 0 },
    { input: basePhoto, left: 0, top: 0 }
  ])
  .png()
  .toBuffer();

  // 4. Ultra-luxury graphic overlay with SVG
  const overlaySvg = Buffer.from(`
  <svg width="1600" height="639" viewBox="0 0 1600 639" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="rightGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#0c0a09" stop-opacity="0" />
        <stop offset="30%" stop-color="#0c0a09" stop-opacity="0.75" />
        <stop offset="65%" stop-color="#0c0a09" stop-opacity="0.92" />
        <stop offset="100%" stop-color="#0c0a09" stop-opacity="0.97" />
      </linearGradient>
      <linearGradient id="goldBtn" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#e8be78" />
        <stop offset="100%" stop-color="#c99446" />
      </linearGradient>
      <linearGradient id="goldText" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="60%" stop-color="#fdf4e3" />
        <stop offset="100%" stop-color="#d4af37" />
      </linearGradient>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#000000" flood-opacity="0.8"/>
      </filter>
    </defs>

    <!-- Right Vignette -->
    <rect x="920" y="0" width="680" height="639" fill="url(#rightGrad)" />

    <!-- Top Left Brand Title -->
    <g transform="translate(45, 42)">
      <text x="0" y="24" font-family="'Cinzel', 'Playfair Display', Georgia, serif" font-size="28" font-weight="bold" letter-spacing="4" fill="#ffffff" filter="url(#shadow)">LUXE GLOW</text>
      <text x="0" y="46" font-family="'Inter', sans-serif" font-size="10" font-weight="bold" letter-spacing="3" fill="#d4af37">SKINCARE ATELIER</text>
      <text x="0" y="66" font-family="'Inter', sans-serif" font-size="11" letter-spacing="1.5" fill="#e2e8f0" opacity="0.9">RADIANCE REDEFINED, MADE FOR YOU.</text>
    </g>

    <!-- Bottom Left Main Headline -->
    <g transform="translate(45, 290)">
      <text x="0" y="44" font-family="'Playfair Display', Georgia, serif" font-size="46" font-weight="bold" fill="url(#goldText)" letter-spacing="-0.5" filter="url(#shadow)">Timeless</text>
      <text x="0" y="94" font-family="'Playfair Display', Georgia, serif" font-size="46" font-weight="bold" fill="url(#goldText)" letter-spacing="-0.5" filter="url(#shadow)">Radiance</text>
      <text x="0" y="142" font-family="'Inter', sans-serif" font-size="17" font-weight="900" letter-spacing="4" fill="#e8be78">VELVET GLOW ELIXIR</text>
      <text x="0" y="168" font-family="'Inter', sans-serif" font-size="11" font-weight="bold" letter-spacing="2" fill="#cbd5e1" opacity="0.95">PURE GOLD ESSENCE. YOUTHFUL GLOW.</text>
    </g>

    <!-- Right Feature Badges -->
    <!-- Feature 1 -->
    <g transform="translate(1230, 115)">
      <circle cx="22" cy="22" r="20" fill="#17120d" stroke="#e8be78" stroke-width="1.5" />
      <circle cx="22" cy="22" r="5" fill="none" stroke="#e8be78" stroke-width="1.5"/>
      <path d="M22 13v3 M22 28v3 M13 22h3 M28 22h3 M16 16l2 2 M26 26l2 2 M16 28l2-2 M26 16l2-2" stroke="#e8be78" stroke-width="1.4" stroke-linecap="round"/>
      <text x="56" y="18" font-family="'Inter', sans-serif" font-size="16" font-weight="bold" fill="#ffffff">Radiant Glow</text>
      <text x="56" y="36" font-family="'Inter', sans-serif" font-size="12" fill="#cbd5e1">A more luminous and even tone</text>
    </g>

    <!-- Feature 2 -->
    <g transform="translate(1230, 200)">
      <circle cx="22" cy="22" r="20" fill="#17120d" stroke="#e8be78" stroke-width="1.5" />
      <path d="M22 14 C22 14 15 23 15 27 C15 31 18 34 22 34 C26 34 29 31 29 27 C29 23 22 14 22 14 Z" fill="none" stroke="#e8be78" stroke-width="1.5"/>
      <text x="56" y="18" font-family="'Inter', sans-serif" font-size="16" font-weight="bold" fill="#ffffff">Anti-Aging</text>
      <text x="56" y="36" font-family="'Inter', sans-serif" font-size="12" fill="#cbd5e1">Firms and visibly softens fine lines</text>
    </g>

    <!-- Feature 3 -->
    <g transform="translate(1230, 285)">
      <circle cx="22" cy="22" r="20" fill="#17120d" stroke="#e8be78" stroke-width="1.5" />
      <path d="M22 14 C18 18 16 24 22 31 C28 24 26 18 22 14 Z" fill="none" stroke="#e8be78" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M22 20 L22 30" stroke="#e8be78" stroke-width="1.5" stroke-linecap="round"/>
      <text x="56" y="18" font-family="'Inter', sans-serif" font-size="16" font-weight="bold" fill="#ffffff">Deep Hydration</text>
      <text x="56" y="36" font-family="'Inter', sans-serif" font-size="12" fill="#cbd5e1">24-Hour continuous moisture barrier</text>
    </g>

    <!-- CTA Button -->
    <g transform="translate(1230, 375)">
      <rect x="0" y="0" width="235" height="48" rx="24" fill="url(#goldBtn)" filter="url(#shadow)"/>
      <text x="117" y="29" font-family="'Inter', sans-serif" font-size="14" font-weight="900" fill="#140e04" text-anchor="middle" letter-spacing="1.5">DISCOVER NOW →</text>
    </g>

    <!-- Bottom Bar (full 1600 width) -->
    <g transform="translate(0, 582)">
      <rect x="0" y="0" width="1600" height="57" fill="#060504" fill-opacity="0.96" />
      <line x1="0" y1="0" x2="1600" y2="0" stroke="#26201a" stroke-width="1" />
      
      <!-- Item 1 -->
      <g transform="translate(50, 17)">
        <circle cx="12" cy="12" r="10" fill="none" stroke="#e8be78" stroke-width="1.2"/>
        <path d="M8 12 l3 3 l6 -6" fill="none" stroke="#e8be78" stroke-width="1.5" stroke-linecap="round"/>
        <text x="30" y="16" font-family="'Inter', sans-serif" font-size="13" font-weight="600" fill="#ffffff">Dermatology Tested</text>
      </g>
      <line x1="235" y1="13" x2="235" y2="44" stroke="#3d332a" stroke-width="1" />

      <!-- Item 2 -->
      <g transform="translate(260, 17)">
        <path d="M12 4 C8 8 6 14 12 20 C18 14 16 8 12 4 Z M12 9 L12 18" fill="none" stroke="#e8be78" stroke-width="1.2"/>
        <text x="30" y="16" font-family="'Inter', sans-serif" font-size="13" font-weight="600" fill="#ffffff">Cruelty Free &amp; Vegan</text>
      </g>
      <line x1="470" y1="13" x2="470" y2="44" stroke="#3d332a" stroke-width="1" />

      <!-- Item 3 -->
      <g transform="translate(495, 17)">
        <circle cx="12" cy="12" r="9" fill="none" stroke="#e8be78" stroke-width="1.2"/>
        <circle cx="12" cy="12" r="4" fill="#e8be78"/>
        <text x="30" y="16" font-family="'Inter', sans-serif" font-size="13" font-weight="600" fill="#ffffff">Suitable For All Skin Types</text>
      </g>
    </g>
  </svg>
  `);

  await sharp(baseImage)
    .composite([
      { input: overlaySvg, top: 0, left: 0 }
    ])
    .jpeg({ quality: 95 })
    .toFile('public/images/heroes/banner-2.jpg');
    
  console.log('✅ banner-2.jpg successfully saved at 1600x639');
}

async function generateBanner3() {
  console.log('Generating Banner 3 (Aura Botanics) at 1600x639...');

  // 1. Prepare base photo: 1200 x 639
  const basePhoto = await sharp(B3_SOURCE)
    .resize(1200, 639, { fit: 'cover', position: 'left' })
    .toBuffer();

  // 2. Right background extension using light stone and foliage texture
  const stoneExtension = await sharp(B3_SOURCE)
    .extract({ left: 950, top: 100, width: 420, height: 560 })
    .resize(500, 639, { fit: 'fill' })
    .blur(1.5)
    .toBuffer();

  // 3. Composite base background
  const baseImage = await sharp({
    create: {
      width: 1600,
      height: 639,
      channels: 3,
      background: { r: 243, g: 238, b: 231 }
    }
  })
  .composite([
    { input: stoneExtension, left: 1100, top: 0 },
    { input: basePhoto, left: 0, top: 0 }
  ])
  .png()
  .toBuffer();

  // 4. Botanical luxury graphic overlay with SVG
  const overlaySvg = Buffer.from(`
  <svg width="1600" height="639" viewBox="0 0 1600 639" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="rightGradLight" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#f5efe6" stop-opacity="0" />
        <stop offset="25%" stop-color="#f5efe6" stop-opacity="0.8" />
        <stop offset="60%" stop-color="#f5efe6" stop-opacity="0.94" />
        <stop offset="100%" stop-color="#f5efe6" stop-opacity="0.98" />
      </linearGradient>
      <linearGradient id="botanicalBtn" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#2d4233" />
        <stop offset="100%" stop-color="#1b2a20" />
      </linearGradient>
      <filter id="lightShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000000" flood-opacity="0.15"/>
      </filter>
    </defs>

    <!-- Right Vignette for smooth contrast -->
    <rect x="1000" y="0" width="600" height="639" fill="url(#rightGradLight)" />

    <!-- Right Feature Badges -->
    <!-- Feature 1 -->
    <g transform="translate(1230, 115)">
      <circle cx="22" cy="22" r="20" fill="#e8dfd3" stroke="#38543e" stroke-width="1.5" />
      <path d="M22 13 C17 18 15 24 22 31 C29 24 27 18 22 13 Z" fill="none" stroke="#38543e" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M22 19 L22 29" stroke="#38543e" stroke-width="1.4" stroke-linecap="round"/>
      <text x="56" y="18" font-family="'Inter', sans-serif" font-size="16" font-weight="bold" fill="#221910">Deep Nourishing</text>
      <text x="56" y="36" font-family="'Inter', sans-serif" font-size="12" fill="#5c4e3e">Cold-pressed rosehip &amp; squalane</text>
    </g>

    <!-- Feature 2 -->
    <g transform="translate(1230, 200)">
      <circle cx="22" cy="22" r="20" fill="#e8dfd3" stroke="#38543e" stroke-width="1.5" />
      <path d="M22 14 C22 14 15 23 15 27 C15 31 18 34 22 34 C26 34 29 31 29 27 C29 23 22 14 22 14 Z" fill="none" stroke="#38543e" stroke-width="1.5"/>
      <text x="56" y="18" font-family="'Inter', sans-serif" font-size="16" font-weight="bold" fill="#221910">Moisture Lock</text>
      <text x="56" y="36" font-family="'Inter', sans-serif" font-size="12" fill="#5c4e3e">48-Hour sustained barrier hydration</text>
    </g>

    <!-- Feature 3 -->
    <g transform="translate(1230, 285)">
      <circle cx="22" cy="22" r="20" fill="#e8dfd3" stroke="#38543e" stroke-width="1.5" />
      <circle cx="22" cy="22" r="5" fill="none" stroke="#38543e" stroke-width="1.4"/>
      <path d="M22 13v3 M22 28v3 M13 22h3 M28 22h3 M16 16l2 2 M26 26l2 2" stroke="#38543e" stroke-width="1.3" stroke-linecap="round"/>
      <text x="56" y="18" font-family="'Inter', sans-serif" font-size="16" font-weight="bold" fill="#221910">Skin Soothing</text>
      <text x="56" y="36" font-family="'Inter', sans-serif" font-size="12" fill="#5c4e3e">Calms redness &amp; environmental stress</text>
    </g>

    <!-- CTA Button -->
    <g transform="translate(1230, 375)">
      <rect x="0" y="0" width="235" height="48" rx="24" fill="url(#botanicalBtn)" filter="url(#lightShadow)"/>
      <text x="117" y="29" font-family="'Inter', sans-serif" font-size="14" font-weight="900" fill="#fdfbf7" text-anchor="middle" letter-spacing="1.5">SHOP NOW →</text>
    </g>

    <!-- Bottom Bar (full 1600 width) -->
    <g transform="translate(0, 582)">
      <rect x="0" y="0" width="1600" height="57" fill="#e5ddd0" fill-opacity="0.97" />
      <line x1="0" y1="0" x2="1600" y2="0" stroke="#d4c9b9" stroke-width="1" />
      
      <!-- Item 1 -->
      <g transform="translate(50, 17)">
        <path d="M12 4 C8 8 6 14 12 20 C18 14 16 8 12 4 Z M12 9 L12 18" fill="none" stroke="#38543e" stroke-width="1.4"/>
        <text x="30" y="16" font-family="'Inter', sans-serif" font-size="13" font-weight="700" fill="#221910">Paraben Free</text>
      </g>
      <line x1="210" y1="13" x2="210" y2="44" stroke="#c4b8a6" stroke-width="1" />

      <!-- Item 2 -->
      <g transform="translate(235, 17)">
        <circle cx="12" cy="12" r="10" fill="none" stroke="#38543e" stroke-width="1.3"/>
        <path d="M8 12 l3 3 l6 -6" fill="none" stroke="#38543e" stroke-width="1.5" stroke-linecap="round"/>
        <text x="30" y="16" font-family="'Inter', sans-serif" font-size="13" font-weight="700" fill="#221910">Sulfate Free</text>
      </g>
      <line x1="400" y1="13" x2="400" y2="44" stroke="#c4b8a6" stroke-width="1" />

      <!-- Item 3 -->
      <g transform="translate(425, 17)">
        <circle cx="12" cy="12" r="9" fill="none" stroke="#38543e" stroke-width="1.3"/>
        <circle cx="12" cy="12" r="4" fill="#38543e"/>
        <text x="30" y="16" font-family="'Inter', sans-serif" font-size="13" font-weight="700" fill="#221910">100% Clean &amp; Natural</text>
      </g>
    </g>
  </svg>
  `);

  await sharp(baseImage)
    .composite([
      { input: overlaySvg, top: 0, left: 0 }
    ])
    .jpeg({ quality: 95 })
    .toFile('public/images/heroes/banner-3.jpg');
    
  console.log('✅ banner-3.jpg successfully saved at 1600x639');
}

async function main() {
  await generateBanner2();
  await generateBanner3();
  console.log('🎉 Both banners generated at exact 1600x639!');
}

main().catch(console.error);
