import { triggerEmitter } from "./triggerEmitter";

function processEmitterUpdateOptions(emitter, emitterUpdateOpts) {
    const { updates, logger } = emitterUpdateOpts;
    if (updates) {
        const { x, y } = updates;
        emitter.x = x;
        emitter.y = y;
    }
    if (logger) {
        // console.log('emitter update logger: ', logger);
    }
    return emitter;
}

function processEmitterRepeat(emitter) {
    emitter.repeatRate += emitter.repeatDecay;
    emitter.localClock = 0;
    emitter.localClockRunning === true;
    return emitter;
}

function processEmitterDecay(emitter) {
    const { rateDecay, rateDecayMax } = emitter;
    emitter.rateMin > rateDecayMax ? emitter.rateMin -= rateDecay : emitter.rateMin = 0;
    emitter.rateMax > rateDecayMax ? emitter.rateMax -= rateDecay : emitter.rateMax = 0;
    return emitter;
}

/**
 * @description Updates the EmitterEntity given it's theme and any updateOptions<updateOpts> provided (usually x/y coordinates). Even though values are destructured at the start any updates are assigned on the original <This/Self> object.
 * @param {object} [updateOpts] - any updates for the emitter in this update tick.
 * @param {object} [updateOpts.updates] - any updates for the emitter in this update tick.
 * @param {object} [updateOpts.logger] - Global application telemetry logging instance.
 * @returns {void}
 */
function updateEmitter(emitter, updateOpts) {
    var self = emitter;
    // console.log('updateEmitter logger: ', logger);
    let triggerEmitterFlag = false;
    if (updateOpts) {
        processEmitterUpdateOptions(self, updateOpts);
    }

    self.x += self.xVel;
    self.y += self.yVel;

    if (self.active === 1) {
        const { repeatRate, localClockRunning } = self;

        if (repeatRate > 0 && localClockRunning === true) {
            if (self.localClock % repeatRate === 0) {
                triggerEmitterFlag = true;
                if (self.repeatDecay < self.repeatDecayMax) {
                    processEmitterRepeat(self)
                }
                if (self.rateDecay > 0) {
                    processEmitterDecay(self);
                }
            } else {
                triggerEmitterFlag = false;
            }
        }
        self.localClock++;
    }

    if (triggerEmitterFlag === true) {
        triggerEmitter(
            self, 
            {
                triggerOptions: {
                    x: self.x, 
                    y: self.y
                },
                logger: updateOpts.logger
            }
        );
    }
};

export { updateEmitter };