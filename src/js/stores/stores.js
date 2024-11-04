/**
* @param {import('./createParticleFns.js').Particle[]} pArr - Array of particles to update
*/

// NPM
import { default as LinkedList } from 'dbly-linked-list';
import { renderStore } from './renderStore.js';

// particle store
let entityArr = [];
// emitter store
let emitterArr = [];
// particle store meta data
let entityPool = new LinkedList();

const stores = {
    entities: entityArr,
    entityPool: entityPool,
    emitters: emitterArr,
    renderEntities: renderStore
}

export { stores };