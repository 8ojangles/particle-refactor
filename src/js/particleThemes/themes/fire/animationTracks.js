const animationTracks = [
	// {
	// 	animName: 'radiusDelay',
	// 	type: 'param',
	// 	active: true,
	// 	param: 'r',
	// 	baseAmount: 'initR',
	// 	targetValuePath: 'initR',
	// 	duration: 0.9,
	// 	easing: 'linearEase',
	// 	linkedAnim: 'radiusFade'
	// },
	{
		animName: 'radiusFade',
		type: 'param',
		active: false,
		param: 'r',
		baseAmount: 'initR',
		targetValuePath: 'tR',
		duration: 0.9,
		easing: 'linearEase',
		linkedAnim: false
	},
	{
		animName: 'color4DataChangeRed',
		type: 'color',
		active: true,
		param: 'r',
		colorChange: {
            from: {profile: 0, color: 'r'},
            to: {profile: 1, color: 'r'}
        },
		duration: 'life',
		easing: 'easeInOutBounce',
		linkedAnim: false
	},
	{
		animName: 'color4DataChangeGreen',
		type: 'color',
		active: true,
		param: 'g',
		colorChange: {
            from: {profile: 0, color: 'g'},
            to: {profile: 1, color: 'g'}
        },
		duration: 'life',
		easing: 'easeInOutBounce',
		linkedAnim: false
	},
	{
		animName: 'color4DataChangeBlue',
		type: 'color',
		active: true,
		param: 'b',
		colorChange: {
            from: {profile: 0, color: 'b'},
            to: {profile: 1, color: 'b'}
        },
		duration: 'life',
		easing: 'easeOutExpo',
		linkedAnim: false
	},
	{
		animName: 'color4DataChangeAlpha',
		type: 'color',
		active: true,
		param: 'a',
		colorChange: {
            from: {profile: 0, color: 'a'},
            to: {profile: 3, color: 'a'}
        },
		duration: 'life',
		easing: 'easeInQuint',
		linkedAnim: false
	}
];

export { animationTracks };