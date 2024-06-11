// dependencies

// NPM
import { default as LinkedList } from 'dbly-linked-list';
import * as objectPath from 'object-path';

// Custom Requires
// import { mathUtils } from './mathUtils.js';
// import { trigonomicUtils as trig } from './trigonomicUtils.js';
// import { canvasDrawingApi } from './canvasApiAugmentation.js';
// import { colorUtils } from './colorUtils.js';
// import { easingEquations as easing } from './easing.js';
import { animation } from './animation.js';
import { debug, displayDebugging, lastCalledTime } from './debugUtils.js';
import { environment, initialiseCanvas, runtimeConfig, createCanvasConfig, clearCanvas, initialiseEngine } from './environment.js';
const physics = environment.forces;
const runtimeEngine = environment.runtimeEngine;

// Particle engine machinery
import { EmitterEntity } from './emitterEntity.js';
import { EmitterStoreFn, prePopulateEntityStore, updateEmitterStoreMembers, emitEntities } from './emitterStore.js';
import { particleArrFn } from './particleArrFn.js';
import { particleFn } from './particleFn.js';
import {
    setParticleAttributes,
    reincarnateParticle,
    createLiveParticle
} from './particleFunctions/createParticleFns.js';
// Emitter themes
import { emitterThemes } from './emitterThemes/emitterThemes.js';
// particle themes
import { themes } from './particleThemes/themes.js';
import { particleThemeNames, emitterThemeNames, emissionTypeNames } from './themeUtils.js';
import { initialiseUI } from './ui.js';

// cache canvas dimensions
const canvasConfig = createCanvasConfig();
// initialise canvases
const mainCanvas = initialiseCanvas(canvasConfig.w, canvasConfig.h, "#test-base", false, true, false);
const blitCanvas = initialiseCanvas(canvasConfig.w, canvasConfig.h, 'blitterCanvas', true, true, true);

// emitter store
var emitterStore = [];
// particle store
var entityStore = [];
// particle store meta data
var entityPool = new LinkedList();
var liveEntityCount = 0;

// pre-populate entityStore
console.log( "pre-populating entityStore with '%d' particles: ", 5000 );
prePopulateEntityStore(entityStore, entityPool, emitterThemes.base, themes.reset, 5000, emitterStore);
console.log( "entityStore pre-populated entityStore with '%d' particles: ", 5000 );
// console.log( 'initial particle: ', entityStore[ 9997 ] );

// global counter
let globalClock = 0;
let counter = 0;

// set default variables 
let mouseX = void 0,
    mouseY = void 0,
    runtime = void 0,
    pLive = void 0;

// set defaults
canvasConfig.updateParticleTheme(particleThemeNames.flame);
canvasConfig.updateEmitterTheme(emitterThemeNames.flamestream);
canvasConfig.updateEmissionType(emissionTypeNames.steadyStream);
canvasConfig.updateEmissionPoint(canvasConfig.centerH, canvasConfig.centerV);

// var currEmmissionType = {
//     mouseClickEvent: false,
//     randomBurst: false,
//     steadyStream: true
// };

// let streamEmmisionLimiter = false;

// var smokeEmitter = new EmitterEntity('smokeEmitter', smokeStreamTheme, themes.smoke, emitEntities, entityStore, entityPool);
// emitterStore.push(smokeEmitter);

function updateCycle() {

    // if ( currEmmissionType.steadyStream === true ) {
    //     if ( streamEmmisionLimiter === false ) {
    //         testEmitter.triggerEmitter({
    //             x: canvasConfig.centerH,
    //             y: canvasConfig.centerV
    //         });
    //         streamEmmisionLimiter = true;
    //         animation.state = true;
    //     }
    // }


    // rendering
    
    particleArrFn.renderParticleArr( blitCanvas.ctx, entityStore, animation );
    // blitCtx.filter = "blur(0px)";
    // blit to onscreen
    mainCanvas.ctx.drawImage( blitCanvas.el, 0, 0 );
    // ctx.fillStyle = holeGrad;
    // ctx.fillCircle( canvasCentreH, canvasCentreV, 200 );

    // updating
    particleArrFn.updateParticleArr( entityStore, entityPool, animation, canvasConfig, runtimeConfig, emitterStore );

    updateEmitterStoreMembers(emitterStore);

}

/////////////////////////////////////////////////////////////
// runtime
/////////////////////////////////////////////////////////////
function update() {

    // loop housekeeping
    runtime = undefined;

    // clean canvas
    clearCanvas( mainCanvas.ctx, blitCanvas.ctx, canvasConfig.w, canvasConfig.h );

    // blending
    if ( blitCanvas.ctx.globalCompositeOperation != canvasConfig.currentEmission.particleTheme.contextBlendingMode ) {
        blitCanvas.ctx.globalCompositeOperation = canvasConfig.currentEmission.particleTheme.contextBlendingMode;
    }

    // updates
    updateCycle();

    // debugging
    displayDebugging(mainCanvas);

    // looping
    animation.state === true ? (runtimeEngine.startAnimation(runtime, update), counter++) : runtimeEngine.stopAnimation(runtime);

    // global clock
    // counter++;
}
/////////////////////////////////////////////////////////////
// End runtime
/////////////////////////////////////////////////////////////

initialiseUI(animation, update, mainCanvas, canvasConfig, emitterStore, entityStore, entityPool, emitEntities );

initialiseEngine('initialEmitter', emitEntities, emitterStore, entityStore, entityPool, canvasConfig, animation, update);
