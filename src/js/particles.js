// dependencies

// NPM
import { default as LinkedList } from 'dbly-linked-list';
import * as objectPath from 'object-path';
// var LinkedList = require('dbly-linked-list');
// var objectPath = require("object-path");

// Custom Requires
import { mathUtils } from './mathUtils.js';
import { trigonomicUtils as trig } from './trigonomicUtils.js';
import { canvasDrawingApi } from './canvasApiAugmentation.js';
import { colorUtils } from './colorUtils.js';
import { easingEquations as easing } from './easing.js';
import { animation } from './animation.js';
import { debug, lastCalledTime } from './debugUtils.js';
import { environment } from './environment.js';
const physics = environment.forces;
const runtimeEngine = environment.runtimeEngine;

// Particle engine machinery
import { EmitterEntity } from './emitterEntity.js';
import { EmitterStoreFn } from './emitterStore.js';
import { particleArrFn } from './particleArrFn.js';
import { particleFn } from './particleFn.js';

// Emitter themes
import {singleBurstTheme} from './emitterThemes/singleBurstTheme/singleBurstTheme.js';
import {baseEmitterTheme} from './emitterThemes/baseEmitter/baseEmitterTheme.js';
import {warpStreamTheme} from './emitterThemes/warpStream/warpStreamTheme.js';
import {flameStreamTheme} from './emitterThemes/flameStream/flameStreamTheme.js';
import {smokeStreamTheme} from './emitterThemes/smokeStream/smokeStreamTheme.js';

// particle themes
import { themes } from './particleThemes/themes.js';


// cache canvas w/h
let canW = window.innerWidth;
let canH = window.innerHeight;
let canvasCentreH = canW / 2;
let canvasCentreV = canH / 2;

let blitCanvas = document.createElement('canvas');
let blitCtx = blitCanvas.getContext("2d" );
blitCanvas.id = 'blitterCanvas';
blitCanvas.width = canW;
blitCanvas.height = canH;
// blitCtx.filter = "blur(1px)";
blitCanvas.imageSmoothingEnabled = true;

let canvas = document.querySelector("#test-base");
let ctx = canvas.getContext("2d", { alpha: false } );
canvas.width = canW;
canvas.height = canH;
ctx.imageSmoothingEnabled = true;

var canvasConfig = {
    width: canW,
    height: canH,
    centerH: canvasCentreH,
    centerV: canvasCentreV,

    bufferClearRegion: {
        x: canvasCentreH,
        y: canvasCentreV,
        w: 0,
        h: 0
    }
};

var bufferClearRegion = {
    x: canvasCentreH,
    y: canvasCentreV,
    w: 0,
    h: 0

    // emitter store
};

var emitterStore = [];
// particle store
var entityStore = [];
// particle store meta data
var entityPool = new LinkedList();
var liveEntityCount = 0;

var runtimeConfig = {
    globalClock: 0,
    globalClockTick: function globalClockTick() {
        this.globalClock++;
    },
    emitterCount: 0,
    activeEmitters: 0,
    liveEntityCount: 0,
    subtract: function subtract(amount) {
        this.liveEntityCount -= amount;
    }
};

// pre-populate entityStore
var entityPopulation = 10000;
console.log( "pre-populating entityStore with '%d' particles: ", entityPopulation );
for (var i = 0; i < entityPopulation; i++) {
    // pInstance.idx = i;
    // console.log( "pInstance.idx '%d'", pInstance.idx )
    entityStore.push(createLiveParticle(0, 0, i, baseEmitterTheme, themes.reset));
    // console.log( 'initial particle: ', entityStore[ i ] );
    entityPool.insert('' + i);
}
console.log( "entityStore pre-populated entityStore with '%d' particles: ", entityPopulation );


// console.log( 'initial particle: ', entityStore[ 9997 ] );

// global counter
let globalClock = 0;
let counter = 0;

// set default variables 
let mouseX = void 0,
    mouseY = void 0,
    runtime = void 0,
    pLive = void 0;
    
// let currTheme = themes.fire;
// var currTheme = themes.flame;
let currTheme = themes.warpStar;
// let currTheme = themes.smoke;

// let currEmitterTheme = singleBurstTheme;
let currEmitterTheme = warpStreamTheme;
// var currEmitterTheme = flameStreamTheme;

var currEmmissionType = {
    mouseClickEvent: false,
    randomBurst: false,
    steadyStream: true
};


let holeGrad = ctx.createRadialGradient( canvasCentreH, canvasCentreV, 0, canvasCentreH, canvasCentreV, 200 );
holeGrad.addColorStop( 0, 'rgba( 0, 0, 0, 1 )' );
holeGrad.addColorStop( 1, 'rgba( 0, 0, 0, 0 )' );

let streamEmmisionLimiter = false;

// canvas click handler
function registerMouseClickEmmision() {
    canvas.addEventListener('click', function (event) {
        mouseX = event.offsetX;
        mouseY = event.offsetY;

        // testEmitter.resetEmissionValues();
        // testEmitter.triggerEmitter( { x: mouseX, y: mouseY } );

        var testEmitter = new EmitterEntity('testEmitter', currEmitterTheme, currTheme, emitEntities);

        emitterStore.push(testEmitter);

        testEmitter.triggerEmitter({
            x: canvasConfig.centerH,
            y: canvasConfig.centerV
        });

        if (animation.state !== true) {
            animation.state = true;
            update();
        }
    });
}


function registerMouseMove( event ) {
        mouseX = event.offsetX;
        mouseY = event.offsetY;
};

document.addEventListener('mousemove', registerMouseMove);

if (currEmmissionType.mouseClickEvent) {
    registerMouseClickEmmision();
}

if (currEmmissionType.steadyStream) {

    var testEmitter = new EmitterEntity('testEmitter', currEmitterTheme, currTheme, emitEntities);
    emitterStore.push(testEmitter);

    testEmitter.triggerEmitter({
        x: canvasConfig.centerH,
        y: canvasConfig.centerV
    });

    // testEmitter.triggerEmitter({
    //     x: mouseX,
    //     y: mouseY
    // });

    // console.log( 'emitterStore[ 9997 ]', emitterStore[ 9997] );
    if (animation.state !== true) {
        animation.state = true;
        update();
    }
}


// var smokeEmitter = new EmitterEntity('smokeEmitter', smokeStreamTheme, themes.smoke, emitEntities);
// emitterStore.push(smokeEmitter);

// particle methods fN
function renderParticle(x, y, r, colorData, context, mathUtils) {
    var p = this;
    // console.log( 'p.render: ', p );
    var compiledColor = "rgba(" + colorData.r + ',' + colorData.g + ',' + colorData.b + "," + colorData.a + ")";
    context.fillStyle = compiledColor;
    context.fillCircle(x, y, r, context);
}

function setParticleAttributes(p, ppa) {

    p.isAlive = ppa.active;
    p.lifeSpan = ppa.lifeSpan;
    p.currLife = ppa.lifeSpan;
    p.currLifeInv = 0;
    p.x = ppa.x;
    p.y = ppa.y;
    p.xVel = ppa.xVel;
    p.yVel = ppa.yVel;
    p.vAcc = ppa.vAcc;
    p.initR = ppa.initR;
    p.r = ppa.initR;
    p.tR = ppa.tR;
    p.angle = ppa.angle;
    p.magnitude = ppa.magnitude;
    p.relativeMagnitude = ppa.magnitude;
    p.magnitudeDecay = ppa.magnitudeDecay;
    p.entityType = 'none';
    p.applyForces = ppa.applyForces;
    p.globalAlpha = ppa.globalAlpha;
    p.globalAlphaInitial = ppa.globalAlphaInitial;
    p.globalAlphaTarget = ppa.globalAlphaTarget;
    p.color4Data = ppa.color4Data;
    p.colorProfiles = ppa.colorProfiles;
    p.killConditions = ppa.killConditions;
    p.customAttributes = ppa.customAttributes;
    p.animationTracks = ppa.animationTracks;
    p.update = particleFn.updateParticle;
    p.reincarnate = reincarnateParticle;
    p.kill = particleFn.killParticle;
    p.render = ppa.renderFN;
    p.events = ppa.events;
}

// particle fN
function createLiveParticle(thisX, thisY, idx, emissionOpts, particleOpts) {

    var newParticle = {};
    newParticle.idx = idx;
    setParticleAttributes( newParticle, particleFn.createPerParticleAttributes( thisX, thisY, emissionOpts, particleOpts ) );
    return newParticle;
}

function reincarnateParticle(thisX, thisY, emissionOpts, particleOptions) {
    setParticleAttributes(this, particleFn.createPerParticleAttributes(thisX, thisY, emissionOpts, particleOptions));
}

// emmision fN
function emitEntities(x, y, count, emissionOptions, particleOptions) {
    var entityStoreLen = entityStore.length;
    var addedNew = 0;
    var addedFromPool = 0;
    var theta;

    // console.log( "emmiting a total of: '%d' particles", count );
    runtimeConfig.liveEntityCount += count;
    for ( let i = count - 1; i >= 0; i-- ) {

        if (entityPool.getSize() > 0) {
            entityStore[ entityPool.getTailNode().getData() ].reincarnate( x, y, emissionOptions, particleOptions );
            addedFromPool++;
            entityPool.remove();
        } else {
            entityStore.push( createLiveParticle( x, y, entityStoreLen, emissionOptions, particleOptions ) );
            entityPool.insert('' + entityStoreLen);
            addedNew++;
            entityStoreLen++;
        }
    }
    // console.log( "addedFromPool: '%d', addedNew: '%d'", addedFromPool, addedNew );
    // console.warn( 'addedNew: ', addedNew );
}

function updateEmitterStoreMembers() {

    for ( let i = emitterStore.length - 1; i >= 0; i-- ) {
        emitterStore[ i ].updateEmitter();
        // emitterStore[i].renderEmitter( ctx );
    }
}

// runtime fN members
function displayDebugging() {
    // ctx.globalAlpha = 1;
    // debug.debugOutput(canvas, ctx, 'Animation Counter: ', counter, 0);
    // debug.debugOutput(canvas, ctx, 'Particle Pool: ', entityStore.length, 1);
    // debug.debugOutput(canvas, ctx, 'Live Entities: ', runtimeConfig.liveEntityCount, 2, { min: entityStore.length, max: 0 });
    debug.debugOutput(canvas, ctx, 'FPS: ', Math.round(debug.calculateFps()), 3, { min: 0, max: 60 });
}


function updateCycle() {

    // if ( currEmmissionType.steadyStream === true ) {
    //     if ( streamEmmisionLimiter === false ) {
    //         testEmitter.triggerEmitter({
    //             x: canvasConfig.centerH,
    //             y: canvasConfig.centerV
    //         });
    //         streamEmmisionLimiter = true;
    //         animation.state = true;
    //     }
    // }


    // rendering
    
    particleArrFn.renderParticleArr( blitCtx, entityStore, animation );
    // blitCtx.filter = "blur(0px)";
    // blit to onscreen
    ctx.drawImage( blitCanvas, 0, 0 );
    // ctx.fillStyle = holeGrad;
    // ctx.fillCircle( canvasCentreH, canvasCentreV, 200 );

    // updating
    particleArrFn.updateParticleArr( entityStore, entityPool, animation, canvasConfig, runtimeConfig, emitterStore );

    updateEmitterStoreMembers();

}

function clearCanvas( ctx ) {

    // cleaning
    ctx.fillStyle = 'black';
    ctx.fillRect( 0, 0, canW, canH );
    // ctx.clearRect( 0, 0, canW, canH );
    // ctx.clearRect( bufferClearRegion.x, bufferClearRegion.y, bufferClearRegion.w, bufferClearRegion.h );
    blitCtx.clearRect( 0, 0, canW, canH );


    // ctx.fillStyle = 'rgba( 0, 0, 0, 0.1 )';
    // ctx.fillRect( 0, 0, canW, canH );

    // set dirty buffer
    // resetBufferClearRegion();
}

/////////////////////////////////////////////////////////////
// runtime
/////////////////////////////////////////////////////////////
function update() {

    // loop housekeeping
    runtime = undefined;

    // clean canvas
    clearCanvas( ctx );

    // blending
    if ( blitCtx.globalCompositeOperation != currTheme.contextBlendingMode ) {
        blitCtx.globalCompositeOperation = currTheme.contextBlendingMode;
    }

    // updates
    updateCycle();

    // debugging
    displayDebugging();

    // looping
    animation.state === true ? (runtimeEngine.startAnimation(runtime, update), counter++) : runtimeEngine.stopAnimation(runtime);

    // global clock
    // counter++;
}
/////////////////////////////////////////////////////////////
// End runtime
/////////////////////////////////////////////////////////////