import { writeFile, mkdir } from 'node:fs/promises';

await mkdir('public/images/placeholders', { recursive: true });

// Common defs helper for luxury architectural rendering
function commonDefs(extraGradients = '') {
  return `
    <linearGradient id="warmWall" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EFECE6"/>
      <stop offset="45%" stop-color="#E5DFD4"/>
      <stop offset="100%" stop-color="#D6CEBF"/>
    </linearGradient>
    <linearGradient id="woodFloor" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#C2B29E"/>
      <stop offset="40%" stop-color="#B19F89"/>
      <stop offset="100%" stop-color="#9C8972"/>
    </linearGradient>
    <linearGradient id="windowLight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDFCF7" stop-opacity="0.85"/>
      <stop offset="60%" stop-color="#F4EEDB" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#E8DEC8" stop-opacity="0.1"/>
    </linearGradient>
    <linearGradient id="sunbeam" x1="0%" y1="0%" x2="80%" y2="100%">
      <stop offset="0%" stop-color="#FFFDF5" stop-opacity="0.32"/>
      <stop offset="60%" stop-color="#FFF8E7" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#FFF5D6" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="steelMullion" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#2D312E"/>
      <stop offset="50%" stop-color="#3B403C"/>
      <stop offset="100%" stop-color="#242725"/>
    </linearGradient>
    <linearGradient id="softLinen" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#DFD8CB"/>
      <stop offset="50%" stop-color="#EDE7DC"/>
      <stop offset="100%" stop-color="#D8D0C1"/>
    </linearGradient>
    <linearGradient id="darkLinen" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#565B54"/>
      <stop offset="50%" stop-color="#676D65"/>
      <stop offset="100%" stop-color="#4C504A"/>
    </linearGradient>
    <linearGradient id="sheerFabric" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FAF8F2" stop-opacity="0.75"/>
      <stop offset="50%" stop-color="#F2EDE2" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#EBE3D3" stop-opacity="0.75"/>
    </linearGradient>
    <filter id="softBlur" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="16"/>
    </filter>
    <filter id="deepBlur" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="32"/>
    </filter>
    <filter id="gentleShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#1D211F" flood-opacity="0.12"/>
    </filter>
    <pattern id="weavePattern" width="6" height="6" patternUnits="userSpaceOnUse">
      <path d="M0 3h6 M3 0v6" stroke="#9C9281" stroke-width="0.75" stroke-opacity="0.18"/>
    </pattern>
    <pattern id="microGrain" width="4" height="4" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="0.8" fill="#1D211F" fill-opacity="0.03"/>
    </pattern>
    ${extraGradients}
  `;
}

// 1. ROLLER BLINDS - MAIN HERO (Wide Living Space)
function generateRollerMain() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1100" viewBox="0 0 1600 1100">
    <defs>${commonDefs(`
      <linearGradient id="rollerScreen" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#ECE6DA"/>
        <stop offset="85%" stop-color="#E2D9CA"/>
        <stop offset="100%" stop-color="#D5CBB9"/>
      </linearGradient>
      <linearGradient id="bottomRail" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#9C9382"/>
        <stop offset="50%" stop-color="#B8AE9D"/>
        <stop offset="100%" stop-color="#8F8676"/>
      </linearGradient>
    `)}</defs>
    <!-- Wall & Floor -->
    <rect width="1600" height="1100" fill="url(#warmWall)"/>
    <path d="M0 800 L1600 800 L1600 1100 L0 1100 Z" fill="url(#woodFloor)"/>
    <line x1="0" y1="800" x2="1600" y2="800" stroke="#7E6F5A" stroke-width="2"/>
    
    <!-- Floor Planks perspective -->
    <path d="M120 800 L0 1100 M400 800 L240 1100 M750 800 L680 1100 M1100 800 L1140 1100 M1420 800 L1560 1100" stroke="#8A7A64" stroke-width="1.2" stroke-opacity="0.35"/>
    
    <!-- Architectural Window Opening -->
    <rect x="620" y="60" width="860" height="710" fill="#E2DACB" rx="2"/>
    <rect x="640" y="80" width="820" height="670" fill="url(#windowLight)"/>
    
    <!-- Blurred Outdoor Landscape / Courtyard Foliage -->
    <g filter="url(#deepBlur)" opacity="0.45">
      <ellipse cx="780" cy="500" rx="140" ry="240" fill="#717D62"/>
      <ellipse cx="1080" cy="560" rx="200" ry="180" fill="#5F6D52"/>
      <ellipse cx="1380" cy="460" rx="130" ry="260" fill="#7D8A6D"/>
    </g>
    
    <!-- Window Framing (Matte Architectural Steel) -->
    <rect x="640" y="80" width="820" height="670" fill="none" stroke="url(#steelMullion)" stroke-width="14"/>
    <line x1="1050" y1="80" x2="1050" y2="750" stroke="url(#steelMullion)" stroke-width="10"/>
    <line x1="640" y1="460" x2="1460" y2="460" stroke="url(#steelMullion)" stroke-width="8"/>
    
    <!-- Roller Blinds System (Dual Windows) -->
    <!-- Left Blind (Lowered to middle) -->
    <rect x="648" y="88" width="395" height="340" fill="url(#rollerScreen)"/>
    <rect x="648" y="88" width="395" height="340" fill="url(#weavePattern)"/>
    <rect x="645" y="428" width="401" height="12" fill="url(#bottomRail)" rx="2"/>
    <rect x="642" y="82" width="407" height="16" fill="url(#steelMullion)" rx="3"/>
    
    <!-- Right Blind (Lowered slightly higher) -->
    <rect x="1057" y="88" width="395" height="260" fill="url(#rollerScreen)"/>
    <rect x="1057" y="88" width="395" height="260" fill="url(#weavePattern)"/>
    <rect x="1054" y="348" width="401" height="12" fill="url(#bottomRail)" rx="2"/>
    <rect x="1051" y="82" width="407" height="16" fill="url(#steelMullion)" rx="3"/>

    <!-- Soft Sunlight Shaft Casting on Floor & Wall -->
    <polygon points="648,440 1043,440 680,1050 160,1050" fill="url(#sunbeam)"/>
    <polygon points="1057,360 1452,360 1480,1050 920,1050" fill="url(#sunbeam)"/>
    
    <!-- Sculptural Interior Furniture (Left Foreground) -->
    <!-- Low Travertine / Oak Daybed / Sofa -->
    <g filter="url(#gentleShadow)">
      <rect x="90" y="660" width="480" height="170" rx="16" fill="#D9D2C3"/>
      <rect x="110" y="640" width="220" height="130" rx="14" fill="#E8E2D5"/>
      <rect x="340" y="640" width="210" height="130" rx="14" fill="#E8E2D5"/>
      <rect x="70" y="730" width="520" height="90" rx="12" fill="#D0C8B7"/>
      <!-- Cylindrical Oak Legs -->
      <rect x="130" y="820" width="22" height="60" rx="4" fill="#756450"/>
      <rect x="520" y="820" width="22" height="60" rx="4" fill="#756450"/>
    </g>
    
    <!-- Low Travertine Cocktail Table & Ceramic Vessel -->
    <g filter="url(#gentleShadow)">
      <ellipse cx="680" cy="940" rx="190" ry="55" fill="#C8BEAC"/>
      <ellipse cx="680" cy="932" rx="188" ry="53" fill="#DFD7C7"/>
      <path d="M640 890 Q655 860 675 860 Q695 860 710 890 Z" fill="#948774"/>
      <ellipse cx="675" cy="860" rx="18" ry="6" fill="#AEA18E"/>
    </g>
    
    <!-- Architectural Olive Tree / Ceramic Planter (Right) -->
    <g filter="url(#gentleShadow)">
      <ellipse cx="1470" cy="910" rx="65" ry="18" fill="#70624E"/>
      <path d="M1415 760 L1430 905 Q1470 918 1510 905 L1525 760 Z" fill="#9E927F"/>
      <ellipse cx="1470" cy="760" rx="55" ry="14" fill="#B5A996"/>
      <!-- Delicate Organic Branches & Leaves -->
      <path d="M1470 760 Q1450 620 1380 480 M1460 660 Q1520 540 1550 420 M1430 580 Q1360 480 1320 380" stroke="#5E634F" stroke-width="4" fill="none"/>
      <ellipse cx="1375" cy="475" rx="20" ry="45" transform="rotate(-35 1375 475)" fill="#687355"/>
      <ellipse cx="1325" cy="385" rx="18" ry="40" transform="rotate(-50 1325 385)" fill="#768361"/>
      <ellipse cx="1545" cy="425" rx="22" ry="48" transform="rotate(25 1545 425)" fill="#636D51"/>
      <ellipse cx="1430" cy="530" rx="19" ry="42" transform="rotate(-20 1430 530)" fill="#788663"/>
    </g>
    
    <!-- Micro Grain Overlay for High-End Print Look -->
    <rect width="1600" height="1100" fill="url(#microGrain)"/>
  </svg>`;
}

// 2. ROMAN BLINDS - MAIN HERO (Tailored Fabric Cascades)
function generateRomanMain() {
  const folds = Array.from({ length: 6 }, (_, i) => {
    const y = 90 + i * 62;
    return `
      <!-- Fold Panel ${i + 1} -->
      <path d="M648 ${y} L1452 ${y} L1452 ${y + 68} Q1050 ${y + 86} 648 ${y + 68} Z" fill="url(#romanFold)"/>
      <path d="M648 ${y} L1452 ${y} L1452 ${y + 68} Q1050 ${y + 86} 648 ${y + 68} Z" fill="url(#weavePattern)"/>
      <!-- Under-fold shadow crease -->
      <path d="M648 ${y + 68} Q1050 ${y + 86} 1452 ${y + 68}" stroke="#867761" stroke-width="4" stroke-opacity="0.5" fill="none"/>
      <path d="M648 ${y + 70} Q1050 ${y + 88} 1452 ${y + 70}" stroke="#FFFDF8" stroke-width="1.5" stroke-opacity="0.35" fill="none"/>
    `;
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1100" viewBox="0 0 1600 1100">
    <defs>${commonDefs(`
      <linearGradient id="romanFold" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#EBE4D5"/>
        <stop offset="60%" stop-color="#DDD3C0"/>
        <stop offset="92%" stop-color="#C2B59F"/>
        <stop offset="100%" stop-color="#9C8E79"/>
      </linearGradient>
    `)}</defs>
    <!-- Background & Wood Flooring -->
    <rect width="1600" height="1100" fill="url(#warmWall)"/>
    <path d="M0 810 L1600 810 L1600 1100 L0 1100 Z" fill="url(#woodFloor)"/>
    <line x1="0" y1="810" x2="1600" y2="810" stroke="#7A6B56" stroke-width="2"/>
    <path d="M220 810 L80 1100 M600 810 L510 1100 M1020 810 L1060 1100 M1380 810 L1490 1100" stroke="#8A7A64" stroke-width="1.2" stroke-opacity="0.35"/>
    
    <!-- Grand Window -->
    <rect x="620" y="60" width="860" height="710" fill="#E0D7C6" rx="3"/>
    <rect x="640" y="80" width="820" height="670" fill="url(#windowLight)"/>
    <g filter="url(#deepBlur)" opacity="0.4">
      <ellipse cx="850" cy="520" rx="160" ry="220" fill="#6A775C"/>
      <ellipse cx="1250" cy="480" rx="220" ry="260" fill="#758266"/>
    </g>
    <rect x="640" y="80" width="820" height="670" fill="none" stroke="url(#steelMullion)" stroke-width="14"/>
    <line x1="1050" y1="80" x2="1050" y2="750" stroke="url(#steelMullion)" stroke-width="8"/>

    <!-- Roman Blinds Soft Stack -->
    <rect x="640" y="74" width="820" height="18" fill="url(#steelMullion)" rx="2"/>
    ${folds}

    <!-- Sunlight Glow on Folds & Floor -->
    <polygon points="648,470 1452,470 1520,1060 380,1060" fill="url(#sunbeam)"/>
    
    <!-- Sculptural Lounge Chair (Pierre Jeanneret / Scandi influence) -->
    <g filter="url(#gentleShadow)">
      <!-- Angled Compass Wood Legs -->
      <polygon points="260,930 278,930 360,780 342,780" fill="#665440"/>
      <polygon points="450,930 432,930 350,780 368,780" fill="#665440"/>
      <!-- Linen Upholstered Cushion & Back -->
      <rect x="220" y="760" width="280" height="70" rx="12" fill="#E8E1D2"/>
      <polygon points="220,770 200,600 480,600 500,770" fill="#DDD5C4"/>
      <rect x="230" y="615" width="240" height="135" rx="10" fill="#EFE9DD"/>
      <!-- Lumbar Roll Pillow -->
      <ellipse cx="350" cy="740" rx="90" ry="22" fill="#C5B8A1"/>
    </g>
    
    <!-- Minimalist Oak Side Pedestal & Textured Ceramic Vase -->
    <g filter="url(#gentleShadow)">
      <rect x="600" y="820" width="110" height="180" rx="6" fill="#998772"/>
      <rect x="604" y="824" width="102" height="172" rx="4" fill="#AD9A84"/>
      <!-- Ceramic Sculptural Vessel -->
      <path d="M635 820 Q620 740 655 740 Q690 740 675 820 Z" fill="#D3C9B8"/>
      <ellipse cx="655" cy="740" rx="15" ry="5" fill="#FAF5EC"/>
      <path d="M655 740 Q660 660 680 610" stroke="#7A8068" stroke-width="3" fill="none"/>
      <ellipse cx="680" cy="610" rx="12" ry="24" transform="rotate(15 680 610)" fill="#788465"/>
    </g>

    <rect width="1600" height="1100" fill="url(#microGrain)"/>
  </svg>`;
}

// 3. VENETIAN BLINDS - MAIN HERO (Crisp Slats & Linear Shadows)
function generateVenetianMain() {
  const slats = Array.from({ length: 28 }, (_, i) => {
    const y = 92 + i * 22;
    return `
      <!-- Slat ${i + 1} -->
      <path d="M648 ${y} L1452 ${y} L1448 ${y + 14} L652 ${y + 14} Z" fill="url(#timberSlat)"/>
      <line x1="648" y1="${y}" x2="1452" y2="${y}" stroke="#FFFDF8" stroke-width="1" stroke-opacity="0.4"/>
      <line x1="652" y1="${y + 14}" x2="1448" y2="${y + 14}" stroke="#78664D" stroke-width="1.2" stroke-opacity="0.5"/>
    `;
  }).join('');

  // Linear shadow stripes on floor and wall
  const shadowStripes = Array.from({ length: 18 }, (_, i) => {
    const y = 820 + i * 16;
    return `<polygon points="560,${y} 1450,${y} 1420,${y + 8} 530,${y + 8}" fill="#786955" opacity="0.18"/>`;
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1100" viewBox="0 0 1600 1100">
    <defs>${commonDefs(`
      <linearGradient id="timberSlat" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#E0D2BD"/>
        <stop offset="45%" stop-color="#CCBDA5"/>
        <stop offset="100%" stop-color="#A8967C"/>
      </linearGradient>
      <linearGradient id="ladderTape" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#80705B"/>
        <stop offset="50%" stop-color="#9C8C77"/>
        <stop offset="100%" stop-color="#73634E"/>
      </linearGradient>
    `)}</defs>
    <!-- Wall & Floor -->
    <rect width="1600" height="1100" fill="url(#warmWall)"/>
    <path d="M0 810 L1600 810 L1600 1100 L0 1100 Z" fill="url(#woodFloor)"/>
    <line x1="0" y1="810" x2="1600" y2="810" stroke="#7A6B56" stroke-width="2"/>
    
    <!-- Architectural Window -->
    <rect x="620" y="60" width="860" height="710" fill="#DED6C4" rx="2"/>
    <rect x="640" y="80" width="820" height="670" fill="url(#windowLight)"/>
    <g filter="url(#deepBlur)" opacity="0.42">
      <ellipse cx="800" cy="500" rx="180" ry="200" fill="#657256"/>
      <ellipse cx="1200" cy="540" rx="220" ry="240" fill="#758266"/>
    </g>
    <rect x="640" y="80" width="820" height="670" fill="none" stroke="url(#steelMullion)" stroke-width="14"/>

    <!-- Slats -->
    ${slats}

    <!-- Vertical Woven Ladder Tapes -->
    <rect x="820" y="86" width="12" height="624" fill="url(#ladderTape)"/>
    <rect x="1050" y="86" width="12" height="624" fill="url(#ladderTape)"/>
    <rect x="1280" y="86" width="12" height="624" fill="url(#ladderTape)"/>

    <!-- Heavy Bottom Rail -->
    <rect x="646" y="708" width="808" height="20" rx="3" fill="#8C7B65"/>

    <!-- Linear Shadows Cast Across Interior Floor -->
    ${shadowStripes}

    <!-- Minimalist Architectural Desk & Stool (Left) -->
    <g filter="url(#gentleShadow)">
      <!-- Solid Oak Worktop -->
      <polygon points="120,720 540,720 500,742 80,742" fill="#BDB09D"/>
      <polygon points="80,742 500,742 500,754 80,754" fill="#968875"/>
      <!-- Sled Frame Metal Legs -->
      <path d="M120,754 L120,950 L160,950 M460,754 L460,950 L500,950" stroke="#383D39" stroke-width="12" fill="none"/>
      <!-- Sculptural Oak Task Stool -->
      <ellipse cx="310" cy="840" rx="65" ry="22" fill="#C4B7A4"/>
      <polygon points="270,850 250,960 270,960 286,850" fill="#615240"/>
      <polygon points="350,850 370,960 350,960 334,850" fill="#615240"/>
    </g>

    <rect width="1600" height="1100" fill="url(#microGrain)"/>
  </svg>`;
}

// 4. CURTAINS - MAIN OVERVIEW & HERO
function generateCurtainsOverview() {
  const waveFolds = (startX, width, count) => {
    return Array.from({ length: count }, (_, i) => {
      const step = width / count;
      const x = startX + i * step;
      return `
        <path d="M${x} 80 Q${x + step * 0.5} 70 ${x + step} 80 L${x + step + 6} 800 Q${x + step * 0.5} 815 ${x - 4} 800 Z" fill="url(#sheerDrape)"/>
        <path d="M${x + step * 0.5} 75 L${x + step * 0.5} 805" stroke="#FFFDF8" stroke-width="2" stroke-opacity="0.4" fill="none"/>
        <path d="M${x} 80 L${x - 4} 800" stroke="#8A7E6B" stroke-width="3" stroke-opacity="0.3" fill="none"/>
      `;
    }).join('');
  };

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1100" viewBox="0 0 1600 1100">
    <defs>${commonDefs(`
      <linearGradient id="sheerDrape" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#DDD5C4" stop-opacity="0.85"/>
        <stop offset="35%" stop-color="#F7F3EA" stop-opacity="0.95"/>
        <stop offset="70%" stop-color="#EAE3D5" stop-opacity="0.88"/>
        <stop offset="100%" stop-color="#C5BBA7" stop-opacity="0.85"/>
      </linearGradient>
    `)}</defs>
    <!-- High Ceiling Wall & Wood Floor -->
    <rect width="1600" height="1100" fill="url(#warmWall)"/>
    <path d="M0 800 L1600 800 L1600 1100 L0 1100 Z" fill="url(#woodFloor)"/>
    <line x1="0" y1="800" x2="1600" y2="800" stroke="#7E6F5A" stroke-width="2"/>
    <path d="M140 800 L0 1100 M450 800 L320 1100 M800 800 L760 1100 M1180 800 L1240 1100 M1450 800 L1580 1100" stroke="#8A7A64" stroke-width="1.2" stroke-opacity="0.35"/>
    
    <!-- Floor-to-Ceiling Picture Window -->
    <rect x="520" y="60" width="960" height="740" fill="#E2DACB" rx="2"/>
    <rect x="540" y="80" width="920" height="710" fill="url(#windowLight)"/>
    <g filter="url(#deepBlur)" opacity="0.45">
      <ellipse cx="780" cy="500" rx="180" ry="240" fill="#6B785D"/>
      <ellipse cx="1180" cy="460" rx="240" ry="280" fill="#7D8A6D"/>
    </g>
    <!-- Slimline Ceiling Recessed Track -->
    <rect x="480" y="68" width="1040" height="12" fill="url(#steelMullion)" rx="2"/>

    <!-- Left Curtain Stack -->
    ${waveFolds(480, 240, 6)}
    <!-- Right Curtain Stack -->
    ${waveFolds(1280, 240, 6)}

    <!-- Sunlight Shaft Through Center Sheer Opening -->
    <polygon points="720,80 1280,80 1520,1050 480,1050" fill="url(#sunbeam)"/>
    
    <!-- Sculptural Daybed (Left) -->
    <g filter="url(#gentleShadow)">
      <rect x="90" y="680" width="440" height="140" rx="16" fill="#D3C9B8"/>
      <rect x="110" y="660" width="400" height="120" rx="14" fill="#E5DFD2"/>
      <rect x="120" y="820" width="20" height="50" rx="4" fill="#665440"/>
      <rect x="490" y="820" width="20" height="50" rx="4" fill="#665440"/>
    </g>

    <!-- Floor Mirror / Travertine Pedestal (Right) -->
    <g filter="url(#gentleShadow)">
      <rect x="1360" y="830" width="120" height="170" rx="4" fill="#BDB09E"/>
      <rect x="1365" y="834" width="110" height="162" rx="2" fill="#D3C7B6"/>
      <ellipse cx="1420" cy="830" rx="40" ry="14" fill="#998A77"/>
    </g>

    <rect width="1600" height="1100" fill="url(#microGrain)"/>
  </svg>`;
}

// 5. SHEER CURTAINS (Light, Translucent, Airy)
function generateSheerCurtains() {
  const sheers = Array.from({ length: 16 }, (_, i) => {
    const x = 540 + i * 58;
    return `
      <path d="M${x} 74 Q${x + 28} 62 ${x + 56} 74 L${x + 60} 805 Q${x + 28} 820 ${x - 4} 805 Z" fill="url(#sheerFlow)"/>
      <path d="M${x + 28} 68 L${x + 28} 812" stroke="#FFFDF8" stroke-width="2" stroke-opacity="0.45" fill="none"/>
    `;
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1100" viewBox="0 0 1600 1100">
    <defs>${commonDefs(`
      <linearGradient id="sheerFlow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#FDFBF7" stop-opacity="0.75"/>
        <stop offset="40%" stop-color="#F4EFE6" stop-opacity="0.6"/>
        <stop offset="80%" stop-color="#EBE3D3" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="#DDD3C0" stop-opacity="0.7"/>
      </linearGradient>
    `)}</defs>
    <rect width="1600" height="1100" fill="url(#warmWall)"/>
    <path d="M0 800 L1600 800 L1600 1100 L0 1100 Z" fill="url(#woodFloor)"/>
    
    <!-- Floor-to-Ceiling Windows -->
    <rect x="520" y="60" width="980" height="740" fill="url(#windowLight)"/>
    <g filter="url(#deepBlur)" opacity="0.5">
      <ellipse cx="800" cy="500" rx="200" ry="260" fill="#717E63"/>
      <ellipse cx="1200" cy="460" rx="260" ry="300" fill="#828F72"/>
    </g>
    <rect x="510" y="64" width="1000" height="12" fill="url(#steelMullion)" rx="2"/>

    <!-- Continuous Sheer Linen Wave Across All Windows -->
    ${sheers}

    <!-- Diffused Morning Sunlight -->
    <polygon points="540,74 1480,74 1580,1080 320,1080" fill="url(#sunbeam)"/>
    
    <!-- Minimalist Sculptural Chair -->
    <g filter="url(#gentleShadow)">
      <ellipse cx="280" cy="850" rx="120" ry="40" fill="#D3C9B8"/>
      <path d="M200 780 Q280 730 360 780 L340 850 Q280 840 220 850 Z" fill="#E8E2D5"/>
    </g>
    <rect width="1600" height="1100" fill="url(#microGrain)"/>
  </svg>`;
}

// 6. BLOCKOUT CURTAINS (Substantial, Restful, Deep Drapes)
function generateBlockoutCurtains() {
  const drapes = (startX, width, count) => {
    return Array.from({ length: count }, (_, i) => {
      const step = width / count;
      const x = startX + i * step;
      return `
        <!-- Pinch Pleat Heading Accent -->
        <polygon points="${x + 6},68 ${x + step - 6},68 ${x + step * 0.5 + 4},94 ${x + step * 0.5 - 4},94" fill="#3D403D"/>
        <!-- Heavy Fabric Fold -->
        <path d="M${x + step * 0.5 - 4} 94 L${x + step * 0.5 + 4} 94 L${x + step + 12} 805 Q${x + step * 0.5} 820 ${x - 8} 805 Z" fill="url(#blockoutFold)"/>
        <!-- Deep Crease Shadow -->
        <path d="M${x + step * 0.5} 94 L${x + step * 0.5 + 2} 810" stroke="#2B2E2C" stroke-width="4" stroke-opacity="0.45" fill="none"/>
        <path d="M${x - 6} 805 Q${x + step * 0.5} 820 ${x + step + 10} 805" stroke="#1D201E" stroke-width="3" stroke-opacity="0.6" fill="none"/>
      `;
    }).join('');
  };

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1100" viewBox="0 0 1600 1100">
    <defs>${commonDefs(`
      <linearGradient id="blockoutFold" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#4B4E49"/>
        <stop offset="35%" stop-color="#666B63"/>
        <stop offset="70%" stop-color="#555A53"/>
        <stop offset="100%" stop-color="#3B3E39"/>
      </linearGradient>
    `)}</defs>
    <!-- Deep Mood Room -->
    <rect width="1600" height="1100" fill="#DDD7CB"/>
    <path d="M0 800 L1600 800 L1600 1100 L0 1100 Z" fill="url(#woodFloor)"/>
    
    <!-- Window Behind -->
    <rect x="520" y="60" width="980" height="740" fill="#D3CABE"/>
    <rect x="540" y="80" width="940" height="700" fill="url(#windowLight)"/>
    
    <!-- Substantial Outer Blockout Drapes Framed Across Room -->
    ${drapes(460, 360, 7)}
    ${drapes(1180, 360, 7)}

    <!-- Travertine Nightstand & Brass Lamp -->
    <g filter="url(#gentleShadow)">
      <rect x="180" y="740" width="160" height="180" rx="8" fill="#BDB3A1"/>
      <ellipse cx="260" cy="740" rx="80" ry="18" fill="#D3C9B8"/>
      <!-- Brass Reading Lamp -->
      <line x1="260" y1="740" x2="260" y2="580" stroke="#C4A872" stroke-width="6"/>
      <path d="M220 580 L300 580 L280 520 L240 520 Z" fill="#C4A872"/>
    </g>

    <rect width="1600" height="1100" fill="url(#microGrain)"/>
  </svg>`;
}

// 7. LAYERED CURTAINS (Double Track: Sheer + Blockout)
function generateLayeredCurtains() {
  const sheers = Array.from({ length: 12 }, (_, i) => {
    const x = 620 + i * 58;
    return `
      <path d="M${x} 74 Q${x + 28} 62 ${x + 56} 74 L${x + 60} 805 Q${x + 28} 820 ${x - 4} 805 Z" fill="url(#sheerFlow)"/>
      <path d="M${x + 28} 68 L${x + 28} 812" stroke="#FFFDF8" stroke-width="1.8" stroke-opacity="0.4" fill="none"/>
    `;
  }).join('');

  const drapes = (startX, width) => {
    return Array.from({ length: 5 }, (_, i) => {
      const step = width / 5;
      const x = startX + i * step;
      return `
        <polygon points="${x + 6},68 ${x + step - 6},68 ${x + step * 0.5 + 4},94 ${x + step * 0.5 - 4},94" fill="#3D403D"/>
        <path d="M${x + step * 0.5 - 4} 94 L${x + step * 0.5 + 4} 94 L${x + step + 12} 805 Q${x + step * 0.5} 820 ${x - 8} 805 Z" fill="url(#darkLinen)"/>
        <path d="M${x + step * 0.5} 94 L${x + step * 0.5 + 2} 810" stroke="#2B2E2C" stroke-width="4" stroke-opacity="0.45" fill="none"/>
      `;
    }).join('');
  };

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1100" viewBox="0 0 1600 1100">
    <defs>${commonDefs(`
      <linearGradient id="sheerFlow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#FDFBF7" stop-opacity="0.75"/>
        <stop offset="40%" stop-color="#F4EFE6" stop-opacity="0.6"/>
        <stop offset="80%" stop-color="#EBE3D3" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="#DDD3C0" stop-opacity="0.7"/>
      </linearGradient>
    `)}</defs>
    <rect width="1600" height="1100" fill="url(#warmWall)"/>
    <path d="M0 800 L1600 800 L1600 1100 L0 1100 Z" fill="url(#woodFloor)"/>
    
    <!-- Floor-to-Ceiling Windows -->
    <rect x="520" y="60" width="980" height="740" fill="url(#windowLight)"/>
    <rect x="510" y="64" width="1000" height="16" fill="url(#steelMullion)" rx="2"/>

    <!-- Inner Layer: Sheer Curtains -->
    ${sheers}

    <!-- Outer Layer: Heavy Drapes Stacked to the Sides -->
    ${drapes(440, 240)}
    ${drapes(1320, 240)}

    <!-- Sunlight Shaft -->
    <polygon points="680,80 1320,80 1480,1080 480,1080" fill="url(#sunbeam)"/>
    <rect width="1600" height="1100" fill="url(#microGrain)"/>
  </svg>`;
}

// 8. DETAIL 01 - ROOM SETTINGS (Dedicated Architectural Vignettes)
function generateDetail01(category) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
    <defs>${commonDefs()}</defs>
    <!-- Room vignette -->
    <rect width="1200" height="900" fill="url(#warmWall)"/>
    <path d="M0 640 L1200 640 L1200 900 L0 900 Z" fill="url(#woodFloor)"/>
    
    <!-- Window with ${category} styling -->
    <rect x="350" y="60" width="750" height="580" fill="url(#windowLight)"/>
    <rect x="350" y="60" width="750" height="580" fill="none" stroke="url(#steelMullion)" stroke-width="12"/>
    <line x1="725" y1="60" x2="725" y2="640" stroke="url(#steelMullion)" stroke-width="8"/>
    
    <!-- Interior treatment based on category -->
    ${category.includes('roller') ? `
      <rect x="356" y="66" width="365" height="260" fill="url(#softLinen)"/>
      <rect x="356" y="66" width="365" height="260" fill="url(#weavePattern)"/>
      <rect x="354" y="326" width="369" height="10" fill="#9C9382" rx="2"/>
      <rect x="733" y="66" width="361" height="180" fill="url(#softLinen)"/>
      <rect x="733" y="66" width="361" height="180" fill="url(#weavePattern)"/>
      <rect x="731" y="246" width="365" height="10" fill="#9C9382" rx="2"/>
    ` : category.includes('roman') ? `
      ${Array.from({ length: 5 }, (_, i) => `<path d="M356 ${66 + i * 50}h738v56q-369 18-738 0z" fill="url(#softLinen)"/><path d="M356 ${120 + i * 50}q369 14 738 0" stroke="#8E806D" stroke-width="2.5" fill="none"/>`).join('')}
    ` : category.includes('venetian') ? `
      ${Array.from({ length: 22 }, (_, i) => `<rect x="356" y="${66 + i * 22}" width="738" height="14" fill="#C2B29A" rx="1"/><line x1="356" y1="${66 + i * 22}" x2="1094" y2="${66 + i * 22}" stroke="#FFF" stroke-width="0.8" opacity="0.4"/>`).join('')}
    ` : `
      <!-- Curtains Room Setting -->
      ${Array.from({ length: 12 }, (_, i) => `<path d="M${350 + i * 62} 60 Q${380 + i * 62} 50 ${412 + i * 62} 60 L${416 + i * 62} 640 Q${380 + i * 62} 650 ${346 + i * 62} 640 Z" fill="url(#sheerFabric)"/>`).join('')}
    `}

    <!-- Lounge Vignette -->
    <g filter="url(#gentleShadow)">
      <rect x="80" y="520" width="320" height="220" rx="16" fill="#DDD6C7"/>
      <rect x="100" y="500" width="280" height="140" rx="12" fill="#EAE4D7"/>
      <rect x="120" y="740" width="16" height="50" rx="3" fill="#665440"/>
      <rect x="360" y="740" width="16" height="50" rx="3" fill="#665440"/>
    </g>
    <rect width="1200" height="900" fill="url(#microGrain)"/>
  </svg>`;
}

// 9. DETAIL 02 - MATERIAL & TEXTURE CLOSE-UP (High Zoom Fabric / Slat Macro)
function generateDetail02(category) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
    <defs>${commonDefs(`
      <linearGradient id="macroWeave" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#F2EDE2"/>
        <stop offset="50%" stop-color="#E2D8C7"/>
        <stop offset="100%" stop-color="#C5B9A4"/>
      </linearGradient>
    `)}</defs>
    <!-- Background Canvas -->
    <rect width="1200" height="900" fill="url(#macroWeave)"/>
    
    <!-- High-Definition Macro Texture Representation -->
    ${category.includes('venetian') ? `
      <!-- Close up timber grain and beveled edge -->
      ${Array.from({ length: 7 }, (_, i) => {
        const y = 80 + i * 115;
        return `
          <rect x="80" y="${y}" width="1040" height="85" rx="6" fill="#CBBBA4"/>
          <line x1="80" y1="${y}" x2="1120" y2="${y}" stroke="#FFFDF8" stroke-width="2.5" opacity="0.6"/>
          <line x1="80" y1="${y + 85}" x2="1120" y2="${y + 85}" stroke="#7A6851" stroke-width="3" opacity="0.5"/>
          <!-- Subtle wood grain waves -->
          <path d="M120 ${y + 35} Q450 ${y + 20} 800 ${y + 40} T1080 ${y + 30}" stroke="#A6947D" stroke-width="1.5" fill="none" opacity="0.4"/>
        `;
      }).join('')}
      <!-- Ladder cord close-up -->
      <rect x="360" y="40" width="24" height="820" fill="#7D6D58" rx="2"/>
      <rect x="840" y="40" width="24" height="820" fill="#7D6D58" rx="2"/>
    ` : category.includes('roman') ? `
      <!-- Roman blind tailored fold pocket & stitch line -->
      <rect x="100" y="100" width="1000" height="320" rx="12" fill="#E8DFD0"/>
      <rect x="100" y="100" width="1000" height="320" fill="url(#weavePattern)"/>
      <path d="M100 390 L1100 390 L1100 440 Q600 480 100 440 Z" fill="#C5B8A3"/>
      <!-- Tailored stitch line -->
      <line x1="120" y1="390" x2="1080" y2="390" stroke="#7A6E5C" stroke-width="3" stroke-dasharray="8 6"/>
      <!-- Second cascade fold below -->
      <rect x="100" y="440" width="1000" height="360" rx="12" fill="#DDD3C2"/>
      <rect x="100" y="440" width="1000" height="360" fill="url(#weavePattern)"/>
    ` : `
      <!-- Textured Woven Fabric Macro -->
      <rect x="120" y="80" width="960" height="740" rx="16" fill="#EAE3D5"/>
      <rect x="120" y="80" width="960" height="740" fill="url(#weavePattern)"/>
      <!-- Natural fabric warp & weft intersecting threads -->
      ${Array.from({ length: 24 }, (_, i) => `<line x1="120" y1="${100 + i * 30}" x2="1080" y2="${100 + i * 30}" stroke="#B8AC97" stroke-width="2" opacity="0.4"/>`).join('')}
      ${Array.from({ length: 32 }, (_, i) => `<line x1="${140 + i * 30}" y1="80" x2="${140 + i * 30}" y2="820" stroke="#B8AC97" stroke-width="2" opacity="0.4"/>`).join('')}
    `}

    <!-- Diagonal Soft Studio Lighting Gradient -->
    <polygon points="0,0 600,0 1200,900 600,900" fill="url(#sunbeam)"/>
    <rect width="1200" height="900" fill="url(#microGrain)"/>
  </svg>`;
}

// 10. DETAIL 03 - FINISHING & CRAFTSMANSHIP HARDWARE (Mechanism, Track, Bottom Rail)
function generateDetail03(category) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
    <defs>${commonDefs(`
      <linearGradient id="metalBrushed" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#4F5450"/>
        <stop offset="40%" stop-color="#737A74"/>
        <stop offset="70%" stop-color="#5B615C"/>
        <stop offset="100%" stop-color="#3C403D"/>
      </linearGradient>
    `)}</defs>
    <!-- Background Canvas -->
    <rect width="1200" height="900" fill="url(#warmWall)"/>
    
    ${category.includes('roller') ? `
      <!-- Precision Enclosed Cassette Headbox Close-Up -->
      <rect x="150" y="220" width="900" height="120" rx="14" fill="url(#metalBrushed)" filter="url(#gentleShadow)"/>
      <ellipse cx="170" cy="280" rx="16" ry="45" fill="#363A37"/>
      <!-- Fabric Emerging from Cassette -->
      <rect x="180" y="340" width="840" height="320" fill="url(#softLinen)"/>
      <rect x="180" y="340" width="840" height="320" fill="url(#weavePattern)"/>
      <!-- Sleek Extruded Aluminum Bottom Rail -->
      <rect x="175" y="660" width="850" height="28" rx="6" fill="url(#metalBrushed)" filter="url(#gentleShadow)"/>
      <!-- Anodized End Cap -->
      <rect x="172" y="658" width="10" height="32" rx="3" fill="#2E322F"/>
      <rect x="1018" y="658" width="10" height="32" rx="3" fill="#2E322F"/>
    ` : category.includes('curtain') ? `
      <!-- Ceiling-Recessed Wave / S-Fold Track & Gliders -->
      <rect x="100" y="160" width="1000" height="34" rx="4" fill="url(#steelMullion)"/>
      <line x1="100" y1="177" x2="1100" y2="177" stroke="#1D211F" stroke-width="4"/>
      <!-- Precision S-fold Gliders & Heading -->
      ${Array.from({ length: 8 }, (_, i) => {
        const x = 160 + i * 115;
        return `
          <rect x="${x + 40}" y="194" width="8" height="24" fill="#C5BCAE" rx="2"/>
          <path d="M${x} 218 Q${x + 50} 190 ${x + 100} 218 L${x + 110} 680 Q${x + 50} 700 ${x - 10} 680 Z" fill="url(#sheerFabric)"/>
        `;
      }).join('')}
    ` : `
      <!-- Architectural Tilt Mechanism & Ladder Tape Tensioner -->
      <rect x="120" y="180" width="960" height="90" rx="8" fill="url(#metalBrushed)"/>
      <!-- Tilt Wand & Brass Gear Housing -->
      <rect x="240" y="270" width="36" height="50" rx="4" fill="#A8946E"/>
      <line x1="258" y1="320" x2="258" y2="720" stroke="#DDD4C0" stroke-width="8" stroke-linecap="round"/>
      <!-- Horizontal Slat Pass-through -->
      ${Array.from({ length: 6 }, (_, i) => `<rect x="140" y="${320 + i * 70}" width="920" height="24" rx="3" fill="#CBBBA4"/><rect x="520" y="${270 + i * 70}" width="16" height="70" fill="#7D6D58"/>`).join('')}
    `}

    <rect width="1200" height="900" fill="url(#microGrain)"/>
  </svg>`;
}

async function main() {
  console.log('Generating bespoke architectural placeholder artworks...');

  // 1. Core Category Main Studies
  await writeFile('public/images/placeholders/roller.svg', generateRollerMain());
  await writeFile('public/images/placeholders/roman.svg', generateRomanMain());
  await writeFile('public/images/placeholders/venetian.svg', generateVenetianMain());
  await writeFile('public/images/placeholders/curtains.svg', generateCurtainsOverview());
  await writeFile('public/images/placeholders/sheer-curtains.svg', generateSheerCurtains());
  await writeFile('public/images/placeholders/blockout-curtains.svg', generateBlockoutCurtains());
  await writeFile('public/images/placeholders/layered-curtains.svg', generateLayeredCurtains());

  // 2. Specific Category Details (01: Room Setting, 02: Material Close-Up, 03: Finishing Craftsmanship)
  const categories = [
    'roller',
    'roman',
    'venetian',
    'sheer-curtains',
    'blockout-curtains',
    'layered-curtains'
  ];

  for (const cat of categories) {
    await writeFile(`public/images/placeholders/${cat}-detail-01.svg`, generateDetail01(cat));
    await writeFile(`public/images/placeholders/${cat}-detail-02.svg`, generateDetail02(cat));
    await writeFile(`public/images/placeholders/${cat}-detail-03.svg`, generateDetail03(cat));
  }

  console.log('Successfully generated all 25 luxury vector architectural placeholder studies!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
