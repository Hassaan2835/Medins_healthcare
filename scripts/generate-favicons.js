import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceFavicon = path.join(__dirname, '..', 'public', 'favicon.png');
const publicDir = path.join(__dirname, '..', 'public');

const targets = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-48x48.png', size: 48 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
];

async function generateFavicons() {
  try {
    console.log('Generating standard favicon sizes...');
    for (const target of targets) {
      const outputPath = path.join(publicDir, target.name);
      await sharp(sourceFavicon)
        .resize(target.size, target.size)
        .toFile(outputPath);
      console.log(`✅ Generated ${target.name} (${target.size}x${target.size})`);
    }
    console.log('🎉 All favicons generated successfully!');
  } catch (error) {
    console.error('❌ Error generating favicons:', error);
  }
}

generateFavicons();
