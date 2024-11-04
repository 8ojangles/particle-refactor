// import { createEmitterEntity } from '../emitterFunctions/createEmitterEntity.js';
// import { triggerEmitter } from '../emitterFunctions/triggerEmitter.js';
import { particleThemeNames, emitterThemeNames, emissionPointNames, emissionTypeNames, presetThemeNames } from '../themeUtils.js';
import {
    toggleClassStr,
    uiListToggleHandler,
    buildUISelectorList,
    setParticlePreset,
    registerMouseMove,
    unregisterMouseMove,
    registerMouseClickEmission,
    unregisterMouseClickEmission
} from './uiFunctions';

// const toggleClassStr = 'is-selected';

// function buttonSelectedToggle(target, item) {
//     return target === item && !target.classList.contains(toggleClassStr);
// }

// function uiListToggleHandler(list, target, toggleClass) {
//     for (let i = 0; i < list.length; i++) {
//         const item = list[i];
//         item.classList.toggle(toggleClass, buttonSelectedToggle(target, item));
//     }
// }

// function buildUISelectorList(list, el, initalSelection, aditionalClasses) {
//     for (const item in list) {
//         const newItem = document.createElement('li');
//         newItem.appendChild(document.createTextNode(item));
//         newItem.setAttribute('id', item);
//         newItem.setAttribute('class', `${aditionalClasses} js-select-${item} ${initalSelection.includes(item) ? toggleClassStr : ''}`);
//         el.appendChild(newItem);
//     }
// }

// function setParticlePreset(presetName, canvasConfig) {
//     switch(presetName) {
//         case presetThemeNames.warpedStars:
//             canvasConfig.updateParticleTheme(particleThemeNames.stars);
//             canvasConfig.updateEmitterTheme(emitterThemeNames.warpstream);
//             canvasConfig.updateEmissionType(emissionTypeNames.steadyStream);
//             canvasConfig.updateEmissionPointType(emissionPointNames.canvasCentre);
//             break;
//         case presetThemeNames.flames:
//             canvasConfig.updateParticleTheme(particleThemeNames.flame);
//             canvasConfig.updateEmitterTheme(emitterThemeNames.flamestream);
//             canvasConfig.updateEmissionType(emissionTypeNames.steadyStream);
//             canvasConfig.updateEmissionPointType(emissionPointNames.canvasCentre);
//             break;
//         case presetThemeNames.mousebang:
//             canvasConfig.updateParticleTheme(particleThemeNames.fire);
//             canvasConfig.updateEmitterTheme(emitterThemeNames.singleburst);
//             canvasConfig.updateEmissionType(emissionTypeNames.mouseClick);
//             canvasConfig.updateEmissionPointType(emissionPointNames.mouseLocation);
//             break;
//         case presetThemeNames.rain:
//             canvasConfig.updateParticleTheme(particleThemeNames.rain);
//             canvasConfig.updateEmitterTheme(emitterThemeNames.rainstream);
//             canvasConfig.updateEmissionType(emissionTypeNames.steadyStream);
//             canvasConfig.updateEmissionPointType(emissionPointNames.canvasCentre);
//             break;
//         default:
//             canvasConfig.updateParticleTheme(particleThemeNames.stars);
//             canvasConfig.updateEmitterTheme(emitterThemeNames.warpstream);
//             canvasConfig.updateEmissionType(emissionTypeNames.steadyStream);
//             canvasConfig.updateEmissionPointType(emissionPointNames.canvasCentre);
//     }
// }

// function trackMouse(event) {
//     const { canvasConfig } = this;
//     if (!canvasConfig.currentEmission.followMouse) {
//         return;
//     }
//     canvasConfig.updateEmissionPoint(event.offsetX, event.offsetY);
// }

// function registerMouseMove(event, canvasConfig, canvas) {
//     canvasConfig.updateFollowMouse(true);
//     canvasConfig.updateEmissionPoint(event.offsetX, event.offsetY);
//     canvas.el.addEventListener('mousemove', trackMouse.bind({canvasConfig}));
// };

// function unregisterMouseMove(canvas, canvasConfig) {
//     canvasConfig.updateFollowMouse(false);
//     canvas.el.removeEventListener('mousemove', trackMouse);
// }

// function mouseClickHandler(event) {
//     // console.log('click');
//     const {canvasConfig, update, emitterStore, entityStore, pool, animation, logger} = this;
//     const { emitterTheme, particleTheme, x, y } = canvasConfig.currentEmission;

//     let emitter = emitterStore.find((x) => x.name === 'testMouseClickEmitter');
//     if (emitter === undefined) {
//         emitter = createEmitterEntity(
//             'testMouseClickEmitter',
//             emitterTheme,
//             particleTheme,
//             entityStore,
//             pool,
//             {w: canvasConfig.w, h: canvasConfig.h},
//             logger
//         );
    
//         emitterStore.push(emitter);
//     }

//     triggerEmitter(
//         emitter,
//         {
//             triggerOptions: { x: x, y: y },
//             logger
//         }
//     );

//     if (animation.state !== true) {
//         animation.state = true;
//         update();
//     }
// }

// function registerMouseClickEmission(canvasEl, canvasConfig, update, emitterStore, entityStore, pool, animation, logger) {
//     canvasEl.addEventListener('click', mouseClickHandler.bind({canvasConfig, update, emitterStore, entityStore, pool, animation, logger}));
// }

// function unregisterMouseClickEmission(canvasEl) {
//     canvasEl.removeEventListener('click', mouseClickHandler);
// }

function initialiseUI(stores, animation, update, canvas, canvasConfig, logger) {
    const { emitters, entities, entityPool } = stores;
    const { particleType, emitterType, emissionType, emissionPointType } = canvasConfig.currentEmission;
    const currentSelectionArr = [particleType, emitterType, emissionType, emissionPointType];

    const particleUIListContainer = document.getElementById('particleThemeSelection');

    buildUISelectorList(
        particleThemeNames,
        particleUIListContainer,
        currentSelectionArr,
        'js-selection-particle'
    );

    const particleItems = document.querySelectorAll('.js-selection-particle');
    particleUIListContainer.addEventListener(
        'click', 
        (e) => {
            const { target } = e;
            uiListToggleHandler(particleItems, target, toggleClassStr);
            // @ts-ignore
            canvasConfig.updateParticleTheme(target.id);
        }
    );

    const emitterUIListContainer = document.getElementById('emitterThemeSelection');

    buildUISelectorList(
        emitterThemeNames,
        emitterUIListContainer,
        currentSelectionArr,
        'js-selection-emitter'
    );

    const emitterItems = document.querySelectorAll('.js-selection-emitter');
    emitterUIListContainer.addEventListener(
        'click', 
        (e) => {
            const { target } = e;
            uiListToggleHandler(emitterItems, target, toggleClassStr);
            // @ts-ignore
            canvasConfig.updateEmitterTheme(target.id);
        }
    );

    const emissionPointUIListContainer = document.getElementById('emissionPointSelection');

    buildUISelectorList(
        emissionPointNames,
        emissionPointUIListContainer,
        currentSelectionArr,
        'js-selection-emission-point'
    );

    const emissionPointItems = document.querySelectorAll('.js-selection-emission-point');
    document.querySelector('.js-emission-point-list').addEventListener(
        'click', 
        (e) => {
            const { target } = e;
            uiListToggleHandler(emissionPointItems, target, toggleClassStr);
            // @ts-ignore
            const thisId = target.id;
            if (thisId === 'mouseLocation') {
                registerMouseMove(e, canvasConfig, canvas);
            } else {
                unregisterMouseMove(canvas, canvasConfig);
            }
            if (thisId === 'canvasCentre') {
                canvasConfig.updateEmissionPoint(
                    canvasConfig.centerH,
                    canvasConfig.centerV
                )
            }
        }
    );

    const emissionUIListContainer = document.getElementById('emissionTypeSelection');

    buildUISelectorList(
        emissionTypeNames,
        emissionUIListContainer,
        currentSelectionArr,
        'js-selection-emission-type'
    );

    const emissionTypeItems = document.querySelectorAll('.js-selection-emission-type');
    emissionUIListContainer.addEventListener(
        'click', 
        (e) => {
            // console.log('target: ', target);
            const { target } = e;
            uiListToggleHandler(emissionTypeItems, target, toggleClassStr);
            // @ts-ignore
            const thisId = target.id;
            canvasConfig.updateEmissionType(this.id);
            if (thisId === 'mouseClick') {
                console.log('mouseClick');
                registerMouseClickEmission(canvas.el, canvasConfig, update, emitters, entities, entityPool, animation, logger);
            } else {
                unregisterMouseClickEmission(canvas.el);
            }
        }
    );

    const animControlButtons = document.querySelectorAll('.js-anim-control');
    document.querySelector('.js-anim-start').addEventListener(
        'click',
        ({target}) => {
            uiListToggleHandler(animControlButtons, target, toggleClassStr);
            if (animation.state === true) {
                return;
            }
            animation.state = true;
            update();
        }
    );

    document.querySelector('.js-anim-stop').addEventListener(
        'click', 
        ({target}) => {
            uiListToggleHandler(animControlButtons, target, toggleClassStr);
            if (animation.state === false) {
                return;
            }
            animation.state = false;
        }
    );

    // check defaults or onLoad presets (registering mouse events)
    if (emissionType === emissionTypeNames.mouseClick) {
        registerMouseClickEmission(canvas.el, canvasConfig, update, emitters, entities, entityPool, animation, logger);
        registerMouseMove({offsetX: canvasConfig.centerH, offsetY: canvasConfig.centerV}, canvasConfig, canvas)
    }
}

export { initialiseUI, setParticlePreset };