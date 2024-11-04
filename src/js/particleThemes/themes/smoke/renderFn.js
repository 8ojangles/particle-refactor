// utilities
import { drawFillCircle } from '../../../drawingFunctions/canvasApiAugmentation.js';
import { rgba } from '../../../drawingFunctions/colorUtils.js';

function renderFn(x, y, r, colorData, ctx) {
    var p = this;
    // console.log( 'rendering smoke' );

    if (ctx.globalCompositeOperation !== 'source-over') {
        ctx.globalCompositeOperation = 'source-over';
    }

    var grd = ctx.createRadialGradient(x, y, 0, x, y, r);
    // var grd = ctx.createRadialGradient(x, y, 0, x, y, r);
    // grd.addColorStop(0, rgba( colorData.r,  colorData.g, colorData.b, 0.05) );
    // grd.addColorStop(1, rgba( colorData.r, colorData.g, colorData.b, 0) );
    grd.addColorStop(0, rgba(colorData.r, colorData.g, colorData.b, colorData.a));
    grd.addColorStop(1, rgba(colorData.r, colorData.g, colorData.b, 0));
    ctx.fillStyle = grd;
    drawFillCircle(x, y, r, ctx);
};

export { renderFn };