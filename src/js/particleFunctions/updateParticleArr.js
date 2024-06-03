import { particleFn } from './../particleFn.js';

const updateParticleArr = ( storeArr, poolArr, animation, canvasConfig, entityCounter, emitterStore) => {
    // loop housekeeping

    let arrLen = storeArr.length - 1;
    for ( let i = arrLen; i >= 0; i-- ) {
        let p = storeArr[i];
        p.isAlive != 0 ?
            particleFn.checkParticleKillConditions(p, canvasConfig.width, canvasConfig.height) ?
                p.kill(p, poolArr, p.idx, entityCounter) :
                p.update(p, emitterStore) :
            false;
    } // end For loop
    // liveEntityCount === 0 ? ( console.log( 'liveEntityCount === 0 stop anim' ), animation.state = false ) : 0;

};

export { updateParticleArr };