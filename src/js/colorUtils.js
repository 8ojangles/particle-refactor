import { mathUtils } from './mathUtils.js';
const { clamp } = mathUtils;
const { round } = Math;

/**
 * provides color util methods.
 */
const rgb = (r, g, b) => {
	return `rgb(${clamp(round(r), 0, 255)}, ${clamp(round(g), 0, 255)}, ${clamp(round(b), 0, 255)})`;
}

const rgba = (r, g, b, a) => {
	return `rgba(${clamp(round(r), 0, 255)}, ${clamp(round(g), 0, 255)}, ${clamp(round(b), 0, 255)}, ${clamp(a, 0, 1)})`;
}

const hsl = (h, s, l) => {
	return `hsl(${h}, ${clamp(s, 0, 100)}%, ${clamp(l, 0, 100)}%)`;
}

const hsla = (h, s, l, a) => {
	return `hsla(${h}, ${clamp(s, 0, 100)}%, ${clamp(l, 0, 100)}%, ${clamp(a, 0, 1)})`;
}

const colorUtils = {
	rgb,
	rgba,
	hsl,
	hsla
};

export { rgb, rgba, hsl, hsla, colorUtils };