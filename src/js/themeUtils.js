import { themes } from './particleThemes/themes.js';
import { emitterThemes } from './emitterThemes/emitterThemes.js';

const particleThemeNames = {
    fire: 'fire',
    flame: 'flame',
    rain: 'rain',
    stars: 'stars',
    smoke: 'smoke'
}

function particleThemeSwitch(themeName) {
    switch(themeName) {
        case particleThemeNames.fire:
            return themes.fire;
        case particleThemeNames.flame:
            return themes.flame;
        case particleThemeNames.rain:
            return themes.rain;
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
    rainstream: 'rainstream',
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
        case emitterThemeNames.rainstream:
            return emitterThemes.rainStream;
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

const emissionPointNames = {
    mouseLocation: 'mouseLocation',
    canvasCentre: 'canvasCentre',
    custom: 'custom'
}

function emissionPointSwitch(pointName) {
    switch(pointName) {
        case emissionPointNames.mouseLocation:
            return 'mouseLocation';
        case emissionPointNames.canvasCentre:
            return 'canvasCentre';
        case emissionPointNames.custom:
            return 'custom';
        default:
            return 'canvasCentre';
    }
}

const presetThemeNames = {
    warpedstars: 'warpedstars',
    flames: 'flames',
    mousebang: 'mousebang',
    rain: 'rain'
}

export {
    particleThemeSwitch,
    emitterThemeSwitch,
    emissionPointSwitch,
    emissionTypeSwitch,
    particleThemeNames,
    emitterThemeNames,
    emissionPointNames,
    emissionTypeNames,
    presetThemeNames
};