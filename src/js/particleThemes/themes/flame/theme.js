import { renderProfiles } from './renderProfiles.js';
import { animationTracks } from './animationTracks.js';
import { killConditions } from './killConditions.js';
import { customAttributes } from './customAttributes.js';
// import { linkCreationAttributes } from './linkCreationAttributes.js';
import { colorProfiles } from './colorProfiles.js';
import { renderFn } from './renderFn.js';

const flameTheme = {
    contextBlendingMode: 'lighter',
    active: 1,
    life: { min: 30, max: 60 },
    angle: { min: 1.45, max: 1.55 },
    mag: { min: 8, max: 13 },
    velAcceleration: 1.05,
    // velAcceleration: { min: 1, max: 1 },
    magDecay: 1.5,
    radius: { min: 100, max: 180 },
    targetRadius: { min: 1, max: 2 },
    applyGlobalForces: false,
    colorProfiles: colorProfiles,
    renderProfiles: renderProfiles,
    customAttributes: customAttributes,
    proximity: {
        check: false,
        threshold: 50
    },
    animationTracks: animationTracks,

    events: [{
        eventType: 'emit',
        eventParams: {
            emitterName: 'smokeEmitter'
        }
    }],

    killConditions: killConditions,
    renderParticle: renderFn
};

export { flameTheme };