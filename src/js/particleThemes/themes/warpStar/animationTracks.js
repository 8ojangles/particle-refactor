const animationTracks = [
    // {
    //     animName: 'radiusGrow',
    //     active: true,
    //     param: 'r',
    //     baseAmount: 'initR',
    //     targetValuePath: 'targetRadius',
    //     duration: 'life',
    //     easing: 'linearEase',
    //     linkedAnim: false
    // },
    {
        animName: 'fadeIn',
        type: 'param',
        active: true,
        param: 'globalAlpha',
        // baseAmount: 0,
        // targetValuePath: 1,
        baseAmount: 'globalAlphaInitial',
        targetValuePath: 'globalAlphaTarget',
        duration: 2,
        easing: 'easeInCubic',
        linkedAnim: false
    }
]

export { animationTracks };