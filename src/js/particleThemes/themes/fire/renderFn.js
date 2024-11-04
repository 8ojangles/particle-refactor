// utilities
import { drawFillEllipse } from '../../../drawingFunctions/canvasApiAugmentation.js';
import { mapValues } from '../../../mathFunctions/mathUtils.js';
import { getAngleAndDistance } from '../../../mathFunctions/trigonomicUtils.js';

function renderFn(x, y, r, colorData, ctx) {
    const p = this;
    const { xVel, yVel, relativeMagnitude } = p;
    const { r: colR, g, b, a } = colorData;
    // console.log( 'p.render: ', p );
    const newAngle = getAngleAndDistance(x, y, x + xVel, y + yVel);
    const stretchVal = mapValues(relativeMagnitude, 0, 100, 1, 10, true);

    ctx.save();
    ctx.translate(x, y);
    // ctx.rotate( p.angle );
    ctx.rotate(newAngle.angle);
    ctx.fillStyle = `rgba(${colR}, ${g}, ${b}, ${a})`;
    drawFillEllipse(0, 0, r * stretchVal, r, ctx);
    ctx.restore();
};

export { renderFn };