const fs = require('fs');
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

function findTemplateLiteral(source, fromIndex) {
  const start = source.indexOf('`', fromIndex);
  if (start === -1) return null;

  let i = start + 1;
  while (i < source.length) {
    if (source[i] === '\\') {
      i += 2;
      continue;
    }
    if (source[i] === '$' && source[i + 1] === '{') {
      let depth = 1;
      i += 2;
      while (i < source.length && depth > 0) {
        if (source[i] === '\\') {
          i += 2;
          continue;
        }
        if (source[i] === '{') depth++;
        else if (source[i] === '}') depth--;
        i++;
      }
      continue;
    }
    if (source[i] === '`') {
      return { start, end: i, raw: source.slice(start + 1, i) };
    }
    i++;
  }
  return null;
}

function extractInterpolations(str) {
  const interpolations = [];
  let out = '';
  let i = 0;
  while (i < str.length) {
    if (str[i] === '$' && str[i + 1] === '{') {
      let depth = 1;
      let j = i + 2;
      while (j < str.length && depth > 0) {
        if (str[j] === '{') depth++;
        else if (str[j] === '}') depth--;
        j++;
      }
      out += `__CC_I${interpolations.length}__`;
      interpolations.push(str.slice(i, j));
      i = j;
    } else {
      out += str[i];
      i++;
    }
  }
  return { text: out, interpolations };
}

function restoreInterpolations(str, interpolations) {
  return str.replace(/__CC_I(\d+)__/g, (_, n) => interpolations[Number(n)]);
}

function minifyHtmlMarkup(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/>\s+</g, '><')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function minifyCss(css) {
  let out = '';
  let inStr = null;

  for (let i = 0; i < css.length; i++) {
    if (!inStr && css[i] === '/' && css[i + 1] === '*') {
      const end = css.indexOf('*/', i + 2);
      if (end === -1) break;
      i = end + 1;
      continue;
    }

    const ch = css[i];
    if (inStr) {
      out += ch;
      if (ch === inStr && css[i - 1] !== '\\') inStr = null;
      continue;
    }
    if (ch === '"' || ch === "'") {
      inStr = ch;
      out += ch;
      continue;
    }
    if (ch === '\n' || ch === '\r' || ch === '\t') {
      out += ' ';
      continue;
    }
    out += ch;
  }

  return out
    .replace(/\s{2,}/g, ' ')
    .replace(/\s*([{};:,])\s*/g, '$1')
    .replace(/\s+!important/g, '!important')
    .replace(/;}/g, '}')
    .trim();
}

async function minifyHtmlTemplate(raw) {
  const { text, interpolations } = extractInterpolations(raw);
  const styleMatch = text.match(/<style>([\s\S]*?)<\/style>/i);
  let html = text;

  if (styleMatch) {
    const minCss = minifyCss(styleMatch[1]);
    html =
      text.slice(0, styleMatch.index) +
      `<style>${minCss}</style>` +
      text.slice(styleMatch.index + styleMatch[0].length);
  }

  return restoreInterpolations(minifyHtmlMarkup(html), interpolations);
}

function minifyHtmlTemplatesPlugin() {
  return {
    name: 'minify-html-templates',
    setup(build) {
      build.onLoad({ filter: /[/\\]cookie-consent\.js$/ }, async (args) => {
        let source = await fs.promises.readFile(args.path, 'utf8');
        const marker = '/*html*/';
        let searchFrom = 0;

        while (true) {
          const markerIdx = source.indexOf(marker, searchFrom);
          if (markerIdx === -1) break;
          const tpl = findTemplateLiteral(source, markerIdx);
          if (!tpl) break;
          const minified = await minifyHtmlTemplate(tpl.raw);
          source = source.slice(0, tpl.start + 1) + minified + source.slice(tpl.end);
          searchFrom = tpl.start + 1 + minified.length + 1;
        }

        return {
          contents: source,
          loader: 'js',
          resolveDir: path.dirname(args.path),
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
    plugins: [minifyHtmlTemplatesPlugin(), localesPlugin(onlyLocale)],
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

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
