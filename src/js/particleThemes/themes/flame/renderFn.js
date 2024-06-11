// utilities
import { mathUtils } from './../../../mathUtils.js';
import { rgba } from './../../../colorUtils.js';
import { trigonomicUtils as trig } from './../../../trigonomicUtils.js';

function renderFn(x, y, r, colorData, context) {
    var p = this;
    var stretchVal = mathUtils.mapValues(p.currLifeInv, 0, p.lifeSpan, 1, 5);
    var offsetMap = mathUtils.mapValues(p.currLifeInv, 0, p.lifeSpan, 0, 1);
    var newAngle = trig.getAngleAndDistance(x, y, x + p.xVel, y + p.yVel);
    if (context.globalCompositeOperation !== 'lighter') {
        context.globalCompositeOperation = 'lighter';
    }
    context.save();
    context.translate(x, y);
    // context.save();
    var alpha = colorData.a;
    if (alpha > 1) {
        alpha = 1;
    }
    var offset = r * offsetMap;
    // // var offset = 0;
    var grd = context.createRadialGradient(0, 0 + offset, 0, 0, 0 + offset, r);
    // var grd = context.createRadialGradient(x, y, 0, x, y, r);
    grd.addColorStop(0, rgba(colorData.r, colorData.g, colorData.b, 0.03 * alpha));
    grd.addColorStop(0.5, rgba(colorData.r, colorData.g, colorData.b, 0.06 * alpha));
    grd.addColorStop(0.7, rgba(colorData.r, colorData.g, colorData.b, 0.065 * alpha));
    grd.addColorStop(0.85, rgba(colorData.r, colorData.g, colorData.b, 0.015 * alpha));
    grd.addColorStop(1, rgba(colorData.r, colorData.g, colorData.b, 0));
    context.fillStyle = grd;

    context.rotate(newAngle.angle);
    context.fillEllipse(0, 0, r * stretchVal, r, context);
    context.restore();
}

export { renderFn };