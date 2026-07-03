import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logoPath = path.join(__dirname, '..', 'public', 'logo.png');
const tempPath = path.join(__dirname, '..', 'public', 'logo_trimmed.png');

async function trimLogo() {
  try {
    // Load logo, trim surrounding transparent/white pixels
    await sharp(logoPath)
      .trim()
      .toFile(tempPath);
    
    // Replace the logo with the trimmed version
    import('fs').then((fs) => {
      fs.renameSync(tempPath, logoPath);
      console.log('Logo trimmed successfully to remove top/bottom white margins!');
    });
  } catch (err) {
    console.error('Error trimming logo:', err);
  }
}

trimLogo();
