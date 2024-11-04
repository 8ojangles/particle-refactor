// emission theme

const rainStreamTheme = {
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
		origin: {
			x: {
				type: 'full',
				full: true,
				buffer: 100,
				point: null,
				min: null,
				max: null,
			},
			y: {
				type: 'point',
				full: false,
				buffer: 0,
				point: -200,
				min: null,
				max: null,
			}
		},
		rate: {
			min: 20,
			max: 40,
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
			min: 0.5, // low bounds (radians)
			max: 0.5 // high bounds (radians)
		},
		// are particles offset from inital x/y
		radialDisplacement: 0,
		// is the offset feathered?
		radialDisplacementOffset: 0,
		//initial velocity of particles
		impulse: {
			pow: 0,
			min: 20,
			max: 80
		}
	}
};

export { rainStreamTheme };