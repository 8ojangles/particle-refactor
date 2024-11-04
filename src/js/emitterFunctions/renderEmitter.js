import { drawLine, drawStrokeCircle } from "../drawingFunctions/canvasApiAugmentation";

/**
 * @description Updates the EmitterEntity emission values saved to <initValues> on creation.
 * @param {object} emitter - the emitter to update.
 * @param {CanvasRenderingContext2D} ctx - the canvas context to render the emitter on.
 * @returns {void}
 */
function renderEmitter(emitter, ctx) {

    const { x, y } = emitter;

    ctx.strokeStyle = 'rgb( 255, 255, 255 )';
    ctx.lineWidth = 5;
    drawLine(x, y - 15, x, y + 15, ctx);
    drawLine(x - 15, y, x + 15, y, ctx);
    drawStrokeCircle(x, y, 10, ctx);
};

export { renderEmitter };