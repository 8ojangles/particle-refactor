import { animationTracks } from'./animationTracks.js';
import { killConditions } from'./killConditions.js';
import { customAttributes } from'./customAttributes.js';
import { renderFn } from'./renderFn.js';
import { colorProfiles } from'./colorProfiles.js';

const fireTheme = {
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
    colorProfiles: colorProfiles,
    renderProfiles: [{ shape: 'Circle', colorProfileIdx: 0 }],
    customAttributes,
    animationTracks,
    killConditions,
    renderParticle: renderFn
};

export { fireTheme };