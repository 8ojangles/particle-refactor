import { emitterThemes } from '../emitterThemes/emitterThemes.js';
import { themes } from '../particleThemes/themes.js';
import { particleThemeSwitch, emitterThemeSwitch, emissionTypeSwitch, emissionPointSwitch, emissionPointNames, presetThemeNames } from '../themeUtils.js';
import { createEmitterEntity } from '../emitterFunctions/createEmitterEntity.js';
import { triggerEmitter } from '../emitterFunctions/triggerEmitter.js';
// import { update } from './runtime.js';

import { displayDebugging } from '../debugUtils.js';
import { prePopulateEntityStore } from '../emitterFunctions/emitterStore.js';
import { setParticlePreset } from '../ui/ui.js';

const gravity = 0.98;

const environment = {
	runtimeEngine: {
		masterClock: 0,
		runtime: 0,
		startAnimation: function startAnimation(animVar, loopFn) {
			if (!animVar) {
				animVar = window.requestAnimationFrame(loopFn);
			}
		},
		stopAnimation: function stopAnimation(animVar) {
			if (animVar) {
				window.cancelAnimationFrame(animVar);
				animVar = undefined;
			}
		}
	},
	canvas: {
		// buffer clear fN
		checkClearBufferRegion: function checkClearBufferRegion(particle, canvasConfig) {
			const bufferClearRegion = canvasConfig.bufferClearRegion;
			const entityWidth = particle.r / 2;
			const entityHeight = particle.r / 2;
			if (particle.x - entityWidth < bufferClearRegion.x) {
				bufferClearRegion.x = particle.x - entityWidth;
			}
			if (particle.x + entityWidth > bufferClearRegion.x + bufferClearRegion.w) {
				bufferClearRegion.w = particle.x + entityWidth - bufferClearRegion.x;
			}
			if (particle.y - entityHeight < bufferClearRegion.y) {
				bufferClearRegion.y = particle.y - entityHeight;
			}
			if (particle.y + entityHeight > bufferClearRegion.y + bufferClearRegion.h) {
				bufferClearRegion.h = particle.y + entityHeight - bufferClearRegion.y;
			}
		},

		resetBufferClearRegion: function resetBufferClearRegion(canvasConfig) {
			const bufferClearRegion = canvasConfig.bufferClearRegion;
			
			bufferClearRegion.x = canvasConfig.centerH;
			bufferClearRegion.y = canvasConfig.centerV;
			bufferClearRegion.w = canvasConfig.width;
			bufferClearRegion.h = canvasConfig.height;
		}
	},
	forces: {
		friction: 0.01,
		bouyancy: 1,
		gravity: gravity,
		wind: 1
	},
	fields: {
		active: 0,
	}
};

function initialiseCanvas(width, height, elementId, alpha, smoothing, inMemory) {
	let canvas = inMemory ? document.createElement('canvas') : document.querySelector(elementId);
	let ctx = alpha ? canvas.getContext("2d", { alpha: false } ) : canvas.getContext("2d" );
	if (inMemory) {
		canvas.id = elementId;
	}
	canvas.width = width;
	canvas.height = height;
	// blitCtx.filter = "blur(1px)";
	canvas.imageSmoothingEnabled = smoothing;

	return {
		el: canvas,
		ctx: ctx
	}
}

function createCanvasConfig() {
	const canW = window.innerWidth;
	const canH = window.innerHeight;
	const canvasCentreH = canW / 2;
	const canvasCentreV = canH / 2;

	// initialise canvases
	const mainCanvas = initialiseCanvas(canW, canH, "#test-base", false, true, false);
	const blitCanvas = initialiseCanvas(canW, canH, 'blitterCanvas', true, true, true);

	return {
		w: canW,
		h: canH,
		centerH: canvasCentreH,
		centerV: canvasCentreV,
		
		canvases: {
			main: mainCanvas,
			blit: blitCanvas
		},

		bufferClearRegion: {
			x: canvasCentreH,
			y: canvasCentreV,
			w: 0,
			h: 0
		},
		currentEmission: {
			particleTheme: null,
			emitterTheme: null,
			type: null,
			pointType: null,
			streamLimiter: false,
			followMouse: false,
			x: 0,
			y: 0,
			particleType: '',
			emitterType: '',
			emissionType: '',
			emissionPointType: ''
		},
		updateParticleTheme: function(theme) {
			this.currentEmission.particleTheme = particleThemeSwitch(theme);
			this.currentEmission.particleType = theme;
		},
		updateEmitterTheme: function(theme) {
			this.currentEmission.emitterTheme = emitterThemeSwitch(theme);
			this.currentEmission.emitterType = theme;
		},
		updateEmissionType: function(type) {
			this.currentEmission.type = emissionTypeSwitch(type);
			this.currentEmission.emissionType = type;
		},
		updateEmissionPointType: function(type) {
			this.currentEmission.pointType = emissionPointSwitch(type);
			this.currentEmission.emissionPointType = type;
			if (type === emissionPointNames.canvasCentre) {
				this.updateEmissionPoint(this.centerH, this.centerV);
			}
			if (type === emissionPointNames.custom) {
				this.updateEmissionPoint(100, 200);
			}
		},
		updateStreamLimiter: function(bool) {
			this.currentEmission.streamLimiter = bool;
		},
		updateFollowMouse: function(bool) {
			this.currentEmission.followMouse = bool;
		},
		updateEmissionPoint: function(x, y) {
			this.currentEmission.x = x;
			this.currentEmission.y = y;
		}
	}
}

// function clearCanvas( mainCtx, blitCtx, w, h ) {
    
//     // cleaning
//     mainCtx.fillStyle = 'black';
//     mainCtx.fillRect( 0, 0, w, h );
//     // ctx.clearRect( 0, 0, w, h );
//     // ctx.clearRect( bufferClearRegion.x, bufferClearRegion.y, bufferClearRegion.w, bufferClearRegion.h );
//     blitCtx.clearRect( 0, 0, w, h );


//     // ctx.fillStyle = 'rgba( 0, 0, 0, 0.1 )';
//     // ctx.fillRect( 0, 0, canvasConfig.w, canvasConfig.h );

//     // set dirty buffer
//     // resetBufferClearRegion();
// }

function clearCanvas( mainCtx, blitCtx, w, h ) {
    // cleaning
    mainCtx.fillStyle = 'black';
    mainCtx.fillRect( 0, 0, w, h );
    blitCtx.clearRect( 0, 0, w, h );
}

const runtimeConfig = {
    globalClock: 0,
    globalClockTick: function() {
        this.globalClock++;
    },
    emitterCount: 0,
    activeEmitters: 0,
    liveEntityCount: 0,
    subtract: function(amount) {
        this.liveEntityCount -= amount;
    }
};

function initialiseEngine(emitterName, stores, animation, update, canvasConfig, logger) {
	const { emitters, entities, entityPool } = stores;
	// pre-populate entityStore
	console.log( "pre-populating entityArr with '%d' particles: ", 2000 );
	prePopulateEntityStore(entities, entityPool, emitterThemes.base, themes.reset, 2000);
	console.log( "entityStore pre-populated entityArr with '%d' particles: ", 2000 );

	// console.log('initEngine logger: ', logger);
    const { emitterTheme, particleTheme, x, y, } = canvasConfig.currentEmission;

    const initialEmitter = createEmitterEntity(
        emitterName,
        emitterTheme,
        particleTheme,
        entities,
        entityPool,
		{w: canvasConfig.w, h: canvasConfig.h},
		logger
    );
    emitters.push(initialEmitter);

    triggerEmitter(initialEmitter, { triggerOptions: { x: x, y: y }, logger });

    if (animation.state !== true) {
        animation.state = true;
        update();
    }
}

export { environment, initialiseCanvas, runtimeConfig, createCanvasConfig, clearCanvas, initialiseEngine };