import { particleThemeSwitch, emitterThemeSwitch, emissionTypeSwitch } from './themeUtils.js';
import { EmitterEntity } from './emitterEntity.js';

const environment = {
	runtimeEngine: {
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
		gravity: 0,
		wind: 1,
		turbulence: { min: -5, max: 5 }
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

	return {
		w: canW,
		h: canH,
		centerH: canvasCentreH,
		centerV: canvasCentreV,
	
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
			streamLimiter: false,
			followMouse: false,
			x: 0,
			y: 0
		},
		updateParticleTheme: function(theme) {
			this.currentEmission.particleTheme = particleThemeSwitch(theme)
		},
		updateEmitterTheme: function(theme) {
			this.currentEmission.emitterTheme = emitterThemeSwitch(theme)
		},
		updateEmissionType: function(type) {
			this.currentEmission.type = emissionTypeSwitch(type);
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

function initialiseEngine(emitterName, emitEntities, emitterStore, entityStore, entityPool, canvasConfig, animation, update) {
    const { emitterTheme, particleTheme, x, y, } = canvasConfig.currentEmission;

    const initialEmitter = new EmitterEntity(
        emitterName,
        emitterTheme,
        particleTheme,
        emitEntities,
        entityStore,
        entityPool
    );
    emitterStore.push(initialEmitter);

    initialEmitter.triggerEmitter({ x: x, y: y });

    if (animation.state !== true) {
        animation.state = true;
        update();
    }
}

export { environment, initialiseCanvas, runtimeConfig, createCanvasConfig, clearCanvas, initialiseEngine };