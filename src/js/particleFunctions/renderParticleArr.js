import { clearRenderStore } from "../stores/renderStore";
/**
 * @description given an array of Particles: (1) Stops animation (stops the update loop) and Returns early if <renderStore> length is 0. (2)Loops through <renderStore> (array of active particle indexes) using each entry as index lookup in <arr> Particle array, renders particle. (3) increments <rendered> counter to log out to logger. (4) Clears <renderStore> array at end of loop ready for update function.
 * @param {CanvasRenderingContext2D} ctx - Canvas context to render to
 * @param {object} stores - The application data store
 * @param {object} logger - logger instance collecting application telemetry
 * @returns {void}
 */
function renderParticleArr(ctx, stores, logger) {
    const { entities, renderEntities } = stores;

    const renderStoreLen = renderEntities.length;
    if (renderStoreLen === 0) {
        console.log('%c No particles rendered', 'color: #dddd00');
        return;
    }
    let rendered = 0;
    for (let i = renderStoreLen - 1; i >= 0; i--) {
        const p = entities[renderEntities[i]];
        rendered++;
        p.render( p.x, p.y, p.r, p.color4Data, ctx );
    }
    clearRenderStore(stores.renderEntities);
    logger.setParticlesRendered(rendered);
};

export { renderParticleArr };