// import { createEmitterEntity } from '../emitterFunctions/createEmitterEntity.js';
// import { triggerEmitter } from '../emitterFunctions/triggerEmitter.js';
import { particleThemeNames, emitterThemeNames, emissionPointNames, emissionTypeNames, presetThemeNames } from '../themeUtils.js';
import { stores } from '../stores/stores.js';
import { mapEmitterToControls } from './mapEmitterToControls.js';
import {
    getEls,
    toggleClassStr,
    uiListToggleHandler,
    buildUISelectorList,
    setParticlePreset,
    registerMouseMove,
    unregisterMouseMove,
    registerMouseClickEmission,
    unregisterMouseClickEmission,
    buildEmitterControls
} from './uiFunctions.js';

const menuPageSelectControls = getEls('.js-page-select');

const menuPages = getEls('[data-control-panel-page]');

let pageAnimClassList = ['is-active', 'to-left', 'from-left', 'to-right', 'from-right'];
	
menuPageSelectControls.forEach((control) => {

	control.addEventListener('click', (e) => {
		e.preventDefault();
		const el = e.currentTarget;

        // @ts-ignore
		if ( el.classList.contains('is-active') ) {
			return;
		}

		// @ts-ignore
		const selectsPage = el.getAttribute('data-page-select');
		const currentPage = getEls('.control--panel__page.is-active')[0];
		// @ts-ignore
		const currentPageOrder = currentPage.getAttribute('data-page-order');
		const newPage = getEls(`[data-page="${selectsPage}"]`)[0];
		// @ts-ignore
		const newPageOrder = newPage.getAttribute('data-page-order');
		const isNewPageOrderGreater = newPageOrder > currentPageOrder ? true : false;
		const introClass = isNewPageOrderGreater ? 'from-right' : 'from-left';
		const outroClass = isNewPageOrderGreater ? 'to-left' : 'to-right';

        console.log('currentPageOrder: ', currentPageOrder, 'newPageOrder: ', newPageOrder, 'isNewPageOrderGreater: ', isNewPageOrderGreater, 'introClass: ', introClass, 'outroClass: ', outroClass);

        menuPages.forEach((page) => {
            const pageOrder = page.getAttribute('data-page-order');
            const isOtherPage = pageOrder !== currentPageOrder && pageOrder !== newPageOrder;
            // @ts-ignore
            page.classList.remove(...pageAnimClassList);
            if (pageOrder === currentPageOrder) {
                page.classList.add(outroClass);
            }
            if (pageOrder === newPageOrder) {
                page.classList.add('is-active', introClass);
            }
            if (isOtherPage) {
                if (pageOrder < newPageOrder) {
                    page.classList.add('to-left');
                }
                if (pageOrder > newPageOrder) {
                    page.classList.add('to-right');
                }
            }
        });
        // @ts-ignore
        menuPageSelectControls.forEach((item) => {
            item.classList.remove('is-active');
        });
        // @ts-ignore
        el.classList.add('is-active');

		if (selectsPage === 'page-emitter') {
			// @ts-ignore
			buildEmitterControls(stores.getEmitters());
		}
	});

});

const menuAccordionToggleControls = getEls('.js-section-toggle');

menuAccordionToggleControls.forEach((control) => {
    control.addEventListener('click', (e) => {
        const parent = e.currentTarget.closest('.control--panel__section');
        const parentActive = parent.classList.contains('is-active');
        if (parentActive) {
            parent.classList.remove('is-active');
        } else {
            parent.classList.add('is-active');
        }
    });
});

// $( '.js-section-toggle' ).click( function( e ){
//     let $parent = $( this ).closest( '.control--panel__section' );
//     let parentActive = $parent.hasClass( 'is-active' ) ? true : false;
//     let thisHeight = $parent.attr( 'data-open-height' );
//     if ( parentActive ) {
//         $parent.removeClass( 'is-active' ).find( 'fieldset' ).css( {
//             'height': '0'
//         } ) ;
//     } else {
//         $parent.addClass( 'is-active' ).find( 'fieldset' ).css( {
//             'height': thisHeight+'px'
//         } );
//     }

// } );

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

const uiSelectionBtnClasses = 'btn skeleton text-left full btn-indicator';

function initialiseUI(stores, animation, update, canvas, canvasConfig, logger) {
    const { emitters, entities, entityPool } = stores;
    const { particleType, emitterType, emissionType, emissionPointType } = canvasConfig.currentEmission;
    const currentSelectionArr = [particleType, emitterType, emissionType, emissionPointType];

    const particleUIListContainer = document.getElementById('particleThemeSelection');

    buildUISelectorList(
        particleThemeNames,
        particleUIListContainer,
        'button',
        currentSelectionArr,
        `js-selection-particle ${uiSelectionBtnClasses}`
    );

    const particleItems = getEls('.js-selection-particle');
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
        'button',
        currentSelectionArr,
        `js-selection-emitter ${uiSelectionBtnClasses}`
    );

    const emitterItems = getEls('.js-selection-emitter');
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
        'button',
        currentSelectionArr,
        `js-selection-emission-point ${uiSelectionBtnClasses}`
    );

    const emissionPointItems = getEls('.js-selection-emission-point');
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
        'button',
        currentSelectionArr,
        `js-selection-emission-type ${uiSelectionBtnClasses}`
    );

    const emissionTypeItems = getEls('.js-selection-emission-type');
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

    const animControlButtons = getEls('.js-anim-control');
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

    document.querySelector('.js-emitter-control-list').addEventListener(
        'click', 
        (e) => {
            console.log('click');
            console.log('e: ', e);
            const { target } = e;
            // @ts-ignore
            if (target.classList.contains('js-control-help')) {
                // @ts-ignore
                const thisParent = target.closest('.control--panel__item-wrapper');
                const expander = thisParent.querySelector('.expander');
                const expanderActive = expander.classList.contains('is-active');
                if (expanderActive) {
                    expander.classList.remove('is-active');
                } else {
                    expander.classList.add('is-active');
                }
            }
        
        }
    );
    
    document.querySelector('.js-current-emitters-list').addEventListener(
        'click',
        (e) => {
            const { target } = e;
            // @ts-ignore
            const emitterName = target.id;

            // @ts-ignore
            if (target.classList.contains('is-active')) {
                return;
            } else {
                // @ts-ignore
                target.classList.add('is-active');

                const thisEmitter = stores.getEmitterByName(emitterName);
                console.log('thisEmitter: ', thisEmitter);
                // map attributes to controls
                mapEmitterToControls(thisEmitter);
                document.querySelectorAll('.js-emitter-control-list')[0].classList.add('is-active');
            }

        }
    );

    // check defaults or onLoad presets (registering mouse events)
    if (emissionType === emissionTypeNames.mouseClick) {
        registerMouseClickEmission(canvas.el, canvasConfig, update, emitters, entities, entityPool, animation, logger);
        registerMouseMove({offsetX: canvasConfig.centerH, offsetY: canvasConfig.centerV}, canvasConfig, canvas)
    }
}

export { initialiseUI, setParticlePreset };