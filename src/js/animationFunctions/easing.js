/**
 * This is a near-direct port of Robert Penner's easing equations. Please shower Robert with
 * praise and all of your admiration. His license is provided below.
 *
 * For information on how to use these functions in your animations, check out my following tutorial: 
 * http://bit.ly/18iHHKq
 *
 * -Kirupa
 */

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 * GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */

/**
 * @callback EasingEquation
 * @param {number} currentIteration - the current time/iteration of the change
 * @param {number} startValue - the start value
 * @param {number} changeInValue - the change value relative to the start value
 * @param {number} totalIterations - the total time/iterations for the change
 * @returns {number} - The value at the current iteration as computed by the easing
 */

/**
 * @callback EasingEquationAlt
 * @param {number} t - the current time/iteration of the change
 * @param {number} b - the start value
 * @param {number} c - the change value relative to the start value
 * @param {number} d - the total time/iterations for the change
 * @returns {number} - The value at the current iteration as computed by the easing
 * @description Function returning a value between start<startValue<t>> and end values (startValue<b> + changeInValue<c>) at the current iteration<currentIteration> proportional to the total iterations<d>. The value is calculated along the curve represented by the easing equation on value/time axis. Visual examples of easing curves can be seen here: {@link https://easings.net/}
 */

/**
 * @callback EasingEquationExtended
 * @param {number} t - the current time/iteration of the change
 * @param {number} b - the start value
 * @param {number} c - the change value relative to the start value
 * @param {number} d - the total time/iterations for the change
 * @param {number} s - the overshoot value where the easing equation extends out of start/change value bounds ((back or bounced easing for example))
 * @returns {number} - The value at the current iteration as computed by the easing
 * @description Function returning a value between start<startValue<t>> and end values (startValue<b> + changeInValue<c>) at the current iteration<currentIteration> proportional to the total iterations<d>. The value is calculated along the curve represented by the easing equation on value/time axis. These versions of the easing equation are extended with an optional overshoot value (<s>) which defines movement(or values changes) out of the start/end bounded values for effects created by [ease<In|Out|InOut>Back]. Visual examples of easing curves can be seen here: {@link https://easings.net/}
 */

/**
 * @function linearEase
 * @param {number} currentIteration - the current time/iteration of the change
 * @param {number} startValue - the start value
 * @param {number} changeInValue - the change value relative to the start value
 * @param {number} totalIterations - the total time/iterations for the change
 * @returns {number} - The value at the current iteration as computed by the easing
 */
export function linearEase(currentIteration, startValue, changeInValue, totalIterations) {
	return changeInValue * currentIteration / totalIterations + startValue;
}

/**
 * @function easeInQuad
 * @param {number} currentIteration - the current time/iteration of the change
 * @param {number} startValue - the start value
 * @param {number} changeInValue - the change value relative to the start value
 * @param {number} totalIterations - the total time/iterations for the change
 * @returns {number} - The value at the current iteration as computed by the easing
 */
export function easeInQuad(currentIteration, startValue, changeInValue, totalIterations) {
	return changeInValue * (currentIteration /= totalIterations) * currentIteration + startValue;
}

/** @type {EasingEquation} */
export function easeOutQuad(currentIteration, startValue, changeInValue, totalIterations) {
	return -changeInValue * (currentIteration /= totalIterations) * (currentIteration - 2) + startValue;
}

/** @type {EasingEquation} */
export function easeInOutQuad(currentIteration, startValue, changeInValue, totalIterations) {
	if ((currentIteration /= totalIterations / 2) < 1) {
		return changeInValue / 2 * currentIteration * currentIteration + startValue;
	}
	return -changeInValue / 2 * (--currentIteration * (currentIteration - 2) - 1) + startValue;
}

/** @type {EasingEquation} */
export function easeInCubic(currentIteration, startValue, changeInValue, totalIterations) {
	return changeInValue * Math.pow(currentIteration / totalIterations, 3) + startValue;
}

/** @type {EasingEquation} */
export function easeOutCubic(currentIteration, startValue, changeInValue, totalIterations) {
	return changeInValue * (Math.pow(currentIteration / totalIterations - 1, 3) + 1) + startValue;
}

/** @type {EasingEquation} */
export function easeInOutCubic(currentIteration, startValue, changeInValue, totalIterations) {
	if ((currentIteration /= totalIterations / 2) < 1) {
		return changeInValue / 2 * Math.pow(currentIteration, 3) + startValue;
	}
	return changeInValue / 2 * (Math.pow(currentIteration - 2, 3) + 2) + startValue;
}

/** @type {EasingEquation} */
export function easeInQuart(currentIteration, startValue, changeInValue, totalIterations) {
	return changeInValue * Math.pow(currentIteration / totalIterations, 4) + startValue;
}

/** @type {EasingEquation} */
export function easeOutQuart(currentIteration, startValue, changeInValue, totalIterations) {
	return -changeInValue * (Math.pow(currentIteration / totalIterations - 1, 4) - 1) + startValue;
}

/** @type {EasingEquation} */
export function easeInOutQuart(currentIteration, startValue, changeInValue, totalIterations) {
	if ((currentIteration /= totalIterations / 2) < 1) {
		return changeInValue / 2 * Math.pow(currentIteration, 4) + startValue;
	}
	return -changeInValue / 2 * (Math.pow(currentIteration - 2, 4) - 2) + startValue;
}

/** @type {EasingEquation} */
export function easeInQuint(currentIteration, startValue, changeInValue, totalIterations) {
	return changeInValue * Math.pow(currentIteration / totalIterations, 5) + startValue;
}

/** @type {EasingEquation} */
export function easeOutQuint(currentIteration, startValue, changeInValue, totalIterations) {
	return changeInValue * (Math.pow(currentIteration / totalIterations - 1, 5) + 1) + startValue;
}

/** @type {EasingEquation} */
export function easeInOutQuint(currentIteration, startValue, changeInValue, totalIterations) {
	if ((currentIteration /= totalIterations / 2) < 1) {
		return changeInValue / 2 * Math.pow(currentIteration, 5) + startValue;
	}
	return changeInValue / 2 * (Math.pow(currentIteration - 2, 5) + 2) + startValue;
}

/** @type {EasingEquation} */
export function easeInSine(currentIteration, startValue, changeInValue, totalIterations) {
	return changeInValue * (1 - Math.cos(currentIteration / totalIterations * (Math.PI / 2))) + startValue;
}

/** @type {EasingEquation} */
export function easeOutSine(currentIteration, startValue, changeInValue, totalIterations) {
	return changeInValue * Math.sin(currentIteration / totalIterations * (Math.PI / 2)) + startValue;
}

/** @type {EasingEquation} */
export function easeInOutSine(currentIteration, startValue, changeInValue, totalIterations) {
	return changeInValue / 2 * (1 - Math.cos(Math.PI * currentIteration / totalIterations)) + startValue;
}

/** @type {EasingEquation} */
export function easeInExpo(currentIteration, startValue, changeInValue, totalIterations) {
	return changeInValue * Math.pow(2, 10 * (currentIteration / totalIterations - 1)) + startValue;
}

/** @type {EasingEquation} */
export function easeOutExpo(currentIteration, startValue, changeInValue, totalIterations) {
	return changeInValue * (-Math.pow(2, -10 * currentIteration / totalIterations) + 1) + startValue;
}

/** @type {EasingEquation} */
export function easeInOutExpo(currentIteration, startValue, changeInValue, totalIterations) {
	if ((currentIteration /= totalIterations / 2) < 1) {
		return changeInValue / 2 * Math.pow(2, 10 * (currentIteration - 1)) + startValue;
	}
	return changeInValue / 2 * (-Math.pow(2, -10 * --currentIteration) + 2) + startValue;
}

/** @type {EasingEquation} */
export function easeInCirc(currentIteration, startValue, changeInValue, totalIterations) {
	return changeInValue * (1 - Math.sqrt(1 - (currentIteration /= totalIterations) * currentIteration)) + startValue;
}

/** @type {EasingEquation} */
export function easeOutCirc(currentIteration, startValue, changeInValue, totalIterations) {
	return changeInValue * Math.sqrt(1 - (currentIteration = currentIteration / totalIterations - 1) * currentIteration) + startValue;
}

/** @type {EasingEquation} */
export function easeInOutCirc(currentIteration, startValue, changeInValue, totalIterations) {
	if ((currentIteration /= totalIterations / 2) < 1) {
		return changeInValue / 2 * (1 - Math.sqrt(1 - currentIteration * currentIteration)) + startValue;
	}
	return changeInValue / 2 * (Math.sqrt(1 - (currentIteration -= 2) * currentIteration) + 1) + startValue;
}

/** @type {EasingEquationAlt} */
export function easeInElastic(t, b, c, d) {
	var s = 1.70158;
	var p = 0;
	var a = c;

	if (t == 0) {
		return b;
	}
	if ((t /= d) == 1) {
		return b + c;
	}
	if (!p) {
		p = d * .3;
	}
	if (a < Math.abs(c)) {
		a = c;
		var s = p / 4;
	} else {
		var s = p / (2 * Math.PI) * Math.asin(c / a);
	}
	return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
}

/** @type {EasingEquationAlt} */
export function easeOutElastic(t, b, c, d) {
	var s = 1.70158;
	var p = 0;
	var a = c;

	if (t == 0) {
		return b;
	}
	if ((t /= d) == 1) {
		return b + c;
	}
	if (!p) {
		p = d * .3;
	}
	if (a < Math.abs(c)) {
		a = c;
		var s = p / 4;
	} else {
		var s = p / (2 * Math.PI) * Math.asin(c / a);
	}
	return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
}

/** @type {EasingEquationAlt} */
export function easeInOutElastic(t, b, c, d) {
	var s = 1.70158;
	var p = 0;
	var a = c;

	if (t == 0) {
		return b;
	}
	if ((t /= d / 2) == 2) {
		return b + c;
	}
	if (!p) {
		p = d * (.3 * 1.5);
	}
	if (a < Math.abs(c)) {
		a = c;
		var s = p / 4;
	} else {
		var s = p / (2 * Math.PI) * Math.asin(c / a);
	}
	if (t < 1) {
		return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	}
	return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
}

/** @type {EasingEquationExtended} */
export function easeInBack(t, b, c, d, s) {
	if (s == undefined) {
		s = 1.70158;
	}
	return c * (t /= d) * t * ((s + 1) * t - s) + b;
}

/** @type {EasingEquationExtended} */
export function easeOutBack(t, b, c, d, s) {
	if (s == undefined) {
		s = 1.70158;
	}
	return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
}

/** @type {EasingEquationExtended} */
export function easeInOutBack(t, b, c, d, s) {
	if (s == undefined) {
		s = 1.70158;
	}
	if ((t /= d / 2) < 1) {
		return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
	}
	return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
}

/** @type {EasingEquationAlt} */
export function easeOutBounce(t, b, c, d) {
	if ((t /= d) < 1 / 2.75) {
		return c * (7.5625 * t * t) + b;
	} else if (t < 2 / 2.75) {
		return c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b;
	} else if (t < 2.5 / 2.75) {
		return c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b;
	} else {
		return c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b;
	}
}

/** @type {EasingEquationAlt} */
export function easeInBounce(t, b, c, d) {
    return c - easeOutBounce(d-t, 0, c, d) + b;
}

/** @type {EasingEquationAlt} */
export function easeInOutBounce(t, b, c, d) {
	if (t < d/2) {
		return easeInBounce(t*2, 0, c, d) * .5 + b;
	}
	return easeOutBounce(t*2-d, 0, c, d) * .5 + c*.5 + b;
}

/**
 * @mixin
 */
const easingEquations = {
	linearEase,
	easeInQuad,
	easeOutQuad,
	easeInOutQuad,
	easeInCubic,
	easeOutCubic,
	easeInOutCubic,
	easeInQuart,
	easeOutQuart,
	easeInOutQuart,
	easeInQuint,
	easeOutQuint,
	easeInOutQuint,
	easeInSine,
	easeOutSine,
	easeInOutSine,
	easeInExpo,
	easeOutExpo,
	easeInOutExpo,
	easeInCirc,
	easeOutCirc,
	easeInOutCirc,
	easeInElastic,
	easeOutElastic,
	easeInOutElastic,
	easeInBack,
	easeOutBack,
	easeInOutBack,
	easeInBounce,
	easeOutBounce,
	easeInOutBounce
};

export { easingEquations };