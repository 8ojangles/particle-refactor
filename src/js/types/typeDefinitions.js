/**
 * @callback EasingEquation
 * @param {number} currentIteration - the current time/iteration of the change
 * @param {number} startValue - the start value
 * @param {number} changeInValue - the change value relative to the start value
 * @param {number} totalIterations - the total time/iterations for the change
 * @returns {number} - The value at the current iteration as computed by the easing
 * @description Function returning a value between start<startValue<t>> and end values (startValue<b> + changeInValue<c>) at the current iteration<currentIteration> proportional to the total iterations<d>. The value is calculated along the curve represented by the easing equation on value/time axis. Visual examples of easing curves can be seen here: {@link https://easings.net/}
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

export {};