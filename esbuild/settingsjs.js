import { entryPoints } from './entry-point.js';
// import { sassPlugin } from 'esbuild-sass-plugin';
// import { nunjucksPlugin } from './esbuild-plugin-nunjucks.js';
// import { jsonbakePlugin } from './esbuild-plugin-jsonbake/esbuild-plugin-jsonbake.js';
import { clean } from 'esbuild-plugin-clean';
// import { copy } from 'esbuild-plugin-copy';


export function createBuildSettings(options) {
    return {
        logLevel: "info",
        entryPoints: [
            entryPoints.js
        ],
        outdir: './dist/js/',
        bundle: true,
        allowOverwrite: true,
        loader: {
            ".html": "text",
            ".png": "file",
            // ".jpg": "file",
            // ".bmp": "file",
            // ".svg": "file",
        },
        plugins: [
            clean({
                patterns: [
                    './dist/js/*',
                    './dist/assets/*.map.js'
                ],
                cleanOnStartPatterns: [
                    './dist/js/*'
                ],
                cleanOnEndPatterns: [
                    './dist/*.js',
                    './dist/*.map',
                ]
            }),
        ],
        minify: true,
        sourcemap: true,
        assetNames: '[name]',
        target: ['chrome100', 'firefox100', 'safari15', 'edge100'],
        ...options
    };
}