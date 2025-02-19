const entryPoints = {
    js: ['./src/js/entry.js', './src/js/liveReload.js'],
    scss: ['./src/scss/main.scss'],
    html: [
        './src/templates/**/*.html'
    ],
    contentData: [
        './src/content-data/content-data.json',
        './src/content-data/partials/**/*.json'
    ],
}

export { entryPoints };