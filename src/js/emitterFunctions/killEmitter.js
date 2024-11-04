/**
 * @description Updates the EmitterEntity emission values saved to <initValues> on creation.
 * @param {object} emitter - the emitter to update.
 * @param {array} emitterStore - the array of emitters.
 * @returns {void}
 */
function killEmitter(emitter, emitterStore) {
    const emmiterIndex = emitterStore.findIndex((x) => x.name === emitter.name);
    if (emmiterIndex !== -1) {
        emitterStore.splice(emmiterIndex, 1);
    }
};

export { killEmitter };