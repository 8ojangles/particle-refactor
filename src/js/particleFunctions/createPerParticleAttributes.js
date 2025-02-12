import { radialDistribution, calculateVelocities } from '../mathFunctions/trigonomicUtils.js';
import { randomInteger, random as rand, mapValues, getRandomArbitrary  } from'../mathFunctions/mathUtils.js';
import { createAnimationTracks } from './createAnimationTracks.js';
import { themes } from './../particleThemes/themes.js';

const PI = Math.PI;

/**
 * @description given min/max bounds return lifeSpan (number) within bounds. Use bitwise to check for odd/even results. Make even to help with anims that are fraction of life (frames)
 * @param {number} min - minimum bounds
 * @param {number} max - maximum bounds
 * @returns {number}
 */
function calculateLifeSpan(min, max) {
    let lifeSpan = randomInteger(min, max);
    if (lifeSpan & 1) {
        return lifeSpan++;
    }
    return lifeSpan;
}

/**
 * @typedef {object} processedInitR
 * @property {number} value - the array of LinkedCreationAttributes
 */
/**
 * @typedef {object} processedTargetRadius
 * @property {number} value - the array of LinkedCreationAttributes
 */
/**
 * @typedef {object} processedLifeSpan
 * @property {number} value - the array of LinkedCreationAttributes
 */

/**
 * @typedef {object} processedLinkedAttributeObj
 * @property {processedInitR} [initR]
 * @property {processedTargetRadius} [targetRadius]
 * @property {processedLifeSpan} [lifeSpan]
 */

/**
 * @description process LinkedCreationAttributes from Particle Theme into object for later use
 * @param {array} arr - the array of LinkedCreationAttributes
 * @param {array} theme - the theme to derive values from
 * @param currentContext - "this" from the parent function
 * @returns {processedLinkedAttributeObj}
 */
function processLinkedAttributes(arr, theme, emissionOpts, currentContext) {
    let obj = {};
    
    if ( arr && arr.length > 0 ) {
        const arrLen = arr.length;
        for ( let i = arrLen - 1; i >= 0; i-- ) {
            const { src, srcValue, target, attr } = arr[ i ];

            const srcVal = theme[ src ] || emissionOpts[ src ];

            obj[ attr ] = {
                value: mapValues(
                    currentContext[ srcValue ],
                    srcVal.min,
                    srcVal.max,
                    theme[ target ].min,
                    theme[ target ].max,
                    true
                )
            }
        }
    }
    return obj;
}

function createPerParticleAttributes(x, y, emissionOpts, perParticleOpts, idx) {
    // direct particle options from theme
    const themed = perParticleOpts || themes.reset;
    const emitThemed = emissionOpts || false;
    const { linkCreationAttributes: linkedAttr, customAttributes, colorProfiles, life, radius, targetRadius: tRadius, velAcceleration } = themed;

    const lifeSpan = calculateLifeSpan(life.min, life.max);
    // emitter based attributes
    const emission = emitThemed.emission || emitThemed;
    
    const { direction: dir, impulse: imp, radialDisplacement, radialDisplacementOffset } = emission;

    const direction = dir.rad > 0 ? dir.rad : rand(dir.min, dir.max) * PI;
    const impulse = imp.pow > 0 ? imp.pow : rand( imp.min, imp.max);
    this.impulse = impulse;
    // set new particle origin dependent on the radial displacement
    if ( radialDisplacement > 0 ) {
        const newCoords = radialDistribution(x, y, radialDisplacement + rand( radialDisplacementOffset * -1, radialDisplacementOffset), direction);

        x = newCoords.x;
        y = newCoords.y;
    }

    const velocities = calculateVelocities(x, y, direction, impulse);

    // theme based attributes
    const initR = rand(radius.min, radius.max);
    const targetRadius = rand( tRadius.min, tRadius.max);
    const acceleration = rand( velAcceleration.min, velAcceleration.max );
    this.acceleration = acceleration;
    const tempStore = processLinkedAttributes(linkedAttr, themed, emissionOpts, this);

    const tempCustom = {
        lensFlare: {
            mightFlare: true,
            willFlare: customAttributes.lensFlare.mightFlare === true && randomInteger(0, 1000) < 10 ? true : false,
            angle: 0.30
        }
    };

    let ppa = {
        active: perParticleOpts.active || themed.active || 0,
        initR: tempStore.initR !== undefined ? tempStore.initR.value : initR,
        tR: tempStore.targetRadius !== undefined ? tempStore.targetRadius.value : targetRadius,
        lifeSpan: tempStore.lifeSpan !== undefined ? tempStore.lifeSpan.value : lifeSpan,
        angle: direction,
        magnitude: impulse,
        relativeMagnitude: impulse,
        magnitudeDecay: themed.magDecay,
        x: x,
        y: y,
        xOld: x,
        yOld: y,
        vel: 0,
        xVel: velocities.xVel,
        yVel: velocities.yVel,
        vAcc: acceleration,
        applyForces: themed.applyGlobalForces,
        globalAlpha: themed.globalAlpha,
        globalAlphaInitial: themed.globalAlphaInitial,
        globalAlphaTarget: themed.globalAlphaTarget,
        color4Data: { ...colorProfiles[0] },
        colorProfiles: colorProfiles,

        // color4Change: color4Change,
        killConditions: themed.killConditions,
        customAttributes: tempCustom,
        // renderFN: themed.renderParticle || renderParticle,
        renderFN: themed.renderParticle,
        events: themed.events
    };

    if (idx) {
        ppa.idx = idx;
    }

    ppa.animationTracks = createAnimationTracks( themed.animationTracks, ppa );

    return ppa;
};

export { createPerParticleAttributes };