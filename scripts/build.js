const path = require('path');
const esbuild = require('esbuild');
const pkg = require('../package.json');

const LOCALES = ['en', 'es', 'de', 'fr', 'ca', 'it', 'nl', 'pt'];
const srcDir = path.join(__dirname, '../src');
const distDir = path.join(__dirname, '../dist');
const entry = path.join(srcDir, 'cookie-consent.js');
const banner = `/*! @e-xisto/cookie-consent v${pkg.version} */`;

function localesPlugin(onlyLocale) {
  return {
    name: 'locales-filter',
    setup(build) {
      build.onResolve({ filter: /^\.\/locales\.js$/ }, (args) => ({
        path: path.join(args.resolveDir, 'locales.js'),
        namespace: 'locales-filter',
      }));

      build.onLoad({ filter: /.*/, namespace: 'locales-filter' }, () => {
        const codes = onlyLocale ? [onlyLocale] : LOCALES;
        const imports = codes
          .map((code) => `import ${code} from './locales/${code}.js'`)
          .join('\n');
        return {
          contents: `${imports}\nexport default { ${codes.join(', ')} }\n`,
          resolveDir: srcDir,
          loader: 'js',
        };
      });
    },
  };
}

async function buildBundle(outfile, onlyLocale) {
  await esbuild.build({
    entryPoints: [entry],
    bundle: true,
    minify: true,
    format: 'iife',
    target: ['es2015'],
    outfile,
    banner: { js: banner },
    plugins: [localesPlugin(onlyLocale)],
    logLevel: 'info',
  });
}

async function main() {
  await buildBundle(path.join(distDir, 'cookie-consent.js'), null);

  for (const locale of LOCALES) {
    await buildBundle(path.join(distDir, `cookie-consent.${locale}.js`), locale);
  }

  console.log(`Built full + ${LOCALES.length} locale variants (v${pkg.version})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
