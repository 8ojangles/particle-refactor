// utilities
import { drawFillCircle } from '../../../drawingFunctions/canvasApiAugmentation.js';

function renderFn(x, y, r, colorData, ctx) {
    const { r: colR, g, b } = colorData;
    ctx.fillStyle = `rgba(${colR}, ${g}, ${b}, 0)`;
    drawFillCircle(x, y, r, ctx);
};

export { renderFn };