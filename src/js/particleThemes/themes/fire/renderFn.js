// utilities
import { mathUtils } from './../../../mathUtils.js';
import { trigonomicUtils as trig } from './../../../trigonomicUtils.js';

var renderFn = function renderFn(x, y, r, colorData, context) {
    const p = this;
    const { xVel, yVel, relativeMagnitude } = p;
    const { r: colR, g: colG, b: colB, a: colA } = colorData;
    // console.log( 'p.render: ', p );
    const newAngle = trig.getAngleAndDistance(x, y, x + xVel, y + yVel);
    const compiledColor = `rgba(${colR}, ${colG}, ${colB}, ${colA})`;
    const endColor = `rgba(${colR}, ${colG}, ${colB}, 0)`;
    context.fillStyle = compiledColor;
    const stretchVal = mathUtils.mapValues(relativeMagnitude, 0, 100, 1, 10);

    context.save();
    context.translate(x, y);
    // context.rotate( p.angle );
    context.rotate(newAngle.angle);
    context.fillEllipse(0, 0, r * stretchVal, r, context);
    context.restore();
};

export { renderFn };