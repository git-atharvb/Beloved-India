import sharp from 'sharp';

async function processIcon() {
  const size = 128;
  const radius = 32;

  const roundedCorners = Buffer.from(
    `<svg><rect x="0" y="0" width="${size}" height="${size}" rx="${radius}" ry="${radius}"/></svg>`
  );

  await sharp('src/assets/images/beloved_india_logo.png')
    .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } }) // Ensure white background and centered
    .composite([{
      input: roundedCorners,
      blend: 'dest-in'
    }])
    .png()
    .toFile('src/assets/images/favicon.png');
    
  console.log('Favicon processed successfully!');
}

processIcon().catch(console.error);
