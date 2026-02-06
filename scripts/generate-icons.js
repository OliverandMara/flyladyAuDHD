import sharp from 'sharp';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const svgPath = join(__dirname, '../public/icon.svg');
const publicPath = join(__dirname, '../public');

const svgBuffer = readFileSync(svgPath);

async function generateIcons() {
  console.log('Generating PWA icons...');

  // Generate 192x192
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(join(publicPath, 'pwa-192x192.png'));
  console.log('✓ Generated pwa-192x192.png');

  // Generate 512x512
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(join(publicPath, 'pwa-512x512.png'));
  console.log('✓ Generated pwa-512x512.png');

  // Generate apple-touch-icon (180x180)
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(join(publicPath, 'apple-touch-icon.png'));
  console.log('✓ Generated apple-touch-icon.png');

  // Generate favicon (32x32)
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(join(publicPath, 'favicon.png'));
  console.log('✓ Generated favicon.png');

  // Generate ICO (using 32x32 as base)
  await sharp(svgBuffer)
    .resize(32, 32)
    .toFormat('png')
    .toFile(join(publicPath, 'favicon.ico'));
  console.log('✓ Generated favicon.ico');

  // Generate mask-icon SVG (copy the original)
  const { writeFileSync } = await import('fs');
  writeFileSync(join(publicPath, 'mask-icon.svg'), svgBuffer);
  console.log('✓ Generated mask-icon.svg');

  console.log('\n✅ All icons generated successfully!');
}

generateIcons().catch(console.error);
