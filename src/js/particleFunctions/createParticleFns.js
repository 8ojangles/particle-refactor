import { createPerParticleAttributes as createPPA } from './createPerParticleAttributes.js';

/**
 * @typedef {Object} Color4 - RGBA color values used in rendering shapes/ gradients or animation color profiles
 * @property {number} r - the RED channel for a color profile
 * @property {number} g - the GREEN channel for a color profile
 * @property {number} b - the BLUE channel for a color profile
 * @property {number} a - the ALPHA channel for a color profile
 * 
*/

/**
 * @typedef {object} EntityPositioning
 * @property {number} x - the current X coordinate for the entity (centre);
 * @property {number} y - the current Y coordinate for the entity (centre);
 * @property {number} xVel - the current X-axis (horizontal) velocity of the entity;
 * @property {number} yVel - the current Y-axis (vertical) velocity of the entity;
 * @property {number} vAcc - the current absolute acceleration of the entity (pixels);
 * @property {number} angle - the angle (radians) of the entity movement;
 * @property {number} magnitude - the velocity of the entity derived from the emission config at creation;
 * @property {number} relativeMagnitude - the velocity of the entity at current time;
 * @property {number} magnitudeDecay - the rate at which the magnitude changes (per frame/tick);
 */

/**
 * @typedef {object} EntityDisplay
 * @property {number} initR - the radius of the particle at creation;
 * @property {number} r - the current radius of the particle;
 * @property {number} tR - the target radius of the particle (for animations);
 * @property {number} globalAlpha - the current opacity applied to the particle at render;
 * @property {number} globalAlphaInitial - the initial opacity (used in creating animation tracks) applied to the particle at render;
 * @property {number} globalAlphaTarget - the target (final) opacity (used in creating animation tracks) applied to the particle at render;
 * @property {Color4} color4Data - the current RGBA color data for rendering particle shapes;
 * @property {Color4[]} colorProfiles - Array of Color4 objects used for creating animation tracks involving particle rendering color;
 */

/**
 * @typedef {object} EntityConfig
 * @property {number} isAlive - The active state of the particle (0: dead / 1: live);
 * @property {string} entityType - the type of the particle;
 * @property {boolean} applyForces - are global forces applied to the particle movement;
 */

/**
 * @typedef {object} EntityLife
 * @property {number} lifeSpan - how long the particle will live for (frames);
 * @property {number} currLife - internal clock ticks from 0 to lifespan;
 * @property {number} currLifeInv - internal clock reversed, ticks from lifespan to 0;
 */

/**
 * @typedef {Object} Particle2
 * @property {number} [idx] - the index of the particle in the entityArray
 * @property {EntityLife} life - Any parameters and flags relating to the particle's lifespan
 * @property {EntityConfig} config - Any parameters and flags relating to the particle
 * @property {EntityPositioning} positioning - Any parameters related to the position of the particle including coordinates, velocities, accelerations and derived calculations
 * @property {EntityDisplay} renderConfig
 * @property {Object} killConditions - Object representing conditions checked to determine if particle is to be killed;
 * @property {Object} customAttributes - Object representing custom attributes to be parsed at creation for use in rendering/updating/animation;
 * @property {Object[]} animationTracks - Array of objects representing animation tracks to be parsed at creation;
 * @property {Object[]} events - Array of objects representing events that can be fired based on kill conditions or animation tracks;
 * @property {function} reincarnate - Function to remap particle themes onto inactive particles from <entityPool>
 * @property {function} render - Function to render the particle based on it's theme
*/

/**
 * @typedef {Object} Particle
 * @property {number} [idx] - the index of the particle in the entityArray
 * @property {number} isAlive - The active state of the particle (0: dead / 1: live);
 * @property {number} lifeSpan - how long the particle will live for (frames);
 * @property {number} currLife - internal clock ticks from 0 to lifespan;
 * @property {number} currLifeInv - internal clock reversed, ticks from lifespan to 0;
 * @property {number} x - the current X coordinate for the particle (centre);
 * @property {number} y - the current Y coordinate for the particle (centre);
 * @property {number} xVel - the current X-axis (horizontal) velocity of the particle;
 * @property {number} yVel - the current Y-axis (vertical) velocity of the particle;
 * @property {number} vAcc - the current absolute acceleration of the particle (pixels);
 * @property {number} initR - the radius of the particle at creation;
 * @property {number} r - the current radius of the particle;
 * @property {number} tR - the target radius of the particle (for animations);
 * @property {number} angle - the angle (radians) of the particle movement;
 * @property {number} magnitude - the velocity of the particle derived from the emitter at creation;
 * @property {number} relativeMagnitude - the velocity of the particle at current time;
 * @property {number} magnitudeDecay - the rate at which the magnitude changes (per frame/tick);
 * @property {string} entityType - the type of the particle;
 * @property {boolean} applyForces - are global forces applied to the particle movement;
 * @property {number} globalAlpha - the current opacity applied to the particle at render;
 * @property {number} globalAlphaInitial - the initial opacity (used in creating animation tracks) applied to the particle at render;
 * @property {number} globalAlphaTarget - the target (final) opacity (used in creating animation tracks) applied to the particle at render;
 * @property {Color4} color4Data - the current RGBA color data for rendering particle shapes;
 * @property {Color4[]} colorProfiles - Array of Color4 objects used in creating animation tracks;
 * @property {Object} killConditions - Object representing conditions checked to determine if particle is to be killed;
 * @property {Object} customAttributes - Object representing custom attributes to be parsed at creation for use in rendering/updating/animation;
 * @property {Object[]} animationTracks - Array of objects representing animation tracks to be parsed at creation;
 * @property {Object[]} events - Array of objects representing events that can be fired based on kill conditions or animation tracks;
 * @property {function} reincarnate - Function to remap theme onto dead particle
 * @property {function} render - Function to render the particle based on it's theme
*/

/**
 * @description wrapper function to set new particle values on the passed particle (p) and computed values (ppa)
 * @param {object} ppa - computed values to map onto the particle via createPerParticleAttributes/createPPA function
 * @returns {Particle} the newly remapped particle
 */
function setParticleAttributes(ppa) {
    return {
        isAlive: ppa.active,
        lifeSpan: ppa.lifeSpan,
        currLife: ppa.lifeSpan,
        currLifeInv: 0,
        x: ppa.x,
        y: ppa.y,
        xVel: ppa.xVel,
        yVel: ppa.yVel,
        vAcc: ppa.vAcc,
        initR: ppa.initR,
        r: ppa.initR,
        tR: ppa.tR,
        angle: ppa.angle,
        magnitude: ppa.magnitude,
        relativeMagnitude: ppa.magnitude,
        magnitudeDecay: ppa.magnitudeDecay,
        entityType: 'none',
        applyForces: ppa.applyForces,
        globalAlpha: ppa.globalAlpha,
        globalAlphaInitial: ppa.globalAlphaInitial,
        globalAlphaTarget: ppa.globalAlphaTarget,
        color4Data: ppa.color4Data,
        colorProfiles: ppa.colorProfiles,
        killConditions: ppa.killConditions,
        customAttributes: ppa.customAttributes,
        animationTracks: ppa.animationTracks,
        reincarnate: reincarnateParticle,
        render: ppa.renderFN,
        events: ppa.events,
        ...(ppa.idx) && {idx: ppa.idx}
    };
}

/**
 * @description create a new particle at X/Y with an index of IDX based on the emission theme (eOpts) and particle theme (pOpts)
 * @param {number} x - the x coordinate
 * @param {number} y - the y coordinate
 * @param {number} idx - the index of the particle in the parent particle array
 * @param {object} eOpts - Emission theme options
 * @param {object} pOpts - Particle theme options
 * @returns {object} - the newly create particle
 */
function createLiveParticle(x, y, idx, eOpts, pOpts) {
    return setParticleAttributes(createPPA(x, y, eOpts, pOpts, idx));
}

/**
 * @description particle method attached to the particle (as <p.reincarnate>. Remaps/overwrites new emission (eOpts) and particle theme options (pOpts) and sets live (p.isAlive)
 * @param {number} x - the x coordinate
 * @param {number} y - the y coordinate
 * @param {object} eOpts - Emission theme options
 * @param {object} pOpts - Particle theme options
 * @returns {Particle} - the particle is remapped with new attributes in-place
 */
function reincarnateParticle(x, y, eOpts, pOpts) {
    return setParticleAttributes(createPPA(x, y, eOpts, pOpts));
}

export {
    setParticleAttributes,
    reincarnateParticle,
    createLiveParticle
};