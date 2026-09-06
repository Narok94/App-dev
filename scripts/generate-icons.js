import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <!-- Fundo tecnológico profundo -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#191F30"/>
      <stop offset="100%" stop-color="#0E111B"/>
    </linearGradient>

    <!-- Gradiente Violeta Suave do Dashboard -->
    <linearGradient id="violetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#A79BFF"/>
      <stop offset="100%" stop-color="#7C6BF0"/>
    </linearGradient>

    <!-- Gradiente Verde-Lima Elétrico do Dashboard -->
    <linearGradient id="limeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D9F966"/>
      <stop offset="100%" stop-color="#B2E61E"/>
    </linearGradient>

    <!-- Brilho do Núcleo -->
    <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9"/>
      <stop offset="40%" stop-color="#C8F03D" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#8B7CF6" stop-opacity="0"/>
    </radialGradient>

    <!-- Sombra suave interna -->
    <filter id="shadowGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <!-- Fundo Squircle / App Icon Container -->
  <rect x="24" y="24" width="464" height="464" rx="112" fill="url(#bgGrad)" stroke="#2B334B" stroke-width="8" filter="url(#shadowGlow)"/>

  <!-- Brilho ambiental sutil de topo -->
  <path d="M 64 64 Q 256 32 448 64 Q 464 160 464 240 Q 256 180 48 240 Z" fill="white" opacity="0.03"/>

  <!-- Símbolo Tecnológico Central: Par de Chevrons de Código < e > Entrelaçados com Núcleo Quântico -->
  <g transform="translate(0, 0)">
    <!-- Chevron Esquerdo (Violeta / Developer Logic): < -->
    <path d="M 210 148 
             L 126 232 
             C 114 244 114 268 126 280 
             L 210 364 
             C 219 373 234 373 243 364 
             C 252 355 252 340 243 331 
             L 174 262 
             C 170 258 170 254 174 250 
             L 243 181 
             C 252 172 252 157 243 148 
             C 234 139 219 139 210 148 Z" 
          fill="url(#violetGrad)" />

    <!-- Chevron Direito (Verde-Lima / Compile / Go): > -->
    <path d="M 302 148 
             C 293 139 278 139 269 148 
             C 260 157 260 172 269 181 
             L 338 250 
             C 342 254 342 258 338 262 
             L 269 331 
             C 260 340 260 355 269 364 
             C 278 373 293 373 302 364 
             L 386 280 
             C 398 268 398 244 386 232 
             L 302 148 Z" 
          fill="url(#limeGrad)" />

    <!-- Barra de Execução / Compilação Central (Sutil e Moderna) -->
    <path d="M 276 172 
             L 236 340 
             C 233 352 222 360 210 358 
             C 198 355 190 344 193 332 
             L 233 164 
             C 236 152 247 144 259 146 
             C 271 149 279 160 276 172 Z" 
          fill="#3B4665" opacity="0.45" />

    <!-- Núcleo de Foco / Sintaxe / Spark Diamante no Centro -->
    <g transform="translate(256, 256)">
      <!-- Brilho de Fundo do Spark -->
      <circle cx="0" cy="0" r="28" fill="url(#coreGlow)" opacity="0.75" />
      
      <!-- Diamante Tecnológico -->
      <path d="M 0 -18 L 14 0 L 0 18 L -14 0 Z" fill="#FFFFFF" />
      <circle cx="0" cy="0" r="4" fill="#C8F03D" />
    </g>
  </g>
</svg>`;

async function run() {
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // 1. Salvar SVG original
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgContent, 'utf-8');
  console.log('favicon.svg criado');

  const svgBuffer = Buffer.from(svgContent);

  // 2. Gerar icon-192.png
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'icon-192.png'));
  console.log('icon-192.png criado');

  // 3. Gerar icon-512.png
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'icon-512.png'));
  console.log('icon-512.png criado');

  // 4. Gerar apple-touch-icon.png (180x180)
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('apple-touch-icon.png criado');
}

run().catch(console.error);
