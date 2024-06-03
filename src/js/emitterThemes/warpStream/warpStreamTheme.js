// emission theme
const warpStreamTheme = {
    emitter: {
        active: 1,
        // position
        x: 0,
        y: 0,
        xVel: 0,
        yVel: 0,
        applyGlobalForces: false
    },
      // emission rate config (per cycle ( frame ) )
    emission: {
        rate: {
            min: 4,
            max: 10,
            decay: {
                rate: 0,
                decayMax: 0
            }
        },
        // emission repeater config
        repeater: {
            // what is the repetition rate ( frames )
            rate: 2,
            // does the repetition rate decay ( get longer )? how much longer? 
            decay: {
                rate: 0,
                decayMax: 300
            }
        },
        // initial direction of particles
        direction: {
            rad: 0, // in radians (0 - 2)
            min: 0, // low bounds (radians)
            max: 2 // high bounds (radians)
        },
      // are particles offset from inital x/y
        radialDisplacement: 20,
        // is the offset feathered?
        radialDisplacementOffset: 0,
        //initial velocity of particles
        impulse: {
            pow: 0,
            min: 0.45,
            max: 0.85
        }
    }
};

export { warpStreamTheme };