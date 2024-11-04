const killConditions = {
    boundaryCheck: true,
    boundaryParts: {
        all: false,
        top: false,
        right: true,
        bottom: true,
        left: true
    },
    boundaryOffset: 300,
    colorCheck: [
        {
            name: 'a',
            value: 0
        }
    ],
    perAttribute: [
        {
            name: 'radius',
            value: 0
        },
        {
            name: 'currLife',
            value: 0
        }
    ]
};

export { killConditions };