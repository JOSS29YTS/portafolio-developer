import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.resolve(__dirname, '../public');

// Recursively find files with certain extensions
function getFiles(dir, exts) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(fullPath, exts));
    } else {
      const ext = path.extname(file).toLowerCase();
      if (exts.includes(ext)) {
        results.push(fullPath);
      }
    }
  });
  return results;
}

async function convertImages() {
  console.log(`Scanning directory: ${PUBLIC_DIR} for PNG and JPG/JPEG files...`);
  // Find PNG/JPG files, but exclude og-image.jpg and lobo_final.png to preserve maximum compatibility
  const files = getFiles(PUBLIC_DIR, ['.png', '.jpg', '.jpeg'])
    .filter(f => !f.endsWith('og-image.jpg') && !f.endsWith('lobo_final.png'));

  console.log(`Found ${files.length} images to optimize.`);

  for (const filePath of files) {
    const ext = path.extname(filePath);
    const newPath = filePath.replace(new RegExp(`${ext}$`), '.webp');
    
    console.log(`Optimizing: ${path.relative(PUBLIC_DIR, filePath)} -> ${path.relative(PUBLIC_DIR, newPath)}`);
    
    try {
      await sharp(filePath)
        .webp({ quality: 80 })
        .toFile(newPath);
      
      console.log(`Success! Deleting original: ${path.relative(PUBLIC_DIR, filePath)}`);
      fs.unlinkSync(filePath);
    } catch (err) {
      console.error(`Failed to convert ${filePath}:`, err);
    }
  }

  console.log('Image optimization completed successfully.');
}

convertImages().catch(err => {
  console.error('Error during image conversion:', err);
});
