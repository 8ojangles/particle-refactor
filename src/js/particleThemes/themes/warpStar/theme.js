import { renderFn } from './renderFn.js';
import { animationTracks } from './animationTracks.js';
import { killConditions } from './killConditions.js';
import { customAttributes } from './customAttributes.js';
import { linkCreationAttributes } from './linkCreationAttributes.js';
import { renderProfiles } from './renderProfiles.js';
import { colorProfiles } from './colorProfiles.js';

const warpStarTheme = {
    contextBlendingMode: 'lighter',
    active: 1,
    life: { min: 50, max: 100 },
    angle: { min: 0, max: 2 },
    // velAcceleration: 1.05,
    velAcceleration: { min: 1.005, max: 1.03 },
    magDecay: 1,
    radius: { min: 1, max: 1.5 },
    targetRadius: { min: 4, max: 20 },
    globalAlphaInitial: 0,
    globalAlphaTarget: 1,
    globalAlpha: 0,
    linkCreationAttributes: linkCreationAttributes, 
    applyGlobalForces: false,
    colorProfiles: colorProfiles,
    renderProfiles: renderProfiles,
    customAttributes: customAttributes,
    animationTracks: animationTracks,
    killConditions: killConditions,
    renderParticle: renderFn,
};

export { warpStarTheme };