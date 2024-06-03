// utilities
import { mathUtils } from './../../../mathUtils.js';

// theme partials
import { animationTracks } from'./animationTracks.js';
import { killConditions } from'./killConditions.js';
import { customAttributes } from'./customAttributes.js';
import { renderFn } from'./renderFn.js';

var fireTheme = {
    contextBlendingMode: 'lighter',
    active: 1,
    life: { min: 20, max: 100 },
    angle: { min: 0, max: 2 },
    magDecay: 1,
    // velAcceleration: 0.9,
    velAcceleration: { min: 0.7, max: 0.85 },
    radius: { min: 0.5, max: 20 },
    targetRadius: { min: 0, max: 0 },
    applyGlobalForces: true,
    colorProfiles: [{ r: 255, g: 255, b: 255, a: 1 }, { r: 215, g: 0, b: 0, a: 0 }, { r: 0, g: 215, b: 0, a: 0 }, { r: 0, g: 0, b: 215, a: 0 }],
    renderProfiles: [{ shape: 'Circle', colorProfileIdx: 0 }],
    customAttributes,
    animationTracks,
    killConditions,
    renderParticle: renderFn
};

export { fireTheme };