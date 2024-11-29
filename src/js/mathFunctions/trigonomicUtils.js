// @ts-ignore
import { Point, Circle, Line, TangentResult, VelocityVector } from './trigonomic-types.d.js';

/**
 * @typedef {Object} Calculation
 * @property {number} distance The distance between vectors
 * @property {number} angle The angle between vectors
*/

/**
* cached values
*/
const { PI } = Math;
const piByHalf = PI / 180;
const halfByPi = 180 / PI;

/**
* @description calculate angle between 2 vector coordinates.
* @param {number} x1 - X coordinate of vector 1.
* @param {number} y1 - Y coordinate of vector 1.
* @param {number} x2 - X coordinate of vector 2.
* @param {number} y2 - Y coordinate of vector 2.
* @returns {number} result.
*/
function angle(x1, y1, x2, y2) {
	const dx = x1 - x2;
	const dy = y1 - y2;
	return Math.atan2(-dy, -dx);
}

/**
* @description calculate angle between 2 vector coordinates.
* @param {number} x1 - X coordinate of vector 1.
* @param {number} y1 - Y coordinate of vector 1.
* @param {number} x2 - X coordinate of vector 2.
* @param {number} y2 - Y coordinate of vector 2.
* @returns {number} result.
*/
function angle2(x1, y1, x2, y2) {
	const dx = x2 - x1;
	const dy = y2 - y1;
	return Math.atan2(dy, dx);
}

/**
* @description calculate distance between 2 vector coordinates.
* @param {number} x1 - X coordinate of vector 1.
* @param {number} y1 - Y coordinate of vector 1.
* @param {number} x2 - X coordinate of vector 2.
* @param {number} y2 - Y coordinate of vector 2.
* @returns {number} result.
*/
function dist(x1, y1, x2, y2) {
	x2 -= x1;y2 -= y1;
	return Math.sqrt(x2 * x2 + y2 * y2);
}

/**
* @description convert degrees to radians.
* @param {number} degrees - the degree value to convert.
* @returns {number} result.
*/
function degreesToRadians(degrees) {
	return degrees * piByHalf;
}

/**
 * @description convert radians to degrees.
 * @param {number} radians - the degree value to convert.
 * @returns {number} result.
 */
function radiansToDegrees(radians) {
	return radians * halfByPi;
}

/**
 * @function getAngleAndDistance
 * @description calculate trigomomic values between 2 vector coordinates.
 * @param {number} x1 - X coordinate of vector 1.
 * @param {number} y1 - Y coordinate of vector 1.
 * @param {number} x2 - X coordinate of vector 2.
 * @param {number} y2 - Y coordinate of vector 2.
 * @returns {Calculation} Calculation - the calculated angle and distance between vectors
*/
function getAngleAndDistance(x1, y1, x2, y2) {
	// set up base values
	const dX = x2 - x1;
	const dY = y2 - y1;
	// get the distance between the points
	const d = Math.sqrt(dX * dX + dY * dY);
	// angle in radians
	// var radians = Math.atan2(yDist, xDist) * 180 / Math.PI;
	// angle in radians
	const r = Math.atan2(dY, dX);
	return {
		distance: d,
		angle: r
	};
}

/**
 * @function getAdjacentLength
 * @description get new X coordinate from angle and distance.
 * @param {number} radians - the angle to transform in radians.
 * @param {number} distance - the distance to transform.
 * @returns {number} result.
*/
function getAdjacentLength(radians, distance) {
	return Math.cos(radians) * distance;
}

/**
 * @function findNewPoint
 * @description given an origin in x/y coordinates, get new x/y coordinates from angle and distance.
 * @param {number} x - the x coordinate of the origin.
 * @param {number} y - the y coordinate of the origin.
 * @param {number} angle - the angle to transform in radians.
 * @param {number} distance - the distance to transform.
 * @returns {Point} Point - the new coordinate object with x/y values.
*/
function findNewPoint(x, y, angle, distance) {
	return {
		x: Math.cos(angle) * distance + x,
		y: Math.sin(angle) * distance + y
	};
}

/**
 * @function calculateVelocities
 * @description given an origin (x/y), angle (radians) and impulse (number, represents a value, for example: pixels), return the velocity vector.
 * @param {number} x - the x coordinate of the origin.
 * @param {number} y - the y coordinate of the origin.
 * @param {number} angle - the angle to transform in radians.
 * @param {number} impulse - the speed along the vector.
 * @returns {VelocityVector}
*/
// function calculateVelocities(x, y, angle, impulse) {
// 	var a2 = Math.atan2(Math.sin(angle) * impulse + y - y, Math.cos(angle) * impulse + x - x);
// 	return {
// 		xVel: Math.cos(a2) * impulse,
// 		yVel: Math.sin(a2) * impulse
// 	};
// }
function calculateVelocities(x, y, angle, impulse) {
	// var a2 = Math.atan2(Math.sin(angle) * impulse + y - y, Math.cos(angle) * impulse + x - x);
	return {
		xVel: Math.cos(angle) * impulse,
		yVel: Math.sin(angle) * impulse
	};
}

/**
 * @function radialDistribution
 * @description given an origin in x/y coordinates, get new x/y coordinates from angle and distance.
 * @param {number} x - the x coordinate of the origin.
 * @param {number} y - the y coordinate of the origin.
 * @param {number} d - the distance to transform.
 * @param {number} a - the angle to transform in radians.
 * @returns {Point} the new coordinate object with x/y values.
*/
function radialDistribution(x, y, d, a) {
	return {
		x: x + d * Math.cos(a),
		y: y + d * Math.sin(a)
	};
}

/**
 * @function getTangentPoints
 * @description given coordinates and radii of 2 circles, calculate the start and end points for the 2 lines of tangent between the circles edges.
 * @param {Circle} c1 - x/y/r for the first Circle.
 * @param {Circle} c2 - x/y/r for the second Circle.
 * @returns {TangentResult} - the start and end coordinates for both tangent lines between the circles
 */
function getTangentPoints(c1, c2) {
    const {atan, asin, cos, PI, sin, sqrt} = Math;

    // probably a better (more mathematical) way than just swapping the circles
    if(c1.x > c2.x){
        let temp = c1;
        c1 = c2;
        c2 = temp;
    }
    const {x: x1, y: y1, r: r1} = c1;
    const {x: x2, y: y2, r: r2} = c2;
    // Angle from 0deg horizontal line to line between circle centers
    const gamma = atan((y1 - y2) / (x2 - x1));
    // Angle between line from center of c1 to center of c2 and r2 - r1 at x2, y2
    const beta = asin((r2 - r1) / sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2));
    // Angle between 90deg vertical line and a right angle to the tangent line
    const alpha = gamma - beta;
    // Angle between 90deg vertical line and a right angle to the other tangent line
    const theta = gamma + beta;
    const halfPIAlpha = PI/2 - alpha;
    const minusHalfPITheta = -PI/2 - theta;
    const cosAlpha = cos(halfPIAlpha);
    const sinAlpha = sin(halfPIAlpha);
    const cosTheta = cos(minusHalfPITheta);
    const sinTheta = sin(minusHalfPITheta);

    // First circle bottom tangent point
    const t1 = {
        x: x1 + r1 * cosAlpha,
        y: y1 + r1 * sinAlpha
    };

    // Second circle bottom tangent point
    const t2 = {
        x: x2 + r2 * cosAlpha,
        y: y2 + r2 * sinAlpha
    };

    // First circle top tangent point
    const t3 = {
        x: x1 + r1 * cosTheta,
        y: y1 + r1 * sinTheta
    };

    // Second circle top tangent point
    const t4 = {
        x: x2 + r2 * cosTheta,
        y: y2 + r2 * sinTheta
    };

    return {
        line1: {
            start: t1,
            end: t2
        },
        line2: {
            start: t3,
            end: t4
        }
    };
}

/**
 * @function circleInsideCircle
 * @description calculate if Circle 2 lies inside circle 1 
 * @param {number} x1 - X coordinate of Circle 1.
 * @param {number} y1 - Y coordinate of Circle 1.
 * @param {number} r1 - Y coordinate of Circle 1.
 * @param {number} x2 - X coordinate of Circle 2.
 * @param {number} y2 - Y coordinate of Circle 2.
 * @param {number} r2 - Y coordinate of Circle 1.
 * @returns {boolean} result.
*/
function circleInsideCircle(x1, y1, r1, x2, y2, r2) {
    const distance = Math
        .sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    return distance + r1 < r2;
}

/**
* provides trigonmic util methods.
*
* @mixin
*/
const trigonomicUtils = {
	radialDistribution,
	calculateVelocities,
	findNewPoint,
	getAdjacentLength,
	getAngleAndDistance,
	radiansToDegrees,
	degreesToRadians,
	dist,
	angle,
	angle2,
	getTangentPoints,
	circleInsideCircle
}

export {
	trigonomicUtils,
	radialDistribution,
	calculateVelocities,
	findNewPoint,
	getAdjacentLength,
	getAngleAndDistance,
	radiansToDegrees,
	degreesToRadians,
	dist,
	angle,
	angle2,
	getTangentPoints,
	circleInsideCircle
};