// utilities
import { mapValues } from '../../../mathFunctions/mathUtils.js';
import { rgba } from './../../../drawingFunctions/colorUtils.js';
import { getAngleAndDistance } from '../../../mathFunctions/trigonomicUtils.js';
import { drawFillEllipse } from '../../../drawingFunctions/canvasApiAugmentation.js';

function renderFn(x, y, r, colorData, ctx) {
    var p = this;
    // console.log(`p: ${p}`);
    var stretchVal = mapValues(p.currLifeInv, 0, p.lifeSpan, 1, 5, true);
    var offsetMap = mapValues(p.currLifeInv, 0, p.lifeSpan, 0, 1, true);
    // console.log(`offsetMap: ${offsetMap}`);
    var newAngle = getAngleAndDistance(x, y, x + p.xVel, y + p.yVel);
    // if (ctx.globalCompositeOperation !== 'lighter') {
    //     ctx.globalCompositeOperation = 'lighter';
    // }
    ctx.save();
    ctx.translate(x, y);
    // ctx.save();

    const { r: rd, g: gr, b: bl, a: al } = colorData;
    // console.log(`red: ${rd}, green: ${gr}, blue: ${bl}, alpha: ${al}`);
    var alpha = al;
    if (alpha > 1) {
        alpha = 1;
    }
    var offset = r * offsetMap;
    // // var offset = 0;
    var grd = ctx.createRadialGradient(0, 0 + offset, 0, 0, 0 + offset, r);
    // var grd = ctx.createRadialGradient(x, y, 0, x, y, r);
    grd.addColorStop(0, rgba(rd, gr, bl, 0.02 * alpha));
    grd.addColorStop(0.5, rgba(rd, gr, bl, 0.03 * alpha));
    grd.addColorStop(0.7, rgba(rd, gr, bl, 0.035 * alpha));
    grd.addColorStop(0.85, rgba(rd, gr, bl, 0.015 * alpha));
    grd.addColorStop(1, rgba(rd, gr, bl, 0));
    ctx.fillStyle = grd;

    ctx.rotate(newAngle.angle);
    drawFillEllipse(0, 0, r * stretchVal, r, ctx);
    ctx.restore();
}

export { renderFn };