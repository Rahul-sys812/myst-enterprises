const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

async function optimizeImages() {
  const imagesDir = path.join(__dirname, '..', 'public', 'images');
  const allFiles = getAllFiles(imagesDir);

  let totalBefore = 0;
  let totalAfter = 0;
  let optimizedCount = 0;

  console.log(`Found ${allFiles.length} files in public/images. Starting compression...`);

  for (const filePath of allFiles) {
    const ext = path.extname(filePath).toLowerCase();
    if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
      continue;
    }

    try {
      const inputBuffer = fs.readFileSync(filePath);
      const beforeSize = inputBuffer.length;
      totalBefore += beforeSize;

      let optimizedBuffer;

      if (ext === '.jpg' || ext === '.jpeg') {
        optimizedBuffer = await sharp(inputBuffer)
          .jpeg({ quality: 80, mozjpeg: true, progressive: true })
          .toBuffer();
      } else if (ext === '.png') {
        optimizedBuffer = await sharp(inputBuffer)
          .png({ compressionLevel: 9, adaptiveFiltering: true, quality: 85 })
          .toBuffer();
      } else if (ext === '.webp') {
        optimizedBuffer = await sharp(inputBuffer)
          .webp({ quality: 80, effort: 5 })
          .toBuffer();
      }

      if (optimizedBuffer && optimizedBuffer.length < beforeSize) {
        fs.writeFileSync(filePath, optimizedBuffer);
        const afterSize = optimizedBuffer.length;
        totalAfter += afterSize;
        optimizedCount++;
        const pct = (((beforeSize - afterSize) / beforeSize) * 100).toFixed(1);
        console.log(`✓ [${pct}% saved] ${path.relative(imagesDir, filePath)}: ${(beforeSize / 1024).toFixed(0)}KB -> ${(afterSize / 1024).toFixed(0)}KB`);
      } else {
        totalAfter += beforeSize;
        console.log(`- [Already optimal] ${path.relative(imagesDir, filePath)}: ${(beforeSize / 1024).toFixed(0)}KB`);
      }
    } catch (err) {
      console.error(`✗ Error optimizing ${filePath}:`, err.message);
    }
  }

  const savedBytes = totalBefore - totalAfter;
  const savedMB = (savedBytes / (1024 * 1024)).toFixed(2);
  const totalBeforeMB = (totalBefore / (1024 * 1024)).toFixed(2);
  const totalAfterMB = (totalAfter / (1024 * 1024)).toFixed(2);
  const percentSaved = (((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1);

  console.log(`\n=============================================`);
  console.log(`Image Optimization Summary:`);
  console.log(`Total Files Processed: ${allFiles.length}`);
  console.log(`Files Compressed: ${optimizedCount}`);
  console.log(`Original Size: ${totalBeforeMB} MB`);
  console.log(`Optimized Size: ${totalAfterMB} MB`);
  console.log(`Bandwidth Saved: ${savedMB} MB (${percentSaved}% reduction)`);
  console.log(`=============================================\n`);
}

optimizeImages();
