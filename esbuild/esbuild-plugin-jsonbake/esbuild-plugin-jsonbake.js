import fs from 'node:fs';
import {
    checkFile,
    parseFile,
    reportWriteFileOp
} from './utils.js';
import { defaultIncludeFiles } from './config.js';

const defaultOptions = {
    stripComments: false,
    indentation: "\t",
    parsePattern: /\{\{\s*([\/\.\-\w]*)\s*\}\}/,
    variables: {},
    variableRegex: /@(\w+)@/g
}

const jsonbakePlugin = (opts) => ({
    name: 'jasonbake',
    setup(build) {
        const { files } = opts;
        console.log('jsonbake opts: ', opts);
        const options = {
            ...defaultOptions,
            ...opts
        };

        build.onResolve({ filter: /\.(json)$/ }, async () => {
            const result = await build.resolve();
            console.log('jsonbake onResolve result: ', result);
            return result;
        });

        build.onLoad({ filter: /\.(json)$/ }, (args) => {
            // Merge user options with default options, without defaultIncludeFiles

            console.log('jsonbake args: ', args);

            if (args.path.includes('partials')) {
                return;
            }

            if (!options.includeFiles) {
                options.includeFiles = defaultIncludeFiles;
            } else {
                options.includeFiles = {
                    ...defaultIncludeFiles,
                    ...options.includeFiles
                }
            }

            // Loop over all files given in config and parse them
            files.forEach((file) => {
                const { src, dest } = file;
                if (!checkFile(src)) return;

                const destContent = JSON.stringify(parseFile(src, options), null, options.indentation);

                fs.writeFile(dest, destContent, err => reportWriteFileOp(err, src));
            });
            
            return;
        });
    }
});

export { jsonbakePlugin };