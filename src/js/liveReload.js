new EventSource('/esbuild').addEventListener('change', e => {
    const { added, removed, updated } = JSON.parse(e.data)
    console.log('event: ', e);
    console.log('updated: ', updated);
    
    if (!added.length && !removed.length && updated.length >= 1) {


        if (updated.some(path => path.includes('.css'))) {
            const link = document.getElementById('mainStyles');

            const changedCssFile = updated.find(file => file.includes('.css') && !file.includes('.map'));
            if (changedCssFile === undefined) {
                console.log('No css file found');
                return;
            }

            console.log('changedCssFile: ', changedCssFile);
            if (link && changedCssFile.length > 0) {
                // @ts-ignore
                const url = new URL(link.href)

                if (url.host === location.host && url.pathname === changedCssFile) {
                    const next = link.cloneNode()
                    // @ts-ignore
                    next.href = changedCssFile + '?' + Math.random().toString(36).slice(2)
                    // @ts-ignore
                    next.onload = () => link.remove()
                    link.parentNode.insertBefore(next, link.nextSibling)
                    return
                }
            }
        }
    }

    location.reload()
});