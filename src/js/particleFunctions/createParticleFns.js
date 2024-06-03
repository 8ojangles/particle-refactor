import { updateParticle, killParticle, createPerParticleAttributes } from './../particleFn.js';

function setParticleAttributes(p, ppa) {
    p.isAlive = ppa.active;
    p.lifeSpan = ppa.lifeSpan;
    p.currLife = ppa.lifeSpan;
    p.currLifeInv = 0;
    p.x = ppa.x;
    p.y = ppa.y;
    p.xVel = ppa.xVel;
    p.yVel = ppa.yVel;
    p.vAcc = ppa.vAcc;
    p.initR = ppa.initR;
    p.r = ppa.initR;
    p.tR = ppa.tR;
    p.angle = ppa.angle;
    p.magnitude = ppa.magnitude;
    p.relativeMagnitude = ppa.magnitude;
    p.magnitudeDecay = ppa.magnitudeDecay;
    p.entityType = 'none';
    p.applyForces = ppa.applyForces;
    p.globalAlpha = ppa.globalAlpha;
    p.globalAlphaInitial = ppa.globalAlphaInitial;
    p.globalAlphaTarget = ppa.globalAlphaTarget;
    p.color4Data = ppa.color4Data;
    p.colorProfiles = ppa.colorProfiles;
    p.killConditions = ppa.killConditions;
    p.customAttributes = ppa.customAttributes;
    p.animationTracks = ppa.animationTracks;
    p.update = updateParticle;
    p.reincarnate = reincarnateParticle;
    p.kill = killParticle;
    p.render = ppa.renderFN;
    p.events = ppa.events;
}

function createLiveParticle(thisX, thisY, idx, emissionOpts, particleOpts) {
    var newParticle = {};
    newParticle.idx = idx;
    setParticleAttributes( newParticle, createPerParticleAttributes( thisX, thisY, emissionOpts, particleOpts ) );
    return newParticle;
}

function reincarnateParticle(thisX, thisY, emissionOpts, particleOptions) {
    setParticleAttributes(this, createPerParticleAttributes(thisX, thisY, emissionOpts, particleOptions));
}

export {
    setParticleAttributes,
    reincarnateParticle,
    createLiveParticle
};