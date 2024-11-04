// utilities
import { drawFillDroplet, drawFillCircle } from '../../../drawingFunctions/canvasApiAugmentation.js';
import { mapValues } from '../../../mathFunctions/mathUtils.js';
import { getAngleAndDistance } from '../../../mathFunctions/trigonomicUtils.js';

function renderFn(x, y, r, colorData, ctx) {
    const p = this;
    const { xVel, yVel, relativeMagnitude } = p;
    const { r: colR, g, b, a } = colorData;
    // console.log( 'p.render: ', p );
    // const newAngle = getAngleAndDistance(x, y, x + xVel, y + yVel);
    // const stretchVal = mapValues(relativeMagnitude, 0, 100, 1, 20, true);

    ctx.save();
    ctx.translate(x, y);
    // ctx.rotate( p.angle );
    // ctx.rotate(newAngle.angle);
    // ctx.fillStyle = `rgba(${colR}, ${g}, ${b}, ${a})`;
    drawFillDroplet(
        { x: 0, y: 0, r: r},
        { x: 0, y: 0 - (r*15), r: 0},
        ctx,
        { color: `rgba(${colR}, ${g}, ${b}, ${a})` }
    );
    // drawFillCircle(0, 0, r, ctx);
    ctx.restore();
};

export { renderFn };