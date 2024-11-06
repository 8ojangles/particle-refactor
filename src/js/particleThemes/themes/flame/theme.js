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
    life: { min: 15, max: 25 },
    angle: { min: 1.3, max: 1.7 },
    mag: { min: 8, max: 13 },
    velAcceleration: { min: 1.15, max: 1.20 },
    // velAcceleration: { min: 1, max: 1 },
    magDecay: 1.75,
    radius: { min: 80, max: 150 },
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