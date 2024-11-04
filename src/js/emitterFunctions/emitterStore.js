import { createLiveParticle, reincarnateParticle } from '../particleFunctions/createParticleFns.js';
import { randomInteger } from '../mathFunctions/mathUtils.js';
import { updateEmitter } from './updateEmitter.js';

let EmitterStoreFn = function EmitterStoreFn() {};

function clearEmitterStore( emitterStore ) {
    emitterStore = [];
    return emitterStore;
};

function updateEmitterStoreMembers(store, logger) {
    for ( let i = store.length - 1; i >= 0; i-- ) {
        const emitter = store[i];
        updateEmitter(emitter, {logger});
          // renderEmitter( emitter, ctx );
    }
}

function prePopulateEntityStore(entityArr, entityPool, emitterTheme, particleTheme, count) {
    for (var i = 0; i < count; i++) {
        entityArr.push(createLiveParticle(0, 0, i, emitterTheme, particleTheme));
        entityPool.insert(i);
    }
}

function processOriginPoint(origin, passedValue, canvasData) {
    const { point, buffer, full, min, max } = origin;
    if ( point !== null ) {
        return point;
    } else {
        if ( full ) {
            return randomInteger(0 - buffer, canvasData + buffer);
        }
        if ( min !== null && max !== null ) {
            return randomInteger(min - buffer, max + buffer);
        }
    }
    return passedValue;
}

function emitEntities(x, y, count, emissionOptions, particleOptions, store, pool, canvasData, logger) {
    let entityStoreLen = store.length;
    let addedNew = 0;
    let addedFromPool = 0;
    const { origin } = emissionOptions;
    const isOrigin = origin !== undefined;

    if ( isOrigin ) {
        if (origin.x.type === 'point') {
            x = origin.x.point;
        }
        if (origin.y.type === 'point') {
            y = origin.y.point;
        }
    }

    // console.log( "emitEntitys logger: ", logger);
    // runtimeConfig.liveEntityCount += count;
    for ( let i = count - 1; i >= 0; i-- ) {
        if ( isOrigin ) {
            if (origin.x.type === 'full') {
                x = randomInteger(0 - origin.x.buffer, canvasData.w + origin.x.buffer);
            }

            if (origin.x.type === 'range') {
                x = randomInteger(origin.x.min - origin.x.buffer, origin.x.max + origin.x.buffer);
            }

            if (origin.y.type === 'full') {
                y = randomInteger(0 - origin.y.buffer, canvasData.w + origin.y.buffer);
            }

            if (origin.y.type === 'range') {
                y = randomInteger(origin.y.min - origin.y.buffer, origin.y.max + origin.y.buffer);
            }
        }
        
        if (pool.getSize() > 0) {
            store[pool.getHeadNode().getData()] = reincarnateParticle(x, y, emissionOptions, particleOptions);
            addedFromPool++;
            pool.removeFirst();
        } else {
            store.push(createLiveParticle( x, y, entityStoreLen, emissionOptions, particleOptions) );
            addedNew++;
            entityStoreLen++;
        }
    }
    logger.addNew(addedNew);
    logger.addReincarnated(addedFromPool);
}

export {
    EmitterStoreFn,
    clearEmitterStore,
    prePopulateEntityStore,
    updateEmitterStoreMembers,
    emitEntities
};