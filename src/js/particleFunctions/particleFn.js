import { checkParticleKillConditions } from './checkParticleKillConditions.js';
import { createPerParticleAttributes } from './createPerParticleAttributes.js';
import { updateParticle } from './updateParticle.js';
import { killParticle } from './killParticle.js';

const particleFn = {
	checkParticleKillConditions,
	createPerParticleAttributes,
	updateParticle,
	killParticle
};

export{
	particleFn,
	checkParticleKillConditions, 
	createPerParticleAttributes,
	updateParticle,
	killParticle
};