import { entryPoints } from './entry-point.js';
import { sassPlugin } from 'esbuild-sass-plugin';
import { nunjucksPlugin } from './esbuild-plugin-nunjucks.js';
import { jsonbakePlugin } from './esbuild-plugin-jsonbake/esbuild-plugin-jsonbake.js';
import { clean } from 'esbuild-plugin-clean';
import { copy } from 'esbuild-plugin-copy';


export function createBuildSettings(options) {
    return {
        metafile: true,
        logLevel: "info",
        entryPoints: [
            ...entryPoints.js,
            ...entryPoints.scss,
            ...entryPoints.html,
            ...entryPoints.contentData
        ],
        outdir: './dist/',
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
                    './dist/scss/*',
                    './dist/assets/*.map.js'
                ],
                cleanOnStartPatterns: [
                    './dist/*'
                ],
                cleanOnEndPatterns: [
                    './dist/*.js',
                    './dist/*.map',
                    './dist/templates',
                    './dist/content-data',
                    './dist/*.png',
                ]
            }),
            // jsonbakePlugin({
            //     files: [{
            //         src: './src/page-data/page-data.json',
            //         dest: './src/site-content-compiled.json'
            //     }]
            // }),
            nunjucksPlugin({
                outputDir: './dist',
                pageDir: './src/templates/pages',
                templateDir: './src/templates',
                dataFile: {
                    src: './src/content-data/content-data.json',
                    dest: './src/content-data/content-data-compiled.json'
                }
            }),
            sassPlugin(),
            copy({
                // this is equal to process.cwd(), which means we use cwd path as base path to resolve `to` path
                // if not specified, this plugin uses ESBuild.build outdir/outfile options as base path.
                resolveFrom: 'cwd',
                assets: [
                    {
                        from: ['./src/assets/**/*'],
                        to: ['./dist/assets'],
                    },
                    {
                        from: ['./docs/**/*'],
                        to: ['./dist/docs'],
                    }
                ],
                watch: true,
            })
        ],
        minify: true,
        sourcemap: true,
        assetNames: '[name]',
        target: ['chrome100', 'firefox100', 'safari15', 'edge100'],
        ...options
    };
}