import { themes } from './particleThemes/themes.js';
import { emitterThemes } from './emitterThemes/emitterThemes.js';

const particleThemeNames = {
    fire: 'fire',
    flame: 'flame',
    stars: 'stars',
    smoke: 'smoke'
}

function particleThemeSwitch(themeName) {
    switch(themeName) {
        case particleThemeNames.fire:
            return themes.fire;
        case particleThemeNames.flame:
            return themes.flame;
        case particleThemeNames.stars:
            return themes.warpStar;
        case particleThemeNames.smoke:
            return themes.smoke;
        default:
            return themes.reset;
    }
}

const emitterThemeNames = {
    singleburst: 'singleburst',
    warpstream: 'warpstream',
    flamestream: 'flamestream',
    smokeStream: 'smokeStream'
}

function emitterThemeSwitch(themeName) {
    switch(themeName) {
        case emitterThemeNames.singleburst:
            return emitterThemes.singleBurst;
        case emitterThemeNames.warpstream:
            return emitterThemes.warpStream;
        case emitterThemeNames.flamestream:
            return emitterThemes.flameStream;
        case emitterThemeNames.smokeStream:
            return emitterThemes.smokeStream;
        default:
            return emitterThemes.base;
    }
}

const emissionTypeNames = {
    mouseClick: 'mouseClick',
    steadyStream: 'steadyStream',
    randomBurst: 'randomBurst'
}

function emissionTypeSwitch(themeName) {
    switch(themeName) {
        case emissionTypeNames.mouseClick:
            return 'mouseClickEvent';
        case emissionTypeNames.steadyStream:
            return 'steadyStream';
        case emissionTypeNames.randomBurst:
            return 'randomBurst';
        default:
            return 'steadyStream';
    }
}

export { particleThemeSwitch, emitterThemeSwitch, emissionTypeSwitch, particleThemeNames, emitterThemeNames, emissionTypeNames };