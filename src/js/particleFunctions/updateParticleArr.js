import { checkParticleKillConditions } from './checkParticleKillConditions.js';
import { updateParticle } from './updateParticle.js';
import { killParticle } from './killParticle.js';
import LinkedList from 'dbly-linked-list';
import { addToRenderStore } from '../stores/renderStore.js';
/**
 * @typedef {Object} Dimensions - the dimensions of the canvas
 * @property {number} w - the width of the canvas
 * @property {number} h - the height of the canvas
*/

/**
 * @description given an array of Particles, updates each member based on their theme at time of creation and connected emitter properties
 * @param {object} stores - - The application data store 
 * @param {object} entityCounter - RuntimeConfig
 * @param {object} logger - logging untility
 * @param {object} animation - runtime
 * @param {Dimensions} canvasDimensions - The dimensions of the canvas (w/h)
 * @returns {void}
 */
const updateParticleArr = (stores, entityCounter, animation, logger, {w, h}) => {
    const { entities, emitters, entityPool, renderEntities } = stores;
    let killedP = 0;
    let arrLen = entities.length - 1;
    for ( let i = arrLen; i >= 0; i-- ) {
        let p = entities[i];
        if (p.isAlive !== 0) {
            if (checkParticleKillConditions(p, w, h)) {
                // console.log('killing particle');
                killParticle(p, entityPool, i, entityCounter);
                killedP++;
            } else {
                updateParticle(p, emitters);
                stores.addToRenderStore(i);
            }
        }
    } // end For loop
    logger.addKilled(killedP);
    if (renderEntities.length === 0) {
        console.log('%c No particles added to renderStore', 'color: #dddd00');
        animation.state = false;
    }
};

export { updateParticleArr };