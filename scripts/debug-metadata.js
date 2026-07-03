import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logoPath = path.join(__dirname, '..', 'public', 'logo.png');

async function test() {
  const metadata = await sharp(logoPath).metadata();
  console.log('Metadata:', metadata);
}
test();
