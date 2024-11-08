const animationTracks = [
    {
        animName: 'radiusFade',
        type: 'param',
        active: true,
        param: 'r',
        baseAmount: 'initR',
        targetValuePath: 'tR',
        duration: 'life',
        easing: 'easeInCubic',
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
        duration: 0.3,
        easing: 'easeInQuart',
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
        duration: 0.5,
        easing: 'easeInQuart',
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
        baseAmount: 'colorProfiles.0.b',
        targetValuePath: 'colorProfiles.1.b',
        duration: 0.5,
        easing: 'easeOutQuart',
        linkedAnim: false
    },
    {
        animName: 'alphaDelay',
        type: 'color',
        active: true,
        param: 'a',
        colorChange: {
            from: {profile: 0, color: 'a'},
            to: {profile: 1, color: 'a'}
        },
        baseAmount: 'colorProfiles.0.a',
        targetValuePath: 'colorProfiles.0.a',
        duration: 0.6,
        easing: 'linearEase',
        linkedAnim: 'alphaFadeOut'
    },
    {
        animName: 'alphaFadeOut',
        type: 'color',
        active: false,
        param: 'a',
        colorChange: {
            from: {profile: 1, color: 'a'},
            to: {profile: 2, color: 'a'}
        },
        baseAmount: 'colorProfiles.1.a',
        targetValuePath: 'colorProfiles.0.a',
        duration: 0.4,
        easing: 'linearEase',
        linkedAnim: false,
        // linkedEvent: 'emit',
        linkedEvent: false

    }
]

export { animationTracks };