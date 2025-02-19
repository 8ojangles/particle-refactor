import { nunjucksFilePathConfig } from './esbuild-plugin-nunjucks.js';

const entryPoints = {
    js: ['./src/js/entry.js', './src/js/liveReload.js'],
    scss: ['./src/scss/main.scss'],
    html: [
        './src/templates/**/*.html'
    ],
    contentData: [
        nunjucksFilePathConfig.dataFile.src,
        nunjucksFilePathConfig.dataFile.files
    ],
}

export { entryPoints };