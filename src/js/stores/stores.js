/**
* @param {import('./../particleFunctions/createParticleFns.js').Particle[]} pArr - Array of particles to update
*/

// NPM
import { default as LinkedList } from 'dbly-linked-list';
import { addToRenderStore, clearRenderStore } from './renderStore.js';

// particle store
let entityArr = [];
// emitter store
let emitterArr = [];
// particle store meta data
let entityPool = new LinkedList();
// Render store meta data
const renderStore = [];

const stores = {
    entities: entityArr,
    entityPool: entityPool,
    emitters: emitterArr,
    renderEntities: renderStore,
    addToRenderStore: function(index) {
        // @ts-ignore
        this.renderEntities.push(index);
    },
    clearRenderStore: function() {
        // @ts-ignore
        this.renderEntities = [];
    },
    getEmitters: function() {
        // @ts-ignore
        return this.emitters;
    },
    getEmitterByName: function(name) {
        // @ts-ignore
        return this.emitters.find((emitter) => emitter.name === name);
    },
    getEmitterByIndex: function(index) {
        // @ts-ignore
        return this.emitters[index];
    }
}

export { stores };