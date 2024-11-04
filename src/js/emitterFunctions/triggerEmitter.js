import { randomInteger } from "../mathFunctions/mathUtils";
import { emitEntities } from "./emitterStore";

/**
 * @description Updates the EmitterEntity emission values saved to <initValues> on creation.
 * @param {object} emitter - the emitter to update.
 * @param {object} options - object containing optional configuration options including overriding trigger options and logger.
 * @param {object} [options.triggerOptions] - Optional - the point to emit new entities (particles). If omitted the particles will be emitted from the current emitter coordinates.
 * @param {object} [options.logger] - Optional - global logger instance for application data logging and display
 * @returns {void}
 */
function triggerEmitter(emitter, options) {
    const self = emitter;

    const { emissionOpts, particleOpts, canvasData, rateMin, rateMax, repeatRate } = self;

    if (options) {
        if (options.triggerOptions) {
            const { x, y } = options.triggerOptions;
            self.x = x;
            self.y = y;
        }
        if (options.logger) {
            // console.log('triggerEmitter logger', options.logger);
        }
    }

    self.active = 1;
    self.localClockRunning = true;

    const emitAmount = randomInteger(rateMin, rateMax);

    emitEntities(self.x, self.y, emitAmount, emissionOpts, particleOpts, self.store, self.pool, canvasData, options.logger);

    if (repeatRate > 0) {
        self.active = 1;
        // updateEmitter( self, { updates: { x: thisX, y: thisY }, logger: options.logger } );
    }
};

export { triggerEmitter };