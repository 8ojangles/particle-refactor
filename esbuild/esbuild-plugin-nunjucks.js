import nunjucks from 'nunjucks';
import fs from 'node:fs';


const reportNunjucksWriteFileOp = (err, file) => {
    if (err) {
        console.error(err);
    } else {
        console.log(`${file} written to Dist folder`);
    }
}

const nunjucksPlugin = (options) => ({
    name: 'nunjucks',
    setup(build) {
        const { pageDir, templateDir, dataFile, outputDir } = options;
        // const env = new nunjucks.Environment(
        //     new nunjucks.FileSystemLoader('src'),
        //     { 
        //         autoescape: true,
        //         watch: true
        //     }
        // );

        // @ts-ignore
        const env = new nunjucks.configure(
            'src',
            { 
                autoescape: true,
                watch: true
            }
        );

        build.onLoad({ filter: /\.(html|njk|json)$/ }, async (args) => {

            const tplFolder = templateDir.split('/').pop();
            if (args.path.includes(tplFolder)) {
                return;
            }

            if (!args.path.includes('page-data.json')) {
                return;
            }

            const pageFileArr = fs.readdirSync(pageDir, {withFileTypes: true})
                .filter(item => !item.isDirectory() && (item.name.includes('.html') || item.name.includes('.njk')))
                .map(item => item.name);
            const dataFileExists = fs.existsSync(dataFile);
            const data = await fs.promises.readFile(dataFile, "utf8");
            let contents;

            if (pageFileArr.length > 0) {
                if (dataFileExists) {
                    pageFileArr.forEach(file => {
                        contents = env.render(file, JSON.parse(data));
                        fs.writeFile(`${outputDir}/${file}`, contents, err => reportNunjucksWriteFileOp(err, file));
                    });
                } else {
                    pageFileArr.forEach(file => {
                        contents = nunjucks.render(`${file}`);
                        fs.writeFile(`${outputDir}/${file}`, contents, err => reportNunjucksWriteFileOp(err, file));
                    })
                }
            }
        })
    }
});

export { nunjucksPlugin };