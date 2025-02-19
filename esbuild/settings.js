import { entryPoints } from './entry-point.js';
import { sassPlugin } from 'esbuild-sass-plugin';
import { nunjucksPlugin, nunjucksConfig } from './esbuild-plugin-nunjucks.js';
// import { jsonbakePlugin } from './esbuild-plugin-jsonbake/esbuild-plugin-jsonbake.js';
import { clean } from 'esbuild-plugin-clean';
import { copy } from 'esbuild-plugin-copy';

const cleanConfig = {
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
        './dist/content-data'
    ]
}

const sassConfig = {
    filter: /\.scss$/
}

const copyConfig = {
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
}

const loaderConfig = {
    ".html": "text",
    ".png": "file",
    // ".jpg": "file",
    // ".bmp": "file",
    // ".svg": "file",
}

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
        loader: loaderConfig,
        plugins: [
            clean(cleanConfig),
            nunjucksPlugin(nunjucksConfig),
            sassPlugin(sassConfig),
            copy(copyConfig)
        ],
        minify: true,
        sourcemap: true,
        assetNames: '[name]',
        target: ['chrome100', 'firefox100', 'safari15', 'edge100'],
        ...options
    };
}