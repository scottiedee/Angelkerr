import convert from 'heic-convert';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '..', 'public');
const imagesDir = path.join(publicDir, 'images');

// Create images directory if it doesn't exist
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Get all HEIC files
const heicFiles = fs.readdirSync(publicDir).filter(file => 
  file.toLowerCase().endsWith('.heic')
);

console.log(`Found ${heicFiles.length} HEIC files to convert...`);

async function convertImages() {
  for (const file of heicFiles) {
    const inputPath = path.join(publicDir, file);
    const outputName = file.replace(/\.heic$/i, '.jpg');
    const outputPath = path.join(imagesDir, outputName);
    
    try {
      // Read the HEIC file
      const inputBuffer = fs.readFileSync(inputPath);
      
      // Convert HEIC to JPEG using heic-convert
      const jpegBuffer = await convert({
        buffer: inputBuffer,
        format: 'JPEG',
        quality: 0.9
      });
      
      // Use sharp to resize the converted image
      await sharp(jpegBuffer)
        .rotate() // Auto-rotate based on EXIF
        .resize(1200, 800, { 
          fit: 'cover',
          position: 'center'
        })
        .jpeg({ quality: 85 })
        .toFile(outputPath);
      
      console.log(`✓ Converted: ${file} → ${outputName}`);
    } catch (error) {
      console.error(`✗ Failed to convert ${file}:`, error.message);
    }
  }
  
  console.log('\nDone! Images saved to public/images/');
}

convertImages();
