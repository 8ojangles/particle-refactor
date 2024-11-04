import { easingEquations as easing } from '../animationFunctions/easing.js';
import { environment } from '../runtime/environment.js';
var physics = environment.forces;

var updateParticle = (particle, emitterArr) => {
    // console.log('updateParticle');
    var p = particle;
    var totalLifeTicks = p.lifeSpan;

    p.xOld = p.x;
    p.yOld = p.y;
    
    // position
    // p.x += p.xVel * p.magnitudeDecay;
    // p.y += p.yVel * p.magnitudeDecay;
    p.x += p.xVel;
    p.y += p.yVel;

    // p.vel = trig.dist( p.xOld, p.yOld, p.x, p.y );

    p.xVel *= p.vAcc;
    p.yVel *= p.vAcc;

    // p.yVel += physics.gravity;
    // p.xVel += physics.wind;
    // p.relativeMagnitude *= p.magnitudeDecay;

    // p.relativeMagnitude *= p.vAcc * 1.005;
    p.relativeMagnitude *= p.vAcc;
    
    if (p.applyForces) {
        p.yVel += physics.gravity;
    }
    // speed
    // p.magnitudeDecay > 0 ? p.magnitudeDecay -= physics.friction : p.magnitudeDecay = 0;

    // p.magnitudeDecay += (p.vAcc * 0.00025);
    // p.magnitudeDecay = deccelerateMagnitude( p );
    // p.magnitudeDecay = accelerateMagnitude( p );

    // life
    p.currLifeInv = totalLifeTicks - p.currLife;
    var currLifeTick = p.currLifeInv;
    // size (radius for circle)

    var animTracks = p.animationTracks;
    var animTracksLen = animTracks.length;

    if ( animTracks && animTracksLen > 0 ) {
        // console.log('has anim tracks');
        for (let i = animTracksLen - 1; i >= 0; i--) {
            // console.log( 'i', i );
            // console.log('anim no.',i);
            let t = animTracks[i];
            const { animName, active, param, type, paramPath, currTick, baseAmount, targetAmount, duration, easing: ease } = t;

            if (active === true) {
                let amount = t.currTick === 0 ? t.baseAmount : easing[ease](currTick, baseAmount, targetAmount, duration);
                if (type === 'color') {
                    p.color4Data[paramPath] = amount;
                }
                if (type === 'param') {
                    p[paramPath] = amount;
                }
                p.animationTracks[ i ].currTick++;

                if (currTick >= t.duration) {
                    t.active = false;

                    if (t.linkedEvent !== false && typeof t.linkedEvent !== 'undefined') {

                        let particleEvents = p.events;

                        for (let j = particleEvents.length - 1; j >= 0; j--) {

                            let thisParticleEvent = p.events[ j ];
                            if (thisParticleEvent.eventType = t.linkedEvent) {
                                if (t.linkedEvent === 'emit') {

                                    let thisParticleEventParams = thisParticleEvent.eventParams;

                                    if ( typeof thisParticleEventParams.emitter !== 'undefined' ) {
                                        thisParticleEventParams.emitter.triggerEmitter({ x: p.x, y: p.y });
                                    } else {
                                        for (let k = emitterArr.length - 1; k >= 0; k--) {
                                            if (emitterArr[ k ].name === thisParticleEventParams.emitterName) {
                                                thisParticleEventParams.emitter = emitterArr[ k ];
                                                thisParticleEventParams.emitter.triggerEmitter({ x: p.x, y: p.y });
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    // if ( p.idx == 9987 ) {
                    //     console.warn( 'p.vel: ', p.vel );
                    // }

                    if ( t.linkedAnim !== false ) {

                        for ( let l = animTracksLen - 1; l >= 0; l-- ) {
                            if ( animTracks[ l ].animName === t.linkedAnim ) {
                                animTracks[ l ].active = true;
                            }
                        }
                    }
                }
            }
        }
    }

    // if ( p.idx == 9987 ) {
    //     console.log( 'p.vel',  p.vel );
    // }

    // life taketh away
    p.currLife--;
    // console.log('p', p);
};

export { updateParticle };