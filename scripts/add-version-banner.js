const fs = require('fs');
const path = require('path');

const pkg = require('../package.json');
const distFile = path.join(__dirname, '../dist/cookie-consent.js');
const banner = `/*! @e-xisto/cookie-consent v${pkg.version} */\n`;

if (!fs.existsSync(distFile)) {
  console.error('Build output not found:', distFile);
  process.exit(1);
}

const content = fs.readFileSync(distFile, 'utf8');

if (content.startsWith('/*! @e-xisto/cookie-consent v')) {
  const withoutBanner = content.replace(/^\/\*! @e-xisto\/cookie-consent v[^\n]+\*\/\n/, '');
  fs.writeFileSync(distFile, banner + withoutBanner);
} else {
  fs.writeFileSync(distFile, banner + content);
}

console.log('Added version banner:', banner.trim());
