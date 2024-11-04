import { animationTracks } from './animationTracks.js';
import { killConditions } from './killConditions.js';
import { customAttributes } from './customAttributes.js';
import { linkCreationAttributes } from './linkCreationAttributes.js';
import { renderFn } from './renderFn.js';
import { colorProfiles } from './colorProfiles.js';

var rainTheme = {
    contextBlendingMode: 'lighter',
    active: 1,
    life: { min: 100, max: 100 },
    angle: { min: 0, max: 0 },
    magDecay: 0,
    // velAcceleration: 0.9,
    velAcceleration: { min: 1, max: 1
     },
    radius: { min: 0.2, max: 2 },
    targetRadius: { min: 0, max: 0 },
    applyGlobalForces: false,
    colorProfiles: colorProfiles,
    renderProfiles: [{ shape: 'Circle', colorProfileIdx: 0 }],
    linkCreationAttributes,
    customAttributes,
    animationTracks,
    killConditions,
    renderParticle: renderFn,
};

export { rainTheme };