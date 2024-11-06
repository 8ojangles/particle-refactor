const renderStore = [];

function clearRenderStore(store) {
    console.log('clearRenderStore', store);
    store = [];
}

function addToRenderStore(store, index) {
    store.push(index);
}

export { renderStore, clearRenderStore, addToRenderStore };