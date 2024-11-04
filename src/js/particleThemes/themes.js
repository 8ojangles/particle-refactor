import { fireTheme } from './themes/fire/theme.js';
import { renderFn as renderFire } from './themes/fire/renderFn.js';

import { resetTheme } from './themes/reset/resetTheme.js';
import { renderFn as renderReset } from './themes/reset/renderFn.js';

import { warpStarTheme } from './themes/warpStar/theme.js';
import { renderFn as renderWarpstar } from './themes/warpStar/renderFn.js';

import { flameTheme } from './themes/flame/theme.js';
import { renderFn as renderFlame } from './themes/flame/renderFn.js';

import { rainTheme } from './themes/rain/theme.js';
import { renderFn as renderRain } from './themes/rain/renderFn.js';

import { smokeTheme } from './themes/smoke/smokeTheme.js';
import { renderFn as renderSmoke } from './themes/smoke/renderFn.js';

const particleRenderers = {
   fire: renderFire,
   warpstar: renderWarpstar,
   flame: renderFlame,
   rain: renderRain,
   smoke: renderSmoke,
   reset: renderReset
}

const themes = {
   reset: resetTheme,
   fire: fireTheme,
   warpStar: warpStarTheme,
   flame: flameTheme,
   rain: rainTheme,
   smoke: smokeTheme
};

export { themes, particleRenderers };