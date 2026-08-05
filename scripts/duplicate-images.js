import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '..', 'public', 'images', 'products');

const duplicateMap = {
  '3d3-stat-tablets.png': '3D3 Tablets.png',
  'biomak-syrup.png': 'BIOMAK Syrup.png',
  'cadril-syrup.png': 'CADRIL.png',
  'calence-tablets.png': 'Calence Tablets.png',
  'folico-tablets.png': 'FOLICO Tablets.png',
  'iromik-syrup.png': 'IROMIK Syrup.png',
  'j-rex-sachet.png': 'J-REX Sachet.png',
  'osik2-tablets.jpeg': 'OSIK2.jpeg',
  'ossicare-tablets.png': 'OSSICARE Tablets.png'
};

function duplicateImages() {
  try {
    console.log('Duplicating product images to support both old and new URLs...');
    for (const [newName, oldName] of Object.entries(duplicateMap)) {
      const sourcePath = path.join(publicDir, newName);
      const targetPath = path.join(publicDir, oldName);
      
      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`✅ Copied: ${newName} ➜ ${oldName}`);
      } else {
        console.log(`❌ Source file not found: ${newName}`);
      }
    }
    console.log('🎉 Duplication process completed successfully!');
  } catch (error) {
    console.error('❌ Error during duplication process:', error);
  }
}

duplicateImages();
