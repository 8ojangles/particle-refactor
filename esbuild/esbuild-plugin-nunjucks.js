import nunjucks from 'nunjucks';
import fs from 'node:fs';
import { checkFile, parseFile, reportWriteFileOp } from './esbuild-plugin-jsonbake/utils.js';
import { defaultIncludeFiles } from './esbuild-plugin-jsonbake/config.js';

const jbDefaultOptions = {
    stripComments: false,
    indentation: "\t",
    parsePattern: /\{\{\s*([\/\.\-\w]*)\s*\}\}/,
    variables: {},
    variableRegex: /@(\w+)@/g
}

const reportNunjucksWriteFileOp = (err, file) => {
    if (err) {
        console.error(err);
    } else {
        console.log(`${file} written to Dist folder`);
    }
}

async function processDataFile(options) {
    const { src, dest } = options;
    if (!checkFile(src)) return;

    const destContent = JSON.stringify(parseFile(src, options), null, options.indentation);
    try { 
        await fs.promises.writeFile(dest, destContent); 
        console.log("Data File Written to: ", dest); 
  
    } catch (err) {
        reportWriteFileOp(err, src); 
    }
};

const nunjucksPlugin = (options) => ({
    name: 'nunjucks',
    setup(build) {
        const { pageDir, dataFile, outputDir } = options;

        const jbOptions = {
            ...jbDefaultOptions,
            ...dataFile
        };

        if (!jbOptions.includeFiles) {
            jbOptions.includeFiles = defaultIncludeFiles;
        } else {
            jbOptions.includeFiles = {
                ...defaultIncludeFiles,
                ...jbOptions.includeFiles
            }
        }

        const pageFolderName = pageDir.split('/').pop();

        // @ts-ignore
        const env = new nunjucks.configure(
            'src/templates',
            { 
                autoescape: true,
                watch: true
            }
        );

        let dataFileProcessed = false;
        let dataFileExists = undefined;
        let siteData = undefined;
        let njkRenderRun = false;
        let buildNo = 1;

        build.onStart( async () => {
            console.log('build started');
            njkRenderRun = false;
            dataFileExists = fs.existsSync(dataFile.src);
            if (dataFileExists) {
                if (!dataFileProcessed) {
                    await processDataFile(jbOptions);
                    siteData = await fs.promises.readFile(dataFile.dest, "utf8");
                    dataFileProcessed = true;
                } else {
                    console.log('Already processed');
                }
            }

        });

        build.onLoad({ filter: /\.(html|njk|json)$/ }, async (args) => {
            // const tplFolder = templateDir.split('/').pop();
            if (!args.path.includes(pageFolderName) && njkRenderRun !== true) {
                return;
            }
            const pageFileArr = fs.readdirSync(pageDir, {withFileTypes: true})
                .filter(item => !item.isDirectory() && (item.name.includes('.html') || item.name.includes('.njk')))
                .map(item => item.name);
            let contents;

            if (pageFileArr.length > 0 && njkRenderRun === false) {
                if (dataFileExists) {
                    const compiledData = JSON.parse(siteData);
                    pageFileArr.forEach(file => {
                        contents = env.render(`pages/${file}`, compiledData);
                        fs.writeFile(`${outputDir}/${file}`, contents, err => reportNunjucksWriteFileOp(err, file));
                    });
                    njkRenderRun = true;
                } else {
                    pageFileArr.forEach(file => {
                        contents = nunjucks.render(`${file}`);
                        fs.writeFile(`${outputDir}/${file}`, contents, err => reportNunjucksWriteFileOp(err, file));
                    })
                    njkRenderRun = true;
                }
            }
            dataFileProcessed = false;

        });

        build.onEnd(() => {
            console.log('buildNo: ', buildNo);
            buildNo++;
        });
    }
});

export { nunjucksPlugin };