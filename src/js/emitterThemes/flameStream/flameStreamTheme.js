// emission theme

const flameStreamTheme = {
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
			min: 10,
			max: 20,
			decay: {
				rate: 0,
				decayMax: 0
			}
		},
		// emission repeater config
		repeater: {
			// what is the repetition rate ( frames )
			rate: 1,
			// does the repetition rate decay ( get longer )? how much longer? 
			decay: {
				rate: 0,
				decayMax: 300
			}
		},
		// initial direction of particles
		direction: {
			rad: 0, // in radians (0 - 2)
			min: 1.40, // low bounds (radians)
			max: 1.55 // high bounds (radians)
		},
		// are particles offset from inital x/y
		radialDisplacement: 0,
		// is the offset feathered?
		radialDisplacementOffset: 0,
		//initial velocity of particles
		impulse: {
			pow: 0,
			min: 2,
			max: 4
		}
	}
};

export { flameStreamTheme };