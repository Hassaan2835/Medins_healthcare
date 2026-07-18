import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logoPath = path.join(__dirname, '..', 'public', 'logo.png');
const faviconPath = path.join(__dirname, '..', 'public', 'favicon.png');

async function createFavicon() {
  try {
    // Crop width to 300px to fully cut off the "M" of Medins
    await sharp(logoPath)
      .extract({ left: 0, top: 0, width: 300, height: 292 })
      .resize(192, 192, { 
        fit: 'contain', 
        background: { r: 255, g: 255, b: 255, alpha: 0 } 
      })
      .png()
      .toFile(faviconPath);
    
    console.log(`Favicon generated successfully with 300px width`);
  } catch (err) {
    console.error('Error creating favicon:', err);
  }
}

createFavicon();
