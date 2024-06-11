import { EmitterEntity } from './emitterEntity.js';

function buttonSelectedToggle(target, item) {
    return target === item && !target.classList.contains('is-selected');
}

function trackMouse(event) {
    const { canvasConfig } = this;
;    if (!canvasConfig.currentEmission.followMouse) {
        return;
    }
    canvasConfig.updateEmissionPoint(event.offsetX, event.offsetY);
}

function registerMouseMove(event, canvasConfig, canvas) {
    canvasConfig.updateFollowMouse(true);
    canvasConfig.updateEmissionPoint(event.offsetX, event.offsetY);
    canvas.el.addEventListener('mousemove', trackMouse.bind({canvasConfig}));
};

function unregisterMouseMove(canvas) {
    canvasConfig.updateFollowMouse(false);
    canvas.el.removeEventListener('mousemove', trackMouse);
}

function mouseClickHandler(event) {
    const {canvasConfig, emitEntities, update, emitterStore, entityStore, pool, animation} = this;
    const emitter = new EmitterEntity(
        'testMouseClickEmitter',
        canvasConfig.currentEmission.emitterTheme,
        canvasConfig.currentEmission.particleTheme,
        emitEntities,
        entityStore,
        pool
    );

    emitterStore.push(emitter);

    emitter.triggerEmitter({
        x: canvasConfig.currentEmission.x,
        y: canvasConfig.currentEmission.y
    });

    if (animation.state !== true) {
        animation.state = true;
        update();
    }
}

function registerMouseClickEmission(canvasEl, canvasConfig, emitEntities, update, emitterStore, entityStore, pool, animation) {
    canvasEl.addEventListener('click', mouseClickHandler.bind({canvasConfig, emitEntities, update, emitterStore, entityStore, pool, animation}));
}

function unregisterMouseClickEmission(canvasEl) {
    canvasEl.removeEventListener('click', mouseClickHandler);
}

function initialiseUI(animation, update, canvas, canvasConfig, emitterStore, entityStore, pool, emitEntities) {
    
    const particleItems = document.querySelectorAll('.js-selection-particle');
    document.querySelector('.js-particle-selection-list').addEventListener(
        'click', 
        ({target}) => {
            for (const item of particleItems) {
                item.classList.toggle('is-selected', buttonSelectedToggle(target, item));
            }
            canvasConfig.updateParticleTheme(target.id);
        }
    );

    const emitterItems = document.querySelectorAll('.js-selection-emitter');
    document.querySelector('.js-emitter-selection-list').addEventListener(
        'click', 
        ({target}) => {
            for (const item of emitterItems) {
                item.classList.toggle('is-selected', buttonSelectedToggle(target, item));
            }
            canvasConfig.updateEmitterTheme(target.id);
        }
    );

    const emissionPointItems = document.querySelectorAll('.js-selection-emission-point');
    document.querySelector('.js-emission-point-list').addEventListener(
        'click', 
        ({target}) => {
            for (const item of emissionPointItems) {
                item.classList.toggle('is-selected', buttonSelectedToggle(target, item));
            }
            if (target.id === 'mouseLocation') {
                registerMouseMove(event, canvasConfig, canvas);
            } else {
                unregisterMouseMove(canvas);
            }
            if (target.id === 'canvasCentre') {
                canvasConfig.updateEmissionPoint(
                    canvasConfig.centerH,
                    canvasConfig.centerV
                )
            }
        }
    );

    const emissionTypeItems = document.querySelectorAll('.js-selection-emission-type');
    document.querySelector('.js-emission-type-list').addEventListener(
        'click', 
        ({target}) => {
            for (const item of emissionTypeItems) {
                item.classList.toggle('is-selected', buttonSelectedToggle(target, item));
            }
            canvasConfig.updateEmissionType(target.id);
            if (target.id === 'mouseClick') {
                registerMouseClickEmission(canvas.el, canvasConfig, emitEntities, update, emitterStore, entityStore, pool, animation);
            } else {
                unregisterMouseClickEmission(canvas.el);
            }
        }
    );

    const animControlButtons = document.querySelectorAll('.js-anim-control');
    document.querySelector('.js-anim-start').addEventListener(
        'click',
        ({target}) => {
            for (const item of animControlButtons) {
                item.classList.toggle('is-selected', buttonSelectedToggle(target, item));
            }
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
            for (const item of animControlButtons) {
                item.classList.toggle('is-selected', buttonSelectedToggle(target, item));
            }
            if (animation.state === false) {
                return;
            }
            animation.state = false;
        }
    );
}

export { initialiseUI };