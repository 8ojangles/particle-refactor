// @ts-ignore
import { Circle, TangentResult } from './../mathFunctions/trigonomic-types.d.js';
import { angle2, circleInsideCircle, getTangentPoints } from '../mathFunctions/trigonomicUtils.js';

/**
 * @typedef {Object} strokeOptions
 * @property {string} [color="white"] - the color of the stroke defined in CSS format
 * @property {number} [lineWidth=2] - the thickness of the stroke
 * @property {CanvasLineCap} [lineCap="round"] - Path join handling
 */

/**
 * @typedef {Object} fillOptions
 * @property {string} [color="white"] - the color of the fill defined in CSS format
 */

/**
* @description draw circle API
* @param {number} x - origin X of circle.
* @param {number} y - origin Y of circle.
* @param {number} r - radius of circle.
* @param {CanvasRenderingContext2D} ctx - the canvas context to draw the shape on
*/
function drawCircle(x, y, r, ctx) {
	ctx.beginPath();
	ctx.arc(x, y, r, 0, Math.PI * 2, true);
};

/**
* @description API to draw filled circle
* @param {number} x - origin X of circle.
* @param {number} y - origin Y of circle.
* @param {number} r - radius of circle.
* @param {CanvasRenderingContext2D} ctx - the canvas context to draw the shape on
*/
function drawFillCircle(x, y, r, ctx) {
	drawCircle(x, y, r, ctx);
	ctx.fill();
	ctx.beginPath();
};

/**
* @description API to draw stroked circle
* @param {number} x - origin X of circle.
* @param {number} y - origin Y of circle.
* @param {number} r - radius of circle.
* @param {CanvasRenderingContext2D} ctx - the canvas context to draw the shape on
*/
function drawStrokeCircle(x, y, r, ctx) {
	drawCircle(x, y, r, ctx);
	ctx.stroke();
	ctx.beginPath();
};

/**
* @description API to draw ellipse.
* @param {number} x - origin X of ellipse.
* @param {number} y - origin Y or ellipse.
* @param {number} w - width of ellipse.
* @param {number} h - height of ellipse.
* @param {CanvasRenderingContext2D} ctx - the canvas context to draw the shape on
*/
function drawEllipse(x, y, w, h, ctx) {
	ctx.beginPath();
	for (var i = 0; i < Math.PI * 2; i += Math.PI / 16) {
		ctx.lineTo(x + Math.cos(i) * w / 2, y + Math.sin(i) * h / 2);
	}
	ctx.closePath();
};

/**
* @description API to draw filled ellipse.
* @param {number} x - origin X of ellipse.
* @param {number} y - ofigin Y or ellipse.
* @param {number} w - width of ellipse.
* @param {number} h - height of ellipse.
* @param {CanvasRenderingContext2D} ctx - the canvas context to draw the shape on
*/
function drawFillEllipse(x, y, w, h, ctx) {
	drawEllipse(x, y, w, h, ctx);
	ctx.fill();
	ctx.beginPath();
};

/**
* @description API to draw stroked ellipse.
* @param {number} x - origin X of ellipse.
* @param {number} y - ofigin Y or ellipse.
* @param {number} w - width of ellipse.
* @param {number} h - height of ellipse.
* @param {CanvasRenderingContext2D} ctx - the canvas context to draw the shape on
*/
function drawStrokeEllipse(x, y, w, h, ctx) {
	drawEllipse(x, y, w, h, ctx);
	ctx.stroke();
	ctx.beginPath();
};

/**
* @description API to draw line between 2 vector coordinates.
* @param {number} x1 - X coordinate of vector 1.
* @param {number} y1 - Y coordinate of vector 1.
* @param {number} x2 - X coordinate of vector 2.
* @param {number} y2 - Y coordinate of vector 2.
* @param {CanvasRenderingContext2D} ctx - the canvas context to draw the shape on
*/
function drawLine(x1, y1, x2, y2, ctx) {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
	ctx.beginPath();
};

/**
* @description API to draw outline of 2 circles connected via their tangent lines into single shape. If the second Circle lies inside the first then only the first circle will be drawn.
* @param {Circle} c1 - x/y/r for the first circle.
* @param {Circle} c2 - x/y/r for the first circle.
* @param {CanvasRenderingContext2D} ctx - the canvas context
* @param {strokeOptions} strokeOptions - Optional: The stroke options for the shape. Defaults to: color: "White", lineWidth: 2, lineCap: "round"
* @default [strokeOptions: {color: 'white', lineWidth: 2, lineCap: 'round'}]
*/
function drawStrokeDroplet(c1, c2, ctx, strokeOptions) {
    const { x: x1, y: y1, r: r1 } = c1;
    const { x: x2, y: y2, r: r2 } = c2;
    
    ctx.strokeStyle = strokeOptions.color || "white";
    ctx.lineCap = strokeOptions.lineCap || "round";
    ctx.lineWidth = strokeOptions.lineWidth || 2;

    if (circleInsideCircle(x1, y1, r1, x2, y2, r2)) {
        drawStrokeCircle(x1, y1, r1, ctx);
    } else {
        const tangents = getTangentPoints(c1, c2);
        const { line1: l1, line2: l2 } = tangents;
        const c1A = angle2(x1, y1, l1.start.x, l1.start.y);
        const c1B = angle2(x1, y1, l2.start.x, l2.start.y);
        const c2A = angle2(x2, y2, l1.end.x, l1.end.y);
        const c2B = angle2(x2, y2, l2.end.x, l2.end.y);

        ctx.beginPath();
        ctx.moveTo(l1.start.x, l1.start.y);
        ctx.lineTo(l1.end.x, l1.end.y);
        if (r2 > 0) {
            ctx.arc(x2, y2, r2, c2A, c2B, true);
        }
        ctx.moveTo(l2.end.x, l2.end.y);
        ctx.lineTo(l2.start.x, l2.start.y);
        ctx.arc(x1, y1, r1, c1B, c1A, true);
        ctx.stroke();
        
        ctx.closePath();
        // ctx.strokeStyle = "white";
        // ctx.lineTo(l2.end.x, l2.end.y);
        // ctx.stroke();
        ctx.beginPath();
    }
}

/**
* @description API to draw filled shape of 2 circles connected via their tangent lines into single shape. If the second Circle lies inside the first then only the first circle will be drawn.
* @param {Circle} c1 - x/y/r for the first circle.
* @param {Circle} c2 - x/y/r for the first circle.
* @param {CanvasRenderingContext2D} ctx - the canvas context to draw the shape on
* @param {fillOptions} [fillOptions] - Optional: The fill options for the shape. Defaults to: color: "White".
*/
function drawFillDroplet(c1, c2, ctx, fillOptions) {
	const opts = { color: "white", ...fillOptions };
    const { x: x1, y: y1, r: r1 } = c1;
    const { x: x2, y: y2, r: r2 } = c2;
    ctx.fillStyle = opts.color;

    if (circleInsideCircle(x1, y1, r1, x2, y2, r2)) {
        drawFillCircle(x1, y1, r1, ctx);
    } else {
        const tangents = getTangentPoints(c1, c2);
        const { line1: l1, line2: l2 } = tangents;
        const t1A = angle2(x1, y1, l1.start.x, l1.start.y);
        const t1B = angle2(x1, y1, l2.start.x, l2.start.y);
        const t2A = angle2(x2, y2, l1.end.x, l1.end.y);
        const t2B = angle2(x2, y2, l2.end.x, l2.end.y);
        ctx.beginPath();
        ctx.moveTo(l1.start.x, l1.start.y);
        ctx.lineTo(l1.end.x, l1.end.y);
        ctx.arc(x2, y2, r2, t2A, t2B, true);
        ctx.lineTo(l2.start.x, l2.start.y);
        ctx.arc(x1, y1, r1, t1A, t1B, false);
        ctx.closePath();
        ctx.fill();
    }
}

export {
    drawCircle,
    drawStrokeCircle,
    drawFillCircle,
    drawEllipse,
    drawStrokeEllipse,
    drawFillEllipse,
    drawLine,
    drawStrokeDroplet,
    drawFillDroplet
};