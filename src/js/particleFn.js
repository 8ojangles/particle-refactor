import { checkParticleKillConditions } from './particleFunctions/checkParticleKillConditions.js';
import { createPerParticleAttributes} from './particleFunctions/createPerParticleAttributes.js';
import { updateParticle} from './particleFunctions/updateParticle.js';
import { killParticle} from './particleFunctions/killParticle.js';

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