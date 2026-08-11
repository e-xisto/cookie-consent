const fs = require('fs');
const path = require('path');

const pkg = require('../package.json');
const distDir = path.join(__dirname, '../dist');
const banner = `/*! @e-xisto/cookie-consent v${pkg.version} */\n`;
const bannerRe = /^\/\*! @e-xisto\/cookie-consent v[^\n]+\*\/\n/;

const files = fs
  .readdirSync(distDir)
  .filter((name) => /^cookie-consent(\.[a-z]{2})?\.js$/.test(name))
  .map((name) => path.join(distDir, name));

if (!files.length) {
  console.error('No cookie-consent*.js build outputs found in dist/');
  process.exit(1);
}

for (const distFile of files) {
  const content = fs.readFileSync(distFile, 'utf8');
  if (content.startsWith('/*! @e-xisto/cookie-consent v')) {
    fs.writeFileSync(distFile, banner + content.replace(bannerRe, ''));
  } else {
    fs.writeFileSync(distFile, banner + content);
  }
  console.log('Added version banner:', path.basename(distFile), banner.trim());
}
