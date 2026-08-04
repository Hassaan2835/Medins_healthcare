import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '..', 'public', 'images', 'products');
const dataFilePath = path.join(__dirname, '..', 'src', 'data', 'productsData.js');

const renameMap = {
  '3D3 Tablets.png': '3d3-stat-tablets.png',
  'BIOMAK Syrup.png': 'biomak-syrup.png',
  'CADRIL.png': 'cadril-syrup.png',
  'Calence Tablets.png': 'calence-tablets.png',
  'FOLICO Tablets.png': 'folico-tablets.png',
  'IROMIK Syrup.png': 'iromik-syrup.png',
  'J-REX Sachet.png': 'j-rex-sachet.png',
  'OSIK2.jpeg': 'osik2-tablets.jpeg',
  'OSSICARE Tablets.png': 'ossicare-tablets.png'
};

function renameImages() {
  try {
    console.log('Renaming product images to SEO-friendly filenames...');
    for (const [oldName, newName] of Object.entries(renameMap)) {
      const oldPath = path.join(publicDir, oldName);
      const newPath = path.join(publicDir, newName);
      
      if (fs.existsSync(oldPath)) {
        fs.renameSync(oldPath, newPath);
        console.log(`✅ Renamed: ${oldName} ➜ ${newName}`);
      } else {
        console.log(`ℹ️ File already renamed or not found: ${oldName}`);
      }
    }

    console.log('Updating src/data/productsData.js file...');
    let content = fs.readFileSync(dataFilePath, 'utf8');
    
    for (const [oldName, newName] of Object.entries(renameMap)) {
      const oldSearch = `/images/products/${oldName}`;
      const newReplacement = `/images/products/${newName}`;
      content = content.replaceAll(oldSearch, newReplacement);
    }
    
    fs.writeFileSync(dataFilePath, content, 'utf8');
    console.log('✅ productsData.js successfully updated with SEO image URLs!');
    
  } catch (error) {
    console.error('❌ Error during renaming process:', error);
  }
}

renameImages();
