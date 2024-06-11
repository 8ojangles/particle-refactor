import { createLiveParticle } from './particleFunctions/createParticleFns.js';

let EmitterStoreFn = function EmitterStoreFn() {};

EmitterStoreFn.prototype.update = function ( store ) {
    let i = store.length - 1;
    for (; i >= 0; i--) {
        store[i].updateEmitter();
        // store[i].renderEmitter( ctx );
    }
};

EmitterStoreFn.prototype.clearMembers = function ( store ) {
    store.length = 0;
};

function updateEmitterStoreMembers(store) {
    for ( let i = store.length - 1; i >= 0; i-- ) {
        store[ i ].updateEmitter();
          // store[i].renderEmitter( ctx );
    }
}

function prePopulateEntityStore(store, pool, emitterTheme, particleTheme, num, emitterArr) {
    for (var i = 0; i < num; i++) {
        // pInstance.idx = i;
        // console.log( "pInstance.idx '%d'", pInstance.idx )
        store.push(createLiveParticle(0, 0, i, emitterTheme, particleTheme, emitterArr));
        // console.log( 'initial particle: ', entityStore[ i ] );
        pool.insert('' + i);
    }
}

function emitEntities(x, y, count, emissionOptions, particleOptions, store, pool, emitterArr) {
    var entityStoreLen = store.length;
    var addedNew = 0;
    var addedFromPool = 0;
    var theta;

    // console.log( "emmiting a total of: '%d' particles", count );
    // runtimeConfig.liveEntityCount += count;
    for ( let i = count - 1; i >= 0; i-- ) {

        if (pool.getSize() > 0) {
            store[ pool.getTailNode().getData() ].reincarnate( x, y, emissionOptions, particleOptions, emitterArr );
            addedFromPool++;
            pool.remove();
        } else {
            store.push( createLiveParticle( x, y, entityStoreLen, emissionOptions, particleOptions, emitterArr ) );
            pool.insert('' + entityStoreLen);
            addedNew++;
            entityStoreLen++;
        }
    }
    // console.log( "addedFromPool: '%d', addedNew: '%d'", addedFromPool, addedNew );
    // console.warn( 'addedNew: ', addedNew );
}

export { EmitterStoreFn, prePopulateEntityStore, updateEmitterStoreMembers, emitEntities };