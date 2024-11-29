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
    life: { min: 20, max: 35 },
    angle: { min: 1.45, max: 1.55 },
    mag: { min: 5, max: 10 },
    velAcceleration: { min: 1.01, max: 1.02 },
    // velAcceleration: { min: 1, max: 1 },
    magDecay: 1.75,
    radius: { min: 80, max: 130 },
    targetRadius: { min: 0, max: 0 },
    applyGlobalForces: false,
    colorProfiles: colorProfiles,
    renderProfiles: renderProfiles,
    customAttributes: customAttributes,
    proximity: {
        check: false,
        threshold: 50
    },
    animationTracks: animationTracks,
    linkCreationAttributes: [],
    events: [{
        eventType: 'emit',
        eventParams: {
            emitterName: 'smokeEmitter'
        }
    }],

    killConditions: killConditions,
    renderParticle: renderFn,
};

export { flameTheme };