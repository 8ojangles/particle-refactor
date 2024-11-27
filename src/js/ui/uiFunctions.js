import { createEmitterEntity } from "../emitterFunctions/createEmitterEntity.js";
import { triggerEmitter } from "../emitterFunctions/triggerEmitter.js";
import { presetThemeNames, particleThemeNames, emitterThemeNames, emissionTypeNames, emissionPointNames } from "../themeUtils.js";
import { createRangeSlider } from "./createRangeSlider.js";
import { emitterControlsConfig } from "./emitterControlsConfig.js";
const toggleClassStr = 'is-selected';

const getEls = document.querySelectorAll.bind(document);

function buttonSelectedToggle(target, item) {
    return target === item && !target.classList.contains(toggleClassStr);
}

function uiListToggleHandler(list, target, toggleClass) {
    for (let i = 0; i < list.length; i++) {
        const item = list[i];
        item.classList.toggle(toggleClass, buttonSelectedToggle(target, item));
    }
}

function buildUISelectorList(list, el, tag, initalSelection, additionalClasses) {
    for (const item in list) {
        const newItem = document.createElement(tag);
        newItem.appendChild(document.createTextNode(item));
        newItem.setAttribute('id', item);
        newItem.setAttribute('class', `${additionalClasses} js-select-${item} ${initalSelection.includes(item) ? toggleClassStr : ''}`);
        el.appendChild(newItem);
    }
}
// id, title, min, max, step, multiplier, controller, flipped, label1, label2, initVal
function buildEmitterControls(emitterStore) {

    const currentEmitterListEl = getEls('.js-current-emitters-list')[0];
    const currentEmitterList = currentEmitterListEl.children;
    const currentEmitters = emitterStore;
    console.log(currentEmitters);
    console.log(currentEmitterList);

    currentEmitters.forEach((emitter) => {

        if (currentEmitterList.length === 0) {
            const newEmitter = document.createElement('button');
            newEmitter.setAttribute('type', 'button');
            newEmitter.appendChild(document.createTextNode(emitter.name));
            newEmitter.setAttribute('id', emitter.name);
            newEmitter.setAttribute('class', `js-emitter-${emitter.name} btn button`);
            currentEmitterListEl.appendChild(newEmitter);
            return;
        }

        if (currentEmitterList.length > 0) {
            for (let i = 0; i < currentEmitterList.length; i++) {
                if (currentEmitterList[i].id === emitter.name) {
                    return;
                }
            }
        }
    });


    const controlsEl = getEls('.js-emitter-control-list')[0];

    if (controlsEl.children.length > 0) {
        return;
    }
    emitterControlsConfig.forEach((control) => {
        createRangeSlider(controlsEl, { ...control });
    });
}


function setParticlePreset(presetName, canvasConfig) {
    switch(presetName) {
        case presetThemeNames.warpedStars:
            canvasConfig.updateParticleTheme(particleThemeNames.stars);
            canvasConfig.updateEmitterTheme(emitterThemeNames.warpstream);
            canvasConfig.updateEmissionType(emissionTypeNames.steadyStream);
            canvasConfig.updateEmissionPointType(emissionPointNames.canvasCentre);
            break;
        case presetThemeNames.flames:
            canvasConfig.updateParticleTheme(particleThemeNames.flame);
            canvasConfig.updateEmitterTheme(emitterThemeNames.flamestream);
            canvasConfig.updateEmissionType(emissionTypeNames.steadyStream);
            canvasConfig.updateEmissionPointType(emissionPointNames.canvasCentre);
            break;
        case presetThemeNames.mousebang:
            canvasConfig.updateParticleTheme(particleThemeNames.fire);
            canvasConfig.updateEmitterTheme(emitterThemeNames.singleburst);
            canvasConfig.updateEmissionType(emissionTypeNames.mouseClick);
            canvasConfig.updateEmissionPointType(emissionPointNames.mouseLocation);
            break;
        case presetThemeNames.rain:
            canvasConfig.updateParticleTheme(particleThemeNames.rain);
            canvasConfig.updateEmitterTheme(emitterThemeNames.rainstream);
            canvasConfig.updateEmissionType(emissionTypeNames.steadyStream);
            canvasConfig.updateEmissionPointType(emissionPointNames.canvasCentre);
            break;
        default:
            canvasConfig.updateParticleTheme(particleThemeNames.stars);
            canvasConfig.updateEmitterTheme(emitterThemeNames.warpstream);
            canvasConfig.updateEmissionType(emissionTypeNames.steadyStream);
            canvasConfig.updateEmissionPointType(emissionPointNames.canvasCentre);
    }
}

function trackMouse(event) {
    const { canvasConfig } = this;
    if (!canvasConfig.currentEmission.followMouse) {
        return;
    }
    canvasConfig.updateEmissionPoint(event.offsetX, event.offsetY);
}

function registerMouseMove(event, canvasConfig, canvas) {
    canvasConfig.updateFollowMouse(true);
    canvasConfig.updateEmissionPoint(event.offsetX, event.offsetY);
    canvas.el.addEventListener('mousemove', trackMouse.bind({canvasConfig}));
};

function unregisterMouseMove(canvas, canvasConfig) {
    canvasConfig.updateFollowMouse(false);
    canvas.el.removeEventListener('mousemove', trackMouse);
}

function mouseClickHandler(event) {
    // console.log('click');
    const {canvasConfig, update, emitterStore, entityStore, pool, animation, logger} = this;
    const { emitterTheme, particleTheme, x, y } = canvasConfig.currentEmission;

    let emitter = emitterStore.find((x) => x.name === 'testMouseClickEmitter');
    if (emitter === undefined) {
        emitter = createEmitterEntity(
            'testMouseClickEmitter',
            emitterTheme,
            particleTheme,
            entityStore,
            emitterStore.length,
            pool,
            {w: canvasConfig.w, h: canvasConfig.h},
            logger
        );
    
        emitterStore.push(emitter);
    }

    triggerEmitter(
        emitter,
        {
            triggerOptions: { x: x, y: y },
            logger
        }
    );

    if (animation.state !== true) {
        animation.state = true;
        update();
    }
}

function registerMouseClickEmission(canvasEl, canvasConfig, update, emitterStore, entityStore, pool, animation, logger) {
    canvasEl.addEventListener('click', mouseClickHandler.bind({canvasConfig, update, emitterStore, entityStore, pool, animation, logger}));
}

function unregisterMouseClickEmission(canvasEl) {
    canvasEl.removeEventListener('click', mouseClickHandler);
}

export {
    getEls,
    toggleClassStr,
    buttonSelectedToggle,
    uiListToggleHandler,
    buildUISelectorList,
    buildEmitterControls,
    setParticlePreset,
    trackMouse,
    registerMouseMove,
    unregisterMouseMove,
    mouseClickHandler,
    registerMouseClickEmission,
    unregisterMouseClickEmission
};