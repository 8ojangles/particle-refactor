/**
 * @description Updates the EmitterEntity emission values saved to <initValues> on creation.
 * @param {object} emitter - the emitter to update.
 * @returns {void}
 */
function resetEmitterEmissions (emitter) {

    if ( !emitter.initValues ) {
        return;
    }

    const { rateMin, rateMax, rateDecay, rateDecayMax, repeatRate, repeatDecay, repeatDecayMax } = emitter.initValues;

    emitter.rateMin = rateMin;
    emitter.rateMax = rateMax;
    emitter.rateDecay = rateDecay;
    emitter.rateDecayMax = rateDecayMax;
    emitter.repeatRate = repeatRate;
    emitter.repeatDecay = repeatDecay;
    emitter.repeatDecayMax = repeatDecayMax;
};

export { resetEmitterEmissions };