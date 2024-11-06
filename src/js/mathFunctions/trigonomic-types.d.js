/**
 * @typedef {Object} Point - represents a point in 2D space with x/y coordinates
 * @property {number} x - the x coordinate of the point
 * @property {number} y - the y coordinate of the point
 */

/**
 * @typedef {Object} Circle - represents a circle in 2D space
 * @property {number} x - the x coordinate of the circle's centre
 * @property {number} y - the y coordinate of the circle's centre
 * @property {number} r - the radius of the circle
 */

/**
 * @typedef {Object} Line - represents a line in 2D space
 * @property {Point} start - the x/y coordinates for the start of the line 
 * @property {Point} end - the x/y coordinates for the end of the line
 */

/**
 * @typedef {Object} TangentResult - represents the start and end points for the 2 tangent lines between 2 circles
 * @property {Line} line1 the x/y coordinates for the start and end of the first tangent 
 * @property {Line} line2 the x/y coordinates for the start and end of the first tangent 
 */

/**
 * @typedef {Object} VelocityVector - represents the velocity change along the x and y axis
 * @property {number} xVel - speed along the x axis
 * @property {number} yVel - speed along the y axis
 */

export const Types = {}
