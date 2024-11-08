import { exec } from 'child_process';

const controller = new AbortController();
const { signal } = controller;

const documentationPlugin = (opts) => ({
    name: 'documentation',
    setup(build) {
        const { files } = opts;

        build.onStart(() => {
            console.log("Starting documentation build...");
        });

        build.onLoad({ filter: /.*/ }, async (args) => {

            try {
                exec('documentation build src/js/** -f html --github -o dist/docs --config documentationConfig.yml', { signal });
            } catch (error) {
                console.error('error', error);
            }

            controller.abort();
        });
    }
});

export { documentationPlugin };