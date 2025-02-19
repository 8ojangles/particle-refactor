import { animation } from './runtime/animation.js';
import { environment, runtimeConfig, createCanvasConfig, clearCanvas, initialiseEngine } from './runtime/environment.js';
import { updateEmitterStoreMembers } from './emitterFunctions/emitterStore.js';
import { updateParticleArr, renderParticleArr } from './particleFunctions/particleArrFn.js';
import { presetThemeNames } from './themeUtils.js';
import { initialiseUI, setParticlePreset } from './ui/ui.js';
import { displayDebugging, logger } from './debugUtils.js';
import { stores as mainStore } from './stores/stores.js';
// does this work
const { runtimeEngine } = environment;
const { startAnimation, stopAnimation } = runtimeEngine;

// cache canvas dimensions
const canvasConfig = createCanvasConfig();
const { w, h, canvases } = canvasConfig;
const { main: mainCanvas, blit: blitCanvas } = canvases;
const stores = mainStore;

// setup for initial particle examples
setParticlePreset(presetThemeNames.warpedstars, canvasConfig);
logger.setDisplay(true);

// runtime
// declared here until I work out how to extract it to its own file and use it as an instance in the 2 init functions. It is currently taking in a lot of the imports declared above in the global scope. fn.bind() only works on the first update (i think)
function update() {
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
    // displayDebugging(mainCanvas, false);
    // console based debugging
    // logger.updateTime(runtimeEngine.masterClock);
    // logger.setEntityPoolCount(entityPool.getSize());
    // logger.setEntityArrayCount(entities.length);
    // logger.displayCounts(runtimeEngine.masterClock);
}

initialiseUI(stores, animation, update, mainCanvas, canvasConfig, logger);

initialiseEngine('initialEmitter', stores, animation, update, canvasConfig, logger);
