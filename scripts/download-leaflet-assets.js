const fs = require('fs');
const https = require('https');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const imagesDir = path.join(publicDir, 'images');

// Create directories if they don't exist
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);
if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir);

// URLs of the Leaflet marker assets
const assets = [
  {
    url: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x.png',
    filename: 'marker-icon-2x.png'
  },
  {
    url: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon.png',
    filename: 'marker-icon.png'
  },
  {
    url: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png',
    filename: 'marker-shadow.png'
  }
];

// Function to download a file
function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, response => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', error => {
      fs.unlink(filepath, () => {
        reject(error);
      });
    });
  });
}

// Download all assets
async function downloadAssets() {
  try {
    for (const asset of assets) {
      const filepath = path.join(imagesDir, asset.filename);
      console.log(`Downloading ${asset.filename}...`);
      await downloadFile(asset.url, filepath);
      console.log(`✓ ${asset.filename} downloaded successfully`);
    }
    console.log('All assets downloaded successfully!');
  } catch (error) {
    console.error('Error downloading assets:', error);
  }
}

downloadAssets();
