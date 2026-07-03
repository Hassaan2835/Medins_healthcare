import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logoPath = path.join(__dirname, '..', 'public', 'logo.png');

async function analyzeLogo() {
  try {
    const image = sharp(logoPath);
    const { width, height } = await image.metadata();
    console.log(`Logo: ${width}x${height}`);

    // Let's get raw pixel data to find the runner bounding box
    const { data } = await image.raw().toBuffer({ resolveWithObject: true });
    
    // We want to find the bounding box of non-white pixels on the left side of the image (x < width * 0.4)
    let minX = width;
    let maxX = 0;
    let minY = height;
    let maxY = 0;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < Math.floor(width * 0.4); x++) {
        const idx = (y * width + x) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const a = data[idx + 3];

        // If not white/transparent (assuming background is white or transparent)
        if (a > 10 && !(r > 240 && g > 240 && b > 240)) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    console.log(`Runner Bounding Box: minX=${minX}, maxX=${maxX}, minY=${minY}, maxY=${maxY}`);
    console.log(`Width: ${maxX - minX}, Height: ${maxY - minY}`);
  } catch (err) {
    console.error(err);
  }
}

analyzeLogo();
