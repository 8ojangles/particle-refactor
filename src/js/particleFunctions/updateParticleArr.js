import { checkParticleKillConditions } from './checkParticleKillConditions.js';
import { updateParticle } from './updateParticle.js';
import { killParticle } from './killParticle.js';

const updateParticleArr = ( storeArr, poolArr, animation, canvasConfig, entityCounter, emitterStore) => {
    // loop housekeeping

    let arrLen = storeArr.length - 1;
    for ( let i = arrLen; i >= 0; i-- ) {
        let p = storeArr[i];
        if (p.isAlive != 0) {
            if (checkParticleKillConditions(p, canvasConfig.w, canvasConfig.h)) {
                killParticle(p, poolArr, p.idx, entityCounter);
            } else {
                updateParticle(p, emitterStore);
            }
        }
    } // end For loop
    // liveEntityCount === 0 ? ( console.log( 'liveEntityCount === 0 stop anim' ), animation.state = false ) : 0;

};

export { updateParticleArr };