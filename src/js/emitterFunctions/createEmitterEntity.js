import LinkedList from "dbly-linked-list";
import { particleRenderers } from './../particleThemes/themes.js';

/**
 * @typedef {object} EmitterEntityInitialValues
 * @property {number} rateMin - Logged for potential emitter resets: the particle emission rate minimum (per repeat rate)
 * @property {number} rateMax - Logged for potential emitter resets: the particle emission rate maximum (per repeat rate)
 * @property {number} rateDecay - Logged for potential emitter resets: How much will the <rateMin|rateMax> reduce each triggered emission
 * @property {number} rateDecayMax - Logged for potential emitter resets: The <rateDecay> threshold, below which no further decay
 * @property {number} repeatRate - Logged for potential emitter resets: How many ticks between emission triggers
 * @property {number} repeatDecay - Logged for potential emitter resets: How much will the <repeatRate> increase after each triggered emission
 * @property {number} repeatDecayMax - Logged for potential emitter resets: The <repeatDecay> threshold, above which no further decay
*/

/**
 * @typedef {object} EmitterEntity
 * @property {string} name - The name of the emitter created at runtime
 * @property {number} storeIndex - The index of the emitter in the emitter store
 * @property {object} emitterOpts - The emitter theme,
 * @property {object} emissionOpts - The emitter runtime configuration
 * @property {object} particleOpts - The attached particle configuration
 * @property {object} canvasData - Runtime canvas configuration
 * @property {number} x - the X coordinate of the emitter
 * @property {number} y - the Y coordinate of the emitter
 * @property {number} xVel - the X velocity of the emitter
 * @property {number} yVel - the Y velocity of the emitter
 * @property {boolean} applyGlobalForces - Add global forces to emitter movement calculations
 * @property {number} localClock - The emitter local clock
 * @property {boolean} localClockRunning - is the emitter local clock running?
 * @property {array} store - the main entity (particle) array
 * @property {LinkedList} pool - the main entity availability pool
 * @property {number} active - emitter active (1: active, 0: inactive)
 * @property {number} rateMin - the particle emission rate minimum (per repeat rate)
 * @property {number} rateMax - the particle emission rate maximum (per repeat rate)
 * @property {number} rateDecay - How much will the <rateMin|rateMax> reduce each triggered emission
 * @property {number} rateDecayMax - The <rateDecay> threshold, below which no further decay
 * @property {number} repeatRate - How many ticks between emission triggers
 * @property {number} repeatDecay - How much will the <repeatRate> increase after each triggered emission
 * @property {number} repeatDecayMax - The <repeatDecay> threshold, above which no further decay
 * @property {string} triggerType - How is the emitter triggered
 * @property {function} particleRenderer - particle renderer function
 * @property {EmitterEntityInitialValues} initValues - initial emission values for the emitter stored for possible resets
 */

/**
 * @description Creates an Emitter Entity with configuration derived from an Emitter Theme and Particle theme passed in at time of creation.
 * @param {string} emitterName - The name of the emitter
 * @param {object} emitterTheme - The Emitter theme
 * @param {object} particleOpts - The Particle theme attached to this emitter
 * @param {array} entityStore - The main Particle array
 * @param {number} storeIndex - The index of the emitter in the emitter store
 * @param {LinkedList} pool - The main entity pool
 * @param {object} canvasData - useful canvas data used in updating the emitter  during runtime
 * @param {object} [logger] - the global logger object for any telemetry
 * @returns {EmitterEntity} - The constructed Emitter Entity
 */
function createEmitterEntity(
    emitterName,
    emitterTheme,
    particleOpts,
    entityStore,
    storeIndex,
    pool,
    canvasData,
    logger
) {

    const { emitter, emission } = emitterTheme;
    const { rate, repeater } = emission;
    const { min: rateMin, max: rateMax, decay: rateDecay } = rate;
    const { rate: repeatRate, decay: repeatDecay } = repeater;
    const renderer = particleRenderers[particleOpts.renderFunction];

    return {
        name: emitterName,
        emitterOpts: emitterTheme,
        emissionOpts: emission,
        particleOpts: particleOpts,
        canvasData: canvasData,
        x: emitter.x,
        y: emitter.y,
        xVel: emitter.xVel,
        yVel: emitter.yVel,
        applyGlobalForces: emitter.applyGlobalForces,
        localClock: 0,
        localClockRunning: false,
        store: entityStore,
        storeIndex: storeIndex,
        pool: pool,
        active: emitter.active,
        rateMin,
        rateMax,
        rateDecay: rateDecay.rate,
        rateDecayMax: rateDecay.decayMax,
        repeatRate,
        repeatDecay: repeatDecay.rate,
        repeatDecayMax: repeatDecay.decayMax,
        triggerType: 'mouseClickEvent',
        particleRenderer: renderer,
        initValues: {
            rateMin,
            rateMax,
            rateDecay: rateDecay.rate,
            rateDecayMax: rateDecay.decayMax,
            repeatRate,
            repeatDecay: repeatDecay.rate,
            repeatDecayMax: repeatDecay.decayMax
        }
    }
}

export { createEmitterEntity };