import { displayDebugging } from '../debugUtils';
import { updateEmitterStoreMembers } from '../emitterFunctions/emitterStore';
import { environment, runtimeConfig, clearCanvas } from './environment.js';
import { renderParticleArr } from '../particleFunctions/renderParticleArr.js';
import { updateParticleArr } from '../particleFunctions/updateParticleArr.js';
const { runtimeEngine } = environment;
const { startAnimation, stopAnimation } = runtimeEngine;

function update(args) {
    const { canvasConfig, stores, animation, logger, w, h, blitCanvas, mainCanvas } = args;

    const { ctx: blitCtx, el: blitEl } = blitCanvas;
    const { currentEmission } = canvasConfig;
    const { contextBlendingMode } = currentEmission.particleTheme;
    const { entities, emitters, entityPool } = stores;

    // update cycle
    // 1: reset loop variable
    // 2: clean canvas
    // 3: change blend mode if different to particle config
    // 4: render particles to blitter (offscreen canvas)
    // 5: transfer blitter to onscreen canvas
    // 6: update particles and emitters
    runtimeEngine.runtime = undefined;
    clearCanvas( mainCanvas.ctx, blitCtx, w, h );
    if (blitCtx.globalCompositeOperation !== contextBlendingMode) {
        blitCtx.globalCompositeOperation = contextBlendingMode;
    }
    renderParticleArr(blitCtx, stores, logger);
    mainCanvas.ctx.drawImage(blitEl, 0, 0);
    updateParticleArr(stores, runtimeConfig, animation, logger, {w, h});
    updateEmitterStoreMembers(emitters, logger);

    // looping
    animation.state === true ?
        (startAnimation(runtimeEngine.runtime, update), runtimeEngine.masterClock++) : stopAnimation(runtimeEngine.runtime);

    // canvas based debugging
    displayDebugging(mainCanvas);
    // console based debugging
    logger.updateTime(runtimeEngine.masterClock);
    logger.setEntityPoolCount(entityPool.getSize());
    logger.setEntityArrayCount(entities.length);
    logger.displayCounts(runtimeEngine.masterClock);
}

export { update };