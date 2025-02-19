import esbuild from 'esbuild';
import { createBuildSettings } from './settings.js';

const settings = createBuildSettings({ 
  sourcemap: true
});

const ctx = await esbuild.context(settings);

await ctx.watch();

const { host, port } = await ctx.serve({
  port: 5500,
  servedir: 'dist',
  fallback: "dist/index.html"
});

console.log(`Serving app at ${host}:${port}.`);