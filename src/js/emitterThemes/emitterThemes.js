import { baseEmitterTheme } from './baseEmitter/baseEmitterTheme.js';
import { flameStreamTheme } from './flameStream/flameStreamTheme.js';
import { rainStreamTheme } from './rainStream/rainStreamTheme.js';
import { warpStreamTheme } from './warpStream/warpStreamTheme.js';
import { smokeStreamTheme } from './smokeStream/smokeStreamTheme.js';
import { singleBurstTheme } from './singleBurstTheme/singleBurstTheme.js';

const emitterThemes = {
   base: baseEmitterTheme,
   flameStream: flameStreamTheme,
   rainStream: rainStreamTheme,
   warpStream: warpStreamTheme,
   smokeStream: smokeStreamTheme,
   singleBurst: singleBurstTheme
};

export { emitterThemes };