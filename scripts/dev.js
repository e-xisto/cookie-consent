const path = require('path');
const esbuild = require('esbuild');

const srcDir = path.join(__dirname, '../src');
const PORT = Number(process.env.PORT) || 1234;

async function main() {
  // El bundle se sirve desde memoria en /cookie-consent.js, por delante del fuente
  // del mismo nombre en src/; el resto (index.html) se sirve tal cual desde src/.
  const ctx = await esbuild.context({
    entryPoints: [path.join(srcDir, 'cookie-consent.js')],
    bundle: true,
    format: 'iife',
    target: ['es2015'],
    sourcemap: true,
    outdir: srcDir,
    write: false,
    logLevel: 'info',
  });

  await ctx.watch();
  const { port } = await ctx.serve({ servedir: srcDir, port: PORT });
  console.log(`Playground en http://localhost:${port}/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
